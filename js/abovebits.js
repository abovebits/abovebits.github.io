$(document).ready( function() {
	 // executes when complete page is fully loaded, including all frames, objects and images
	/*var owl = jQuery('.owl-carousel').owlCarousel({
		loop:true,
		autoplay: 2000,
		autoplaySpeed: 3000,
		autoWidth:true,
		margin:125,
	});*/
    
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
		markers: [
		  {latLng: [50.01, 36.18], name: 'Kharkiv, Ukraine (Field office)'},
		  {latLng: [50.45, 30.52], name: 'Kiyv, Ukraine (Field office)'},
		  {latLng: [53.90, 27.56], name: 'Minsk, Belarus (Field office)'},
		  {latLng: [40.71, -74.00], name: 'New York, USA (Field office)'},
		  {latLng: [40.43,  -79.99], name: 'Pittsburgh, USA (Field office)'},
		  {latLng: [34.05, -118.24], name: 'Los Angeles, USA (Head office)', style: {r: 10, /*fill: 'red', image: 'images/favicon/icon_agency64х64.png'*/}},
		]
	});
	
/*See More button*/
	var i=0;
	function gallery(){
		var screenWidth = document.documentElement.clientWidth;
		var galleryCount = Math.floor(screenWidth/376);
			if (galleryCount == 0) galleryCount = 1;
			if (screenWidth == 1024 || screenWidth == 1366) galleryCount = Math.floor(screenWidth/316);
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
	}
	 gallery();
	 
	 $('#seemore').click(function (e) {
		 e.preventDefault();
		 gallery();
		 
	 });


/*End of see more button*/

});
new WOW().init();

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
});