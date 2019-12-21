function setup() {
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').each(function () {
            var $elem = jQuery(this);
            $elem.tooltip({
                html: true,
                container: $elem,
                delay: {hide: 100000}
            });
        });
    });
    $("#textInput").on('submit', function (formOut) {
        formOut.preventDefault();
        let text = this.elements[0].value;
        $.post('/sniff', {"queryString": text}, function (hits) {
            setOut(text, hits);
        });


    });
}

function setOut(baseText, hits) {
    let htmlContents = "<p>" + baseText;
    for (let i = baseText.length; i >= 0; i--) {
        if (hits.hasOwnProperty(i)) {
            for (let j = 0; j < hits[i].length; j++) {
                htmlContents = htmlContents.slice(0, i + 3) +
                    "<sup>" +
                    "<a href='#' data-toggle='tooltip' title='Source: " + hits[i][j].source + "; Match: " + hits[i][j].word + "'>" +
                    "<span class='glyphicon glyphicon-asterisk'></span>" +
                    "</a></sup>" +
                    htmlContents.slice(i + 3);
            }
        }
    }
    htmlContents += "</p>";
    htmlContents = htmlContents.replace(/(?:\r\n|\r|\n)/g, '<br>');
    $("#outText").html(htmlContents);
    $('[data-toggle="tooltip"]').tooltip();

}

window.onload = setup();
