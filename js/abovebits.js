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

$(document).ready( function() {

	// parallax effect based on new_parallax.js

    var ua = window.navigator.userAgent;
    var is_ie = /MSIE|Trident/.test(ua);

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var isiOs = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile && !is_ie) {
        console.log(is_ie);
        $('#top-parallax').parallax("10%", 0.3);
        $('#responsive').parallax("10%", 0.2);
        $('#contact').parallax("10%", 0.1);
        $('.parallax').css({'background-attachment' : 'fixed'});
    }
    if(isiOs){
        $('#top-parallax').css({'background' : 'url( "../video/Working-Space_crop.jpg"  ) no-repeat top center fixed', 'background-size':'auto 100vmax'});
        $('#responsive').css({'background' : 'url( "../images/responsive/office-space.jpg") 100%'});
        $('#contact').css({'background' : 'url("../images/bg_contacts_more.png") #21c967'});
	}
    // end of parallax effect based on new_parallax.js

	 // executes when complete page is fully loaded, including all frames, objects and images
	var owl = jQuery('.owl-carousel').owlCarousel({
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
	
/*See More button*/
	/*var i=0;
	function gallery(){
		var screenWidth = document.documentElement.clientWidth;
		var galleryCount = Math.floor(screenWidth/376);
			if (galleryCount == 0) galleryCount = 1;
			if (screenWidth == 1024 || screenWidth == 1366) galleryCount = Math.floor(screenWidth/316);
			if (screenWidth <= 1142) galleryCount = Math.floor(screenWidth/338);
			if (screenWidth <= 340) galleryCount = Math.floor(screenWidth/320);
		//console.log("width: "+screenWidth+"px");
		//console.log("count: "+galleryCount);
		var displayResources = $('#home_gallery');
		
		 //displayResources.text('Loading data from JSON source...');
		 
		 var d= new Date();
		 $.ajax({
			 type: "GET",
			 url: "images/abovebits_skills/gallery.json?v="+d.getTime(),
			 success: function(result)
			 {	var n=0;
				//console.log(result);
				for ( n = 0; n < galleryCount*2; n++){
					var output='<div class="view">';
					if (i < result.length){
						if (result[i].mockup != '')output+='<a class="fullblock_fancybox" href="'+result[i].mockup+'" data-fancybox="gallery_full"></a>';
						output+='<img class="ios_touch"/>';
						output+='<div class="view-back">';
						if (result[i].skill1 != '')output+='<span><img src="'+result[i].skill1+'"/></span>';
						if (result[i].skill2 != '')output+='<span><img src="'+result[i].skill2+'"/></span>';
						if (result[i].skill3 != '')output+='<span><img src="'+result[i].skill3+'"/></span>';
						if (result[i].skill4 != '')output+='<span><img src="'+result[i].skill4+'"/></span>';
						if (result[i].mockup != '')output+='<a href="'+result[i].mockup+'" data-fancybox="gallery">→</a>';
						output+='</div>';
						output+='<div class="slice s1" style="background-image: url('+result[i].img+');"><span class="overlay"></span><div class="slice s2" style="background-image: url('+result[i].img+');"><span class="overlay"></span><div class="slice s3" style="background-image: url('+result[i].img+');"><span class="overlay"></span><div class="slice s4" style="background-image: url('+result[i].img+');"><span class="overlay"></span><div class="slice s5" style="background-image: url('+result[i].img+');"><span class="overlay"></span></div></div></div></div></div>';
						output += '</div>';
						i++;
						displayResources.append(output);
						if ( i+1 >= result.length) $( ".gallery_more" ).remove();
					 } else $( ".gallery_more" ).remove();
				}
				$(".view").slideDown("slow");
				if ("ontouchstart" in document.documentElement)
				{
					//alert("your device is a touch screen device.");
					$('#works a.fullblock_fancybox').css({'display':'none'});
				}
			 },
			 error: function(data){
				 //console.log(data);
			 }
		 });
	}*/
	 //gallery();
	 
	 /*$('#seemore').click(function (e) {
		 e.preventDefault();
		 gallery();
		 
	 });*/


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
	var gallery = $('#skills .container_gallery');

	$(window).on('resize', function(){
		var win = $(this);
		if (win.width() > 1155) {
			gallery.attr('data-height', '285');
			gallery.css('height', '285px');
		} else if (win.width() > 1101 && win.width() < 1155) {
			gallery.attr('data-height', '275');
			gallery.css('height', '275px');
		} else if (win.width() > 1010 && win.width() < 1100) {
			gallery.attr('data-height', '255');
			gallery.css('height', '255px');
		} else if (win.width() > 911 && win.width() < 1009) {
			gallery.attr('data-height', '240');
			gallery.css('height', '240px');
		} else if (win.width() < 910 && win.width() > 768) {
			gallery.attr('data-height', '225');
			gallery.css('height', '225px');
		} else if (win.width() < 768) {
			gallery.attr('data-height', '210');
			gallery.css('height', '210px');
		}
	});

	$(window).resize();

	$('.skills_toggle').on('click', 'a', function () {
		var $this = $(this),
			state = $this.data('state');

		if (state == 'expand') {
			gallery.css('height', gallery.data('height') + 'px');
			$this.text('SEE MORE');

			$('html, body').animate({
				scrollTop: $("#skills").offset().top
			}, 1500);

			$this.data('state', 'collapse');
		} else if (state == 'collapse'){
			gallery.css('height', '100%');
			$this.text('COLLAPSE');
			$this.data('state', 'expand');
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

/** Smooth scroll only for IE **/
/*
Math.easeOut = function (t, b, c, d) { t /= d; return -c * t*(t-2) + b; };

(function() { // do not mess global space
    var ua = window.navigator.userAgent;
    var is_ie = /MSIE|Trident/.test(ua);

    if ( is_ie ) {//IE specific code goes here
        var
            interval, // scroll is being eased
            mult = 0, // how fast do we scroll
            dir = 0, // 1 = scroll down, -1 = scroll up
            steps = 50, // how many steps in animation
            length = 60; // how long to animate
        function MouseWheelHandler(e) {
            e.preventDefault(); // prevent default browser scroll
            clearInterval(interval); // cancel previous animation
            ++mult; // we are going to scroll faster
            var delta = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            if(dir!=delta) { // scroll direction changed
                mult = 1; // start slowly
                dir = delta;
            }
            for(var tgt=e.target; tgt!=document.documentElement; tgt=tgt.parentNode) {
                var oldScroll = tgt.scrollTop;
                tgt.scrollTop+= delta;
                if(oldScroll!=tgt.scrollTop) break;
            }
            var start = tgt.scrollTop;
            var end = start + length*mult*delta; // where to end the scroll
            var change = end - start; // base change in one step
            var step = 0; // current step
            interval = setInterval(function() {
                var pos = Math.easeOut(step++,start,change,steps);
                //window.scrollTo(0,pos);
                tgt.scrollTop = pos;
                if(step>=steps) { // scroll finished without speed up - stop by easing out
                    mult = 0;
                    clearInterval(interval);
                }
            },10);
        }
        window.addEventListener("mousewheel", MouseWheelHandler, false);
        window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }
})();
*/

/** Header Menu - change background color on scroll **/
$(document).ready(function(){
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
    })
})
/** End of Header Menu - change background color on scroll **/
