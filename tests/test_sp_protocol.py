import logging
import time
_log = logging.getLogger(__name__)

import os, os.path
import unittest

from test_io import TestIo
from sp_protocol import SpProtocolHandler

class TestSpProtocolHandler(unittest.TestCase):

    def setUp(self):
        self._updates = []

    def protocol_callback(self, address, length, raw_data):
        self._updates.append( (address, length, raw_data) )

    def testProtocolCallback(self):
        io = TestIo( os.path.join( os.path.dirname(__file__), "data/wb_reset.log") )

        sp = SpProtocolHandler(io, self.protocol_callback)
        time.sleep(0.1)
        while sp.is_running:
            time.sleep(0.2)

        self.assertNotEqual(0, len(self._updates) )
        address, length, raw_data = self._updates[-1]
        io.close()

