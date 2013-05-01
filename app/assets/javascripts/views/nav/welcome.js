CH.Views.Welcome = Backbone.View.extend({
	
	render: function(){
		var that = this;
		var renderedContent = JST["nav/welcome"]();
		that.$el.html(renderedContent);
		
		return that;
	}
});