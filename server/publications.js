Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});

Meteor.publish('allMessages', function() {
  return Threads.find();
});

Meteor.publish('myMessages', function(id) {
  return Threads.find({users: id});
});
