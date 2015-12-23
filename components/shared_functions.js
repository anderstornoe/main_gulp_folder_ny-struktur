// 


// // Funktion der sætter fødder på store I'er og små l'er:: 
// function replace_letters(div_container) {


//     return replaced_string;
// }




function one_line_footer() {
    //$('.container, .container-fluid').append('<div class="col-xs-12"><h6 class="footerCopywrite"> <a href="../../../kemiC_visningsite/builds/development/om_projektet.html">Digitale læringsmaterialer  Copyright 2015</a></h6></div>')
    // $(".container, .container-fluid").append("<div class='col-xs-12'><h6 class='footerCopywrite'> <a href='../pf_kem2015/om_projektet.html'>Digitale læringsmaterialer  Copyright 2015</a></h6></div>");
    $(".container, .container-fluid").append("<div class='col-xs-12'><h6 class='footerCopywrite'> <a href='../pf_about/index.html'>Digitale læringsmaterialer  Copyright 2015</a></h6></div>");

    //$(".container, .container-fluid").append("<div class='col-xs-12 vuc_footer'><h2>Digitale læringsmaterialer på voksenuddannelser</h2><h6 class='footerText'>Udviklet af et produktionsfællesskab mellem otte VUC’er til anvendelse på de deltagende skoler: <br/> Hf og VUC Nordsjælland, VUC Hvidovre-Amager, VUC Roskilde, VUC Vestegnen, VUF, VUC Storstrøm, VUC Aarhus og Københavns VUC (KVUC).</h6> <h6 class='footerCopywrite'> Copyright 2015 </h6></div >");
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-62686407-1', 'auto');
    ga('send', 'pageview');
    //console.log("GA COMPLETE");

}

/// INDLEJRINGS    FUNKTIONALITET  ///////

function embedlink(obj) {

    // alert($(".tab").length);

    var UrlVarStr = String(window.location);
    // var UrlVarStr = "https://www.vucdigital.dk/engelsk/";  // String(window.location)
    if (UrlVarStr.indexOf("https") !== -1)
        UrlVarStr = UrlVarStr.split("/", 3).join("/");
    else
        UrlVarStr = UrlVarStr.split("/", 3).join("/").replace("http", "https");

    console.log("embedlink - UrlVarStr: " + UrlVarStr);

    var HrefObj = obj.parent().parent().find("a").eq(0).attr("href").replace("../", "/");
    console.log("embedlink - HrefObj: " + HrefObj);

    var embedFronter = '<iframe height="570" width="100%" frameborder="0" src="' + UrlVarStr + HrefObj + '"></iframe>';
    // <<<<<<< HEAD
    var embedMoodle = embedFronter; //'<embed height="670" width="100%" src="' + UrlVarStr + HrefObj + '"></embed>';
    // =======
    // var embedMoodle = '<embed height="670" width="970" src="' + UrlVarStr + HrefObj + '"></embed>';
    // >>>>>>> 74fec925709b0def67b697ad47831c62fd4ebf36

    // var embedFronter = '<iframe height="570" width="820" src="http://eundervisning-wp.dk/pf_kem2015/' + obj.parent().parent().find("a").eq(0).attr("href") + '"></iframe>';
    // var embedMoodle = '<embed height="670" width="970" src="http://eundervisning-wp.dk/pf_kem2015/' + obj.parent().parent().find("a").eq(0).attr("href") + '"></embed>';



    var embedArray = [embedFronter, embedMoodle];

    //var embedwrapping = "<div class='embedToggle'><p>Indsæt dette link i dit LMS eller på din webside</p><input class='embedtext' type='text' value='" + embedArray[0] + "'></input><div class='tabcontainer'><div class='tab_1 tab activetab'>Moodle</div><div class='tab_2 tab'>Fronter</div></div><div class='togglecontainer'><a class='MetaDataLink' href='https://www.youtube.com/watch?v=0cKkCRRTC_c'>Hjælp til indlejring i Moodle </a></div></div>";
    var embedwrapping = "<div class='embedToggle'><p>Indsæt dette link i dit LMS eller på din webside</p><input class='embedtext' type='text' value='" + embedArray[0] + "'></input><a class='MetaDataLink' target='_blank' href='https://www.youtube.com/watch?v=0cKkCRRTC_c'>Hjælp til indlejring i Moodle </a><a class='MetaDataLink' target='_blank' href='https://www.youtube.com/embed/kUsW0vEXeF4'>Hjælp til indlejring i Fronter </a></div></div>";

    var embedWidth;
    var embedHeight;


    // Klik på embedding knapper funktionalitet:

    //Hvis den man klikker på allerede har en parent...: 
    if (obj.parent().parent().find(".embedToggle").length > 0) {
        $(".embedToggle").slideUp(150, function() {

            $(".embedToggle").remove();
            // Animation complete.
        });

    } else {
        if ($(".embedToggle").length > 0) {
            // console.log("indeks: " + obj.parent().parent().index());
            $(".embedToggle").slideUp(150, function() {

                $(".embedToggle").remove();
                // Animation complete.
                obj.parent().parent().append(embedwrapping);
                $(".embedToggle").slideUp(0);
                $(".embedToggle").slideDown("slow");
                $(".tab").click(function() {

                    var indeks = $(this).index();
                    $(".tab").removeClass("activetab");
                    $(this).addClass("activetab");
                    //alert (indeks);
                    changeLink(indeks);
                });

            });
            //

        } else {
            //console.log("indeks: " + obj.parent().parent().index());
            obj.parent().parent().append(embedwrapping);
            $(".embedToggle").slideUp(0);
            $(".embedToggle").slideDown("slow");
            $(".tab").click(function() {

                var indeks = $(this).index();
                $(".tab").removeClass("activetab");
                $(this).addClass("activetab");
                //alert (indeks);
                changeLink(indeks);
            });
        }
        //alert(obj.parent().html());
    }


    //<p><iframe width="100%" height="800" frameborder="0" src="http://eundervisning-wp.dk/pf_eng2015/vid_set_da.html"></iframe></p>
    //<p><embed height="800px" src="http://eundervisning-wp.dk/pf_eng2015/vid_set_da.html" width="100%"></embed></p>


    function changeLink(indeks) {

        console.log("clickede på noget")

        $(".embedtext").val(embedArray[indeks]);

    }

    $(".embedtext").click(function() {
        $(this).select();
    });
}



