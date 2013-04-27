CH.Views.Chat.Rooms = Backbone.View.extend({
	
	render: function() {
		var renderedContent = JST["chat/rooms"]({
			rooms: this.collection
		});
		this.$el.html(renderedContent);
		
		return this;
	}
});