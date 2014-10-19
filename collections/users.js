Meteor.methods({
  'updateUser': function(user){
    Meteor.users.update({_id: Meteor.userId()}, {$set: user});
  },
  'updateLastLogin': function(){
  	var date = new Date();
  	Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.lastLogin': date}});
  }
});
