;
;
;
;  WebBrick 5.5 Lower definitions
;
;
;
org 0h
; put low down all stuff that gets modified frequently

; Allow longer buffer due to serial interface requirements
$OutputOnly
UDPString	ds 32
;
$OutputOnly
LoginState   db  1

$OutputOnly
CmdError	db	0	; Response to last command
$OutputOnly
CmdSeq	        db	0	; Sequence number of last command

$OutputOnly
SPToD	        db	255	; Time of Day Concept, 255 is flag that SP has yet to be loaded.

$OutputOnly
DigIn		dw 0		; Digital Inputs

$OutputOnly
SPDigOutStatus	dw 0	; Digital Output status, allow for 16

; Clock
$OutputOnly
SPyear	    db	0   ; RTC year
$OutputOnly
SPmonth	    db	0   ; RTC month
$OutputOnly
SPdate	    db	0   ; RTC date
$OutputOnly
SPday	    db	0   ; RTC day
$OutputOnly
SPhour	db	0   ; RTC day
$OutputOnly
SPminute	db	0   ; RTC day
$OutputOnly
SPsecond	db	0   ; RTC day

;
; Top Bit is set if OneWire error then bits 0-4 are set if Temp sensor present.
;
$OutputOnly
OneWSts db	0		; One Wire Status 
;
;   Temperatures
;
$OutputOnly
SPTemp0         dw 0    ; degrees.decimal
$OutputOnly
SPTemp0Low	dw 0
$OutputOnly
SPTemp0Hi	dw 0
$OutputOnly
SPTemp1         dw 0    ; degrees.decimal
$OutputOnly
SPTemp1Low	dw 0
$OutputOnly
SPTemp1Hi	dw 0
$OutputOnly
SPTemp2         dw 0    ; degrees.decimal
$OutputOnly
SPTemp2Low	dw 0
$OutputOnly
SPTemp2Hi	dw 0
$OutputOnly
SPTemp3         dw 0    ; degrees.decimal
$OutputOnly
SPTemp3Low	dw 0
$OutputOnly
SPTemp3Hi	dw 0
$OutputOnly
SPTemp4         dw 0    ; degrees.decimal
$OutputOnly
SPTemp4Low	dw 0
$OutputOnly
SPTemp4Hi	dw 0

; Analogue out
$OutputOnly
AnOut0Value	db 0				; Its Value
$OutputOnly
AnOut1Value	db 0				; Its Value
$OutputOnly
AnOut2Value	db 0				; Its Value
$OutputOnly
AnOut3Value	db 0				; Its Value

; Analogue In
$OutputOnly
AnIn0Value	db 0				; Its Value
$OutputOnly
SPAnIn0Low	db 0
$OutputOnly
SPAnIn0Hi	db 0
$OutputOnly
AnIn1Value	db 0				; Its Value
$OutputOnly
SPAnIn1Low	db 0
$OutputOnly
SPAnIn1Hi	db 0
$OutputOnly
AnIn2Value	db 0				; Its Value
$OutputOnly
SPAnIn2Low	db 0
$OutputOnly
SPAnIn2Hi	db 0
$OutputOnly
AnIn3Value	db 0				; Its Value
$OutputOnly
SPAnIn3Low	db 0
$OutputOnly
SPAnIn3Hi	db 0

; Now relatively static configuration stuff
$OutputOnly
NodeName db	"Default012"	; node name

$OutputOnly
NodeNumber db FFh

; infra red address low 5 bits.
; Receive enabled bit 7
; Transmit enabled bit 6
$OutputOnly
InfraRed    db 1Dh

; Serial mode
; Bit 4-7 - mode
; bit 0-3 - data rate
$OutputOnly
SerialFlags    db 0

$OutputOnly
Rot0Step		db 2		; Value of RotStep

$OutputOnly
FadeRate		db 4		; Value of FadeRate

; Digital Input triggers
$OutputOnly
Dig0CfgB1 	db 0	; Default  
$OutputOnly
Dig0CfgB2	db 0	; Default
$OutputOnly
Dig0CfgB3	db 0	; Default
$OutputOnly
Dig0CfgB4	db 0	; Default
$OutputOnly
Dig0CfgB5	db 0	; Default

$OutputOnly
Dig1CfgB1 	db 0	; Default
$OutputOnly
Dig1CfgB2	db 0	; Default
$OutputOnly
Dig1CfgB3	db 0	; Default
$OutputOnly
Dig1CfgB4	db 0	; Default
$OutputOnly
Dig1CfgB5	db 0	; Default

