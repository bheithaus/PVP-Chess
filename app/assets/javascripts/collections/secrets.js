CC.Collections.Secrets = Backbone.Collection.extend({
	model: CC.Models.Secret,
	url: "/secrets"
});