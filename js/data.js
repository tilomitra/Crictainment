	YUI.add('data', function(Y) {
	 
	    Y.namespace('data');
	 
	    Y.data = {
	    	
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

	    	//This method gets video pipe from criconline.tv
	    	fetchVideos: function() {
	    		
	    		var pipe = 'http://pipes.yahoo.com/pipes/pipe.run?_id=f18764ad8f224b5e0b4bae4658245057&_render=rss';

	    		Y.YQL('select * from rss where url = "' + pipe + '"', function(r) {
	    			console.log(r);
	    		});
	    			
	    	},


	    	/* DISPLAY METHODS */

	    	showStories: function(feed) {
	    		var html = "<div id='stories'>",
	    		len = feed.length;

	    		//show most recent 6 feeds
	    		for (var i = 0; i < len; i++) {
	    			console.log(this._determineFeedHost(feed[i].link));
	    			html += '<div class="yui3-u-7-24 story"><a href="'+feed[i].link+'">';
	    			html += '<h3>'+feed[i].title+'</h3>';
	    			html += '<p class="author"> From '+this._determineFeedHost(feed[i].link)+'</p>';
	    			html += '<p>'+this._stripHTML(feed[i].description)+'</p>';
	    			html += "</a></div>";
	    		}

	    		html += "</div>"

	    		Y.one('#storiesWrapper').appendChild(html);

	    	},

	    	showFeatures: function(o) {
	    			var HTML_TEMPLATE = '<div class="yui3-u-1-3 featureStory" data={href}><a href="{href}"><div class="title">{title}</div><img src="{image}"></a></div>',
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
	    		    var t=m[1];
	    		    t = t.replace(/</,"&lt;");

	    		    return this._humanizeSite(t);
	    		    //document.write("("+fqdn1.replace(/</,"&lt;")+")"+"\n");
	    		}
	    	},


	    	//Takes in a string and returns a string without any HTML inside it (just text)
	    	_stripHTML: function(txt) {
	    		return txt.replace(/<\/?[^>]+(>|$)/g, "");
	    	},

	    	_humanizeSite: function(url) {
	    		var hash = {
	    			"live-feeds.cricbuzz.com": "Cricbuzz",
	    			"timesofindia.feedsportal.com": "Times of India",
	    			"cricketnext.in.com": "CricketNext",
	    			"www.espncricinfo.com": "Cricinfo"
	    		};

	    		if (hash[url]) {
	    			return hash[url];
	    		}
	    		else {
	    			return url;
	    		}
	    	}
	    }
	 
	}, '1.0' /* module version */, {
	    requires: ['base', 'yql']
	});