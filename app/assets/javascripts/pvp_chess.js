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

	init: function($navbar, $content, currentUserData, usersData) {
		var that = this;
		
		// channel.bind('my-event', function(data) {
// 		  alert('An event was triggered with message: ' + data.message);
// 		});
		
		CH.Store.Users = new CH.Collections.Users(usersData);
		CH.Store.onlineUsers = [];
		
		if (currentUserData) {
			CH.Store.currentUser = CH.Store.Users.findWhere({
				id: currentUserData.id
			});
			CH.Store.currentUser.get("games").fetch();
			CH.pusher = new Pusher('2bfd0a96d75cfe730e81');
			var presenceChannel = CH.pusher.subscribe('presence-channel');
			presenceChannel.bind('pusher:subscription_succeeded', function() {
			  var me = presenceChannel.members.me;
			  var userId = me.id;
			  var userInfo = me.info;
			  console.log(presenceChannel.members.count);
  			presenceChannel.members.each(function(member) {
  						  		  			console.log(member);
  						  		  		  CH.Store.onlineUsers.push(member.id);
  						  		  		});
			});
			
		} else {
			console.log('yer not signed in');
		}
		that.landingPage($content);
		
		this.router = new CH.Routers.ChessRouter($content);
		
		Backbone.history.start();
		
		that.makeNavbar($navbar);
	},
	
	landingPage: function($content) {
		var landingView = new CH.Views.UserLanding({
			model: CH.Store.currentUser
		});
		
		$content.html(landingView.render().$el);
	},
	
	makeNavbar: function($navbar) {
		var that = this;
		
		var navbarView = new CH.Views.Navbar(this.router);
		
		$navbar.html(navbarView.render().$el);
	},
};