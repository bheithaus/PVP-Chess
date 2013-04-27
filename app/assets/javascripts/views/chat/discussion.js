CH.Views.Chat.Discussion = Backbone.View.extend({
	events: {
		"click #invite": "invitePlayer"	
	},
	
	render: function() {
		var renderedContent = JST["chat/discussion"]({
			room: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	}
});