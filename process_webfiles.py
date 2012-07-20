#
# Read contents of the web files used by siteplayer builder and substitute replacement strings
#
import os, os.path
import re

# the purpose is to turn siteplyare markup into python string substitution
re1 = re.compile( "\^(\w+\^?)" )
def rewrite_ref(matchobj):
    return "%(" + matchobj.group(0).replace("^","") + ")s"

def parse_file(source_filename,target_filename):
    with open(source_filename) as source:
        with open(target_filename, "w") as target:
            nline = re1.sub( rewrite_ref, source.read() )
            target.write(nline)

def parse_spi_file(source_filename,target_filename):
    # rewrite file stripping everything other than loction header
    with open(source_filename) as source:
        with open(target_filename, "w") as target:
            for line in source.readlines():
                if "Location" in line:
                    target.write(line.split(":",1)[1].strip())

def parse_all(sourcedirectory):
    for filename in os.listdir(sourcedirectory):
        source_filename = os.path.join( sourcedirectory,filename)
        if filename.endswith(".inc"):
            target_filename = os.path.join( "./inc",filename)
        else:
            target_filename = os.path.join( "./www",filename)
        # if non substitute file copy.
        if filename.endswith(".spi"):
            parse_spi_file(source_filename,target_filename)
        else:
            parse_file(source_filename,target_filename)

def main():
    parse_all("./wb_sources/web55")
#    parse_file("./wb_sources/web55/Cfg.inc", "./inc/Cfg.inc")

main()

