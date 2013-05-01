CH.Views.Game = Backbone.View.extend({
	initialize: function() {
		var that = this;
		that.newGame = new CH.Models.Game({
			player_white_id: CH.Store.currentUser.id
		});
		that.newGameButton = new CH.Views.NewGame({
			model: that.newGame
		});
		
		if (that.model) {
			this.playGame({
				model: that.model
			});
		}
	},
	
	events: {
		"click button#new-game": "newGame",
		"click button#game-chooser": "gameChooser",
		"click a": "playGame"
	},
	
	render: function() {
		var that = this;
		CH.Store.currentUser.get("games").fetch({
			success: function() {
				var chooserButton = $("<button id='game-chooser'>Choose a Game</button>")
				that.$el.prepend(chooserButton);
			}
		});
		if (that.currentView) {
			that.$el.html(that.currentView.render().$el);
		}
		that.$el.prepend(that.newGameButton.render().$el);
		
		return that;
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
			game = this.collection.findWhere({
				id: $(options.target).data("game-id")
			});
		} else {
			game = options.model;
		}
		
		this.currentView = new CH.Views.PlayGame({
			model: game,
			$el: $('<canvas id="chess-game" width="600" height="600">Chess Game</canvas>')
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