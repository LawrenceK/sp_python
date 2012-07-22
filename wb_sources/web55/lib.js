/* Copyright o2m8 2005 */
//
//
//  WebBrick library
//
//  Notes
//  i) There are a whole load of very short functions at the top which help to write
//      document elements, e.g. taables and forms. These help to reduce code size.
//  ii) very short names are used occasionally, e.g. i for a loop index.
//  iii) It is intended to process this with sed before loading siteplayer, this will
//      remove comments that start at beginning of line or have only whitespace between start and them.
//  iv) No siteplayer substition is done in this file so that it can be cached by the browser.
//  v) spi files used are idx.spi, cfg.spi, adv.spi, hid.spi (a hidden direct command entry page)
//
//  Constant string arrays
//
ToDStrs = new Array ("Commands Disabled", "Startup", "Normal Operation", "Quiescent Operation") ;
// AStrs = new Array ("", "Alarm") ;
// OneWStrs = new Array ("No Sensors Found", "Bus Good, Sensor Found", "Bus Good, Reading Good", "Bus Good, Software Error", "Bus Bad, Held Low") ;
ChannelTypeStrs1 = new Array ("Digital", "Scene", "Analogue", "Temperature", "InfraRed", "X-Dmx") ;
// Keep Dwell off and on as last entries, update DwMap and CC constants
ActionStrs = new Array ("None", "Off", "On", "Momentary", "Toggle", "Dwell-Always", "Dwell-Cancel", "Next", "Prev", "Set Low Threshold", "Set High Threshold", "Adjust Low Threshold", "Adjust High Threshold", "Send Ir", "Up", "Down", "Set DMX", "Count", "Dwell-On", "Dwell-Off" );
// NOTE the original order is retained so the command interface does not change just gets extended.
//  0 - None
//  1 - Off
//  2 - On
//  3 - Momentary
//  4 - Toggle
//  5 - Dwell-Always
//  6 - Dwell-Cancel
//  7 - Next
//  8 - Prev
//  9 - Set Low Threshold
//  10 - Set High Threshold
//  11 - Adjust Low Threshold
//  12 - Adjust High Threshold
//  13 - Send Ir
//  14 - Up
//  15 - Down
//  16 - Set DMX
//  17 - Count
//  18 - Dwell-On
//  19 - Dwell-Off
//
CC_NONE = 0;
CC_DWELL_ALWAYS = 5;
CC_DWELL_CANCEL = 6;
CC_SETLO = 9;
CC_ADJHI = 12;
CC_IR = 13;
CC_DMX = 16;
CC_DWELL_ON = 18;
CC_DWELL_OFF = 19;
DwMap = new Array(CC_DWELL_ON,CC_DWELL_OFF,CC_DWELL_CANCEL,CC_DWELL_ALWAYS);
// problem code from PIC has different encoding to the command codes inbound
B1_DWELL_ALWAYS = 0x78;
B1_DWELL_CANCEL = 0x70;
B1_DWELL_ON = 0x60;
B1_DWELL_OFF = 0x68;

UDPRemStrs = new Array ("None", "Send") ;
DayStrs = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday") ;
ScNm = new Array ();
IrNm = new Array ();
DmNm = new Array ();

//
//  Configuration constants.
//
NrDigInputs = 12;
NrDigOutputs = 8;
//NrDigMonInputs = 4;
NrAnInputs = 4;
NrAnOutputs = 4;
NrTemps = 5;
NrDmxChannels = 8;
NrDwells = 8;
NrSetPoints = 8;
NrScheduleEntries = 16;
NrSceneEntries = 12;

var oldAction = 0;
//
//  *** A whole load of short form writes to document.
//
// General stuff
//  If it starts f its <form
//  If it starts fi its <input
//  If it starts tb its <table
//  If starts tr its a <tr
//  if it starts td its a <td, normally complete table data element.
//
// Short string for document.write
function dw(s){document.write(s + "\n");}

function hd(s)
{
    dw("<h2>"+s+"</h2>");
}

function br(){dw ("<br />");}

function tbs()
{
    dw ("<table>");
}

function tbc(c)
{
    dw ("<table class="+c+">");
}

function clkStrAlt(t,l,c)
{
    return " class=\""+c+"\" title=\""+t+"\" onClick=\"document.location='"+l+"'\" onMouseOver=\"this.className='over';\" onMouseOut=\"this.className='"+c+"';\" ";
}

function clkStr(t,l)
{
    return clkStrAlt(t,l,"clickable");
}

function tbclk(t,l)
{
    if (LSt > 1)
    {
        dw("<table " + clkStr("Click to " + t,l) + ">");
    }
    else
    {
        tbs();
    }
}

function tbe()
{
    dw ("</table>");
}

// Short string for tablerow.
function trs()
{
    dw("<tr>");
}
function tre()
{
    dw("</tr>");
}

function trclk(t,l)
{
    if (LSt > 1)
    {
        dw("<tr " + clkStr("Click to "+ t,l) + ">");
    }
    else
    {
        trs();
    }
}

function ud(s)
{
    if (s == undefined) return "&nbsp;";
    return s;
}

// Short string for tabledata.
function td(s)
{
    dw("<td>"+ud(s)+"</td>");
}
function td2(s)
{
    dw("<td colspan=\"2\">"+ud(s)+"</td>");
}
function td3(s)
{
    dw("<td colspan=\"3\">"+ud(s)+"</td>");
}

function tdhs(s)
{
    dw("<th class=\"narrow\">"+ud(s)+"</th>");
}

function tdhn(s)
{
    dw("<th class=\"name\">"+ud(s)+"</th>");
}

function tdh(s)
{
    dw("<th>"+ud(s)+"</th>");
}

// Short string for tabledata with named class.
function tdclass(s,c)
{
    dw("<td class="+c+">"+ud(s)+"</td>");
}

function tdn(s)
{
    tdclass(s, "name");
}

function tdclk(s,t,l)
{
    dw("<td " + clkStr("Click to "+ t,l) + ">"+ud(s)+"</td>");
}

function mi(s,t,l)
{
    dw("<td " + clkStrAlt(t,l,"menu") + ">"+ud(s)+"</td>");
}

function td2clk(s,t,l)
{
    s = ud(s);
    if (LSt > 1)
    {
        dw("<td colspan=2 " + clkStr("Click to "+ t,l) + ">"+s+"</td>");
    }
    else
    {
        dw("<td colspan=2>"+s+"</td>");
    }
}

function tdhclk(s,t,l)
{
    s = ud(s);
    if (LSt > 1)
    {
        dw("<th " + clkStr("Click to "+ t,l) + ">"+s+"</th>");
    }
    else
    {
        tdh(s);
    }
}

