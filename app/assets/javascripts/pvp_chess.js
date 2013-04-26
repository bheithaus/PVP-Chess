window.CH = {
	Models: {},
	Collections: {},
	Routers: {},
	Views: {},
	Store: {},

	init: function(rootEl) {
		this.$rootEl = $(rootEl);


		var that = this;

		if (this.Store.Secrets) {
			showSecrets(this.Store.Secrets);
		} else {
			var secrets = new This.Collections.Secrets();
			secrets.fetch(function() {
				showSecrets(secrets);
			});

		}
	},

	showSecrets: function (data) {
		var secretIndexView = new SecretIndexView({
			collection: data
		});


		this.$rootEl.html(secretIndexView.render().$el);
	}

};