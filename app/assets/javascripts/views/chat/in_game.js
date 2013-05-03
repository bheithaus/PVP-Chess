CH.Views.Chat.InGame = Backbone.View.extend({
	
	render: function() {
		var renderedContent = JST["chat/in_game"]();
		this.$el.html(renderedContent);
		
		return this;
	}
});