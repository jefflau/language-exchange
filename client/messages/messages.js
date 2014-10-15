Template.messages.helpers({
  threads: function() {
    var threads = Threads.find({users: Meteor.userId()});
    return threads.map(function(thread){
      var partnerId;
      var partner;
      thread.users.map(function(userId){
        if(userId != Meteor.userId()) {
          partnerId = userId;
        }
      });

      partner = Meteor.users.find({_id: partnerId}).fetch();

      thread.firstName = partner[0].profile.firstName;
      thread.lastName = partner[0].profile.lastName;
      thread.partnerId = partner[0]._id;
      return thread;
    });
  },
  currentChat: function(){
    return !Session.equals('currentChat', null);
  },
  lastMessage: function(messages){
    return messages[messages.length-1];
  }
});

Template.messages.events({
  'click .inbox-message': function(e, template) {
      Session.set('currentChat', this._id);
  }
});
