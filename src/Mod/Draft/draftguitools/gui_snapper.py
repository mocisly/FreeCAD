# ***************************************************************************
# *   Copyright (c) 2011 Yorik van Havre <yorik@uncreated.net>              *
# *                                                                         *
# *   This program is free software; you can redistribute it and/or modify  *
# *   it under the terms of the GNU Lesser General Public License (LGPL)    *
# *   as published by the Free Software Foundation; either version 2 of     *
# *   the License, or (at your option) any later version.                   *
# *   for detail see the LICENCE text file.                                 *
# *                                                                         *
# *   This program is distributed in the hope that it will be useful,       *
# *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
# *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
# *   GNU Library General Public License for more details.                  *
# *                                                                         *
# *   You should have received a copy of the GNU Library General Public     *
# *   License along with this program; if not, write to the Free Software   *
# *   Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  *
# *   USA                                                                   *
# *                                                                         *
# ***************************************************************************
"""Provides the Snapper class to define the snapping tools and modes.

This module provides tools to handle point snapping and
everything that goes with it (toolbar buttons, cursor icons, etc.).
It also creates the Draft grid, which is actually a tracker
defined by `gui_trackers.gridTracker`.
"""
## @package gui_snapper
#  \ingroup draftguitools
#  \brief Provides the Snapper class to define the snapping tools and modes.
#
#  This module provides tools to handle point snapping and
#  everything that goes with it (toolbar buttons, cursor icons, etc.).

## \addtogroup draftguitools
# @{
import collections as coll
import inspect
import itertools
import math
import pivy.coin as coin
import PySide.QtCore as QtCore
import PySide.QtGui as QtGui
import PySide.QtWidgets as QtWidgets

import FreeCAD as App
import FreeCADGui as Gui
import Part
import Draft
import DraftVecUtils
import DraftGeomUtils
import WorkingPlane
from draftguitools import gui_trackers as trackers
from draftutils import gui_utils
from draftutils import params
from draftutils.init_tools import get_draft_snap_commands
from draftutils.messages import _wrn
from draftutils.translate import translate

__title__ = "FreeCAD Draft Snap tools"
__author__ = "Yorik van Havre"
__url__ = "https://www.freecad.org"

UNSNAPPABLES = ('Image::ImagePlane',)

