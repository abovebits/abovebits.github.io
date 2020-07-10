/**
 * Markers for map
 */
var _markers = {
	"offices": [
		{latLng: [31.48, 34.29], name: 'Haifa, Israel (Field office)'},
		{latLng: [50.01, 36.18], name: 'Kharkiv, Ukraine (Field office)'},
		{latLng: [50.45, 30.52], name: 'Kiyv, Ukraine (Field office)'},
		{latLng: [40.71, -74.00], name: 'New York, USA (Field office)'},
		{latLng: [34.05, -118.24], name: 'Los Angeles, USA (Head office)', style: {r: 10, /*fill: 'red', image: 'images/favicon/icon_agency64х64.png'*/}},
		{latLng: [35.22, -80.84], name: 'Charlotte, NC, USA (Field office)'},
		{latLng: [34.22, -77.94], name: 'Wilmington, NC, USA (Field office)'},
		{latLng: [32.77, -79.93], name: 'Charleston, SC, USA (Field office)'},
	],
	"clients": [
		{latLng: [41.01, 28.97], name: 'Istanbul, Turkey'},
		{latLng: [53.90, 27.56], name: 'Minsk, Belarus'},
		{latLng: [40.71, -74.00], name: 'New York, USA'},
		{latLng: [45.45, 7.90], name: 'Ivrea, Italy'},
		{latLng: [34.22, -77.94], name: 'Wilmington, USA'},
		{latLng: [40.00, -75.28], name: 'Wynnewood, USA'},
		{latLng: [32.77, -96.79], name: 'Dallas, USA'},
		{latLng: [22.27, 114.17], name: 'Wan Chai, Hong Kong'},
		{latLng: [41.50, -74.01], name: 'Newburgh, USA'},
		{latLng: [53.79, 9.76], name: 'Barmstedt, Germany'},
		{latLng: [40.57, -74.60], name: 'Somerville, USA'},
		{latLng: [32.01, 34.78], name: 'Holon, Israel'},
		{latLng: [52.65, -7.24], name: 'Kilkenny, Ireland'},
		{latLng: [33.88, -118.30], name: 'Gardena, USA'},
		{latLng: [57.65, 11.91], name: 'Frölunda, Sweden'},
		{latLng: [34.02, -117.86], name: 'Walnut, USA'},
		{latLng: [40.35, -80.11], name: 'Bridgeville, USA'},
		{latLng: [40.08, -74.20], name: 'Lakewood, USA'},
		{latLng: [41.11, -74.06], name: 'Monsey, USA'},
		{latLng: [40.67, -73.94], name: 'Brooklyn, USA'},
		{latLng: [50.86, 4.37], name: 'Schaerbeek, Belgium'},
		{latLng: [43.73, 7.42], name: 'Monaco, Monaco'},
		{latLng: [-33.84, 151.20], name: 'Walsh Bay, Australia'},
		{latLng: [-33.79, 151.25], name: 'Balgowlah, Australia'},
		{latLng: [50.94, 5.97], name: 'Brunssum, Netherlands'},
		{latLng: [40.78, -74.01], name: 'West New York, USA'},
		{latLng: [-37.90, 145.14], name: 'Notting Hill, Australia'},
		{latLng: [41.11, -74.15], name: 'Suffern, USA'},
		{latLng: [34.05, -118.24], name: 'Los Angeles, USA'},
	]
};

/**
 * Switcher markers contact map
 */
//
var MarkersSwitcher = Object.create(function () {
	return {
		initialization: function (options) {
			this.blockElement = $(options.block);
			this.mapBlock = options.mapBlock;
			this.defaultState = options.defaultState || 'offices';
			this.activeState = this.defaultState;
			this.links = this.blockElement.find('a');
			this.markersStore = options.markersStore;
			this.changeStateCallback = options.onChangeState || null;

			this.init();
		},

		init: function () {
			var self = this;
			this.links.on('click', function (e) {
				e.preventDefault();
				self.changeState($(this).attr('data-state'));
			});
		},

		changeState: function (newState) {
			if(newState == 'offices'){
				$('#contact-switcher-text').text('Here we are.');
			}else{
				$('#contact-switcher-text').text('We talk, we define, we create.');
			}
			var oldState = this.activeState;
			//console.log(oldState);
			if (oldState !== newState) {
				this.changeMapMarkers(newState);
				this.changeActiveLink(newState);
			}
		},

		changeMapMarkers: function (newState) {
			var oldState = this.activeState,
				_mapObject = $(this.mapBlock).find('.jvectormap-container').data('mapObject');
			if (_mapObject) {
				_mapObject.removeAllMarkers();
				_mapObject.addMarkers(this.markersStore[newState]);
				this.activeState = newState;

				if (typeof this.changeStateCallback === 'function') {
					this.changeStateCallback(oldState, newState);
				}
			}
			else{
				throw "Map object isn't found";
			}
		},

		changeActiveLink: function (newState) {
			this.links.removeClass('active');
			this.links.each(function () {
				if ($(this).attr('data-state') === newState) $(this).addClass('active');
			});
		}
	}
}());

