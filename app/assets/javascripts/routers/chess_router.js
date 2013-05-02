CH.Routers.ChessRouter = Backbone.Router.extend({
	initialize: function($content) {
		this.$content = $content;
	},
	
	before: function(route, params) {
		console.log("running before function on route " + route);
		console.log("params " + params);
		
		if (this.currentView) {
			this.currentView.remove();
		}
	},
	
	routes: {
		"welcome": "welcome",
		"home": "home",
		"players": "usersIndex",
		"chat": "chat",
		"games": "game",
		"games/:id": "game"
	},
	
	game: function(id) {
		console.log(typeof(CH.Store.currentUser.get("games")));
		this.currentView = new CH.Views.Game({
			collection: CH.Store.currentUser.get("games"),
			gameID: parseInt(id)
		});
		
		this.$content.html(this.currentView.render().$el);
	},
	
	chat: function() {
		//stub
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