CH.Views.Game = Backbone.View.extend({
	events: {
		"click button#new-game": "newGame"
	},
	
	render: function() {
		console.log(this.model.id);
		if (!(this.model.id)) {
			var newGameView = new CH.Views.NewGame();
			this.$el.append(newGameView.render().$el);
		}
		var renderedContent = JST["games/main"]({
			game: this.model
		});
		this.$el.append(renderedContent);
		
		return this;
	}, 
	
	newGame: function() {
		this.model.save();
	}
});