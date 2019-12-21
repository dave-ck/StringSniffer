function setup() {
    jQuery(document).ready(function () {
        jQuery('[data-toggle="tooltip"]').each(function () {
            var $elem = jQuery(this);
            $elem.tooltip({
                html: true,
                container: $elem,
                delay: {hide: 400}
            });
        });
    });
    $("#textInput").on('submit', function (formOut) {
        formOut.preventDefault();
        let text = this.elements[0].value;
        console.log(text);
        $.post('/sniff', {"queryString": text}, function (hits) {
            setOut(text, hits);
            console.log(hits);
        });


    });
}

function setOut(baseText, hits) {
    let htmlContents = "<p>" + baseText;
    for (let i = baseText.length; i >= 0; i--) {
        if (hits.hasOwnProperty(i)) {
            for (let j = 0; j < hits[i].length; j++) {
                htmlContents = htmlContents.slice(0, i + 3) +
                    "<span class='footnote' data-toggle='tooltip' data-original-title='From:" + hits[i][j].source
                    + "; match: " + hits[i][j].word + "'></span>" +
                    htmlContents.slice(i + 3);
            }
        }
    }
    htmlContents += "</p>";
    $("#outText").html(htmlContents)
}

window.onload = setup();


$.post('/sniff', {"queryString": "Bonjour! Poutine au fromage?\n Sur assiette?"}, function (hits) {
            setOut("Bonjour! Poutine au fromage?\n Sur assiette?", hits);
            console.log(hits);
        });