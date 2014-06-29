Template.profile.events({
  "submit form": function(e, template) {
    e.preventDefault();
    var profile = {
      firstName: template.find('#firstName').value,
      lastName: template.find('#lastName').value,
      country: template.find('#country').value,
      city: template.find('#city').value,
      targetLanguage: template.find('#targetLanguage').value,
      nativeLanguage: template.find('#nativeLanguage').value,
      age: template.find('#age').value,
      bio: template.find('#bio').value
    },
    user = {
      profile: profile
    }

    Meteor.call('updateUser', user, function(err){
      if(err) {
        console.log(err);
      } else {
        Notifications.info('Profile updated!', 'Successfully saved.');
      }
    });
  }
});
