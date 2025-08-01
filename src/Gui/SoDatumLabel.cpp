/***************************************************************************
 *   Copyright (c) 2011-2012 Luke Parry <l.parry@warwick.ac.uk>            *
 *                                                                         *
 *   This file is part of the FreeCAD CAx development system.              *
 *                                                                         *
 *   This library is free software; you can redistribute it and/or         *
 *   modify it under the terms of the GNU Library General Public           *
 *   License as published by the Free Software Foundation; either          *
 *   version 2 of the License, or (at your option) any later version.      *
 *                                                                         *
 *   This library  is distributed in the hope that it will be useful,      *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU Library General Public License for more details.                  *
 *                                                                         *
 *   You should have received a copy of the GNU Library General Public     *
 *   License along with this library; see the file COPYING.LIB. If not,    *
 *   write to the Free Software Foundation, Inc., 59 Temple Place,         *
 *   Suite 330, Boston, MA  02111-1307, USA                                *
 *                                                                         *
 ***************************************************************************/

#include "PreCompiled.h"
#ifndef _PreComp_
# ifdef FC_OS_WIN32
# include <windows.h>
# undef min
# undef max
# endif
# ifdef FC_OS_MACOSX
# include <OpenGL/gl.h>
# else
# include <GL/gl.h>
# endif

# include <algorithm>
# include <cmath>
# include <limits>
# include <numbers>
# include <QFontMetrics>
# include <QPainter>

# include <Inventor/SoPrimitiveVertex.h>
# include <Inventor/actions/SoGLRenderAction.h>
# include <Inventor/elements/SoFocalDistanceElement.h>
# include <Inventor/elements/SoViewportRegionElement.h>
# include <Inventor/elements/SoViewVolumeElement.h>
# include <Inventor/misc/SoState.h>
#endif // _PreComp_

#include <Base/Tools.h>

#include <Gui/BitmapFactory.h>
#include <Gui/Tools.h>

#include "SoDatumLabel.h"

// NOLINTBEGIN(readability-magic-numbers,cppcoreguidelines-pro-bounds-pointer-arithmetic)
constexpr const float ZCONSTR {0.006F};

using namespace Gui;

// ------------------------------------------------------


namespace {

void glVertex(const SbVec3f& pt){
    glVertex3f(pt[0], pt[1], pt[2]);
}

void glVertexes(const std::vector<SbVec3f>& pts){
    for (auto pt: pts){
        glVertex3f(pt[0], pt[1], pt[2]);
    }
}

void glDrawLine(const SbVec3f& p1, const SbVec3f& p2){
    glBegin(GL_LINES);
        glVertexes({p1, p2});
    glEnd();
}

void glDrawArc(const SbVec3f& center, float radius, float startAngle=0.,
               float endAngle=2.0*std::numbers::pi, int countSegments=0){
    float range = endAngle - startAngle;

    if (countSegments == 0){
        countSegments = std::max(6, abs(int(25.0 * range / std::numbers::pi)));
    }

    float segment = range / (countSegments-1);

    glBegin(GL_LINE_STRIP);
    for (int i=0; i < countSegments; i++) {
        float theta = startAngle + segment*i;
        SbVec3f v1 = center + radius * SbVec3f(cos(theta),sin(theta),0);
        glVertex(v1);
    }
    glEnd();
}

void glDrawArrow(const SbVec3f& base, const SbVec3f& dir, float width, float length){
    // Calculate arrowhead points
    SbVec3f normal(dir[1], -dir[0], 0);
    SbVec3f arrowLeft = base - length * dir + width * normal;
    SbVec3f arrowRight = base - length * dir - width * normal;

    // Draw arrowheads
    glBegin(GL_TRIANGLES);
    glVertexes({base, arrowLeft, arrowRight});
    glEnd();
}

} // namespace


SO_NODE_SOURCE(SoDatumLabel)

void SoDatumLabel::initClass()
{
    SO_NODE_INIT_CLASS(SoDatumLabel, SoShape, "Shape");
}

// NOLINTNEXTLINE
SoDatumLabel::SoDatumLabel()
{
    SO_NODE_CONSTRUCTOR(SoDatumLabel);
    SO_NODE_ADD_FIELD(string, (""));
    SO_NODE_ADD_FIELD(textColor, (SbVec3f(1.0F,1.0F,1.0F)));
    SO_NODE_ADD_FIELD(pnts, (SbVec3f(.0F,.0F,.0F)));
    SO_NODE_ADD_FIELD(norm, (SbVec3f(.0F,.0F,1.F)));

    SO_NODE_ADD_FIELD(name, ("Helvetica"));
    SO_NODE_ADD_FIELD(size, (10.F));
    SO_NODE_ADD_FIELD(lineWidth, (2.F));
    SO_NODE_ADD_FIELD(sampling, (2.F));

    SO_NODE_ADD_FIELD(datumtype, (SoDatumLabel::DISTANCE));

    SO_NODE_DEFINE_ENUM_VALUE(Type, DISTANCE);
    SO_NODE_DEFINE_ENUM_VALUE(Type, DISTANCEX);
    SO_NODE_DEFINE_ENUM_VALUE(Type, DISTANCEY);
    SO_NODE_DEFINE_ENUM_VALUE(Type, ANGLE);
    SO_NODE_DEFINE_ENUM_VALUE(Type, RADIUS);
    SO_NODE_DEFINE_ENUM_VALUE(Type, DIAMETER);
    SO_NODE_DEFINE_ENUM_VALUE(Type, ARCLENGTH);
    SO_NODE_SET_SF_ENUM_TYPE(datumtype, Type);

    SO_NODE_ADD_FIELD(param1, (0.F));
    SO_NODE_ADD_FIELD(param2, (0.F));
    SO_NODE_ADD_FIELD(param4, (0.F));
    SO_NODE_ADD_FIELD(param5, (0.F));
    SO_NODE_ADD_FIELD(param6, (0.F));
    SO_NODE_ADD_FIELD(param7, (0.F));
    SO_NODE_ADD_FIELD(param8, (0.F));

    useAntialiasing = true;

    this->imgWidth = 0;
    this->imgHeight = 0;
    this->glimagevalid = false;
}

void SoDatumLabel::drawImage()
{
    const SbString* s = string.getValues(0);
    int num = string.getNum();
    if (num == 0) {
        this->image = SoSFImage();
        return;
    }

    QFont font(QString::fromLatin1(name.getValue(), -1), size.getValue());
    QFontMetrics fm(font);
    QString str = QString::fromUtf8(s[0].getString());

    int w = Gui::QtTools::horizontalAdvance(fm, str);
    int h = fm.height();

    // No Valid text
    if (!w) {
        this->image = SoSFImage();
        return;
    }

    const SbColor& t = textColor.getValue();
    QColor front;
    front.setRgbF(t[0],t[1], t[2]);

    QImage image(w * sampling.getValue(), h * sampling.getValue(), QImage::Format_ARGB32_Premultiplied);
    image.setDevicePixelRatio(sampling.getValue());
    image.fill(0x00000000);

    QPainter painter(&image);
    if (useAntialiasing) {
        painter.setRenderHint(QPainter::Antialiasing);
    }

    painter.setPen(front);
    painter.setFont(font);
    painter.drawText(0, 0, w, h, Qt::AlignLeft, str);
    painter.end();

    Gui::BitmapFactory().convert(image, this->image);
}

