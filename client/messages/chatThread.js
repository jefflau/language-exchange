Template.chatThread.thread = function() {
  return Threads.findOne({_id: Session.get('currentChat')});
};

Template.chatThread.events({
  'submit form, keypress .input': function(e, template) {
    if ((e.type === 'submit') || (e.type === 'keyup' && e.which === 13) ) {
      e.preventDefault();
      var message = {
        message: template.find('#text').value,
        name: Meteor.user().profile.firstName,
        dateCreated: new Date()
      };
      Threads.update(Session.get('currentChat'), {$push: {messages: message}});
    }
  }
});
