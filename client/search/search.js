Template.search.events({
  'submit form': function(e, template){
    e.preventDefault();

    var form = {
      nativeLanguage: template.find('#speaks').value,
      targetLanguage: template.find('#learning').value,
      city: template.find('#city').value
    };

    Session.set('currentChat', null);

    Router.go('results', {}, {query: form});
  }
});

Template.search.helpers({
  'userTargetLanguage': function(){
    return Meteor.userId() ? Meteor.user().profile.targetLanguage : false;
  },
  'userNativeLanguage': function(){
    return Meteor.userId() ? Meteor.user().profile.nativeLanguage : false;
  }
});
