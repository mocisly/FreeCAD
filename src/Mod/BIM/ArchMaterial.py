# SPDX-License-Identifier: LGPL-2.1-or-later

# ***************************************************************************
# *                                                                         *
# *   Copyright (c) 2015 Yorik van Havre <yorik@uncreated.net>              *
# *                                                                         *
# *   This file is part of FreeCAD.                                         *
# *                                                                         *
# *   FreeCAD is free software: you can redistribute it and/or modify it    *
# *   under the terms of the GNU Lesser General Public License as           *
# *   published by the Free Software Foundation, either version 2.1 of the  *
# *   License, or (at your option) any later version.                       *
# *                                                                         *
# *   FreeCAD is distributed in the hope that it will be useful, but        *
# *   WITHOUT ANY WARRANTY; without even the implied warranty of            *
# *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU      *
# *   Lesser General Public License for more details.                       *
# *                                                                         *
# *   You should have received a copy of the GNU Lesser General Public      *
# *   License along with FreeCAD. If not, see                               *
# *   <https://www.gnu.org/licenses/>.                                      *
# *                                                                         *
# ***************************************************************************

__title__ = "Arch Material Management"
__author__ = "Yorik van Havre"
__url__ = "https://www.freecad.org"

## @package ArchMaterial
#  \ingroup ARCH
#  \brief The Material object and tools
#
#  This module provides tools to add materials to
#  Arch objects

import FreeCAD

from draftutils import params

if FreeCAD.GuiUp:
    import os
    from PySide import QtCore, QtGui
    from PySide.QtCore import QT_TRANSLATE_NOOP
    import FreeCADGui
    import Arch_rc # Needed for access to icons # lgtm [py/unused_import]
    from draftutils.translate import translate
else:
    # \cond
    def translate(ctxt,txt):
        return txt
    def QT_TRANSLATE_NOOP(ctxt,txt):
        return txt
    # \endcond


class _ArchMaterialContainer:


    "The Material Container"

    def __init__(self,obj):
        self.Type = "MaterialContainer"
        obj.Proxy = self

    def execute(self,obj):
        return

    def dumps(self):
        if hasattr(self,"Type"):
            return self.Type

    def loads(self,state):
        if state:
            self.Type = state


class _ViewProviderArchMaterialContainer:


    "A View Provider for the Material Container"

    def __init__(self,vobj):
        vobj.Proxy = self

    def getIcon(self):
        return ":/icons/Arch_Material_Group.svg"

    def attach(self,vobj):
        self.Object = vobj.Object

    def setupContextMenu(self, vobj, menu):
        if FreeCADGui.activeWorkbench().name() != 'BIMWorkbench':
            return
        actionMergeByName = QtGui.QAction(QtGui.QIcon(":/icons/Arch_Material_Group.svg"),
                                          translate("Arch", "Merge duplicates"),
                                          menu)
        actionMergeByName.triggered.connect(self.mergeByName)
        menu.addAction(actionMergeByName)

        actionReorder = QtGui.QAction(translate("Arch", "Reorder children alphabetically"),
                                      menu)
        actionReorder.triggered.connect(self.reorder)
        menu.addAction(actionReorder)

    def mergeByName(self):
        if hasattr(self,"Object"):
            mats = [o for o in self.Object.Group if o.isDerivedFrom("App::MaterialObject")]
            todelete = []
            for mat in mats:
                orig = None
                for om in mats:
                    if om.Label == mat.Label:
                        orig = om
                        break
                else:
                    if mat.Label[-1].isdigit() and mat.Label[-2].isdigit() and mat.Label[-3].isdigit():
                        for om in mats:
                            if om.Label == mat.Label[:-3].strip():
                                orig = om
                                break
                if orig:
                    for par in mat.InList:
                        for prop in par.PropertiesList:
                            if getattr(par,prop) == mat:
                                FreeCAD.Console.PrintMessage("Changed property '"+prop+"' of object "+par.Label+" from "+mat.Label+" to "+orig.Label+"\n")
                                setattr(par,prop,orig)
                    todelete.append(mat)
            for tod in todelete:
                if not tod.InList:
                    FreeCAD.Console.PrintMessage("Merging duplicate material "+tod.Label+"\n")
                    FreeCAD.ActiveDocument.removeObject(tod.Name)
                elif (len(tod.InList) == 1) and (tod.InList[0].isDerivedFrom("App::DocumentObjectGroup")):
                    FreeCAD.Console.PrintMessage("Merging duplicate material "+tod.Label+"\n")
                    FreeCAD.ActiveDocument.removeObject(tod.Name)
                else:
                    FreeCAD.Console.PrintMessage("Unable to delete material "+tod.Label+": InList not empty\n")

    def reorder(self):
        if hasattr(self,"Object"):
            if hasattr(self.Object,"Group") and self.Object.Group:
                g = self.Object.Group
                g.sort(key=lambda obj: obj.Label)
                self.Object.Group = g
                FreeCAD.ActiveDocument.recompute()

    def dumps(self):
        return None

    def loads(self,state):
        return None


