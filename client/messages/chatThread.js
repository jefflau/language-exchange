Template.chatThread.helpers({
  thread: function() {
    return Threads.findOne({_id: Session.get('currentChat')});
  },
  ownMessage: function(id) {
    return id === Meteor.userId();
  }
});

Template.chatThread.events({
  'submit form, keypress .input': function(e, template) {
    if ((e.type === 'submit') || (e.type === 'keyup' && e.which === 13) ) {
      e.preventDefault();
      var message = {
        message: template.find('#text').value,
        name: Meteor.user().profile.firstName,
        userId: Meteor.userId(),
        dateCreated: new Date()
      };
      Threads.update(Session.get('currentChat'), {$push: {messages: message}});
    }
  }
});
