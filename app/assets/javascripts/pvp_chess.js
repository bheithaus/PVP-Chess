window.CH = {
	Models: {},
	Collections: {},
	Routers: {},
	Views: {
		Chat: {},
	},
	Store: {
		Chat: {}
		
	},

	init: function($navbar, $content, currentUserData) {
		var that = this;
		
		CH.Store.currentUser = new CH.Models.User(currentUserData);
		
		
		this.router = new CH.Routers.ChessRouter($content);
		
		Backbone.history.start();

		that.makeNavbar($navbar);
	},
	
	makeNavbar: function($navbar) {
		var that = this;
		
		var navbarView = new CH.Views.Navbar(this.router);
		
		$navbar.html(navbarView.render().$el);
	}
};