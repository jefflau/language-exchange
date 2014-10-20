Template.registerHelper("languages", function() {
  return Languages.find();
});

Template.registerHelper("selectedLanguage", function(language, option) {
	if (!language)
		return '';
  return language.code === option.code ? 'selected' : '';
});

Template.registerHelper("countries", function(){
	return countries;
});

Template.registerHelper("selectedCountry", function(country, option){
	return country === option ? 'selected' : '';
});

Template.registerHelper("stringifyObject", function(val, options) {
  return EJSON.stringify(val, options);
});

Template.registerHelper("dateFromNow", function(timestamp){
	return moment(timestamp).fromNow();
});

Template.registerHelper("normalDate", function(timestamp){
	return moment(timestamp).format("Do MMM YY")
});