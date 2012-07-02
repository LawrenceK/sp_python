#
# Read contents of the web files used by siteplayer builder and substitute replacement strings
#
import os, os.path
import SimpleHTTPServer
# import SimpleHTTPRequestHandler, test

from process_sp_defs import Sp_objects
from values_dict import Sp_values

class RequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    sp_values = Sp_values(Sp_objects())

    def translate_file(self, source_filename, target_filename):
        with open(source_filename) as source:
            with open(target_filename, "w") as target:
                nline = source.read() % sp_values
                target.write(nline)

    def translate_path(self, path):
        path = path[1:]
        targetfilename = os.path.join(os.getcwd(), "www", path)
        print os.getcwd(), targetfilename
        if targetfilename.endswith(".inc"):
            # these are files that need data translated into them.
            sourcefilename = os.path.join(os.getcwd(), "inc", path)
            self.translate_file( sourcefilename, targetfilename )

        # override so as to manage translation file single 
#        path = super(RequestHandler,self).translate_path(path)
        return targetfilename 

SimpleHTTPServer.test(HandlerClass = RequestHandler)

