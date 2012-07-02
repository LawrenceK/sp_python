#
# Emulate a siteplayer on its serial link.
#
# Packet format is 
# Command Byte
# Address 1 or 2 bytes
# Data 0 - 16 Bytes
#
#
import serial
import threading

class PacketTypes:
	# extract packet type from byte
	COMMAND_MASK = 0xF0
	LENGTH_MASK = 0x0F
	# single byte
	NOP = 0x00		
	# Read status from SP, send a byte back
	# bits are set by form pages.
	Status = 0x10	
	# single byte
	Reset = 0x20	
	# 4 bytes of data, 2 bytes baud and 2 byte turnaround delay
	ComParams = 0x30
	# trigger UDP send from udp buffer
	UDPSend = 0x50
	# single byte address and then up to 16 bytes of data
	Write = 0x80
	# two byte address(lo,high) and then up to 16 bytes of data
	WriteX = 0x90
	# write a single bit in address space at 0x2E0-0x2FF
	# byte address and byte with bit in
	WriteBit = 0xA0
	# toggle a single bit in address space at 0x2E0-0x2FF
	# byte address and byte ignored
	ToggleBit = 0xB0
	# single byte address and then receive up to 16 bytes of data
	Read = 0xC0
	# two byte address(lo,high) and then receive up to 16 bytes of data
	ReadX = 0xD0
	# read a single bit in address space at 0x2E0-0x2FF
	# byte address and returns byte with bit in
	ReadBit = 0xE0

class SpProtocolHandler(threading.Thread):
	daemon = True
	def __init__(self, callback):
		super(SpProtocolHandler,self).__init__(name='SpProtocolHandler')
		self._portname = ''
		self._portname = ''
		self._port = None
		self._callback = callback
		self.start()
		self.raw_data = bytearray(3*256)	# initial state

	def open(self):
		self.port = serial.Serial(
				port='/dev/ttyUSB1',
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
			self.port.write('\n')

	def extract_len(self,command):
		return (command & PacketTypes.LENGTH_MASK)+1

	def update_data(self,address,data):
		# update raw_data
		self.raw_data[address:address+len(data)] = data
		# call user to make other updates
		if self._callback:
			self._callback( address, len(data), self.raw_data)

	def command_00(self,command):
		# NOP
		pass

	def command_10(self,command):
		# status, not used by webbrick
		self.port.write( '\0' )

	def command_20(self,command):
		# Reset
		pass

	def command_30(self,command):
		# ComParams
		self.port.read(4)	# throw away result

	def command_40(self,command):
		# unused
		pass

	def command_50(self,command):
		#UDPSend
		pass

	def command_60(self,command):
		# unused
		pass

	def command_70(self,command):
		# unused
		pass

	def command_80(self,command):
		# write
		address = self.port.read(1)	# single byte address
		data = self.port.read( self.extract_len(command) )
		self.update_data( address, data )

	def command_90(self,command):
		# writeX
		address = self.port.read(2)	# two byte address
		long_address = address[0] + (address[1]*256)
		data = self.port.read( self.extract_len(command) )
		self.update_data( long_address, data )

	def command_A0(self,command):
		# WriteBit
		self.port.read(2)	# throw away result

	def command_B0(self,command):
		# ToggleBit
		self.port.read(2)	# throw away result

	def command_C0(self,command):
		# Read
		address = self.port.read(1)	# single byte address
		self.port.write( self.raw_data[address:address+self.extract_len(command)])

	def command_D0(self,command):
		# ReadX
		address = self.port.read(2)	# two byte address
		long_address = address[0] + (address[1]*256)
		self.port.write( self.raw_data[long_address:long_address+self.extract_len(command)])

	def command_E0(self,command):
		# readbit
		pass

	def command_F0(self,command):
		# unsued
		pass

	def read_packet(self):
		command = self.port.read(1)
		code = (command & PacketTypes.COMMAND_MASK)
		command_name = "command_%X" % (code,)
		# desptahc to one of command_XX handlers above
		getattr(self, command_name)(command)

	def run(self):
		self.open()
		while self.port.isOpen():
			self.read_packet()
		self.close()

