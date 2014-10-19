Meteor.startup(function(){

  _.extend(Notifications.defaultOptions, {
      timeout: 3000
  });
});

Meteor.subscribe('allLanguages');