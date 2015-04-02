window.MiniWeebly = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function () {
		MiniWeebly.pages = new MiniWeebly.Collections.Pages;
		MiniWeebly.router = new MiniWeebly.Routers.Router({
			$rootEl: $('body'),
		});
		Backbone.history.start();
	}
};

$(document).ready( function () {
  MiniWeebly.initialize();
});