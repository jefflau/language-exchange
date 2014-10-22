Template.header.helpers({
	userId: function() {
	  return Meteor.userId();
	},
	hasUnread: function(){
		var unread = Meteor.user().profile.unread;
		return unread > 0 ? '(' + unread + ')' : '';
	}
});

Template.header.events({
	'click .nav-button': function(e, template){
		e.preventDefault();
		$('body').toggleClass('active-nav');
	},
	'click .main-nav a': function(){
		$('body').removeClass('active-nav');
	}
});
