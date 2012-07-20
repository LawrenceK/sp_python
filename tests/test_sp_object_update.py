import logging
import time
_log = logging.getLogger(__name__)

import unittest
import os, os.path

from test_io import TestIo
from sp_parse import Sp_parser
from sp_protocol import SpProtocolHandler
from sp_object_update import sp_object_update

class testSpObjectUpdate(unittest.TestCase):

    def setUp(self):
        pass

    def testUpdate(self):
        values = Sp_parser(os.path.join( os.path.dirname(__file__), "../wb_sources") )

        io = TestIo( os.path.join( os.path.dirname(__file__), "data/wb_reset.log") )
        sp = SpProtocolHandler(io, sp_object_update(values))
        while sp.is_running:
            time.sleep(0.2)
        io.close()

        for spo in values.by_name:
#            print spo.to_string()
            self.assertNotEqual("", spo.name )
            self.failUnless(spo.o_type in [1,2,3,4] )
            if spo.o_type == spo.T_byte:
                self.assertEqual(1, spo.size)
            if spo.o_type == spo.T_integer:
                self.assertEqual(2, spo.size)
            if spo.o_type == spo.T_string:
                self.failUnless(spo.size>0)
            if spo.o_type == spo.T_dd:
                self.assertEqual(4, spo.size)
            self.failUnless(spo.address is not None )
            if spo.address < (1024*63):
                self.failUnless(spo.value is not None )


