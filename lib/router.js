Router.configure({
  layoutTemplate: "layout"
});

Router.map(function(){
  this.route('home', {
    path: "/"
  });
  this.route('chatThread', {
    path: "/:_id"
  });
  this.route('profile', {
    path: "/profiles/:_id",
    data: function(){
      return Meteor.user()
    }
  })
});
