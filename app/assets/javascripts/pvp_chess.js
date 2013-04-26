window.CH = {
	Models: {},
	Collections: {},
	Routers: {},
	Views: {},
	Store: {},

	init: function($navbar, $content, currentUser) {
		var that = this;
		
		CH.Store.currentUser = currentUser;
		
		
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