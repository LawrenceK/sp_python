import logging
import time
import os, os.path
_log = logging.getLogger(__name__)

import unittest

from webbrick_io import WebbrickIo

test_filename = os.path.join( os.path.dirname(__file__), "./sp_dump.log")

class TestWebbrickIo(unittest.TestCase):

    def setUp(self):
        self.io = WebbrickIo('/dev/ttyUSB0')

    def testwrite(self):
        self.io.write(":LGinstaller:RB:")   # reboot PIC

    def testRead(self):
        self.io.read( 32)

    def testReadAndLog(self):
        # reboot PIC so we get initial complete write
        self.io.write(":LGinstaller:RB:")
        end = time.time() + 120
        with open("sp_dump.bin", "wb" ) as f:
            while end > time.time():
                ch = self.io.read(1)
                if len(ch):
                    print hex(ord(ch)),
                    f.write( ch )


