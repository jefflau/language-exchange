Template.results.events({
  'click .user': function(){
    if(!Meteor.userId()) {
      Router.go('entrySignIn');
      return false;
    }

    var partnerId = this._id;
    var ids = {
      userId: Meteor.userId(),
      partnerId: partnerId
    };

    var threadExists = Threads.findOne({users: ids.userId, users: ids.partnerId});

    if(threadExists) {
      Session.set('currentChat', threadExists._id);
      $('body').addClass('active-sidebar');
    } else {
      Meteor.call('createChatThread', ids, function(err, id){
        if(err){
          console.log(err);
        } else {
          Session.set("currentChatThread", id);
          $('body').addClass('active-sidebar');
        }
      });
    }
  },
  'click .aside-button': function(e, template) {
    console.log('shit happened')
    $('body').removeClass('active-sidebar');
  }
});

Template.results.currentChat = function(){
  return !Session.equals('currentChat', null);
};
