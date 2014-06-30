Template.results.events({
  'click .user': function(){
    var partnerId = this._id;
    var ids = {
      userId: Meteor.user()._id,
      partnerId: partnerId
    };

    var threadExists = Threads.findOne({users: ids.userId, users: ids.partnerId});

    if(threadExists) {
      Session.set('currentChat', threadExists._id);
    } else {
      Meteor.call('createChatThread', ids, function(err, id){
        if(err){
          console.log(err);
        } else {
          Session.set("currentChatThread", id);
        }
      });
    }
  }
});

Template.results.currentChat = function(){
  return !Session.equals('currentChat', null);
};
