	YUI.add('controller', function(Y) {
	 
	    Y.namespace('controller');
	 
	    Y.controller = {
	    	init: function() {
				this.listen();
				//this.listenToMenubar();
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
					console.log(n);
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

			listenToMenubar: function() {
				Y.one('#menubar ul').on('click', function(e) {
					e.preventDefault();
					if (e.target._node.id === "videos") {
						Y.data.fetchVideos();
					}
				});
			}
	    }
	 
	}, '1.0' /* module version */, {
	    requires: ['base','data','ui']
	});
