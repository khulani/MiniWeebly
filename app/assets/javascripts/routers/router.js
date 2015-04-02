MiniWeebly.Routers.Router = Backbone.Router.extend({
	routes: {
		'': 'index'
	},

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	index: function () {
		this.dragView = new MiniWeebly.Views.DragView({
			collection: MiniWeebly.pages
		});
		this.$rootEl.append(this.dragView.render().$el);

		// this.sideView = new MiniWeebly.Views.SideView({
		// 	collection: MiniWeebly.pages
		// });
		// this.$rootEl.append(this.sideView.render().$el);

		// this.mainView = new MiniWeebly.Views.MainView({
		// 	collection: MiniWeebly.pages
		// });
		// this.$rootEl.append(this.mainView.render().$el);
	}
});