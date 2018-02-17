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
			},
			success: function(data) {
				$("#mail-status").html("<p class='success'>Message sent!</p>");
			},
			error: function(err) {
				$("#mail-status").html("<p class='Error'>Ops, there was an error.</p>");
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

/*var green_animationjello = 'jello';
var blue_animationswing = 'swing';
var green_animationshake = 'shake';
var blue_animationflip = 'flip';
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
$('.green_body.jello p').mouseover(function(){
	$(this).addClass('animated ' + green_animationjello).one(animationEnd, function() {
		$(this).removeClass('animated ' + green_animationjello);
	});
});
$('.blue_body.swing p').mouseover(function(){
	$(this).addClass('animated ' + blue_animationswing).one(animationEnd, function() {
		$(this).removeClass('animated ' + blue_animationswing);
	});
});
$('.green_body.shake p').mouseover(function(){
	$(this).addClass('animated ' + green_animationshake).one(animationEnd, function() {
		$(this).removeClass('animated ' + green_animationshake);
	});
});
$('.blue_body.flip p').mouseover(function(){
	$(this).addClass('animated ' + blue_animationflip).one(animationEnd, function() {
		$(this).removeClass('animated ' + blue_animationflip);
	});
});*/