CH.Views.Game = Backbone.View.extend({
	initialize: function(options) {
		var that = this;
		
		that.gameID = options.gameID;
		that.collection = options.collection;

		that.collection.fetch({
			success: function() {
				if (that.gameID) {
					that.loadGameByRoute();
				} else {
					that.gameChooser();
				}
			}
		});
	},
	
	events: {
		"click button#new-game": "newGame",
		"click button#game-chooser": "gameChooser",
		"click a": "playGame"
	},
	
	render: function() {
		var that = this;
		
		if (that.currentView) {
			that.$el.html(that.currentView.render().$el);
		}
		
		return that;
	},
	
	loadGameByRoute: function() {
		var that = this;
		
		that.game = that.collection.findWhere({
			id: that.gameID
		});		
		that.playGame({
			model: that.game
		});		
	},

	gameChooser: function() {
		console.log("game chooser!")
		this.currentView = new CH.Views.GameChooser({
			collection: this.collection
		});
		this.render();
	},
	
	playGame: function(options) {
		var game;
		
		if (options.target) {
			var id = $(options.target).data("game-id");
			game = this.collection.findWhere({
				id: id
			});
			Backbone.history.navigate("#games/" + id);
		} else {
			console.log("should be loading a game!!");
			game = options.model;
		}		
		this.currentView = new CH.Views.PlayGame({
			model: game,
			$canvas: $('<canvas id="chess-game" width="600" height="600">Chess Game</canvas>')
		});
		
		this.render();
	}
});