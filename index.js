var src = $('#grid');
var wrap = $('<div id="grid-overlay"></div>');
var gsize = 7;

// these are 1 less due to counting from 0
var cols = 105; // does not really matter
var rows = 16; // matters alot.
var gridArea = (cols + 1) * (rows + 1);

/* Overlay */

var tbl = $('<table></table>');
for (var y = rows; y >= 0; y--) {
    var tr = $("<tr id='tr" + y + "'></tr>");
    for (var x = 0; x <= cols; x++) {
        var td = $("<td id='td" + x + "'></td>");
        td.css('width', gsize + 'px').css('height', gsize + 'px');
        td.addClass('unselected');
        tr.append(td);
    }
    tbl.append(tr);
}

// attach overlay
wrap.append(tbl);
src.after(wrap);

/* Formula functions */

var bitString = "";
var decimal = BigNumber;

var setBitString = function(string) {
    if (string.length > gridArea) bitError.text("Thats too big!"); else bitError.text("");
    bitString = string;
    $("#bitArea").val(bitString);
}

var setDecString = function(bigNum) {
    decimal = bigNum;

    var decString = decimal.toFixed();

    if ($("#showCommas")[0].checked) {
        decString = decimal.toFormat(3).slice(0, -4)
    }

    $("#decArea").val(decString);
}

var setBitMap = function() {
    var i = 0;
    for (var x = 0; x <= cols; x++) {
        for (var y = 0; y <= rows; y++) {
            var tr = $("#tr" + y);
            var td = tr.find("#td" + x);

            var bit = bitString[i];

            if (bit == "0" || !bit) {
                td.addClass('unselected');
                td.removeClass('selected');
            }
            if (bit == "1") {
                td.addClass('selected');
                td.removeClass('unselected');                
	    }
            i++;
        }
    }
}

var getDecimalFromMap = function () {
    var bitString = "";
    for (var y = 0; y <= cols; y++) {
        for (var x = 0; x <= rows; x++) {
            var boolBit = $("table #tr" + x + " #td" + y).hasClass('selected') ? 1 : 0;

            bitString += boolBit;
        }
    }
    var decimal = new BigNumber(bitString, 2)

    setBitString(bitString);
    setDecString(decimal.times(17));
}

/* Events */

$('#grid-overlay td').hover(function () {
    $(this).toggleClass('hover');
});

$('#grid-overlay td').mouseup(function () {
    getDecimalFromMap();
});

$('#grid-overlay td').mousedown(function () {
    $(this).toggleClass('selected').toggleClass('unselected');
});

var bitError = $('#bitError');
var decError = $('#decError');

$('#bitArea').keyup(function() {
    input = $(this).val().replace(/ /g, '').replace(',', '');

    if(!/^[0-1]*$/.test(input) && input != "") bitError.text("Not a binary number.");
    else if (input != "") {
        bitError.text("");
        // setBitString(input);
        bitString = input;
        setDecString(new BigNumber(input, 2).times(17));
        setBitMap();
    } 
});

$('#decArea').keyup(function() {
    input = $(this).val().replace(/ /g, '').replace(',', '');

    if(!/^\d+$/.test(input) && input != "") decError.text("Not a positive number.");
    else if (input != "") {
        bigInput = new BigNumber(input);
        decError.text("");
        decimal = bigInput;
        setBitString(bigInput.dividedBy(17).floor().toString(2));
        setBitMap();
    }
});

$("#showCommas").click(function() {
   var decString = decimal.toFixed();

    if (this.checked) {
        decString = decimal.toFormat(3).slice(0, -4);
    }

    $("#decArea").val(decString);
});

String.prototype.repeat = function(num) {
    return new Array(num + 1).join(this);
}

$("#presets button").click(function() {
    var b = $(this);

    decError.text("");

    big = new BigNumber(b.attr('dec'));

    setDecString(big);

    // decimal = big;
    setBitString("0".repeat(parseInt(b.attr('p'))) + big.dividedBy(17).floor().toString(2));
    setBitMap();
});

