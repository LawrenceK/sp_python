;
; These are definitions of objects to be used with the UDPsend
; Serial command or the UDPsend object location
;
; To send a UDP message to a specific computer on your local network:
;  set the UDPMAC address to the computer's ethernet adapter MAC address
;  set the UDPIP address to the computer's IP address
;
; To broadcast to many computers simultaneously:
;   set the UDPMAC addresses to all 0ffh's
;   set the UDPIP address the local network broadcast address
;   which is typically xxx.xxx.xxx.255
;
; To broadcast to all computers on all logical local networks:
;   set the UDPMAC addresses to all 0ffh's
;   set the UDPIP address to 255.255.255.255
;
; To send to a remote PC through a gateway:
;   set the MAC address to the gateway's MAC address
;   and the UDPIP address to the address of the remote machine
;

	org 2D0h
UDPMAC		dhex 0ffh
UDPMAC2		dhex 0ffh
UDPMAC3		dhex 0ffh
UDPMAC4		dhex 0ffh
UDPMAC5		dhex 0ffh
UDPMAC6		dhex 0ffh

;IP address in the format UDPIP.UDPIP2.UDPIP3.UDPIP4
UDPIP		db 0ffh
UDPIP2		db 0ffh
UDPIP3		db 0ffh
UDPIP4		db 0ffh

UDPPORT		dw 2552
UDPADDR		dw 0
UDPCOUNT	dw 16

