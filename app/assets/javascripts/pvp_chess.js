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
			presenceChannel.bind('pusher:subscription_succeeded', function(member_list) {
				// var me = presenceChannel.members.me;
// 				var userId = me.id;
// 				var userInfo = me.info;
// 				console.log(presenceChannel.members.count);
				console.log(member_list);
	  			_(member_list._members_map).each(function(member) {
	  						  		  			console.log(member);
	  						  		  		  CH.Store.onlineUsers.add(CH.Store.users.findWhere({ email: member.email }));
  		  		});
				console.log(CH.Store.onlineUsers);
				
			});
			
			presenceChannel.bind('pusher:member_removed', function(member) {
				console.log("setting remove timeout");
				var memberID = member.id,
				timeoutID = setTimeout(function() {
					 console.log("removing sucka");
				  	 CH.Store.onlineUsers.remove(parseInt(member.id));
				}, 4000);
				
				var reAddedCallback = function(member) {
					presenceChannel.unbind('pusher:member_added');
					if (member.id == memberID) {
						console.log("clearingTimout");
						clearTimeout(timeoutID);
					}
				};
				
				presenceChannel.bind('pusher:member_added', reAddedCallback);
			});
			
			//when logged in bind to private channel for contacting this user only
			this.bindUserChannel();
		}
		
		that.landingPage($content);
		
		this.router = new CH.Routers.ChessRouter($content);
		that.makeNavbar($navbar);
		
		Backbone.history.start();
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
		console.log("invited to game");
		this.Store.currentUser.get("games").add(newGameData);
		var      userEmail = CH.Store.users.findWhere({ id: parseInt(newGameData.player_white_id) }).escape("email"),
			$invitedButton = $('<button id="invited" class="btn btn-large">Join</button>'),
				  $invited = $('#invited'),
  				    gameID = newGameData.id;
		
		$invited.addClass("yellow-bg");				  
		$invited.html("<h3>You have been invited to a game by " + userEmail + "</h3>")
					 .append($invitedButton);
		$invitedButton.on('click', function(){
			$invited.empty();
			$invited.removeClass("yellow-bg");
			Backbone.history.navigate("games/" + gameID, { trigger: true });
		});
	}
};