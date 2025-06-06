# -*- coding: utf-8 -*-
# ***************************************************************************
# *   Copyright (c) 2022 sliptonic <shopinthewoods@gmail.com>               *
# *   Copyright (c) 2022-2025 Larry Woestman <LarryWoestman2@gmail.com>     *
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
import CAMTests.PathTestUtils as PathTestUtils
from Path.Post.Processor import PostProcessorFactory


Path.Log.setLevel(Path.Log.Level.DEBUG, Path.Log.thisModule())
Path.Log.trackModule(Path.Log.thisModule())


class TestRefactoredTestPostGCodes(PathTestUtils.PathTestBase):
    """Test the refactored_test_post.py postprocessor G codes."""

    @classmethod
    def setUpClass(cls):
        """setUpClass()...

        This method is called upon instantiation of this test class.  Add code
        and objects here that are needed for the duration of the test() methods
        in this class.  In other words, set up the 'global' test environment
        here; use the `setUp()` method to set up a 'local' test environment.
        This method does not have access to the class `self` reference, but it
        is able to call static methods within this same class.
        """
        FreeCAD.ConfigSet("SuppressRecomputeRequiredDialog", "True")
        cls.doc = FreeCAD.open(FreeCAD.getHomePath() + "/Mod/CAM/CAMTests/boxtest.fcstd")
        cls.job = cls.doc.getObject("Job")
        cls.post = PostProcessorFactory.get_post_processor(cls.job, "refactored_test")
        # locate the operation named "Profile"
        for op in cls.job.Operations.Group:
            if op.Label == "Profile":
                # remember the "Profile" operation
                cls.profile_op = op
                return

    @classmethod
    def tearDownClass(cls):
        """tearDownClass()...

        This method is called prior to destruction of this test class.  Add
        code and objects here that cleanup the test environment after the
        test() methods in this class have been executed.  This method does
        not have access to the class `self` reference.  This method is able
        to call static methods within this same class.
        """
        FreeCAD.closeDocument(cls.doc.Name)
        FreeCAD.ConfigSet("SuppressRecomputeRequiredDialog", "")

    # Setup and tear down methods called before and after each unit test

    def setUp(self):
        """setUp()...

        This method is called prior to each `test()` method.  Add code and
        objects here that are needed for multiple `test()` methods.
        """
        # allow a full length "diff" if an error occurs
        self.maxDiff = None
        #
        # reinitialize the postprocessor data structures between tests
        #
        self.post.reinitialize()

    def tearDown(self):
        """tearDown()...

        This method is called after each test() method. Add cleanup instructions here.
        Such cleanup instructions will likely undo those in the setUp() method.
        """
        pass

    def single_compare(self, path, expected, args, debug=False):
        """Perform a test with a single line of gcode comparison."""
        nl = "\n"
        self.job.PostProcessorArgs = args
        # replace the original path (that came with the job and operation) with our path
        self.profile_op.Path = Path.Path(path)
        # the gcode is in the first section for this particular job and operation
        gcode = self.post.export()[0][1]
        if debug:
            print(f"--------{nl}{gcode}--------{nl}")
        # there are 3 lines of "other stuff" before the line we are interested in
        self.assertEqual(gcode.splitlines()[3], expected)

    def multi_compare(self, path, expected, args, debug=False):
        """Perform a test with multiple lines of gcode comparison."""
        nl = "\n"
        self.job.PostProcessorArgs = args
        # replace the original path (that came with the job and operation) with our path
        self.profile_op.Path = Path.Path(path)
        # the gcode is in the first section for this particular job and operation
        gcode = self.post.export()[0][1]
        if debug:
            print(f"--------{nl}{gcode}--------{nl}")
        self.assertEqual(gcode, expected)

    #############################################################################
    #
    # The tests are organized into groups:
    #
    #   00000 - 00099  tests that don't fit any other category
    #   00100 - 09999  tests for all of the various arguments/options
    #   10000 - 18999  tests for the various G codes at 10000 + 10 * g_code_value
    #   19000 - 19999  tests for the A, B, and C axis outputs
    #   20000 - 29999  tests for the various M codes at 20000 + 10 * m_code_value
    #
    #############################################################################

    def test10000(self):
        """Test G0 command Generation."""
        self.single_compare(
            "G0 X10 Y20 Z30 A40 B50 C60 U70 V80 W90",
            ("G0 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000"),
            "",
        )
        self.single_compare(
            "G00 X10 Y20 Z30 A40 B50 C60 U70 V80 W90",
            ("G00 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000"),
            "",
        )

    #############################################################################

    def test10010(self):
        """Test G1 command Generation."""
        self.single_compare(
            "G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456",
            (
                "G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 "
                "U70.000 V80.000 W90.000 F74.074"
            ),
            "",
        )
        self.single_compare(
            "G01 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456",
            (
                "G01 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 "
                "U70.000 V80.000 W90.000 F74.074"
            ),
            "",
        )
        # Test argument order
        self.single_compare(
            "G1 F1.23456 Z30 V80 C60 W90 X10 B50 U70 Y20 A40",
            (
                "G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 "
                "U70.000 V80.000 W90.000 F74.074"
            ),
            "",
        )
        self.single_compare(
            "G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456",
            (
                "G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 "
                "U2.7559 V3.1496 W3.5433 F2.9163"
            ),
            "--inches",
        )

    #############################################################################

    def test10020(self):
        """Test G2 command Generation."""
        #
        self.single_compare(
            "G2 X10 Y20 Z30 I40 J50 P60 F1.23456",
            "G2 X10.000 Y20.000 Z30.000 I40.000 J50.000 P60 F74.074",
            "",
        )
        self.single_compare(
            "G02 X10 Y20 Z30 I40 J50 P60 F1.23456",
            "G02 X10.000 Y20.000 Z30.000 I40.000 J50.000 P60 F74.074",
            "",
        )
        self.single_compare(
            "G2 X10 Y20 Z30 R40 P60 F1.23456",
            "G2 X10.000 Y20.000 Z30.000 R40.000 P60 F74.074",
            "",
        )
        self.single_compare(
            "G2 X10 Y20 Z30 I40 J50 P60 F1.23456",
            "G2 X0.3937 Y0.7874 Z1.1811 I1.5748 J1.9685 P60 F2.9163",
            "--inches",
        )
        self.single_compare(
            "G2 X10 Y20 Z30 R40 P60 F1.23456",
            "G2 X0.3937 Y0.7874 Z1.1811 R1.5748 P60 F2.9163",
            "--inches",
        )

    #############################################################################

    def test10030(self):
        """Test G3 command Generation."""
        self.single_compare(
            "G3 X10 Y20 Z30 I40 J50 P60 F1.23456",
            "G3 X10.000 Y20.000 Z30.000 I40.000 J50.000 P60 F74.074",
            "",
        )
        self.single_compare(
            "G03 X10 Y20 Z30 I40 J50 P60 F1.23456",
            "G03 X10.000 Y20.000 Z30.000 I40.000 J50.000 P60 F74.074",
            "",
        )
        self.single_compare(
            "G3 X10 Y20 Z30 R40 P60 F1.23456",
            "G3 X10.000 Y20.000 Z30.000 R40.000 P60 F74.074",
            "",
        )
        self.single_compare(
            "G3 X10 Y20 Z30 I40 J50 P60 F1.23456",
            "G3 X0.3937 Y0.7874 Z1.1811 I1.5748 J1.9685 P60 F2.9163",
            "--inches",
        )
        self.single_compare(
            "G3 X10 Y20 Z30 R40 P60 F1.23456",
            "G3 X0.3937 Y0.7874 Z1.1811 R1.5748 P60 F2.9163",
            "--inches",
        )

    #############################################################################

    def test10040(self):
        """Test G4 command Generation."""
        # Should some sort of "precision" be applied to the P parameter?
        # The code as currently written does not do so intentionally.
        # The P parameter indicates "time to wait" where a 0.001 would
        # be a millisecond wait, so more than 3 or 4 digits of precision
        # might be useful.
        self.single_compare("G4 P1.23456", "G4 P1.23456", "")
        self.single_compare("G04 P1.23456", "G04 P1.23456", "")
        self.single_compare("G4 P1.23456", "G4 P1.23456", "--inches")

    #############################################################################

    def test10070(self):
        """Test G7 command Generation."""
        self.single_compare("G7", "G7", "")

    #############################################################################

    def test10080(self):
        """Test G8 command Generation."""
        self.single_compare("G8", "G8", "")

    #############################################################################

    def test10100(self):
        """Test G10 command Generation."""
        self.single_compare("G10 L1 P2 Z1.23456", "G10 L1 Z1.235 P2", "")
        self.single_compare(
            "G10 L1 P2 R1.23456 I2.34567 J3.456789 Q3",
            "G10 L1 I2.346 J3.457 R1.235 P2 Q3",
            "",
        )
        self.single_compare(
            "G10 L2 P3 X1.23456 Y2.34567 Z3.456789",
            "G10 L2 X1.235 Y2.346 Z3.457 P3",
            "",
        )
        self.single_compare("G10 L2 P0 X0 Y0 Z0", "G10 L2 X0.000 Y0.000 Z0.000 P0", "")
        self.single_compare(
            "G10 L10 P1 X1.23456 Y2.34567 Z3.456789",
            "G10 L10 X1.235 Y2.346 Z3.457 P1",
            "",
        )
        self.single_compare(
            "G10 L10 P2 R1.23456 I2.34567 J3.456789 Q3",
            "G10 L10 I2.346 J3.457 R1.235 P2 Q3",
            "",
        )
        self.single_compare(
            "G10 L11 P1 X1.23456 Y2.34567 Z3.456789",
            "G10 L11 X1.235 Y2.346 Z3.457 P1",
            "",
        )
        self.single_compare(
            "G10 L11 P2 R1.23456 I2.34567 J3.456789 Q3",
            "G10 L11 I2.346 J3.457 R1.235 P2 Q3",
            "",
        )
        self.single_compare(
            "G10 L20 P9 X1.23456 Y2.34567 Z3.456789",
            "G10 L20 X1.235 Y2.346 Z3.457 P9",
            "",
        )

    #############################################################################

    def test10170(self):
        """Test G17 command Generation."""
        self.single_compare("G17", "G17", "")

    #############################################################################

    def test10171(self):
        """Test G17.1 command Generation."""
        self.single_compare("G17.1", "G17.1", "")

    #############################################################################

    def test10180(self):
        """Test G18 command Generation."""
        self.single_compare("G18", "G18", "")

    #############################################################################

    def test10181(self):
        """Test G18.1 command Generation."""
        self.single_compare("G18.1", "G18.1", "")

    #############################################################################

    def test10190(self):
        """Test G19 command Generation."""
        self.single_compare("G19", "G19", "")

    #############################################################################

    def test10191(self):
        """Test G19.1 command Generation."""
        self.single_compare("G19.1", "G19.1", "")

    #############################################################################

    def test10200(self):
        """Test G20 command Generation."""
        # for some reason, Path.Path("G20") doesn't do the same thing
        # as Path.Path([Path.Command("G20")])
        self.single_compare([Path.Command("G20")], "G20", "")

    #############################################################################

    def test10210(self):
        """Test G21 command Generation."""
        # for some reason, Path.Path("G21") doesn't do the same thing
        # as Path.Path([Path.Command("G21")])
        self.single_compare([Path.Command("G21")], "G21", "")

    #############################################################################

    def test10280(self):
        """Test G28 command Generation."""
        self.single_compare("G28", "G28", "")
        self.single_compare(
            "G28 X10 Y20 Z30 A40 B50 C60 U70 V80 W90",
            ("G28 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000"),
            "",
        )

    #############################################################################

    def test10281(self):
        """Test G28.1 command Generation."""
        self.single_compare("G28.1", "G28.1", "")

    #############################################################################

    def test10300(self):
        """Test G30 command Generation."""
        self.single_compare("G30", "G30", "")
        self.single_compare(
            "G30 X10 Y20 Z30 A40 B50 C60 U70 V80 W90",
            ("G30 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000"),
            "",
        )

    #############################################################################

    def test10382(self):
        """Test G38.2 command Generation."""
        self.single_compare(
            "G38.2 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F123",
            (
                "G38.2 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 "
                "U70.000 V80.000 W90.000 F7380.000"
            ),
            "",
        )

    #############################################################################

    def test10383(self):
        """Test G38.3 command Generation."""
        self.single_compare(
            "G38.3 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F123",
            (
                "G38.3 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 "
                "U70.000 V80.000 W90.000 F7380.000"
            ),
            "",
        )

    #############################################################################

    def test10384(self):
        """Test G38.4 command Generation."""
        self.single_compare(
            "G38.4 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F123",
            (
                "G38.4 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 "
                "U70.000 V80.000 W90.000 F7380.000"
            ),
            "",
        )

    #############################################################################

    def test10385(self):
        """Test G38.5 command Generation."""
        self.single_compare(
            "G38.5 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F123",
            (
                "G38.5 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 "
                "U70.000 V80.000 W90.000 F7380.000"
            ),
            "",
        )

    #############################################################################

    def test10301(self):
        """Test G30.1 command Generation."""
        self.single_compare("G30.1", "G30.1", "")

    #############################################################################

    def test10400(self):
        """Test G40 command Generation."""
        self.single_compare("G40", "G40", "")
        self.single_compare("G40", "G40", "--inches")

    #############################################################################

    def test10410(self):
        """Test G41 command Generation."""
        self.single_compare("G41 D1.23456", "G41 D1", "")
        self.single_compare("G41 D0", "G41 D0", "")
        self.single_compare("G41 D1.23456", "G41 D1", "--inches")

    #############################################################################

    def test10411(self):
        """Test G41.1 command Generation."""
        self.single_compare("G41.1 D1.23456 L3", "G41.1 D1.235 L3", "")
        self.single_compare("G41.1 D1.23456 L3", "G41.1 D0.0486 L3", "--inches")

    #############################################################################

    def test10420(self):
        """Test G42 command Generation."""
        self.single_compare("G42 D1.23456", "G42 D1", "")
        self.single_compare("G42 D0", "G42 D0", "")
        self.single_compare("G42 D1.23456", "G42 D1", "--inches")

    #############################################################################

    def test10421(self):
        """Test G42.1 command Generation."""
        self.single_compare("G42.1 D1.23456 L3", "G42.1 D1.235 L3", "")
        self.single_compare("G42.1 D1.23456 L3", "G42.1 D0.0486 L3", "--inches")

    #############################################################################

    def test10430(self):
        """Test G43 command Generation."""
        self.single_compare("G43", "G43", "")
        self.single_compare("G43 H1.23456", "G43 H1", "")
        self.single_compare("G43 H0", "G43 H0", "")
        self.single_compare("G43 H1.23456", "G43 H1", "--inches")

    #############################################################################

    def test10431(self):
        """Test G43.1 command Generation."""
        self.single_compare(
            (
                "G43.1 X1.234567 Y2.345678 Z3.456789 A4.567891 B5.678912 C6.789123 "
                "U7.891234 V8.912345 W9.123456"
            ),
            "G43.1 X1.235 Y2.346 Z3.457 A4.568 B5.679 C6.789 U7.891 V8.912 W9.123",
            "",
        )
        self.single_compare(
            (
                "G43.1 X1.234567 Y2.345678 Z3.456789 A4.567891 B5.678912 C6.789123 "
                "U7.891234 V8.912345 W9.123456"
            ),
            ("G43.1 X0.0486 Y0.0923 Z0.1361 A4.5679 B5.6789 C6.7891 U0.3107 V0.3509 W0.3592"),
            "--inches",
        )

    #############################################################################

    def test10432(self):
        """Test G43.2 command Generation."""
        self.single_compare("G43.2 H1.23456", "G43.2 H1", "")

    #############################################################################

    def test10490(self):
        """Test G49 command Generation."""
        self.single_compare("G49", "G49", "")

    #############################################################################

    def test10520(self):
        """Test G52 command Generation."""
        self.single_compare(
            "G52 X1.234567 Y2.345678 Z3.456789 A4.567891 B5.678912 C6.789123 "
            "U7.891234 V8.912345 W9.123456",
            "G52 X1.235 Y2.346 Z3.457 A4.568 B5.679 C6.789 U7.891 V8.912 W9.123",
            "",
        )
        self.single_compare(
            "G52 X0 Y0.0 Z0.00 A0.000 B0.0000 C0.00000 U0.000000 V0 W0",
            "G52 X0.000 Y0.000 Z0.000 A0.000 B0.000 C0.000 U0.000 V0.000 W0.000",
            "",
        )
        self.single_compare(
            "G52 X1.234567 Y2.345678 Z3.456789 A4.567891 B5.678912 C6.789123 "
            "U7.891234 V8.912345 W9.123456",
            "G52 X0.0486 Y0.0923 Z0.1361 A4.5679 B5.6789 C6.7891 U0.3107 V0.3509 W0.3592",
            "--inches",
        )
        self.single_compare(
            "G52 X0 Y0.0 Z0.00 A0.000 B0.0000 C0.00000 U0.000000 V0 W0",
            "G52 X0.0000 Y0.0000 Z0.0000 A0.0000 B0.0000 C0.0000 U0.0000 V0.0000 W0.0000",
            "--inches",
        )

    #############################################################################

    #     def test10530(self):
    #         """Test G53 command Generation."""
    #         #
    #         # G53 is handled differently in different gcode interpreters.
    #         # It always means "absolute machine coordinates", but it is
    #         # used like G0 in Centroid and Mach4, and used in front of
    #         # G0 or G1 on the same line in Fanuc, Grbl, LinuxCNC, and Tormach.
    #         # It is not modal in any gcode interpreter I currently know about.
    #         # The current FreeCAD code treats G53 as modal (like G54-G59.9).
    #         # The current refactored postprocessor code does not
    #         # handle having two G-commands on the same line.
    #         #
    #         c = Path.Command("G53 G0 X10 Y20 Z30 A40 B50 C60 U70 V80 W90")

    #         self.docobj.Path = Path.Path([c])
    #         postables = [self.docobj]

    #         expected = """G90
    # G21
    # G53 G0 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000
    # """
    #         args = ""
    #         gcode = postprocessor.export(postables, "-", args)
    #         print("--------\n" + gcode + "--------\n")
    #         self.assertEqual(gcode, expected)

    #############################################################################

    def test10540(self):
        """Test G54 command Generation."""
        self.single_compare("G54", "G54", "")

    #############################################################################

    def test10541(self):
        """Test G54.1 command Generation."""
        #
        # Some gcode interpreters use G54.1 P- to select additional
        # work coordinate systems.
        #
        self.single_compare("G54.1 P2.34567", "G54.1 P2", "")

    #############################################################################

    def test10550(self):
        """Test G55 command Generation."""
        self.single_compare("G55", "G55", "")

    #############################################################################

    def test10560(self):
        """Test G56 command Generation."""
        self.single_compare("G56", "G56", "")

    #############################################################################

    def test10570(self):
        """Test G57 command Generation."""
        self.single_compare("G57", "G57", "")

    #############################################################################

    def test10580(self):
        """Test G58 command Generation."""
        self.single_compare("G58", "G58", "")

    #############################################################################

    def test10590(self):
        """Test G59 command Generation."""
        self.single_compare("G59", "G59", "")
        #
        # Some gcode interpreters use G59 P- to select additional
        # work coordinate systems.  This is considered somewhat
        # obsolete and is being replaced by G54.1 P- instead.
        #
        self.single_compare("G59 P2.34567", "G59 P2", "")

    #############################################################################

    def test10591(self):
        """Test G59.1 command Generation."""
        self.single_compare("G59.1", "G59.1", "")

    #############################################################################

    def test10592(self):
        """Test G59.2 command Generation."""
        self.single_compare("G59.2", "G59.2", "")

    #############################################################################

    def test10593(self):
        """Test G59.3 command Generation."""
        self.single_compare("G59.3", "G59.3", "")

    #############################################################################

    def test10594(self):
        """Test G59.4 command Generation."""
        self.single_compare("G59.4", "G59.4", "")

    #############################################################################

    def test10595(self):
        """Test G59.5 command Generation."""
        self.single_compare("G59.5", "G59.5", "")

    #############################################################################

    def test10596(self):
        """Test G59.6 command Generation."""
        self.single_compare("G59.6", "G59.6", "")

    #############################################################################

    def test10597(self):
        """Test G59.7 command Generation."""
        self.single_compare("G59.7", "G59.7", "")

    #############################################################################

    def test10598(self):
        """Test G59.8 command Generation."""
        self.single_compare("G59.8", "G59.8", "")

    #############################################################################

    def test10599(self):
        """Test G59.9 command Generation."""
        self.single_compare("G59.9", "G59.9", "")

    #############################################################################

    def test10610(self):
        """Test G61 command Generation."""
        self.single_compare("G61", "G61", "")

    #############################################################################

    def test10611(self):
        """Test G61.1 command Generation."""
        self.single_compare("G61.1", "G61.1", "")

    #############################################################################

    def test10640(self):
        """Test G64 command Generation."""
        self.single_compare("G64", "G64", "")
        self.single_compare("G64 P3.456789", "G64 P3.457", "")
        self.single_compare("G64 P3.456789 Q4.567891", "G64 P3.457 Q4.568", "")
        self.single_compare("G64 P3.456789 Q4.567891", "G64 P0.1361 Q0.1798", "--inches")

    #############################################################################

    def test10730(self):
        """Test G73 command Generation."""
        path = [
            Path.Command("G0 X1 Y2"),
            Path.Command("G0 Z8"),
            Path.Command("G90"),
            Path.Command("G99"),
            Path.Command("G73 X1 Y2 Z0 F123 Q1.5 R5"),
            Path.Command("G80"),
            Path.Command("G90"),
        ]
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G90
G99
G73 X1.000 Y2.000 Z0.000 R5.000 Q1.500 F7380.000
G80
G90
""",
            "",
        )
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G90
G0 X1.000 Y2.000
G1 Z5.000 F7380.000
G1 Z3.500 F7380.000
G0 Z3.750
G0 Z3.575
G1 Z2.000 F7380.000
G0 Z2.250
G0 Z2.075
G1 Z0.500 F7380.000
G0 Z0.750
G0 Z0.575
G1 Z0.000 F7380.000
G0 Z5.000
G90
""",
            "--translate_drill",
        )
        self.multi_compare(
            path,
            """(Begin preamble)
G90
G21
(Begin operation)
G54
(Finish operation)
(Begin operation)
(TC: Default Tool)
(Begin toolchange)
(M6 T1)
(Finish operation)
(Begin operation)
G0 X1.000 Y2.000
G0 Z8.000
G90
(G99)
(G73 X1.000 Y2.000 Z0.000 R5.000 Q1.500 F7380.000)
G0 X1.000 Y2.000
G1 Z5.000 F7380.000
G1 Z3.500 F7380.000
G0 Z3.750
G0 Z3.575
G1 Z2.000 F7380.000
G0 Z2.250
G0 Z2.075
G1 Z0.500 F7380.000
G0 Z0.750
G0 Z0.575
G1 Z0.000 F7380.000
G0 Z5.000
(G80)
G90
(Finish operation)
(Begin postamble)
""",
            "--comments --translate_drill",
        )
        #
        # reinitialize the postprocessor data structures before doing more tests
        #
        self.post.reinitialize()
        #
        # Test translate_drill with G73 and G91.
        #
        path = [
            Path.Command("G0 X1 Y2"),
            Path.Command("G0 Z8"),
            Path.Command("G91"),
            Path.Command("G99"),
            Path.Command("G73 X1 Y2 Z0 F123 Q1.5 R5"),
            Path.Command("G80"),
            Path.Command("G90"),
        ]
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G91
G99
G73 X1.000 Y2.000 Z0.000 R5.000 Q1.500 F7380.000
G80
G90
""",
            "--no-comments --no-translate_drill",
        )
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G91
G90
G0 Z13.000
G0 X2.000 Y4.000
G1 Z11.500 F7380.000
G0 Z11.750
G0 Z11.575
G1 Z10.000 F7380.000
G0 Z10.250
G0 Z10.075
G1 Z8.500 F7380.000
G0 Z8.750
G0 Z8.575
G1 Z8.000 F7380.000
G0 Z13.000
G91
G90
""",
            "--translate_drill",
        )
        self.multi_compare(
            path,
            """(Begin preamble)
G90
G21
(Begin operation)
G54
(Finish operation)
(Begin operation)
(TC: Default Tool)
(Begin toolchange)
(M6 T1)
(Finish operation)
(Begin operation)
G0 X1.000 Y2.000
G0 Z8.000
G91
(G99)
(G73 X1.000 Y2.000 Z0.000 R5.000 Q1.500 F7380.000)
G90
G0 Z13.000
G0 X2.000 Y4.000
G1 Z11.500 F7380.000
G0 Z11.750
G0 Z11.575
G1 Z10.000 F7380.000
G0 Z10.250
G0 Z10.075
G1 Z8.500 F7380.000
G0 Z8.750
G0 Z8.575
G1 Z8.000 F7380.000
G0 Z13.000
G91
(G80)
G90
(Finish operation)
(Begin postamble)
""",
            "--comments --translate_drill",
        )

    #############################################################################

    def test10810(self):
        """Test G81 command Generation."""
        path = [
            Path.Command("G0 X1 Y2"),
            Path.Command("G0 Z8"),
            Path.Command("G90"),
            Path.Command("G99"),
            Path.Command("G81 X1 Y2 Z0 F123 R5"),
            Path.Command("G80"),
            Path.Command("G90"),
        ]
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G90
G99
G81 X1.000 Y2.000 Z0.000 R5.000 F7380.000
G80
G90
""",
            "--no-translate_drill",
        )
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G90
G0 X1.000 Y2.000
G1 Z5.000 F7380.000
G1 Z0.000 F7380.000
G0 Z5.000
G90
""",
            "--translate_drill",
        )
        self.multi_compare(
            path,
            """(Begin preamble)
G90
G21
(Begin operation)
G54
(Finish operation)
(Begin operation)
(TC: Default Tool)
(Begin toolchange)
(M6 T1)
(Finish operation)
(Begin operation)
G0 X1.000 Y2.000
G0 Z8.000
G90
(G99)
(G81 X1.000 Y2.000 Z0.000 R5.000 F7380.000)
G0 X1.000 Y2.000
G1 Z5.000 F7380.000
G1 Z0.000 F7380.000
G0 Z5.000
(G80)
G90
(Finish operation)
(Begin postamble)
""",
            "--comments --translate_drill",
        )
        #
        # reinitialize the postprocessor data structures before doing more tests
        #
        self.post.reinitialize()
        #
        # Test translate_drill with G81 and G91.
        #
        path = [
            Path.Command("G0 X1 Y2"),
            Path.Command("G0 Z8"),
            Path.Command("G91"),
            Path.Command("G99"),
            Path.Command("G81 X1 Y2 Z0 F123 R5"),
            Path.Command("G80"),
            Path.Command("G90"),
        ]
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G91
G99
G81 X1.000 Y2.000 Z0.000 R5.000 F7380.000
G80
G90
""",
            "--no-translate_drill",
        )
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G91
G90
G0 Z13.000
G0 X2.000 Y4.000
G1 Z8.000 F7380.000
G0 Z13.000
G91
G90
""",
            "--translate_drill",
        )
        self.multi_compare(
            path,
            """(Begin preamble)
G90
G21
(Begin operation)
G54
(Finish operation)
(Begin operation)
(TC: Default Tool)
(Begin toolchange)
(M6 T1)
(Finish operation)
(Begin operation)
G0 X1.000 Y2.000
G0 Z8.000
G91
(G99)
(G81 X1.000 Y2.000 Z0.000 R5.000 F7380.000)
G90
G0 Z13.000
G0 X2.000 Y4.000
G1 Z8.000 F7380.000
G0 Z13.000
G91
(G80)
G90
(Finish operation)
(Begin postamble)
""",
            "--comments --translate_drill",
        )

    #############################################################################

    def test10820(self):
        """Test G82 command Generation."""
        path = [
            Path.Command("G0 X1 Y2"),
            Path.Command("G0 Z8"),
            Path.Command("G90"),
            Path.Command("G99"),
            Path.Command("G82 X1 Y2 Z0 F123 R5 P1.23456"),
            Path.Command("G80"),
            Path.Command("G90"),
        ]
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G90
G99
G82 X1.000 Y2.000 Z0.000 R5.000 P1.23456 F7380.000
G80
G90
""",
            "--no-translate_drill",
        )
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G90
G0 X1.000 Y2.000
G1 Z5.000 F7380.000
G1 Z0.000 F7380.000
G4 P1.23456
G0 Z5.000
G90
""",
            "--translate_drill",
        )
        self.multi_compare(
            path,
            """(Begin preamble)
G90
G21
(Begin operation)
G54
(Finish operation)
(Begin operation)
(TC: Default Tool)
(Begin toolchange)
(M6 T1)
(Finish operation)
(Begin operation)
G0 X1.000 Y2.000
G0 Z8.000
G90
(G99)
(G82 X1.000 Y2.000 Z0.000 R5.000 P1.23456 F7380.000)
G0 X1.000 Y2.000
G1 Z5.000 F7380.000
G1 Z0.000 F7380.000
G4 P1.23456
G0 Z5.000
(G80)
G90
(Finish operation)
(Begin postamble)
""",
            "--comments --translate_drill",
        )
        #
        # reinitialize the postprocessor data structures before doing more tests
        #
        self.post.reinitialize()
        #
        # Test translate_drill with G82 and G91.
        #
        path = [
            Path.Command("G0 X1 Y2"),
            Path.Command("G0 Z8"),
            Path.Command("G91"),
            Path.Command("G99"),
            Path.Command("G82 X1 Y2 Z0 F123 R5 P1.23456"),
            Path.Command("G80"),
            Path.Command("G90"),
        ]
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G91
G99
G82 X1.000 Y2.000 Z0.000 R5.000 P1.23456 F7380.000
G80
G90
""",
            "--no-translate_drill",
        )
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G91
G90
G0 Z13.000
G0 X2.000 Y4.000
G1 Z8.000 F7380.000
G4 P1.23456
G0 Z13.000
G91
G90
""",
            "--translate_drill",
        )
        self.multi_compare(
            path,
            """(Begin preamble)
G90
G21
(Begin operation)
G54
(Finish operation)
(Begin operation)
(TC: Default Tool)
(Begin toolchange)
(M6 T1)
(Finish operation)
(Begin operation)
G0 X1.000 Y2.000
G0 Z8.000
G91
(G99)
(G82 X1.000 Y2.000 Z0.000 R5.000 P1.23456 F7380.000)
G90
G0 Z13.000
G0 X2.000 Y4.000
G1 Z8.000 F7380.000
G4 P1.23456
G0 Z13.000
G91
(G80)
G90
(Finish operation)
(Begin postamble)
""",
            "--comments --translate_drill",
        )

    #############################################################################

    def test10830(self):
        """Test G83 command Generation."""
        path = [
            Path.Command("G0 X1 Y2"),
            Path.Command("G0 Z8"),
            Path.Command("G90"),
            Path.Command("G99"),
            Path.Command("G83 X1 Y2 Z0 F123 Q1.5 R5"),
            Path.Command("G80"),
            Path.Command("G90"),
        ]
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G90
G99
G83 X1.000 Y2.000 Z0.000 R5.000 Q1.500 F7380.000
G80
G90
""",
            "--no-translate_drill",
        )
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G90
G0 X1.000 Y2.000
G1 Z5.000 F7380.000
G1 Z3.500 F7380.000
G0 Z5.000
G0 Z3.575
G1 Z2.000 F7380.000
G0 Z5.000
G0 Z2.075
G1 Z0.500 F7380.000
G0 Z5.000
G0 Z0.575
G1 Z0.000 F7380.000
G0 Z5.000
G90
""",
            "--translate_drill",
        )
        self.multi_compare(
            path,
            """(Begin preamble)
G90
G21
(Begin operation)
G54
(Finish operation)
(Begin operation)
(TC: Default Tool)
(Begin toolchange)
(M6 T1)
(Finish operation)
(Begin operation)
G0 X1.000 Y2.000
G0 Z8.000
G90
(G99)
(G83 X1.000 Y2.000 Z0.000 R5.000 Q1.500 F7380.000)
G0 X1.000 Y2.000
G1 Z5.000 F7380.000
G1 Z3.500 F7380.000
G0 Z5.000
G0 Z3.575
G1 Z2.000 F7380.000
G0 Z5.000
G0 Z2.075
G1 Z0.500 F7380.000
G0 Z5.000
G0 Z0.575
G1 Z0.000 F7380.000
G0 Z5.000
(G80)
G90
(Finish operation)
(Begin postamble)
""",
            "--comments --translate_drill",
        )
        #
        # reinitialize the postprocessor data structures before doing more tests
        #
        self.post.reinitialize()
        #
        # Test translate_drill with G83 and G91.
        #
        path = [
            Path.Command("G0 X1 Y2"),
            Path.Command("G0 Z8"),
            Path.Command("G91"),
            Path.Command("G99"),
            Path.Command("G83 X1 Y2 Z0 F123 Q1.5 R5"),
            Path.Command("G80"),
            Path.Command("G90"),
        ]
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G91
G99
G83 X1.000 Y2.000 Z0.000 R5.000 Q1.500 F7380.000
G80
G90
""",
            "--no-translate_drill",
        )
        self.multi_compare(
            path,
            """G90
