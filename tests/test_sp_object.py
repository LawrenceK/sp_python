import logging
import time
_log = logging.getLogger(__file__)

import unittest

from sp_objects import Sp_object, Sp_objects

class TestSpObject(unittest.TestCase):

    def setUp(self):
        pass

    def testSpObject(self):
        spo = Sp_object( "name1", Sp_object.T_byte )
        self.assertEqual("name1", spo.name )
        self.assertEqual(Sp_object.T_byte, spo.o_type )
        self.assertEqual(1, spo.size )

        spo = Sp_object( "name2", Sp_object.T_string )
        self.assertEqual("name2", spo.name )
        self.assertEqual(Sp_object.T_string, spo.o_type )
        self.assertEqual(1, spo.size )

        spo = Sp_object( "name3", Sp_object.T_dd )
        self.assertEqual("name3", spo.name )
        self.assertEqual(Sp_object.T_dd, spo.o_type )
        self.assertEqual(4, spo.size )

        spo = Sp_object( "name4", Sp_object.T_integer )
        self.assertEqual("name4", spo.name )
        self.assertEqual(Sp_object.T_integer, spo.o_type )
        self.assertEqual(2, spo.size )


