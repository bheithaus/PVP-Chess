CH.Views.GameStats = Backbone.View.extend({	
	render: function() {
		var renderedContent = JST["games/game_stats"]({
			opponentEmail: this.getStats()
		});
		this.$el.append(renderedContent);
		
		return this;
	},
	
	getStats: function() {
		var 	  game = this.model,
			opponentID = game.get("player_white_id") == CH.Store.currentUser.id ?
											 game.get("player_black_id") : game.get("player_white_id");
		
		return CH.Store.Users.findWhere({ id: opponentID }).escape("email");
	}
});