$OutputOnly
Dig2CfgB1 	db 0	; Default
$OutputOnly
Dig2CfgB2	db 0	; Default
$OutputOnly
Dig2CfgB3	db 0	; Default
$OutputOnly
Dig2CfgB4	db 0	; Default
$OutputOnly
Dig2CfgB5	db 0	; Default

$OutputOnly
Dig3CfgB1 	db 0	; Default
$OutputOnly
Dig3CfgB2	db 0	; Default
$OutputOnly
Dig3CfgB3	db 0	; Default
$OutputOnly
Dig3CfgB4	db 0	; Default
$OutputOnly
Dig3CfgB5	db 0	; Default

$OutputOnly
Dig4CfgB1 	db 0	; Default 
$OutputOnly
Dig4CfgB2	db 0	; Default
$OutputOnly
Dig4CfgB3	db 0	; Default 
$OutputOnly
Dig4CfgB4	db 0	; Default
$OutputOnly
Dig4CfgB5	db 0	; Default

$OutputOnly
Dig5CfgB1 	db 0	; Default
$OutputOnly
Dig5CfgB2	db 0	; Default
$OutputOnly
Dig5CfgB3	db 0	; Default
$OutputOnly
Dig5CfgB4	db 0	; Default
$OutputOnly
Dig5CfgB5	db 0	; Default

$OutputOnly
Dig6CfgB1 	db 0	; Default
$OutputOnly
Dig6CfgB2	db 0	; Default
$OutputOnly
Dig6CfgB3	db 0	; Default
$OutputOnly
Dig6CfgB4	db 0	; Default
$OutputOnly
Dig6CfgB5	db 0	; Default

$OutputOnly
Dig7CfgB1 	db 0	; Default
$OutputOnly
Dig7CfgB2	db 0	; Default
$OutputOnly
Dig7CfgB3	db 0	; Default
$OutputOnly
Dig7CfgB4	db 0	; Default
$OutputOnly
Dig7CfgB5	db 0	; Default
;
; These are originally the Monitor inputs becoming a trigger input
;
$OutputOnly
Dig8CfgB1 	db 0	; Default
$OutputOnly
Dig8CfgB2	db 0	; Default
$OutputOnly
Dig8CfgB3	db 0	; Default
$OutputOnly
Dig8CfgB4	db 0	; Default
$OutputOnly
Dig8CfgB5	db 0	; Default
$OutputOnly
Dig9CfgB1 	db 0	; Default
$OutputOnly
Dig9CfgB2	db 0	; Default
$OutputOnly
Dig9CfgB3	db 0	; Default
$OutputOnly
Dig9CfgB4	db 0	; Default
$OutputOnly
Dig9CfgB5	db 0	; Default
$OutputOnly
Dig10CfgB1 	db 0	; Default
$OutputOnly
Dig10CfgB2	db 0	; Default
$OutputOnly
Dig10CfgB3	db 0	; Default
$OutputOnly
Dig10CfgB4	db 0	; Default
$OutputOnly
Dig10CfgB5	db 0	; Default
$OutputOnly
Dig11CfgB1 	db 0	; Default
$OutputOnly
Dig11CfgB2	db 0	; Default
$OutputOnly
Dig11CfgB3	db 0	; Default
$OutputOnly
Dig11CfgB4	db 0	; Default
$OutputOnly
Dig11CfgB5	db 0	; Default

