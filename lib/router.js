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
    },
    data: function(){
      var query = Session.get('searchQuery');
      return Meteor.users.find({"profile.targetLanguage": query.targetLanguage, "profile.nativeLanguage": query.nativeLanguage});
    }
  });
  this.route('chatThread', {
    path: "/:_id"
  });
  this.route('profile', {
    path: "/profiles/:_id",
    data: function(){
      return Meteor.user();
    }
  });
});
