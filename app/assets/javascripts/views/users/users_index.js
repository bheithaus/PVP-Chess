CH.Views.UsersIndex = Backbone.View.extend({
	initialize: function() {
		
		var renderCallback = this.render.bind(this);
		
		this.listenTo(CH.Store.onlineUsers, 'add', renderCallback);
		this.listenTo(CH.Store.onlineUsers, 'remove', renderCallback);
	},
	events: {
		'click button#invite': "inviteToGame"
	},
	
	render: function() {
		var that = this;
		var renderedContent = JST["users/index"]({
			offlineUsers: that.collection,
			onlineUsers: CH.Store.onlineUsers
		});
		that.$el.html(renderedContent);

		return that;
	},
	
	inviteToGame: function(event) {
		var opponent_id = $(event.target).data("id");
		
		
		
		this.newGame = new CH.Models.Game({
			player_white_id: CH.Store.currentUser.id,
			player_black_id: opponent_id
		});
		this.newGame.save({}, {
			success: function(newGame) {
				console.log('yayu!');
				CH.Store.currentUser.get("games").add(newGame);
				Backbone.history.navigate("games/"+newGame.id, {trigger: true})
			}
		});
	}
});