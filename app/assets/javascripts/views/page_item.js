MiniWeebly.Views.PageItem = Backbone.View.extend({
	template: JST['page_item'],
  editTemplate: JST['page_item_edit'],

	events: {
    'click .update': 'updatePage', 
    'click .edit': 'editPage',
    'mouseenter .page-delete': 'toggleColor',
    'mouseleave .page-delete': 'toggleColor',
    'click .page-delete': 'deletePage'
  },

  updatePage: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).parent().serializeJSON();
    this.model.set(formData);
    this.model.save();
    this.render();
  },

  editPage: function (event) {
    this.$el.html(this.editTemplate({ page: this.model }));
  },

  deletePage: function (event) {
    this.model.destroy();
    this.remove();
  },

  toggleColor: function (event) {
  	if (event.type === 'mouseenter') {
  		$(event.currentTarget).parent().css('background-color', '#D86A65');
  	} else {
  		$(event.currentTarget).parent().css('background-color', '#518DCA');
  	}
  },

	render: function () {
		this.$el.addClass('page-item');
		this.$el.html(this.template({ page: this.model }));

		return this;
	}
});