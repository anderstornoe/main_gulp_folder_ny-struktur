var FontSizeScalerObj = {};

function FontSizeScalerNew(ParentSelector, SelectorClassArr, NativeWindowWidth) {
    console.log("FontSizeScalerObj 1:" + JSON.stringify(FontSizeScalerObj));
    var FontSize;
    if ($.isEmptyObject(FontSizeScalerObj)) { // If the window reloades, then FontSizeScalerObj is empty and therefore store all font-sizes.
        for (var i = 0; i < SelectorClassArr.length; i++) {
            FontSize = $(SelectorClassArr[i]).css("font-size");
            console.log("FontSizeScalerObj FontSize - SelectorClass: " + SelectorClassArr[i] + ", font-size: " + FontSize);
            if (typeof FontSize != 'undefined') // Check in case a CSS-class in SelectorClassArr does not exist:
                FontSizeScalerObj[SelectorClassArr[i]] = parseInt(FontSize.replace(/px/g, ''));
        }
    }

    // Resize all fonts:
    var WindowWidth = $(ParentSelector).width();
    var Ratio = Math.round(1000 * (WindowWidth / NativeWindowWidth)) / 1000; // Rounded to 3 digit precision.
    var ArgStr = SelectorClassArr.join();
    for (var Selector in FontSizeScalerObj) {
        if (ArgStr.indexOf(Selector) !== -1) // Only ajust the fontsizes given in SelectorClassArr:
            $(Selector).css("font-size", String(FontSizeScalerObj[Selector] * Ratio) + "px");
    }
    console.log("FontSizeScalerObj 2:" + JSON.stringify(FontSizeScalerObj));
}

$(document).ready(function() {


    console.log("doc_ready");

    var $container = $('.tn_container');
    $container.imagesLoaded(function() {
        console.log("img loaded");
        $container.masonry({
            itemSelector: '.post-box',
            columnWidth: '.post-box',
            transitionDuration: 0
        });

    });


    // init Masonry after all images have loaded



    if ($(window).width() > 560) {
        var overskrift_height = $(".container_overskrift").height();
        $(".tn_container").css("margin-top", overskrift_height);
    }

    $(".post-box").each(function() {
        var ny_z = $(".post-box").length - $(this).index();
        $(this).css("z-index", ny_z);
    });


    header_new();
    footer_new();

    google_analytics();

});

$(window).resize(function() {
    if ($(window).width() > 560) {
        var overskrift_height = $(".container_overskrift").height();
        //  console.log(overskrift_height);
        $(".tn_container").css("margin-top", overskrift_height);
    } else {
        $(".tn_container").css("margin-top", "0px");
    }
});

function header_new() {

    var HTML = '';

    HTML += '<div class="top_header ">'
    HTML += '<div class="container-fluid">'
    HTML += '<div class="col-xs-6">';
    HTML += '<a href="https://www.vucdigital.dk/search/"><div class="innner_logo"> <img class="v_logo" src="https://www.vucdigital.dk/search/img/VucdigitalLOGO_forHeader.svg"> </a><div>';
    HTML += '<span class="logo_text">vucdigital.dk</span>';
    HTML += '</div> </div>';
    HTML += '<div class="txt_container"> </div>'
    HTML += '</div>';
    HTML += '<div class="col-xs-6 menu ">';
    HTML += '<span> <a class="menu_a" href="https://www.vucdigital.dk">FORSIDE</a></span> | <span> <a class="menu_a" href="https://www.vucdigital.dk/search/about.html">OM OS</a></span>';
    HTML += '</div> </div> </div>';
    HTML += '<div class="row"> </div>';

    $("body").prepend(HTML);

    $(".v_logo .v_logo_embed .logo_text .logo_text_embed").click(function() {
        document.location.href = "https://www.vucdigital.dk";
    });

    $(".container-fluid").css("padding-top", "0px");

}

function footer_new() {

    var HTML = '';
    HTML += '<div class="footer_search">';
    HTML += '<div class="container-fluid">';
    HTML += '<b><p class="copyright">Et samarbejde mellem</b></p>';
    HTML += '<img src="https://www.vucdigital.dk/search/img/logoer.png" class="img-responsive">';
    HTML += '<div class="hr_line"></div>';
    HTML += '<div class="col-xs-6 footerlinks">';
    HTML += '<p class="contact"><a class="contact_a" href="mailto:info@vucdigital.dk">info@vucdigital.dk</a></p>';
    HTML += '</div>';
    HTML += '<div class="col-xs-6 leftlink">© 2017 vucdigital</div>';
    HTML += '</div>';
    HTML += '</div>';
    $("body").append(HTML);
}
