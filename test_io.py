import serial
import logging
_log = logging.getLogger(__name__)

class TestIo(object):
    def __init__(self, source_file, target_file='test.log' ):
        self.source = open( source_file, "r" ) 
        self.target = open( target_file, "w" ) 

    def close(self):
        if self.source:
            self.source.close()
            self.source = None
        if self.target:
            self.target.close()
            self.target = None

    def write(self,data):
        self.target.write(data)

    def read(self, count):
        return self.source.read(count)