class _ArchMaterial:


    "The Material object"

    def __init__(self,obj):

        self.Type = "Material"
        obj.Proxy = self
        self.setProperties(obj)

    def onDocumentRestored(self,obj):

        self.setProperties(obj)

    def setProperties(self,obj):

        if not "Description" in obj.PropertiesList:
            obj.addProperty("App::PropertyString","Description","Material",QT_TRANSLATE_NOOP("App::Property","A description for this material"), locked=True)
        if not "StandardCode" in obj.PropertiesList:
            obj.addProperty("App::PropertyString","StandardCode","Material",QT_TRANSLATE_NOOP("App::Property","A standard code (MasterFormat, OmniClass,...)"), locked=True)
        if not "ProductURL" in obj.PropertiesList:
            obj.addProperty("App::PropertyString","ProductURL","Material",QT_TRANSLATE_NOOP("App::Property","A URL where to find information about this material"), locked=True)
        if not "Transparency" in obj.PropertiesList:
            obj.addProperty("App::PropertyPercent","Transparency","Material",QT_TRANSLATE_NOOP("App::Property","The transparency value of this material"), locked=True)
        if not "Color" in obj.PropertiesList:
            obj.addProperty("App::PropertyColor","Color","Material",QT_TRANSLATE_NOOP("App::Property","The color of this material"), locked=True)
        if not "SectionColor" in obj.PropertiesList:
            obj.addProperty("App::PropertyColor","SectionColor","Material",QT_TRANSLATE_NOOP("App::Property","The color of this material when cut"), locked=True)

    def isSameColor(self,c1,c2):

        r = 4
        if round(c1[0],r) == round(c2[0],r):
            if round(c1[1],r) == round(c2[1],r):
                if round(c1[2],r) == round(c2[2],r):
                    return True
        return False

    def onChanged(self,obj,prop):

        d = obj.Material
        if prop == "Material":
            if "SectionColor" in obj.Material:
                c = tuple([float(f) for f in obj.Material['SectionColor'].strip("()").strip("[]").split(",")])
                if hasattr(obj,"SectionColor"):
                    if not self.isSameColor(obj.SectionColor,c):
                        obj.SectionColor = c
            if "DiffuseColor" in obj.Material:
                c = tuple([float(f) for f in obj.Material['DiffuseColor'].strip("()").strip("[]").split(",")])
                if hasattr(obj,"Color"):
                    if not self.isSameColor(obj.Color,c):
                        obj.Color = c
            if "Transparency" in obj.Material:
                t = int(obj.Material['Transparency'])
                if hasattr(obj,"Transparency"):
                    if obj.Transparency != t:
                        obj.Transparency = t
            if "ProductURL" in obj.Material:
                if hasattr(obj,"ProductURL"):
                    if obj.ProductURL != obj.Material["ProductURL"]:
                        obj.ProductURL = obj.Material["ProductURL"]
            if "StandardCode" in obj.Material:
                if hasattr(obj,"StandardCode"):
                    if obj.StandardCode != obj.Material["StandardCode"]:
                        obj.StandardCode = obj.Material["StandardCode"]
            if "Description" in obj.Material:
                if hasattr(obj,"Description"):
                    if obj.Description != obj.Material["Description"]:
                        obj.Description = obj.Material["Description"]
            if "Name" in obj.Material:
                if hasattr(obj,"Label"):
                    if obj.Label != obj.Material["Name"]:
                        obj.Label = obj.Material["Name"]
        elif prop == "Label":
            if "Name" in d:
                if d["Name"] == obj.Label:
                    return
            d["Name"] = obj.Label
        elif prop == "SectionColor":
            if hasattr(obj,"SectionColor"):
                if "SectionColor" in d:
                    if self.isSameColor(tuple([float(f) for f in d['SectionColor'].strip("()").strip("[]").split(",")]),obj.SectionColor[:3]):
                        return
                d["SectionColor"] = str(obj.SectionColor[:3])
        elif prop == "Color":
            if hasattr(obj,"Color"):
                if "DiffuseColor" in d:
                    if self.isSameColor(tuple([float(f) for f in d['DiffuseColor'].strip("()").strip("[]").split(",")]),obj.Color[:3]):
                        return
                d["DiffuseColor"] = str(obj.Color[:3])
        elif prop == "Transparency":
            if hasattr(obj,"Transparency"):
                val = str(obj.Transparency)
                if "Transparency" in d:
                    if d["Transparency"] == val:
                        return
                d["Transparency"] = val
        elif prop == "ProductURL":
            if hasattr(obj,"ProductURL"):
                val = obj.ProductURL
                if "ProductURL" in d:
                    if d["ProductURL"] == val:
                        return
                obj.Material["ProductURL"] = val
        elif prop == "StandardCode":
            if hasattr(obj,"StandardCode"):
                val = obj.StandardCode
                if "StandardCode" in d:
                    if d["StandardCode"] == val:
                        return
                d["StandardCode"] = val
        elif prop == "Description":
            if hasattr(obj,"Description"):
                val = obj.Description
                if "Description" in d:
                    if d["Description"] == val:
                        return
                d["Description"] = val
        if d and (d != obj.Material):
            obj.Material = d
            #if FreeCAD.GuiUp:
                #import FreeCADGui
                # not sure why this is needed, but it is...
                #FreeCADGui.ActiveDocument.resetEdit()

    def execute(self,obj):
        if obj.Material:
            if FreeCAD.GuiUp:
                c = None
                t = None
                if "DiffuseColor" in obj.Material:
                    c = tuple([float(f) for f in obj.Material["DiffuseColor"].strip("()").strip("[]").split(",")])
                if "Transparency" in obj.Material:
                    t = int(obj.Material["Transparency"])
                for p in obj.InList:
                    if hasattr(p,"Material") \
                            and p.Material.Name == obj.Name \
                            and getattr(obj.ViewObject,"UseMaterialColor",True):
                        if c: p.ViewObject.ShapeColor = c
                        if t: p.ViewObject.Transparency = t
        return

    def dumps(self):
        if hasattr(self,"Type"):
            return self.Type

    def loads(self,state):
        if state:
            self.Type = state


