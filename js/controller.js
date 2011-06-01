	YUI.add('controller', function(Y) {
	 
	    Y.namespace('controller');
	 
	    Y.controller = {
	    	init: function() {
				this.listen();
				this.listenToMenubar();	
			},
			listen: function() {

				var self = this;
				Y.all('#stories a, #stories div').each(function(n) {
					self.stop(n);
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
						pipeModel.fetchVideos();
					}
				});
			}
	    }
	 
	}, '1.0' /* module version */, {
	    requires: ['base','data','ui']
	});
