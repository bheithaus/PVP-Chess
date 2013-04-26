CH.Models.User = Backbone.Model.extend({
	urlRoot: "user",
	
	fullName: function() {
		return this.get("fname") +" "+ this.get("lname");
	}
});