namespace {
// Helper class to determine the bounding box of a datum label
class DatumLabelBox
{
public:
    DatumLabelBox(float scale, SoDatumLabel* label)
        : scale{scale}
        , label{label}
    {

    }
    void computeBBox(SbBox3f& box, SbVec3f& center) const
    {
        std::vector<SbVec3f> corners;
        if (label->datumtype.getValue() == SoDatumLabel::DISTANCE ||
            label->datumtype.getValue() == SoDatumLabel::DISTANCEX ||
            label->datumtype.getValue() == SoDatumLabel::DISTANCEY ) {
            corners = computeDistanceBBox();
        }
        else if (label->datumtype.getValue() == SoDatumLabel::RADIUS ||
                 label->datumtype.getValue() == SoDatumLabel::DIAMETER) {
            corners = computeRadiusDiameterBBox();
        }
        else if (label->datumtype.getValue() == SoDatumLabel::ANGLE) {
            corners = computeAngleBBox();
        }
        else if (label->datumtype.getValue() == SoDatumLabel::SYMMETRIC) {
            corners = computeSymmetricBBox();
        }
        else if (label->datumtype.getValue() == SoDatumLabel::ARCLENGTH) {
            corners = computeArcLengthBBox();
        }

        getBBox(corners, box, center);
    }

private:
    void getBBox(const std::vector<SbVec3f>& corners, SbBox3f& box, SbVec3f& center) const
    {
        constexpr float floatMax = std::numeric_limits<float>::max();
        if (corners.size() > 1) {
            float minX = floatMax;
            float minY = floatMax;
            float maxX = -floatMax;
            float maxY = -floatMax;
            for (SbVec3f it : corners) {
                minX = (it[0] < minX) ? it[0] : minX;
                minY = (it[1] < minY) ? it[1] : minY;
                maxX = (it[0] > maxX) ? it[0] : maxX;
                maxY = (it[1] > maxY) ? it[1] : maxY;
            }

            // Store the bounding box
            box.setBounds(SbVec3f(minX, minY, 0.0F), SbVec3f (maxX, maxY, 0.0F));
            center = box.getCenter();
        }
    }
    std::vector<SbVec3f> computeDistanceBBox() const
    {
        SbVec2s imgsize;
        int nc {};
        int srcw = 1;
        int srch = 1;

        const unsigned char * dataptr = label->image.getValue(imgsize, nc);
        if (dataptr) {
            srcw = imgsize[0];
            srch = imgsize[1];
        }

        float aspectRatio =  (float) srcw / (float) srch;
        float imgHeight = scale * (float) (srch);
        float imgWidth  = aspectRatio * imgHeight;

        // Get the points stored in the pnt field
        const SbVec3f *points = label->pnts.getValues(0);
        if (label->pnts.getNum() < 2) {
            return {};
        }

        SbVec3f textOffset;

        float length = label->param1.getValue();
        float length2 = label->param2.getValue();

        SbVec3f p1 = points[0];
        SbVec3f p2 = points[1];

        SbVec3f dir;
        SbVec3f normal;
        constexpr float floatEpsilon = std::numeric_limits<float>::epsilon();
        if (label->datumtype.getValue() == SoDatumLabel::DISTANCE) {
            dir = (p2-p1);
        }
        else if (label->datumtype.getValue() == SoDatumLabel::DISTANCEX) {
            dir = SbVec3f( (p2[0] - p1[0] >= floatEpsilon) ? 1 : -1, 0, 0);
        }
        else if (label->datumtype.getValue() == SoDatumLabel::DISTANCEY) {
            dir = SbVec3f(0, (p2[1] - p1[1] >= floatEpsilon) ? 1 : -1, 0);
        }

        dir.normalize();
        normal = SbVec3f (-dir[1], dir[0], 0);

        // when the datum line is not parallel to p1-p2 the projection of
        // p1-p2 on normal is not zero, p2 is considered as reference and p1
        // is replaced by its projection p1_
        float normproj12 = (p2 - p1).dot(normal);
        SbVec3f p1_ = p1 + normproj12 * normal;

        SbVec3f midpos = (p1_ + p2)/2;

        float offset1 = ((length + normproj12 < 0.0F) ? -1.0F  : 1.0F) * float(srch);
        float offset2 = ((length < 0.0F) ? -1.0F  : 1.0F) * float(srch);

        textOffset = midpos + normal * length + dir * length2;
        float margin = imgHeight / 4.0F;

        SbVec3f perp1 = p1_ + normal * (length + offset1 * scale);
        SbVec3f perp2 = p2  + normal * (length + offset2 * scale);

        // Finds the mins and maxes
        std::vector<SbVec3f> corners;
        corners.push_back(p1);
        corners.push_back(p2);
        corners.push_back(perp1);
        corners.push_back(perp2);

        // Make sure that the label is inside the bounding box
        corners.push_back(textOffset + dir * (imgWidth / 2.0F + margin) + normal * (srch + margin));
        corners.push_back(textOffset - dir * (imgWidth / 2.0F + margin) + normal * (srch + margin));
        corners.push_back(textOffset + dir * (imgWidth / 2.0F + margin) - normal * margin);
        corners.push_back(textOffset - dir * (imgWidth / 2.0F + margin) - normal * margin);

        return corners;
    }

    std::vector<SbVec3f> computeRadiusDiameterBBox() const
    {
        SbVec2s imgsize;
        int nc {};
        int srcw = 1;
        int srch = 1;

        const unsigned char * dataptr = label->image.getValue(imgsize, nc);
        if (dataptr) {
            srcw = imgsize[0];
            srch = imgsize[1];
        }

        float aspectRatio =  (float) srcw / (float) srch;
        float imgHeight = scale * (float) (srch);
        float imgWidth  = aspectRatio * imgHeight;

        // Get the points stored in the pnt field
        const SbVec3f *points = label->pnts.getValues(0);
        if (label->pnts.getNum() < 2) {
            return {};
        }

        // Get the Points
        SbVec3f p1 = points[0];
        SbVec3f p2 = points[1];

        SbVec3f dir = p2 - p1;
        dir.normalize();
        SbVec3f normal (-dir[1], dir[0], 0);

        float length = label->param1.getValue();
        SbVec3f pos = p2 + length*dir;

        float margin = imgHeight / 4.0F;

        SbVec3f p3 = pos +  dir * (imgWidth / 2.0F + margin);
        if ((p3-p1).length() > (p2-p1).length()) {
            p2 = p3;
        }

        // Calculate the points
        SbVec3f pnt1 = pos - dir * (margin + imgWidth / 2.0F);
        SbVec3f pnt2 = pos + dir * (margin + imgWidth / 2.0F);

        // Finds the mins and maxes
        std::vector<SbVec3f> corners;
        corners.push_back(p1);
        corners.push_back(p2);
        corners.push_back(pnt1);
        corners.push_back(pnt2);

        return corners;
    }

    std::vector<SbVec3f> computeAngleBBox() const
    {
        SbVec2s imgsize;
        int nc {};
        int srcw = 1;
        int srch = 1;

        const unsigned char * dataptr = label->image.getValue(imgsize, nc);
        if (dataptr) {
            srcw = imgsize[0];
            srch = imgsize[1];
        }

        float aspectRatio =  (float) srcw / (float) srch;
        float imgHeight = scale * (float) (srch);
        float imgWidth  = aspectRatio * imgHeight;

        // Get the points stored in the pnt field
        const SbVec3f *points = label->pnts.getValues(0);
        if (label->pnts.getNum() < 1) {
            return {};
        }

        // Only the angle intersection point is needed
        SbVec3f p0 = points[0];

        // Load the Parameters
        float length     = label->param1.getValue();
        float startangle = label->param2.getValue();
        float range      = label->param3.getValue();
        float endangle   = startangle + range;


        float len2 = 2.0F * length;

        // Useful Information
        // v0 - vector for text position
        // p0 - vector for angle intersect
        SbVec3f v0(cos(startangle+range/2), sin(startangle+range/2), 0);

        SbVec3f textOffset = p0 + v0 * len2;

        float margin = imgHeight / 4.0F;

        // Direction vectors for start and end lines
        SbVec3f v1(cos(startangle), sin(startangle), 0);
        SbVec3f v2(cos(endangle), sin(endangle), 0);

        SbVec3f pnt1 = p0+(len2-margin)*v1;
        SbVec3f pnt2 = p0+(len2+margin)*v1;
        SbVec3f pnt3 = p0+(len2-margin)*v2;
        SbVec3f pnt4 = p0+(len2+margin)*v2;

        // Finds the mins and maxes
        // We may need to include the text position too

        SbVec3f img1 = SbVec3f(-imgWidth / 2.0F, -imgHeight / 2, 0.0F);
        SbVec3f img2 = SbVec3f(-imgWidth / 2.0F,  imgHeight / 2, 0.0F);
        SbVec3f img3 = SbVec3f( imgWidth / 2.0F, -imgHeight / 2, 0.0F);
        SbVec3f img4 = SbVec3f( imgWidth / 2.0F,  imgHeight / 2, 0.0F);

        img1 += textOffset;
        img2 += textOffset;
        img3 += textOffset;
        img4 += textOffset;

        std::vector<SbVec3f> corners;
        corners.push_back(pnt1);
        corners.push_back(pnt2);
        corners.push_back(pnt3);
        corners.push_back(pnt4);
        corners.push_back(img1);
        corners.push_back(img2);
        corners.push_back(img3);
        corners.push_back(img4);

        return corners;
    }