G21
G54
G0 X1.000 Y2.000
G0 Z8.000
G91
G90
G0 Z13.000
G0 X2.000 Y4.000
G1 Z11.500 F7380.000
G0 Z13.000
G0 Z11.575
G1 Z10.000 F7380.000
G0 Z13.000
G0 Z10.075
G1 Z8.500 F7380.000
G0 Z13.000
G0 Z8.575
G1 Z8.000 F7380.000
G0 Z13.000
G91
G90
""",
            "--translate_drill",
        )
        self.multi_compare(
            path,
            """(Begin preamble)
G90
G21
(Begin operation)
G54
(Finish operation)
(Begin operation)
(TC: Default Tool)
(Begin toolchange)
(M6 T1)
(Finish operation)
(Begin operation)
G0 X1.000 Y2.000
G0 Z8.000
G91
(G99)
(G83 X1.000 Y2.000 Z0.000 R5.000 Q1.500 F7380.000)
G90
G0 Z13.000
G0 X2.000 Y4.000
G1 Z11.500 F7380.000
G0 Z13.000
G0 Z11.575
G1 Z10.000 F7380.000
G0 Z13.000
G0 Z10.075
G1 Z8.500 F7380.000
G0 Z13.000
G0 Z8.575
G1 Z8.000 F7380.000
G0 Z13.000
G91
(G80)
G90
(Finish operation)
(Begin postamble)
""",
            "--comments --translate_drill",
        )

    #############################################################################

    def test10900(self):
        """Test G90 command Generation."""
        # specifying no arguments ("") doesn't set all of the arguments
        # back to defaults any more, so tests are more order dependent
        # This test works when run by itself but fails when run after
        # test10830 because comments are being generated.
        self.single_compare("G90", "G90", "--no-comments")

    #############################################################################

    def test10901(self):
        """Test G90.1 command Generation."""
        self.single_compare("G90.1", "G90.1", "")

    #############################################################################

    def test10910(self):
        """Test G91 command Generation."""
        self.single_compare("G91", "G91", "")

    #############################################################################

    def test10911(self):
        """Test G91.1 command Generation."""
        self.single_compare("G91.1", "G91.1", "")

    #############################################################################

    def test10920(self):
        """Test G92 command Generation."""
        self.single_compare(
            "G92 X10 Y20 Z30 A40 B50 C60 U70 V80 W90",
            ("G92 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000"),
            "",
        )

    #############################################################################

    def test10921(self):
        """Test G92.1 command Generation."""
        self.single_compare("G92.1", "G92.1", "")

    #############################################################################

    def test10922(self):
        """Test G92.2 command Generation."""
        self.single_compare("G92.2", "G92.2", "")

    #############################################################################

    def test10923(self):
        """Test G92.3 command Generation."""
        self.single_compare("G92.3", "G92.3", "")

    #############################################################################

    def test10930(self):
        """Test G93 command Generation."""
        self.single_compare("G93", "G93", "")

    #############################################################################

    def test10940(self):
        """Test G94 command Generation."""
        self.single_compare("G94", "G94", "")

    #############################################################################

    def test10950(self):
        """Test G95 command Generation."""
        self.single_compare("G95", "G95", "")

    #############################################################################

    def test10980(self):
        """Test G98 command Generation."""
        self.single_compare("G98", "G98", "")

    #############################################################################

    def test10990(self):
        """Test G99 command Generation."""
        self.single_compare("G99", "G99", "")

    #############################################################################
    #############################################################################
    #  Testing A, B, & C axes outputs (in a great deal of detail :-)
    #############################################################################
    #############################################################################

    def test19100(self):
        """Test the individual A, B, and C axes output for picked values"""
        axis_test_values = (
            # between 0 and 90 degrees
            ("40", "40.000", "40.0000"),
            # 89 degrees
            ("89", "89.000", "89.0000"),
            # 90 degrees
            ("90", "90.000", "90.0000"),
            # 91 degrees
            ("91", "91.000", "91.0000"),
            # between 90 and 180 degrees
            ("100", "100.000", "100.0000"),
            # between 180 and 360 degrees
            ("240", "240.000", "240.0000"),
            # over 360 degrees
            ("440", "440.000", "440.0000"),
            # between 0 and -90 degrees
            ("-40", "-40.000", "-40.0000"),
            # -89 degrees
            ("-89", "-89.000", "-89.0000"),
            # -90 degrees
            ("-90", "-90.000", "-90.0000"),
            # -91 degrees
            ("-91", "-91.000", "-91.0000"),
            # between -90 and -180 degrees
            ("-100", "-100.000", "-100.0000"),
            # between -180 and -360 degrees
            ("-240", "-240.000", "-240.0000"),
            # below -360 degrees
            ("-440", "-440.000", "-440.0000"),
        )
        for (
            input_value,
            metric_output_expected,
            inches_output_expected,
        ) in axis_test_values:
            for axis_name in ("A", "B", "C"):
                with self.subTest(
                    "individual axis test", axis_name=axis_name, input_value=input_value
                ):
                    self.single_compare(
                        f"G1 X10 Y20 Z30 {axis_name}{input_value}",
                        f"G1 X10.000 Y20.000 Z30.000 {axis_name}{metric_output_expected}",
                        "--no-comments",
                    )
                    self.single_compare(
                        f"G1 X10 Y20 Z30 {axis_name}{input_value}",
                        f"G1 X0.3937 Y0.7874 Z1.1811 {axis_name}{inches_output_expected}",
                        "--no-comments --inches",
                    )

    #############################################################################

    def test19110(self):
        """Test the combined A, B, and C axes output for picked values"""
        axis_test_values = (
            # between 0 and 90 degrees
            (
                "40",
                "40.000",
                "40.0000",
                "50",
                "50.000",
                "50.0000",
                "60",
                "60.000",
                "60.0000",
            ),
            # 89 degrees
            (
                "89",
                "89.000",
                "89.0000",
                "89",
                "89.000",
                "89.0000",
                "89",
                "89.000",
                "89.0000",
            ),
            # 90 degrees
            (
                "90",
                "90.000",
                "90.0000",
                "90",
                "90.000",
                "90.0000",
                "90",
                "90.000",
                "90.0000",
            ),
            # 91 degrees
            (
                "91",
                "91.000",
                "91.0000",
                "91",
                "91.000",
                "91.0000",
                "91",
                "91.000",
                "91.0000",
            ),
            # between 90 and 180 degrees
            (
                "100",
                "100.000",
                "100.0000",
                "110",
                "110.000",
                "110.0000",
                "120",
                "120.000",
                "120.0000",
            ),
            # between 180 and 360 degrees
            (
                "240",
                "240.000",
                "240.0000",
                "250",
                "250.000",
                "250.0000",
                "260",
                "260.000",
                "260.0000",
            ),
            # over 360 degrees
            (
                "440",
                "440.000",
                "440.0000",
                "450",
                "450.000",
                "450.0000",
                "460",
                "460.000",
                "460.0000",
            ),
            # between 0 and -90 degrees
            (
                "-40",
                "-40.000",
                "-40.0000",
                "-50",
                "-50.000",
                "-50.0000",
                "-60",
                "-60.000",
                "-60.0000",
            ),
            # -89 degrees
            (
                "-89",
                "-89.000",
                "-89.0000",
                "-89",
                "-89.000",
                "-89.0000",
                "-89",
                "-89.000",
                "-89.0000",
            ),
            # -90 degrees
            (
                "-90",
                "-90.000",
                "-90.0000",
                "-90",
                "-90.000",
                "-90.0000",
                "-90",
                "-90.000",
                "-90.0000",
            ),
            # -91 degrees
            (
                "-91",
                "-91.000",
                "-91.0000",
                "-91",
                "-91.000",
                "-91.0000",
                "-91",
                "-91.000",
                "-91.0000",
            ),
            # between -90 and -180 degrees
            (
                "-100",
                "-100.000",
                "-100.0000",
                "-110",
                "-110.000",
                "-110.0000",
                "-120",
                "-120.000",
                "-120.0000",
            ),
            # between -180 and -360 degrees
            (
                "-240",
                "-240.000",
                "-240.0000",
                "-250",
                "-250.000",
                "-250.0000",
                "-260",
                "-260.000",
                "-260.0000",
            ),
            # below -360 degrees
            (
                "-440",
                "-440.000",
                "-440.0000",
                "-450",
                "-450.000",
                "-450.0000",
                "-460",
                "-460.000",
                "-460.0000",
            ),
        )
        for (
            a_input_value,
            a_metric_output_expected,
            a_inches_output_expected,
            b_input_value,
            b_metric_output_expected,
            b_inches_output_expected,
            c_input_value,
            c_metric_output_expected,
            c_inches_output_expected,
        ) in axis_test_values:
            with self.subTest(
                "combined axes test",
                a_input_value=a_input_value,
                b_input_value=b_input_value,
                c_input_value=c_input_value,
            ):
                self.single_compare(
                    f"G1 X10 Y20 Z30 A{a_input_value} B{b_input_value} C{c_input_value}",
                    f"G1 X10.000 Y20.000 Z30.000 A{a_metric_output_expected} "
                    f"B{b_metric_output_expected} C{c_metric_output_expected}",
                    "",
                )
                self.single_compare(
                    f"G1 X10 Y20 Z30 A{a_input_value} B{b_input_value} C{c_input_value}",
                    f"G1 X0.3937 Y0.7874 Z1.1811 A{a_inches_output_expected} "
                    f"B{b_inches_output_expected} C{c_inches_output_expected}",
                    "--inches",
                )

    #############################################################################

    def test19120(self):
        """Test F parameter handling."""
        #
        # Note that FreeCAD internal units are (mm or degrees) per second
        # and postprocessor outputs are usually in (mm or degrees) per minute
        #
        axes_test_values = (
            # test using all possible axes, all same, then all changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X20 Y30 Z10 A70 B80 C90 U40 V50 W60 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X20.000 Y30.000 Z10.000 A70.000 B80.000 C90.000 U40.000 V50.000 W60.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F74.0736
G1 X0.7874 Y1.1811 Z0.3937 A70.0000 B80.0000 C90.0000 U1.5748 V1.9685 W2.3622 F2.9163
""",
            ),
            # test using all possible axes, just X changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X20 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X20.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.7874 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