class Snapper:
    """Classes to manage snapping in Draft and Arch.

    The Snapper objects contains all the functionality used by draft
    and arch module to manage object snapping. It is responsible for
    finding snap points and displaying snap markers. Usually You
    only need to invoke it's snap() function, all the rest is taken
    care of.

    3 functions are useful for the scriptwriter: snap(), constrain()
    or getPoint() which is an all-in-one combo.

    The individual snapToXXX() functions return a snap definition in
    the form [real_point,marker_type,visual_point], and are not
    meant to be used directly, they are all called when necessary by
    the general snap() function.

    The Snapper lives inside Gui once the Draft module has been
    loaded.

    """

    def __init__(self):
        self.activeview = None
        self.lastObj = []
        self.radius = 0
        self.constraintAxis = None
        self.basepoint = None
        self.affinity = None
        self.mask = None
        self.cursorMode = None
        self.maxEdges = params.get_param("maxSnapEdges")

        # we still have no 3D view when the draft module initializes
        self.tracker = None
        self.extLine = None
        self.grid = None
        self.constrainLine = None
        self.trackLine = None
        self.extLine2 = None
        self.radiusTracker = None
        self.dim1 = None
        self.dim2 = None
        self.snapInfo = None
        self.lastExtensions = []
        # the trackers are stored in lists because there can be several views,
        # each with its own set
        # view, grid, snap, extline, radius, dim1, dim2, trackLine,
        # extline2, crosstrackers
        self.trackers = [[], [], [], [], [], [], [], [], [], []]
        self.polarAngles = [90, 45]
        self.selectMode = False
        self.holdTracker = None
        self.holdPoints = []
        self.running = False
        self.callbackClick = None
        self.callbackMove = None
        self.snapObjectIndex = 0

        # snap keys, it's important that they are in this order for
        # saving in preferences and for properly restoring the toolbar
        self.snaps = ['Lock',           # 0
                      'Near',           # 1 former "passive" snap
                      'Extension',      # 2
                      'Parallel',       # 3
                      'Grid',           # 4
                      "Endpoint",       # 5
                      'Midpoint',       # 6
                      'Perpendicular',  # 7
                      'Angle',          # 8
                      'Center',         # 9
                      'Ortho',          # 10
                      'Intersection',   # 11
                      'Special',        # 12
                      'Dimensions',     # 13
                      'WorkingPlane'    # 14
                     ]

        self.init_active_snaps()
        self.set_snap_style()

        self.cursors = \
            coll.OrderedDict([('passive',       ':/icons/Draft_Snap_Near.svg'),
                              ('extension',     ':/icons/Draft_Snap_Extension.svg'),
                              ('parallel',      ':/icons/Draft_Snap_Parallel.svg'),
                              ('grid',          ':/icons/Draft_Snap_Grid.svg'),
                              ('endpoint',      ':/icons/Draft_Snap_Endpoint.svg'),
                              ('midpoint',      ':/icons/Draft_Snap_Midpoint.svg'),
                              ('perpendicular', ':/icons/Draft_Snap_Perpendicular.svg'),
                              ('angle',         ':/icons/Draft_Snap_Angle.svg'),
                              ('center',        ':/icons/Draft_Snap_Center.svg'),
                              ('ortho',         ':/icons/Draft_Snap_Ortho.svg'),
                              ('intersection',  ':/icons/Draft_Snap_Intersection.svg'),
                              ('special',       ':/icons/Draft_Snap_Special.svg')])


    def _get_wp(self):
        return WorkingPlane.get_working_plane()


    def init_active_snaps(self):
        """
        set self.active_snaps according to user prefs
        """
        self.active_snaps = []
        snap_modes = params.get_param("snapModes")
        i = 0
        for snap in snap_modes:
            if bool(int(snap)):
                self.active_snaps.append(self.snaps[i])
            i += 1


    def set_snap_style(self):
        self.snapStyle = params.get_param("snapStyle")
        if self.snapStyle:
            self.mk = coll.OrderedDict([("passive",       "SQUARE_LINE"),
                                        ("extension",     "SQUARE_LINE"),
                                        ("parallel",      "SQUARE_LINE"),
                                        ("grid",          "SQUARE_FILLED"),
                                        ("endpoint",      "SQUARE_FILLED"),
                                        ("midpoint",      "SQUARE_FILLED"),
                                        ("perpendicular", "SQUARE_FILLED"),
                                        ("angle",         "SQUARE_FILLED"),
                                        ("center",        "SQUARE_FILLED"),
                                        ("ortho",         "SQUARE_FILLED"),
                                        ("intersection",  "SQUARE_FILLED"),
                                        ("special",       "SQUARE_FILLED")])
        else:
            self.mk = coll.OrderedDict([("passive",       "CIRCLE_LINE"),
                                        ("extension",     "CIRCLE_LINE"),
                                        ("parallel",      "CIRCLE_LINE"),
                                        ("grid",          "CIRCLE_LINE"),
                                        ("endpoint",      "CIRCLE_FILLED"),
                                        ("midpoint",      "DIAMOND_FILLED"),
                                        ("perpendicular", "CIRCLE_FILLED"),
                                        ("angle",         "DIAMOND_FILLED"),
                                        ("center",        "CIRCLE_FILLED"),
                                        ("ortho",         "CIRCLE_FILLED"),
                                        ("intersection",  "CIRCLE_FILLED"),
                                        ("special",       "CIRCLE_FILLED")])


    def cstr(self, lastpoint, constrain, point):
        """Return constraints if needed."""
        if constrain or self.mask:
            fpt = self.constrain(point, lastpoint)
        else:
            self.unconstrain()
            fpt = point
        if self.radiusTracker:
            self.radiusTracker.update(fpt)
        return fpt


    def snap(self, screenpos,
             lastpoint=None, active=True,
             constrain=False, noTracker=False):
        """Return a snapped point from the given (x, y) screen position.

        snap(screenpos,lastpoint=None,active=True,constrain=False,
        noTracker=False): returns a snapped point from the given
        (x,y) screenpos (the position of the mouse cursor), active is to
        activate active point snapping or not (passive),
        lastpoint is an optional other point used to draw an
        imaginary segment and get additional snap locations. Constrain can
        be True to constrain the point against the closest working plane axis.
        Screenpos can be a list, a tuple or a coin.SbVec2s object.
        If noTracker is True, the tracking line is not displayed.
        """
        if self.running:
            # do not allow concurrent runs
            return None

        self.running = True

        self.spoint = None

        if params.get_param("SnapBarShowOnlyDuringCommands"):
            toolbar = self.get_snap_toolbar()
            if toolbar:
                toolbar.show()

        self.snapInfo = None

        # Type conversion if needed
        if isinstance(screenpos, list):
            screenpos = tuple(screenpos)
        elif isinstance(screenpos, coin.SbVec2s):
            screenpos = tuple(screenpos.getValue())
        elif not isinstance(screenpos, tuple):
            _wrn("Snap needs valid screen position (list, tuple or sbvec2s)")
            self.running = False
            return None

        # Setup trackers if needed
        self.setTrackers()

        # Get current snap radius
        self.radius = self.getScreenDist(params.get_param("snapRange"),
                                         screenpos)
        if self.radiusTracker:
            self.radiusTracker.update(self.radius)
            self.radiusTracker.off()

        # Activate snap
        if params.get_param("alwaysSnap"):
            active = True

        self.setCursor('passive')
        if self.tracker:
            self.tracker.off()
        if self.extLine2:
            self.extLine2.off()
        if self.extLine:
            self.extLine.off()
        if self.trackLine:
            self.trackLine.off()
        if self.dim1:
            self.dim1.off()
        if self.dim2:
            self.dim2.off()

        point = self.getApparentPoint(screenpos[0], screenpos[1])

        # Set up a track line if we got a last point
        if lastpoint and self.trackLine:
            self.trackLine.p1(lastpoint)

        # Check if parallel to one of the edges of the last objects
        # or to a polar direction
        eline = None
        if active:
            point, eline = self.snapToPolar(point, lastpoint)
            point, eline = self.snapToExtensions(point, lastpoint,
                                                 constrain, eline)

        # Check if we have an object under the cursor and try to
        # snap to it
        _view = Draft.get3DView()
        objectsUnderCursor = _view.getObjectsInfo((screenpos[0], screenpos[1]))
        if objectsUnderCursor:
            if self.snapObjectIndex >= len(objectsUnderCursor):
                self.snapObjectIndex = 0
            self.snapInfo = objectsUnderCursor[self.snapObjectIndex]

        if self.snapInfo and "Component" in self.snapInfo:
            osnap = self.snapToObject(lastpoint, active, constrain, eline, point)
            if osnap:
                self.running = False
                return osnap

        # Nothing has been snapped.
        # Check for grid snap and ext crossings
        if active:
            epoint = self.snapToCrossExtensions(point)
            if epoint:
                point = epoint
            else:
                point = self.snapToGrid(point)
        fp = self.cstr(lastpoint, constrain, point)
        if self.trackLine and lastpoint and (not noTracker):
            self.trackLine.p2(fp)
            self.trackLine.setColor()
            self.trackLine.on()
        # Set the arch point tracking
        if lastpoint:
            self.setArchDims(lastpoint, fp)

        self.spoint = fp
        self.running = False
        return fp


    def cycleSnapObject(self):
        """Increase the index of the snap object by one."""
        self.snapObjectIndex = self.snapObjectIndex + 1


    def snapToObject(self, lastpoint, active, constrain, eline, point):
        """Snap to an object."""

        if not active:
            return None

        parent = self.snapInfo.get("ParentObject", None)
        if parent:
            subname = self.snapInfo["SubName"]
            obj = parent.getSubObject(subname, retType=1)
        else:
            obj = App.ActiveDocument.getObject(self.snapInfo["Object"])
            parent = obj
            subname = self.snapInfo["Component"]

        if not obj \
                or Draft.getType(obj) in UNSNAPPABLES \
                or not getattr(obj.ViewObject, "Selectable", True):
            return None

        snaps = []
        point = App.Vector(self.snapInfo["x"], self.snapInfo["y"], self.snapInfo["z"])
        comp = self.snapInfo["Component"]
        shape = Part.getShape(parent, subname, needSubElement=True, noElementMap=True)

        if not shape.isNull():
            snaps.extend(self.snapToSpecials(obj, lastpoint, eline))

            if Draft.getType(obj) == "Polygon":
                # Special snapping for polygons: add the center
                snaps.extend(self.snapToPolygon(obj))

            elif (Draft.getType(obj) == "BuildingPart"
                  and self.isEnabled("Center")):
                # snap to the base placement of empty BuildingParts
                snaps.append([obj.Placement.Base, 'center',
                              self.toWP(obj.Placement.Base)])

            if (not self.maxEdges) or (len(shape.Edges) <= self.maxEdges):
                if "Edge" in comp:
                    # we are snapping to an edge
                    if shape.ShapeType == "Edge":
                        edge = shape
                        snaps.extend(self.snapToNear(edge, point))
                        snaps.extend(self.snapToEndpoints(edge))
                        snaps.extend(self.snapToMidpoint(edge))
                        snaps.extend(self.snapToPerpendicular(edge, lastpoint))
                        snaps.extend(self.snapToIntersection(edge))
                        snaps.extend(self.snapToElines(edge, eline))

                        et = DraftGeomUtils.geomType(edge)
                        if et == "Circle":
                            # the edge is an arc, we have extra options
                            snaps.extend(self.snapToAngles(edge))
                            snaps.extend(self.snapToCenter(edge))
                        elif et == "Ellipse":
                            # extra ellipse options
                            snaps.extend(self.snapToCenter(edge))
                elif "Face" in comp:
                    # we are snapping to a face
                    if shape.ShapeType == "Face":
                        face = shape
                        snaps.extend(self.snapToNearFace(face, point))
                        snaps.extend(self.snapToPerpendicularFace(face, lastpoint))
                        snaps.extend(self.snapToCenterFace(face))
                elif "Vertex" in comp:
                    # we are snapping to a vertex
                    if shape.ShapeType == "Vertex":
                        snaps.extend(self.snapToEndpoints(shape))
                else:
                    # `Catch-all` for other cases. Probably never executes
                    # as objects with a Shape typically have edges, faces
                    # or vertices.
                    snaps.extend(self.snapToNearUnprojected(point))

        elif Draft.getType(obj) in ("LinearDimension", "AngularDimension"):
            # for dimensions we snap to their 2 points:
            snaps.extend(self.snapToDim(obj))

        elif Draft.getType(obj) == "Axis":
            for edge in obj.Shape.Edges:
                snaps.extend(self.snapToEndpoints(edge))
                snaps.extend(self.snapToIntersection(edge))

        elif Draft.getType(obj).startswith("Mesh::"):
            snaps.extend(self.snapToNearUnprojected(point))
            snaps.extend(self.snapToEndpoints(obj.Mesh))

        elif Draft.getType(obj).startswith("Points::"):
            snaps.extend(self.snapToEndpoints(obj.Points, point))

        elif (Draft.getType(obj) in ("WorkingPlaneProxy", "BuildingPart")
              and self.isEnabled("Center")):
            # snap to the center of WPProxies or to the base
            # placement of no empty BuildingParts
            snaps.append([obj.Placement.Base, 'center',
                          self.toWP(obj.Placement.Base)])

        elif Draft.getType(obj) == "SectionPlane":
            # snap to corners of section planes
            snaps.extend(self.snapToEndpoints(obj.Shape))

        # updating last objects list
        # objects must be added even if no snap has been found for the object
        # otherwise Intersection snap (for example) will not work
        if obj.Name in self.lastObj:
            self.lastObj.remove(obj.Name)
        self.lastObj.append(obj.Name)
        if len(self.lastObj) > 8:
            self.lastObj = self.lastObj[-8:]

        if not snaps:
            return None

        # calculating the nearest snap point
        # a Near ("passive") snap point does not 'win' if a different snap point
        # is within snapRange of the cursor point (in screen coordinates)
        cursor_pt = App.Vector(self.snapInfo["x"], self.snapInfo["y"], self.snapInfo["z"])
        shortest_all = shortest_not_near = 1000000000000000000
        winner_all = winner_not_near = None
        for snap in snaps:
            if (not snap) or (snap[0] is None):
                pass
                # print("debug: Snapper: invalid snap point: ", snaps)
            else:
                dist = snap[0].sub(cursor_pt).Length
                if snap[1] != "passive":
                    if dist < shortest_not_near:
                        shortest_not_near = dist
                        winner_not_near = snap
                if dist < shortest_all:
                    shortest_all = dist
                    winner_all = snap

        if winner_not_near is None or shortest_not_near == shortest_all:
            winner = winner_all
        else:
            view = Draft.get3DView()
            # get screen points with pixel coordinates
            scr_win_not_near_pt = App.Vector(*view.getPointOnScreen(winner_not_near[0]), 0)
            scr_cursor_pt = App.Vector(*view.getPointOnScreen(cursor_pt), 0)
            if scr_win_not_near_pt.sub(scr_cursor_pt).Length <= params.get_param("snapRange"):
                winner = winner_not_near
            else:
                winner = winner_all

        fp = point
        if winner:
            # setting the cursors
            if self.tracker and not self.selectMode:
                self.tracker.setCoords(winner[2])
                self.tracker.setMarker(self.mk[winner[1]])
                self.tracker.on()
            # setting the trackline
            fp = self.cstr(lastpoint, constrain, winner[2])
            if self.trackLine and lastpoint:
                self.trackLine.p2(fp)
                self.trackLine.setColor()
                self.trackLine.on()
            # set the cursor
            self.setCursor(winner[1])

            # set the arch point tracking
            if lastpoint:
                self.setArchDims(lastpoint, fp)

        # return the final point
        self.spoint = fp
        return self.spoint


    def toWP(self, point):
        """Project the given point on the working plane, if needed."""
        if self.isEnabled("WorkingPlane"):
            return self._get_wp().project_point(point)
        return point


    def getApparentPoint(self, x, y):
        """Return a 3D point, projected on the current working plane."""
        view = Draft.get3DView()
        pt = view.getPoint(x, y)
        if self.mask != "z":
            if view.getCameraType() == "Perspective":
                camera = view.getCameraNode()
                p = camera.getField("position").getValue()
                dv = pt.sub(App.Vector(p[0], p[1], p[2]))
            else:
                dv = view.getViewDirection()
            return self._get_wp().project_point(pt, dv)
        return pt


    def snapToDim(self, obj):
        snaps = []
        if self.isEnabled("Endpoint") \
                and obj.ViewObject \
                and hasattr(obj.ViewObject.Proxy, "p2") \
                and hasattr(obj.ViewObject.Proxy, "p3"):
            snaps.append([obj.ViewObject.Proxy.p2, 'endpoint', self.toWP(obj.ViewObject.Proxy.p2)])
            snaps.append([obj.ViewObject.Proxy.p3, 'endpoint', self.toWP(obj.ViewObject.Proxy.p3)])
        return snaps


    def snapToExtensions(self, point, last, constrain, eline):
        """Return a point snapped to extension or parallel line.

        The parallel line of the last object, if any.
        """
        tsnap = self.snapToHold(point)
        if tsnap:
            if self.tracker and not self.selectMode:
                self.tracker.setCoords(tsnap[2])
                self.tracker.setMarker(self.mk[tsnap[1]])
                self.tracker.on()
            if self.extLine:
                self.extLine.p1(tsnap[0])
                self.extLine.p2(tsnap[2])
                self.extLine.setColor()
                self.extLine.on()
            self.setCursor(tsnap[1])
            return tsnap[2], eline
        if self.isEnabled("Extension"):
            tsnap = self.snapToExtOrtho(last, constrain, eline)
            if tsnap:
                if (tsnap[0].sub(point)).Length < self.radius:
                    if self.tracker and not self.selectMode:
                        self.tracker.setCoords(tsnap[2])
                        self.tracker.setMarker(self.mk[tsnap[1]])
                        self.tracker.on()
                    if self.extLine:
                        self.extLine.p2(tsnap[2])
                        self.extLine.setColor()
                        self.extLine.on()
                    self.setCursor(tsnap[1])
                    return tsnap[2], eline
            else:
                tsnap = self.snapToExtPerpendicular(last)
                if tsnap:
                    if (tsnap[0].sub(point)).Length < self.radius:
                        if self.tracker and not self.selectMode:
                            self.tracker.setCoords(tsnap[2])
                            self.tracker.setMarker(self.mk[tsnap[1]])
                            self.tracker.on()
                        if self.extLine:
                            self.extLine.p2(tsnap[2])
                            self.extLine.setColor()
                            self.extLine.on()
                        self.setCursor(tsnap[1])
                        return tsnap[2], eline

        for o in self.lastObj:
            if (self.isEnabled('Extension')
                    or self.isEnabled('Parallel')):
                ob = App.ActiveDocument.getObject(o)
                if not ob:
                    continue
                if not ob.isDerivedFrom("Part::Feature"):
                    continue
                edges = ob.Shape.Edges
                if Draft.getType(ob) == "Wall":
                    for so in [ob]+ob.Additions:
                        if Draft.getType(so) == "Wall":
                            if so.Base:
                                edges.extend(so.Base.Shape.Edges)
                                edges.reverse()
                if (not self.maxEdges) or (len(edges) <= self.maxEdges):
                    for e in edges:
                        if DraftGeomUtils.geomType(e) != "Line":
                            continue
                        np = self.getPerpendicular(e,point)
                        if (np.sub(point)).Length < self.radius:
                            if self.isEnabled('Extension'):
                                if DraftGeomUtils.isPtOnEdge(np,e):
                                    continue
                                if np != e.Vertexes[0].Point:
                                    p0 = e.Vertexes[0].Point
                                    if self.tracker and not self.selectMode:
                                        self.tracker.setCoords(np)
                                        self.tracker.setMarker(self.mk['extension'])
                                        self.tracker.on()
                                    if self.extLine:
                                        self.extLine.p1(p0)
                                        self.extLine.p2(np)
                                        self.extLine.setColor()
                                        self.extLine.on()
                                    self.setCursor('extension')
                                    ne = Part.LineSegment(p0,np).toShape()
                                    # storing extension line for intersection calculations later
                                    if len(self.lastExtensions) == 0:
                                        self.lastExtensions.append(ne)
                                    elif len(self.lastExtensions) == 1:
                                        if not DraftGeomUtils.areColinear(ne,self.lastExtensions[0]):
                                            self.lastExtensions.append(self.lastExtensions[0])
                                            self.lastExtensions[0] = ne
                                    else:
                                        if (not DraftGeomUtils.areColinear(ne,self.lastExtensions[0])) and \
                                                (not DraftGeomUtils.areColinear(ne,self.lastExtensions[1])):
                                            self.lastExtensions[1] = self.lastExtensions[0]
                                            self.lastExtensions[0] = ne
                                    return np,ne
                        elif self.isEnabled('Parallel'):
                            if last:
                                ve = DraftGeomUtils.vec(e)
                                if not DraftVecUtils.isNull(ve):
                                    de = Part.LineSegment(last,last.add(ve)).toShape()
                                    np = self.getPerpendicular(de,point)
                                    if (np.sub(point)).Length < self.radius:
                                        if self.tracker and not self.selectMode:
                                            self.tracker.setCoords(np)
                                            self.tracker.setMarker(self.mk['parallel'])
                                            self.tracker.on()
                                        self.setCursor('parallel')
                                        return np,de
        return point,eline


    def snapToCrossExtensions(self, point):
        """Snap to the intersection of the last 2 extension lines."""
        if self.isEnabled('Extension'):
            if len(self.lastExtensions) == 2:
                np = DraftGeomUtils.findIntersection(self.lastExtensions[0], self.lastExtensions[1], True, True)
                if np:
                    for p in np:
                        dv = point.sub(p)
                        if (self.radius == 0) or (dv.Length <= self.radius):
                            if self.tracker and not self.selectMode:
                                self.tracker.setCoords(p)
                                self.tracker.setMarker(self.mk['intersection'])
                                self.tracker.on()
                            self.setCursor('intersection')
                            if self.extLine and self.extLine2:
                                if DraftVecUtils.equals(self.extLine.p1(), self.lastExtensions[0].Vertexes[0].Point):
                                    p0 = self.lastExtensions[1].Vertexes[0].Point
                                else:
                                    p0 = self.lastExtensions[0].Vertexes[0].Point
                                self.extLine2.p1(p0)
                                self.extLine2.p2(p)
                                self.extLine.p2(p)
                                self.extLine.setColor()
                                self.extLine2.on()
                            return p
        return None


    def snapToPolar(self,point,last):
        """Snap to polar lines from the given point."""
        if self.isEnabled('Ortho') and (not self.mask):
            if last:
                vecs = []
                wp = self._get_wp()
                ax = [wp.u, wp.v, wp.axis]
                for a in self.polarAngles:
                    if a == 90:
                        vecs.extend([ax[0], ax[0].negative()])
                        vecs.extend([ax[1], ax[1].negative()])
                    else:
                        v = DraftVecUtils.rotate(ax[0], math.radians(a), ax[2])
                        vecs.extend([v, v.negative()])
                        v = DraftVecUtils.rotate(ax[1], math.radians(a), ax[2])
                        vecs.extend([v, v.negative()])
                for v in vecs:
                    if not DraftVecUtils.isNull(v):
                        try:
                            de = Part.LineSegment(last, last.add(v)).toShape()
                        except Part.OCCError:
                            return point, None
                        np = self.getPerpendicular(de, point)
                        if ((self.radius == 0) and (point.sub(last).getAngle(v) < 0.087)) \
                        or ((np.sub(point)).Length < self.radius):
                            if self.tracker and not self.selectMode:
                                self.tracker.setCoords(np)
                                self.tracker.setMarker(self.mk['parallel'])
                                self.tracker.on()
                                self.setCursor('ortho')
                            return np,de
        return point, None


    def snapToGrid(self, point):
        """Return a grid snap point if available."""
        if self.grid:
            if self.grid.Visible:
                if self.isEnabled("Grid"):
                    np = self.grid.getClosestNode(point)
                    if np:
                        dv = point.sub(np)
                        if (self.radius == 0) or (dv.Length <= self.radius):
                            if self.tracker and not self.selectMode:
                                self.tracker.setCoords(np)
                                self.tracker.setMarker(self.mk['grid'])
                                self.tracker.on()
                            self.setCursor('grid')
                            return np
        return point


    def snapToEndpoints(self, shape, point=None):
        """Return a list of endpoints snap locations."""
        if self.isEnabled("Endpoint"):
            if hasattr(shape, "Vertexes"):
                snaps = []
                for v in shape.Vertexes:
                    snaps.append([v.Point, "endpoint", self.toWP(v.Point)])
                return snaps
            if hasattr(shape, "Point"):
                return [[shape.Point, "endpoint", self.toWP(shape.Point)]]
            if hasattr(shape, "Points") and point is not None:
                # point cloud
                # Same as snapToNearUnprojected.
                # Processing individual points in a large point cloud is way too slow:
                # https://github.com/FreeCAD/FreeCAD/issues/22367
                # Must come before handling of mesh as even accessing shape.Points is slow then.
                return [[point, "endpoint", self.toWP(point)]]
            if hasattr(shape, "Points"):
                # mesh
                pts = shape.Points
                if pts and hasattr(pts[0], "Vector"):
                    snaps = []
                    for pt in pts:
                        snaps.append([pt.Vector, "endpoint", self.toWP(pt.Vector)])
                    return snaps
        return []


    def snapToMidpoint(self, shape):
        """Return a list of midpoints snap locations."""
        snaps = []
        if self.isEnabled("Midpoint"):
            if isinstance(shape, Part.Edge):
                mp = DraftGeomUtils.findMidpoint(shape)
                if mp:
                    snaps.append([mp, 'midpoint', self.toWP(mp)])
        return snaps


    def snapToNear(self, shape, point):
        """Return a list with a near snap location for an edge."""
        if self.isEnabled("Near") and point:
            try:
                np = shape.Curve.projectPoint(point, "NearestPoint")
            except Exception:
                return []
            return [[np, "passive", self.toWP(np)]]
        else:
            return []


    def snapToNearFace(self, shape, point):
        """Return a list with a near snap location for a face."""
        if self.isEnabled("Near") and point:
            try:
                np = shape.Surface.projectPoint(point, "NearestPoint")
            except Exception:
                return []
            return [[np, "passive", self.toWP(np)]]
        else:
            return []


    def snapToNearUnprojected(self, point):
        """Return a list with a near snap location that is not projected on the object."""
        if self.isEnabled("Near") and point:
            return [[point, "passive", self.toWP(point)]]
        else:
            return []


    def snapToPerpendicular(self, shape, last):
        """Return a list of perpendicular snap locations for an edge."""
        if self.isEnabled("Perpendicular") and last:
            curv = shape.Curve
            try:
                prs = curv.projectPoint(last, "Parameter")
            except Exception:
                return []
            snaps = []
            for pr in prs:
                np = curv.value(pr)
                snaps.append([np, "perpendicular", self.toWP(np)])
            return snaps
        else:
            return []


    def snapToPerpendicularFace(self, shape, last):
        """Return a list of perpendicular snap locations for a face."""
        if self.isEnabled("Perpendicular") and last:
            surf = shape.Surface
            try:
                prs = surf.projectPoint(last, "Parameters")
            except Exception:
                return []
            snaps = []
            for pr in prs:
                np = surf.value(pr[0], pr[1])
                snaps.append([np, "perpendicular", self.toWP(np)])
            return snaps
        else:
            return []


    def snapToOrtho(self, shape, last, constrain):
        """Return a list of ortho snap locations."""
        snaps = []
        if self.isEnabled("Ortho"):
            if constrain:
                if isinstance(shape, Part.Edge):
                    if last:
                        if DraftGeomUtils.geomType(shape) == "Line":
                            if self.constraintAxis:
                                tmpEdge = Part.LineSegment(last, last.add(self.constraintAxis)).toShape()
                                # get the intersection points
                                pt = DraftGeomUtils.findIntersection(tmpEdge, shape, True, True)
                                if pt:
                                    for p in pt:
                                        snaps.append([p, 'ortho', self.toWP(p)])
        return snaps


    def snapToExtOrtho(self, last, constrain, eline):
        """Return an ortho X extension snap location."""
        if self.isEnabled("Extension") and self.isEnabled("Ortho"):
            if constrain and last and self.constraintAxis and self.extLine:
                tmpEdge1 = Part.LineSegment(last, last.add(self.constraintAxis)).toShape()
                tmpEdge2 = Part.LineSegment(self.extLine.p1(), self.extLine.p2()).toShape()
                # get the intersection points
                pt = DraftGeomUtils.findIntersection(tmpEdge1, tmpEdge2, True, True)
                if pt:
                    return [pt[0], 'ortho', pt[0]]
            if eline:
                try:
                    tmpEdge2 = Part.LineSegment(self.extLine.p1(), self.extLine.p2()).toShape()
                    # get the intersection points
                    pt = DraftGeomUtils.findIntersection(eline, tmpEdge2, True, True)
                    if pt:
                        return [pt[0], 'ortho', pt[0]]
                except Exception:
                    return None
        return None


    def snapToHold(self, point):
        """Return a snap location that is orthogonal to hold points.

        Or if possible at crossings.
        """
        if not self.holdPoints:
            return None
        wp = self._get_wp()
        u = wp.u
        v = wp.v
        if len(self.holdPoints) > 1:
            # first try mid points
            if self.isEnabled("Midpoint"):
                l = list(self.holdPoints)
                for p1, p2 in itertools.combinations(l, 2):
                    p3 = p1.add((p2.sub(p1)).multiply(0.5))
                    if (p3.sub(point)).Length < self.radius:
                        return [p1, 'midpoint', p3]
            # then try int points
            ipoints = []
            l = list(self.holdPoints)
            while len(l) > 1:
                p1 = l.pop()
                for p2 in l:
                    i1 = DraftGeomUtils.findIntersection(p1, p1.add(u), p2, p2.add(v), True, True)
                    if i1:
                        ipoints.append([p1, i1[0]])
                    i2 = DraftGeomUtils.findIntersection(p1, p1.add(v), p2, p2.add(u), True, True)
                    if i2:
                        ipoints.append([p1, i2[0]])
            for p in ipoints:
                if (p[1].sub(point)).Length < self.radius:
                    return [p[0], 'ortho', p[1]]
        # then try to stick to a line
        for p in self.holdPoints:
            d = DraftGeomUtils.findDistance(point, [p, p.add(u)])
            if d:
                if d.Length < self.radius:
                    fp = point.add(d)
                    return [p, 'extension', fp]
            d = DraftGeomUtils.findDistance(point, [p, p.add(v)])
            if d:
                if d.Length < self.radius:
                    fp = point.add(d)
                    return [p, 'extension', fp]
        return None


    def snapToExtPerpendicular(self, last):
        """Return a perpendicular X extension snap location."""
        if self.isEnabled("Extension") and self.isEnabled("Perpendicular"):
            if last and self.extLine:
                if self.extLine.p1() != self.extLine.p2():
                    tmpEdge = Part.LineSegment(self.extLine.p1(), self.extLine.p2()).toShape()
                    np = self.getPerpendicular(tmpEdge, last)
                    return [np, 'perpendicular', np]
        return None


    def snapToElines(self, e1, e2):
        """Return a snap at the infinite intersection of the given edges."""
        snaps = []
        if self.isEnabled("Intersection") and self.isEnabled("Extension"):
            if e1 and e2:
                # get the intersection points
                pts = DraftGeomUtils.findIntersection(e1, e2, True, True)
                if pts:
                    for p in pts:
                        snaps.append([p, 'intersection', self.toWP(p)])
        return snaps


    def snapToAngles(self, shape):
        """Return a list of angle snap locations."""
        snaps = []
        if self.isEnabled("Angle"):
            place = App.Placement()
            place.Base = shape.Curve.Center
            place.Rotation = App.Rotation(App.Vector(1, 0, 0),
                                          App.Vector(0, 1, 0),
                                          shape.Curve.Axis,
                                          'ZXY')
            rad = shape.Curve.Radius
            for deg in (0, 30, 45, 60,
                        90,  120, 135, 150,
                        180, 210, 225, 240,
                        270, 300, 315, 330):
                ang = math.radians(deg)
                cur = App.Vector(math.sin(ang) * rad, math.cos(ang) * rad, 0)
                cur = place.multVec(cur)
                snaps.append([cur, 'angle', self.toWP(cur)])
        return snaps


    def snapToCenter(self, shape):
        """Return a list of center snap locations."""
        snaps = []
        if self.isEnabled("Center"):
            cen = shape.Curve.Center
            cen_wp = self.toWP(cen)
            if hasattr(shape.Curve, "Radius"):
                place = App.Placement()
                place.Base = cen
                place.Rotation = App.Rotation(App.Vector(1, 0, 0),
                                              App.Vector(0, 1, 0),
                                              shape.Curve.Axis,
                                              'ZXY')
                rad = shape.Curve.Radius
                for deg in (15, 37.5, 52.5, 75,
                            105, 127.5, 142.5, 165,
                            195, 217.5, 232.5, 255,
                            285, 307.5, 322.5, 345):
                    ang = math.radians(deg)
                    cur = App.Vector(math.sin(ang) * rad, math.cos(ang) * rad, 0)
                    cur = place.multVec(cur)
                    snaps.append([cur, 'center', cen_wp])
            else:
                snaps.append([cen, 'center', cen_wp])
        return snaps


    def snapToCenterFace(self, shape):
        """Return a face center snap location."""
        snaps = []
        if self.isEnabled("Center"):
            pos = shape.CenterOfMass
            c = self.toWP(pos)
            snaps.append([pos, 'center', c])
        return snaps


    def snapToIntersection(self, shape):
        """Return a list of intersection snap locations."""
        snaps = []
        if self.isEnabled("Intersection"):
            # get the stored objects to calculate intersections
            for o in self.lastObj:
                obj = App.ActiveDocument.getObject(o)
                if obj:
                    if obj.isDerivedFrom("Part::Feature") or (Draft.getType(obj) == "Axis"):
                        if (not self.maxEdges) or (len(obj.Shape.Edges) <= self.maxEdges):
                            for e in obj.Shape.Edges:
                                # get the intersection points
                                try:
                                    if self.isEnabled("WorkingPlane") and hasattr(e,"Curve") and isinstance(e.Curve,(Part.Line,Part.LineSegment)) and hasattr(shape,"Curve") and isinstance(shape.Curve,(Part.Line,Part.LineSegment)):
                                        # get apparent intersection (lines projected on WP)
                                        p1 = self.toWP(e.Vertexes[0].Point)
                                        p2 = self.toWP(e.Vertexes[-1].Point)
                                        p3 = self.toWP(shape.Vertexes[0].Point)
                                        p4 = self.toWP(shape.Vertexes[-1].Point)
                                        pt = DraftGeomUtils.findIntersection(p1, p2, p3, p4, True, True)
                                    else:
                                        pt = DraftGeomUtils.findIntersection(e, shape)
                                    if pt:
                                        for p in pt:
                                            snaps.append([p, 'intersection', self.toWP(p)])
                                except Exception:
                                    pass
                                    # some curve types yield an error
                                    # when trying to read their types
        return snaps


    def snapToPolygon(self, obj):
        """Return a list of polygon center snap locations."""
        snaps = []
        if self.isEnabled("Center"):
            c = obj.Placement.Base
            for edge in obj.Shape.Edges:
                p1 = edge.Vertexes[0].Point
                p2 = edge.Vertexes[-1].Point
                v1 = p1.add((p2 - p1).scale(0.25, 0.25, 0.25))
                v2 = p1.add((p2 - p1).scale(0.75, 0.75, 0.75))
                snaps.append([v1, 'center', self.toWP(c)])
                snaps.append([v2, 'center', self.toWP(c)])
        return snaps


    def snapToSpecials(self, obj, lastpoint=None, eline=None):
        """Return special snap locations, if any."""
        snaps = []
        if self.isEnabled("Special"):

            if (Draft.getType(obj) == "Wall"):
                # special snapping for wall: snap to its base shape if it is linear
                if obj.Base:
                    if not obj.Base.Shape.Solids:
                        for v in obj.Base.Shape.Vertexes:
                            snaps.append([v.Point, 'special', self.toWP(v.Point)])

            elif (Draft.getType(obj) == "Structure"):
                # special snapping for struct: only to its base point
                if obj.Base:
                    if not obj.Base.Shape.Solids:
                        for v in obj.Base.Shape.Vertexes:
                            snaps.append([v.Point, 'special', self.toWP(v.Point)])
                else:
                    b = obj.Placement.Base
                    snaps.append([b, 'special', self.toWP(b)])
                if obj.ViewObject.ShowNodes:
                    for edge in obj.Proxy.getNodeEdges(obj):
                        snaps.extend(self.snapToEndpoints(edge))
                        snaps.extend(self.snapToMidpoint(edge))
                        snaps.extend(self.snapToPerpendicular(edge, lastpoint))
                        snaps.extend(self.snapToIntersection(edge))
                        snaps.extend(self.snapToElines(edge, eline))

            elif hasattr(obj, "SnapPoints"):
                for p in obj.SnapPoints:
                    p2 = obj.Placement.multVec(p)
                    snaps.append([p2, 'special', p2])

        return snaps


    def getScreenDist(self, dist, cursor):
        """Return a distance in 3D space from a screen pixels distance."""
        view = Draft.get3DView()
        p1 = view.getPoint(cursor)
        p2 = view.getPoint((cursor[0] + dist, cursor[1]))
        return (p2.sub(p1)).Length


    def getPerpendicular(self, edge, pt):
        """Return a point on an edge, perpendicular to the given point."""
        dv = pt.sub(edge.Vertexes[0].Point)
        nv = DraftVecUtils.project(dv, DraftGeomUtils.vec(edge))
        np = (edge.Vertexes[0].Point).add(nv)
        return np


    def setArchDims(self, p1, p2):
        """Show arc dimensions between 2 points."""
        if self.isEnabled("Dimensions"):
            if not self.dim1:
                self.dim1 = trackers.archDimTracker(mode=2)
            if not self.dim2:
                self.dim2 = trackers.archDimTracker(mode=3)
            self.dim1.p1(p1)
            self.dim2.p1(p1)
            self.dim1.p2(p2)
            self.dim2.p2(p2)
            if self.dim1.Distance:
                self.dim1.on()
            if self.dim2.Distance:
                self.dim2.on()

    def get_quarter_widget(self, mw):
        views = []
        for w in mw.findChild(QtWidgets.QMdiArea).findChildren(QtWidgets.QWidget):
            if w.inherits("SIM::Coin3D::Quarter::QuarterWidget"):
                views.append(w)
        return views

    def device_pixel_ratio(self):
        device_pixel_ratio = 1
        for w in self.get_quarter_widget(Gui.getMainWindow()):
            device_pixel_ratio = w.devicePixelRatio()
        return device_pixel_ratio

    def get_cursor_with_tail(self, base_icon_name, tail_icon_name=None):
        # Other cursor code in scr:
        # src/Gui/CommandView.cpp
        # src/Mod/Mesh/Gui/MeshSelection.cpp
        # src/Mod/Sketcher/Gui/CommandConstraints.cpp

        #   +--------+
        #   |  base  |          vertical offset = 0.5*w
        # w |        +--------+
        #   |   w    |  tail  |
        #   +--------+        | w = width = 16
        #            |   w    |
        #            +--------+

        dpr = self.device_pixel_ratio()
        width = 16 * dpr
        new_icon = QtGui.QPixmap(2 * width, 1.5 * width)
        new_icon.fill(QtCore.Qt.transparent)
        base_icon = QtGui.QPixmap(base_icon_name).scaledToWidth(width)
        qp = QtGui.QPainter()
        qp.begin(new_icon)
        qp.drawPixmap(0, 0, base_icon)
        if tail_icon_name is not None:
            tail_icon = QtGui.QPixmap(tail_icon_name).scaledToWidth(width)
            qp.drawPixmap(width, 0.5 * width, tail_icon)
        qp.end()
        new_icon.setDevicePixelRatio(dpr)
        return QtGui.QCursor(new_icon, 8, 8)

    def setCursor(self, mode=None):
        """Set or reset the cursor to the given mode or resets."""
        if self.selectMode:
            for w in self.get_quarter_widget(Gui.getMainWindow()):
                w.unsetCursor()
            self.cursorMode = None
        elif not mode:
            for w in self.get_quarter_widget(Gui.getMainWindow()):
                w.unsetCursor()
            self.cursorMode = None
        else:
            if mode != self.cursorMode:
                base_icon_name = ":/icons/Draft_Cursor.svg"
                tail_icon_name = None
                if not (mode == 'passive'):
                    tail_icon_name = self.cursors[mode]
                cur = self.get_cursor_with_tail(base_icon_name, tail_icon_name)
                for w in self.get_quarter_widget(Gui.getMainWindow()):
                    w.setCursor(cur)
                self.cursorMode = mode

    def restack(self):
        """Lower the grid tracker so it doesn't obscure other objects."""
        if self.grid:
            self.grid.lowerTracker()


    def off(self):
        """Finish snapping."""
        if self.tracker:
            self.tracker.off()
        if self.trackLine:
            self.trackLine.off()
        if self.extLine:
            self.extLine.off()
        if self.extLine2:
            self.extLine2.off()
        if self.radiusTracker:
            self.radiusTracker.off()
        if self.dim1:
            self.dim1.off()
        if self.dim2:
            self.dim2.off()
        if self.holdTracker:
            self.holdTracker.clear()
            self.holdTracker.off()
        self.unconstrain()
        self.radius = 0
        self.setCursor()
        self.mask = None
        self.selectMode = False
        self.running = False
        self.holdPoints = []
        self.lastObj = []

        if hasattr(App, "activeDraftCommand") and App.activeDraftCommand:
            return
        if self.grid:
            if self.grid.show_always is False:
                self.grid.off()
        if params.get_param("SnapBarShowOnlyDuringCommands"):
            toolbar = self.get_snap_toolbar()
            if toolbar:
                toolbar.hide()


    def setSelectMode(self, mode):
        """Set the snapper into select mode (hides snapping temporarily)."""
        self.selectMode = mode
        if not mode:
            self.setCursor()
        else:
            if self.trackLine:
                self.trackLine.off()


    def setAngle(self, delta=None):
        """Keep the current angle."""
        if delta:
            self.mask = delta
        elif isinstance(self.mask, App.Vector):
            self.mask = None
        elif self.trackLine:
            if self.trackLine.Visible:
                self.mask = self.trackLine.p2().sub(self.trackLine.p1())


    def constrain(self, point, basepoint=None, axis=None):
        """Return a constrained point.

        constrain(point,basepoint=None,axis=None: Returns a
        constrained point. Axis can be "x","y" or "z" or a custom vector. If None,
        the closest working plane axis will be picked.
        Basepoint is the base point used to figure out from where the point
        must be constrained. If no basepoint is given, the current point is
        used as basepoint.
        """
        point = App.Vector(point)

        # setup trackers if needed
        if not self.constrainLine:
            self.constrainLine = trackers.lineTracker(dotted=True)

        # setting basepoint
        if not basepoint:
            if not self.basepoint:
                self.basepoint = point
        else:
            self.basepoint = basepoint
        delta = point.sub(self.basepoint)

        if Gui.draftToolBar.globalMode:
            import WorkingPlane
            wp = WorkingPlane.PlaneBase()  # matches the global coordinate system
        else:
            wp = self._get_wp()

        # setting constraint axis
        if axis == "x":
            self.constraintAxis = wp.u
        elif axis == "y":
            self.constraintAxis = wp.v
        elif axis == "z":
            self.constraintAxis = wp.axis
        elif isinstance(axis, App.Vector):
            self.constraintAxis = axis
        else:
            if self.mask is not None:
                self.affinity = self.mask
            if self.affinity is None:
                self.affinity = wp.get_closest_axis(delta)
            if self.affinity == "x":
                self.constraintAxis = wp.u
            elif self.affinity == "y":
                self.constraintAxis = wp.v
            elif self.affinity == "z":
                self.constraintAxis = wp.axis
            elif isinstance(self.affinity, App.Vector):
                self.constraintAxis = self.affinity
            else:
                self.constraintAxis = None

        if self.constraintAxis is None:
            return point

        # calculating constrained point
        cdelta = DraftVecUtils.project(delta, self.constraintAxis)
        npoint = self.basepoint.add(cdelta)

        # setting constrain line
        if self.constrainLine:
            if point != npoint:
                self.constrainLine.p1(point)
                self.constrainLine.p2(npoint)
                self.constrainLine.on()
            else:
                self.constrainLine.off()

        return npoint


    def unconstrain(self):
        """Unset the basepoint and the constrain line."""
        self.basepoint = None
        self.affinity = None
        if self.constrainLine:
            self.constrainLine.off()


    def getPoint(self, last=None, callback=None, movecallback=None,
                 extradlg=None, title=None, mode="point"):
        """Get a 3D point from the screen.

        getPoint([last],[callback],[movecallback],[extradlg],[title]):
        gets a 3D point from the screen. You can provide an existing point,
        in that case additional snap options and a tracker are available.
        You can also pass a function as callback, which will get called
        with the resulting point as argument, when a point is clicked,
        and optionally another callback which gets called when
        the mouse is moved.

        If the operation gets cancelled (the user pressed Escape),
        no point is returned.

        Example:

        def cb(point):
            if point:
                print "got a 3D point: ",point

        Gui.Snapper.getPoint(callback=cb)

        If the callback function accepts more than one argument,
        it will also receive the last snapped object. Finally, a qt widget
        can be passed as an extra taskbox.
        title is the title of the point task box mode is the dialog box
        you want (default is point, you can also use wire and line)

        If getPoint() is invoked without any argument, nothing is done
        but the callbacks are removed, so it can be used as a cancel function.
        """
        self.pt = None
        self.holdPoints = []
        self.ui = Gui.draftToolBar
        self.view = Draft.get3DView()

        # remove any previous leftover callbacks
        try:
            if self.callbackClick:
                self.view.removeEventCallbackPivy(coin.SoMouseButtonEvent.getClassTypeId(), self.callbackClick)
            if self.callbackMove:
                self.view.removeEventCallbackPivy(coin.SoLocation2Event.getClassTypeId(), self.callbackMove)
            if self.callbackClick or self.callbackMove:
                # Next line fixes https://github.com/FreeCAD/FreeCAD/issues/10469:
                gui_utils.end_all_events()
        except RuntimeError:
            # the view has been deleted already
            pass
        self.callbackClick = None
        self.callbackMove = None

        def move(event_cb):
            if not self.ui.mouse:
                return
            event = event_cb.getEvent()
            mousepos = event.getPosition()
            ctrl = event.wasCtrlDown()
            shift = event.wasShiftDown()
            self.pt = Gui.Snapper.snap(mousepos, lastpoint=last,
                                       active=ctrl, constrain=shift)
            self.ui.displayPoint(self.pt, last,
                                 plane=self._get_wp(),
                                 mask=Gui.Snapper.affinity)
            if movecallback:
                movecallback(self.pt, self.snapInfo)

        def getcoords(point, global_mode=True, relative_mode=False):
            """Get the global coordinates from a point."""
            # Same algorithm as in validatePoint in DraftGui.py.
            ref = App.Vector(0, 0, 0)
            if global_mode is False:
                wp = self._get_wp()
                point = wp.get_global_coords(point, as_vector=True)
                ref = wp.get_global_coords(ref)
            if relative_mode is True and last is not None:
                ref = last
            self.pt = point + ref
            accept()

        def click(event_cb):
            if not self.ui.mouse:
                return
            event = event_cb.getEvent()
            if event.getButton() == 1:
                if event.getState() == coin.SoMouseButtonEvent.DOWN:
                    accept()

        def accept():
            try:
                if self.callbackClick:
                    self.view.removeEventCallbackPivy(coin.SoMouseButtonEvent.getClassTypeId(), self.callbackClick)
                if self.callbackMove:
                    self.view.removeEventCallbackPivy(coin.SoLocation2Event.getClassTypeId(), self.callbackMove)
                if self.callbackClick or self.callbackMove:
                    # Next line fixes https://github.com/FreeCAD/FreeCAD/issues/10469:
                    gui_utils.end_all_events()
            except RuntimeError:
                # the view has been deleted already
                pass
            self.callbackClick = None
            self.callbackMove = None
            Gui.Snapper.off()
            self.ui.offUi()
            if callback:
                if len(inspect.getfullargspec(callback).args) > 1:
                    obj = None
                    if self.snapInfo and ("Object" in self.snapInfo) and self.snapInfo["Object"]:
                        obj = App.ActiveDocument.getObject(self.snapInfo["Object"])
                    callback(self.pt, obj)
                else:
                    callback(self.pt)
            self.pt = None

        def cancel():
            try:
                if self.callbackClick:
                    self.view.removeEventCallbackPivy(coin.SoMouseButtonEvent.getClassTypeId(), self.callbackClick)
                if self.callbackMove:
                    self.view.removeEventCallbackPivy(coin.SoLocation2Event.getClassTypeId(), self.callbackMove)
                if self.callbackClick or self.callbackMove:
                    # Next line fixes https://github.com/FreeCAD/FreeCAD/issues/10469:
                    gui_utils.end_all_events()
            except RuntimeError:
                # the view has been deleted already
                pass
            self.callbackClick = None
            self.callbackMove = None
            Gui.Snapper.off()
            self.ui.offUi()
            if callback:
                if len(inspect.getfullargspec(callback).args) > 1:
                    callback(None, None)
                else:
                    callback(None)

        # adding callback functions
        if mode == "line":
            interface = self.ui.lineUi
        elif mode == "wire":
            interface = self.ui.wireUi
        else:
            interface = self.ui.pointUi
        if callback:
            if title:
                interface(title=title, cancel=cancel, getcoords=getcoords,
                          extra=extradlg, rel=bool(last))
            else:
                interface(cancel=cancel,getcoords=getcoords,extra=extradlg,rel=bool(last))
            self.callbackClick = self.view.addEventCallbackPivy(coin.SoMouseButtonEvent.getClassTypeId(),click)
            self.callbackMove = self.view.addEventCallbackPivy(coin.SoLocation2Event.getClassTypeId(),move)


    def get_snap_toolbar(self):
        """Get the snap toolbar."""
        if not (hasattr(self, "toolbar") and self.toolbar):
            mw = Gui.getMainWindow()
            self.toolbar = mw.findChild(QtWidgets.QToolBar, "Draft snap")
        if self.toolbar:
            return self.toolbar


    def toggleGrid(self):
        """Toggle FreeCAD Draft Grid."""
        Gui.runCommand("Draft_ToggleGrid")


    def showradius(self):
        """Show the snap radius indicator."""
        self.radius = self.getScreenDist(params.get_param("snapRange"),
                                         (400, 300))
        if self.radiusTracker:
            self.radiusTracker.update(self.radius)
            self.radiusTracker.on()


    def isEnabled(self, snap):
        """Returns true if the given snap is on"""
        if "Lock" in self.active_snaps and snap in self.active_snaps:
            return True
        else:
            return False


    def toggle_snap(self, snap, set_to = None):
        """Sets the given snap on/off according to the given parameter"""
        if set_to: # set mode
            if set_to is True:
                if not snap in self.active_snaps:
                    self.active_snaps.append(snap)
                status = True
            elif set_to is False:
                if snap in self.active_snaps:
                    self.active_snaps.remove(snap)
                status = False
        else: # toggle mode, default
            if not snap in self.active_snaps:
                self.active_snaps.append(snap)
                status = True
            elif snap in self.active_snaps:
                self.active_snaps.remove(snap)
                status = False
        self.save_snap_state()
        return status


    def save_snap_state(self):
        """
        Save snap state to user preferences to be restored in next session.
        """
        snap_modes = ""
        for snap in self.snaps:
            if snap in self.active_snaps:
                snap_modes += "1"
            else:
                snap_modes += "0"
        params.set_param("snapModes", snap_modes)


    def show_hide_grids(self, show=True):
        """Show the grid in all 3D views where it was previously visible, or
        hide the grid in all 3D view. Used when switching to different workbenches.

        Hiding the grid can be prevented by setting the GridHideInOtherWorkbenches
        preference to `False`.
        """
        if (not show) and (not params.get_param("GridHideInOtherWorkbenches")):
            return
        mw = Gui.getMainWindow()
        views = mw.getWindowsOfType(App.Base.TypeId.fromName("Gui::View3DInventor"))  # All 3D views.
        for view in views:
            if view in self.trackers[0]:
                i = self.trackers[0].index(view)
                grid = self.trackers[1][i]
                if show and grid.show_always:
                    grid.on()
                else:
                    grid.off()


    def show(self):
        """Show the grid in all 3D views where it was previously visible."""
        self.show_hide_grids(show=True)


    def hide(self):
        """Hide the grid in all 3D views."""
        self.show_hide_grids(show=False)


    def setGrid(self):
        """Set the grid, if visible."""
        self.setTrackers()


    def setTrackers(self, update_grid=True):
        """Set the trackers."""
        v = Draft.get3DView()
        if v is None:
            return

        if v != self.activeview:
            if v in self.trackers[0]:
                i = self.trackers[0].index(v)
                self.grid = self.trackers[1][i]
                self.tracker = self.trackers[2][i]
                self.extLine = self.trackers[3][i]
                self.radiusTracker = self.trackers[4][i]
                self.dim1 = self.trackers[5][i]
                self.dim2 = self.trackers[6][i]
                self.trackLine = self.trackers[7][i]
                self.extLine2 = self.trackers[8][i]
                self.holdTracker = self.trackers[9][i]
            else:
                self.grid = trackers.gridTracker()
                if params.get_param("alwaysShowGrid"):
                    self.grid.show_always = True
                if params.get_param("grid"):
                    self.grid.show_during_command = True
                self.tracker = trackers.snapTracker()
                self.trackLine = trackers.lineTracker()
                self.extLine = trackers.lineTracker(dotted=True)
                self.extLine2 = trackers.lineTracker(dotted=True)
                self.radiusTracker = trackers.radiusTracker()
                self.dim1 = trackers.archDimTracker(mode=2)
                self.dim2 = trackers.archDimTracker(mode=3)
                self.holdTracker = trackers.snapTracker()
                self.holdTracker.setMarker("cross")
                self.holdTracker.clear()
                self.trackers[0].append(v)
                self.trackers[1].append(self.grid)
                self.trackers[2].append(self.tracker)
                self.trackers[3].append(self.extLine)
                self.trackers[4].append(self.radiusTracker)
                self.trackers[5].append(self.dim1)
                self.trackers[6].append(self.dim2)
                self.trackers[7].append(self.trackLine)
                self.trackers[8].append(self.extLine2)
                self.trackers[9].append(self.holdTracker)
            self.activeview = v

        if not update_grid:
            return

        if self.grid.show_always \
                or (self.grid.show_during_command \
                      and hasattr(App, "activeDraftCommand") \
                      and App.activeDraftCommand):
            self.grid.set()


    def addHoldPoint(self):
        """Add hold snap point to list of hold points."""
        if self.spoint and self.spoint not in self.holdPoints:
            if self.holdTracker:
                self.holdTracker.addCoords(self.spoint)
                self.holdTracker.setColor()
                self.holdTracker.on()
            self.holdPoints.append(self.spoint)

    def recenter_workingplane(self):
        """Recenters the working plane on the current snap position"""
        if self.spoint:
            self._get_wp().set_to_position(self.toWP(self.spoint))


## @}