// This function surrounds all letters (or clusters of letters) in LetterArray with span-tags with a class specified in LetterClassArray.
// NOTE: The delimiter should be a character (eg. "#"), or a combination of characters (eg. "-X-"), that does not exist in the target text.
// IMPORTANT: HTML-tags must not be present in the target-text. This could result in invalid/broken markup.
// EXAMPLE CALL:
//          MarkCertainCharactersAsSpecial([".AtomName", ".AtomSymbol"], ["H","L", "S"], ["FontGreen", "FontRed", "FontBlue"], "#");
// - which will make all L's red and all H's green in the text-strings associated with the target CSS classes ".AtomName" and ".AtomSymbol".
/*function MarkCertainCharactersAsSpecial(TargetSelectorArray, LetterArray, LetterClassArray, Delimiter) {
    for (var TargetSelector in TargetSelectorArray) {
        $(TargetSelectorArray[TargetSelector]).each(function(index, element) {
            for (var l in LetterArray) { // First surround all letters (or clusters of letters) in LetterArray with delimiters, eg. If letter = L and delimiter = #, then #L#.
                var ElementText = $(element).text();
                if (ElementText.indexOf(LetterArray[l]) !== -1) {
                    $(element).html(ElementText.replace(LetterArray[l], Delimiter + LetterArray[l] + Delimiter));
                }
            }

            for (var l in LetterArray) { // second, replace all delimited letters, eg. #L#, with <span class="MyClass">L</span>
                var LetterClass = (LetterClassArray.length == LetterArray.length) ? LetterClassArray[l] : LetterClassArray[0];
                var ElementText = $(element).text();
                if (ElementText.indexOf(LetterArray[l]) !== -1) {
                    $(element).html(ElementText.replace(Delimiter + LetterArray[l] + Delimiter, '<span class="' + LetterClass + '">' + LetterArray[l] + '</span>'));
                }
            }
        });
    }
}

*/

