;
;
;
;  Siteplayer hard configured details
;
;
;
;
; Definitions for SitePlayer standalone direct port I/O
; to use these items they can be viewed by doing a ^objectname in your HTML file
; or they can be input by making an object of the same name in a form
;
; Some objects cannot be viewed
;
;
	org 0FF19h
COM	ds 128			;serial port output (only takes up really one byte)

	org 0FF1Ah
$OutputOnly
Baud	dw 0		;baud rate counter register (WORD) 

	org 0FF1Eh
;$OutputOnly
UDPsend	db 0			;flag to send out a UDP message

;	org 0FF1Fh
;$OutputOnly
;HalfSec	db 0			;half second (0.50135) down counter stops when 0

	org 0FF20h
;$OutputOnly
; if this is not 1 then we caannot send commands to a webbrick over UDP.
SPUDPrcvr	db 0			;enable UDP receives or not

;
;  MAC and IP Address in $OutputOnly format
;
org 0FFE0h
$OutputOnly
SPMac0 dhex 0	; Mac0 address		
$OutputOnly
SPMac1 dhex 0	; Mac1 address		
$OutputOnly
SPMac2 dhex 0	; Mac2 address		
$OutputOnly
SPMac3 dhex 0	; Mac3 address
$OutputOnly
SPMac4 dhex 0	; Mac4 address
$OutputOnly
SPMac5 dhex 0	; Mac5 address

org 0FFE6h
$OutputOnly
SPIP0 db 0	; IP0 address		
$OutputOnly
SPIP1 db 0	; IP1 address		
$OutputOnly
SPIP2 db 0	; IP2 address		
$OutputOnly
SPIP3 db 0	; IP3 address
