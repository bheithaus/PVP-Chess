CH.Views.Chat.InGame = Backbone.View.extend({
	events: {
		"keypress": "handleChatInput"
	},
	
	initialize: function(options) {
		this.gameChannel = options.gameChannel;
	},
	
	render: function() {
		var renderedContent = JST["chat/in_game"]();
		this.$el.html(renderedContent);
		
		return this;
	},
	
	handleChatInput: function(event) {
		var	   channel = this.gameChannel;
		    discussion = this.$("#discussion"),
				 input = this.$("#chat-input");
			console.log(event.keyCode);
			if (event.keyCode == 13) {
				var chat = input.val();
				var triggered = channel.trigger('client-chat', { text: chat, user: CH.Store.currentUser.escape("email") });
				
				setTimeout(function() {
					if (triggered) {						
						discussion.append('<dt>' + CH.Store.currentUser.escape("email") + '</dt><dd class="me">' + chat + '</dd>');
					}
				}, 300);
				input.val("");
			}
	},
});