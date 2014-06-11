var goClick; 

function NoteClick(bn)
{
    noNote();
    if (goClick != undefined)
        goClick(bn);
}

function obj(x)
{
    return document.getElementById(x);
}

function goNote(theMessage,bn1,bn2,bn3,clk)
{
    goClick = null;
    if (!(bn1 || bn2 || bn3))
        { bn1 = ''; bn2 = 'OK'; bn3 = ''; }
    goClick = clk;
    noteTable.style.top = 100 + window.pageYOffset + 'px';
    obj('NoteMsg').innerHTML = String(theMessage).replace(/\n/g,'<br>');
    obj('grayDiv').style.display = '';
    obj('noteTable').style.display = 'table';
    obj('BnDiv1').style.display = "block";
    NoteBtn1.focus();
    NoteBtn1.blur();
    if (bn1 != "")
        obj('BnDiv1').style.display = "block";
    else
        obj('BnDiv1').style.display = "none";
    if (bn2 != "")
        obj('BnDiv2').style.display = "block";
    else
        obj('BnDiv2').style.display = "none";
    if (bn3 != "")
        obj('BnDiv3').style.display = "block";
    else
        obj('BnDiv3').style.display = "none";
    NoteBtn1.value = bn1;
    NoteBtn2.value = bn2;
    NoteBtn3.value = bn3;
}

function noNote()
{
    obj('noteTable').style.display = 'none';
    obj('grayDiv').style.display = 'none';
}
