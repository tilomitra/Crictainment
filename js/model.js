YUI().use('node', 'yql', 'datasource', 'dataschema', 'scrollview-base', "scrollview-paginator", "scrollview-scrollbars", function(Y) {

	var pipeModel = {
		
		//fetch stuff from pipe
		fetchStories: function() {
			//other: http://pipes.yahoo.com/pipes/pipe.run?_id=lrs3aorM2xGxkmAOJjBjOg&_render=rss
			//mine: 'http://pipes.yahoo.com/pipes/pipe.run?_id=151e9e4b100e74de48458aa2a2d871ef&_render=rss
			var q = "select * from rss where url='http://pipes.yahoo.com/pipes/pipe.run?_id=151e9e4b100e74de48458aa2a2d871ef&_render=rss'";
			var self = this;
			Y.YQL(q, function(r) {
				
		     	console.log(r.query.results.item);
		     	self.showStories(r.query.results.item)
		     	//return r.query.results.item;


		     });
		},

		//fetch top stories + images from cricinfo through a pipe
		//the objects have properties: imgUrl, href, content (content = headline)
		fetchHeadlines: function() {
			var self = this,
			q = 'http://pipes.yahoo.com/pipes/pipe.run?_id=c3cd69ca77952e081cdaa2604bace3f9&_render=json';
			Y.YQL('select * from json where url = "' + q + '"', function(r) {

				var items = r.query.results.json.value.items,
				i = 0,
				l = undefined;

				for ( ; i < items.length; i++) {
					l = items[i].image.length;
					items[i].imgUrl = items[i].image[l - 1].content;

					delete items[i].image;
				}

				self.showFeatures(items);
				

			});
		},


		/* DISPLAY METHODS */

		showStories: function(feed) {
			var html = "<div id='stories'>",
			len = feed.length;

			//show most recent 6 feeds
			for (var i = 0; i < 13; i++) {
				console.log(this._determineFeedHost(feed[i].link));
				html += '<div class="yui3-u-7-24 story">';
				html += '<h3><a href="'+feed[i].link+'">'+feed[i].title+'</a></h3>';
				html += '<p>'+this._stripHTML(feed[i].description)+'</p>';
				html += "</div>";
			}

			html += "</div>"

			Y.one('#storiesWrapper').appendChild(html);

		},

		showFeatures: function(o) {
				var HTML_TEMPLATE = '<div class="yui3-u-1-3 featureStory" data={href}><div class="title">{title}</div><img src="{image}"></div>',
				html = '',
				i = 0;

				for (; i < o.length; i++) {
					var d = {
						title: o[i].content,
						image: o[i].imgUrl,
						href: o[i].href
					};

					html += Y.Lang.sub(HTML_TEMPLATE, d);	
				}

				Y.one("#featureWrapper").append(html);

		},


		/* UTILITY METHODS */


		//takes an URL and returns the hostname (ie: cricinfo.com)
		_determineFeedHost: function(txt) {
			var re1='.*?';	// Non-greedy match on filler
			var re2='((?:[a-z][a-z\\.\\d\\-]+)\\.(?:[a-z][a-z\\-]+))(?![\\w\\.])';	// Fully Qualified Domain Name 1

			var p = new RegExp(re1+re2,["i"]);
			var m = p.exec(txt);
			if (m != null)
			{
			    var fqdn1=m[1];
			    fqdn1 = fqdn1.replace(/</,"&lt;");

			    return fqdn1;
			    //document.write("("+fqdn1.replace(/</,"&lt;")+")"+"\n");
			}
		},


		//Takes in a string and returns a string without any HTML inside it (just text)
		_stripHTML: function(txt) {
			return txt.replace(/<\/?[^>]+(>|$)/g, "");
		}

	};

	var ui = {
		
		createBaseScrollView: function() {
			/* ScrollView without scrollbar indicator */
			var scrollview = new Y.ScrollView({
			    srcNode:"#storiesWrapper",
			    height:362,
			    flick: {
			                minDistance:10,
			                minVelocity:0.3,
			                axis: "y"
			            }
			});

			scrollview.plug(Y.Plugin.ScrollViewScrollbars);
			scrollview.scrollbars.show();

			scrollview.render();
		},

		createFeatureList: function() {
			var scrollView = new Y.ScrollView({
				id: 'scrollview',
			    srcNode: '#featureWrapper',
			    width: 1024,
			    flick: {
			        minDistance:10,
			        minVelocity:0.3,
			        axis: "x"
			    }
			});

			scrollView.plug(Y.Plugin.ScrollViewPaginator, {
			        selector: "div" // elements definining page boundaries
			});
			 
			scrollView.render();
		}
	}



	var main = function() {
		
		ui.createBaseScrollView();
		//ui.createFeatureList();
		var items = pipeModel.fetchStories();
		pipeModel.fetchHeadlines();

		ui.createBaseScrollView();
		//ui.createFeatureList();
		//console.log(items);
		//pipeModel.show(items);

	}();
	
});