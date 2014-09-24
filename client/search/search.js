Template.search.events({
  'submit form': function(e, template){
    e.preventDefault();

    var form = {
      nativeLanguage: template.find('#speaks').value,
      targetLanguage: template.find('#learning').value
    };

    Session.set('currentChat', null);

    Router.go('results', {}, {query: form});
  }
});

Template.search.helpers({
  'userTargetLanguage': function(){
    return Meteor.user().profile.targetLanguage;
  },
  'userNativeLanguage': function(){
    return Meteor.user().profile.nativeLanguage;
  }
});
