#
# Read contents of the web files used by siteplayer builder and substitute replacement strings
#

from operator import itemgetter
import re

class Sp_values(dict):
    # maintain a dictionary of the current values for sp objects
    def __init__(self,sp_objects):
        self.sp_objects = sp_objects.by_address
        for spobject in self.sp_objects:
            self[spobject.name] = spobject.value

    def update(self,address, len, raw_data):
        # identify updated values and update dict
        pass

