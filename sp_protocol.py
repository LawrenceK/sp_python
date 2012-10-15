#
# Emulate a siteplayer on its serial link.
#
# Packet format is 
# Command Byte
# Address 1 or 2 bytes
# Data 0 - 16 Bytes
#
#
import threading
import logging
_log = logging.getLogger(__file__)

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
    def __init__(self, io, callback):
        super(SpProtocolHandler,self).__init__(name='SpProtocolHandler')
        self._running = False
        self._io = io
        self._callback = callback
        self._raw_data = bytearray(64*1024)	# initial state
        self.start()

    def extract_len(self,command):
        return (command & PacketTypes.LENGTH_MASK)+1

    def update_data(self,address,data):
        _log.debug("update_data %s: (%s)%s (%s)", address, len(data), data, type(data))
        # update raw_data
        self._raw_data[address:address+len(data)] = data
        # call user to make other updates
        if self._callback:
            self._callback( address, len(data), self._raw_data)

    def command_00(self,command):
        # NOP
        pass

    def command_10(self,command):
        # status, not used by webbrick
        self._io.write( '\0' )

    def command_20(self,command):
        # Reset
        pass

    def command_30(self,command):
        # ComParams
        self._io.read(4)	# throw away result

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
        address = self.read_short_address()
        data = self._io.read( self.extract_len(command) )
        self.update_data( address, data )

    def command_90(self,command):
        # writeX
        address = self.read_long_address()
        data = self._io.read( self.extract_len(command) )
        self.update_data( address, data )

    def command_A0(self,command):
        # WriteBit
        self._io.read(2)	# throw away result

    def command_B0(self,command):
        # ToggleBit
        self._io.read(2)	# throw away result

    def command_C0(self,command):
        # Read
        address = self.read_short_address()
        self._io.write( self._raw_data[address:address+self.extract_len(command)])

    def command_D0(self,command):
        # ReadX
        address = self.read_long_address()
        self._io.write( self._raw_data[address:address+self.extract_len(command)])

    def command_E0(self,command):
        # readbit
        pass

    def command_F0(self,command):
        # unsued
        pass

    def read_short_address(self):
        return ord(self._io.read(1)[0])

    def read_long_address(self):
        address = self._io.read(2)
        return ord(address[0]) + (ord(address[1])*256)

    def read_packet(self):
        command = self._io.read(1)
        if len(command) > 0:
            command = ord(command[0])
            code = (command & PacketTypes.COMMAND_MASK)
            command_name = "command_%2.2X" % (code,)
            # desptahc to one of command_XX handlers above
            _log.debug("read_packet %s", command_name)
            getattr(self, command_name)(command)

    def shutdown(self):
        self._running = False

    @property
    def is_running(self):
        return self._running

    def run(self):
        _log.debug("run")
        self._running = True
        try :
            while self._running:
                self.read_packet()
        except Exception, ex:
            _log.exception("run")
        self._running = False

