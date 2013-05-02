CH.Routers.ChessRouter = Backbone.Router.extend({
	initialize: function($content) {
		this.$content = $content;
	},
	
	before: function(route, params) {
		console.log("running before function on route " + route);
		// if (!CH.Store.currentUser) {
	// 		Backbone.history.navigate("/users/sign_in", { trigger: true })
	// 	}
		
		if (this.currentView) {
			this.currentView.remove();
		}
	},
	
	routes: {
		"welcome": "welcome",
		"home": "home",
		"players": "usersIndex",
		"games": "game",
		"games/:id": "game"
	},
	
	game: function(id) {
		console.log(id);
		var gamesView;
		var game = CH.Store.currentUser.get("games").findWhere({id: parseInt(id)}) || null;


		this.currentView = new CH.Views.Game({
			collection: CH.Store.currentUser.get("games"),
			model: game
		});
		
		this.$content.html(this.currentView.render().$el);
	},
	
	welcome: function(){		
		this.currentView = new CH.Views.Welcome();
		
		this.$content.html(this.currentView.render().$el);
	},
	
	usersIndex: function(){		
		this.currentView = new CH.Views.UsersIndex({
			collection: CH.Store.users
		});
		
		this.$content.html(this.currentView.render().$el);
	},
	
	home: function() {	
		this.currentView = new CH.Views.UserLanding({
			model: CH.Store.currentUser
		});
		
		this.$content.html(this.currentView.render().$el);
	}
});