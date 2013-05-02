CH.Views.Game = Backbone.View.extend({
	initialize: function(options) {
		var that = this;
		console.log(options);
		that.gameID = options.gameID;
		that.collection = options.collection;

		that.collection.fetch({
			success: function() {
				if (that.gameID) {
					that.loadGameByRoute();
				} else {
					var chooserButton = $("<button id='game-chooser'>Choose a Game</button>")
					that.$el.prepend(chooserButton);
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
		
		//that.$el.prepend(that.newGameButton.render().$el);
		
		return that;
	},
	
	loadGameByRoute: function() {
		var that = this;
		
		that.game = that.collection.findWhere({
			id: that.gameID
		});
		
		console.log(that.game);
		
		this.playGame({
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
		console.log(options);
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
		
		console.log(options.model);
		
		this.currentView = new CH.Views.PlayGame({
			model: game,
			$canvas: $('<canvas id="chess-game" width="600" height="600">Chess Game</canvas>')
		});
		
		this.render();
	},
	
	newGame: function() {
		console.log("maybe switch to the new game!");
		setTimeout(function(){
			console.log(that.newGame);
		}, 3000);
	}
});