; Temperature settings
$OutputOnly
Temp0Low	dw 0
$OutputOnly
Temp0LowB1	db 0
$OutputOnly
Temp0LowB2	db 0
$OutputOnly
Temp0LowB3	db 0
$OutputOnly
Temp0LowB4	db 0
$OutputOnly
Temp0Hi	    dw 0
$OutputOnly
Temp0HiB1	db 0
$OutputOnly
Temp0HiB2	db 0
$OutputOnly
Temp0HiB3	db 0
$OutputOnly
Temp0HiB4	db 0
$OutputOnly
Temp1Low	dw 0
$OutputOnly
Temp1LowB1	db 0
$OutputOnly
Temp1LowB2	db 0
$OutputOnly
Temp1LowB3	db 0
$OutputOnly
Temp1LowB4	db 0
$OutputOnly
Temp1Hi	    dw 0
$OutputOnly
Temp1HiB1	db 0
$OutputOnly
Temp1HiB2	db 0
$OutputOnly
Temp1HiB3	db 0
$OutputOnly
Temp1HiB4	db 0
$OutputOnly
Temp2Low	dw 0
$OutputOnly
Temp2LowB1	db 0
$OutputOnly
Temp2LowB2	db 0
$OutputOnly
Temp2LowB3	db 0
$OutputOnly
Temp2LowB4	db 0
$OutputOnly
Temp2Hi	    dw 0
$OutputOnly
Temp2HiB1	db 0
$OutputOnly
Temp2HiB2	db 0
$OutputOnly
Temp2HiB3	db 0
$OutputOnly
Temp2HiB4	db 0
$OutputOnly
Temp3Low	dw 0
$OutputOnly
Temp3LowB1	db 0
$OutputOnly
Temp3LowB2	db 0
$OutputOnly
Temp3LowB3	db 0
$OutputOnly
Temp3LowB4	db 0
$OutputOnly
Temp3Hi	    dw 0
$OutputOnly
Temp3HiB1	db 0
$OutputOnly
Temp3HiB2	db 0
$OutputOnly
Temp3HiB3	db 0
$OutputOnly
Temp3HiB4	db 0
$OutputOnly
Temp4Low	dw 0
$OutputOnly
Temp4LowB1	db 0
$OutputOnly
Temp4LowB2	db 0
$OutputOnly
Temp4LowB3	db 0
$OutputOnly
Temp4LowB4	db 0
$OutputOnly
Temp4Hi	    dw 0
$OutputOnly
Temp4HiB1	db 0
$OutputOnly
Temp4HiB2	db 0
$OutputOnly
Temp4HiB3	db 0
$OutputOnly
Temp4HiB4	db 0

; Analogue in
$OutputOnly
AnIn0Low	db 0
$OutputOnly
AnIn0LowB1	db 0
$OutputOnly
AnIn0LowB2	db 0
$OutputOnly
AnIn0LowB3	db 0
$OutputOnly
AnIn0LowB4	db 0
$OutputOnly
AnIn0Hi	    db 0
$OutputOnly
AnIn0HiB1	db 0
$OutputOnly
AnIn0HiB2	db 0
$OutputOnly
AnIn0HiB3	db 0
$OutputOnly
AnIn0HiB4	db 0
$OutputOnly
AnIn1Low	db 0
$OutputOnly
AnIn1LowB1	db 0
$OutputOnly
AnIn1LowB2	db 0
$OutputOnly
AnIn1LowB3	db 0
$OutputOnly
AnIn1LowB4	db 0
$OutputOnly
AnIn1Hi	    db 0
$OutputOnly
AnIn1HiB1	db 0
$OutputOnly
AnIn1HiB2	db 0
$OutputOnly
AnIn1HiB3	db 0
$OutputOnly
AnIn1HiB4	db 0
$OutputOnly
AnIn2Low	db 0
$OutputOnly
AnIn2LowB1	db 0
$OutputOnly
AnIn2LowB2	db 0
$OutputOnly
AnIn2LowB3	db 0
$OutputOnly
AnIn2LowB4	db 0
$OutputOnly
AnIn2Hi	    db 0
$OutputOnly
AnIn2HiB1	db 0
$OutputOnly
AnIn2HiB2	db 0
$OutputOnly
AnIn2HiB3	db 0
$OutputOnly
AnIn2HiB4	db 0
$OutputOnly
AnIn3Low	db 0
$OutputOnly
AnIn3LowB1	db 0
$OutputOnly
AnIn3LowB2	db 0
$OutputOnly
AnIn3LowB3	db 0
$OutputOnly
AnIn3LowB4	db 0
$OutputOnly
AnIn3Hi	    db 0
$OutputOnly
AnIn3HiB1	db 0
$OutputOnly
AnIn3HiB2	db 0
$OutputOnly
AnIn3HiB3	db 0
$OutputOnly
AnIn3HiB4	db 0

;
; Schedules.
$OutputOnly
Sch0Days    db 0
$OutputOnly
Sch0Hours 	db 0
$OutputOnly
Sch0Mins 	db 0
$OutputOnly
Sch0CfgB1	db 0
$OutputOnly
Sch0CfgB2	db 0
$OutputOnly
Sch0CfgB3	db 0
$OutputOnly
Sch0CfgB4	db 0

