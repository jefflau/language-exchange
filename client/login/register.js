var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var isValidPassword = function(val) {
  return val.length >= 6 ? true : false; 
};

var isNotEmpty = function(val) {
	val.length > 0;
};

var isGreaterThanTwo = function(val) {

};

var isTargetNativeDifferent = function(lang1, lang2) {
	return lang1 === lang2 ? true : false; 
};

var removeInvalid = function(){
	$('form input').removeClass('invalid');
};

Template.register.events({
  "submit form": function(e, template) {
    e.preventDefault();
    removeInvalid();
    var formValid = true;
    var email = trimInput(template.find('#email').value);
    var password = template.find('#password').value;

    var profile = {
      firstName: template.find('#firstName').value,
      lastName: template.find('#lastName').value,
      country: template.find('#country').value,
      city: template.find('#city').value,
      targetLanguage: EJSON.parse(template.find('#targetLanguage').value),
      nativeLanguage: EJSON.parse(template.find('#nativeLanguage').value),
      age: template.find('#age').value,
      bio: template.find('#bio').value
    };

    if(!isValidPassword(password)) {
    	$('#password').addClass('invalid');
    	formValid = false;
    }

    if(formValid === true){
	    Accounts.createUser({ email: email, password: password, profile: profile }, function(){
	    	Router.go('home');
	    	console.log(Meteor.user());
	    });
  	}
  }
});