""",
            ),
            # test using all possible axes, just Y changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y30 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y30.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y1.1811 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
""",
            ),
            # test using all possible axes, just Z changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y20 Z10 A40 B50 C60 U70 V80 W90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y20.000 Z10.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y0.7874 Z0.3937 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
""",
            ),
            # test using all possible axes, just A changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 A70 B50 C60 U70 V80 W90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y20.000 Z30.000 A70.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 A70.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F74.0736
""",
            ),
            # test using all possible axes, just B changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 A40 B80 C60 U70 V80 W90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y20.000 Z30.000 A40.000 B80.000 C60.000 U70.000 V80.000 W90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B80.0000 C60.0000 U2.7559 V3.1496 W3.5433 F74.0736
""",
            ),
            # test using all possible axes, just C changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C90 U70 V80 W90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C90.000 U70.000 V80.000 W90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C90.0000 U2.7559 V3.1496 W3.5433 F74.0736
""",
            ),
            # test using all possible axes, just U changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U40 V80 W90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U40.000 V80.000 W90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U1.5748 V3.1496 W3.5433 F2.9163
""",
            ),
            # test using all possible axes, just V changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V50 W90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V50.000 W90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V1.9685 W3.5433 F2.9163
""",
            ),
            # test using all possible axes, just W changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 U70 V80 W60 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 U70.000 V80.000 W60.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W2.3622 F2.9163
