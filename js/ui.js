YUI.add('ui', function(Y) {
 
    Y.namespace('ui');
 
	Y.ui = {
		_loader: undefined,
		_newsOverlay: undefined,
		_storyScrollview: undefined,


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
				p.addClass('hide');
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
		
		createStoriesScrollView: function() {
			/* ScrollView without scrollbar indicator */
			this._storyScrollview = new Y.ScrollView({
			    srcNode:"#storiesWrapper",
			    height:400,
			    flick: {
			                minDistance:1,
			                minVelocity:0.4,
			                axis: "y"
			            },
			    bounce:0.65,
			    deceleration:0.983
			});

			this._storyScrollview.render();
		},

		createFeaturesScrollView: function() {
			var scrollView = new Y.ScrollView({
				id: 'scrollview',
			    srcNode: '#featureWrapper',
			    width: 1024,
			    flick: {
			        minDistance:1,
			        minVelocity:0.4,
			        axis: "x"
			    },
			    deceleration: 0.983,
			    bounce:0.65,
			});
			Y.ScrollView.FRAME_STEP = 15;
			Y.ScrollView.EASING = "cubic-bezier(0.000, 1.000, 0.320, 1.000)";			
			scrollView.render();
			scrollView.scrollTo(1000,0,20000,"linear");
		},

		//o has properties content, imgUrl, header
		createNewsOverlay: function(o) {

			var self = this, html;
			if (!o.imgUrl) {
				html =  '<div id="content">'+o.content+'</div>';
			}
			else {
				html = '<div id="supportingImg"><img src="'+o.imgUrl+'"></div><div id="content">'+o.content+'</div>';
			}
			
			if (Y.Lang.isUndefined(self._newsOverlay)) {
				
				var overlay = new Y.Overlay({
					width:800,
					x:65,
					y:50,
					bodyContent: html,
					headerContent: o.header,
					visible: false,
					zIndex:1000,
					plugins: [Y.Plugin.OverlayModal]
				});

				overlay.render('#newsOverlay');
				overlay.get('contentBox').addClass('scrollable vertical');
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
    requires: ['base', 'overlay', 'gallery-overlay-extras', 'scrollview-base', 'scrollview-scrollbars','controller']
});