// A whole load of form entry stuff.
// Aimed to enable including in a table
// therefore labels used.
function fs(a)
{
    dw("<form method=\"get\" action=\""+a+"\">");
    tbc("form");
    fih(":");   // Ensure no garbage
}

//function fs2(a, sA)
//{
//    dw("<form onsubmit=\""+sA+";\" >");
//    tbc("form");
//    fih(":");   // Ensure no garbage
//}

function fex(txt)
{
    fih(":");
    if (txt != "")
    {
        br();
        trs();
        td();
        ftd("<input class=\"clickable\" type=\"submit\" value=\""+txt+"\"onMouseOver=\"this.className='over';\" onMouseOut=\"this.className='clickable';\" />");
        tre();
    }
    tbe();
    dw("</form>");
}

function fe2(sA)
{
    fih(":");
    br();
    trs();
    td();
    ftd("<input class=\"clickable\" type=\"button\" value=\"Save\"onMouseOver=\"this.className='over';\" onMouseOut=\"this.className='clickable';\" onClick=\""+sA+"\" />");
    tre();
    tbe();
    dw("</form>");
}

function fe()
{
    fex("Save");
}

function fls(lbl, id)
{
    trs();
    dw("<td class=formlabel><label for=\""+id+"\">"+lbl+"</label></td>");
}

function fle()
{
    tre();
}

function fss(lbl, id)
{
    fih(";");
    fssx(lbl, id);
}

// Optional changeAction (cA)
function fssx(lbl, id, cA, dA)
{
    fls(lbl, id);
    dw("<td class=formfield><select name=\"com\" id=\""+id+"\"");
    if ((cA != undefined) && (cA != null) && (cA.length > 0))
    {
        dw(" onChange=\""+ cA +";\"");
    }
    if ((dA != undefined)&&dA)
    {
        dw(" disabled");
    }
    dw(">");
}

function fse()
{
	dw("</select></td>");
	fle();
}

function fso(val,txt,sb)
{
    if (sb == true)
    {
	    dw("<option value=\""+val+"\" selected>"+txt+"</option>");
    }
    else
    {
	    dw("<option value=\""+val+"\">"+txt+"</option>");
    }
}

function fih(txt)
{
    dw("<input type=\"hidden\" name=\"com\" value=\""+txt+"\"/>");
}

function ftd(s)
{
    dw("<td class=formfield>"+s+"</td>");
}

function fitx(lbl, id, val, sz)
{
    fls(lbl, id);
    ftd("<input type=\"text\" name=\"com\" id=\""+id+"\" size=\""+sz+"\" value=\""+val+"\"/>");
    fle();
}

function fit(lbl, id, val, sz)
{
    fih(";");
    fitx(lbl, id, val, sz);
}

// place holder fin Form Input Number, decimal possible
function fin(lbl, id, val, sz)
{
    fih(";");
    fitx(lbl, id, val, sz);
}

function fic(lbl, val, sel)
{
    fls(lbl, lbl);
    if (sel)
    {
        ftd("<input type=\"checkbox\" checked name=\"com\" id=\""+lbl+"\" value=\""+val+"\"/>");
    }
    else
    {
        ftd("<input type=\"checkbox\" name=\"com\" id=\""+lbl+"\" value=\""+val+"\"/>");
    }
    fle();
}

function fip(lbl, id, val, sz)
{
    fih(";");
    fls(lbl, id);
    ftd("<input type=\"password\" name=\"com\" id=\""+id+"\" size=\""+sz+"\" value=\""+val+"\"/>");
    fle();
}

function fib(lbl, act)
{
    td("<input type=\"button\" " + clkStr(lbl, act) + "name=\"com\" id=\""+lbl+"\" value=\""+lbl+"\"/>");
}

function UrlParam(name)
{
    var s = document.location.search;
    var i = s.indexOf('?');   // locate start of parameters
    if (i == -1)
    {
        s = document.URL;
        i = s.indexOf('?');   // locate start of parameters
    }
    if (i != -1)
    {
        var ps = s.substring(i+1, s.length).split("&");
        for (i = 0 ; i < ps.length; ++i)
        {
            if (ps[i].substring(0, name.length) == name) // match name
            {
                return ps[i].substring(ps[i].indexOf('=') + 1);
            }
        }
    }
}

function UrlChn()
{
    return parseInt(UrlParam("chn"));
}

function UrlThreshold()
{
    return UrlParam("th");
}

function NumPad(i)
{
    if (i < 10)
    {
        return "0"+i;
    }
    return i;
}

//
// standard preample for pages after <BODY>
//
function Preamble(st)
{
    var i;
    // fil IR channel names
    for ( i = 0; i < 64; ++i)
    {
        IrNm[i] = "IR " + i;
    }
    for ( i = 0; i < NrSceneEntries; ++i)
    {
        ScNm[i] = "Scene " + i;
    }
    for ( i = 0; i < NrDmxChannels; ++i)
    {
        // No Dmx 0
        DmNm[i] = "Dmx " + (i+1);
    }

    dw("<link rel=\"stylesheet\" href=\"webbrick.css\" type=\"text/css\">");

    dw("<title>WebBrick Home for : "+NodeName+"</title>");

    if ( (CmdError > 0) && (CmdError != 6) )
    {
        tbc("alarm");
    }
    else
    {
        tbs();
    }
    td("<a href=index.htm><img src='wb_logo.jpg' align='left' class='image' border='0'/></a>");
    if (NodeNumber == 0)
    { 
	td("UnConfigured<BR>Node");
    }
    else
    { 
        td(NodeName + "<BR>"+ NodeNumber);
    }
    td(DayStrs[day] + "<BR>" + NumPad(hour) +":"+NumPad(minute)+":"+NumPad(second));
    if (LSt > 1)
    {
        td("Logged In <BR>"+ToDStrs[OpState]);
    }
    else
    {
        td(ToDStrs[OpState]);
    }
    if (CmdError > 0)
    {
        td("Cmd Error<BR>"+CmdError);
    }
    else
    {
        td("<a href=http://reg.webbrick.co.uk/gotowb?Nr="+SerialNr+"><img src='logo.jpg' align='right' border='0'/></a>");
    }
    tbe();

// Menu
    tbs();
    tdh( "Menu");
    mi( "Home", "", "index.htm");
    mi("Schedules","","cfg.htm?page=sch");
    mi("Scenes","","cfg.htm?page=sce");
    mi("Configuration","","cfg.htm?page=con");
    mi("Advanced","","cfg.htm?page=adv");
    mi("Login","","cfg.htm?page=log");
    if (LSt > 1)
    {
        mi("Configure Server","","cfg.htm?page=srv");
        mi("Manual commands","","cfg.htm?page=man");
        mi("Xml Status", "", "wbstatus.xml");
        mi("Xml Configuration","","wbcfg.xml");
    }
    tbe();
    if (st != "")
    {
        hd(st);
    }
    dw("<div id=content>");
}

