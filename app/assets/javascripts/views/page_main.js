MiniWeebly.Views.PageMain = Backbone.View.extend({
	template: JST['page_main'],
	layoutTemplate: JST['main_layout'],

	tagName: 'button',

	events: {
		'mouseup .body': 'saveContent'
	},

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		if (this.model.get('content')) {
			this.mainLayout = this.model.get('content');
		} else {
			this.mainLayout = this.layoutTemplate();
		}
	},

	activate: function () {
		this.$el.addClass('active');
		$('.page-layout').html(this.mainLayout);
		MiniWeebly.router.navigate('page/' + this.model.cid);
	},

	saveContent: function () {
		this.model.set('content', $('.page-layout').html());
		this.model.save();
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