#
# Read contents of the files generated by the siteplayer that have been used to build webbrick firmware
#
# And generate a table of definitions for our use.
#

# File 1 is a C header file
# gives us address.
# File 2 is the siteplayer defintion files - gives us types.
import re
import os, os.path
import logging
_log = logging.getLogger(__name__)

from sp_objects import Sp_object, Sp_objects

def Sp_parser(source_dir):
    values = Sp_objects()

    # 2 match groups
    re_address_line = re.compile("^#define\s*(\w*)\s*0x([0-9A-Fa-f]{1,5})\s*.*$")
    re_type_line = re.compile("^(\w*)\s*(\w*)\s*(\S*)")

    object_types = dict( 
        db = Sp_object.T_byte,
        dw = Sp_object.T_integer,
        ds = Sp_object.T_string,
        dd = Sp_object.T_dd,
        dhex = Sp_object.T_byte,
    )
    def parse_type(type_str):
        if type_str in object_types:
            return object_types[type_str]
        raise ValueError("Unknown type string %s" % ( type_str,) )

    def parse_value(o_type, value):
        # this is called with value from the siteplayer definition file
        if value:
            if o_type == Sp_object.T_string:
                # value is the string length
                return( int(value), None )
            elif value[0] == '"':
                # its a a string literal
                value = value[1:-1]
                return( len(value), value )
            elif value[-1] == 'h':
                return( None, int(value[:-1], 16) )
            return( None, int(value) )
        return( None, None )

    def parse_type_line(line):
        # These come from the site player definition file
        #SPToD	        db	255	; Time of Day Concept, 255 is flag that SP has yet to be loaded.
        if ';' in line:
            line = line.split( ';')[0]    # loose any comments
        line = line.strip()
        if len(line) > 0 and line[0] != '$':
            mo = re_type_line.match(line)
            if mo:
                # access groups
                name = mo.group(1).strip()
                if name not in ('org',):
                    o_type = parse_type(mo.group(2).strip())
                    o_size, o_value = parse_value(o_type, mo.group(3).strip())
                    if o_type == Sp_object.T_byte and o_size and o_size > 1:
                        o_type = Sp_object.T_string
                    if name in values:
                        print "Duplicate name %s" % (name,)
                    else:
                        values[name] = Sp_object(name,o_type,o_size)
                        values[name].value = o_value

    def search_key(key):
        # the values dict is  
        for k in values:
            if k.lower() == key.lower():
                return values[k]
        return None

    def parse_address_line(line):
        # These come from the C header file and are of the format
        #define udpstring 0x0000 /* String output  */
        mo = re_address_line.match(line)
        if mo:
            # access groups
            name = mo.group(1).strip()
            value = search_key(name)
            if value is None:
                print "No such name %s" % (name,)
            else:
                value.address = int(mo.group(2),16)
                    
    def parse_address_file(name):
        with open( os.path.join( source_dir, name ) ) as file:
            for line in file:
                parse_address_line(line)
                    
    def parse_type_file(name):
        with open( os.path.join( source_dir, name ) ) as file:
            for line in file:
                parse_type_line(line)
                
    def parse_all():
        for name in ("wb55def.inc", "siteplayer.inc", "udpsend_def.inc"):
            parse_type_file(name)
        for name in ("wb55lib.h",):
            parse_address_file(name)

    parse_all()
    return values


def print_values(values):
    print "\tName\tAddress\tType\tSize\tValue"
    for v in values:
        print v.to_string()

def print_by_address(objs):
    print_values(objs.by_address)

def print_by_name(objs):
    print_values(objs.by_name())

def main():
    objs = Sp_parser()
    print_by_address(objs)

#main()