// Example of use:
//      UserMsgBox(".FeedbackWrap", "Hurra - korrekt svar!");
// where the class FeedbackWrap is the target selector in which the UserMsgBox will appear.
function UserMsgBox(TargetSelector, UserMsg) {

    var HTML = "<div class = 'MsgBox_bgr'><div id='UserMsgBox'>";
    HTML += '<span class="CloseClass right glyphicon glyphicon-remove"></span><span class="clear"></span>';
    HTML += UserMsg;
    HTML += "</div> </div>";
    $
    $(TargetSelector).prepend(HTML);

    $(".MsgBox_bgr").fadeIn("slow");

    $(".MsgBox_bgr").click(function() {
        $(".MsgBox_bgr").fadeOut(200, function() {
            $(this).remove();
        });
    });
}



/// INDLEJLRING SLUT !


$.fn.shuffle_div_position = function() {
    var allElems = this.get(),
        getRandom = function(max) {
            return Math.floor(Math.random() * max);
        },
        shuffled = $.map(allElems, function() {
            var random = getRandom(allElems.length),
                randEl = $(allElems[random]).clone(true)[0];
            allElems.splice(random, 1);
            return randEl;
        });

    this.each(function(i) {
        $(this).replaceWith($(shuffled[i]));
    });
    return $(shuffled);
};



function shuffle_Array(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}



// Hvis objektet ligger i en frame, så lave et link i toppen af dokumentet //

$(document).ready(function() {

    var isInIFrame = (window.location != window.parent.location);
    console.log("Er i rammen? : " + isInIFrame);
    if (isInIFrame) {
        $("body").append("<div class='new_window_link'> Ser det mærkeligt ud? <a class='btn btn-info btn-xs embedlink' href='" + window.location.href + "' target='_blank'>  Åbn i nyt browservindue</a></div>");
        $(".container-fluid").css("padding-top", "30px");
    }
});



// Her kan man se hvilke browsere der understøtter favicons:
//      https://en.wikipedia.org/wiki/Favicon
function AddFavicon() {
    $('head').append('<link type="image/x-icon" rel="shortcut icon" href="../library/img/testFavicon.ico" />');
}


// MARK 16:05


