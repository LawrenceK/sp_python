import logging
import time
_log = logging.getLogger(__file__)

import unittest

from sp_protocol import SpProtocolHandler

class TestWebbrickIo(unittest.TestCase):

    def setUp(self):
        self._updates = []

    def testProtocol(self):
        with open("data/wb_reset.log", "r") as io:
            sp = SpProtocolHandler(io, None)
            while sp.is_running:
                time.sleep(0.2)

    def protocol_callback(self, address, length, raw_data):
        self._updates.append( (address, length, raw_data) )
        print "%s %s %s " % (address, length, raw_data)

    def testProtocolCallback(self):
        with open("data/wb_reset.log", "r") as io:
            sp = SpProtocolHandler(io, self.protocol_callback)
            while sp.is_running:
                time.sleep(0.2)


