CH.Models.ChatRoom = Backbone.RelationalModel.extend({
	urlRoot: "/chatrooms",
	
	relations: [{
		type: "Backbone.HasMany",
		key: "messages",
		relatedModel: "CH.Models.Message",
		collectionType: "CH.Collections.Messages",
		collectionOptions: ""
	}]
})