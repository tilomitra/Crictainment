YUI({
	modules: {
		ui: {
			fullpath: "http://localhost:8888/crictainment/js/ui.js",
			requires: ['base', 'scrollview-base', 'scrollview-paginator', 'overlay', 'gallery-overlay-extras']
		},
		data: {
			fullpath: "http://localhost:8888/crictainment/js/data.js",
			requires: ['base', 'yql']
		},

		controller: {
			fullpath: "http://localhost:8888/crictainment/js/controller.js",
			requires: ['base','data','ui']
		}
	}

}).use('data', 'ui', 'controller',s function(Y) {

	var main = function() {
		
		Y.ui.createLoadingIndicator();
		//ui.createBaseScrollView();
		//ui.createFeatureList();
		var items = Y.data.fetchStories();

		Y.ui._loader.set('bodyContent', 'Loading complete. Enjoy! :)');
		Y.data.fetchHeadlines();
		Y.ui.createBaseScrollView();

		Y.ui._loader.hide();

		//hardcoded, should be changed.
		//Y.later(1500, ui, 'createBaseScrollView');
		Y.later(1500,Y.controller,"init");
		
	}();
	
});