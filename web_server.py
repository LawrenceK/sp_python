#
# Read contents of the web files used by siteplayer builder and substitute replacement strings
#
import os, os.path
import SimpleHTTPServer
import urllib
import logging
_log = logging.getLogger(__name__)

from test_io import TestIo
from sp_parse import Sp_parser
from sp_protocol import SpProtocolHandler
from sp_object_update import sp_object_update
from webbrick_io import WebbrickIo

class RequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    sp_values = Sp_parser(os.path.join( os.path.dirname(__file__), "./wb_sources") )
#    io = TestIo( os.path.join( os.path.dirname(__file__), "tests/data/wb_reset.log") )
    io = WebbrickIo('/dev/ttyUSB0')
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
        if targetfilename.endswith(".inc"):
            # these are files that need data translated into them.
            sourcefilename = os.path.join(os.getcwd(), "inc", path)
            self.translate_file( sourcefilename, targetfilename )

        # override so as to manage translation file single 
#        path = super(RequestHandler,self).translate_path(path)
        _log.debug( "translate_path %s -> %s", path, targetfilename)
        return targetfilename 

    def do_GET(self):
        if ".spi" in self.path:
            path = urllib.unquote(self.path)
            print path
            path,params = path.split('?',1)
            for param in params.split('&'):
                name,value = param.split('=',1)
                _log.info( "parameter %s : %s", name, value)
                if name == 'com':
                    print value
                    RequestHandler.io.write(value) # may need to do unescape.                    
            targetfilename = os.path.join(os.getcwd(), "www", path[1:])
            # read file for redirect headers
            # return redirect
            # content of spi file is a redirect

            with open(targetfilename,"r") as io:
                self.send_response(301)
                self.send_header('Location',io.read())
                self.end_headers()

#        return super(RequestHandler,self).do_GET(self)
        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

RequestHandler.extensions_map.update({
        '.inc': 'text/plain',
        '.spi': 'text/plain',
        })

SimpleHTTPServer.test(HandlerClass = RequestHandler)