class _ViewProviderArchMaterial:

    "A View Provider for the Material object"

    def __init__(self,vobj):
        vobj.Proxy = self

    def getIcon(self):
        if hasattr(self,"icondata"):
            return self.icondata
        return ":/icons/Arch_Material.svg"

    def attach(self, vobj):
        self.Object = vobj.Object

    def updateData(self, obj, prop):
        if prop == "Color":
            from PySide import QtCore,QtGui

            # custom icon
            if hasattr(obj,"Color"):
                c = obj.Color
                matcolor = QtGui.QColor(int(c[0]*255),int(c[1]*255),int(c[2]*255))
                darkcolor = QtGui.QColor(int(c[0]*125),int(c[1]*125),int(c[2]*125))
                im = QtGui.QImage(48,48,QtGui.QImage.Format_ARGB32)
                im.fill(QtCore.Qt.transparent)
                pt = QtGui.QPainter(im)
                pt.setPen(QtGui.QPen(QtCore.Qt.black, 2, QtCore.Qt.SolidLine, QtCore.Qt.FlatCap))
                #pt.setBrush(QtGui.QBrush(matcolor, QtCore.Qt.SolidPattern))
                gradient = QtGui.QLinearGradient(0,0,48,48)
                gradient.setColorAt(0,matcolor)
                gradient.setColorAt(1,darkcolor)
                pt.setBrush(QtGui.QBrush(gradient))
                pt.drawEllipse(6,6,36,36)
                pt.setPen(QtGui.QPen(QtCore.Qt.white, 1, QtCore.Qt.SolidLine, QtCore.Qt.FlatCap))
                pt.setBrush(QtGui.QBrush(QtCore.Qt.white, QtCore.Qt.SolidPattern))
                pt.drawEllipse(12,12,12,12)
                pt.end()

                ba = QtCore.QByteArray()
                b = QtCore.QBuffer(ba)
                b.open(QtCore.QIODevice.WriteOnly)
                im.save(b,"XPM")
                self.icondata = ba.data().decode("latin1")

    def onChanged(self, vobj, prop):
        if prop == "Material":
            if "Father" in vobj.Object.Material:
                for o in FreeCAD.ActiveDocument.Objects:
                    if o.isDerivedFrom("App::MaterialObject"):
                        if o.Label == vobj.Object.Material["Father"]:
                            o.touch()

    def setEdit(self, vobj, mode):
        if mode != 0:
            return None

        self.taskd = _ArchMaterialTaskPanel(vobj.Object)
        FreeCADGui.Control.showDialog(self.taskd)
        self.taskd.form.FieldName.setFocus()
        self.taskd.form.FieldName.selectAll()
        return True

    def unsetEdit(self, vobj, mode):
        if mode != 0:
            return None

        FreeCADGui.Control.closeDialog()
        return True

    def setupContextMenu(self, vobj, menu):
        if FreeCADGui.activeWorkbench().name() != 'BIMWorkbench':
            return
        actionEdit = QtGui.QAction(translate("Arch", "Edit"),
                                   menu)
        actionEdit.triggered.connect(self.edit)
        menu.addAction(actionEdit)

    def edit(self):
        FreeCADGui.ActiveDocument.setEdit(self.Object, 0)

    def setTaskValue(self,widgetname,value):
        if hasattr(self,"taskd"):
            if hasattr(self.taskd,"form"):
                if hasattr(self.taskd.form,widgetname):
                    widget = getattr(self.taskd.form,widgetname)
                    if hasattr(widget,"setText"):
                        widget.setText(value)
                    elif hasattr(widget,"setValue"):
                        widget.setText(value)

    def dumps(self):
        return None

    def loads(self,state):
        return None

    def claimChildren(self):
        ch = []
        if hasattr(self,"Object"):
            for o in self.Object.Document.Objects:
                if o.isDerivedFrom("App::MaterialObject"):
                    if o.Material:
                        if "Father" in o.Material:
                            if o.Material["Father"] == self.Object.Label:
                                ch.append(o)
        return ch