function SetPointStr(idx)
{
    return (SpV[idx] + "%") ;
}

function AnToImageBar(InVal)
{
    if (InVal > 0)
        return "<img src=\"orange.gif\" width="+Math.round(InVal)+" height=10 hspace=1> " + InVal +"%";
    return InVal +"%";
}

function TempToTenths(val)
{
    return Math.round((val/16)*10) / 10; // get into tenths degree for display
}

function TempToImageBar(idx)
{
    var res;
    var t = TempToTenths(TmV[idx]);
    if (t < 0)
    {
        res = "<img src=\"red.gif\" width="+Math.round((t+50)/2)+" height=10 hspace=1>"
    }
    else
    {
        res = "<img src=\"green.gif\" width=25 height=10 hspace=1>"
            + "<img src=\"orange.gif\" width="+Math.round(t/2)+" height=10 hspace=1>";
    }
    return res + t + "\&ordm;C";
}

//
// Create a form to change name texts.
//  Must provide the base command to be sent to PIC chip
//  and the count of entries.
function DoNames(hd, cmd, cur)
{
    Preamble("Name "+hd+"s");
    fs("cfg.spi");
    var i;
    var l = cur.length;
    if (l>12) l = 12;   // limit to 12 names 
    for (i = 0; i < l; i++)
    {
		fih(""+cmd+i);
		fit(hd+" "+i, "N"+i, cur[i], 12)
		fih(":");
    }
    fe();
}

function actLocal( act )
{
    act = act & 0x7F;   // loose UDP
    if ( act < 32 )
        return act;
    if ( act < 64 )
        // group 1
        return CC_NONE;
    if ( act < 96 )
        // group 2
        return CC_NONE;
    // else it is a dwell.
    return DwMap[(act >> 3) & 0x03];
}

function isDwell(ac)
{
    return (ac == CC_DWELL_ALWAYS)
        || (ac == CC_DWELL_CANCEL)
        || (ac == CC_DWELL_ON)
        || (ac == CC_DWELL_OFF);
}

function TrigActions(b1, b2, b3, b4)
{
// LPK??? This will need changing to get it looking better,
    Ac = actLocal(b1);
    Ur = (b1 >> 7);
    TT = (b2 >> 6) & 0x03;

    if (TT > 1) 
    {
        TT = 2;  // analogue
        Tc = ((b2 >> 4) & 0x07);
        Sp = (b2 & 0x0F);
    }
    else
    {
        Tc = (b2 & 0x0F);   // Could be Scene number as well
        Sp = 0;
        // special cases of Actions that change target type.
        if ( Ac == CC_IR )  // Send Ir
        {
            TT = 4; // fiddle to be IR
            Tc = (b2 & 0x3F);   // IR command number
        }
        else
        if ( Ac == CC_DMX )  // Send Dmx
        {
            TT = 5; // fiddle to be Dmx
            Tc = (b2 & 0x3F);   // Dmx channel number
        }
        else
        if ( ( Ac >= CC_SETLO ) && ( Ac <= CC_ADJHI) ) // threshold adjustment actions
        {
            TT = 3; // fiddle to be temperature
        }
    }

    td(ActionStrs[Ac]);
    if (isDwell(Ac))
    {
        td(DisDwell(b1 & 0x07));
    }
    else
    {
        td("&nbsp;");
    }

    if (Ac != CC_NONE)    // action None
    {
        td(ChannelTypeStrs1[TT]);
        if (TT == 0)
        {
            td(DONm[Tc]);
            td("&nbsp;");
        }
        else
        if (TT == 1)
        {
            td(ScNm[Tc]);
            td("&nbsp;");
        }
        else
        if (TT == 2)
        {
            td(AONm[Tc]);
            if ( Ac >= CC_SETLO )  // threshold adjustment actions
            {
                td("&nbsp;");
            }
            else
            {
                td(SetPointStr(Sp));    // TODO Suppress when action is adjust thresholds
            }
        }
        else
        if (TT == 3)
        {
            td(TNm[Tc]);
            td("&nbsp;");
        }
        else
        if (TT == 4)
        {
            td(IrNm[Tc]);
            td("&nbsp;");
        }
        else
        if (TT == 5)
        {
            td(DmNm[Tc]);
            td("&nbsp;");
        }
    }
    else
    {
        td("&nbsp;");
        td("&nbsp;");
        td("&nbsp;");
    }

    td(UDPRemStrs[Ur]);
    if (b3 != undefined)
    {
        if (b3 != 0)
        {
            td(b3);
        }
        else
        {
            td("&nbsp;");
        }
    }
}

function TrigHeaders()
{
    tdh("Action");
    tdh("Dwell");
    tdh("Output Type");
    tdh("Output Channel");
    tdh("Set Point");
    tdh("UDP Type");
    tdh("Value");
}

function UpdateSelectElement(elem, arr)
{
    var i;
    elem.options.length = 0;
    for (i = 0; i < arr.length; ++i)
    {
        var elOptNew = document.createElement('option');
        elOptNew.text = arr[i];
        elOptNew.value = i;
        try 
        {
            elem.add(elOptNew, null);
        }
        catch(ex) 
        {
            elem.add(elOptNew); // IE only
        }
    }
}

// Locate fss("Output Type", "typ"); and action Type
// and select and array of names to fill Output Channel with.
function UpdateOutputChannels()
{
    typ = document.getElementById('typ').value; // D,A,S,T,X
    chnList = document.getElementById("chn");
    document.getElementById("sp").disabled = (typ != "A");
    if (typ == "A")
    {
        UpdateSelectElement(chnList, AONm);
    }
    else
    if (typ == "S")
    {
        UpdateSelectElement(chnList, ScNm);
    }
    else
    if (typ == "T")
    {
        UpdateSelectElement(chnList, TNm);
    }
    else
    if (typ == "I")
    {
        UpdateSelectElement(chnList, IrNm);
    }
    else
    if (typ == "X")
    {
        UpdateSelectElement(chnList, DmNm);
    }
    else
    {
        UpdateSelectElement(chnList, DONm);
    }
}

function changeTypes(s,e)
{
    var t;
    var i;
    t = document.getElementById("typ");
    t.options.length = 0;
    for (i = s; i < e; ++i)
    {
        var o = document.createElement('option');
        o.text = ChannelTypeStrs1[i];
// Update to get first capital letter
        o.value = o.text.charAt(0);
        try 
        {
            t.add(o, null);
        }
        catch(ex) 
        {
            t.add(o); // IE only
        }
    }
    UpdateOutputChannels();
}

