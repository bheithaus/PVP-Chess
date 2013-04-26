CC.Views.SecretIndexView = Backbone.View.extend({
	render: function() {
		var that = this;
		var renderedContent = JST["secrets/index"]({
			secrets: that.collection
		});
		that.$el.html(renderedContent);

		return that;
	}
});