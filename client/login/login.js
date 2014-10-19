Template.login.helpers({

});

Template.login.events({
	'submit form': function(event, template) {
		event.preventDefault();
		var email = template.find('#login-email').value;
		var password = template.find('#login-password').value;

		Meteor.loginWithPassword(email, password, function(err){
			if(err){
				console.error(err);
			} else {
				Meteor.call('updateLastLogin');
				Router.go('home');
			}
		})
		console.log('signing in');
	}
});
