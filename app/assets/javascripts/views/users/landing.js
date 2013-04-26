CH.Views.UserLanding = Backbone.View.extend({
	render: function() {
		var that = this;
		var renderedContent = JST["users/landing"]({
			model: this.user
		});
	}
});