Router.configure({
  layoutTemplate: "layout",
  loadingTemplate: "loading"
});

Router.map(function(){
  this.route('home', {
    path: "/",
    waitOn: function() {
      Meteor.subscribe('allLanguages');
    }
  });
  this.route('login', {
    path: "/login"
  });
  this.route('logout', {
    path: "/logout",
    onBeforeAction: function(){
      Meteor.logout(function(){
        Router.go('home');
      });
    }
  });
  this.route('register', {
    path: "/register"
  });
  this.route('forgotPassword', {
    path: "/forgotPassword",
    onBeforeAction: function(){
      if (Accounts._resetPasswordToken) {
        Session.set('resetPassword', Accounts._resetPasswordToken);
      } 
    }
  });
  this.route('results', {
    path: "/results",
    waitOn: function(){
      Meteor.subscribe('allUsers');
      Meteor.subscribe('myMessages', Meteor.userId());
    },
    data: function(){
      var query = this.params.form;
      if(this.params.city === '') {
        return Meteor.users.find({
          _id: {$ne: Meteor.userId()},
          "profile.targetLanguage.code": this.params.targetLanguage,
          "profile.nativeLanguage.code": this.params.nativeLanguage
        });
      } else {
        var regex = "/^" + this.params.city;
        var city = new RegExp(this.params.city, "i");

        return Meteor.users.find({
          _id: {$ne: Meteor.userId()},
          "profile.targetLanguage.code": this.params.targetLanguage,
          "profile.nativeLanguage.code": this.params.nativeLanguage,
          "profile.city": city
        });
      }
      
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
