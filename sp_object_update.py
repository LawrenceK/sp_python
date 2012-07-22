#
# Read contents of the web files used by siteplayer builder and substitute replacement strings
#
import logging
_log = logging.getLogger(__name__)

from sp_objects import Sp_object

def sp_object_update(values):
    # returns a function bound to the site player objects
    # that can be used by the sp_protocol handler
    def update(start_address, update_len, raw_data):
        # called from sp_protocol handler.
        def locate(address):
            for spo in values.values():
                if spo.test_address(address):
                    return spo
            return None
            raise Exception("Address %s not found" % address)

        def set_value(spo, bytes):
            # this is called with raw bytes.
            if spo.o_type == Sp_object.T_string:
                idx = 0
                while idx < len(bytes) and bytes[idx] != 0:
                    idx += 1
                bytes = bytes[0:idx]
                spo.value = bytes.decode()
            elif spo.o_type == Sp_object.T_byte:
                spo.value = bytes[0]
            elif spo.o_type == Sp_object.T_integer:
                spo.value = bytes[0] + 256*bytes[1]
            elif spo.o_type == Sp_object.T_dd:
                spo.value = 0
                for i in [3,2,1,0]:
                    spo.value = spo.value*256 + bytes[i]
            else:
                raise Exception("Unhandled type")
            print "Update %s with %s" % (spo.name, spo.value)

        address = start_address
        while address < start_address + update_len:
            spo = locate( address)
            if spo:
                end_address = spo.address+spo.size
                set_value(spo, raw_data[spo.address:end_address])
                address = end_address
            else:
                address += 1
        # done
    return update            

