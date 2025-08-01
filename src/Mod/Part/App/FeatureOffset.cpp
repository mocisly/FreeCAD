/***************************************************************************
 *   Copyright (c) 2016 Victor Titov (DeepSOIC) <vv.titov@gmail.com>       *
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
# include <Precision.hxx>
#endif

#include <App/Link.h>

#include "FeatureOffset.h"
#include <App/Document.h>


using namespace Part;

const char* Part::Offset::ModeEnums[]= {"Skin","Pipe", "RectoVerso",nullptr};
const char* Part::Offset::JoinEnums[]= {"Arc","Tangent", "Intersection",nullptr};

PROPERTY_SOURCE(Part::Offset, Part::Feature)

Offset::Offset()
{
    ADD_PROPERTY_TYPE(Source,(nullptr),"Offset",App::Prop_None,"Source shape");
    ADD_PROPERTY_TYPE(Value,(1.0),"Offset",App::Prop_None,"Offset value");
    ADD_PROPERTY_TYPE(Mode,(long(0)),"Offset",App::Prop_None,"Mode");
    Mode.setEnums(ModeEnums);
    ADD_PROPERTY_TYPE(Join,(long(0)),"Offset",App::Prop_None,"Join type");
    Join.setEnums(JoinEnums);
    ADD_PROPERTY_TYPE(Intersection,(false),"Offset",App::Prop_None,"Intersection");
    ADD_PROPERTY_TYPE(SelfIntersection,(false),"Offset",App::Prop_None,"Self Intersection");
    ADD_PROPERTY_TYPE(Fill,(false),"Offset",App::Prop_None,"Fill offset");

    Source.setScope(App::LinkScope::Global);
}

Offset::~Offset() = default;

short Offset::mustExecute() const
{
    if (Source.isTouched())
        return 1;
    if (Value.isTouched())
        return 1;
    if (Mode.isTouched())
        return 1;
    if (Join.isTouched())
        return 1;
    if (Intersection.isTouched())
        return 1;
    if (SelfIntersection.isTouched())
        return 1;
    if (Fill.isTouched())
        return 1;
    return 0;
}

App::DocumentObjectExecReturn *Offset::execute()
{
    App::DocumentObject* source = Source.getValue();
    if (!source)
        return new App::DocumentObjectExecReturn("No source shape linked.");
    double offset = Value.getValue();
    double tol = Precision::Confusion();
    bool inter = Intersection.getValue();
    bool self = SelfIntersection.getValue();
    short mode = (short)Mode.getValue();
    bool fill = Fill.getValue();
    auto shape = Feature::getTopoShape(source, ShapeOption::ResolveLink | ShapeOption::Transform);
    if(shape.isNull())
        return new App::DocumentObjectExecReturn("Invalid source link");
    auto join = static_cast<JoinType>(Join.getValue());
    this->Shape.setValue(TopoShape(0).makeElementOffset(
        shape,offset,tol,inter,self,mode,join,fill ? FillType::fill : FillType::noFill));
    return App::DocumentObject::StdReturn;
}


//-------------------------------------------------------------------------------------------------------


PROPERTY_SOURCE(Part::Offset2D, Part::Offset)

Offset2D::Offset2D()
{
    this->SelfIntersection.setStatus(App::Property::Status::Hidden, true);
    this->Mode.setValue(1); //switch to Pipe mode by default, because skin mode does not function properly on closed profiles.
}

Offset2D::~Offset2D() = default;

short Offset2D::mustExecute() const
{
    if (Source.isTouched())
        return 1;
    if (Value.isTouched())
        return 1;
    if (Mode.isTouched())
        return 1;
    if (Join.isTouched())
        return 1;
    if (Fill.isTouched())
        return 1;
    if (Intersection.isTouched())
        return 1;
    return 0;
}

App::DocumentObjectExecReturn *Offset2D::execute()
{
    App::DocumentObject* source = Source.getValue();

    if (!source) {
       return new App::DocumentObjectExecReturn("No source shape linked.");
    }
    auto shape = Feature::getTopoShape(source, ShapeOption::ResolveLink | ShapeOption::Transform);
    if (shape.isNull()) {
        return new App::DocumentObjectExecReturn("No source shape linked.");
    }
    double offset = Value.getValue();
    short mode = (short)Mode.getValue();
    auto openresult = mode == 0 ? OpenResult::allowOpenResult : OpenResult::noOpenResult;
    if (mode == 2)
        return new App::DocumentObjectExecReturn("Mode 'Recto-Verso' is not supported for 2D offset.");
    auto join = static_cast<JoinType>(Join.getValue());
    auto fill = Fill.getValue() ? FillType::fill : FillType::noFill;
    bool inter = Intersection.getValue();
    this->Shape.setValue(TopoShape(0).makeElementOffset2D(shape, offset, join, fill, openresult, inter));
    return App::DocumentObject::StdReturn;
}
