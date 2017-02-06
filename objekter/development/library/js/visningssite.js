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
