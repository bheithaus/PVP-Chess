CH.Views.Chat.Input = Backbone.View.extend({
	
	render: function() {
		var renderedContent = JST["chat/input"]();
		this.$el.html(renderedContent);
		
		return this;
	}
});