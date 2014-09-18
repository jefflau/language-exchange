Template.profile.events({
  "submit form": function(e, template) {
    e.preventDefault();

    var profile = {
      firstName: template.find('#firstName').value,
      lastName: template.find('#lastName').value,
      country: template.find('#country').value,
      city: template.find('#city').value,
      targetLanguage: EJSON.parse(template.find('#targetLanguage').value),
      nativeLanguage: EJSON.parse(template.find('#targetLanguage').value),
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

Template.profile.helpers({
  languages: function() {
    return Languages.find();
  },

  selected: function(language, option) {
    return language.code === option.code ? 'selected' : '';
  },

  stringifyObject: function(val, options) {
    return EJSON.stringify(val, options);
  }
});