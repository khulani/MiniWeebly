MiniWeebly.Views.SideView = Backbone.View.extend({
	template: JST['side'],

	events: {
    'submit .page-new': 'createPage'
  },

  createPage: function (event) {
  	event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var page = new MiniWeebly.Models.Page(formData);

  	var pageItem = new MiniWeebly.Views.PageItem({ model: page });

    event.currentTarget.reset();
    this.collection.add(page);
    this.$el.find('.page-items').append(pageItem.render().$el);
  },

	render: function () {
		this.$el.addClass('side');
		this.$el.html(this.template());

		return this;
	}
});