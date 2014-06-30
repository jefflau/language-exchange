Template.chatThread.thread = function() {
  return Threads.findOne({_id: Session.get('currentChat')});
};

Template.chatThread.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var message = {
      message: template.find('#text').value,
      name: Meteor.user().profile.firstName,
      dateCreated: new Date()
    };

    Threads.update(Session.get('currentChat'), {$push: {messages: message}});
  }
});