    std::vector<SbVec3f> computeSymmetricBBox() const
    {
        // Get the points stored in the pnt field
        const SbVec3f *points = label->pnts.getValues(0);
        if (label->pnts.getNum() < 2) {
            return {};
        }

        SbVec3f p1 = points[0];
        SbVec3f p2 = points[1];

        // Finds the mins and maxes
        std::vector<SbVec3f> corners;
        corners.push_back(p1);
        corners.push_back(p2);

        return corners;
    }

    std::vector<SbVec3f> computeArcLengthBBox() const
    {
        SbVec2s imgsize;
        int nc {};
        int srcw = 1;
        int srch = 1;

        const unsigned char * dataptr = label->image.getValue(imgsize, nc);
        if (dataptr) {
            srcw = imgsize[0];
            srch = imgsize[1];
        }

        float aspectRatio =  (float) srcw / (float) srch;
        float imgHeight = scale * (float) (srch);
        float imgWidth  = aspectRatio * imgHeight;

        // Get the points stored in the pnt field
        const SbVec3f *points = label->pnts.getValues(0);
        if (label->pnts.getNum() < 3) {
            return {};
        }

        SbVec3f ctr = points[0];
        SbVec3f p1 = points[1];
        SbVec3f p2 = points[2];

        SbVec3f img1 = SbVec3f(-imgWidth / 2, -imgHeight / 2, 0.F);
        SbVec3f img2 = SbVec3f(-imgWidth / 2,  imgHeight / 2, 0.F);
        SbVec3f img3 = SbVec3f( imgWidth / 2, -imgHeight / 2, 0.F);
        SbVec3f img4 = SbVec3f( imgWidth / 2,  imgHeight / 2, 0.F);

        //Text orientation
        SbVec3f dir = (p2 - p1);
        dir.normalize();
        SbVec3f normal = SbVec3f (-dir[1], dir[0], 0);
        float angle = atan2f(dir[1],dir[0]);

        // Rotate through an angle
        float s = sin(angle);
        float c = cos(angle);
        img1 = SbVec3f((img1[0] * c) - (img1[1] * s), (img1[0] * s) + (img1[1] * c), 0.F);
        img2 = SbVec3f((img2[0] * c) - (img2[1] * s), (img2[0] * s) + (img2[1] * c), 0.F);
        img3 = SbVec3f((img3[0] * c) - (img3[1] * s), (img3[0] * s) + (img3[1] * c), 0.F);
        img4 = SbVec3f((img4[0] * c) - (img4[1] * s), (img4[0] * s) + (img4[1] * c), 0.F);

        float length = label->param1.getValue();


        // Text location
        SbVec3f vm = (p1+p2)/2 - ctr;
        vm.normalize();

        SbVec3f vc1 = (p1 - ctr);
        SbVec3f vc2 = (p2 - ctr);

        float startangle = atan2f(vc1[1], vc1[0]);
        float endangle = atan2f(vc2[1], vc2[0]);
        if (endangle < startangle) {
            endangle += 2.F * std::numbers::pi_v<float>;
        }

        SbVec3f textCenter;
        if (endangle - startangle <= std::numbers::pi) {
            textCenter = ctr + vm * (length + imgHeight);
        } else {
            textCenter = ctr - vm * (length + 2. * imgHeight);
        }
        img1 += textCenter;
        img2 += textCenter;
        img3 += textCenter;
        img4 += textCenter;

        // Finds the mins and maxes
        std::vector<SbVec3f> corners;
        float margin = imgHeight / 4.0F;
        corners.push_back(textCenter + dir * (imgWidth / 2.0F + margin) - normal * (imgHeight / 2.0F + margin));
        corners.push_back(textCenter - dir * (imgWidth / 2.0F + margin) - normal * (imgHeight / 2.0F + margin));
        corners.push_back(textCenter + dir * (imgWidth / 2.0F + margin) + normal * (imgHeight / 2.0F + margin));
        corners.push_back(textCenter - dir * (imgWidth / 2.0F + margin) + normal * (imgHeight / 2.0F + margin));

        return corners;
    }

private:
    float scale;
    SoDatumLabel* label;
};
}

void SoDatumLabel::computeBBox(SoAction * action, SbBox3f &box, SbVec3f &center)
{
    SoState *state = action->getState();
    float scale = getScaleFactor(state);

    DatumLabelBox datumBox(scale, this);
    datumBox.computeBBox(box, center);
}

SbVec3f SoDatumLabel::getLabelTextCenter()
{
    // Get the points stored
    int numPts = this->pnts.getNum();
    if (numPts < 2) {
        return {};
    }

    const SbVec3f* points = this->pnts.getValues(0);
    SbVec3f p1 = points[0];
    SbVec3f p2 = points[1];

    if (datumtype.getValue() == SoDatumLabel::DISTANCE ||
        datumtype.getValue() == SoDatumLabel::DISTANCEX ||
        datumtype.getValue() == SoDatumLabel::DISTANCEY) {
        return getLabelTextCenterDistance(p1, p2);
    }
    if (datumtype.getValue() == SoDatumLabel::RADIUS ||
        datumtype.getValue() == SoDatumLabel::DIAMETER) {
        return getLabelTextCenterDiameter(p1, p2);

    }
    if (datumtype.getValue() == SoDatumLabel::ANGLE) {
        return getLabelTextCenterAngle(p1);
    }
    if (datumtype.getValue() == SoDatumLabel::ARCLENGTH) {
        if (numPts >= 3) {
            SbVec3f p3 = points[2];
            return getLabelTextCenterArcLength(p1, p2, p3);
        }
    }

    return p1;
}

SbVec3f SoDatumLabel::getLabelTextCenterDistance(const SbVec3f& p1, const SbVec3f& p2)
{
    float length = param1.getValue();
    float length2 = param2.getValue();

    SbVec3f dir;
    SbVec3f normal;

    constexpr float floatEpsilon = std::numeric_limits<float>::epsilon();
    if (datumtype.getValue() == SoDatumLabel::DISTANCE) {
        dir = (p2 - p1);
    }
    else if (datumtype.getValue() == SoDatumLabel::DISTANCEX) {
        dir = SbVec3f((p2[0] - p1[0] >= floatEpsilon) ? 1 : -1, 0, 0);
    }
    else if (datumtype.getValue() == SoDatumLabel::DISTANCEY) {
        dir = SbVec3f(0, (p2[1] - p1[1] >= floatEpsilon) ? 1 : -1, 0);
    }

    dir.normalize();
    normal = SbVec3f(-dir[1], dir[0], 0);

    float normproj12 = (p2 - p1).dot(normal);
    SbVec3f p1_ = p1 + normproj12 * normal;

    SbVec3f midpos = (p1_ + p2) / 2;

    SbVec3f textCenter = midpos + normal * length + dir * length2;
    return textCenter;
}

