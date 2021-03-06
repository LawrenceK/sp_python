import serial
import logging
_log = logging.getLogger(__name__)

class WebbrickIo(object):
    def __init__(self, portname = '/dev/ttyUSB1' ):
        self._port = None
        self.open(portname)

    def open(self, portname):
        print "Open", portname
        self.port = serial.Serial(
                port=portname,
                baudrate=9600,
                parity=serial.PARITY_NONE,
                stopbits=serial.STOPBITS_ONE,
                bytesize=serial.EIGHTBITS,
                timeout=1
        )
	print "IsOpen", self.port
#        self.port.open()

    def close(self):
        if self.port.isOpen():
            self.port.close()

    def write(self,data):
        if self.port.isOpen():
            self.port.write(data)

    def read(self, count):
        chs = self.port.read(count)
        return chs


