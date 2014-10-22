Template.messages.helpers({
  threads: function() {
    var threads = Threads.find({users: Meteor.userId()}, {sort: {lastMessage: -1}});
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
  },
  hasThreads: function(){
    return Threads.find({users: Meteor.userId()}).count() > 0 ? true : false;
  },
  hasUnread: function(unread){
    console.log(unread[Meteor.userId()]);
    return unread[Meteor.userId()] > 0 ? 'unread' : '';
  }
});

Template.messages.events({
  'click .inbox-message': function(e, template) {
      Session.set('currentChat', this._id);
      $('body').addClass('active-sidebar');
      var amount = this.unread[Meteor.userId()];
      var key = 'unread.' + Meteor.userId();
      var action = {};
      action[key] = 0;
      Threads.update({_id: this._id}, {$set: action}, function(err){
        if(err){
          console.error(err);
        } else {
          Meteor.call('decrementUnread', amount);
        }
      });
  },
  'click .aside-button': function(e, template) {
    $('body').removeClass('active-sidebar');
  }
});
