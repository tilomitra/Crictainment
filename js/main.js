YUI({
	modules: {
		ui: {
			fullpath: "http://sandbox.tilomitra.com/crictainment/js/ui.js",
			requires: ['base', 'scrollview-base', 'scrollview-paginator', 'overlay', 'gallery-overlay-extras']
		},
		data: {
			fullpath: "http://sandbox.tilomitra.com/crictainment/js/data.js",
			requires: ['base', 'yql']
		},

		controller: {
			fullpath: "http://sandbox.tilomitra.com/crictainment/js/controller.js",
			requires: ['base','data','ui']
		}
	},
	filter: "raw"

}).use('data', 'ui', 'controller', function(Y) {


		var main = function() {
			
			//Y.ui.createLoadingIndicator();
			//Y.ui.createBaseScrollView();
			//ui.createFeatureList();
			Y.data.fetchStories();

			//Y.ui._loader.set('bodyContent', 'Loading complete. Enjoy! :)');
			Y.data.fetchHeadlines();
			//Y.ui.createBaseScrollView();

			//Y.ui._loader.hide();

			//hardcoded, should be changed.
			//Y.later(2000, Y.ui, 'createBaseScrollView');
			Y.later(1500,Y.controller,"init");
			
		}();
});