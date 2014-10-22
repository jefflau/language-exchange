var scrollBottom = function(animate) {
  var chatThread = $('.chat-thread');
  var scrollTop = parseInt(chatThread.find('ul').css('height')) + chatThread.find('.chat-input').height() - chatThread.height();

  if(animate === true) {
    chatThread.animate({scrollTop: scrollTop}, '500', 'swing');
  } else {
    chatThread.scrollTop(scrollTop);
  }
}

Template.chatThread.helpers({
  thread: function() {
    return Threads.findOne({_id: Session.get('currentChat')});
  },
  ownMessage: function(id) {
    return id === Meteor.userId();
  }
});

Template.chatThread.rendered = function() {
  scrollBottom();
};

Template.chatThread.events({
  'submit form, keypress .input': function(e, template) {
    if ((e.type === 'submit') || (e.type === 'keyup' && e.which === 13) ) {
      e.preventDefault();

      var text = template.find('#text'),
          message = {
            message: text.value,
            name: Meteor.user().profile.firstName,
            userId: Meteor.userId(),
            dateCreated: new Date()
          },
          partnerId;

      Threads.findOne(Session.get('currentChat')).users.map(function(userId){
        if(userId != Meteor.userId()) {
          partnerId = userId;
        }
      });

      var key = 'unread.' + partnerId;
      var action = {};
      action[key] = 1;
      
      Threads.update(Session.get('currentChat'), 
      {
        $push: {messages: message},
        $set: {lastMessage: message.dateCreated},
        $inc: action
      }, function(err){
        if(err) {
          console.error(err);
        }
        else {
          text.value = "";
          Meteor.call('incrementUnread', partnerId, function(err, resp){
            if(err){
              console.error(err);
            } else {
              console.log(resp);
            }
          });
        }
      });

      scrollBottom(true);

    }
  }
});
