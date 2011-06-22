	YUI.add('controller', function(Y) {
	 
	    Y.namespace('controller');
	 
	    Y.controller = {
	    	init: function() {
				this.listen();
				this.listenToFooter();
				this.listenToFeatures();
				this.listenToCricketNextStories();
				this.listenToRefresh();
			},
			listen: function() {

				var self = this;
				Y.all('.story a, .story div').each(function(n) {
					self.stop(n);
				});
			},

			listenToFeatures: function() {
				Y.all(".featureLink").each(function(n) {
					//console.log(n);
					//console.log(Y.Node.create(n._node.parentNode).getDOMNode());
					n.on('click', function(e) {
						e.preventDefault();
						var href = e.currentTarget._stateProxy.href;
						Y.ui.showSpinner();
						Y.data.fetchCricinfoArticle(href);
						Y.ui.hideSpinner();
					});
				});
			},

			listenToCricketNextStories: function() {
				Y.all("div.cricketnext-cls a").each(function(n) {
					n.on('click', function(e) {
						e.preventDefault();
						console.log(e);
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
	 
	}, '1.0' /* module version */, {
	    requires: ['base','data','ui']
	});