SbVec3f SoDatumLabel::getLabelTextCenterDiameter(const SbVec3f& p1, const SbVec3f& p2)
{
    SbVec3f dir = (p2 - p1);
    dir.normalize();

    float length = this->param1.getValue();
    SbVec3f textCenter = p2 + length * dir;
    return textCenter;
}

SbVec3f SoDatumLabel::getLabelTextCenterAngle(const SbVec3f& p0)
{
    // Load the Parameters
    float length = param1.getValue();
    float startangle = param2.getValue();
    float range = param3.getValue();
    float len2 = 2.0F * length;

    // Useful Information
    // v0 - vector for text position
    // p0 - vector for angle intersect
    SbVec3f v0(cos(startangle + range / 2), sin(startangle + range / 2), 0);

    SbVec3f textCenter = p0 + v0 * len2;
    return textCenter;
}

SbVec3f SoDatumLabel::getLabelTextCenterArcLength(const SbVec3f& ctr, const SbVec3f& p1, const SbVec3f& p2)
{
    float length = this->param1.getValue();

    // Angles calculations
    SbVec3f vc1 = (p1 - ctr);
    SbVec3f vc2 = (p2 - ctr);

    float startangle = atan2f(vc1[1], vc1[0]);
    float endangle = atan2f(vc2[1], vc2[0]);

    if (endangle < startangle) {
        endangle += 2.F * std::numbers::pi_v<float>;
    }

    // Text location
    SbVec3f vm = (p1+p2)/2 - ctr;
    vm.normalize();

    SbVec3f textCenter;
    if (endangle - startangle <= std::numbers::pi) {
        textCenter = ctr + vm * (length + this->imgHeight);
    } else {
        textCenter = ctr - vm * (length + 2. * this->imgHeight);
    }
    return textCenter;
}


void SoDatumLabel::generateDistancePrimitives(SoAction * action, const SbVec3f& p1, const SbVec3f& p2)
{
    SbVec3f dir;
    constexpr float floatEpsilon = std::numeric_limits<float>::epsilon();
    if (this->datumtype.getValue() == DISTANCE) {
        dir = (p2-p1);
    } else if (this->datumtype.getValue() == DISTANCEX) {
        dir = SbVec3f( (p2[0] - p1[0] >= floatEpsilon) ? 1 : -1, 0, 0);
    } else if (this->datumtype.getValue() == DISTANCEY) {
        dir = SbVec3f(0, (p2[1] - p1[1] >= floatEpsilon) ? 1 : -1, 0);
    }

    dir.normalize();

    // Get magnitude of angle between horizontal
    float angle = atan2f(dir[1],dir[0]);

    SbVec3f img1 = SbVec3f(-this->imgWidth / 2, -this->imgHeight / 2, 0.F);
    SbVec3f img2 = SbVec3f(-this->imgWidth / 2,  this->imgHeight / 2, 0.F);
    SbVec3f img3 = SbVec3f( this->imgWidth / 2, -this->imgHeight / 2, 0.F);
    SbVec3f img4 = SbVec3f( this->imgWidth / 2,  this->imgHeight / 2, 0.F);

    // Rotate through an angle
    float s = sin(angle);
    float c = cos(angle);

    img1 = SbVec3f((img1[0] * c) - (img1[1] * s), (img1[0] * s) + (img1[1] * c), 0.F);
    img2 = SbVec3f((img2[0] * c) - (img2[1] * s), (img2[0] * s) + (img2[1] * c), 0.F);
    img3 = SbVec3f((img3[0] * c) - (img3[1] * s), (img3[0] * s) + (img3[1] * c), 0.F);
    img4 = SbVec3f((img4[0] * c) - (img4[1] * s), (img4[0] * s) + (img4[1] * c), 0.F);

    SbVec3f textOffset = getLabelTextCenterDistance(p1, p2);

    img1 += textOffset;
    img2 += textOffset;
    img3 += textOffset;
    img4 += textOffset;

    // Primitive Shape is only for text as this should only be selectable
    SoPrimitiveVertex pv;

    this->beginShape(action, TRIANGLE_STRIP);

    pv.setNormal( SbVec3f(0.F, 0.F, 1.F) );

    // Set coordinates
    pv.setPoint( img1 );
    shapeVertex(&pv);

    pv.setPoint( img2 );
    shapeVertex(&pv);

    pv.setPoint( img3 );
    shapeVertex(&pv);

    pv.setPoint( img4 );
    shapeVertex(&pv);

    this->endShape();
}

void SoDatumLabel::generateDiameterPrimitives(SoAction * action, const SbVec3f& p1, const SbVec3f& p2)
{
    SbVec3f dir = (p2-p1);
    dir.normalize();

    float angle = atan2f(dir[1],dir[0]);

    SbVec3f img1 = SbVec3f(-this->imgWidth / 2, -this->imgHeight / 2, 0.F);
    SbVec3f img2 = SbVec3f(-this->imgWidth / 2,  this->imgHeight / 2, 0.F);
    SbVec3f img3 = SbVec3f( this->imgWidth / 2, -this->imgHeight / 2, 0.F);
    SbVec3f img4 = SbVec3f( this->imgWidth / 2,  this->imgHeight / 2, 0.F);

    // Rotate through an angle
    float s = sin(angle);
    float c = cos(angle);

    img1 = SbVec3f((img1[0] * c) - (img1[1] * s), (img1[0] * s) + (img1[1] * c), 0.F);
    img2 = SbVec3f((img2[0] * c) - (img2[1] * s), (img2[0] * s) + (img2[1] * c), 0.F);
    img3 = SbVec3f((img3[0] * c) - (img3[1] * s), (img3[0] * s) + (img3[1] * c), 0.F);
    img4 = SbVec3f((img4[0] * c) - (img4[1] * s), (img4[0] * s) + (img4[1] * c), 0.F);

    SbVec3f textOffset = getLabelTextCenterDiameter(p1, p2);

    img1 += textOffset;
    img2 += textOffset;
    img3 += textOffset;
    img4 += textOffset;

    // Primitive Shape is only for text as this should only be selectable
    SoPrimitiveVertex pv;

    this->beginShape(action, TRIANGLE_STRIP);

    pv.setNormal( SbVec3f(0.F, 0.F, 1.F) );

    // Set coordinates
    pv.setPoint( img1 );
    shapeVertex(&pv);

    pv.setPoint( img2 );
    shapeVertex(&pv);

    pv.setPoint( img3 );
    shapeVertex(&pv);

    pv.setPoint( img4 );
    shapeVertex(&pv);

    this->endShape();
}

void SoDatumLabel::generateAnglePrimitives(SoAction * action, const SbVec3f& p0)
{
    SbVec3f textOffset = getLabelTextCenterAngle(p0);

    SbVec3f img1 = SbVec3f(-this->imgWidth / 2, -this->imgHeight / 2, 0.F);
    SbVec3f img2 = SbVec3f(-this->imgWidth / 2,  this->imgHeight / 2, 0.F);
    SbVec3f img3 = SbVec3f( this->imgWidth / 2, -this->imgHeight / 2, 0.F);
    SbVec3f img4 = SbVec3f( this->imgWidth / 2,  this->imgHeight / 2, 0.F);

    img1 += textOffset;
    img2 += textOffset;
    img3 += textOffset;
    img4 += textOffset;

    // Primitive Shape is only for text as this should only be selectable
    SoPrimitiveVertex pv;

    this->beginShape(action, TRIANGLE_STRIP);

    pv.setNormal( SbVec3f(0.F, 0.F, 1.F) );

    // Set coordinates
    pv.setPoint( img1 );
    shapeVertex(&pv);

    pv.setPoint( img2 );
    shapeVertex(&pv);

    pv.setPoint( img3 );
    shapeVertex(&pv);

    pv.setPoint( img4 );
    shapeVertex(&pv);

    this->endShape();
}

