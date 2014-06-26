Router.configure({
  layoutTemplate: "layout"
});

Router.map(function(){
  this.route('threads', {
    path: "/"
  });
  this.route('chatThread', {
    path: "/:_id"
  });
});
