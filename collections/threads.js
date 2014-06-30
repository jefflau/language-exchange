Threads = new Meteor.Collection('threads');

Meteor.methods({
  'createChatThread': function(ids){
    //create chatthread
    var thread = {
      messages: [],
      dateCreated: new Date(),
      lastMessage: null,
      users: [ids.userId, ids.partnerId]
    };

    threadId = Threads.insert(thread);

    var threadRef = {
      threadId: threadId,
      partnerId: ids.partnerId
    };

    var threadRef2 = {
      threadId: threadId,
      partnerId: ids.userId
    };

    //create references to it in both user accounts
    Meteor.users.update({_id: ids.userId}, {$push: {threads: threadRef}});
    Meteor.users.update({_id: ids.partnerId}, {$push: {threads: threadRef2}});

    return threadId;
  }
});
