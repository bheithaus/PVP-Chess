CH.Views.Navbar = Backbone.View.extend({
	events: {
		"click #sign-out": "signOut",
	},
	
	render: function() {
		var that = this;
		var renderedContent = JST["nav/navbar"]({
			userEmail: CH.Store.currentUser.escape("email")
		});
		that.$el.html(renderedContent);
		
		return that;
	},
	
	signOut: function() {
		$.post(
			"/users/sign_out",
			{ _method: "DELETE" },
			function(signedout) {
				console.log(signedout);
				CH.Store.currentUser = null;
				window.location.reload();
			}
		);
		
	}
});