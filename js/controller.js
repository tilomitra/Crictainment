	YUI.add('controller', function(Y) {
	 
	    Y.namespace('controller');
	 
	    Y.controller = {
	    	init: function() {
				this.listen();
				this.listenToFooter();
				this.listenToFeaturesAndCricinfo();
				this.listenToCricketNextStories();
				this.listenToRefresh();
			},

			listen: function() {
				var moveContainerVertically = function(touchEvent) {
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
					
				};

				Y.one('#storiesWrapper').on('touchmove', Y.ui.moveContainerVertically);
				//Y.one('#photoWrapper').on('touchmove', moveContainerVertically);
			},

			listenToFeaturesAndCricinfo: function() {
				var fetchArticle = function(e) {
					e.preventDefault();
					var href = e.currentTarget._stateProxy.href;
					Y.ui.showSpinner();
					Y.data.fetchCricinfoArticle(href);
					Y.ui.hideSpinner();
				};

				Y.one('#featureWrapper').delegate("click", fetchArticle, ".featureStory a");
				Y.one('#storiesWrapper').delegate("click", fetchArticle, "div.cricinfo-cls a");
			},

			listenToCricketNextStories: function() {
				Y.all("div.cricketnext-cls a").each(function(n) {
					n.on('click', function(e) {
						e.preventDefault();
						var href = e.href;

					});
				});	
			},

			listenToNewsClose: function(overlay) {
				Y.one(".yui3-overlay").on('clickoutside', function(e) {
					overlay.get('boundingBox').removeClass('slideIn').addClass('slideOut');
				});
				Y.one('.closeNewsOverlayBtn').on('click', function(e) {
					overlay.get('boundingBox').removeClass('slideIn').addClass('slideOut');
				});
			},

			stop: function(n) {
				
				n.on('click', function(e) {
					e.preventDefault();
					//alert('ello');
				});
			},

			listenToRefresh: function() {
				Y.one('#refreshBtn').on('click', function(e) {
					e.preventDefault();
					Y.ui.createLoadingIndicator();
					Y.later(200, window.location, "reload");
				});	
			},

			listenToVideoList: function() {
				Y.all('.video').each(function(n) {
					n.on('click', function(e) {
						//console.log(e);
						//alert(e.currentTarget._node.id);
						var selected = Y.one('.selected');
						if (selected) {
							selected.removeClass('selected');
						}
						e.currentTarget._node.className += ' selected';
						Y.data.fetchVideoDetail(e.currentTarget._node.id);
					});
				});
			},

			listenToPhotoList: function() {
				Y.all('.thumb').each(function(n) {
					n.on('click', function(e) {
						//console.log(e);
						//alert(e.currentTarget._node.id);
						var selected = Y.one('.selectedPic');
						if (selected) {
							selected.removeClass('selectedPic');
						}
						e.currentTarget._node.className += ' selectedPic';
						Y.data.fetchPhotoDetail(e.currentTarget._node.id);
					});
				});	
			},

			listenToFooter: function() {
				Y.one('#videosLink').on('click', function(e) {

					e.preventDefault();
					if (Y.one('.selectedLink')) {
						Y.one('.selectedLink').removeClass('selectedLink');
					}
					
					this.addClass('selectedLink');
					Y.ui.showVideoHead();
					if (Y.one("#videoWrapper")) {
						Y.ui.showVideosBar();
					}
					else {
						Y.data.fetchVideos();
					}
					
				});

				Y.one('#newsLink').on('click', function(e) {

					e.preventDefault();
					if (Y.one('.selectedLink')) {
						Y.one('.selectedLink').removeClass('selectedLink');
					}
					this.addClass('selectedLink');
					//no need to fetch since it will prefetch. just show it
					Y.ui.showNewsBar();
					Y.ui.showNewsHead();
				});

				Y.one("#photosLink").on('click', function(e) {

					e.preventDefault();
					if (Y.one('.selectedLink')) {
						Y.one('.selectedLink').removeClass('selectedLink');
					}
					this.addClass('selectedLink');
					Y.ui.showPhotoHead();
					if (Y.one("#photoWrapper")) {
						Y.ui.showPhotosBar();
					}
					else {
						Y.data.fetchPictures();
					}
				});
			}
			// ,

			// slideBox: function() {
			// 	Y.one('#box').addClass('translate-slideIn animate');
			// 	Y.one('#box').on('click', function(e) {
			// 		Y.one('#box').removeClass('translate-slideIn').addClass('translate-slideOut');
			// 	});
			// }
	    }
	 
	}, '2.0' /* module version */, {
	    requires: ['base','data','ui']
	});
