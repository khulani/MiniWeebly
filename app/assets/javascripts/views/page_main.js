MiniWeebly.Views.PageMain = Backbone.View.extend({
	template: JST['page_main'],
	layoutTemplate: JST['main_layout'],

	tagName: 'button',

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.mainLayout = this.layoutTemplate();
	},

	activate: function () {
		this.$el.addClass('active');
		$('.page-layout').html(this.mainLayout);
		MiniWeebly.router.navigate('page/' + this.model.cid);
	},

	deactivate: function () {
		this.$el.removeClass('active');
		this.mainLayout = $('.page-layout').html();
		$('.page-layout').empty();
	},

	render: function () {
		this.$el.addClass('page-main');
		this.$el.attr('id', this.model.cid);
		this.$el.html(this.template({ page: this.model }));

		return this;
	}
});