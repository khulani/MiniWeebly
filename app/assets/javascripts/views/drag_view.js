MiniWeebly.Views.DragView = Backbone.View.extend({
	initialize: function () {
		this.layout = [];
	},

	events: {
		'dragover .layout': 'findPosition',
		'dragstart': 'trackDragged',
		'drop': 'updateLayout',
		'dragover .body': 'makeDroppable'
	},

	trackDragged: function (event) {
		this.dragging = event.target.getAttribute('id');
		this.dragged = event.target;
	},

	updateLayout: function (event) {
		// console.log(this.dragging);
		var dropSpot = event.target.getAttribute('class');
		if (this.dragging) {
			var layout = new MiniWeebly.Views.LayoutView({ dragging: this.dragging });

			if (dropSpot === 'layout-hori' || dropSpot === 'layout') {
				$(event.target).after(layout.render().$el);
			} else if (dropSpot === 'layout-text' || dropSpot === 'layout-title') {
				$(event.target).parent().after(layout.render().$el);
			} else {
				this.$el.find('.body').append(layout.render().$el);
			}
		} else {
			if (dropSpot === 'layout-hori' || dropSpot === 'layout') {
				$(event.target).after(this.dragged);
			} else if (dropSpot === 'layout-text' || dropSpot === 'layout-title') {
				$(event.target).parent().after(this.dragged);
			} 
		}
	},

	makeDroppable: function (event) {
		event.preventDefault();
		// debugger;
	},

	findPosition: function (event) {
		// event.preventDefault();
		var $curr = $(event.currentTarget);
		var x = event.pageX - $curr.offset().left;
		var y = event.pageY - $curr.offset().top;
		var h = $curr.height();
		var w = $curr.width();
		if (y / h < .2) {
			console.log('top');
		} else if (y / h > .8) {
			console.log('bottom');
		} else if (x / w < .5) {
			console.log('left');
		} else if (x / w >= .5) {
			console.log('right');
		}
		// debugger;
	},

	render: function () {
		this.$el.addClass('mini-weebly');
		this.sideView = new MiniWeebly.Views.SideView({
			collection: this.collection,
			model: this.model
		});
		this.$el.append(this.sideView.render().$el);

		this.mainView = new MiniWeebly.Views.MainView({
			collection: this.collection
		});
		this.$el.append(this.mainView.render().$el);

		return this;
	}
});