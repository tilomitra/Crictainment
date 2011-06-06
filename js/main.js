YUI({
	modules: {
		ui: {
			fullpath: "http://sandbox.tilomitra.com/crictainment/js/ui.js",
			requires: ['base', 'overlay', 'gallery-overlay-extras', 'controller']
		},
		data: {
			fullpath: "http://sandbox.tilomitra.com/crictainment/js/data.js",
			requires: ['base', 'yql', 'resize-base', 'resize-constrain', 'controller']
		},

		controller: {
			fullpath: "http://sandbox.tilomitra.com/crictainment/js/controller.js",
			requires: ['base','data','ui']
		}
	},
	filter: "raw"

}).use('data', 'ui', 'controller', function(Y) {


		var main = function() {
			Y.data.fetchHeadlines();
			Y.data.fetchStories();
			Y.later(1500,Y.controller,"init");
			
		}();
});