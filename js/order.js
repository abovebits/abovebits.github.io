$(window).on('load', function () {
	/*** Preloader ***/
    var $preloader = $('#p_prldr'),
        $svg_anm   = $preloader.find('.svg_anm');
    $svg_anm.fadeOut();
    $preloader.delay(500).fadeOut('slow');
});

$(document).ready( function() {

	// Settings
	var turnaround_time = 'Standard Turnaround';
	var technology = 'Front-End';
	var count_page = 1;
	var compatibility = 'desktop';
	var total_price = 0;

	var price_info = {
		"Standard Turnaround": {
			"WordPress": {
				"homepage_price": 97,
				"homepage": 4,
				"page": 3,
				"integration": 158,
				"desktop": 48,
				"table": 28,
				"mobile": 38
			},
			"Front-End": {
				"homepage_price": 97,
				"homepage": 4,
				"page": 3,				
				"integration": 0,
				"desktop": 48,
				"table": 28,
				"mobile": 38
			},
			"WooCommerce": {
				"homepage_price": 97,
				"homepage": 4,
				"page": 3,				
				"integration": 374,
				"desktop": 48,
				"table": 28,
				"mobile": 38
			},
			"Magento": {
				"homepage_price": 97,
				"integration": 500,
				"desktop": 48,
				"table": 28,
				"mobile": 38
			},	
			"Email": {
				"homepage_price": 0,
				"homepage": 4,
				"page": 3,				
				"integration": 0,
				"desktop": 98,
				"table": 0,
				"mobile": 38
			},
			"Laravel": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 0,
				"desktop": 68,
				"table": 0,
				"mobile": 48
			},
			"Opencart": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 0,
				"desktop": 68,
				"table": 0,
				"mobile": 48
			},
			"Shopify": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 0,
				"desktop": 68,
				"table": 0,
				"mobile": 48
			},																					
		},
		"Express Turnaround": {
			"WordPress": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 200,
				"desktop": 68,
				"table": 38,
				"mobile": 48
			},
			"Front-End": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 0,
				"desktop": 68,
				"table": 38,
				"mobile": 48
			},
			"WooCommerce": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 400,
				"desktop": 68,
				"table": 38,
				"mobile": 48
			},
			"Magento": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 600,
				"desktop": 68,
				"table": 38,
				"mobile": 48
			},
			"Email": {
				"homepage_price": 0,
				"homepage": 2,
				"page": 4,				
				"integration": 0,
				"desktop": 138,
				"table": 0,
				"mobile": 48
			},	
			"Laravel": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 0,
				"desktop": 68,
				"table": 0,
				"mobile": 48
			},
			"Opencart": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 0,
				"desktop": 68,
				"table": 0,
				"mobile": 48
			},	
			"Shopify": {
				"homepage_price": 138,
				"homepage": 2,
				"page": 4,				
				"integration": 0,
				"desktop": 68,
				"table": 0,
				"mobile": 48
			},																						
		}
	};
	
	//var offset = $('#fixed-right-column').offset();

	    var box = $('.fixed-right-column'); // float-fixed block
	    var width_column = $('.right-column').width()+4;
	    var top = box.offset().top - parseFloat(box.css('marginTop').replace(/auto/, 0)) + 125;

	    //console.log(top);

	    var windowpos = 0;
		$( window ).resize(function() {
			top = box.offset().top - parseFloat(box.css('marginTop').replace(/auto/, 0)) + 125;
			width_column = $('.right-column').width()+4;
			console.log(top);
		});

	    $(window).scroll(function(){
	    	if($(window).width() > 991){
		        windowpos = $(window).scrollTop();
		        // console.log('test-2: '+windowpos);
		        // console.log('top-2: '+top);
		        if(windowpos < top) {
		            box.css('position', 'static');
		            box.css('width', '100%');
		        } else {
		            box.css('position', 'fixed');
		            box.css('top', 70);
		            box.css('width', width_column);
		        }
	    	}else{
	            box.css('position', 'static');
	            box.css('width', '100%'); 		
	    	}
	    });



	/***Back to TOP***/
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

	/*** Slider ***/
	var owl = $(".owl-carousel.owl-carouse-order");
	owl.owlCarousel({
	    margin: 10,
	    loop: false,
	    nav: true,
	    navText: ['<img src="./images/vector-left.svg">','<img src="./images/vector-right.svg">'],
		responsive:{
			0:{ items:2 },
			600:{ items:3 },
			1300:{ items:6 }
		}	    
	});	
	
	/*** Select Compatibility ***/
	$('.compatibility-block input').click(function(){
		if ($(this).is(':checked')){
			$(this).parent().parent().addClass('active');
		} else {
			$(this).parent().parent().removeClass('active');
		}

		compatibility = $('input:checkbox:checked.compatibility-checkbox').map(function(){
			return this.value; 
		}).get().join(", ");

		checkedTurnaroundTime();
		$('.compatibility-type').text(compatibility);
		$('.compatibility-result').text(compatibility);
		
	});
	
	/*** Turnaround Time ***/
	$('.radio-turnaround input').click(function(){
		$('.radio-turnaround').removeClass('active');
		if ($(this).is(':checked')){
			$(this).parent().addClass('active');
		}

		turnaround_time = $('input[name=turnaround]:checked').val();
		checkedTurnaroundTime();

	});
	
	/*** Technology Choice ***/
	$('.block-product').click(function(){
		$('.block-product').removeClass('active');
		$(this).addClass('active');

		var logo = $(this).clone().find("svg")[0];
		$('.logo-rc').html(logo);

		technology = $(this).clone().find(".title-product").text();
		checkedTechnology();
		countPage();
		checkedTurnaroundTime();
	});


	/***  Number of Pages ***/
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });

    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

	$('#field-pages').on('keyup', function(){
	    $(this).val($(this).val().replace (/\D/, ''));
	    if($(this).val() == 0){
	    	$(this).val(1);
	    }
	    count_page = $(this).val();
	    countPage();
	    checkedTurnaroundTime();
	});

	$('.count-np').on('click', function(){
		count_page = $("input[name='num_pages']").val();
		countPage();
		checkedTurnaroundTime();
	});


	function checkedTurnaroundTime() {

		var homepage = price_info[turnaround_time][technology]['homepage'];
		var page = price_info[turnaround_time][technology]['page'];
		var integration = price_info[turnaround_time][technology]['integration'];
		var homepage_price = price_info[turnaround_time][technology]['homepage_price'];

		var device = compatibility.split(', ');
		var total_sum_device = 0;

		$.each(device,function(index,value){
			total_sum_device += Number(price_info[turnaround_time][technology][value]);
			if(index > 0){
				homepage_price += Number(price_info[turnaround_time][technology][value]);
			}
		});

		var total_days;
		if(count_page == 1){
			total_days = homepage;
			$('.t-page').text(count_page + ' page');
		}else{
			total_days = Math.ceil( (count_page - 1) / page ) + homepage;
			$('.t-page').text(count_page + ' pages'); 
		}

		$('.t-title').text(turnaround_time);
		$('.t-day').text(total_days + ' business days');

		if(turnaround_time == 'Standard Turnaround'){
			$('.turnaround-result').text('Standard - '+ total_days +' b. days');
		}else{
			$('.turnaround-result').text('Express - '+ total_days +' b. days');
		}

		if(integration > 0){
			$('.integration-title span').text(technology);
			$('.integration-price span').text(integration);
			$('.breakdown-integration').show();
		}else{
			$('.integration-title span').text('None');
			$('.integration-price span').text('0');			
			$('.breakdown-integration').hide();
		}


		if( technology != 'Email' ){
			$('.title-homepage').text('Homepage');
			$('.homepage_breakdown .price-breakdown').text(homepage_price);
			$('.homepage_breakdown .count-breakdown').text('1');
			if(count_page > 1){
				var count_inner_page = count_page-1;
				$('.count-inner-page span').text(count_inner_page);
				$('.count-p').text(count_inner_page);
				$('.count-price').text(total_sum_device);
				$('.breakdown-inner').show();

				total_price = (count_inner_page * total_sum_device) + homepage_price + integration;
				$('.total-price span').text(total_price);

			}else{
				$('.count-inner-page span').text(0);
				$('.count-p').text(0);
				$('.count-price').text(0);
				$('.breakdown-inner').hide();
				total_price = homepage_price + integration;
				$('.total-price span').text(total_price);								
			}
		}else{
			$('.breakdown-inner').hide();
			
			var name_templete = count_page > 1 ? ' Email Templates' : ' Email Template';
			$('.title-homepage').text(count_page + name_templete);
			$('.homepage_breakdown .count-breakdown').text(count_page);
			$('.homepage_breakdown .price-breakdown').text(total_sum_device);

			total_price = total_sum_device * count_page;
			$('.total-price span').text(total_price);

		}

	}


	$(document).on("submit","#order-form", function (event) {


	    if ( validateForm() ) {
	    	event.preventDefault();
	    }else{
	    	event.preventDefault();

		    var input_name = $("input[name='name']").val();
		    var input_email = $("input[name='email']").val();
		    var input_instructions = $("textarea[name='instructions']").val();

			if ($('#field-samples-section').is(':checked')){
				input_samples_section = true;
			} else {
				input_samples_section = false;
			}

			var data = {
				"Name": input_name,
				"Email": input_email,
				"Instructions": input_instructions,
				"Samples Section": input_samples_section,
				"Technology": technology,
				"Count Page": count_page,
				"Compatibility": compatibility,
				"Turnaround Time": turnaround_time,
				"Total Price": '$'+total_price,
			};

			//console.log(data);

			$.ajax({
				url: 'https://formspree.io/xbjzdaly',
				method: 'POST',
				data: data,
				dataType: 'json',
				beforeSend: function() {
				},
				success: function(data) {
					$('#order-form')[0].reset();
				    $("input[name='name']").val('');
				    $("input[name='email']").val('');
				    $("textarea[name='instructions']").val('');

				    $('#order-form').before('<div class="text-success">We will contact you shortly</div>');
				},
				error: function(err) {
					$('#order-form').before('<div class="text-error">Ops, there was an error.</div>');
				}

			});


	    }


	});

	function validateForm() {
		checkedTurnaroundTime();
		$(".text-success").remove();
		$(".text-error").remove();

		var input_name = $("input[name='name']");
		var el_e    = $("input[name='email']");

	    input_name.css('border','2px solid #D8D8D8');
	    el_e.css('border','2px solid #D8D8D8');

	    //input_name.css('border','2px solid red');

	    if ( input_name.val().length < 1 ) {
	    	var v_login = true;
	      //input_name.after('<span class="text-error for-login">(required)</span>');
	    	input_name.css('border','2px solid red');
	    } 
	    //$(".top-input").toggleClass('error', v_login );

		var reg     = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
	    
	    var v_email = el_e.val()?false:true;
	  
	    if ( v_email ) {
	      //el_e.after('<span class="text-error">(required)</span>');
	      el_e.css('border','2px solid red');
	    } else if ( !reg.test( el_e.val() ) ) {
	      v_email = true;
	      //el_e.after('<span class="text-error">(invalid)</span>');
	      el_e.css('border','2px solid red');
	    }
	    //$("#email").toggleClass('error', v_email );

	    return ( v_login || v_email  );
	}

	function checkedTechnology() {
		var html_text = technology + '<span><br/>Development</span>';
		if(technology == 'Email'){
			html_text = technology + '<span><br/>Coding</span>';
			$('.number-class').html('Number of Templates');
			$('.compatibility-center').hide();
		}else{
			$('.number-class').html('Number of Pages');
			$('.compatibility-center').show();
		}
		$('.title-rc').html(html_text);
	}

	function countPage() {
	    if( technology == 'Email' ){
	    	if(count_page == 1){
	    		$('.count-page').text(count_page + ' Template');
	    		$('.count-page-result').text(count_page + ' template');
	    	}else{
	    		$('.count-page').text(count_page + ' Templates');
	    		$('.count-page-result').text(count_page + ' templates');
	    	}	
	    }else{
	    	if(count_page == 1){
	    		$('.count-page').text('1 Homepage');
	    		$('.count-page-result').text(count_page + ' page');
	    	}else if(count_page == 2){
	    		$('.count-page').text('1 Homepage + ' + (count_page - 1) + ' inner page');
	    		$('.count-page-result').text(count_page + ' pages');
	    	}else{
	    		$('.count-page').text('1 Homepage + ' + (count_page - 1) + ' inner pages');
	    		$('.count-page-result').text(count_page + ' pages');
	    	}
	    }		
	}

});

