YUI({
	modules: {
		ui: {
			//fullpath: "http://localhost:8888/crictainment/js/ui.js",
			fullpath: "http://tilomitra.com/crictainment/js/ui.js",
			requires: ['base', 'overlay', 'gallery-overlay-extras', 'gallery-overlay-transition', 'tmscrollview', 'controller']
		},
		data: {
			//fullpath: "http://localhost:8888/crictainment/js/data.js",
			fullpath: "http://tilomitra.com/crictainment/js/data.js",
			requires: ['base', 'yql', 'resize-base', 'resize-constrain', 'controller', 'json']
		},

		controller: {
			//fullpath: "http://localhost:8888/crictainment/js/controller.js",
			fullpath: "http://tilomitra.com/crictainment/js/controller.js",
			requires: ['base','data','ui', 'gallery-outside-events']
		},

		tmscrollview: {
			//fullpath: "http://localhost:8888/crictainment/js/tm-scrollview-base.js",
			fullpath: "http://tilomitra.com/crictainment/js/tm-scrollview-base.js",
			requires: ['widget', 'event-gestures', 'transition']
		}
	}

}).use('data', 'ui', 'controller', function(Y) {


		var main = function() {

			//Y.ui.createSpinner(document.getElementById('small'), {color:'white'});
			//Y.ui.showSpinner();
			//Y.data.fetchFromHistory();

			//Y.data.showFeatures(Y.data.retrieveFeatures());
			//Y.data.showStories(Y.data.retrieveStories());
			Y.data.fetchHeadlines();
			Y.data.fetchStories();

			Y.ui.createFeaturesScrollView();
			Y.ui.createStoriesScrollView();

			Y.later(750,Y.controller,"init");
			Y.later(600, Y.ui, "instantiateNewsOverlay");

			//Y.ui.hideSpinner();
			
		}();
});