CH.Views.Navbar = Backbone.View.extend({
	initialize:function (router) {
		var renderCallback = this.render.bind(this);
		this.listenTo(router, 'route', renderCallback);
	},
	
	events: {
		"click #sign-out": "signOut",
	},
	
	render: function() {
		console.log("rendered");
		var that = this;
		var renderedContent = JST["nav/navbar"]();
		that.$el.html(renderedContent);
		
		return that;
	},
	
	signOut: function() {
		$.post(
			"/session",
			{ _method: "DELETE" },
			function(signedout) {
				console.log(signedout);
				CH.Store.currentUser = null;
				Backbone.history.navigate("signin", {trigger: true});
			}
		);
		
	}
});