Meteor.startup(function(){
  AccountsEntry.settings = {
    homeRoute: '/',
    dashboardRoute: '/',
    profileRoute: 'profile',
    passwordSignupFields: 'EMAIL_ONLY'
  };
});
