Template.registerHelper("languages", function() {
  return Languages.find();
});

Template.registerHelper("selectedLanguage", function(language, option) {
	if (!language)
		return '';
  return language.code === option.code ? 'selected' : '';
});

Template.registerHelper("stringifyObject", function(val, options) {
  return EJSON.stringify(val, options);
});

Template.registerHelper("prettifyDate", function(timestamp){
	return moment(timestamp).fromNow();
});