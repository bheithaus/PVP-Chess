//Main is a holder view for three subviews: input, discussion, rooms
//input
// <textarea id="chat-input">

// user name
// <a data-id="<%= message.escape("user_id") %>">

//chat rooms
//<a class="room" data-id="<%= room.escape("id") %>">

CH.Views.Chat.Main = Backbone.View.extend({
	events: {
		"keypress": "keyPress",
		"dblclick .room": "enterRoom"
	},
	
	initialize: function() {
		var that = this;
		that.currentRooms = CH.Store.Chat.currentRooms;
		
		that.$discussionArea = $("<div id='discussion-area'></div>");
		
		that.inputView = new CH.Views.Chat.Input();
		
		that.currentRooms.fetch({
			success: function() {
				that.roomsView = new CH.Views.Chat.Rooms({
					collection: that.currentRooms
				});
			}
		});
		


		// get the current rooms collection
		// on success create a rooms list view
		// c
		// create the discussion view
		// create input view
		// events
			// keypress: submit Chat if keyCode == 13
			// click invite to play next to a player
			// dblclick chat room name
			// 
	
	
	},
	
	render: function() {
		
		return this;
	},
	
	keyPressed: function(event) {
		if (event.keyCode == 13) {
			// enter chat
			console.log($("#chat-input").val());
		}
	},
	
	enterRoom: function(event) {
		//find selected room
		console.log("you want to enter room "+$(event.target).data("id"));
		var selectedRoom = this.currentRooms.get($(event.target).data("id"))
		this.discussionView = new CH.Views.Chat.Discussion({
			model: selectedRoom
		});
	}
});