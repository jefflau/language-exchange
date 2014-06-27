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
