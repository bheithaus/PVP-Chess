CH.Views.UserLanding = Backbone.View.extend({
	render: function() {
		var renderedContent = JST["users/landing"]({
			user: this.model
		});
		this.$el.html(renderedContent);
		
		return this;
	}
});