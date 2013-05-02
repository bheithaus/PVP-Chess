CH.Models.User = Backbone.RelationalModel.extend({
	urlRoot: "user",
	
	relations: [{
		type: "Backbone.HasMany",
		key: "games",
		relatedModel: "CH.Models.Game",
		collectionType: "CH.Collections.UsersGames",
		collectionOptions: function(user) {
			return { user: user }
		}
	}]
});