function onActionChange()
{
    var el = document.getElementById("act")
    var act = el.selectedIndex;

    // enable disable dwells
    document.getElementById("dwl").disabled = !isDwell(act);

    // change channel types (Threshold actions), change associated value label?
    if ( (act >= CC_SETLO) && (act <= CC_ADJHI) ) // threshold adjust
    {
        if ( (oldAction < CC_SETLO) || (oldAction > CC_ADJHI) )
        {
            // change output type to A,T
            changeTypes(2,4)
            // enable disable udp type.
            document.getElementById("udp").disabled = true;
            document.getElementById("udp").selectedIndex = 0;
        }
    }
    else
    if (act == CC_IR)
    {
        // infra red
        if (oldAction != CC_IR)
        {
            changeTypes(4,5)
        }
    }
    else
    if (act == CC_DMX)
    {
        // infra red
        if (oldAction != CC_DMX)
        {
            changeTypes(5,6)
        }
    }
    else
    {
        if (  ( (oldAction >= CC_SETLO) && (oldAction <= CC_ADJHI) ) // threshold and IR
            || (oldAction == CC_IR)
            || (oldAction == CC_DMX)
            )
        {
            changeTypes(0,3)
            // enable disable udp type.
            document.getElementById("udp").disabled = false;
        }
    }
    oldAction = act;
}

function onOutputTypeChange()
{
    // change target channel list
    UpdateOutputChannels();
}


// Examine form and generate the correct string for the trigger.
// used by OnSubmit handler.
function GetTriggerString()
{
// \verb1[A|D|S|T]1\param{targetChn};\param{SetPointNr};\param{actionType};\param{DwellNr};\param{UDPType};\param{AssociatedValue}:
    // form fields
    //  "act" action seclect
    //  "dwl" dwell select
    //  "typ" channel type
    //  "chn" channel number
    //  "sp"  set point number
    //  "udp" udp packet select
    //  "b3"  Associated Value/remote node numer
    var act = document.getElementById("act").selectedIndex;
    return document.getElementById("typ").value 
        + document.getElementById("chn").selectedIndex + ";"
        + document.getElementById("sp").selectedIndex + ";"
        + act + ";"
        + document.getElementById("dwl").selectedIndex + ";"
        + document.getElementById("udp").selectedIndex + ";"
        + document.getElementById("b3").value + ";"
        + "165"; // b4 as well, filler for now (0xA5).
}

function writeSelectOptions(arr, chn)
{
    var i;
    for (i = 0; i < arr.length; ++i)
    {
        fso("C"+i, arr[i], i==chn);
    }
}

// Do not change the order of these fields without changinh the parsing
// code to handle the parameters in a different order.
function AddTriggerFields(b1, b2, b3, b4)
{
    var i,i2;

// LPK??? This will need changing to get match PIC code.
    Ac = actLocal(b1);
    Dn = 0;
    Ur = (b1 >> 7);
    TT = (b2 >> 6) & 0x03;
    Dn = (b1 & 0x07);   // may be unneeded

    if (TT > 1) 
    {
        TT = 2;  // analogue
        Tc = ((b2 >> 4) & 0x07);
        Sp = (b2 & 0x0F);
    }
    else
    {
        Tc = (b2 & 0x0F);   // Could be Scene number as well
        Sp = 0;
        if (Ac == CC_IR)
        {
            TT = 4;  // IR
            Tc = (b2 & 0x3F);
        }
        else
        if (Ac == CC_DMX)
        {
            TT = 5;  // DMX
            Tc = (b2 & 0x3F);
        }
        else
        if ( (Ac >= CC_SETLO) && (Ac <=CC_ADJHI) )
        {
            TT = 3;  // Temperature
        }
    }

// First actions
    fssx("Action", "act", "onActionChange()")
    for (i = 0; i < ActionStrs.length; ++i)
    {
        fso(i, ActionStrs[i], (i==Ac));
    }
    // save old index so we know what it was after change.
    oldAction = Ac;
    fse();

// Dwells
    fssx("Dwell", "dwl", null, !isDwell(Ac));
    for (i = 0; i < NrDwells; ++i)
    {
        fso(i, DisDwell(i), (i==Dn));
    }
    fse();

// Need On Change to modify Output Channel list and setpoint list
    fssx("Output Type", "typ", "onOutputTypeChange()")
    if ( (Ac >= CC_SETLO) && (Ac <=CC_ADJHI) )
    {
	fso("A", ChannelTypeStrs1[2], (TT == 2));
	fso("T", ChannelTypeStrs1[3], (TT == 3));
    }
    else
    if (Ac == CC_IR)
    {
	fso("I", ChannelTypeStrs1[4], (TT == 4));
    }
    else
    if (Ac == CC_DMX)
    {
	fso("X", ChannelTypeStrs1[5], (TT == 5));
    }
    else
    {
	fso("D", ChannelTypeStrs1[0], (TT == 0));
	fso("S", ChannelTypeStrs1[1], (TT == 1));
	fso("A", ChannelTypeStrs1[2], (TT == 2));
    }
    fse();
    
    fssx("Output Channel", "chn");
    if (TT == 0)
    {
        writeSelectOptions(DONm, Tc);
    }
    else
    if (TT == 1)
    {
        writeSelectOptions(ScNm, Tc);
    }
    else
    if (TT == 2)
    {
        writeSelectOptions(AONm, Tc);
    }
    else
    if (TT == 3)
    {
        writeSelectOptions(TNm, Tc);
    }
    else
    if (TT == 4)
    {
        writeSelectOptions(IrNm, Tc);
    }
    else
    if (TT == 5)
    {
        writeSelectOptions(DmNm, Tc);
    }
    fse();

    fssx("SetPoint", "sp", null, (TT != 2));
    for (i = 0; i < NrSetPoints; ++i)
    {
	fso(i, " preset "+SetPointStr(i), (i==Sp));
    }
    fse();

    fssx("UDP Packet Type", "udp", null );
    for (i = 0; i < UDPRemStrs.length; ++i)
    {
        fso(i, UDPRemStrs[i], (i==Ur));
    }
    fse();

    fit("Associated Value", "b3", b3, 3);
}

// examine form and generate correct document url.
function doConfigDi()
{
    var url = "cfg.spi?com=:CD"+UrlChn()+";"+GetTriggerString() + ";" + document.getElementById("opt").value +":";
    location = url;
    return false;    // do not submit, we have done it already.
}