void SoDatumLabel::generateSymmetricPrimitives(SoAction * action, const SbVec3f& p1, const SbVec3f& p2)
{
    SbVec3f dir = (p2-p1);
    dir.normalize();
    SbVec3f normal (-dir[1],dir[0],0);

    float margin = this->imgHeight / 4.0F;

    // Calculate coordinates for the first arrow
    SbVec3f ar0  = p1 + dir * 5 * margin ;
    SbVec3f ar1  = ar0 - dir * 0.866F * 2 * margin; // Base Point of Arrow
    SbVec3f ar2  = ar1 + normal * margin; // Triangular corners
    ar1 -= normal * margin;

    // Calculate coordinates for the second arrow
    SbVec3f ar3  = p2 - dir * 5 * margin ;
    SbVec3f ar4  = ar3 + dir * 0.866F * 2 * margin; // Base Point of 2nd Arrow

    SbVec3f ar5  = ar4 + normal * margin; // Triangular corners
    ar4 -= normal * margin;

    SoPrimitiveVertex pv;

    this->beginShape(action, TRIANGLES);

    pv.setNormal( SbVec3f(0.F, 0.F, 1.F) );

    // Set coordinates
    pv.setPoint( ar0 );
    shapeVertex(&pv);

    pv.setPoint( ar1 );
    shapeVertex(&pv);

    pv.setPoint( ar2 );
    shapeVertex(&pv);

    // Set coordinates
    pv.setPoint( ar3 );
    shapeVertex(&pv);

    pv.setPoint( ar4 );
    shapeVertex(&pv);

    pv.setPoint( ar5 );
    shapeVertex(&pv);

    this->endShape();
}

void SoDatumLabel::generateArcLengthPrimitives(SoAction * action, const SbVec3f& ctr, const SbVec3f& p1, const SbVec3f& p2)
{
    SbVec3f img1 = SbVec3f(-this->imgWidth / 2, -this->imgHeight / 2, 0.F);
    SbVec3f img2 = SbVec3f(-this->imgWidth / 2,  this->imgHeight / 2, 0.F);
    SbVec3f img3 = SbVec3f( this->imgWidth / 2, -this->imgHeight / 2, 0.F);
    SbVec3f img4 = SbVec3f( this->imgWidth / 2,  this->imgHeight / 2, 0.F);

    //Text orientation
    SbVec3f dir = (p2 - p1);
    dir.normalize();
    float angle = atan2f(dir[1],dir[0]);

    // Rotate through an angle
    float s = sin(angle);
    float c = cos(angle);
    img1 = SbVec3f((img1[0] * c) - (img1[1] * s), (img1[0] * s) + (img1[1] * c), 0.F);
    img2 = SbVec3f((img2[0] * c) - (img2[1] * s), (img2[0] * s) + (img2[1] * c), 0.F);
    img3 = SbVec3f((img3[0] * c) - (img3[1] * s), (img3[0] * s) + (img3[1] * c), 0.F);
    img4 = SbVec3f((img4[0] * c) - (img4[1] * s), (img4[0] * s) + (img4[1] * c), 0.F);

    //Text location
    SbVec3f textOffset = getLabelTextCenterArcLength(ctr, p1, p2);
    img1 += textOffset;
    img2 += textOffset;
    img3 += textOffset;
    img4 += textOffset;

    // Primitive Shape is only for text as this should only be selectable
    SoPrimitiveVertex pv;

    this->beginShape(action, TRIANGLE_STRIP);

    pv.setNormal( SbVec3f(0.F, 0.F, 1.F) );

    // Set coordinates
    pv.setPoint( img1 );
    shapeVertex(&pv);

    pv.setPoint( img2 );
    shapeVertex(&pv);

    pv.setPoint( img3 );
    shapeVertex(&pv);

    pv.setPoint( img4 );
    shapeVertex(&pv);

    this->endShape();
}

void SoDatumLabel::generatePrimitives(SoAction * action)
{
    // Initialisation check (needs something more sensible) prevents an infinite loop bug
    constexpr float floatEpsilon = std::numeric_limits<float>::epsilon();
    if (this->imgHeight <= floatEpsilon || this->imgWidth <= floatEpsilon) {
        return;
    }

    int numPts = this->pnts.getNum();
    if (numPts < 2) {
        return;
    }

    // Get the points stored
    const SbVec3f *points = this->pnts.getValues(0);
    SbVec3f p1 = points[0];
    SbVec3f p2 = points[1];

    // Change the offset and bounding box parameters depending on Datum Type
    if (this->datumtype.getValue() == DISTANCE ||
        this->datumtype.getValue() == DISTANCEX ||
        this->datumtype.getValue() == DISTANCEY) {

        generateDistancePrimitives(action, p1, p2);
    }
    else if (this->datumtype.getValue() == RADIUS ||
             this->datumtype.getValue() == DIAMETER) {

        generateDiameterPrimitives(action, p1, p2);
    }
    else if (this->datumtype.getValue() == ANGLE) {

        generateAnglePrimitives(action, p1);
    }
    else if (this->datumtype.getValue() == SYMMETRIC) {

        generateSymmetricPrimitives(action, p1, p2);
    }
    else if (this->datumtype.getValue() == ARCLENGTH) {

        if (numPts >= 3) {
            SbVec3f p3 = points[2];
            generateArcLengthPrimitives(action, p1, p2, p3);
        }
    }
}

void SoDatumLabel::notify(SoNotList * l)
{
    SoField * f = l->getLastField();
    if (f == &this->string) {
        this->glimagevalid = false;
    }
    else if (f == &this->textColor) {
        this->glimagevalid = false;
    }
    else if (f == &this->name) {
        this->glimagevalid = false;
    }
    else if (f == &this->size) {
        this->glimagevalid = false;
    }
    else if (f == &this->image) {
        this->glimagevalid = false;
    }
    inherited::notify(l);
}

float SoDatumLabel::getScaleFactor(SoState* state) const
{
    /**Remark from Stefan Tröger:
    * The scale calculation is based on knowledge of SbViewVolume::getWorldToScreenScale
    * implementation internals. The factor returned from this function is calculated from the view frustums
    * nearplane width, height is not taken into account, and hence we divide it with the viewport width
    * to get the exact pixel scale factor.
    * This is not documented and therefore may change on later coin versions!
    */
    const SbViewVolume & vv = SoViewVolumeElement::get(state);
    // As reference use the center point the camera is looking at on the focal plane
    // because then independent of the camera we get a constant scale factor when panning.
    // If we used (0,0,0) instead then the scale factor would change heavily in perspective
    // rendering mode. See #0002921 and #0002922.
    // It's important to use the distance to the focal plane an not near or far plane because
    // depending on additionally displayed objects they may change heavily and thus impact the
    // scale factor. See #7082 and #7860.
    float focal = SoFocalDistanceElement::get(state);
    SbVec3f center = vv.getSightPoint(focal);
    float scale = vv.getWorldToScreenScale(center, 1.F);
    const SbViewportRegion & vp = SoViewportRegionElement::get(state);
    SbVec2s vp_size = vp.getViewportSizePixels();
    scale /= float(vp_size[0]);

    return scale;
}

