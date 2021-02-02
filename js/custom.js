var $contactForm = $('#contact-form');
function onSubmitContactForm(token) {
	$contactForm.submit();
}
$contactForm.submit(function(e) {
	e.preventDefault();
	var valid;	
	valid = validateContact();
	if(valid) {
		$.ajax({
			url: $(this).attr('action'),
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

$('#contact-form input[type="text"], #contact-form input[type="email"]').on('input', function() {
    revalidateField($(this));
});

$('#works .gallery_more a, .skills_toggle a').mouseover(function() {
    $(this).addClass('hover');
});

$('#works .gallery_more a, .skills_toggle a').mouseout(function() {
    $(this).removeClass('hover');
});

$('#works .gallery_more a, .skills_toggle a').click(function() {
    $(this).removeClass('hover');
});

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

function revalidateField(fildElement) {
    if ($.trim(fildElement.val()) != '') {
        fildElement.parent('div').children('span.info').html('');
    }
}

var maxChars = 50;

$('#contact-form #userName, #contact-form #userEmail, #contact-form #subject').keydown(function(e){
    if ($(this).val().length >= maxChars) {
        $(this).val($(this).val().substr(0, maxChars));
    }
});

$('#contact-form #userName, #contact-form #userEmail, #contact-form #subject').keyup(function(e){
    if ($(this).val().length >= maxChars) {
        $(this).val($(this).val().substr(0, maxChars));
    }
});

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
