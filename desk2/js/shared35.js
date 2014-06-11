function formPhone(s) { return '('+s.substr(0,3)+') '+s.substr(3,3)+'-'+s.substr(6,4) }

function print5()
{
    alert('PRINT5 FOUND');
    /*
    for (var i=1; i<11; i++)
    {
        a = getTicks();   // NOTE: Delay not sensed on some installations.
        print();
        b = getTicks();
        if ((b - a) < 100)
        {
            if (!confirm('The browser is ignoring calls to print that occurr too frequently.\r\n' +
                'Please wait a few seconds, then click "OK".\r\n\r\n' +
                '(Try ' + i + ' of 10.)'))
            break;
        }
        else
            break;
    }
    */
}

function getTicks()
{
    var now = new Date();
    return now.getTime();
}

var mm,dd,yy;

function setMDY(time)
{
    yy = time.getFullYear().toString();
    var n = yy.length;
    if (yy.length == 4)
        yy = yy.substr(2,2);
    mm = time.getMonth() + 1;
    if (mm < 10)
        mm = "0" + mm;
    dd = time.getDate();
    if (dd < 10)
        dd = "0" + dd;
}

function now6()
{
    setMDY(new Date());
    return yy + mm + dd;
}

function then6(date)
{
    setMDY(date);
    return yy + mm + dd;
}

function date6(plusDays)
{
    var d = new Date();
    var monthDay = d.getDate();
    d.setDate(monthDay + plusDays);
    return then6(d);
}

function date6ToDate(s)
{
    var yr,mo,da;
    yr = s.substr(0,2);
    mo = s.substr(2,2);
    da = s.substr(4,2);
    return mo + '/' + da + '/' + yr;
}

function Time6(x)
{
    var now = new Date();
    var h = now.getHours().toString();
    if (h < 10)
        h = '0' + h;
    var m = now.getMinutes().toString();
    if (m < 10)
        m = '0' + m;
    var s = now.getSeconds().toString();
    if (s < 10)
        s = '0' + s;
    if ((x) && (x == ':'))
        return h + ':' + m + ':' + s;
    else
        return h + m + s;
}

function hash(s)
{
    var n = 1;
    s = s.replace(/[ ]/g,'');
    for (var i = 0; i < s.length; i++)
    {
        n = n * s.charCodeAt(i);
        if (n > 1000000000)
            n = (n / 1000);
    }
    while (n < 1000000000)
        n = (n * 7.3333);
    return n.toFixed(4);
}

function extractNum(s)
{
    var ss;
    try
    {
        ss = s.match(/[0-9,.,-]/g);
        ss = ss.join('');
        return ss;
    }
    catch (err) { return '0' }
}

function cutLast(s,x)
{
    if (s == "")
        return "";
    if ((!x) || (s.substr(s.length-1) == x))
        return s.substr(0,s.length - 1);
    return s;
}

function sameColor(a,b)  // NOTE:  <span id="colorSpan"></span>  <-- MUST be on each page that uses "sameColor".
{
    colorSpan.style.backgroundColor = a;
    var color1 = colorSpan.style.backgroundColor;
    colorSpan.style.backgroundColor = b;
    var color2 = colorSpan.style.backgroundColor;
    return (color1 == color2);
}

function hexToRgb(h)
{
    if (h.substr(0,1) == '#')
        h = h.substr(1);
    return 'rgb(' +
            parseInt(h.substr(0,2),16) + ',' +
            parseInt(h.substr(2,2),16) + ',' +
            parseInt(h.substr(4,2),16) + ')';
}

function obj(x)
{
    return document.getElementById(x);
}

function ParseInt(n)
{
    n = Math.round(n);
    return parseInt(n,10);
}

function toHex(n)
{
    n = parseInt(n,10);
    var s = '0123456789ABCDEF';
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return s.charAt((n - n % 16) / 16) + s.charAt(n % 16);
}

function rbgToHex(x)
{
    try
    {
        var aa = x.match(/[0-9,]/g);
        aa = aa.join('');
        aa = aa.split(',');
        return '#' + toHex(aa[0]) + toHex(aa[1]) + toHex(aa[2]);
    }
    catch (ex) { return '#FFFFFF' }
}

function queryString(x)
{
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++)
    {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0,pos);
        var value = pairs[i].substring(pos + 1);
        args[argname] = unescape(value);
    }
    if (x)
        return args[x];
    else
        return args;
}

function selectIt(element)
{
    if (element.createTextRange)
    {
        var tRange = element.createTextRange();
        tRange.select();
    }
    else if (element.selectionStart)
    {
        element.focus();
        element.setSelectionRange(0,99);
    }
    else
        element.focus();
}