$(document).on('click', '.top_navbar .navbar-toggle.collapsed', function (e) {
	$('body').css('overflow','hidden');
	$('.top_navbar').addClass('top-mob-menu');
});

$(document).on('click', '.top-mob-menu', function (e) {
	$('body').css('overflow','auto');
	$('.top_navbar').removeClass('top-mob-menu');
});


$(window).on('resize', function(){
	if(window.innerWidth > window.innerHeight){
	   calculateHeight();
	}	
});

$(document).ready( function() {
	// parallax effect based on new_parallax.js

	var ua = window.navigator.userAgent;
	var is_ie = /MSIE|Trident/.test(ua);

	//console.log(ua);

	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	var isiOs = /iPhone|iPad|iPod/i.test(navigator.userAgent);

	var macintosh = /Macintosh/i.test(navigator.userAgent);

	if (!isMobile && !is_ie && !macintosh) {

		$('#top-parallax').parallax("10%", 0.3);
		$('#responsive').parallax("10%", 0.2);
		$('#contact').parallax("10%", 0.1);
		$('.parallax').css({'background-attachment' : 'fixed'});
	} 
	
	if (isiOs) {
		$('#top-parallax').css({'background' : 'url( "../video/Working-Space_crop.jpg"  ) no-repeat top center fixed', 'background-size':'auto 100vmax'});
		$('#responsive').css({'background' : 'url( "../images/responsive/office-space.jpg") 100%'});
		$('#contact').css({'background' : 'url("../images/bg_contacts_more.png") #21c967'});
	} else if (macintosh) {
		var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
		if (supportsTouch) {
			$('#top-parallax').css({'background' : 'url( "../video/Working-Space_crop.jpg"  ) no-repeat top center fixed', 'background-size':'auto 120vmax'});
			$('#top-parallax img.magento_logo').addClass('tablet-height');
		} else {
			$('#top-parallax').css({'background' : 'url( "../video/Working-Space_crop.jpg"  ) no-repeat top center fixed', 'background-size':'auto 75vmax'});
			$('#top-parallax img.magento_logo').addClass('huge-desktop-height');
		}
		$('#responsive').css({
			'background' : 'url( "../images/responsive/office-space.jpg")',
			'background-size' : '100%',
			'background-position' : 'center',
			'background-repeat' : 'no-repeat'
		});
		$('#contact').css({'background' : 'url("../images/bg_contacts_more.png") #21c967'});
	}

	// end of parallax effect based on new_parallax.js

	// executes when complete page is fully loaded, including all frames, objects and images
	var owl = jQuery('.owl-carousel.owl-carousel-live-demo').owlCarousel({
		loop:true,
		autoplay: 2000,
		autoplaySpeed: 3000,
		mouseDrag: true,
		nav: true,
		navElement: 'div',
		//navClass: ['owl-prev', 'owl-next'],
		navText: ['<i class="fa fa-chevron-circle-left"></i>','<i class="fa fa-chevron-circle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:4
			}
		}
	});


	var owl2 = $(".owl-carousel.owl-carouse-app");
	owl2.owlCarousel({
	    items: 1,
	    margin: 10,
		// autoplay: 2000,
		// autoplaySpeed: 3000,	    
	    loop: true,
	    nav: true,
	    //navText: ['<i class="fa fa-chevron-circle-left"></i>','<i class="fa fa-chevron-circle-right"></i>'],
	    navText: ['<img src="./images/vector-left.svg">','<img src="./images/vector-right.svg">'],
	});

	$('.txt').html(function(i, html) {
		var chars = $.trim(html).split("");
		return '<span>' + chars.join('</span><span>') + '</span>';
	});

	$('#map').vectorMap({
		map: 'world_mill',
		scaleColors: ['#C8EEFF', '#0071A4'],
		normalizeFunction: 'polynomial',
		hoverOpacity: 0.7,
		hoverColor: '#149dd5',
		zoomOnScroll: false,
		markerStyle: {
			initial: {
				r: 8,
				fill: '#149dd5',
				stroke: '#383f47', //149dd5
				//image: 'images/favicon/icon_agency32х32.png'
			}
		},
		onMarkerTipShow: function(event, label, index){
			//console.log(label);
			//label.css({'background':'#149dd5', 'font-size': '16px', 'pointer-events': 'none', 'padding': '10px'});
		},
		/*series: {
		regions: [{
			attribute: 'fill',
			values: {
			  "UA": '#bbb',
			  "US": '#bbb',
			  "BY": '#bbb',
			},
		}]},*/
		backgroundColor: 'none',
		markers: _markers.offices
	});
	/*End of see more button*/
	new WOW({
		mobile : false
	}).init();

	/*Back to TOP*/
	// Show or hide the sticky footer button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 200) {
			$('.go-top').fadeIn(200);
		} else {
			$('.go-top').fadeOut(200);
		}
	});

	// Animate the scroll to top
	$('.go-top').click(function(event) {
		event.preventDefault();

		$('html, body').animate({scrollTop: 0}, 300);
	})
	/* End of Back to TOP*/
	//
	var _portfolio = new PortfolioModel("images/abovebits_skills/gallery.json"),
		_gallery = new PortfolioPresenter({
			block: "#home_gallery",
			searchField: '#gallery_search'
		}, _portfolio);

	//console.log(_gallery);

	$('#seemore').click(function (e) {
		e.preventDefault();
		_gallery.showNextItems();
	});

	$('#filter_gallery ul li button').on('click', function () {
		_gallery.clearBlock();
		_gallery.filterItems($(this).attr('data-state'));
	});

	/*$('#filter_gallery ul li input').on('keyup', function (e) {
        _gallery.clearBlock();
        _gallery.filterItems($(this).val());
    });*/
	$(window).scroll(function(){
		if ($(window).scrollTop() >= 50) {
			$('body').addClass('fixed-header');
		}
		else {
			$('body').removeClass('fixed-header');
		}
	});

	var $clearBtn = $('.clear-a'),
		$gallerySearch = $('#gallery_search');

	$gallerySearch.on('input', function () {
		$clearBtn.hide();
		if (this.value.length) {
			$clearBtn.show();
		}
	});
	
	$clearBtn.on('click', function (e) {
		e.preventDefault();
		$gallerySearch.val('');
		$(this).hide();
		_gallery.filterItems("*");
	});

	/** Header Menu - change background color on scroll **/
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if (scroll > 100) {
			$("#page-top nav.top_navbar").css({"background":"#eeeff3", "box-shadow":"0 1px 5px rgba(0,0,0,.6)"});
		}
		else{
			$("#page-top nav.top_navbar").css({
				"background":"transparent",
				"box-shadow":"none",
				"-webkit-transition":"background-color 300ms linear",
				"-ms-transition":"background-color 300ms linear",
				"transition":"background-color 300ms linear"
			});
		}
	});
	/** End of Header Menu - change background color on scroll **/

	$(document).on('click', '.skills_toggle a[data-state]', function (e) {
		e.preventDefault();
		var states = {
				'collapse' : {
					'text' : 'SEE MORE',
					'attr' : 'expand',
				},
				'expand' : {
					'text' : 'COLLAPSE',
					'attr' : 'collapse',
				}
			}, $btn = $(this),
			state = $btn.attr('data-state');

		$btn.attr('data-state', states[state]['attr']);
		$btn.text(states[state]['text']);

		updateLayout();
		isCollapse();

		if (state === 'collapse') {
			$('html, body').animate({
				scrollTop: $("#skills").offset().top
			}, 800);
		}
	});
});