void SoDatumLabel::GLRender(SoGLRenderAction * action)
{
    SoState *state = action->getState();

    if (!shouldGLRender(action)) {
        return;
    }
    if (action->handleTransparency(true)) {
        return;
    }

    const float scale = getScaleFactor(state);
    bool hasText = hasDatumText();

    int srcw = 1;
    int srch = 1;

    if (hasText) {
        getDimension(scale, srcw, srch);
    }

    if (this->datumtype.getValue() == SYMMETRIC) {
        this->imgHeight = scale*25.0F;
        this->imgWidth = scale*25.0F;
    }

    // Get the points stored in the pnt field
    const SbVec3f *points = this->pnts.getValues(0);

    state->push();

    //Set General OpenGL Properties
    glPushAttrib(GL_ENABLE_BIT | GL_PIXEL_MODE_BIT | GL_COLOR_BUFFER_BIT);
    glDisable(GL_LIGHTING);
    glDisable(GL_CULL_FACE);

    //Enable Anti-alias
    if (action->isSmoothing()) {
        glEnable(GL_LINE_SMOOTH);
        glEnable(GL_BLEND);
        glBlendFunc(GL_SRC_ALPHA,GL_ONE_MINUS_SRC_ALPHA);
        glHint(GL_LINE_SMOOTH_HINT,GL_NICEST);
    }

    // Position for Datum Text Label
    float angle = 0;

    // Get the colour
    const SbColor& t = textColor.getValue();

    // Set GL Properties
    glLineWidth(this->lineWidth.getValue());
    glColor3f(t[0], t[1], t[2]);

    SbVec3f textOffset;

    if (this->datumtype.getValue() == DISTANCE ||
        this->datumtype.getValue() == DISTANCEX ||
        this->datumtype.getValue() == DISTANCEY ) {
        drawDistance(points, scale, srch, angle, textOffset);
    }
    else if (this->datumtype.getValue() == RADIUS || this->datumtype.getValue() == DIAMETER) {
        drawRadiusOrDiameter(points, angle, textOffset);
    }
    else if (this->datumtype.getValue() == ANGLE) {
        drawAngle(points, angle, textOffset);
    }
    else if (this->datumtype.getValue() == SYMMETRIC) {
        drawSymmetric(points);
    }
    else if (this->datumtype.getValue() == ARCLENGTH) {
        drawArcLength(points, angle, textOffset);
    }

    if (hasText) {
        drawText(state, srcw, srch, angle, textOffset);
    }

    glPopAttrib();
    state->pop();
}

bool SoDatumLabel::hasDatumText() const
{
    const SbString* s = string.getValues(0);
    return (s->getLength() > 0);
}

void SoDatumLabel::getDimension(float scale, int& srcw, int& srch)
{
    SbVec2s imgsize;
    int nc {};

    if (!this->glimagevalid) {
        drawImage();
        this->glimagevalid = true;
    }

    const unsigned char * dataptr = this->image.getValue(imgsize, nc);
    if (!dataptr) { // no image
        return;
    }

    srcw = imgsize[0];
    srch = imgsize[1];

    float aspectRatio =  (float) srcw / (float) srch;
    this->imgHeight = scale * (float) (srch) / sampling.getValue();
    this->imgWidth  = aspectRatio * (float) this->imgHeight;
}

void SoDatumLabel::drawDistance(const SbVec3f* points, float scale, int srch, float& angle, SbVec3f& textOffset)
{
    using std::numbers::pi;

    float length = this->param1.getValue();
    float length2 = this->param2.getValue();

    SbVec3f p1 = points[0];
    SbVec3f p2 = points[1];

    SbVec3f dir;
    constexpr float floatEpsilon = std::numeric_limits<float>::epsilon();
    if (this->datumtype.getValue() == DISTANCE) {
        dir = (p2-p1);
    } else if (this->datumtype.getValue() == DISTANCEX) {
        dir = SbVec3f( (p2[0] - p1[0] >= floatEpsilon) ? 1 : -1, 0, 0);
    } else if (this->datumtype.getValue() == DISTANCEY) {
        dir = SbVec3f(0, (p2[1] - p1[1] >= floatEpsilon) ? 1 : -1, 0);
    }

    dir.normalize();
    SbVec3f normal = SbVec3f (-dir[1],dir[0],0);

    // when the datum line is not parallel to p1-p2 the projection of
    // p1-p2 on normal is not zero, p2 is considered as reference and p1
    // is replaced by its projection p1_
    float normproj12 = (p2-p1).dot(normal);
    SbVec3f p1_ = p1 + normproj12 * normal;

    SbVec3f midpos = (p1_ + p2)/2;

    float offset1 = ((length + normproj12 < 0) ? -1.F  : 1.F) * srch;
    float offset2 = ((length < 0) ? -1  : 1)*srch;

    // Get magnitude of angle between horizontal
    angle = atan2f(dir[1],dir[0]);
    if (angle > pi/2 + pi/12) {
        angle -= (float)pi;
    } else if (angle <= -pi/2 + pi/12) {
        angle += (float)pi;
    }

    textOffset = midpos + normal * length + dir * length2;

    // Get the colour
    const SbColor& t = textColor.getValue();

    // Set GL Properties
    glLineWidth(this->lineWidth.getValue());
    glColor3f(t[0], t[1], t[2]);
    float margin = this->imgHeight / 3.0F;


    SbVec3f perp1 = p1_ + normal * (length + offset1 * scale);
    SbVec3f perp2 = p2  + normal * (length + offset2 * scale);

    // Calculate the coordinates for the parallel datum lines
    SbVec3f par1 = p1_ + normal * length;
    SbVec3f par2 = midpos + normal * length + dir * (length2 - this->imgWidth / 2 - margin);
    SbVec3f par3 = midpos + normal * length + dir * (length2 + this->imgWidth / 2 + margin);
    SbVec3f par4 = p2  + normal * length;

    bool flipTriang = false;

    if ((par3-par1).dot(dir) > (par4 - par1).length()) {
        // Increase Margin to improve visibility
        float tmpMargin = this->imgHeight /0.75F;
        par3 = par4;
        if ((par2-par1).dot(dir) > (par4 - par1).length()) {
            par3 = par2;
            par2 = par1 - dir * tmpMargin;
            flipTriang = true;
        }
    }
    else if ((par2-par1).dot(dir) < 0.F) {
        float tmpMargin = this->imgHeight /0.75F;
        par2 = par1;
        if((par3-par1).dot(dir) < 0.F) {
            par2 = par3;
            par3 = par4 + dir * tmpMargin;
            flipTriang = true;
        }
    }
    // Perp Lines
    glBegin(GL_LINES);
        if (length != 0.) {
            glVertex2f(p1[0], p1[1]);
            glVertex2f(perp1[0], perp1[1]);

            glVertex2f(p2[0], p2[1]);
            glVertex2f(perp2[0], perp2[1]);
        }

        glVertex2f(par1[0], par1[1]);
        glVertex2f(par2[0], par2[1]);

        glVertex2f(par3[0], par3[1]);
        glVertex2f(par4[0], par4[1]);
    glEnd();

    float arrowWidth = margin * 0.5F;

    SbVec3f ar1 = par1 + ((flipTriang) ? -1 : 1) * dir * 0.866F * 2 * margin;
    SbVec3f ar2 = ar1 + normal * arrowWidth;
    ar1 -= normal * arrowWidth;

    SbVec3f ar3 = par4 - ((flipTriang) ? -1 : 1) * dir * 0.866F * 2 * margin;
    SbVec3f ar4 = ar3 + normal * arrowWidth;
    ar3 -= normal * arrowWidth;

    // Draw the arrowheads
    glBegin(GL_TRIANGLES);
        glVertex2f(par1[0], par1[1]);
        glVertex2f(ar1[0], ar1[1]);
        glVertex2f(ar2[0], ar2[1]);

        glVertex2f(par4[0], par4[1]);
        glVertex2f(ar3[0], ar3[1]);
        glVertex2f(ar4[0], ar4[1]);
    glEnd();


    if (this->datumtype.getValue() == DISTANCE) {
        drawDistance(points);
    }
}

