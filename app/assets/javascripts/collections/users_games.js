CH.Collections.UsersGames = Backbone.Collection.extend({
	initialize: function(model, options) {
		this.user = options.user;
	},
	
	model: CH.Models.Game,
	
	url: function() {
		return "/users/" + this.user.id + "/online_games"
	}
});