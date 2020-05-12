
$(document).ready( function() {

	// var owl = jQuery('.owl-carousel.owl-carousel-live-demo').owlCarousel({
	// 	loop:true,
	// 	autoplay: 2000,
	// 	autoplaySpeed: 3000,
	// 	mouseDrag: true,
	// 	nav: true,
	// 	navElement: 'div',
	// 	//navClass: ['owl-prev', 'owl-next'],
	// 	navText: ['<i class="fa fa-chevron-circle-left"></i>','<i class="fa fa-chevron-circle-right"></i>'],
	// 	responsive:{
	// 		0:{
	// 			items:1
	// 		},
	// 		600:{
	// 			items:3
	// 		},
	// 		1000:{
	// 			items:4
	// 		}
	// 	}
	// });


	var owl2 = $(".owl-carousel.owl-carouse-order");
	owl2.owlCarousel({
	    margin: 10,
		// autoplay: 2000,
		// autoplaySpeed: 3000,	    
	    loop: true,
	    nav: true,
	    //navText: ['<i class="fa fa-chevron-circle-left"></i>','<i class="fa fa-chevron-circle-right"></i>'],
	    navText: ['<img src="./images/vector-left.svg">','<img src="./images/vector-right.svg">'],
		responsive:{
			0:{
				items:2
			},
			600:{
				items:3
			},
			1000:{
				items:6
			}
		}	    
	});	

});
