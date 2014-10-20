Template.results.events({
  'click .user': function(){

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
          console.error(err);
        } else {
          Session.set("currentChatThread", id);
          $('body').addClass('active-sidebar');
        }
      });
    }
  },
  'click .aside-button': function(e, template) {
    $('body').removeClass('active-sidebar');
  }
});

Template.results.helpers({ 
  currentChat: function(){
    return !Session.equals('currentChat', null);
  },
  hasData: function(data) {
    return data.count() > 0 ? true : false; 
  }
});
