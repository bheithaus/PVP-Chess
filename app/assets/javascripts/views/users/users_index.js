CH.Views.UsersIndex = Backbone.View.extend({
	initialize: function() {
		
		var renderCallback = this.render.bind(this);
		
		this.listenTo(CH.Store.onlineUsers, 'add', renderCallback);
		this.listenTo(CH.Store.onlineUsers, 'remove', renderCallback);
	},
	
	events: {
		'click button#invite': 'inviteToGame',
		'keypress input': 'confirmInvite',
		'click a#confirm-invite': 'confirmInvite'
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
		var $inviteModal = $('#invite-modal'),
					that = this;
					
		// store this for when they confirm
		this.opponentID = $(event.target).data("id");
		
		$inviteModal.modal('show');
		$inviteModal.on('shown', function () {
			that.$("#game-name").focus();
		});
	},
	
	confirmInvite: function(event) {
		if (event.keyCode === 13 || !event.keyCode) {
			var  $inviteModal = $('#invite-modal');
		
			var newGame = new CH.Models.Game({
				player_white_id: CH.Store.currentUser.id,
				player_black_id: this.opponentID,
						   name: $("#game-name").val()
			});
		
			newGame.save({}, {
				success: function(newGameData) {
					console.log('yayu!');
					CH.Store.currentUser.get("games").add(newGameData);
					Backbone.history.navigate("games/"+newGameData.id, { trigger: true });
				}
			});
		
			$inviteModal.modal('hide');
		}
	}
});