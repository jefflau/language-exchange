Template.threads.threads = function() {
  return Threads.find();
};

Template.threads.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var thread = {
      name: template.find("#threadName").value,
      messages: []
    };

    Threads.insert(thread);
  }
});

Template.chatThread.thread = function() {
  return Threads.findOne({_id: Router.current().params._id});
};

Template.chatThread.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var message = {
      message: template.find('#text').value,
      name: Meteor.user().emails[0].address
    };

    Threads.update(Router.current().params._id, {$push: {messages: message}});
  }
});
