Template.chatThread.helpers({
  thread: function() {
    return Threads.findOne({_id: Session.get('currentChat')});
  },
  ownMessage: function(id) {
    return id === Meteor.userId();
  },
  scrollBottom: function(animate) {
    var chatThread = $('.chat-thread');
    var scrollTop = parseInt(chatThread.find('ul').css('height')) + chatThread.find('.chat-input').height() - chatThread.height();

    if(animate === true) {
      chatThread.animate({scrollTop: scrollTop}, '500', 'swing');
    } else {
      chatThread.scrollTop(scrollTop);
    }
  }
});

Template.chatThread.rendered = function() {
  Template.chatThread.scrollBottom();
};

Template.chatThread.events({
  'submit form, keypress .input': function(e, template) {
    if ((e.type === 'submit') || (e.type === 'keyup' && e.which === 13) ) {
      e.preventDefault();
      var text = template.find('#text');
      var message = {
        message: text.value,
        name: Meteor.user().profile.firstName,
        userId: Meteor.userId(),
        dateCreated: new Date()
      };
      Threads.update(Session.get('currentChat'), {$push: {messages: message}}, function(err){
        if(err)
          console.error(err);
        else
          text.value = "";
      });

      Template.chatThread.scrollBottom(true);

    }
  }
});
