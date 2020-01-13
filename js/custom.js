var $contactForm = $('#contact-form');
$contactForm.submit(function(e) {
	e.preventDefault();
	var valid;	
	valid = validateContact();
	if(valid) {
		$.ajax({
			url: '//formspree.io/service@abovebits.com',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
				$("#mail-status").html("<p class='success'>Sending message…</p>");
				$('body, html').animate({ scrollTop: $('#mail-status').offset().top-85 }, 1000);
			},
			success: function(data) {
				$("#mail-status").html("<p class='success'>Message sent!</p>");
				$('body, html').animate({ scrollTop: $('#mail-status').offset().top-85 }, 1000);
				$('#contact-form')[0].reset();
			},
			error: function(err) {
				$("#mail-status").html("<p class='Error'>Ops, there was an error.</p>");
				$('body, html').animate({ scrollTop: $('#mail-status').offset().top-85 }, 1000);
			}



		});

	};
});

$('#mail-status').click(function() {
  $(this).html(" ");
})

function validateContact() {
	var valid = true;	
	$(".demoInputBox").css('background-color','');
	$(".info").html('');
	
	if(!$("#userName").val()) {
		$("#userName-info").html("(required)");
		//$("#userName").css('background-color','#FFFFDF');
		valid = false;
	}
	if(!$("#userEmail").val()) {
		$("#userEmail-info").html("(required)");
		//$("#userEmail").css('background-color','#FFFFDF');
		valid = false;
	}
	if(!$("#userEmail").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
		$("#userEmail-info").html("(invalid)");
		//$("#userEmail").css('background-color','#FFFFDF');
		valid = false;
	}
	if(!$("#subject").val()) {
		$("#subject-info").html("(required)");
		//$("#subject").css('background-color','#FFFFDF');
		valid = false;
	}
	if(!$("#content").val()) {
		$("#content-info").html("(required)");
		//$("#content").css('background-color','#FFFFDF');
		valid = false;
	}
	
	return valid;
}
/**Header progress bar**/
$(window).load(function(){
    $(window).scroll(function() {
        var wintop = $(window).scrollTop(), docheight = $('body').height(), winheight = $(window).height();
        //console.log(wintop);
        var totalScroll = (wintop/(docheight-winheight))*100;
        //console.log("total scroll" + totalScroll);
        $(".KW_progressBar").css("width",totalScroll+"%");
    });

});
/**End of Header progress bar**/
