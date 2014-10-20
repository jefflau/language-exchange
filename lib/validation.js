Validation = {

  trimInput: function(val) {
    return val.replace(/^\s*|\s*$/g, "");
  },

  isValidPassword: function(val) {
    return val.length >= 6 ? true : false; 
  },

  isNotEmpty: function(val) {
  	return val.length > 0;
  },

  isTargetNativeDifferent: function(lang1, lang2) {
  	return lang1 != lang2 ? true : false; 
  },

  removeInvalid: function(){
  	$('.invalid').removeClass('invalid');
  },

  isEmail: function(val, field) {
    if (val.indexOf('@') !== -1) {
        return true;
      } else {
        Session.set('displayMessage', 'Error & Please enter a valid email address.');
        return false;
      }
  }
}