$OutputOnly
Sch1Days    db 0
$OutputOnly
Sch1Hours 	db 0
$OutputOnly
Sch1Mins 	db 0
$OutputOnly
Sch1CfgB1	db 0
$OutputOnly
Sch1CfgB2	db 0
$OutputOnly
Sch1CfgB3	db 0
$OutputOnly
Sch1CfgB4	db 0

$OutputOnly
Sch2Days    db 0
$OutputOnly
Sch2Hours 	db 0
$OutputOnly
Sch2Mins 	db 0
$OutputOnly
Sch2CfgB1	db 0
$OutputOnly
Sch2CfgB2	db 0
$OutputOnly
Sch2CfgB3	db 0
$OutputOnly
Sch2CfgB4	db 0

$OutputOnly
Sch3Days    db 0
$OutputOnly
Sch3Hours 	db 0
$OutputOnly
Sch3Mins 	db 0
$OutputOnly
Sch3CfgB1	db 0
$OutputOnly
Sch3CfgB2	db 0
$OutputOnly
Sch3CfgB3	db 0
$OutputOnly
Sch3CfgB4	db 0

$OutputOnly
Sch4Days    db 0
$OutputOnly
Sch4Hours 	db 0
$OutputOnly
Sch4Mins 	db 0
$OutputOnly
Sch4CfgB1	db 0
$OutputOnly
Sch4CfgB2	db 0
$OutputOnly
Sch4CfgB3	db 0
$OutputOnly
Sch4CfgB4	db 0

$OutputOnly
Sch5Days    db 0
$OutputOnly
Sch5Hours 	db 0
$OutputOnly
Sch5Mins 	db 0
$OutputOnly
Sch5CfgB1	db 0
$OutputOnly
Sch5CfgB2	db 0
$OutputOnly
Sch5CfgB3	db 0
$OutputOnly
Sch5CfgB4	db 0

$OutputOnly
Sch6Days    db 0
$OutputOnly
Sch6Hours 	db 0
$OutputOnly
Sch6Mins 	db 0
$OutputOnly
Sch6CfgB1	db 0
$OutputOnly
Sch6CfgB2	db 0
$OutputOnly
Sch6CfgB3	db 0
$OutputOnly
Sch6CfgB4	db 0

$OutputOnly
Sch7Days    db 0
$OutputOnly
Sch7Hours 	db 0
$OutputOnly
Sch7Mins 	db 0
$OutputOnly
Sch7CfgB1	db 0
$OutputOnly
Sch7CfgB2	db 0
$OutputOnly
Sch7CfgB3	db 0
$OutputOnly
Sch7CfgB4	db 0

$OutputOnly
Sch8Days    db 0
$OutputOnly
Sch8Hours 	db 0
$OutputOnly
Sch8Mins 	db 0
$OutputOnly
Sch8CfgB1	db 0
$OutputOnly
Sch8CfgB2	db 0
$OutputOnly
Sch8CfgB3	db 0
$OutputOnly
Sch8CfgB4	db 0

$OutputOnly
Sch9Days    db 0
$OutputOnly
Sch9Hours 	db 0
$OutputOnly
Sch9Mins 	db 0
$OutputOnly
Sch9CfgB1	db 0
$OutputOnly
Sch9CfgB2	db 0
$OutputOnly
Sch9CfgB3	db 0
$OutputOnly
Sch9CfgB4	db 0

$OutputOnly
Sch10Days    db 0
$OutputOnly
Sch10Hours 	db 0
$OutputOnly
Sch10Mins 	db 0
$OutputOnly
Sch10CfgB1	db 0
$OutputOnly
Sch10CfgB2	db 0
$OutputOnly
Sch10CfgB3	db 0
$OutputOnly
Sch10CfgB4	db 0

$OutputOnly
Sch11Days    db 0
$OutputOnly
Sch11Hours 	db 0
$OutputOnly
Sch11Mins 	db 0
$OutputOnly
Sch11CfgB1	db 0
$OutputOnly
Sch11CfgB2	db 0
$OutputOnly
Sch11CfgB3	db 0
$OutputOnly
Sch11CfgB4	db 0

$OutputOnly
Sch12Days    db 0
$OutputOnly
Sch12Hours 	db 0
$OutputOnly
Sch12Mins 	db 0
$OutputOnly
Sch12CfgB1	db 0
$OutputOnly
Sch12CfgB2	db 0
$OutputOnly
Sch12CfgB3	db 0
$OutputOnly
Sch12CfgB4	db 0

