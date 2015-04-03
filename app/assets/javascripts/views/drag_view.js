MiniWeebly.Views.DragView = Backbone.View.extend({
	template: JST['layout'],
	titleTemplate: JST['title'],
	textTemplate: JST['text'],
	navTemplate: JST['nav'],
	imageTemplate: JST['image'],

	initialize: function (options) {
		if (options.activePageId) {
			this.activePageId = options.activePageId;
		}
	},

	events: {
		'mousemove .body': 'test',
		'dragover .layout': 'findPosition',
		'dragstart': 'trackDragged',
		'drop': 'updateLayout',
		'dragover .body': 'makeDroppable',
		'mousedown .layout-resize' : 'startResize',
		'mousemove': 'resizeLayout',
		'mouseup' : 'endResize',
		'change textarea': 'saveText',
		'click .layout-remove': 'removeLayout'
	},

	test: function (event) {
		console.log('mousemove');
	},

	startResize: function (event) {
		event.preventDefault();
		// event.stopPropagation();
		this.pos = event.pageY;
		this.resize = true;
		this.layout = $(event.target.parentElement.parentElement);
	},

	resizeLayout: function (event) {
		if (this.resize) {
			var delta = this.pos - event.pageY;
			this.pos = event.pageY;
			var size = this.layout.height();
			// if (size - delta > 100) {
				// this.delta += delta;
				this.layout.height(size - delta);
			// 	this.$('.layout-resize').css('bottom', this.delta + 'px');
			// }
			if (this.layout.find('textarea')) {
				var textSize = this.layout.find('textarea').height();
				this.layout.find('textarea').height(textSize - delta);
			}
		
		}
	},

	endResize: function (event) {
		if (this.resize) {
			this.mainView.saveActive();
			this.resize = false;
		}
	},

	saveText: function (event) {
		$(event.currentTarget).html(event.currentTarget.value);
		this.mainView.saveActive();
	},

	removeLayout: function (event) {
		event.preventDefault();
		$(event.target.parentElement.parentElement).remove();
		this.mainView.saveActive();
	},

	renderLayout: function () {
		var content;
		switch (this.dragging) {
			case 'title':
				content = this.titleTemplate();
				break;
			case 'text':
				content = this.textTemplate();
				break;
			case 'image':
				content = this.imageTemplate();
				break;
			default:
				content = this.template({ type: this.dragging });
		}
		return content;
	},

	trackDragged: function (event) {
		this.dragging = event.target.getAttribute('id');
		this.dragged = event.target;
	},

	updateLayout: function (event) {
		// console.log(this.dragging);
		event.preventDefault();
		event.stopPropagation();
		var dropSpot = event.target.getAttribute('class');
		if (this.dragging) {
			if (dropSpot === 'layout-hori' || dropSpot === 'layout' || dropSpot === 'layout-image') {
				$(event.target).after(this.renderLayout());
			} else if (dropSpot === 'layout-text' || dropSpot === 'layout-title' || dropSpot === 'layout-image-icon') {
				$(event.target).parent().after(this.renderLayout());

			} else {
				this.$el.find('.body').append(this.renderLayout());
			}
			this.mainView.saveActive();
		} else {
			if (dropSpot === 'layout-hori' || dropSpot === 'layout' || dropSpot === 'layout-image') {
				$(event.target).after(this.dragged);
				this.mainView.saveActive();
			} else if (dropSpot === 'layout-text' || dropSpot === 'layout-title' || dropSpot === 'layout-image-icon') {
				$(event.target).parent().after(this.dragged);
				this.mainView.saveActive();
			} 
		}
	},

	makeDroppable: function (event) {
		event.preventDefault();
	},

	// findPosition: function (event) {
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

	render: function () {
		this.$el.addClass('mini-weebly');
		this.sideView = new MiniWeebly.Views.SideView({
			collection: this.collection
		});
		this.$el.append(this.sideView.render().$el);

		this.mainView = new MiniWeebly.Views.MainView({
			collection: this.collection,
			activePageId: this.activePageId
		});
		this.$el.append(this.mainView.render().$el);

		return this;
	}
});