function CfgDigitalIn()
{
    var i;
    i = UrlChn();

    Preamble("Configure Digital In "+DINm[i]);
//  CD<chn>;<Analogue|Digital><targetChn>;<type>;<dwell>;<sp>;<udpType>;<nodeNr>;  Digital input
//      nodeNr 0 is self, i.e. Local.
//	Bit 0  -  0 = Digital  1 = Analogue
//	Bits 1-3 - Action
//	Bits 4-5 - Dwell Choice
//	Bits 6-7 - UDP or Remote
//
//  SECOND Byte
//
//	Bits 0-3 - Chn to operate
//	Bits 4-6 - Set Point
//	Bit 7 - spare
//
//  THIRD Byte
//
//    Remote Node Number

    // form to configure a single Digital input.
    fs("cfg.spi");
    AddTriggerFields(DiB1[i], DiB2[i], DiB3[i], DiB4[i]);
    fin("Options", "opt", DiB5[i], 3);
    fe2("doConfigDi()");
}

// Show the digital outputs as a table of two rows
// the passed value is an optional action that may be linked to the table as a whole.
function DOShow()
{
    trs();
    tdh("&nbsp;");

    for (i=0; i < NrDigOutputs; i++)
    {
        tdhn(DONm[i]);
    }
    tre();
    trs();
    tdh("Outputs");
    for (i=0; i < NrDigOutputs; i++)
    {
        if ((DOs & (1<<i)) == 0)
        {
            tdclass("Off", "off");
        }
        else
        {
            tdclass("On", "on");
        }
    }
    tre();
    tbe();
}

// output all the analogue out states.
function AnHdr(s)
{
    trs();
    tdh(s);
    tdh("Value");
    tdh("&nbsp;");
    tre();
}

function doConfigAn()
{
    var url = "cfg.spi?com=:CI"+UrlChn()+";"+UrlThreshold()+";" + document.getElementById("th").value + ";" + GetTriggerString() +":";
    location = url;
//    alert(location);
    return false;    // do not submit, we have done it already.
}

function CfgAnalogueIn()
{
//  CI<chn>;<L|H>;<Threshold>;<A|D><targetChn>;<actionType>;<dwell>;<sp>;<udpType>;<nodeNr>;

    var i;
    var Th;
    i = UrlChn();
    Th = UrlThreshold();

    if (Th == "L")
    {
        Preamble("Configure Analogue Input "+AINm[i] + " Low Threshold");
        fs("cfg.spi");
        fin("Low Threshold", "th", AIDLo[i], 3);
        AddTriggerFields(AILoB1[i], AILoB2[i], AILoB3[i], AILoB4[i]);
    }
    else
    {
        Preamble("Configure Analogue Input "+AINm[i] + " High Threshold");
        fs("cfg.spi");
        fin("High Threshold", "th", AIDHi[i], 3);
        AddTriggerFields(AIHiB1[i], AIHiB2[i], AIHiB3[i], AIHiB4[i]);
    }
    fe2("doConfigAn()");
}

function CfgAnalogueIns()
{
    tbs();

    trs();
    tdh("Analog In");
    tdhclk("Name", "Set Analog Input Names", "cfg.htm?page=nai");
    tdh("Value");
    tdh("&nbsp;");
    tdh("Threshold");
    TrigHeaders();
    tre();

    for (i=0; i < NrAnInputs; i++)
    {
        trclk("configure " + AINm[i] + " Low Threshold", "cfg.htm?page=cai&th=L&chn="+i);

        tdh(i);
        tdn(AINm[i]);
        td2(AnToImageBar(AIv[i]));

        s = AICLo[i] + "%";
        if ( AICLo[i] != AIDLo[i] )
        {
            s = s + " (" +AIDLo[i] + "%)"
        }
        td(s);

        TrigActions(AILoB1[i], AILoB2[i], AILoB3[i], AILoB4[i]);
        tre();

        trclk("configure " + AINm[i] + " High Threshold", "cfg.htm?page=cai&th=H&chn="+i);
        td(); // index
        tdn(AINm[i]);
        td2(); // value

        s = AICHi[i] + "%";
        if ( AICHi[i] != AIDHi[i] )
        {
            s = s + " (" +AIDHi[i] + "%)"
        }
        td(s);

        TrigActions(AIHiB1[i], AIHiB2[i], AIHiB3[i], AIHiB4[i]);

        tre();
	}
    tbe();
}

function doConfigTemp()
{
    var url = "cfg.spi?com=:CT"+UrlChn()+";"+UrlThreshold()+";" + document.getElementById("th").value + ";" + GetTriggerString() +":";
    location = url;
//    alert(location);
    return false;    // do not submit, we have done it already.
}

function CfgTemperature()
{
//  CT<chn>;<L|H>;<Threshold>;<A|D><targetChn>;<actionType>;<dwell>;<sp>;<udpType>;<nodeNr>;
    var i;
    var Th;
    i = UrlChn();
	Th = UrlThreshold();

    if (Th == "L")
    {
        Preamble("Configure Temperature sensor " + TNm[i] + " Low Threshold");
        fs("cfg.spi");
        fin("Low Threshold", "th", TempToTenths(TDLo[i]), 4);
        AddTriggerFields(TLoB1[i], TLoB2[i], TLoB3[i], TLoB4[i]);
    }
    else
    {
        Preamble("Configure Temperature sensor " + TNm[i] + " High Threshold");
        fs("cfg.spi");
        fin("High Threshold", "th", TempToTenths(TDHi[i]), 4);
        AddTriggerFields(THiB1[i], THiB2[i], THiB3[i], THiB4[i]);
    }
    fe2("doConfigTemp()");
}

function CfgTemperatures()
{
    tbs();

    trs();
    tdh("Temperature");
    tdhclk("Name", "Set Temperature Input Names", "cfg.htm?page=ntt");
	tdh("Value");
	tdh("&nbsp;");
	tdh("Threshold");
    TrigHeaders();
    tre();

    for (i=0; i < NrTemps; i++)
    {
        trclk("configure " + TNm[i] + " Low Threshold", "cfg.htm?page=ctt&th=L&chn="+i);

        tdh(i);
        tdn(TNm[i]);
        s = "N/A";
        if ((OWSts & (0x01 << i)) != 0)
        {
            s = TempToImageBar(i);
        }
        td2(s);

        s = TempToTenths(TCLo[i])+"\&ordm;C";
        if ( TCLo[i] != TDLo[i] )
        {
            s = s + " ("+ TempToTenths(TDLo[i])+"\&ordm;C)"
        }
        td(s);

        TrigActions(TLoB1[i], TLoB2[i], TLoB3[i], TLoB4[i]);
        tre();

        trclk("configure " + TNm[i] + " High Threshold", "cfg.htm?page=ctt&th=H&chn="+i);
        td(); // index
        tdn(TNm[i]);
        td2(); // value

        s = TempToTenths(TCHi[i])+"\&ordm;C";
        if ( TCHi[i] != TDHi[i] )
        {
            s = s + " ("+ TempToTenths(TDHi[i])+"\&ordm;C)"
        }
        td(s);

        TrigActions(THiB1[i], THiB2[i], THiB3[i], THiB4[i]);
        tre();
	}
    tbe();

}

