YUI.add('ui', function(Y) {
 
    Y.namespace('ui');
 
	Y.ui = {
		_loader: undefined,
		_newsOverlay: undefined,

		showNewsBar: function() {

			var v = Y.one('#videoWrapper'),
			s = Y.one("#storiesWrapper"),
			p = Y.one("#photoWrapper");
			
			//if videoWrapper exists and is not hidden
			if (v && !(v.hasClass('hide'))) {
				v.addClass('hide');
			}

			//if photoWrapper exists and is not hidden
			if (p && !(p.hasClass('hide'))) {
				v.addClass('hide');
			}

			if (s.hasClass('hide')) {
				s.removeClass('hide');
			}
		},

		hideNewsBar: function() {
			Y.one("#storiesWrapper").addClass('hide');
		},

		showVideosBar: function() {
			var s = Y.one("#storiesWrapper"),
				v = Y.one('#videoWrapper'),
				p = Y.one("#photoWrapper");

			//if stories wrapper exists and is not hidden
			if (s && !(s.hasClass('hide'))) {
				s.addClass('hide');
			}

			//if photoWrapper exists and is not hidden
			if (p && !(p.hasClass('hide'))) {
				p.addClass('hide');
			}


			if (v.hasClass('hide')) {
				v.removeClass('hide');
			}
			

		},


		showPhotosBar: function() {
			var s = Y.one("#storiesWrapper"),
				v = Y.one('#videoWrapper'),
				p = Y.one("#photoWrapper");

			//if stories wrapper exists and is not hidden
			if (s && !(s.hasClass('hide'))) {
				s.addClass('hide');
			}

			//if videowrapper exists and is not hidden
			if (v && !(v.hasClass('hide'))) {
				v.addClass('hide');
			}


			if (p.hasClass('hide')) {
				p.removeClass('hide');
			}
			

		},


		showVideoHead: function() {
			var h3 = Y.one('#colorHead h3');
			h3.setContent('Videos and Highlights');
		},

		showNewsHead: function() {
			var h3 = Y.one('#colorHead h3');
			h3.setContent('News and Views');
		},

		showPhotoHead: function() {
			var h3 = Y.one('#colorHead h3');
			h3.setContent('Recent Photos');
		},

		createLoadingIndicator: function() {
			this._loader = new Y.Overlay({
				srcNode: "#load",
				bodyContent: "crictainment is refreshing your content...",
				centered:true,
				visible:false,
				width: 200,
				zIndex:2000,
				plugins: [Y.Plugin.OverlayModal, Y.Plugin.OverlayKeepaligned]
			});

			this._loader.render();
			this._loader.show();


		},
		
		// createBaseScrollView: function() {
		// 	/* ScrollView without scrollbar indicator */
		// 	var scrollview = new Y.ScrollView({
		// 	    srcNode:"#storiesWrapper",
		// 	    height:420,
		// 	    flick: {
		// 	                minDistance:2,
		// 	                minVelocity:0.3,
		// 	                axis: "y"
		// 	            },
		// 	    bounce:0.9,
		// 	    deceleration:0.999
		// 	});

		// 	scrollview.render();
		// },

		// createFeatureList: function() {
		// 	var scrollView = new Y.ScrollView({
		// 		id: 'scrollview',
		// 	    srcNode: '#featureWrapper',
		// 	    width: 1024,
		// 	    flick: {
		// 	        minDistance:10,
		// 	        minVelocity:0.3,
		// 	        axis: "x"
		// 	    }
		// 	});

		// 	scrollView.plug(Y.Plugin.ScrollViewPaginator, {
		// 	        selector: "div" // elements definining page boundaries
		// 	});
			 
		// 	scrollView.render();
		// },

		//o has properties content, imgUrl, header
		createNewsOverlay: function(o) {
			var self = this,
			html = '<div id="supportingImg"><img src="'+o.imgUrl+'"></div><div id="content">'+o.content+'</div>';
			if (Y.Lang.isUndefined(self._newsOverlay)) {
				
				var overlay = new Y.Overlay({
					width:800,
					x:65,
					y:100,
					bodyContent: html,
					headerContent: o.header,
					visible: false,
					zIndex:1000,
					plugins: [Y.Plugin.OverlayModal]
				});
				overlay.get('contentBox').addClass('scrollable vertical');
				overlay.render('#newsOverlay');
				self._newsOverlay = overlay;

			}

			else {
				self._newsOverlay.setAttrs({
					bodyContent: html,
					headerContent: o.header,
					visible: false
				});
			}

			return self._newsOverlay;
		}
	};
 
}, '1.0' /* module version */, {
    requires: ['base', 'overlay', 'gallery-overlay-extras', 'controller']
});