YUI({
	modules: {
		ui: {
			fullpath: "http://sandbox.tilomitra.com/crictainment2/js/ui.js",
			requires: ['base', 'overlay', 'gallery-overlay-extras', 'scrollview-base','scrollview-scrollbars', 'controller']
		},
		data: {
			fullpath: "http://sandbox.tilomitra.com/crictainment2/js/data.js",
			requires: ['base', 'yql', 'resize-base', 'resize-constrain', 'controller', 'json']
		},

		controller: {
			fullpath: "http://sandbox.tilomitra.com/crictainment2/js/controller.js",
			requires: ['base','data','ui']
		}
	}

}).use('data', 'ui', 'controller', function(Y) {


		var main = function() {

			//Y.data.fetchFromHistory();

			//Y.data.showFeatures(Y.data.retrieveFeatures());
			//Y.data.showStories(Y.data.retrieveStories());
			Y.data.fetchHeadlines();
			Y.data.fetchStories();

			Y.ui.createFeaturesScrollView();
			Y.ui.createStoriesScrollView();

			Y.later(1500,Y.controller,"init");
			
		}();
});