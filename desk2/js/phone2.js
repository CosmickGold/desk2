function getPos(ctrl)
{
    var CaretPos = 0;
    if (document.selection)
    // IE Support
    {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character',-ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart; return (CaretPos);
}

function phoneUp(x,foc)
{
  if (foc && (getPos(x) != x.value.length))
      return;
  var s;
  x.value = x.value.replace(/ /g,'').replace(/-/g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/#/g,'');
  if (x.value.length > 3)
  {
      s = '(' + x.value.substr(0,3) + ') ' + x.value.substr(3);
      if (s.length > 9)
      {
          s = s.substr(0,9) + '-' + s.substr(9);
          if (s.length > 14)
              s = s.substr(0,14) + ' #' + s.substr(14);
      }
      x.value = s.substr(0,20);
  }
}

function extractNumMP(s)
{
    var ss;
    try
    {
        ss = s.match(/[0-9]/g);
        ss = ss.join('');
        return ss;
    }
    catch (ex) { return '0' }
}

function focusPhone() { phoneTxt.focus() }

var keyX;
function notNumKey(x)
{
    if (event.keyCode == 13)
    {
        event.keyCode = 9;
        return;
    }
    var c = String.fromCharCode(event.keyCode);
    if (!c.match("[0-9]"))
    {
        noKey();
        goNote('PLEASE ENTER ONLY NUMBERS');
        //goNote('Please enter only digits\r\nfor this phone number.','','OK','',focusPhone);
    }
    else if (x)
    {
        keyX = x;
        setTimeout('onPhoneUp(keyX)',50);
    }
}

function onPhoneUp(x)
{
  phoneUp(x,true);
  if (x.value.length == 14)
  {
    if (x.id == 'findTxt')
      bFindBy('','DESC');
    else if ((fNameTxt.value == '') && (LNameTxt.value == '') && (getNameByPhoneA(x.value)))
      custInfoTxt.focus();
    else if (hPhoneTxt.value.length == 0)
      hPhoneTxt.focus();
    else if (fNameTxt.value == '')
      fNameTxt.focus()
    else
      makeTxt.focus()
  }
}

function onPhoneKey()
{
    if (event.srcElement.id.indexOf('phone') == 0)
    {
        var c = String.fromCharCode(event.keyCode);
        if (((!c.match("[0-9, ,-]")) && (event.keyCode > 31)) || (c == ','))
            noKey();
    }
}

function reFocus(x)
{
    goGraySetAptTable();
    switch (x)
    {
        case 'Try Again': source.focus(); break;
        case 'Undo': source.value = oldPhone2; break;
        case 'Delete': source.value = ''; break;
    }
}

function phoneBlur(x)
{
  phoneUp(x,false);
  if ((extractNumMP(x.value).length < 10) && (x.value.replace(/ /g,'').length > 0))
  {
      oldPhone2 = oldPhone1
      source = event.srcElement;
      goNote('A FULL 10-DIGIT PHONE NUMBER IS REQUIRED.');
          // goNote('A full ten-digit phone number is required.','Try Again','Undo','Delete',reFocus);
  }
  else
      x.style.backgroundColor = '#FFFFFF';
}

function phoneFocus(x)
{
  phoneID = x.id;
  oldPhone1 = x.value;
  x .style.backgroundColor = '#FFCCCC';
}

