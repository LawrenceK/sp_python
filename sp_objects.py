#
# Read contents of the files generated by the siteplayer that have been used to build webbrick firmware
#
# And generate a table of definitions for our use.
#

# File 1 is a C header file
# gives us address.
# File 2 is the siteplayer defintion files - gives us types.
import logging
_log = logging.getLogger(__name__)

class Sp_object(object):
    T_unknown = 0
    T_byte = 1
    T_integer = 2
    T_string = 3
    T_dd = 4
    type_default_size = {
        T_unknown : 1,
        T_byte : 1,
        T_integer : 2,
        T_string : 1,
        T_dd : 4,
    }

    def __init__(self, name, o_type, o_size=None):
        self._o_type = o_type
        self._size = o_size if o_size is not None else Sp_object.type_default_size[o_type]
        self.name = name
        self._address = None
        self._value = None

    @property
    def o_type(self):
        return self._o_type

    # def set_size(self, sz):
    #     if self._o_type == Sp_object.T_integer and sz <> 2:
    #         raise ValueError("Invalid size %s for type %s" % ( sz, type) )
    #     if type == 'db':
    #         raise ValueError("Cannot set size %s for type %s" % ( sz, type) )
    #     self._size = sz
    def get_size(self):
        return self._size
#    size = property(get_size,set_size)
    size = property(get_size)

    def test_address(self, address):
        # is this address part of this object
        return address >= self.address and address < self.address+self.size

    def set_address(self, address):
        #if address < 0 or address > 0x2FF:
        #    raise ValueError("Invalid address %s" % ( address, ) )
        self._address = address
    def get_address(self):
        return self._address
    address = property(get_address,set_address)

    def get_value(self):
        return self._value
    def set_value(self,value):
        self._value = value
    value = property(get_value,set_value)

    def __str__(self):
        return str(self._value)

    def __unicode__(self):
        return unicode(self._value)

    def to_string(self):
        return "%s\t%s\t%s\t%s\t%s" % ( self.name.ljust(10), hex(self.address), self.o_type, self.size, self.value)

class Sp_objects(dict):

    @property
    def by_address(self):
        return sorted(self.values(), key=lambda k: k.address )

#    def at_address(self, address):
#        for spo in self.by_address:
#            if spo.address >= address:
#                return spo

    @property
    def by_name(self):
        return sorted(self.values(), key=lambda k: k.name )