function extractDecimal(s)
{
    var ss;
    try
    {
        ss = s.match(/[0-9,.]/g);
        ss = ss.join('');
        return ss;
    }
    catch (ex) { return '0' }
}

function noKey(e)
{
    try { event.keyCode = 0; } catch (ex) { };
    if (window.event)
        event.returnValue = false;
    else
        e.preventDefault();
    void [0];
}

function noLead0(x) { return x.replace(/^0+(?=\d\.)/, ''); }

function zOff(s)
{
    if (s.indexOf('0') == 0)
        s = s.substr(1);
    return s;
}

function About()
{
    goNote('Desk2 is free software designed to simplify the\r\n' +
           'repair business, and is provided free to all\r\n' +
           'with neither licensing requirements nor guarantees.\r\n\r\n' +
           'Contact: Tom@Desk2.org');
}

function getUrlStr()
{
    try
    {
        return getS(location.pathname).split('^')
    }
    catch (ex)
    {
        history.go(-1);
    }
}

function nextURL(s,url)
{
    parent.highFrame.iStrings['/' + url] = s;
    location.href = url;
}

function getS(n)
{
    var s = parent.highFrame.iStrings[n]
    if (s == undefined)
        return '';
    else
        return s;
}

function setS(n,v) { parent.highFrame.iStrings[n] = v }

function noSpace(s) { return s.replace(/ /g,'') }

function goUpper(s) { return s.toUpperCase() }

var txtColor,borColor,borWidth;
function Btn_onmouseover(item)
{
    txtColor = item.style.color;
    borColor = item.style.borderColor;
    borWidth = item.style.borderWidth;
    item.style.cursor = 'pointer';
    item.style.color = '#00FF00';
    item.style.borderColor = '#DDDDDD';
    item.style.borderWidth = '3px';
}

function Btn_onmouseout(item)
{
    if (rbgToHex(item.style.color) == '#00FF00')
        item.style.color = txtColor;
    if (item.style.borderWidth == '3px')
        item.style.borderWidth = borWidth;
    if (rbgToHex(item.style.borderColor) == '#DDDDDD')
        item.style.borderColor = borColor;
}

function cleanKeys()
{
    var c = String.fromCharCode(event.keyCode);
    if (c.match("[']"))
        event.keyCode = 96; // c = '`';
    else if (c.match("[<^>|~+&]"))
    {
        event.keyCode = 0;
        event.returnValue = false;
    }
}

function L(g,c) { return (g.indexOf(c) > -1) }

function gradeColor(g)
{
    var s = g.innerText;
    if (L(g,'A'))
        return '#00FFFF';
    if (L(g,'B'))
        return '#00FF00';
    if (L(g,'C'))
        return '#BBBBBB';
    if (L(g,'D'))
        return '#FFCC00';
    if (L(g,'F'))
        return '#FF0000';
    return '#00FF00'
}

function onError(s,ex)
{
  alert('ERROR\r\n\r\nFile: ' + location.pathname +
    '\r\nFunction: ' + s + '\r\nMessage:' + ex.message);
}

/*
var cacheStatusValues = [];
cacheStatusValues[0] = 'uncached';
cacheStatusValues[1] = 'idle';
cacheStatusValues[2] = 'checking';
cacheStatusValues[3] = 'downloading';
cacheStatusValues[4] = 'updateready';
cacheStatusValues[5] = 'obsolete';

var cache = window.applicationCache;
//cache.addEventListener('cached', logEvent, false);
//cache.addEventListener('checking', logEvent, false);
//cache.addEventListener('downloading', logEvent, false);
cache.addEventListener('error', logEvent, false);
//cache.addEventListener('noupdate', logEvent, false);
cache.addEventListener('obsolete', logEvent, false);
//cache.addEventListener('progress', logEvent, false);
//cache.addEventListener('updateready', logEvent, false);

function logEvent(e)
{
    var online, status, type, message;
    online = (navigator.onLine) ? 'yes' : 'no';
    status = cacheStatusValues[cache.status];
    if (status == 'idle')
        return;
    type = e.type;
    message = 'online: ' + online;
    message+= ', event: ' + type;
    message+= ', status: ' + status;
    alert(message);
}
*/

function curs()
{
    document.body.onselectstart = function() { return false };
    document.body.style.cursor = "default"
}

function testBar()
{
    if (getS('showBar') == 'false')
        useMenu();
}

function useMenu()
{
    setS('showBar','false');
    barTbl.style.display = 'none';
    try { homeTd.style.display = 'none'; } catch (ex) {}
    try { barTd.style.display = 'none'; } catch (ex) {}
}
