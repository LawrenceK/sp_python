#
# Read contents of the web files used by siteplayer builder and substitute replacement strings
#
from sp_objects import Sp_object

def sp_object_updater(values):
    # returns a function bound to the site player objects
    # that can be used by the sp_protocol handler
    def update(start_address, update_len, raw_data):
        # called from sp_protocol handler.
        def locate(address):
            for spo in self.items():
                if spo.test_address(address):
                    return spo
            raise Exception("Address %s not found" % address)

        def set_value(spo, bytes):
            # this is called with raw bytes.
            if spo.o_type == Sp_object.T_string:
                spo.value = bytes
            elif spo.o_type == Sp_object.T_byte:
                spo.value = ord(bytes[0])
            elif spo.o_type == Sp_object.T_integer:
                spo.value = ord(bytes[0]) + 256*ord(bytes[1])
            elif spo.o_type == Sp_object.T_dd:
                spo.value = 0
                for i in [3,2,1,0]:
                    spo.value = spo.value*256 + ord(bytes[i])
            else:
                raise Exception("Unhandled type")

        while address < start_address + update_len:
            spo = locate( address)
            end_address = spo.address+spo.size
            set_value(spo, raw_data[spo.address:end_address])
            address = end_address
        # done
    return update            

