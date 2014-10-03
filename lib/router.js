Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading"
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
      console.log(this.params);
      var query = this.params.form;
      return Meteor.users.find({
        _id: {$ne: Meteor.userId()},
        "profile.targetLanguage.code": this.params.targetLanguage,
        "profile.nativeLanguage.code": this.params.nativeLanguage
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

Router.onBeforeAction('loading');