//if userAgent = Mobile, we should add green background to Contact block
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
	document.getElementById("contact").classList.add('parallax-mirror');
}
//end of userAgent = Mobile

$(window).load( function() {
	calculateHeight();

	// quick search regex
	var qsRegex;
	var buttonFilter;

	var $grid = $('.grid').isotope({
		itemSelector: '.element-item',
		layoutMode: 'fitRows',
		filter: function() {
			var $this = $(this);
			var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
			var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
			return searchResult && buttonResult;
		}
	});
	$grid.isotope('shuffle');
	/*$('#filters').on( 'click', 'button', function() {
	  buttonFilter = $( this ).attr('data-filter');
	  $grid.isotope();
	});*/

	// filter functions
	var filterFns = {
		// show if number is greater than 50
		numberGreaterThan50: function() {
			var number = $(this).find('.number').text();
			return parseInt( number, 10 ) > 50;
		},
		// show if name ends with -ium
		ium: function() {
			var name = $(this).find('.name').text();
			return name.match( /ium$/ );
		}
	};
	// bind filter button click
	$('.filters-button-group').on( 'click', 'button', function() {
		var filterValue = $( this ).attr('data-filter');
		// use filterFn if matches value
		filterValue = filterFns[ filterValue ] || filterValue;
		$grid.isotope({ filter: filterValue });
	});
	// use value of search field to filter
	var $quicksearch = $('#quicksearch').keyup( debounce( function() {
		qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		$grid.isotope();
	}) );

	// debounce so filtering doesn't happen every millisecond
	function debounce( fn, threshold ) {
		var timeout;
		return function debounced() {
			if ( timeout ) {
				clearTimeout( timeout );
			}
			function delayed() {
				fn();
				timeout = null;
			}
			setTimeout( delayed, threshold || 100 );
		};
	}

	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
		});
	});

	$grid.on( 'layoutComplete', function( event, laidOutItems ) {
		updateLayout();
		isCollapse();

		if (laidOutItems.length > 18) {
			$('.skills_toggle').show();
		} else {
			$('.skills_toggle').hide();
		}
	});

	MarkersSwitcher.initialization({
		block: '.contact-switcher',
		mapBlock: '#map',
		markersStore: _markers
	});
	$("#contact_map").on( 'click', function() {
		$("#clints_click").click();
	});

});
function updateLayout() {
	$.each($('body #skills .brands > li'), function () {
		var style = $(this).attr('style'),
			top = style.split('top: '),
			position = top[1].split('px;'),
			width = $(window).width();

		$(this).attr('data-hidden', '');

		if (parseInt(position[0]) > 250 && parseInt(position[0]) < 320 && width > 1090) {
			$(this).attr('data-hidden', true)
		} else if (parseInt(position[0]) > 190 && parseInt(position[0]) < 340 && width < 1090) {
			$(this).attr('data-hidden', true)
		} else if (parseInt(position[0]) > 150 && parseInt(position[0]) < 220 && width < 668) {
			$(this).attr('data-hidden', true)
		}
	});
}
function isCollapse() {
	var $stateBtn = $("body #skills a[data-state]"),
		$gallery = $('body #skills .container_gallery');

	if ($stateBtn.attr('data-state') === 'expand') {
		$gallery.css('height', $gallery.attr('data-height') + 'px');
		$gallery.find('.brands > li[data-hidden="false"]').attr('data-hidden', true);
	} else if ($stateBtn.attr('data-state') === 'collapse'){
		$gallery.css('height', '100%');
		$gallery.find('.brands > li[data-hidden="true"]').attr('data-hidden', false);
	}
}
function calculateHeight() {
	var $gallery = $('body #skills .container_gallery'),
		width = $(window).width(),
		data = {
			data : 0,
			height : 0,
		};

	if (width > 2000) {
		data.data = 350;
		data.height = '350px';
	} else if (width > 1155 && width < 2000){	
		data.data = 300;
		data.height = '300px';
	} else if (width > 1100 && width < 1156) {
		data.data = 285;
		data.height = '285px';
	} else if (width > 1010 && width < 1101) {
		data.data = 275;
		data.height = '275px';
	} else if (width > 911 && width < 1011) {
		data.data = 250;
		data.height = '250px';
	} else if (width > 768 && width < 912) {
		data.data = 220;
		data.height = '220px';
	} else if (width > 666 && width < 769) {
		data.data = 230;
		data.height = '230px';
	} else if (width > 560 && width < 667) {
		data.data = 205;
		data.height = '205px';
	} else if (width > 381 && width < 561) {
		data.data = 180;
		data.height = '180px';
	} else {
		data.data = 175;
		data.height = '175px';
	}

	$gallery.attr('data-height', data.data);
	$gallery.css('height',  data.height);
}