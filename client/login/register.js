Template.register.events({
  "submit form": function(e, template) {
    e.preventDefault();
    Validation.removeInvalid();
    var formValid = true;
    var email = Validation.trimInput(template.find('#email').value);
    var password = template.find('#password').value;
    var targetLanguage = template.find('#targetLanguage').value;
    var nativeLanguage = template.find('#nativeLanguage').value;

    if(targetLanguage.length > 0){
      targetLanguage = EJSON.parse(targetLanguage);
    }

    if(nativeLanguage.length > 0){
      nativeLanguage = EJSON.parse(nativeLanguage);
    }

    var profile = {
      firstName: template.find('#firstName').value,
      lastName: template.find('#lastName').value,
      country: template.find('#country').value,
      city: template.find('#city').value,
      targetLanguage: targetLanguage,
      nativeLanguage: nativeLanguage,
      age: template.find('#age').value,
      bio: template.find('#bio').value,
      unread: 0
    };

    $('.required').each(function(){
      var id = $(this).attr('for');
      var input = $('#'+id);
      if(!Validation.isNotEmpty(input.val())){
        $(input).addClass('invalid');
        formValid = false;
      }
    });

    if(!Validation.isValidPassword(password)) {
    	$('#password').addClass('invalid');
    	formValid = false;
    };

    if(!Validation.isTargetNativeDifferent(profile.targetLanguage.code, profile.nativeLanguage.code)){
      $('#nativeLanguage').addClass('invalid');
      $('#targetLanguage').addClass('invalid');
      formValid = false;
    };


    if(formValid === true){
	    Accounts.createUser({ email: email, password: password, profile: profile }, function(err){
        if(err) {
          if(err.reason === "Email already exists.") {
            Notifications.error(err.reason, 'Please use a different email');
          }
        } else {
  	    	Router.go('home');
        }
	    });
  	}
  }
});