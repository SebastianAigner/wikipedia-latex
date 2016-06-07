// ==UserScript==
// @name Wikipedia LaTeX Plain Plugin
// @namespace http://sebi.io/
// @version 0.1
// @description Adds a small blue square next to formulas that shows the formula as plain text.
// @match http*://*.wikipedia.org/*
// @copyright 2016+, sebi.io
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function () {
    addGlobalStyle(`
.sebi_io_latex_tooltip {
     display: inline-block;
     font-size: 9px;
     font-family: monospace;
     width: auto;
     height: auto;
     overflow: hidden;
     margin-left: 4px;
}

.sebi_io_latex_tooltip p {
     display: none;
}

.sebi_io_latex_tooltip_open p {
     display: inline-block;
}

.sebi_io_latex_tooltip_open {
     background-color: white;
     width: auto;
     height: auto;
     display: inline-block;
}
`);
    var elements = $('span > math > semantics > annotation');
    if(elements === null) {
        return;
    }
    elements.each(function () {
        var p = $(this).parent().parent().parent().parent();
        var str = $(this).text();
        str = str.substring(14, str.length - 1);
        if (str.length > 2) {
            p.append("<div class='sebi_io_latex_tooltip'><img src='https://cloud.githubusercontent.com/assets/2178959/15872148/41aad162-2cf8-11e6-9ba6-ba16493db779.png'></img> <p>" + str + "</p></div>");
        }
    });
    $('.sebi_io_latex_tooltip > img').click(function () {
        $(this).parent().toggleClass('sebi_io_latex_tooltip_open');
    });
    $('.sebi_io_latex_tooltip').select(function () {
        return false;
    });
});

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