// Show an advanced status page
function ShowAdvanced()
{
    Preamble("Advanced Configuration");

//    tbs();
//    mi("Xml Status", "", "WbStatus.xml");
//    mi("Xml Configuration","","WbCfg.xml");
//    tbe();

    if (LSt >= 1)
    {
        tbc("form");
        trs();
        tdclass("Set WebBrick Mode", "formlabel");
//        tdclk("Engineer","Engineer","adv.spi?com=:SS0:");
        tdclk("Holiday","Holiday","adv.spi?com=:SS1:");
        tdclk("Normal","Normal","adv.spi?com=:SS2:");
        tre();
        tbe();

        if (LSt >= 2)
        {
            tbc("form");
            trs();
            tdclass("InfraRed Receive", "formlabel");
            tdclk("Enable","Enable","adv.spi?com=:IRN:");
            tdclk("Disable","Disable","adv.spi?com=:IRF:");
            tre();
            tbe();

            tbc("form");
            trs();
            tdclass("InfraRed Transmit", "formlabel");
            tdclk("Enable","Enable","adv.spi?com=:ITN:");
            tdclk("Disable","Disable","adv.spi?com=:ITF:");
            tre();
            tbe();

            tbc("form");
            trs();
            tdclass("Serial Protocol", "formlabel");
            tdclk("RS232","RS232","adv.spi?com=:CR2:");
            tdclk("RS485","RS485","adv.spi?com=:CR4:");
            tdclk("DMX","DMX","adv.spi?com=:CR3:");
            tre();
            tbe();

            tbc("form");
            trs();
            tdclass("Serial Baud", "formlabel");
//            tdclk("300","300","adv.spi?com=:CR0,0:");
//            tdclk("600","600","adv.spi?com=:CR0,1:");
//            tdclk("1200","1200","adv.spi?com=:CR0,2:");
//            tdclk("2400","2400","adv.spi?com=:CR0,3:");
//            tdclk("4800","4800","adv.spi?com=:CR0,4:");
            tdclk("9600","9600","adv.spi?com=:CR0;5:");
            tdclk("19200","19200","adv.spi?com=:CR0;6:");
            tdclk("38400","38400","adv.spi?com=:CR0;7:");
            tdclk("57600","57600","adv.spi?com=:CR0;8:");
//            tdclk("115200","115200","adv.spi?com=:CR0,9:");
//            tdclk("250000","250000","adv.spi?com=:CR0,10:");
            tre();
            tbe();

            fs("adv.spi");
            fih("IA");fit("InfraRed RC5 address", "ir1", (infrared & 0x1F), 3);
            fe();
        }

        fs("adv.spi");
        fih("SP1");fit("Change Web Password", "pw1","", 20);
        fe();
        if (LSt >= 2)
        {
            fs("adv.spi");
            fih("SP2");fit("Change Configuration Password", "pw2", "", 20);
            fe();
            if (LSt >= 3)
            {
                fs("adv.spi");
                fih("SP3");fit("Change Installer Password", "pw3", "", 20);
                fe();
            }
        }
    }

    tbc("col6");
    trs();
    td2("Software Version");td(SwVersion);
    tre();
    trs();
    td2("IP Address");td(IP0);td(IP1);td(IP2);td(IP3);
    tre();
    tbe();
}

function ShowLogin(target)
{
    if (target == undefined)
    {
        target = "cfg.spi"
    }
    Preamble("Login");
    fs(target);
    fih("LG");
    fip("Password:", "pw","", 16);
    fex("Login");
//    fib("Logout", "idx.spi?com=:LG:");
    fs("idx.spi");
    fih("LG");
    fex("Logout");
}

// This is nomrmally hidden but is for o2m8's/AH's benefit.
function ShowManualCfg()
{
    if (LSt > 1)    // login level 1 allows operation of controls.
    {
        Preamble("Manual Configuration");
        hd("Use great caution");
        fs("hid.spi");
        fitx("Command", "cmd", "", 20);
        fex("Send");
    }
    else
    {
        ShowLogin("hid.spi");
    }
}

function AddTimeFields(hr, mn)
{
	fss("Hours", "hrs");
    for (i = 0; i < 24; ++i)
    {
		fso(i, i, (i==hr));
    }
	fse();

	fss("Minutes", "mins");
    for (i = 0; i < 60; ++i)
    {
		fso(i, i, (i==mn));
    }
	fse();
}

// Called to set webbrick values.
// Split into three sub forms.
function CfgSrv()
{
    Preamble("Configure WebBrick");
//  SR<val>  Set rotary encoder step
//  SR<chn>;<val>  Set rotary encoder step
    fs("cfg.spi")

    fih("NN");fit("NodeName", "nn", NodeName, 12);fih(":");
    fih("SN");fit("NodeNumber", "nNm", NodeNumber, 3);fih(":");
    fih("SR0;");fit("Rotary Step ", "rst", RotStep, 3);fih(":");
    // Add FadeRate
    fih("SF");fit("FadeRate", "frt", FadeRate, 3);fih(":");
    fe();

    fs("cfg.spi")
    fih("ST");
	fss("Day", "day");
    for (i = 0; i < DayStrs.length; ++i)
    {
		fso(i, DayStrs[i], (i==day));
    }
	fse();
    AddTimeFields(hour, minute)

    fe();

    fs("cfg.spi")
    fih("SI");fit("IP Address", "ip0", IP0, 3);
        fit("IP1", "ip1", IP1, 3);
        fit("IP2", "ip2", IP2, 3);
        fit("IP3", "ip3", IP3, 3);
    fe();
}

//  CR<chn>;<anChn>  Configure rotary encoder.
//  
//  SD<yr>;<mon>;<date>  Set Date
//  SS<state>  Set operational state
//
//  DO<chn>;<>  Set digital output.
//
//  FR  Factory reset.


// convert a dwell into a user readable string.
function DisDwell(Nr)
{
    Dwt = DwV[Nr];
    if (Dwt<60)
    {
        return (Dwt + " Secs") ;
    }
    if (Dwt>=60 && Dwt<=3600)
    {
        return (Math.round(Dwt/60) + " Mins") ;
    }
    return (Math.round(Dwt/360)/10 + " Hours") ;
}

function CfgDwell()
{
    Preamble("Configure Dwells");
    fs("cfg.spi");
    var i;
    for (i = 0; i<NrDwells; i++)
    {
        fih("CW"+i);
        fit("Dwell "+i, "d"+i, DwV[i], 4);
        fih(":");
    }
    fe();
}

