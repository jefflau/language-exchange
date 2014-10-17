Meteor.startup(function(){
  AccountsEntry.settings = {
    homeRoute: '/',
    dashboardRoute: '/profile',
    profileRoute: 'profile',
    passwordSignupFields: 'EMAIL_ONLY'
  };

  _.extend(Notifications.defaultOptions, {
      timeout: 3000
  });
});

Meteor.subscribe('allLanguages');