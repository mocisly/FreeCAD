# -*- coding: utf-8 -*-
# ***************************************************************************
# *   Copyright (c) 2017 sliptonic <shopinthewoods@gmail.com>               *
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

import FreeCAD
import Path
import importlib

__title__ = "CAM Icon ViewProvider"
__author__ = "sliptonic (Brad Collette)"
__url__ = "https://www.freecad.org"
__doc__ = "ViewProvider who's main and only task is to assign an icon."

translate = FreeCAD.Qt.translate

if False:
    Path.Log.setLevel(Path.Log.Level.DEBUG, Path.Log.thisModule())
    Path.Log.trackModule(Path.Log.thisModule())
else:
    Path.Log.setLevel(Path.Log.Level.INFO, Path.Log.thisModule())


class ViewProvider(object):
    """Generic view provider to assign an icon."""

    def __init__(self, vobj, icon):
        self.icon = icon
        self.attach(vobj)

        self.editModule = None
        self.editCallback = None

        vobj.Proxy = self

    def attach(self, vobj):
        self.vobj = vobj
        self.obj = vobj.Object

    def dumps(self):
        attrs = {"icon": self.icon}
        if hasattr(self, "editModule"):
            attrs["editModule"] = self.editModule
            attrs["editCallback"] = self.editCallback
        return attrs

    def loads(self, state):
        self.icon = state["icon"]
        if state.get("editModule", None):
            self.editModule = state["editModule"]
            self.editCallback = state["editCallback"]

    def getIcon(self):
        return ":/icons/CAM_{}.svg".format(self.icon)

    def onEdit(self, callback):
        self.editModule = callback.__module__
        self.editCallback = callback.__name__

    def _onEditCallback(self, edit):
        if hasattr(self, "editModule"):
            mod = importlib.import_module(self.editModule)
            callback = getattr(mod, self.editCallback)
            callback(self.obj, self.vobj, edit)

    def setEdit(self, vobj=None, mode=0):
        if 0 == mode:
            self._onEditCallback(True)
        return False

    def unsetEdit(self, arg1, arg2):
        self._onEditCallback(False)

    def setupContextMenu(self, vobj, menu):
        Path.Log.track()
        from PySide import QtGui

        edit = translate("Path", "Edit")
        action = QtGui.QAction(edit, menu)
        action.triggered.connect(self._editInContextMenuTriggered)
        menu.addAction(action)

    def _editInContextMenuTriggered(self, checked):
        self.setEdit()


_factory = {}


def Attach(vobj, name):
    """Attach(vobj, name) ... attach the appropriate view provider to the view object.
    If no view provider was registered for the given name a default IconViewProvider is created."""

    Path.Log.track(vobj.Object.Label, name)
    global _factory
    for key, value in _factory.items():
        if key == name:
            return value(vobj, name)
    Path.Log.track(vobj.Object.Label, name, "PathIconViewProvider")
    return ViewProvider(vobj, name)


def RegisterViewProvider(name, provider):
    """RegisterViewProvider(name, provider) ... if an IconViewProvider is created for an object with the given name
    an instance of provider is used instead."""

    Path.Log.track(name)
    global _factory
    _factory[name] = provider
