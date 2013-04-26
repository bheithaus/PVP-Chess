CH.Routers.ChessRouter = Backbone.Router.extend({
	initialize: function($content) {
		this.$content = $content;
	},
	
	routes: {
		"home": "home",
		"signin": "signIn"
	},
	
	signIn: function(){
		var signInView = new CH.Views.SignIn();
		
		this.$content.html(signInView.render().$el);
	},
	
	home: function() {
		var userLandingView = new CH.Views.userLanding();
		
		this.$content.html(userLandingView.render().$el);
	}
	
	
});