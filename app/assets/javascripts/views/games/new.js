CH.Views.NewGame = Backbone.View.extend({
	
	render: function() {
		var renderedContent = JST["games/new"]();
		this.$el.html(renderedContent);
		
		return this;	
	}
});