$OutputOnly
Sch13Days    db 0
$OutputOnly
Sch13Hours 	db 0
$OutputOnly
Sch13Mins 	db 0
$OutputOnly
Sch13CfgB1	db 0
$OutputOnly
Sch13CfgB2	db 0
$OutputOnly
Sch13CfgB3	db 0
$OutputOnly
Sch13CfgB4	db 0

$OutputOnly
Sch14Days    db 0
$OutputOnly
Sch14Hours 	db 0
$OutputOnly
Sch14Mins 	db 0
$OutputOnly
Sch14CfgB1	db 0
$OutputOnly
Sch14CfgB2	db 0
$OutputOnly
Sch14CfgB3	db 0
$OutputOnly
Sch14CfgB4	db 0

$OutputOnly
Sch15Days    db 0
$OutputOnly
Sch15Hours 	db 0
$OutputOnly
Sch15Mins 	db 0
$OutputOnly
Sch15CfgB1	db 0
$OutputOnly
Sch15CfgB2	db 0
$OutputOnly
Sch15CfgB3	db 0
$OutputOnly
Sch15CfgB4	db 0

; Digital Input Names
$OutputOnly
Dig0Name 	db "NotS1_DI"
$OutputOnly
Dig1Name 	db "NotS2_DI"
$OutputOnly
Dig2Name 	db "NotS3_DI"
$OutputOnly
Dig3Name 	db "Nots4_DI"
$OutputOnly
Dig4Name 	db "NotS5_DI"
$OutputOnly
Dig5Name 	db "NotS6_DI"
$OutputOnly
Dig6Name 	db "NotS7_DI"
$OutputOnly
Dig7Name 	db "NotS8_DI"
; Keep these running on from Dig In names
$OutputOnly
Dig8Name		db "NotS9_DI"   ; Its Name
$OutputOnly
Dig9Name		db "NotS10DI"	; Its Name
$OutputOnly
Dig10Name		db "NotS11DI"	; Its Name
$OutputOnly
Dig11Name		db "NotS12DI"   ; Its Name

; If dig out names are moved fom being after digital in then DInNameCount will need correcting.
; Digital output Names
$OutputOnly
DigOut0Name	db "NotS1_D0"	; Its name
$OutputOnly
DigOut1Name	db "NotS2_D0"	; Its name
$OutputOnly
DigOut2Name	db "NotS3_D0"	; Its name
$OutputOnly
DigOut3Name	db "NotS4_D0"	; Its name
$OutputOnly
DigOut4Name	db "NotS5_D0"	; Its name
$OutputOnly
DigOut5Name	db "NotS6_D0"	; Its name
$OutputOnly
DigOut6Name	db "NotS7_D0"	; Its name
$OutputOnly
DigOut7Name	db "NotS8_D0"	; Its name

;
; Names for Analogue inputs
; 8 characters
;
$OutputOnly
AnIn0Name	db "NotS1_AI"
$OutputOnly
AnIn1Name	db "NotS2_AI"
$OutputOnly
AnIn2Name	db "NotS3_AI"
$OutputOnly
AnIn3Name	db "NotS4_AI"

;
; Names for Analogue outputs
; 8 characters
;
$OutputOnly
AnOut0Name	db "NotS1_AO"
$OutputOnly
AnOut1Name	db "NotS2_AO"
$OutputOnly
AnOut2Name	db "NotS3_AO"
$OutputOnly
AnOut3Name	db "NotS4_AO"

;
; Names for temperatures
; 8 characters
;
$OutputOnly
Temp0Name	db "NotS1_CT"
$OutputOnly
Temp1Name	db "NotS2_CT"
$OutputOnly
Temp2Name	db "NotS3_CT"
$OutputOnly
Temp3Name	db "NotS4_CT"
$OutputOnly
Temp4Name	db "NotS5_CT"

