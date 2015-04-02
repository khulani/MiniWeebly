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

	// events: {
	// 	'drop': 'updateLayout',
	// 	'dragover .layout-hori': 'makeDroppable',
	// 	'dragenter .layout-right': 'addRight',
	// 	'dragleave .layout-right': 'restoreRight',
	// 	'dragstart .layout-row': 'trackDragged'
	// },

	// updateLayout: function (event) {
	// 	event.stopPropagation();
	// 	console.log(this.dragging[0]);
	// 	var $curr = $(event.target);
 //    if (this.reorder) {
 //    	$curr.after(this.dragged);
 //    	this.reorder = false;
 //    } else {
	// 		var $divider = $('<div>');
	// 		$divider.addClass($curr.attr('class'));
	// 		$curr.after($divider);

	// 		$curr.after(this.contentTemplate({ type: this.dragging[0] }));
	// 	}

	// 	// debugger;
	// 	// console.log(this.dragging);
	// 	// var layout = new MiniWeebly.Views.LayoutView({ dragging: this.dragging });
	// 	// this.$el.append(layout.render().$el);
	// 	// if (this.addPlace == 'right') {
	// 	// 	$(event.target).after()
	// 	// }
	// },

	// makeDroppable: function (event) {
	// 	event.preventDefault();
	// 	// event.stopPropagation();
	// },

	// adjustContent: function (event) {
	// 	// event.preventDefault();
	// 	var $curr = $(event.currentTarget);
	// 	var x = event.pageX - $curr.offset().left;
	// 	var y = event.pageY - $curr.offset().top;
	// 	var h = $curr.height();
	// 	var w = $curr.width();
	// 	if (y / h < .2) {
	// 		console.log('top');
	// 	} else if (y / h > .8) {
	// 		console.log('bottom');
	// 	} else if (x / w < .5) {
	// 		console.log('left');
	// 	} else if (x / w >= .5) {
	// 		console.log('right');
	// 	}
	// 	// debugger;
	// },

	// trackDragged: function (event) {
	// 	this.dragged = event.target;
	// 	this.reorder = true;
	// },

	// addRight: function (event) {
	// 	this.addPlace = 'right';
	// 	this.$('.layout-content').css('width','45%');
	// 	this.$('.layout-right').css('width','52%');
	// },

	// restoreRight: function (event) {
	// 	this.$('.layout-content').css('width','95%');
	// 	this.$('.layout-right').css('width','2%');
	// },

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