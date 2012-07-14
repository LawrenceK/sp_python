import serial
import logging
_log = logging.getlogger(__file__)

class WebbrickIo():
	def __init__(self, portname = '/dev/ttyUSB1' ):
		self._port = None
        self.open(portname)

	def open(self, portname):
		self.port = serial.Serial(
				port=portname,
				baudrate=9600,
				parity=serial.PARITY_NONE,
				stopbits=serial.STOPBITS_ONE,
				bytesize=serial.EIGHTBITS
		)
		self.port.open()

	def close(self):
		if self.port.isOpen():
			self.port.close()

	def write(self,data):
		if self.port.isOpen():
			self.port.write(data)

	def read(self, count):
		return self.port.read(count)


