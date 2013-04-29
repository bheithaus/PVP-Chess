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
		//var pusher = new Pusher('2bfd0a96d75cfe730e81');
		// var channel = pusher.subscribe('my-channel');
		
		
		// channel.bind('my-event', function(data) {
// 		  alert('An event was triggered with message: ' + data.message);
// 		});

		if (currentUserData) {
			CH.Store.currentUser = new CH.Models.User(currentUserData);
		} else {
			console.log('yer not signed in');
		}
		
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