var GeneralOverlayClass = {

    HowWhyData: "",

    ReturnAjaxData: function(Type, Url, Async, DataType) {
        $.ajax({
            type: Type,
            url: Url,
            async: Async,
            dataType: DataType,
            success: function(Data) {
                console.log("ReturnAjaxData: " + JSON.stringify(Data));
                HowWhyData = JSON.parse(JSON.stringify(Data));
                // JsonExternalData = JSON.parse(JSON.stringify(Data));
                // console.log("HowWhyData: " + HowWhyData);
            }
        }).fail(function() {
            alert("GeneralOverlayClass.ReturnAjaxData: Ajax failed to fetch data");
        });
    },


    ApplyOverlay_why: function(Selector, EleraningObj) {

        this.ReturnAjaxData("GET", "../library/json/HowWhyData.json", false, "json");

        console.log("ApplyOverlay_why - HowWhyData: " + JSON.stringify(HowWhyData));

        $(Selector).before(HowWhyData.ButtonControler_why);

        var OverlayBtnText = HowWhyData.JsonWhyHow[EleraningObj].why_btntext;
        $("#OverlyContainerWhy .OverlayBtnText").html(OverlayBtnText);

        var thisObj = this;

        $(window).resize(function() {
            // AKTIVER KUN HVIS OVERLAY SKAL RAMME EN SPECIFIK WRAPPER: 
            // thisObj.ResizeAndPositionOverlayWindow(Selector, ".Overlay");
        });

        $(document).on('click', "#OverlayWhy", function(event) {
            event.preventDefault();

            // alert("WHY");

            if ($(".Overlay").length === 0) // Ensures that only one overlay is added.
                $(Selector).before(HowWhyData.OverlayMarkup);

            // AKTIVER KUN HVIS OVERLAY SKAL RAMME EN SPECIFIK WRAPPER:
            // thisObj.ResizeAndPositionOverlayWindow(Selector, ".Overlay");

            // $( ".Overlay" ).slideDown( "fast", function() {
            $(".Overlay").fadeIn("fast", function() {
                $(".OverlayTextContainer").fadeIn("fast");
            });

            var OverlayText, OverlayTextHeader;
            var ButtonId = $(this).prop("id");
            console.log("ButtonId: " + ButtonId);

            OverlayText = HowWhyData.JsonWhyHow[EleraningObj].why_content;
            OverlayTextHeader = "WHY";

            console.log("ButtonId: " + ButtonId + ", \nOverlayTextHeader: " + OverlayTextHeader + ", \nOverlayText: " + OverlayText);

            $(".OverlayTextHeader").html(OverlayTextHeader);
            $(".OverlayText").html('<h5>' + OverlayText + '</h5>');
        });

        this.CloseOverlays();

        console.log("FilterCssSelector: " + this.FilterCssSelector(".Overlay"));
    },


    ApplyOverlay_how: function(Selector, EleraningObj) {

        this.ReturnAjaxData("GET", "../library/json/HowWhyData.json", false, "json");

        console.log("ApplyOverlay_how - HowWhyData: " + JSON.stringify(HowWhyData));

        $(Selector).before(HowWhyData.ButtonControler_how);

        var OverlayBtnText = HowWhyData.JsonWhyHow[EleraningObj].how_btntext;
        $("#OverlyContainerHow .OverlayBtnText").html(OverlayBtnText);

        var thisObj = this;

        $(window).resize(function() {
            // AKTIVER KUN HVIS OVERLAY SKAL RAMME EN SPECIFIK WRAPPER: 
            // thisObj.ResizeAndPositionOverlayWindow(Selector, ".Overlay");
        });

        $(document).on('click', "#OverlayHow", function(event) {
            event.preventDefault();

            // alert("HOW");

            if ($(".Overlay").length === 0) // Ensures that only one overlay is added.
                $(Selector).before(HowWhyData.OverlayMarkup);

            // AKTIVER KUN HVIS OVERLAY SKAL RAMME EN SPECIFIK WRAPPER:
            // thisObj.ResizeAndPositionOverlayWindow(Selector, ".Overlay");

            // $( ".Overlay" ).slideDown( "fast", function() {
            $(".Overlay").fadeIn("fast", function() {
                $(".OverlayTextContainer").fadeIn("fast");
            });

            var OverlayText, OverlayTextHeader;
            var ButtonId = $(this).prop("id");
            console.log("ButtonId: " + ButtonId);

            OverlayText = HowWhyData.JsonWhyHow[EleraningObj].how_content;
            OverlayTextHeader = "HOW";

            console.log("ButtonId: " + ButtonId + ", \nOverlayTextHeader: " + OverlayTextHeader + ", \nOverlayText: " + OverlayText);

            $(".OverlayTextHeader").html(OverlayTextHeader);
            $(".OverlayText").html('<h5>' + OverlayText + '</h5>');
        });

        this.CloseOverlays();

        console.log("FilterCssSelector: " + this.FilterCssSelector(".Overlay"));
    },


    CloseOverlays: function() {

        // Naar der klikkes paa overlayet skal overlayet lukke:
        $(document).on('click', ".Overlay", function(event) {
            event.preventDefault();
            $(".OverlayTextContainer").fadeOut("fast", function() {
                // $( ".Overlay" ).slideUp( "fast" );
                $(".Overlay").fadeOut("fast");
            });
        });

        // Naar der klikkes paa overlay-teksten skal overlayet lukke:
        $(document).on('click', ".OverlayTextContainer", function(event) {
            event.preventDefault();
            $(".OverlayTextContainer").fadeOut("fast", function() {
                // $( ".Overlay" ).slideUp( "fast" );
                $(".Overlay").fadeOut("fast");
            });
        });
    },


    FilterCssSelector: function(Selector) {
        return String(Selector).replace(/#/g, '').replace(/\./g, '');
    },


    // Resize overlayet til at matche billedet:
    ResizeAndPositionOverlayWindow: function(WindowSelector, OverlayWindowSelector) {
        var Pos = $(WindowSelector).offset();
        $(OverlayWindowSelector).css({
            position: "absolute",
            top: Pos.top + "px",
            left: Pos.left + "px"
        });
        console.log("Pos.top: " + Pos.top + ", Pos.left: " + Pos.left);

        $(OverlayWindowSelector).width($(WindowSelector).width());
        $(OverlayWindowSelector).height($(WindowSelector).height());
    }

};

var GeneralOverlayObj = Object.create(GeneralOverlayClass);

// GeneralOverlayObj.ReturnAjaxData("GET", "../library/json/HowWhyData.json", false, "json");


// Brug denne funktion til at initialisere et model html objekt, som du så kan putte indhold i: $("modal-body").html("Dit indhold her..")
function modal() {
    $("body").append("<div class='modal fade' id='myModal' role='dialog'>" +
        "<div class='modal-dialog'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
        "</div>" +
        "<div class='modal-body'>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "< /div>");
}



// Funktion til at finde en streng i en streng

function allIndexOf(str, toSearch) {
    var counter = 0; 
    for (var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        counter ++; 
    }
    return counter;
}

function showIosOverlay() {
    $(".embed-responsive-16by9").prepend("<img src='../library/img/iPad_videoquiz_overlay.png' class='ipad'>")
}


// This class makes a pager for controlling the CSS display-property of a number of pages (or containers) with a class of your own choosing.
// USAGE:
// ======
//
//      HTML:
//      =====
//              <span id="myPagerContainer"></span>
//
//              <div class="myPageClass"> PAGE 1 </div>
//              <div class="myPageClass"> PAGE 2 </div>
//              <div class="myPageClass"> PAGE 3 </div>
//
//      JS:
//      ===
//              You first need to make an instance of the object like so:
//
//                      var myPagerObj = Object.create(pagerClass);
//
//              then you initialize the pager with two arguments:
//
//                      myPagerObj.init("#myPagerContainer", ".myPageClass");
//
//              The first argument (here the id "#myPagerContainer") can be either an id or class. Use a class if you need two or more
//              pageres to control your pages. The pager will be dynamicllay created inside "#myPagerContainer".
//
//              The second argument need to be a class - the class has to be added to the containers you wish to control.
var pagerClass = {
    Range: 5,            // The default number visible buttons on the pager. 
    ActiveLinkNum: 1,    // The default active page number.
    PagerSelector: null, 
    TargetSelectorChild: null, 
    NumOfPages: null,    // Contains the number of pages/containers once counted.
    init : function(PagerSelector, TargetSelectorChild){  // This "constructor" initiates the pager functionality.
        this.PagerSelector = PagerSelector;
        this.TargetSelectorChild = TargetSelectorChild;

        this.pager();       // Call the pager.
        this.pagerEvents(); // Set event-listners.
    },
    pager : function(){
        
        var Xthis = this;

        if (Xthis.NumOfPages === null){  // Count the number of pages the pager has to handle - and only do it once.
            Xthis.NumOfPages = 0;
            $(Xthis.TargetSelectorChild).each(function(index, element) {
                ++Xthis.NumOfPages;
            });
        }
        
        var HTML = '<ul class="PagerClass">';
        // HTML += '<li><span class="PagerButtonLeft">&lt;</span></li>'; 
        HTML += '<li><span class="PagerButtonLeft glyphicon glyphicon-chevron-left"></span></li>'; 
        
        for (var j = 1; j <= this.NumOfPages; j++) {
            HTML += '<li><a href="#" class="PagerButton btn btn-sm btn-info">' + j + '</a></li>';
        }
            
        // HTML += '<li> <span class="PagerButtonRight">&gt;</span> </li>';
        HTML += '<li> <span class="PagerButtonRight glyphicon glyphicon-chevron-right"></span> </li>'; 
        HTML += '</ul>';

        // Generate the pager:
        $(Xthis.PagerSelector).html(HTML);

        Xthis.showHide();

        console.log("ActiveLinkNum 1: " + this.ActiveLinkNum + ", NumOfPages: " + this.NumOfPages);
    },
    pagerEvents : function(){ // Set event-listeners.
        
        var Xthis = this;

        $(Xthis.PagerSelector + " .PagerButtonLeft").click(function(e) { 
            if (1 < Xthis.ActiveLinkNum) {  // Only perform pager functionality if the "active" page is larger than one.
                Xthis.ActiveLinkNum -= 1;
                console.log("PagerButtonLeft - ActiveLinkNum 1: " + Xthis.ActiveLinkNum);

                $(Xthis.PagerSelector + " .PagerButton").removeClass("btn-info btn-primary");
                $(Xthis.PagerSelector + " .PagerButton").addClass("btn-info");

                Xthis.showHide(); // Show the active page and hide other pages. Show the "range" of pagerButtons and hide other pagerButtons.
            }
        });

        $(Xthis.PagerSelector + " .PagerButtonRight").click(function(e) { 
            if (Xthis.ActiveLinkNum < Xthis.NumOfPages) { // Only perform pager functionality if the "active" page is smaller than the number of pages.
                Xthis.ActiveLinkNum += 1;
                console.log("PagerButtonRight - ActiveLinkNum 2: " + Xthis.ActiveLinkNum);

                $(Xthis.PagerSelector + " .PagerButton").removeClass("btn-info btn-primary");
                $(Xthis.PagerSelector + " .PagerButton").addClass("btn-info");

                Xthis.showHide(); // Show the active page and hide other pages. Show the "range" of pagerButtons and hide other pagerButtons.
            }
            
        });

        $(Xthis.PagerSelector + " .PagerButton").click(function(e) { // If a ".PagerButton" is pressed, then...
            e.preventDefault(); // Prevent the link-nature of the anchor-tag.
            
            Xthis.ActiveLinkNum = parseInt($(this).text()); // Get the number of the pressed ".PagerButton".
            console.log("PagerButton - ActiveLinkNum 3: " + Xthis.ActiveLinkNum);

            Xthis.showHide(); // Show the active page and hide other pages. Show the "range" of pagerButtons and hide other pagerButtons.

            $(Xthis.PagerSelector + " .PagerButton").removeClass("btn-info btn-primary");
            $(Xthis.PagerSelector + " .PagerButton").addClass("btn-info");

            var parentIndexNum; // The following code findes the parentIndexNum by adding the class "PagerMarker" and removing it again (the ".index()" method does not work here):
            $(this).closest(Xthis.PagerSelector).addClass("PagerMarker");
            $(Xthis.PagerSelector).each(function(index, element) {
                if ($(element).hasClass("PagerMarker")) {
                    parentIndexNum = index;
                    $(element).removeClass("PagerMarker");
                }
            });
            console.log("ON CLICK .PagerButton - parentIndexNum: " + parentIndexNum);
         
            var i = parseInt(Xthis.ActiveLinkNum)-1;
            i = (i >= Xthis.NumOfPages)?(parentIndexNum+1)*parseInt(Xthis.NumOfPages)-i-1:i; 
            $(Xthis.PagerSelector).each(function(index, element) {
                $(".PagerButton:eq("+i+")", element).toggleClass("btn-info btn-primary");
            });
        });
    }, showHide: function(){

        var Xthis = this;

        // NOTE: the StartIndex is a startingpoint for a range of number that ensures an "interval" of shown ".PagerButton"'s at the boundaries for the range [1, 2, 3, ... , NumOfPages]
        var StartIndex = Xthis.ActiveLinkNum - Math.round((Xthis.Range - 1) / 2); // Find the startindex based on ActiveLinkNum.
        if (StartIndex < 1) StartIndex = 1; // Ajust startindex for low ActiveLinkNum
        if (Xthis.Range + StartIndex > Xthis.NumOfPages) StartIndex = Xthis.NumOfPages - Xthis.Range +1; // Ajust startindex for high ActiveLinkNum
    
        $(Xthis.PagerSelector + " .PagerButton").hide();  // Hide all ".PagerButton"'s.
        $(Xthis.TargetSelectorChild).hide();   // Hide all pages.

        $(Xthis.PagerSelector).each(function(index1, element1) {  // For each ".PagerButton" do...
            $(" .PagerButton", element1).each(function(index2, element2) {  // For each ".PagerButton" do...
                if ((StartIndex <= index2+1) && (index2+1 < Xthis.Range + StartIndex)){  // If ".PagerButton" (and therfore also the "page") is in the range [StartIndex, StartIndex + Range], then...
                    $(element2).show();   // Show the ".PagerButton"'s in the range [StartIndex, StartIndex + Range].
                    if (parseInt($(element2).text()) == Xthis.ActiveLinkNum) {
                        $(element2).toggleClass("btn-info btn-primary");  // Set the pressed ".PagerButton" as btn-primary.
                        $(Xthis.TargetSelectorChild+':eq('+String(parseInt(Xthis.ActiveLinkNum)-1)+')').show(); // Show the page.
                    }
                }
            });
        });
    }
}
