Template.registerHelper("languages", function() {
  return Languages.find();
});

Template.registerHelper("selectedLanguage", function(language, option) {
  return language.code === option.code ? 'selected' : '';
});

Template.registerHelper("stringifyObject", function(val, options) {
  return EJSON.stringify(val, options);
});