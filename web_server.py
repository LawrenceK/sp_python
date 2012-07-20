#
# Read contents of the web files used by siteplayer builder and substitute replacement strings
#
import os, os.path
import SimpleHTTPServer
import logging
_log = logging.getLogger(__name__)

from sp_parse import Sp_parser
from sp_protocol import SpProtocolHandler
from sp_object_update import sp_object_update

class RequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    sp_values = Sp_parser(os.path.join( os.path.dirname(__file__), "./wb_sources") )
    io = open(os.path.join( os.path.dirname(__file__), "tests/data/wb_reset.log") , "r")
    sp = SpProtocolHandler(io, sp_object_update(sp_values))

    def translate_file(self, source_filename, target_filename):
        _log.debug( "translate_file %s -> %s", source_filename, target_filename)
        with open(source_filename) as source:
            with open(target_filename, "w") as target:
                nline = source.read() % RequestHandler.sp_values
                target.write(nline)

    def translate_path(self, path):
        path = path[1:].split('?',1)[0]
        targetfilename = os.path.join(os.getcwd(), "www", path)
        print os.getcwd(), targetfilename
        if targetfilename.endswith(".spi"):
            # handle parameters
            # return redirect
            pass
        elif targetfilename.endswith(".inc"):
            # these are files that need data translated into them.
            sourcefilename = os.path.join(os.getcwd(), "inc", path)
            self.translate_file( sourcefilename, targetfilename )

        # override so as to manage translation file single 
#        path = super(RequestHandler,self).translate_path(path)
        _log.debug( "translate_path %s -> %s", path, targetfilename)
        return targetfilename 

RequestHandler.extensions_map.update({
        '.inc': 'text/plain',
        })

SimpleHTTPServer.test(HandlerClass = RequestHandler)

