	YUI.add('controller', function(Y) {
	 
	    Y.namespace('controller');
	 
	    Y.controller = {
	    	init: function() {
				this.listen();
				this.listenToFooter();
				this.listenToFeatures();
			},
			listen: function() {

				var self = this;
				Y.all('#stories a, #stories div').each(function(n) {
					self.stop(n);
				});
			},

			listenToFeatures: function() {
				Y.all(".featureLink").each(function(n) {
					//console.log(n);
					//console.log(Y.Node.create(n._node.parentNode).getDOMNode());
					n.on('click', Y.data.fetchCricinfoArticle);
				});
			},

			listenToNewsClose: function(overlay) {
				Y.one(".yui3-overlay-mask").on('click', function(e) {
					overlay.set('visible', false);
				});	
			},

			stop: function(n) {
				
				n.on('click', function(e) {
					e.preventDefault();
					//alert('ello');
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

			listenToFooter: function() {
				Y.one('#videosLink').on('click', function(e) {
					e.preventDefault();
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

					//no need to fetch since it will prefetch. just show it
					Y.ui.showNewsBar();
					Y.ui.showNewsHead();
				});
			}
	    }
	 
	}, '1.0' /* module version */, {
	    requires: ['base','data','ui']
	});
