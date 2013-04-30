CH.Models.User = Backbone.RelationalModel.extend({
	urlRoot: "user",
	
	fullName: function() {
		return this.get("fname") +" "+ this.get("lname");
	},
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