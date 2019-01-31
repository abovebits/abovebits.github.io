// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict
    var h = window.innerHeight;
    //console.log(window.outerHeight);
    var tp = document.getElementById("top-parallax");
    tp.style.height = h + "px";

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        scrollWindowToTarget($(this));
        event.preventDefault();
    });

    $('a.scroll-change').bind('click', function (e) {
        e.preventDefault();
        scrollWindowToTarget($(this));
        if (typeof MarkersSwitcher !== 'undefined') MarkersSwitcher.changeState($(this).attr('data-target'));
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $(this).closest('.navbar-toggle:visible').click();
			$(this).closest('.navbar-collapse').collapse('hide');
    });
	$('.navbar-collapse ul li button').click(function(){ 
		$(this).closest('.navbar-toggle:visible').click();
		$(this).closest('.navbar-collapse').collapse('hide');
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    function scrollWindowToTarget (element) {
        $('html, body').stop().animate({
            scrollTop: ($(element.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
    }

})(jQuery); // End of use strict
