MiniWeebly.Views.LayoutView = Backbone.View.extend({
	template: JST['layout'],
	titleTemplate: JST['title'],
	textTemplate: JST['text'],
	navTemplate: JST['nav'],

	initialize: function (options) {
		this.dragging = options.dragging;
		this.reorder = false;
		this.delta = 0;
	},

	events: {
		'mousedown .layout-resize' : 'startResize',
		'mousemove': 'resizeLayout',
		'mouseup' : 'endResize'
	},

	startResize: function (event) {
		event.preventDefault();
		// event.stopPropagation();
		this.pos = event.pageY;
		this.resize = true;
	},

	resizeLayout: function (event) {
		if (this.resize) {
			var delta = this.pos - event.pageY;
			this.pos = event.pageY
			var size = this.$el.height();
			// if (size - delta > 100) {
				// this.delta += delta;
				this.$el.height(size - delta);
			// 	this.$('.layout-resize').css('bottom', this.delta + 'px');
			// }
			if (this.dragging === 'text' || this.dragging === 'title') {
				var textSize = this.$('textarea').height();
				this.$('textarea').height(textSize - delta);
			}
		}
	},

	endResize: function (event) {
		this.resize = false;
	},

	render: function () {
		this.$el.addClass('layout');
		this.$el.attr('draggable', 'true');

		var content;
		switch (this.dragging) {
			case 'title':
				content = this.titleTemplate();
				break;
			case 'text':
				content = this.textTemplate();
				break;
			default:
				content = this.template({ type: this.dragging });
		}

		this.$el.html(content);

		return this;
	}
});