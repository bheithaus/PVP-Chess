CH.Views.SignIn = Backbone.View.extend({
	events: {
		"click button#signin": "signIn"
	},
	
	render: function(){
		var that = this;
		var renderedContent = JST["nav/signin"]();
		that.$el.html(renderedContent);
		
		return that;
	},
	
	signIn: function(){
		var username = $("#username").val();
		$.post(
			"/session",
			{ username: username },
			function(signedInUser) {
				console.log(signedInUser);
				CH.Store.currentUser = new CH.Models.User(signedInUser);
				Backbone.history.navigate("home", {trigger: true});
			}
		);
	}
});