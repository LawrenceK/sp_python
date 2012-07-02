// Misc
OpState=^SPToD^;
LSt=^LoginState^;
CmdError=^CmdError^;

// Time
year=^SPyear^;month=^SPmonth^;date=^SPdate^;day=^SPday^;
hour=^SPhour^;minute=^SPminute^;second=^SPsecond^;

RotStep=^Rot0Step;
FadeRate=^FadeRate^;
NodeNumber=^NodeNumber^;NodeName="^NodeName^";

// Infra Red
infrared=^InfraRed;

// Serial 
SerialFlags = ^SerialFlags;

// Mimics 
MimicFlags = ^MimicFlags;

// Temperatures/OneWire
TmV=new Array(^SPTemp0^,^SPTemp1^,^SPTemp2^,^SPTemp3^,^SPTemp4^);OWSts=^OneWSts^;

//Analogue Outs
AOv=new Array(^AnOut0Value^,^AnOut1Value^,^AnOut2Value^,^AnOut3Value^);
//Analogue In
AIv=new Array(^AnIn0Value^,^AnIn1Value^,^AnIn2Value^,^AnIn3Value^);

//Digital inputs and outputs
DIs=^DigIn;DOs=^SPDigOutStatus;

// Dwells
DwV=new Array(^Dw0^,^Dw1^,^Dw2^,^Dw3^,^Dw4^,^Dw5^,^Dw6^,^Dw7^);
// SetPoints
SpV=new Array(^Sp0^,^Sp1^,^Sp2^,^Sp3^,^Sp4^,^Sp5^,^Sp6^,^Sp7^);

// Trigger details
// Dig Inputs
DiB1=new Array(^Dig0CfgB1^,^Dig1CfgB1^,^Dig2CfgB1^,^Dig3CfgB1^,^Dig4CfgB1^,^Dig5CfgB1^,^Dig6CfgB1^,^Dig7CfgB1^,^Dig8CfgB1^,^Dig9CfgB1^,^Dig10CfgB1^,^Dig11CfgB1^); 
DiB2=new Array(^Dig0CfgB2^,^Dig1CfgB2^,^Dig2CfgB2^,^Dig3CfgB2^,^Dig4CfgB2^,^Dig5CfgB2^,^Dig6CfgB2^,^Dig7CfgB2^,^Dig8CfgB2^,^Dig9CfgB2^,^Dig10CfgB2^,^Dig11CfgB2^); 
DiB3=new Array(^Dig0CfgB3^,^Dig1CfgB3^,^Dig2CfgB3^,^Dig3CfgB3^,^Dig4CfgB3^,^Dig5CfgB3^,^Dig6CfgB3^,^Dig7CfgB3^,^Dig8CfgB3^,^Dig9CfgB3^,^Dig10CfgB3^,^Dig11CfgB3^); 
DiB4=new Array(^Dig0CfgB4^,^Dig1CfgB4^,^Dig2CfgB4^,^Dig3CfgB4^,^Dig4CfgB4^,^Dig5CfgB4^,^Dig6CfgB4^,^Dig7CfgB4^,^Dig8CfgB4^,^Dig9CfgB4^,^Dig10CfgB4^,^Dig11CfgB4^); 
DiB5=new Array(^Dig0CfgB5^,^Dig1CfgB5^,^Dig2CfgB5^,^Dig3CfgB5^,^Dig4CfgB5^,^Dig5CfgB5^,^Dig6CfgB5^,^Dig7CfgB5^,^Dig8CfgB5^,^Dig9CfgB5^,^Dig10CfgB5^,^Dig11CfgB5^); 


// Names
// Analogue Outs
AONm=new Array("^AnOut0Name","^AnOut1Name","^AnOut2Name","^AnOut3Name");
// Analogue Inputs
AINm=new Array("^AnIn0Name","^AnIn1Name","^AnIn2Name","^AnIn3Name");
// Digital
DINm=new Array("^Dig0Name","^Dig1Name","^Dig2Name","^Dig3Name","^Dig4Name","^Dig5Name","^Dig6Name","^Dig7Name","^Dig8Name","^Dig9Name","^Dig10Name","^Dig11Name");
DONm=new Array("^DigOut0Name","^DigOut1Name","^DigOut2Name","^DigOut3Name","^DigOut4Name","^DigOut5Name","^DigOut6Name","^DigOut7Name");
TNm=new Array("^Temp0Name","^Temp1Name","^Temp2Name","^Temp3Name","^Temp4Name");

//  Stuff that is used for advanced diagnostics.
SwVersion="^SwVerMajor^.^SwVerMinor^.^SwVerBuild^";
// My IP Address
IP0=^SPIP0;IP1=^SPIP1;IP2=^SPIP2;IP3=^SPIP3;
SerialNr="^SPMac0^^SPMac1^^SPMac2^^SPMac3^^SPMac4^^SPMac5";