//
// Create a form to change Setpoints
function CfgSetPoints()
{
    Preamble("Configure preset points");
    fs("cfg.spi");
    var i;
    for (i = 0; i<NrSetPoints; i++)
    {
        fih("CS"+i);
//        fih(":CS"+i);
        fit("Preset "+i, "s"+i, SpV[i], 4);
        fih(":");
    }
    fe();
}

function SimpleStatus()
{
    Preamble("");
    tbs();
    DOShow();

    tbs();
    trs();
    dw("<td class=\"t2\">");
    tbs();
    AnHdr("Analog Out");

    for (i = 0; i<NrAnOutputs; ++i)
    {
        trs();
        tdn(AONm[i]);
        td2(AnToImageBar(AOv[i]));
        tre();
    }
    tbe();

    dw("</td><td class=\"t2\">");
    tbs();
    AnHdr("Analog In");
    for (i=0; i < NrAnInputs; i++)
    {
        trs();
        tdn(AINm[i]);
        td2(AnToImageBar(AIv[i]));
        tre();
    }
    tbe();

    dw("</td><td class=\"t2\">");
    tbs();
    AnHdr("Temp");
    for (i=0; i < NrTemps; i++)
    {
        trs();
        tdn(TNm[i]);
        if ((OWSts & (0x01 << i)) != 0)
        {
            td2(TempToImageBar(i));
        }
        else
        {
            td2("&nbsp;") ;
        }
        tre();
    }
    tbe();

    dw("</td>");
    tre();
    tbe();

    if (LSt > 0)
    {
        hd("Inputs")
        tbs();
        trs();
        tdh();
        for (i=0; i < NrDigInputs ; i++)
        {
            if (i == 8) // first group of 8
            {
                tre();
                trs();
                tdh("&nbsp;");
            }

            // Do something to show state of input here.
            //clkStrAlt(t,l,c)
            if ( actLocal(DiB1[i]) == CC_NONE)
            {
                // action none, therefore monitor input only
                if ((DIs & (0x1<<i)) == 0)
                {
                    tdclass(DINm[i], "on");
                }
                else
                {
                    tdclass(DINm[i], "alarm");
                }
            }
            else
            {
                // Change buttons to show trigger details?
//                dw("<td " + clkStr("Trigger "+DINm[i], "idx.spi?com=DI" + i + ":") + ">"+DINm[i]+"</td>");
                tdclk( DINm[i], "Trigger "+DINm[i], "idx.spi?com=DI" + i + ":");
            }
        }
        tre();
        tbe();
//
// Generate the output for a analogue output controls
// This will allow user to select a number of presets or type an absolute percentage
//
        hd("Analogue Outputs")
        tbs();
        for (i=0; i < NrAnOutputs; i++)
        {
            trs();
            tdn(AONm[i]);
            for (j=0; j<NrSetPoints; j++)
            {
                sp = SetPointStr(j);
//	            dw("<td " + clkStr("Click to set " + AONm[i] + " to "+sp,
//                         "idx.spi?com=AA" + i + ";S" + j + ":") + ">"+sp+"</td>");
                tdclk( sp, "Click to set "+AONm[i] + " to "+sp, 
                        "idx.spi?com=AA" + i + ";S" + j + ":");
            }
            // Add direct entry text box
            tre();
        }
        tbe();
        hd("Select Scene")
        tbs();
        trs();
        tdh();
        for(i=0;i<NrSceneEntries;i++)
        {
            if (i == 8) // first group of 8
            {
                tre();
                trs();
                tdh("&nbsp;");
            }
//	    dw("<td " + clkStr("Set "+ScNm[i], "idx.spi?com=SC" + i + ":") + "> "+ScNm[i]+"</td>");
        tdclk( ScNm[i], "Set "+ScNm[i] + " to "+sp, "idx.spi?com=SC" + i + ":");
        }
        tre();
        tbe();
    }
}

function DoConfig()
{
    Preamble("Configuration");
// dig out.
    tbclk("Set Digital Output Names", "cfg.htm?page=ndo");
    DOShow();
// dig in
    tbs();
    trs();
    tdh("Input");
    tdhclk("Name", "Set Digital Input Names", "cfg.htm?page=ndi");
    TrigHeaders();
	tre();

    for (i=0; i < NrDigInputs ; i++)
	{
        trclk("configure " + DINm[i], "cfg.htm?page=cdi&chn="+i);

        tdh(i);
        tdn(DINm[i]);

        TrigActions(DiB1[i], DiB2[i], DiB3[i], DiB4[i]);
        tre();
	}
    tbe();
// An Out
    tbs();
    trs();
    tdh("Analog Out");
    tdhclk("Name", "Set Analogue Output Names", "cfg.htm?page=nao");
	tdh("Value");
	tdh("&nbsp;");
    tre();

    for (i = 0; i<NrAnOutputs; ++i)
    {
        trs();
        tdh(i);
        tdn(AONm[i]);
        td2(AnToImageBar(AOv[i]));
        tre();
    }
    tbe();
// An In
    CfgAnalogueIns();
    CfgTemperatures();
// Dwell table
    tbclk("modify Dwell Values","cfg.htm?page=cdw")
    trs();
    tdh("&nbsp;");
    for (i=0; i < NrDwells ; i++)
    {
        tdhs("Dwell " + i);
    }
    trs();
    tre();
    tdh("Dwell Values");
    for (i=0; i < NrDwells; i++)
    {
        td(DisDwell(i));
    }
    tre();
    tbs();
// Set point table
    tbclk("Modify preSetPoints","cfg.htm?page=csp")
    trs();
    tdh("&nbsp;");
    for (i=0; i < NrSetPoints; i++)
    {
        tdhs("Preset " + i);
    }
    tre();
    trs();
    tdh("Value");
    for (i=0; i < NrSetPoints; i++)
    {
        td(SetPointStr(i));
    }
    tre();
    tbe();
}

function doConfigSc()
{
//  CE<chn>;day;hour;minute;<Analogue|Digital><targetChn>;<type>;<dwell>;<sp>:
    var dayStr = "";
    var i;
    for (i = 0; i < DayStrs.length; ++i)
    {
        if (document.getElementById(DayStrs[i]).checked)
        {
            dayStr = dayStr + i;
        }
    }

    var url = "sched.spi?com=:CE"+UrlChn()+";"
        + dayStr + ";"
        + document.getElementById("hrs").value + ";" 
        + document.getElementById("mins").value + ";" 
        + GetTriggerString() +":";

    location = url;
//    alert(location);
    return false;    // do not submit, we have done it already.
}