""",
            ),
            # test using just XYZ, all same, then all changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 F1.23456"),
                    Path.Command("G1 X20 Y30 Z10 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 F74.074
G1 X10.000 Y20.000 Z30.000 F74.074
G1 X20.000 Y30.000 Z10.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 F2.9163
G1 X0.7874 Y1.1811 Z0.3937 F2.9163
""",
            ),
            # test using just UVW, all same, then all changing
            (
                [
                    Path.Command("G1 U70 V80 W90 F1.23456"),
                    Path.Command("G1 U70 V80 W90 F1.23456"),
                    Path.Command("G1 U40 V50 W60 F1.23456"),
                ],
                """G90
G21
G54
G1 U70.000 V80.000 W90.000 F74.074
G1 U70.000 V80.000 W90.000 F74.074
G1 U40.000 V50.000 W60.000 F74.074
""",
                """G90
G20
G54
G1 U2.7559 V3.1496 W3.5433 F2.9163
G1 U2.7559 V3.1496 W3.5433 F2.9163
G1 U1.5748 V1.9685 W2.3622 F2.9163
""",
            ),
            # test using just ABC, which should not convert the feed rate for --inches
            (
                [
                    Path.Command("G1 A40 B50 C60 F1.23456"),
                    Path.Command("G1 A40 B50 C60 F1.23456"),
                    Path.Command("G1 A70 B80 C90 F1.23456"),
                ],
                """G90
G21
G54
G1 A40.000 B50.000 C60.000 F74.074
G1 A40.000 B50.000 C60.000 F74.074
G1 A70.000 B80.000 C90.000 F74.074
""",
                """G90
G20
G54
G1 A40.0000 B50.0000 C60.0000 F74.0736
G1 A40.0000 B50.0000 C60.0000 F74.0736
G1 A70.0000 B80.0000 C90.0000 F74.0736
""",
            ),
            # test using XYZ and ABC, all same, then all changing
            (
                [
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 F1.23456"),
                    Path.Command("G1 X10 Y20 Z30 A40 B50 C60 F1.23456"),
                    Path.Command("G1 X20 Y30 Z10 A70 B80 C90 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 F74.074
G1 X10.000 Y20.000 Z30.000 A40.000 B50.000 C60.000 F74.074
G1 X20.000 Y30.000 Z10.000 A70.000 B80.000 C90.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 F2.9163
G1 X0.3937 Y0.7874 Z1.1811 A40.0000 B50.0000 C60.0000 F74.0736
G1 X0.7874 Y1.1811 Z0.3937 A70.0000 B80.0000 C90.0000 F2.9163
""",
            ),
            # test using ABC and UVW, all same, then all changing
            (
                [
                    Path.Command("G1 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 A40 B50 C60 U70 V80 W90 F1.23456"),
                    Path.Command("G1 A70 B80 C90 U40 V50 W60 F1.23456"),
                ],
                """G90
G21
G54
G1 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 A40.000 B50.000 C60.000 U70.000 V80.000 W90.000 F74.074
G1 A70.000 B80.000 C90.000 U40.000 V50.000 W60.000 F74.074
""",
                """G90
G20
G54
G1 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F2.9163
G1 A40.0000 B50.0000 C60.0000 U2.7559 V3.1496 W3.5433 F74.0736
G1 A70.0000 B80.0000 C90.0000 U1.5748 V1.9685 W2.3622 F2.9163
""",
            ),
            # test using X and A only, both same, then both changing
            (
                [
                    Path.Command("G1 X10 A40 F1.23456"),
                    Path.Command("G1 X10 A40 F1.23456"),
                    Path.Command("G1 X20 A70 F1.23456"),
                ],
                """G90
G21
G54
G1 X10.000 A40.000 F74.074
G1 X10.000 A40.000 F74.074
G1 X20.000 A70.000 F74.074
""",
                """G90
G20
G54
G1 X0.3937 A40.0000 F2.9163
G1 X0.3937 A40.0000 F74.0736
G1 X0.7874 A70.0000 F2.9163
""",
            ),
            # test using A and U only, both same, then both changing
            (
                [
                    Path.Command("G1 A40 U70 F1.23456"),
                    Path.Command("G1 A40 U70 F1.23456"),
                    Path.Command("G1 A70 U40 F1.23456"),
                ],
                """G90
G21
G54
G1 A40.000 U70.000 F74.074
G1 A40.000 U70.000 F74.074
G1 A70.000 U40.000 F74.074
""",
                """G90
G20
G54
G1 A40.0000 U2.7559 F2.9163
G1 A40.0000 U2.7559 F74.0736
G1 A70.0000 U1.5748 F2.9163
""",
            ),
            # test using A only, which should not convert the feed rate for --inches
            (
                [
                    Path.Command("G1 A40 F1.23456"),
                    Path.Command("G1 A40 F1.23456"),
                    Path.Command("G1 A70 F1.23456"),
                ],
                """G90
G21
G54
G1 A40.000 F74.074
G1 A40.000 F74.074
G1 A70.000 F74.074
""",
                """G90
G20
G54
G1 A40.0000 F74.0736
G1 A40.0000 F74.0736
G1 A70.0000 F74.0736
""",
            ),
        )
        for input_value, metric_output_expected, inches_output_expected in axes_test_values:
            with self.subTest("F feed speed test", input_value=input_value):
                self.multi_compare(input_value, metric_output_expected, "")
                self.multi_compare(input_value, inches_output_expected, "--inches")
