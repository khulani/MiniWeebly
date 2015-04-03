MiniWeebly.Routers.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'page/:id': 'show'
	},

	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

	index: function () {
		MiniWeebly.user.fetch();
		MiniWeebly.pages.fetch();
		this.dragView = new MiniWeebly.Views.DragView({
			collection: MiniWeebly.pages,
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
	},

	show: function (id) {
		MiniWeebly.user.fetch();
		MiniWeebly.pages.fetch();
		this.dragView = new MiniWeebly.Views.DragView({
			collection: MiniWeebly.pages,
			activePage: id
		});
		this.$rootEl.append(this.dragView.render().$el);
	}
});