class _ArchMaterialTaskPanel:

    '''The editmode TaskPanel for Arch Material objects'''

    def __init__(self,obj=None):
        self.cards = None
        self.existingmaterials = []
        self.obj = obj
        self.form = FreeCADGui.PySideUic.loadUi(":/ui/ArchMaterial.ui")
        colorPix = QtGui.QPixmap(16,16)
        colorPix.fill(QtGui.QColor(204,204,204))
        self.form.ButtonColor.setIcon(QtGui.QIcon(colorPix))
        self.form.ButtonSectionColor.setIcon(QtGui.QIcon(colorPix))
        self.form.ButtonUrl.setIcon(QtGui.QIcon(":/icons/internet-web-browser.svg"))
        self.form.comboBox_MaterialsInDir.currentIndexChanged.connect(self.chooseMat)
        self.form.comboBox_FromExisting.currentIndexChanged.connect(self.fromExisting)
        self.form.comboFather.currentTextChanged.connect(self.setFather)
        self.form.ButtonColor.pressed.connect(self.getColor)
        self.form.ButtonSectionColor.pressed.connect(self.getSectionColor)
        self.form.ButtonUrl.pressed.connect(self.openUrl)
        self.form.ButtonEditor.pressed.connect(self.openEditor)
        self.form.ButtonCode.pressed.connect(self.getCode)
        self.fillMaterialCombo()
        self.fillExistingCombo()
        try:
            from bimcommands import BimClassification
        except Exception:
            self.form.ButtonCode.hide()
        else:
            self.form.ButtonCode.setIcon(QtGui.QIcon(":/icons/BIM_Classification.svg"))
        if self.obj:
            if hasattr(self.obj,"Material"):
                self.material = self.obj.Material
        self.setFields()

    def setFields(self):
        "sets the task box contents from self.material"
        if 'Name' in self.material:
            self.form.FieldName.setText(self.material['Name'])
        elif self.obj:
            self.form.FieldName.setText(self.obj.Label)
        if 'Description' in self.material:
            self.form.FieldDescription.setText(self.material['Description'])
        if 'DiffuseColor' in self.material:
            self.form.ButtonColor.setIcon(self.getColorIcon(self.material["DiffuseColor"]))
        elif 'ViewColor' in self.material:
            self.form.ButtonColor.setIcon(self.getColorIcon(self.material["ViewColor"]))
        elif 'Color' in self.material:
            self.form.ButtonColor.setIcon(self.getColorIcon(self.material["Color"]))
        if 'SectionColor' in self.material:
            self.form.ButtonSectionColor.setIcon(self.getColorIcon(self.material["SectionColor"]))
        if 'StandardCode' in self.material:
            self.form.FieldCode.setText(self.material['StandardCode'])
        if 'ProductURL' in self.material:
            self.form.FieldUrl.setText(self.material['ProductURL'])
        if 'Transparency' in self.material:
            self.form.SpinBox_Transparency.setValue(int(self.material["Transparency"]))
        if "Father" in self.material:
            father = self.material["Father"]
        else:
            father = None
        found = False
        self.form.comboFather.addItem("None")
        for o in FreeCAD.ActiveDocument.Objects:
            if o.isDerivedFrom("App::MaterialObject"):
                if o != self.obj:
                    self.form.comboFather.addItem(o.Label)
                    if o.Label == father:
                        self.form.comboFather.setCurrentIndex(self.form.comboFather.count()-1)
                        found = True
        if father and not found:
            self.form.comboFather.addItem(father)
            self.form.comboFather.setCurrentIndex(self.form.comboFather.count()-1)

    def getColorIcon(self,color):
        if color:
            if "(" in color:
                c = tuple([float(f) for f in color.strip("()").split(",")])
                qcolor = QtGui.QColor()
                qcolor.setRgbF(c[0],c[1],c[2])
                colorPix = QtGui.QPixmap(16,16)
                colorPix.fill(qcolor)
                icon = QtGui.QIcon(colorPix)
                return icon
        return QtGui.QIcon()

    def getFields(self):
        "sets self.material from the contents of the task box"
        self.material['Name'] = self.form.FieldName.text()
        self.material['Description'] = self.form.FieldDescription.text()
        self.material['DiffuseColor'] = self.getColorFromIcon(self.form.ButtonColor.icon())
        self.material['ViewColor'] = self.material['DiffuseColor']
        self.material['Color'] = self.material['DiffuseColor']
        self.material['SectionColor'] = self.getColorFromIcon(self.form.ButtonSectionColor.icon())
        self.material['StandardCode'] = self.form.FieldCode.text()
        self.material['ProductURL'] = self.form.FieldUrl.text()
        self.material['Transparency'] = str(self.form.SpinBox_Transparency.value())

    def getColorFromIcon(self,icon):
        "gets pixel color from the given icon"
        pixel = icon.pixmap(16,16).toImage().pixel(0,0)
        return str(QtGui.QColor(pixel).getRgbF())

    def accept(self):
        self.getFields()
        if self.obj:
            if hasattr(self.obj,"Material"):
                self.obj.Material = self.material
                self.obj.Label = self.material['Name']
        FreeCAD.ActiveDocument.recompute()
        FreeCADGui.ActiveDocument.resetEdit()
        return True

    def reject(self):
        FreeCADGui.ActiveDocument.resetEdit()
        return True

    def chooseMat(self, card):
        "sets self.material from a card"
        card = self.form.comboBox_MaterialsInDir.currentText()
        if card in self.cards:
            import importFCMat
            self.material = importFCMat.read(self.cards[card])
            self.setFields()

    def fromExisting(self,index):
        "sets the contents from an existing material"
        if index > 0:
            if index <= len(self.existingmaterials):
                m = self.existingmaterials[index-1]
                if m.Material:
                    self.material = m.Material
                    self.setFields()

    def setFather(self, text):
        "sets the father"
        if text:
            if text == "None":
                if "Father" in self.material:
                    # for some have Father at first and change to none
                    self.material.pop("Father")
            else:
                self.material["Father"] = text

    def getColor(self):
        self.getColorForButton(self.form.ButtonColor)

    def getSectionColor(self):
        self.getColorForButton(self.form.ButtonSectionColor)

    def getColorForButton(self,button):
        "opens a color picker dialog"
        icon = button.icon()
        pixel = icon.pixmap(16,16).toImage().pixel(0,0)
        color = QtGui.QColorDialog.getColor(QtGui.QColor(pixel))
        if color.isValid():
            colorPix = QtGui.QPixmap(16,16)
            colorPix.fill(color)
            button.setIcon(QtGui.QIcon(colorPix))

    def fillMaterialCombo(self):
        "fills the combo with the existing FCMat cards"
        # look for cards in both resources dir and a Materials sub-folder in the user folder.
        # User cards with same name will override system cards
        resources_mat_path = os.path.join(FreeCAD.getResourceDir(), "Mod", "Material", "Resources", "Materials")
        resources_mat_path_std = os.path.join(resources_mat_path, "Standard")
        user_mat_path = os.path.join(FreeCAD.ConfigGet("UserAppData"), "Material")

        paths = [resources_mat_path_std]
        if os.path.exists(user_mat_path):
            paths.append(user_mat_path)
        self.cards = {}
        for p in paths:
            for root, _, f_names in os.walk(p):
                for f in f_names:
                    b,e = os.path.splitext(f)
                    if e.upper() == ".FCMAT":
                        self.cards[b] = os.path.join(root, f)
        if self.cards:
            for k in sorted(self.cards):
                self.form.comboBox_MaterialsInDir.addItem(k)

    def fillExistingCombo(self):
        "fills the existing materials combo"
        self.existingmaterials = []
        for obj in FreeCAD.ActiveDocument.Objects:
            if obj.isDerivedFrom("App::MaterialObject"):
                if obj != self.obj:
                    self.existingmaterials.append(obj)
        for m in self.existingmaterials:
            self.form.comboBox_FromExisting.addItem(m.Label)


    def openEditor(self):
        "opens the full material editor from the material module"
        self.getFields()
        if self.material:
            import MaterialEditor
            self.material = MaterialEditor.editMaterial(self.material)
            self.setFields()

    def openUrl(self):
        self.getFields()
        if self.material:
            if 'ProductURL' in self.material:
                QtGui.QDesktopServices.openUrl(self.material['ProductURL'])

    def getCode(self):
        FreeCADGui.Selection.addSelection(self.obj)
        FreeCADGui.runCommand("BIM_Classification")