; Scene setting
$OutputOnly
Scene0DigMask   db  0
$OutputOnly
Scene0DigState  db  0
$OutputOnly
Scene0AnMask    db  0
$OutputOnly
Scene0AnState   dw  0
$OutputOnly
Scene1DigMask   db  0
$OutputOnly
Scene1DigState  db  0
$OutputOnly
Scene1AnMask    db  0
$OutputOnly
Scene1AnState   dw  0
$OutputOnly
Scene2DigMask   db  0
$OutputOnly
Scene2DigState  db  0
$OutputOnly
Scene2AnMask    db  0
$OutputOnly
Scene2AnState   dw  0
$OutputOnly
Scene3DigMask   db  0
$OutputOnly
Scene3DigState  db  0
$OutputOnly
Scene3AnMask    db  0
$OutputOnly
Scene3AnState   dw  0
$OutputOnly
Scene4DigMask   db  0
$OutputOnly
Scene4DigState  db  0
$OutputOnly
Scene4AnMask    db  0
$OutputOnly
Scene4AnState   dw  0
$OutputOnly
Scene5DigMask   db  0
$OutputOnly
Scene5DigState  db  0
$OutputOnly
Scene5AnMask    db  0
$OutputOnly
Scene5AnState   dw  0
$OutputOnly
Scene6DigMask   db  0
$OutputOnly
Scene6DigState  db  0
$OutputOnly
Scene6AnMask    db  0
$OutputOnly
Scene6AnState   dw  0
$OutputOnly
Scene7DigMask   db  0
$OutputOnly
Scene7DigState  db  0
$OutputOnly
Scene7AnMask    db  0
$OutputOnly
Scene7AnState   dw  0
$OutputOnly
Scene8DigMask   db  0
$OutputOnly
Scene8DigState  db  0
$OutputOnly
Scene8AnMask    db  0
$OutputOnly
Scene8AnState   dw  0
$OutputOnly
Scene9DigMask   db  0
$OutputOnly
Scene9DigState  db  0
$OutputOnly
Scene9AnMask    db  0
$OutputOnly
Scene9AnState   dw  0
$OutputOnly
Scene10DigMask   db  0
$OutputOnly
Scene10DigState  db  0
$OutputOnly
Scene10AnMask    db  0
$OutputOnly
Scene10AnState   dw  0
$OutputOnly
Scene11DigMask   db  0
$OutputOnly
Scene11DigState  db  0
$OutputOnly
Scene11AnMask    db  0
$OutputOnly
Scene11AnState   dw  0

; these provide mapping from an output channel to a mimic number
$OutputOnly
MimicsDigOut   dd  12345678h
$OutputOnly
MimicsAnOut   dw  0000h
$OutputOnly
MimicsLow   db  0
$OutputOnly
MimicsHigh   db  0
$OutputOnly
MimicFadeRate   db  0
; Mimic Control
; Bit 7 - Low/High (Nominal 5V/12V but circa 4V/10.5V)
$OutputOnly
MimicFlags    db 0
;

; not stored in the PIC EEPROM
;
; Software versrion.
$OutputOnly
SwVerMajor	db  0
$OutputOnly
SwVerMinor	db  0
$OutputOnly
SwVerBuild	dw  0

; Marker for end of Siteplayer objects.
$OutputOnly
SPEnd	db 0

; We now have a block of 32 bytes that can be bit addressed
; a feature we do not use.
org 2E0h

; Dwell values
$OutputOnly
Dw0	dw	0	; Default to 0 seconds
$OutputOnly
Dw1	dw	0	; Default to 0 seconds
$OutputOnly
Dw2	dw	0	; Default to 0 seconds
$OutputOnly
Dw3	dw	0	; Default to 0 seconds
$OutputOnly
Dw4	dw	0	; Default to 0 seconds
$OutputOnly
Dw5	dw	0	; Default to 0 seconds
$OutputOnly
Dw6	dw	0	; Default to 0 seconds
$OutputOnly
Dw7	dw	0	; Default to 0 seconds

$OutputOnly
Sp0		db 0		; Set Point value
$OutputOnly
Sp1		db 0		; Set Point value
$OutputOnly
Sp2		db 0		; Set Point value
$OutputOnly
Sp3		db 0		; Set Point value
$OutputOnly
Sp4		db 0		; Set Point value
$OutputOnly
Sp5		db 0		; Set Point value
$OutputOnly
Sp6		db 0		; Set Point value
$OutputOnly
Sp7		db 0		; Set Point value
;$OutputOnly
;Sp8		db 0		; Set Point value
;$OutputOnly
;Sp9		db 0		; Set Point value
;$OutputOnly
;Sp10		db 0		; Set Point value
;$OutputOnly
;Sp11		db 0		; Set Point value
;$OutputOnly
;Sp12		db 0		; Set Point value
;$OutputOnly
;Sp13		db 0		; Set Point value
;$OutputOnly
;Sp14		db 0		; Set Point value
;$OutputOnly
;Sp15		db 0		; Set Point value
