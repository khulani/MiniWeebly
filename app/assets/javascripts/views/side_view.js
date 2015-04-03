MiniWeebly.Views.SideView = Backbone.View.extend({
	template: JST['side'],
  logoutTemplate: JST['side_logout'],

  initialize: function (event) {
    this.listenTo(MiniWeebly.user, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.renderPages);
    this.renderPages();
  },

	events: {
    'submit .page-new': 'createPage'
  },

  renderPages: function () {
    this.$('.page-items').empty();
    this.collection.each(this.addPage.bind(this))
  },

  addPage: function (page) {
    var pageItem = new MiniWeebly.Views.PageItem({ model: page });
    this.$el.find('.page-items').append(pageItem.render().$el);
  },

  createPage: function (event) {
  	event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var page = new MiniWeebly.Models.Page(formData);

    page.save();

  	var pageItem = new MiniWeebly.Views.PageItem({ model: page });
    event.currentTarget.reset();
    this.collection.add(page);
    this.$el.find('.page-items').append(pageItem.render().$el);
  },

	render: function () {
		this.$el.addClass('side');
    if (MiniWeebly.user.id) {
  		this.$el.html(this.template());
    } else {
      this.$el.html(this.logoutTemplate());
    }

		return this;
	}
});