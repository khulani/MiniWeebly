MiniWeebly.Views.MainView = Backbone.View.extend({
	template: JST['main'],

	initialize: function (options) {
		this.activePageId = options.activePageId;
		this.listenTo(this.collection, 'add', this.addPage);
		this.listenTo(this.collection, 'remove', this.removePage);
		this.collection.each(this.addPage.bind(this));

		this.pageViews = [];
	},

	events: {
		'click button.page-main': 'activatePage',
	},

	activatePage: function (event) {
		event.preventDefault();
		var id = $(event.currentTarget).attr('id');
		var pageMain = _.find(
      this.pageViews,
      function (pageView) {
        return pageView.model.id == id;
      }
    );
    if (this.activePage) {
	    this.activePage.deactivate();
	  }
    pageMain.activate();
    this.activePage = pageMain;
    this.activePageId = pageMain.model.id;
	},

	addPage: function (page) {
		var active = false;
		var pageMain = new MiniWeebly.Views.PageMain({ model: page });
		this.pageViews.push(pageMain);
		this.$el.find('.pages').append(pageMain.render().$el);

		if (!this.activePageId) {
			this.activePage = pageMain;
			this.activePageId = page.id;
			pageMain.activate();
		} else if (this.activePageId == page.id) {
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
    pageMain.remove();
    this.pageViews.splice(this.pageViews.indexOf(pageMain), 1);
    if (this.activePage === pageMain) {
    	pageMain.deactivate();
    	this.activePageId = false;
    	this.activePage = this.pageViews[0];
    	if (this.activePage) {
	    	this.activePage.activate();
	    	this.activePageId = pageMain.model.id;
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