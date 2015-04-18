$(function () {
    
});


var src = $('#grid');
var wrap = $('<div id="grid-overlay"></div>');
var gsize = 10;

var cols = 50;
var rows = 10; // 30 looks nice

// create overlay
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

// wrap.css('width', cols * (gsize + 2 * 2) + 'px').css('height', rows * (gsize + 2 * 2) + 'px');
// src.css ('width', cols * (gsize + 2 * 2) + 'px').css('height', rows * (gsize + 2 * 2) + 'px');

// attach overlay
wrap.append(tbl);
src.after(wrap);

var bitString = "";
var decimal = BigNumber;

var setBitString = function(string) {
    bitString = string;
    $("#bitArea").text(bitString);
}

var setDecString = function(bigNum) {
    decimal = bigNum;

    var decString = decimal.toFixed();

    if ($("#showCommas")[0].checked) {
        decString = decimal.toFormat(3).slice(0, -4)
    }

    $("#decArea").text(decString);
}

var setBitMap = function() {
    // ...
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
    setDecString(decimal);

    // $("#debug").append(decimal + " from " + bitString + "<br>");
}

$('#grid-overlay td').hover(function () {
    $(this).toggleClass('hover');
});

$('#grid-overlay td').mouseup(function () {
    getDecimalFromMap();
});

$('#grid-overlay td').mousedown(function () {
    $(this).toggleClass('selected').toggleClass('unselected');
});

$("#showCommas").click(function() {
     var decString = decimal.toFixed();

    if (this.checked) {
        decString = decimal.toFormat(3).slice(0, -4)
    }

    $("#decArea").text(decString);
});