class _ArchMultiMaterial:

    "The MultiMaterial object"

    def __init__(self,obj):
        self.Type = "MultiMaterial"
        obj.Proxy = self
        obj.addProperty("App::PropertyString","Description","Arch",QT_TRANSLATE_NOOP("App::Property","A description for this material"), locked=True)
        obj.addProperty("App::PropertyStringList","Names","Arch",QT_TRANSLATE_NOOP("App::Property","The list of layer names"), locked=True)
        obj.addProperty("App::PropertyLinkList","Materials","Arch",QT_TRANSLATE_NOOP("App::Property","The list of layer materials"), locked=True)
        obj.addProperty("App::PropertyFloatList","Thicknesses","Arch",QT_TRANSLATE_NOOP("App::Property","The list of layer thicknesses"), locked=True)

    def dumps(self):
        if hasattr(self,"Type"):
            return self.Type

    def loads(self,state):
        if state:
            self.Type = state

class _ViewProviderArchMultiMaterial:

    "A View Provider for the MultiMaterial object"

    def __init__(self,vobj):
        vobj.Proxy = self

    def getIcon(self):
        return ":/icons/Arch_Material_Multi.svg"

    def attach(self, vobj):
        self.Object = vobj.Object

    def setEdit(self, vobj, mode):
        if mode != 0:
            return None

        taskd = _ArchMultiMaterialTaskPanel(vobj.Object)
        FreeCADGui.Control.showDialog(taskd)
        return True

    def unsetEdit(self, vobj, mode):
        if mode != 0:
            return None

        FreeCADGui.Control.closeDialog()
        return True

    def doubleClicked(self,vobj):
        self.edit()

    def setupContextMenu(self, vobj, menu):
        if FreeCADGui.activeWorkbench().name() != 'BIMWorkbench':
            return
        actionEdit = QtGui.QAction(translate("Arch", "Edit"),
                                   menu)
        actionEdit.triggered.connect(self.edit)
        menu.addAction(actionEdit)

    def edit(self):
        FreeCADGui.ActiveDocument.setEdit(self.Object, 0)

    def dumps(self):
        return None

    def loads(self,state):
        return None

    def isShow(self):
        return True