void SoDatumLabel::drawDistance(const SbVec3f* points)
{
    // Draw arc helpers if needed
    float range1 = this->param4.getValue();
    if (range1 != 0.0) {
        float startAngle1 = this->param3.getValue();
        float radius1 = this->param5.getValue();
        SbVec3f center1 = points[2];
        glDrawArc(center1, radius1, startAngle1, startAngle1 + range1);
    }

    float range2 = this->param7.getValue();
    if (range2 != 0.0) {
        float startAngle2 = this->param6.getValue();
        float radius2 = this->param8.getValue();
        SbVec3f center2 = points[3];
        glDrawArc(center2, radius2, startAngle2, startAngle2 + range2);
    }
}

void SoDatumLabel::drawRadiusOrDiameter(const SbVec3f* points, float& angle, SbVec3f& textOffset)
{
    // Get the Points
    SbVec3f p1 = points[0];
    SbVec3f p2 = points[1];

    SbVec3f dir = (p2-p1);
    SbVec3f center = p1;
    float radius = (p2 - p1).length();
    if (this->datumtype.getValue() == DIAMETER) {
        center = (p1 + p2) / 2;
        radius = radius / 2;
    }

    dir.normalize();
    SbVec3f normal (-dir[1],dir[0],0);

    float length = this->param1.getValue();
    SbVec3f pos = p2 + length*dir;

    // Get magnitude of angle between horizontal
    angle = atan2f(dir[1],dir[0]);
    if (angle > std::numbers::pi/2 + std::numbers::pi/12) {
        angle -= (float)std::numbers::pi;
    } else if (angle <= -std::numbers::pi/2 + std::numbers::pi/12) {
        angle += (float)std::numbers::pi;
    }

    textOffset = pos;

    float margin = this->imgHeight / 3.0F;

    // Create the arrowhead
    float arrowWidth = margin * 0.5F;
    SbVec3f ar0  = p2;
    SbVec3f ar1  = p2 - dir * 0.866F * 2 * margin;
    SbVec3f ar2  = ar1 + normal * arrowWidth;
    ar1 -= normal * arrowWidth;

    SbVec3f p3 = pos +  dir * (this->imgWidth / 2 + margin);
    if ((p3-p1).length() > (p2-p1).length()) {
        p2 = p3;
    }

    // Calculate the points
    SbVec3f pnt1 = pos - dir * (margin + this->imgWidth / 2);
    SbVec3f pnt2 = pos + dir * (margin + this->imgWidth / 2);

    // Draw the Lines
    glBegin(GL_LINES);
        glVertex2f(p1[0], p1[1]);
        glVertex2f(pnt1[0], pnt1[1]);

        glVertex2f(pnt2[0], pnt2[1]);
        glVertex2f(p2[0], p2[1]);
    glEnd();

    glBegin(GL_TRIANGLES);
        glVertex2f(ar0[0], ar0[1]);
        glVertex2f(ar1[0], ar1[1]);
        glVertex2f(ar2[0], ar2[1]);
    glEnd();

    if (this->datumtype.getValue() == DIAMETER) {
        // create second arrowhead
        SbVec3f ar0_1  = p1;
        SbVec3f ar1_1  = p1 + dir * 0.866F * 2 * margin;
        SbVec3f ar2_1  = ar1_1 + normal * arrowWidth;
        ar1_1 -= normal * arrowWidth;

        glBegin(GL_TRIANGLES);
            glVertex2f(ar0_1[0], ar0_1[1]);
            glVertex2f(ar1_1[0], ar1_1[1]);
            glVertex2f(ar2_1[0], ar2_1[1]);
        glEnd();
    }

    // Draw arc helpers if needed
    float startHelperRange = this->param4.getValue();
    if (startHelperRange != 0.0) {
        float startHelperAngle = this->param3.getValue();
        glDrawArc(center, radius, startHelperAngle, startHelperAngle + startHelperRange);
    }

    float endHelperRange = this->param6.getValue();
    if (endHelperRange != 0.0) {
        float endHelperAngle = this->param5.getValue();
        glDrawArc(center, radius, endHelperAngle, endHelperAngle + endHelperRange);
    }
}

void SoDatumLabel::drawAngle(const SbVec3f* points, float& angle, SbVec3f& textOffset)
{
    // Only the angle intersection point is needed
    SbVec3f p0 = points[0];

    float margin = this->imgHeight / 3.0F;

    // Load the Parameters
    float length     = this->param1.getValue();
    float startangle = this->param2.getValue();
    float range      = this->param3.getValue();
    float endangle   = startangle + range;
    float endLineLength1 = std::max(this->param4.getValue(), margin);
    float endLineLength2 = std::max(this->param5.getValue(), margin);
    float endLineLength12 = std::max(- this->param4.getValue(), margin);
    float endLineLength22 = std::max(- this->param5.getValue(), margin);


    float r = 2*length;

    // Set the Text label angle to zero
    angle = 0.F;

    // Useful Information
    // v0 - vector for text position
    // p0 - vector for angle intersect
    SbVec3f v0(cos(startangle+range/2),sin(startangle+range/2),0);

    // leave some space for the text
    float textMargin = std::min(0.2F * abs(range), this->imgWidth / (2 * r));

    textOffset = p0 + v0 * r;

    // Direction vectors for start and end lines
    SbVec3f v1(cos(startangle), sin(startangle), 0);
    SbVec3f v2(cos(endangle), sin(endangle), 0);

    float textMarginDir = 1.;

    if (range < 0 || length < 0) {
        std::swap(v1, v2);
        textMarginDir = -1.;
    }
    // Draw
    glDrawArc(p0, r, startangle, startangle + range / 2.F - textMarginDir * textMargin);
    glDrawArc(p0, r, startangle + range / 2.F + textMarginDir * textMargin, endangle);

    SbVec3f pnt1 = p0 + (r - endLineLength1) * v1;
    SbVec3f pnt2 = p0 + (r + endLineLength12) * v1;
    SbVec3f pnt3 = p0 + (r - endLineLength2) * v2;
    SbVec3f pnt4 = p0 + (r + endLineLength22) * v2;

    glDrawLine(pnt1, pnt2);
    glDrawLine(pnt3, pnt4);

    // Create the arrowheads
    float arrowLength = margin * 2;
    float arrowWidth = margin * 0.5F;

    SbVec3f dirStart(v1[1], -v1[0], 0);
    SbVec3f startArrowBase = p0 + r * v1;
    glDrawArrow(startArrowBase, dirStart, arrowWidth, arrowLength);

    SbVec3f dirEnd(-v2[1], v2[0], 0);
    SbVec3f endArrowBase = p0 + r * v2;
    glDrawArrow(endArrowBase, dirEnd, arrowWidth, arrowLength);
}

void SoDatumLabel::drawSymmetric(const SbVec3f* points)
{
    SbVec3f p1 = points[0];
    SbVec3f p2 = points[1];

    SbVec3f dir = (p2-p1);
    dir.normalize();
    SbVec3f normal (-dir[1],dir[0],0);

    float margin = this->imgHeight / 4.0F;

    // Calculate coordinates for the first arrow
    SbVec3f ar0  = p1 + dir * 4 * margin; // Tip of Arrow
    SbVec3f ar1  = ar0 - dir * 0.866F * 2 * margin;
    SbVec3f ar2  = ar1 + normal * margin;
    ar1 -= normal * margin;

    glBegin(GL_LINES);
        glVertex3f(p1[0], p1[1], ZCONSTR);
        glVertex3f(ar0[0], ar0[1], ZCONSTR);
        glVertex3f(ar0[0], ar0[1], ZCONSTR);
        glVertex3f(ar1[0], ar1[1], ZCONSTR);
        glVertex3f(ar0[0], ar0[1], ZCONSTR);
        glVertex3f(ar2[0], ar2[1], ZCONSTR);
    glEnd();

    // Calculate coordinates for the second arrow
    SbVec3f ar3  = p2 - dir * 4 * margin; // Tip of 2nd Arrow
    SbVec3f ar4  = ar3 + dir * 0.866F * 2 * margin;
    SbVec3f ar5  = ar4 + normal * margin;
    ar4 -= normal * margin;

    glBegin(GL_LINES);
        glVertex3f(p2[0], p2[1], ZCONSTR);
        glVertex3f(ar3[0], ar3[1], ZCONSTR);
        glVertex3f(ar3[0], ar3[1], ZCONSTR);
        glVertex3f(ar4[0], ar4[1], ZCONSTR);
        glVertex3f(ar3[0], ar3[1], ZCONSTR);
        glVertex3f(ar5[0], ar5[1], ZCONSTR);
    glEnd();
}

