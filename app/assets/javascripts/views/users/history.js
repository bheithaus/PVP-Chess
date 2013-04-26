CH.Views.History = Backbone.View.extend({
	render: function() {
		var renderedContent = JST["users/history"]({
			user: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	}
	
});