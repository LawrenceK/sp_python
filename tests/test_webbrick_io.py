import logging
import time
_log = logging.getLogger(__name__)

import unittest

from webbrick_io import WebbrickIo

class TestWebbrickIo(unittest.TestCase):

    def setUp(self):
        self.io = WebbrickIo('/dev/ttyUSB1')

	def testwrite(self):
		self.io.write("RB\n")   # reboot PIC

	def testRead(self):
		self.io.read( 32)

	def testReadAndLog(self):
        # reboot PIC so we get initial complete write
		self.io.write("RB\n")
        end = time.time() + 120
        with open("sp_dump.bin", "wb" ) as f:
            while end > time.time():
    		    f.write( self.io.read(32) )


