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

		instantiateNewsOverlay: function() {
			var overlay = new Y.Overlay({
				width:512,
				//x:,
				//y:50,
				align: {
					points: ["rc", "rc"]
				},
				bodyContent: "Loading",
				visible: false,
				zIndex:1000//,
				//plugins: [Y.Plugin.OverlayModal]
			});

			overlay.render("#newsOverlay");
			overlay.get('boundingBox').addClass('translate-3d');
			overlay.get('contentBox').addClass('scrollable vertical');
			this._newsOverlay = overlay;

		},

		//o has properties content, imgUrl, header
		createNewsOverlay: function(o) {

			var self = this,
			html,
			buttonHTML = '<input type="button" value="Close" class="closeNewsOverlayBtn"><br/>';
			if (!o.imgUrl) {
				html =  '<div id="content">'+o.content+'</div>';
			}
			else {
				html = '<div id="supportingImg"><img src="'+o.imgUrl+'"></div><div id="content">'+o.content+'</div>';
			}
			//before bodyContent changes, slide it out
			// self._newsOverlay.on('bodyContentChange', function(e) {
			// 	self._newsOverlay.get('boundingBox').removeClass('slideIn').addClass('slideOut');
			// });
			
			//after body content changes, slide it back in.
			self._newsOverlay.after('bodyContentChange', function(e) {
				self._newsOverlay.get('boundingBox').removeClass('slideOut').addClass('slideIn')
			});

			self._newsOverlay.setAttrs({
				bodyContent: html,
				headerContent: buttonHTML + o.header,
				visible:true
			});

			return self._newsOverlay;

		},

		moveContainerVertically: function(touchEvent) {
			//console.log(touchEvent.targetTouches.length);

			if (touchEvent.targetTouches.length === 2) {
				
				var avgScreenY = Math.round((touchEvent.touches[0].pageY + touchEvent.touches[1].pageY)/2);
				//console.log(avgScreenY);
				var w = Y.one('#storiesContainer');
				var top = w.get("offsetTop");
				var offset = avgScreenY - top;
				//avgScreenY = (avgScreenY > 40) ? avgScreenY : 40;
				w.setStyle('top', avgScreenY + offset + 'px');
			}
			
		}//,

		// createSpinner: function(canvas, options) {
		// 	if (!options) {
		// 	  options = {};
		// 	}
		// 	if (!options.scale) {
		// 	  options.scale = 1;
		// 	}
			
		// 	var width = (options.width || 3) * options.scale;
		// 	var inner = (options.inner || 8.70) * options.scale;
		// 	var outer = (options.outer || 14.42) * options.scale;
		// 	var color = options.color || '#191919';
		// 	var count = options.sectors || 12;
		// 	var delay = 1000 / (options.speed || 2) / count;
			
		// 	var center = Math.ceil(outer + width);
			
		// 	canvas.height = canvas.width = center * 2;
		// 	var context = canvas.getContext('2d');
		// 	context.lineWidth = width;
		// 	context.lineCap = 'round';
		// 	context.strokeStyle = color;
			
		// 	var lowestOpacity = 0.18
			
		// 	var sectors = [];
		// 	var opacity = [];
		// 	for (var i = 0; i < count; i++) {
		// 	  var a = 2 * Math.PI / count * i - Math.PI / 2;
		// 	  var cos = Math.cos(a);
		// 	  var sin = Math.sin(a);
		// 	  sectors[i] = [inner * cos, inner * sin, outer * cos, outer * sin];
		// 	  opacity[i] = Math.pow(i / (count - 1), 1.8) * (1 - lowestOpacity) + lowestOpacity;
		// 	}
			
		// 	var timer;
		// 	var counter = 0;
		// 	(function frame() {
		// 	  context.clearRect(0, 0, canvas.width, canvas.height);
		// 	  opacity.unshift(opacity.pop());
		// 	  for (var i = 0; i < count; i++) {
		// 	    context.globalAlpha = opacity[i];
		// 	    context.beginPath();
		// 	    context.moveTo(center + sectors[i][0], center + sectors[i][1]);
		// 	    context.lineTo(center + sectors[i][2], center + sectors[i][3]);
		// 	    context.stroke();
		// 	  }
			  
		// 	  if (counter < count) {
		// 	    var link = document.createElement('a');
		// 	    link.innerHTML = canvas.id + '-' + (counter + 1);
		// 	    link.href = canvas.toDataURL();
		// 	    document.body.appendChild(link);
		// 	  counter += 1;
		// 	  }
			  
		// 	  timer = setTimeout(frame, delay);
		// 	})();
			
		// 	return function () {
		// 	  clearTimeout(timer);
		// 	};
		// },

		// showSpinner: function() {
		// 	Y.one("#loading").removeClass('hide');
		// },

		// hideSpinner: function() {
		// 	Y.one('#loading').addClass('hide');
		// }
	};
 
}, '1.0' /* module version */, {
    requires: ['base', 'overlay', 'gallery-overlay-extras', 'gallery-overlay-transition', 'scrollview-base', 'scrollview-scrollbars','controller']
});