function CfgScheduleEntry()
{
// configure a single schedule entry.
    var idx;
    var nt = UrlChn();
    var days = SchD[nt];

    Preamble("Configure Schedule "+nt);

//  CE<chn>;day;hour;minute;<Analogue|Digital><targetChn>;<type>;<dwell>;<sp>:

    // form to configure a single Digital input.
    fs("sched.spi");
    for (idx = 0; idx < DayStrs.length; ++idx)
    {
        fic(DayStrs[idx], idx, ((days & (0x01<<idx)) != 0))
    }
    AddTimeFields(SchH[nt], SchM[nt])
    AddTriggerFields(SchB1[nt], SchB2[nt], SchB3[nt], SchB4[nt]);

    fe2("doConfigSc()");
}

function DaysTest(n, s)
{
    if (n != 0)
    {
        return s;
    }
    return "-";
}

function DaysStr(dy)
{
    return (DaysTest((dy & 0x01), "S") 
        + DaysTest((dy & 0x02), "M") 
        + DaysTest((dy & 0x04), "T") 
        + DaysTest((dy & 0x08), "W") 
        + DaysTest((dy & 0x10), "t") 
        + DaysTest((dy & 0x20), "F") 
        + DaysTest((dy & 0x40), "s"));
}

function DoSchedules()
{
    Preamble("Schedules");

    tbs();
    trs();
    tdh("&nbsp;");  // number
    tdh("Days");
    tdh("Time");
    TrigHeaders();
	tre();

    var i;
    for (i=0; i < NrScheduleEntries; ++i)
	{
        trclk("configure schedule " + i, "cfg.htm?page=csch&chn="+i);

        tdh(i);
        if (SchD[i] == 0)
        {
            td3("Not Configured");
            td();td();td();td();td();td();
        }
        else
        {
            td(DaysStr(SchD[i]));
            td(NumPad(SchH[i]) +":" + NumPad(SchM[i]));
            TrigActions(SchB1[i], SchB2[i], SchB3[i], SchB4[i]);
        }

        tre();
	}
    tbe();
}

function CfgSceneEntry()
{
// configure a single scene.
    var idx;
    var sp;
    var ig;
    var nt = UrlChn();

    Preamble("Configure Scene "+nt);

//  CC<nr>;[NFI][NFI][NFI][NFI][NFI][NFI][NFI][NFI];[I|S<nn>];[I|S<nn>];[I|S<nn>];[I|S<nn>]:

    // form to configure a single Digital input.
    fs("scene.spi");
    fih("CC"+nt);

    fih(";");
    for (idx = 0; idx < NrDigOutputs; ++idx)
    {
	    fssx(DONm[idx], "dig"+idx);
		fso("I", "Ignore", ((ScDM[nt] & (0x01 << idx)) == 0));
		fso("N", "On", (  ((ScDM[nt] & (0x01 << idx)) != 0) 
                         && ((ScDS[nt] & (0x01 << idx)) != 0)));
		fso("F", "Off", ( ((ScDM[nt] & (0x01 << idx)) != 0) 
                         && ((ScDS[nt] & (0x01 << idx)) == 0)));
	    fse();
    }

    for (idx = 0; idx < NrAnOutputs; ++idx)
    {
        sp = ((ScAS[nt] >> (4*idx)) & 0x0F);
        ig = ((ScAM[nt] & (0x01 << idx)) == 0);
        if (ig) sp = 255;

	    fss(AONm[idx], "an"+idx);
		fso("I", "Ignore", ig);
        for (i = 0; i < NrSetPoints; ++i)
        {
		    fso("S"+i, SetPointStr(i), (i == sp));
        }
	    fse();
    }

    fe();
}

function DoScenes()
{
    Preamble("Scenes");
    var i;
    var i2;

    tbs();
    trs();
    tdhs("Scene");  // number
    for (i2=0; i2<NrDigOutputs; ++i2)
    {
        tdhs(DONm[i2]);
    }
    for (i2=0; i2<NrAnOutputs; ++i2)
    {
        tdhs(AONm[i2]);
    }
	tre();

    for (i=0; i < NrSceneEntries; ++i)
	{
        trclk("Configure " + ScNm[i], "cfg.htm?page=csce&chn="+i);

        tdh(i);

        // Convert mask/state into string.
        for (i2=0; i2<NrDigOutputs; ++i2)
        {
            if ((ScDM[i] & (0x01 << i2)) != 0)
            {
                if ((ScDS[i] & (0x01 << i2)) != 0)
                {
                    td("On");
                }
                else
                {
                    td("Off");
                }
            }
            else
            {
                td("-");
            }
        }

        // Convert mask/state into string.
        for (i2=0; i2<NrAnOutputs; ++i2)
        {
            if ((ScAM[i] & (0x01 << i2)) != 0)
            {
                td(SetPointStr((ScAS[i] >> (4*i2)) & 0x0F));
//                td("S"+((ScAS[i] >> (4*i2)) & 0x0F));
            }
            else
            {
                td("-");
            }
        }
	    tre();
	}
    tbe();
}

function ShowPage()
{
    var p = UrlParam("legacy");
    if (p == "yes")
    {
        NrDigInputs = 14;
    }
    p = UrlParam("page");
    if (p == "log")
    {
        ShowLogin();
    }
    else if (p == "sch")
    {
        DoSchedules();
    }
    else if (p == "sce")
    {
        DoScenes();
    }
    else if (p == "con")
    {
        DoConfig();
    }
    else if (p == "adv")
    {
        ShowAdvanced();
    }
    else if (p == "srv")
    {
        CfgSrv();
    }
    else if (p == "man")
    {
        ShowManualCfg();
    }
    else if (p == "nai")
    {
        DoNames("Analogue Input", "NI", AINm);
    }
    else if (p == "nmi")
    {
        DoNames("Monitor Input", "NM", MNm);
    }
    else if (p == "ndo")
    {
        DoNames("Digital Output", "NO", DONm);
    }
    else if (p == "ndi")
    {
        DoNames("Digital Input", "ND", DINm);
    }
    else if (p == "nao")
    {
        DoNames("Analogue Output", "NA", AONm);
    }
    else if (p == "ntt")
    {
        DoNames("Temperature sensor", "NT", TNm);
    }
    else if (p == "cai")
    {
        CfgAnalogueIn();
    }
    else if (p == "cdi")
    {
        CfgDigitalIn();
    }
    else if (p == "ctt")
    {
        CfgTemperature();
    }
    else if (p == "cdw")
    {
        CfgDwell();
    }
    else if (p == "csp")
    {
        CfgSetPoints();
    }
    else if (p == "csch")
    {
        CfgScheduleEntry();
    }
    else if (p == "csce")
    {
        CfgSceneEntry();
    }
    else
    {
        SimpleStatus();
    }
    dw("</div>");
}
/* Copyright o2m8 2006 */
