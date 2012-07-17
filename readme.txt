The plan is to generate a small server that will emulate the serial interface to/from a siteplayer
so that a webbrick can talk to it and interogate it. 

It will generate files that can be served by a webserver and deliver the existing 
webbrick user interface. 

The gotcha side is the commands coming from the UI that are sent to the webbrick pic
chip over the serial interface. Standard CGI?

May be best to use a simple python webserver that can handle the spi commands.

Thoughts:

The current spbinary uses a defintion file that generates the image
We compress the javascript.

For this use:
Do not compress javascript.
We need the current map of addresses in the data area, there names and there type/size.
So process the definition file:
to get names to type and size.
Process the current c header file to get addresses for each of them.
Generate as a single table

Future: Replace the use iof existing files by generating the table direct and create a C header file from it.

