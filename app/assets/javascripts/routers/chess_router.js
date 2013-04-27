CH.Routers.ChessRouter = Backbone.Router.extend({
	initialize: function($content) {
		this.$content = $content;
	},
	
	before: function(route, params) {
		console.log("running before function on route "+ route);
		
		if (this.currentView) {
			this.currentView.remove();
		}
	},
	
	routes: {
		"home": "home",
		"signin": "signIn"
	},
	
	signIn: function(){		
		this.currentView = new CH.Views.SignIn();
		
		this.$content.html(this.currentView.render().$el);
	},
	
	home: function() {	
		this.currentView = new CH.Views.UserLanding({
			model: CH.Store.currentUser
		});
		
		this.$content.html(this.currentView.render().$el);
	}
});