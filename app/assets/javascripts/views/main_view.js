MiniWeebly.Views.MainView = Backbone.View.extend({
	template: JST['main'],

	initialize: function () {
		this.listenTo(this.collection, 'add', this.addPage);
		this.listenTo(this.collection, 'remove', this.removePage);
		this.collection.each(this.addPage.bind(this));

		this.pageViews = [];
	},

	events: {
		'click button.page-main': 'activatePage'
	},

	activatePage: function (event) {
		event.preventDefault();
		var id = $(event.currentTarget).attr('id');
		var pageMain = _.find(
      this.pageViews,
      function (pageView) {
        return pageView.model.cid == id;
      }
    );
    this.activePage.deactivate();
    pageMain.activate();
    this.activePage = pageMain;
	},

	addPage: function (page) {
		var active = false;
		var pageMain = new MiniWeebly.Views.PageMain({ model: page });
		this.pageViews.push(pageMain);
		this.$el.find('.pages').append(pageMain.render().$el);

		if (this.collection.length == 1 || !this.activePage) {
			this.activePage = pageMain;
			pageMain.activate();
		}
	},

	removePage: function (page) {
		var pageMain = _.find(
      this.pageViews,
      function (pageView) {
        return pageView.model === page;
      }
    );
    pageMain.deactivate();
    pageMain.remove();
    this.pageViews.splice(this.pageViews.indexOf(pageMain), 1);
    if (this.activePage === pageMain) {
    	this.activePage = this.pageViews[0];
    	if (this.activePage) {
	    	this.activePage.activate();
	    }
    }
	},

	saveActive: function () {
		this.activePage.saveContent();
	},

	render: function () {
		this.$el.addClass('main');
		this.$el.html(this.template());
		return this;
	}

});