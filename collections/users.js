Meteor.methods({
  'updateUser': function(user){
    Meteor.users.update({_id: Meteor.user()._id}, {$set: user});
  }
});
