$(window).on('load', function () {
	/*** Preloader ***/
    var $preloader = $('#p_prldr'),
        $svg_anm   = $preloader.find('.svg_anm');
    $svg_anm.fadeOut();
    $preloader.delay(500).fadeOut('slow');
});

$(document).ready( function() {

	/*** Slider ***/
	var owl = $(".owl-carousel.owl-carouse-order");
	owl.owlCarousel({
	    margin: 10,
	    loop: true,
	    nav: true,
	    navText: ['<img src="./images/vector-left.svg">','<img src="./images/vector-right.svg">'],
		responsive:{
			0:{ items:2 },
			600:{ items:3 },
			1000:{ items:6 }
		}	    
	});	
	
	/*** Select Compatibility ***/
	$('.compatibility-block input').click(function(){
		if ($(this).is(':checked')){
			$(this).parent().parent().addClass('active');
		} else {
			$(this).parent().parent().removeClass('active');
		}

		var compatibility = $('input:checkbox:checked.compatibility-checkbox').map(function(){
			return this.value; 
		}).get().join(", ");
		
		$('.compatibility-type').text(compatibility);
		$('.compatibility-result').text(compatibility);
		
	});
	
	/*** Turnaround Time ***/
	var turnaround_time = 'standard';
	$('.radio-turnaround input').click(function(){
		$('.radio-turnaround').removeClass('active');
		if ($(this).is(':checked')){
			$(this).parent().addClass('active');
		}

		turnaround_time = $('input[name=turnaround]:checked').val();

		checkedTurnaroundTime(technology, count_page, turnaround_time)

	});
	
	/*** Technology Choice ***/
	var technology = 'Front-End';
	$('.block-product').click(function(){
		$('.block-product').removeClass('active');
		$(this).addClass('active');

		var logo = $(this).clone().find("svg")[0];
		$('.logo-rc').html(logo);

		technology = $(this).clone().find(".title-product").text();
		checkedTechnology(technology, count_page);
		countPage(technology, count_page);
	});


	/***  Number of Pages ***/
	var count_page = 1;
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
	    countPage(technology, count_page);
	});

	$('.count-np').on('click', function(){
		count_page = $("input[name='num_pages']").val();
		countPage(technology, count_page);
	});


	function checkedTurnaroundTime(technology, count_page, turnaround_time) {

		switch (technology) {
			case 'Front-End':
				turnaround_time == 'Standard Turnaround' ? turnaroundTimeCheckedDay(count_page, 4, 3, turnaround_time) : turnaroundTimeCheckedDay(count_page, 2, 4,turnaround_time);
				break;
			case 'WordPress':
				turnaround_time == 'Standard Turnaround' ? turnaroundTimeCheckedDay(count_page, 4, 3, turnaround_time) : turnaroundTimeCheckedDay(count_page, 2, 4, turnaround_time);
				break;
			case 'Magento':
				turnaround_time == 'Standard Turnaround' ? turnaroundTimeCheckedDay(count_page, 5, 2, turnaround_time) : turnaroundTimeCheckedDay(count_page, 2, 4, turnaround_time);
				break;
			case 'WooCommerce':
				turnaround_time == 'Standard Turnaround' ? turnaroundTimeCheckedDay(count_page, 4, 3, turnaround_time) : turnaroundTimeCheckedDay(count_page, 2, 4, turnaround_time);
				break;												
			default:
		}


	}

	function turnaroundTimeCheckedDay(count_page, homepage, count_page_in_day, turnaround_time) {
		var total_days;
		if(count_page == 1){
			total_days = homepage;
		}else{
			total_days = Math.ceil( (count_page - 1) / count_page_in_day ) + homepage; 
		}

		//console.log(turnaround_time);
		$('.t-title').text(turnaround_time);

		
	}

	function checkedTechnology(technology, count_page) {
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

	function countPage(technology, count_page) {
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

