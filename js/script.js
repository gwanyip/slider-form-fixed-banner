// Defining Heart Hero function

var heartHeroForm = (function(){
	
	var state = "closed";
	var $title = $(".hearthero-form-title h3");
	var $titleBtn = $(".hearthero-form-title button");
	var $successPage = $(".hearthero-form-body .hearthero-form-success");
	var $form = $(".hearthero-form-body form");

	function heartHeroForm() {
		// Initalizing form validation
		var self = this;
		this.validator = $form.validate({
		  submitHandler: function($form) {
		    $('#agree_submit').attr("disabled", "disabled").addClass("agree_submit_loading");
			$('#formloader').css('display','inline');
			setTimeout(function(){
				console.log('finished loading');
				self.successState();
				// $form.submit(function(e){     
		        //     e.preventDefault();
		        //    
			    //       $.post($form.attr('action'), $form.serialize())
			    //       	.always(function(){
			    //       		self.successState();
			    //       	});
			    //   });
			}, 3000);
		  }
		});
	}
	// Default state
	heartHeroForm.prototype.closedState = function(){
		state = "closed";
		$title.text("Got a story to share? Send it to us and you might see it on this page!");
		if($titleBtn.hasClass("hearthero-form-title-btn-close")){
			$titleBtn.removeClass().addClass("hearthero-form-title-btn-open");
		}
		$successPage.css("disply", "none");
		$form.slideToggle('slow');
	}
	// Open state
	heartHeroForm.prototype.openedState = function(){
		state = "open";
		$title.text("Share your story by filling out the form below.");
		if($titleBtn.hasClass("hearthero-form-title-btn-open")){
			$titleBtn.removeClass().addClass("hearthero-form-title-btn-close");
		}
		$successPage.css("disply", "none");
		$form.slideToggle('slow');
	}
	// Success state
	heartHeroForm.prototype.successState = function(){
		state = "success";
		$title.text("Your story has been successfully submitted!");
		if($titleBtn.hasClass("hearthero-form-title-btn-open")){
			$titleBtn.removeClass().addClass("hearthero-form-title-btn-close");
		}
		$successPage.css("display", "block");
		$form.css("display","none");
	}
	// End session
	heartHeroForm.prototype.endSession = function(){
		state = "closed";
		$title.text("Got a story to share? Send it to us and you might see it on this page!");
		if($titleBtn.hasClass("hearthero-form-title-btn-close")){
			$titleBtn.removeClass().addClass("hearthero-form-title-btn-open");
		}
		$successPage.slideToggle();
		$form.css("display", "none");
		$('#agree_submit').removeAttr("disabled").removeClass("agree_submit_loading");
		$('#formloader').css('display','none');
	}
	// Get state
	heartHeroForm.prototype.getState = function(){
		return state;
	}

	return heartHeroForm;

}())

// Setting new heartHeroForm
var form = new heartHeroForm;

// Tying state of form to click event
$("#hearhero-form-btn").click(function(){
	// console.log(form.getState());
	if (form.getState() == "closed") {
		console.log("click open")
		form.openedState();
		// lock scroll position when form is opened
	      // var scrollPosition = [
	      //   self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
	      //   self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
	      // ];
	      // var html = jQuery('html');
	      // html.data('scroll-position', scrollPosition);
	      // html.data('previous-overflow', html.css('overflow'));
	      // html.css('overflow', 'hidden');
	      // window.scrollTo(scrollPosition[0], scrollPosition[1]);
	} else if (form.getState() == "open") {
		console.log("click close")
		form.closedState();
		// unlock scroll position when form is closed
		// var html = jQuery('html');
	 //      var scrollPosition = html.data('scroll-position');
	 //      html.css('overflow', html.data('previous-overflow'));
	 //      window.scrollTo(scrollPosition[0], scrollPosition[1])
	} else if (form.getState() == "success") {
		console.log("end session")
		form.endSession();
	}
});

// Adding functionality to success close button
$("#successBtnClose").click(function(){
	form.endSession();
})

// Adding functionality to success another button
$("#successBtnAnother").click(function(){

})

// Fixed form title bar to bottom of the browser that sticks to top of footer
// $(window).scroll(function(){
// 	var $heartHeroForm = $(".hearthero-form"); 

// 	if(($(window).scrollTop() + window.innerHeight) >= $('footer').offset().top){
// 		console.log("go home");
// 		$heartHeroForm.css('position','relative');
// 	} else {
// 		$heartHeroForm.css('position','fixed');
// 	}
// })