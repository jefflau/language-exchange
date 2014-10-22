Meteor.methods({
  'updateUser': function(user){
    Meteor.users.update({_id: Meteor.userId()}, {$set: user});
  },
  'updateLastLogin': function(){
  	var date = new Date();
  	Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.lastLogin': date}});
  },
  'incrementUnread': function(id){
  	return Meteor.users.update({_id: id}, {$inc: {'profile.unread': 1}});
  },
  'decrementUnread': function(amount){
    amount = - amount;
    Meteor.users.update({_id: Meteor.userId()}, {$inc: {'profile.unread':  amount}});
  }
});
