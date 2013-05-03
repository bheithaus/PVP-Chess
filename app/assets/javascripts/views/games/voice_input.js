CH.Views.VoiceInput = Backbone.View.extend({	
	render: function() {
		var renderedContent = JST["games/voice_input"]();
		this.$el.append(renderedContent);
		
		return this;
	}
});