if FreeCAD.GuiUp:

    class MultiMaterialDelegate(QtGui.QStyledItemDelegate):

        def __init__(self, parent=None, *args):
            self.mats = []
            for obj in FreeCAD.ActiveDocument.Objects:
                if obj.isDerivedFrom("App::MaterialObject"):
                    self.mats.append(obj)
            QtGui.QStyledItemDelegate.__init__(self, parent, *args)

        def createEditor(self,parent,option,index):
            if index.column() == 0:
                editor = QtGui.QComboBox(parent)
                editor.setEditable(True)
            elif index.column() == 1:
                editor = QtGui.QComboBox(parent)
            elif index.column() == 2:
                ui = FreeCADGui.UiLoader()
                editor = ui.createWidget("Gui::InputField")
                editor.setSizePolicy(QtGui.QSizePolicy.Preferred,QtGui.QSizePolicy.Minimum)
                editor.setParent(parent)
            else:
                editor = QtGui.QLineEdit(parent)
            return editor

        def setEditorData(self, editor, index):
            if index.column() == 0:
                import ArchWindow
                editor.addItems([index.data()]+ArchWindow.WindowPartTypes)
            elif index.column() == 1:
                idx = -1
                for i,m in enumerate(self.mats):
                    editor.addItem(m.Label)
                    if m.Label == index.data():
                        idx = i
                editor.setCurrentIndex(idx)
            else:
                QtGui.QStyledItemDelegate.setEditorData(self, editor, index)

        def setModelData(self, editor, model, index):
            if index.column() == 0:
                if editor.currentIndex() == -1:
                    model.setData(index, "")
                else:
                    model.setData(index, editor.currentText())
            elif index.column() == 1:
                if editor.currentIndex() == -1:
                    model.setData(index, "")
                else:
                    model.setData(index, self.mats[editor.currentIndex()].Label)
            else:
                QtGui.QStyledItemDelegate.setModelData(self, editor, model, index)


