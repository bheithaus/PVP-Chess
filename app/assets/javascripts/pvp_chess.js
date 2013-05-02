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
		
		CH.Store.users = new CH.Collections.Users(usersData);
		CH.Store.onlineUsers = new CH.Collections.OnlineUsers();
		
		if (currentUserData) {
			CH.Store.currentUser = CH.Store.users.findWhere({
				id: currentUserData.id
			});
			CH.Store.currentUser.get("games").fetch();
			CH.pusher = new Pusher('2bfd0a96d75cfe730e81');
			//join presence channel for online users
			var presenceChannel = CH.pusher.subscribe('presence-channel');
			presenceChannel.bind('pusher:subscription_succeeded', function() {
				var me = presenceChannel.members.me;
				var userId = me.id;
				var userInfo = me.info;
				console.log(presenceChannel.members.count);
	  			presenceChannel.members.each(function(member) {
	  						  		  			console.log(member);
	  						  		  		  CH.Store.onlineUsers.add(CH.Store.users.findWhere({ id: parseInt(member.id) }));
  		  		});
			});
			presenceChannel.bind('pusher:member_removed', function(member) {
			  CH.Store.onlineUsers.remove(parseInt(member.id));
			});
			
			//when logged in bind to private channel for contacting this user only
			this.bindUserChannel();
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
	
	bindUserChannel: function() {
		console.log("binding to private user channel");
		this.userChannel = CH.pusher.subscribe('private-user-' + CH.Store.currentUser.id);
		this.userChannel.bind("invited", this.showGameInvite.bind(this));
	},
	
	showGameInvite: function(newGameData) {
		this.Store.currentUser.get("games").add(newGameData);
		var      userEmail = CH.Store.users.findWhere({ id: parseInt(newGameData.player_white_id) }).escape("email");
		var $invitedButton = $('<button id="invited">Join</button>');
		var		  $invited = $('#invited');
				  
		$invited.text("You have been invited to a game by " + userEmail)
					 .append($invitedButton.data("id", newGameData.id));
		$invitedButton.on('click', function(){
			$invited.empty();
			Backbone.history.navigate("games/" + $invitedButton.data("id"), { trigger: true });
		});
		console.log(data);
	}
};