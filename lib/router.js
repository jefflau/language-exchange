Router.configure({
  layoutTemplate: "layout"
});

Router.map(function(){
  this.route('home', {
    path: "/"
  });
  this.route('results', {
    path: "/results",
    waitOn: function(){
      Meteor.subscribe('allUsers');
      Meteor.subscribe('myMessages', Meteor.userId());
    },
    data: function(){
      var query = Session.get('searchQuery');
      return Meteor.users.find({
        _id: {$ne: Meteor.userId()},
        "profile.targetLanguage.code": query.targetLanguage,
        "profile.nativeLanguage.code": query.nativeLanguage
      });
    }
  });
  this.route('messages', {
    onBeforeAction: function(){
      Session.set('currentChat', null);
    },
    path: "/messages",
    waitOn: function() {
      Meteor.subscribe('allUsers');
      Meteor.subscribe('myMessages', Meteor.userId());
    }
  });
  this.route('profile', {
    path: "/profile",
    waitOn: function() {
      Meteor.subscribe('allLanguages');
    },
    data: function(){
      return Meteor.user();
    }
  });
});
