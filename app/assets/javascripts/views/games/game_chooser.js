CH.Views.GameChooser = Backbone.View.extend({	
	render: function() {
		var renderedContent = JST["games/chooser"]({
			games: this.collection
		});
		this.$el.append(renderedContent);
		
		return this;
	}
});