class _ArchMultiMaterialTaskPanel:

    '''The editmode TaskPanel for MultiMaterial objects'''

    def __init__(self,obj=None):
        self.obj = obj
        self.form = FreeCADGui.PySideUic.loadUi(":/ui/ArchMultiMaterial.ui")
        self.model = QtGui.QStandardItemModel()
        self.model.setHorizontalHeaderLabels([translate("Arch","Name"),translate("Arch","Material"),translate("Arch","Thickness")])
        self.form.tree.setModel(self.model)
        self.form.tree.setUniformRowHeights(True)
        self.form.tree.setItemDelegate(MultiMaterialDelegate())
        self.form.chooseCombo.currentIndexChanged.connect(self.fromExisting)
        self.form.addButton.pressed.connect(self.addLayer)
        self.form.upButton.pressed.connect(self.upLayer)
        self.form.downButton.pressed.connect(self.downLayer)
        self.form.delButton.pressed.connect(self.delLayer)
        self.form.invertButton.pressed.connect(self.invertLayer)
        self.model.itemChanged.connect(self.recalcThickness)
        self.fillExistingCombo()
        self.fillData()

    def fillData(self,obj=None):
        if not obj:
            obj = self.obj
        if obj:
            self.model.clear()
            self.model.setHorizontalHeaderLabels([translate("Arch","Name"),translate("Arch","Material"),translate("Arch","Thickness")])
            # restore widths
            self.form.tree.setColumnWidth(0,params.get_param_arch("MultiMaterialColumnWidth0"))
            self.form.tree.setColumnWidth(1,params.get_param_arch("MultiMaterialColumnWidth1"))
            for i in range(len(obj.Names)):
                item1 = QtGui.QStandardItem(obj.Names[i])
                item2 = QtGui.QStandardItem(obj.Materials[i].Label)
                item3 = QtGui.QStandardItem(FreeCAD.Units.Quantity(obj.Thicknesses[i],FreeCAD.Units.Length).getUserPreferred()[0])
                self.model.appendRow([item1,item2,item3])
            self.form.nameField.setText(obj.Label)

    def fillExistingCombo(self):
        "fills the existing multimaterials combo"
        import Draft
        self.existingmaterials = []
        for obj in FreeCAD.ActiveDocument.Objects:
            if Draft.getType(obj) == "MultiMaterial":
                if obj != self.obj:
                    self.existingmaterials.append(obj)
        for m in self.existingmaterials:
            self.form.chooseCombo.addItem(m.Label)

    def fromExisting(self,index):
        "sets the contents from an existing material"
        if index > 0:
            if index <= len(self.existingmaterials):
                m = self.existingmaterials[index-1]
                if m:
                    self.fillData(m)

    def addLayer(self):
        item1 = QtGui.QStandardItem(translate("Arch","New layer"))
        item2 = QtGui.QStandardItem()
        item3 = QtGui.QStandardItem()
        self.model.appendRow([item1,item2,item3])

    def delLayer(self):
        sel = self.form.tree.selectedIndexes()
        if sel:
            row = sel[0].row()
            if row >= 0:
                self.model.takeRow(row)
        self.recalcThickness()

    def moveLayer(self,mvt=0):
        sel = self.form.tree.selectedIndexes()
        if sel and mvt:
            row = sel[0].row()
            if row >= 0:
                if row+mvt >= 0:
                    data = self.model.takeRow(row)
                    self.model.insertRow(row+mvt,data)
                    ind = self.model.index(row+mvt,0)
                    self.form.tree.setCurrentIndex(ind)

    def upLayer(self):
        self.moveLayer(mvt=-1)

    def downLayer(self):
        self.moveLayer(mvt=1)

    def invertLayer(self):
        items = [self.model.takeRow(row) for row in range(self.model.rowCount()-1,-1,-1)]
        items.reverse()
        for item in items:
            self.model.insertRow(0,item)

    def recalcThickness(self,item=None):
        prefix = translate("Arch","Total thickness")+": "
        th = 0
        suffix = ""
        for row in range(self.model.rowCount()):
            thick = 0
            d = self.model.item(row,2).text()
            try:
                d = float(d)
            except Exception:
                thick = FreeCAD.Units.Quantity(d).Value
            else:
                thick = FreeCAD.Units.Quantity(d,FreeCAD.Units.Length).Value
            th += abs(thick)
            if not thick:
                suffix = " ("+translate("Arch","depends on the object")+")"
        val = FreeCAD.Units.Quantity(th,FreeCAD.Units.Length).UserString
        self.form.labelTotalThickness.setText(prefix + val + suffix)

    def accept(self):
        # store widths
        params.set_param_arch("MultiMaterialColumnWidth0",self.form.tree.columnWidth(0))
        params.set_param_arch("MultiMaterialColumnWidth1",self.form.tree.columnWidth(1))
        if self.obj:
            mats = []
            for m in FreeCAD.ActiveDocument.Objects:
                if m.isDerivedFrom("App::MaterialObject"):
                    mats.append(m)
            names = []
            materials = []
            thicknesses = []
            for row in range(self.model.rowCount()):
                name = self.model.item(row,0).text()
                mat = None
                ml = self.model.item(row,1).text()
                for m in mats:
                    if m.Label == ml:
                        mat = m
                d = self.model.item(row,2).text()
                try:
                    d = float(d)
                except Exception:
                    thick = FreeCAD.Units.Quantity(d).Value
                else:
                    thick = FreeCAD.Units.Quantity(d,FreeCAD.Units.Length).Value
                if round(thick,32) == 0:
                    thick = 0.0
                if name and mat:
                    names.append(name)
                    materials.append(mat)
                    thicknesses.append(thick)
            self.obj.Names = names
            self.obj.Materials = materials
            self.obj.Thicknesses = thicknesses
            if self.form.nameField.text():
                self.obj.Label = self.form.nameField.text()
        FreeCAD.ActiveDocument.recompute()
        FreeCADGui.ActiveDocument.resetEdit()
        return True

    def reject(self):
        FreeCADGui.ActiveDocument.resetEdit()
        return True
