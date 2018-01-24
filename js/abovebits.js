$(document).ready( function() {
	 // executes when complete page is fully loaded, including all frames, objects and images
	var owl = jQuery('.owl-carousel').owlCarousel({
		loop:true,
		autoplay: 2000,
		autoplaySpeed: 3000,
		autoWidth:true,
		margin:125,
	});
    
    $('.txt').html(function(i, html) {
      var chars = $.trim(html).split("");
      return '<span>' + chars.join('</span><span>') + '</span>';
    });
 
});
new WOW().init();