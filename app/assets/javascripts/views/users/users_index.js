CH.Views.UsersIndex = Backbone.View.extend({
	
	render: function() {
		var that = this;
		var renderedContent = JST["users/index"]({
			users: that.model
		});
		that.$el.html(renderedContent);

		return that;
	}
});