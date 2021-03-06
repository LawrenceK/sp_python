import logging
_log = logging.getLogger(__name__)

import unittest
import os, os.path

from sp_parse import Sp_parser

class TestSpParse(unittest.TestCase):

    def setUp(self):
        pass

    def testParse(self):
        values = Sp_parser(os.path.join( os.path.dirname(__file__), "../wb_sources") )
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