void SoDatumLabel::drawArcLength(const SbVec3f* points, float& angle, SbVec3f& textOffset)
{
    using std::numbers::pi;

    SbVec3f ctr = points[0];
    SbVec3f p1 = points[1];
    SbVec3f p2 = points[2];
    float length = this->param1.getValue();

    float margin = this->imgHeight / 3.0F;

    // Angles calculations
    SbVec3f vc1 = (p1 - ctr);
    SbVec3f vc2 = (p2 - ctr);

    float startangle = atan2f(vc1[1], vc1[0]);
    float endangle = atan2f(vc2[1], vc2[0]);
    if (endangle < startangle) {
        endangle += 2.0F * (float)pi;
    }

    float range = endangle - startangle;

    float radius = vc1.length();

    //Text orientation
    SbVec3f dir = (p2 - p1);
    dir.normalize();
    // Get magnitude of angle between horizontal
    angle = atan2f(dir[1],dir[0]);
    if (angle > pi/2 + pi/12) {
        angle -= (float)pi;
    } else if (angle <= -pi/2 + pi/12) {
        angle += (float)pi;
    }
       // Text location
    textOffset = getLabelTextCenterArcLength(ctr, p1, p2);

    // lines direction
    SbVec3f vm = (p1+p2)/2 - ctr;
    vm.normalize();

    // Lines points
    SbVec3f pnt1 = p1;
    SbVec3f pnt2 = p1 + (length-radius) * vm;
    SbVec3f pnt3 = p2;
    SbVec3f pnt4 = p2 + (length-radius) * vm;

        // Draw arc
    if (range <= pi) {
        glDrawArc(ctr + (length-radius)*vm, radius, startangle, endangle);
    }
    else {
        pnt2 = p1 + length * vm;
        pnt4 = p2 + length * vm;
        vc1 = (pnt2 - ctr);
        vc2 = (pnt4 - ctr);
        startangle = atan2f(vc1[1], vc1[0]);
        endangle = atan2f(vc2[1], vc2[0]);
        glDrawArc(ctr, vc1.length(), startangle, endangle);
    }

    //Draw lines
    glDrawLine(pnt1, pnt2);
    glDrawLine(pnt3, pnt4);

    // Create the arrowheads
    float arrowLength = margin * 2;
    float arrowWidth = margin * 0.5F;

        // Normals for the arrowheads at arc start and end
    SbVec3f dirStart(sin(startangle), -cos(startangle), 0);
    SbVec3f dirEnd(-sin(endangle), cos(endangle), 0);

    glDrawArrow(pnt2, dirStart, arrowWidth, arrowLength);
    glDrawArrow(pnt4, dirEnd, arrowWidth, arrowLength);
}

// NOLINTNEXTLINE
void SoDatumLabel::drawText(SoState *state, int srcw, int srch, float angle, const SbVec3f& textOffset)
{
    SbVec2s imgsize;
    int  nc {};
    const unsigned char * dataptr = this->image.getValue(imgsize, nc);

    //Get the camera z-direction
    const SbViewVolume & vv = SoViewVolumeElement::get(state);
    SbVec3f z = vv.zVector();

    bool flip = norm.getValue().dot(z) > std::numeric_limits<float>::epsilon();

    static bool init = false;
    static bool npot = false;
    if (!init) {
        init = true;
        std::string ext = reinterpret_cast<const char*>(glGetString(GL_EXTENSIONS));  // NOLINT
        npot = (ext.find("GL_ARB_texture_non_power_of_two") != std::string::npos);
    }

    int w = srcw;
    int h = srch;
    if (!npot) {
        // make power of two
        if ((w & (w-1)) != 0) {
            int i=1;
            while (i < 8) {
                if ((w >> i) == 0) {
                    break;
                }
                i++;
            }
            w = (1 << i);
        }
        // make power of two
        if ((h & (h-1)) != 0) {
            int i=1;
            while (i < 8) {
                if ((h >> i) == 0) {
                    break;
                }
                i++;
            }
            h = (1 << i);
        }
    }

    glDisable(GL_DEPTH_TEST);
    glEnable(GL_TEXTURE_2D); // Enable Textures
    glEnable(GL_BLEND);

    // glGenTextures/glBindTexture was commented out but it must be active, see:
    // #0000971: Tracing over a background image in Sketcher: image is overwritten by first dimensional constraint text
    // #0001185: Planer image changes to number graphic when a part design constraint is made after the planar image
    //
    // Copy the text bitmap into memory and bind
    GLuint myTexture {};
    // generate a texture
    glGenTextures(1, &myTexture);
    glBindTexture(GL_TEXTURE_2D, myTexture);

    glTexParameteri (GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri (GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);

    if (!npot) {
        QImage imagedata(w, h,QImage::Format_ARGB32_Premultiplied);
        imagedata.fill(0x00000000);
        int sx = (w - srcw)/2;
        int sy = (h - srch)/2;
        glTexImage2D(GL_TEXTURE_2D, 0, nc, w, h, 0, GL_RGBA, GL_UNSIGNED_BYTE, (const GLvoid*)imagedata.bits());
        glTexSubImage2D(GL_TEXTURE_2D, 0, sx, sy, srcw, srch, GL_RGBA, GL_UNSIGNED_BYTE,(const GLvoid*)  dataptr);
    }
    else {
        glTexImage2D(GL_TEXTURE_2D, 0, nc, srcw, srch, 0, GL_RGBA, GL_UNSIGNED_BYTE,(const GLvoid*)  dataptr);
    }
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    glMatrixMode(GL_MODELVIEW);
    glPushMatrix();

    // Apply a rotation and translation matrix
    glTranslatef(textOffset[0], textOffset[1], textOffset[2]);
    glRotatef(Base::toDegrees<GLfloat>(angle), 0,0,1);
    glBegin(GL_QUADS);

    glColor3f(1.F, 1.F, 1.F);

    glTexCoord2f(flip ? 0.F : 1.F, 1.F); glVertex2f( -this->imgWidth / 2,  this->imgHeight / 2);
    glTexCoord2f(flip ? 0.F : 1.F, 0.F); glVertex2f( -this->imgWidth / 2, -this->imgHeight / 2);
    glTexCoord2f(flip ? 1.F : 0.F, 0.F); glVertex2f( this->imgWidth / 2, -this->imgHeight / 2);
    glTexCoord2f(flip ? 1.F : 0.F, 1.F); glVertex2f( this->imgWidth / 2,  this->imgHeight / 2);

    glEnd();

    // Reset the Mode
    glPopMatrix();

    // wmayer: see bug report below which is caused by generating but not
    // deleting the texture.
    // #0000721: massive memory leak when dragging an unconstrained model
    glDeleteTextures(1, &myTexture);
}

void SoDatumLabel::setPoints(SbVec3f p1, SbVec3f p2)
{
    pnts.setNum(2);
    SbVec3f* verts = pnts.startEditing();
    verts[0] = p1;
    verts[1] = p2;
    pnts.finishEditing();
}
// NOLINTEND(readability-magic-numbers,cppcoreguidelines-pro-bounds-pointer-arithmetic)
