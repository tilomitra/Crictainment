	YUI.add('data', function(Y) {
	 
	    Y.namespace('data');
	 
	    Y.data = {
	    	//object of videos retrieved from cricketOnline
	    	videoData: undefined,

	    	//pictures and their thumbnails
	    	pictureData: undefined,

	    	//featured articles from cricinfo and their pictures
	    	featureData: undefined,

	    	storyData: undefined,

	    	//fetch stuff from pipe
	    	fetchStories: function() {
	    		//other: http://pipes.yahoo.com/pipes/pipe.run?_id=lrs3aorM2xGxkmAOJjBjOg&_render=rss
	    		//mine: 'http://pipes.yahoo.com/pipes/pipe.run?_id=151e9e4b100e74de48458aa2a2d871ef&_render=rss
	    		var q = "select * from rss where url='http://pipes.yahoo.com/pipes/pipe.run?_id=151e9e4b100e74de48458aa2a2d871ef&_render=rss'";
	    		var self = this;
	    		Y.YQL(q, function(r) {
	    			
	    			if (r.query.results) {
	    				self.showStories(r.query.results.item);
	    				self.showStories(r.query.results.item);
	    			}
	    			else {
	    				self.showStories(self.retrieveStories());
	    			}
	    	     });
	    	},

	    	//fetch top stories + images from cricinfo through a pipe
	    	//the objects have properties: imgUrl, href, content (content = headline)
	    	fetchHeadlines: function() {
	    		var self = this,
	    		q = 'http://pipes.yahoo.com/pipes/pipe.run?_id=c3cd69ca77952e081cdaa2604bace3f9&_render=json';
	    		Y.YQL('select * from json where url = "' + q + '"', function(r) {
	    			

	    			//if you get something back, then display it - otherwise get it from history
	    			if (r.query.results) {
		    			var items = r.query.results.json.value.items,
		    			i = 0,
		    			l = undefined,
		    			z = undefined;

		    			for ( ; i < items.length; i++) {
		    				console.log(items[i]);
		    				//store the id and imgUrl
		    				if (Y.Lang.isArray(items[i].image)) {
		    					l = items[i].image.length;
	    						items[i].id = i;
	    						items[i].imgUrl = items[i].image[l-1].content;
		    					delete items[i].image;
		    				}

		    			}

		    			Y.one("#featureWrapper").setStyle('width', items.length*330 +'px');
		    			self.storeFeatures(items);
		    			self.showFeatures(items);
	    			}
	    			else {
	    				self.showFeatures(self.retrieveFeatures());
	    			}

	    		});
	    	},

	    	//This method gets video pipe from criconline.tv
	    	fetchVideos: function() {
	    		
	    		var pipe = 'http://pipes.yahoo.com/pipes/pipe.run?_id=f18764ad8f224b5e0b4bae4658245057&_render=rss',
	    		self = this;

	    		Y.YQL('select * from rss where url = "' + pipe + '"', function(r) {
	    			if (r.query.results) {
	    				self.videoData = r.query.results.item;
	    				self.showVideos(r.query.results.item);
	    			}
	    			else {
	    				
	    			}
	    		});
	    			
	    	},

	    	fetchVideoDetail: function(key) {
	    		//get the number from the end of the id
	    		var index = key.split('-')[1],
	    		link = this.videoData[index].link,
	    		title = this.videoData[index].title,
	    		q = "select p.iframe from html where url=\""+ link + "\" and xpath='//div[@class=\"entry-content\"]'";
	    		
	    		console.log(this.videoData);
	    		Y.YQL(q, function(r) {
	    			var o = {
	    				videos: [],
	    				title: title
		    		};

	    			//if there are some iframes returned..
	    			if (r.query.results.div !== null) {
	    				r = r.query.results.div;
	    				for (var i = 0; i < r.length; i++) {
	    					o.videos[i] = r[i].p.iframe;
	    				}
	    			}
	    			Y.data.showVideoDetail(o);

	    		});
	    	},

	    	//get the data for the cricinfo article given some article was clicked. get content + img, launch overlay.
	    	fetchCricinfoArticle: function(e) {
	    		e.preventDefault();
	    		
	    		var href = e.currentTarget._stateProxy.href,
	    		query = "select * from html where url='"+href+"' and xpath='//p[@class=\"news-body\"] | //td[@class=\"phototbl\"]/img | //h1[@class=\"magHead\"]'",
	    		self = this,
	    		o = {
	    			content	: '',
	    			imgUrl	: undefined, //this may not be there at all and i dont wanna deal with empty strings
	    			header	: ''
	    		};


	    		Y.YQL(query, function(r) {

	    			//get the header
	    			o.header = r.query.results.h1.content;

	      			//concat the content
	      			for (var i=0; i<r.query.results.p.length; i++) {
	      				o.content += '<p>'+r.query.results.p[i].content+'</p>';
	      			}
	      			
	      			//provide img url
	      			if (r.query.results.img) {
	      				o.imgUrl = 'http://www.cricinfo.com' + r.query.results.img.src;
	      			}

	      			var overlay = Y.ui.createNewsOverlay(o);
	      			overlay.show();
	      			Y.one('#newsOverlay').setStyle('display', 'block');
	      			Y.controller.listenToNewsClose(overlay);
	      			//overlay.get('contentBox').removeClass('animate translate-3d');
	      			//Y.later(1000, function()); //overlay.set('visible', true);

	      			

	      		});
	    	},

	    	//fetches array of preview images and their larger images from Yahoo Cricket Photos of the Week
	    	fetchPictures: function() {
	    		var q = "select * from html where url=\"http://www.espncricinfo.com/ci/content/image/517673.html?page=1\" and xpath='//div[@id=\"pList\"]/ul/li/div/span/a/img'",
	    		self = this;
	    		Y.YQL(q, function(r) {
	    			var pics = r.query.results.img;

	    			self.pictureData = pics;

	    			self.showPictures();

	    		});	
	    	},

	    	fetchPhotoDetail: function(key) {
	    		var index = key.split('-')[1],
	    		s = this.pictureData[index].src.split('.icon'),
	    		fullUrl = "http://www.espncricinfo.com" + s[0] + s[1];
	    		this.showPhotoDetail({
	    			url: fullUrl,
	    			caption: this.pictureData[index].title
	    		});
	    	},

	    	/*STORAGE METHODS*/

	    	storeFeatures: function(features) {
	    		if (!localStorage["features"]) {
	    			localStorage["features"] = Y.JSON.stringify(features);
	    		}	
	    	},

	    	retrieveFeatures: function() {
	    		var features = Y.JSON.parse(localStorage["features"]);
	    		return features;
	    	},

	    	storeStories: function(stories) {
	    		if (!localStorage["stories"]) {
	    			localStorage["stories"] = Y.JSON.stringify(stories);
	    		}
	    	},

	    	retrieveStories: function() {
	    		var stories = Y.JSON.parse(localStorage["stories"]);
	    		return stories;
	    	},













	    	/* DISPLAY METHODS */

	    	showFeatures: function(o) {
				var HTML_TEMPLATE = '<td><div class="featureStory" id="{divId}"><a class="featureLink" href="{href}"><div class="title">{title}</div><img src="{image}"></a></div></td>',
				html = '',
				i = 0;

				for (; i < o.length; i++) {
					var d = {
						title: o[i].content,
						image: o[i].imgUrl || 'http://sandbox.tilomitra.com/crictainment/img/default-feature-image-1.png',
						href: o[i].href,
						divId: "feature-"+o[i].id
					};

					html += Y.Lang.sub(HTML_TEMPLATE, d);	
					
				}
				html =  "<table><tr>" + html + "</tr></table";

				Y.one('#featureWrapper').get('children').remove();

				Y.one("#featureWrapper").append(html);

				Y.one('#featureWrapper').setStyle('marginLeft', '-35px');

	    	},

	    	showStories: function(feed) {
	    		var html = "",
	    		len = feed.length;

	    		//show 1/3 of the feeds
	    		for (var i = 0; i < len/3; i++) {
	    			//console.log(this._determineFeedHost(feed[i].link));
	    			var o = this._determineFeedHost(feed[i].link);

	    			html += '<div class="yui3-u-7-24 story"><a href="'+feed[i].link+'">';
	    			html += '<h3>'+feed[i].title+'</h3>';
	    			html += '<p class="yui3-u author ' + o.cls + '">From '+ o.url +'</p>';
	    			html += '<p>'+this._stripHTML(feed[i].description)+'</p>';
	    			html += "</a></div>";
	    		}

	    		Y.one('#storiesWrapper').appendChild(html);
	    		
	    		var resize = new Y.Resize({
	    			node: Y.one("#storiesContainer")
	    		});
    		    resize.plug(Y.Plugin.ResizeConstrained, {
    			    minWidth: 983,
    			    minHeight: 100,
    			    maxWidth: 983,
    			    maxHeight: 696,
    			    preserveRatio: false
    		    });

    		    resize.on('resize:resize', function(e) {
    		    	var height = e.currentTarget.info.offsetHeight;
    		    	Y.ui._storyScrollview.set('height', height);
    		    });

	    	},

	    	showVideos: function(items) {
	    		var template = '<div class="yui3-u-1 video" id="video-{num}"><h2>{title}</h2>{desc}</div>',
	    		html = '<div class="yui3-u-1" id="videoWrapper"><div class="scrollable vertical yui3-u-1-3" id="videoList">';

	    		for (var i = 0; i < items.length; i++) {
	    			html += Y.Lang.sub(template, {
	    				title: items[i].title,
	    				num: ''+i,
	    				desc: this._stripHTML(items[i].description)
	    			});
	    		}

	    		html += '</div><div id="videoDetailWrap"><div class="scrollable vertical yui3-u-1" id="videoDetail"><div class="detailPlaceholder"><img src="img/vid-icon.png"><div class="label">Select a reel from the left.</div></div></div></div></div>';

	    		//hide the news stuff
	    		Y.ui.hideNewsBar();

	    		Y.one("#storiesContainer").appendChild(html);

	    		Y.controller.listenToVideoList();
	    			
	    	},
	    	

	    	//o is objectliteral with title, videos[] 
	    	showVideoDetail: function(o) {



	    		var html = '<h4>Watching highlights for '+ o.title + '</h4>',
	    		videos = o.videos,
	    		detailDiv = Y.one('#videoDetail');

	    		detailDiv.get('children').remove();

	    		if (videos.length > 0) {
					for (var i = 0; i < videos.length; i++) {
						html += '<p><iframe frameborder="'+videos[i].frameborder+'" height="'+videos[i].height/1.2+'" src="'+videos[i].src+'" width="'+videos[i].width/1.2+'"></iframe></p>';
					}	    			
	    		}
	    		else {
	    			html = "<h4>Videos could not be retrieved.</h4>";
	    		}

	    		
	    		detailDiv.appendChild(html);
	    	},

	    	//o is object literal with url, caption properties
	    	showPhotoDetail: function(o) {
	    		var html = '<div id="largeImage"><img src="'+o.url+'"><div class="caption">'+o.caption+'</div></div>',
	    		detailPhoto = Y.one("#photoDetail");

	    		detailPhoto.get('children').remove();

	    		detailPhoto.appendChild(html);
	    	},

	    	showPictures: function() {
	    		var template = '<div class="yui3-u-1-3 thumb" id="thumb-{num}"><img src="{src}"></div>',
	    		html = '<div class="yui3-u-1" id="photoWrapper"><div class="scrollable vertical horizontal yui3-u-1-3" id="thumbList">';

	    		for (var i = 0; i < this.pictureData.length; i++) {
	    			html += Y.Lang.sub(template, {
	    				src: 'http://www.espncricinfo.com' + this.pictureData[i].src,
	    				num: ''+i
	    			});
	    		}

	    		html += '</div><div id="photoDetailWrap"><div class="scrollable vertical yui3-u-1" id="photoDetail"><div class="detailPlaceholder"><img src="img/photo-icon.png"><div class="label">Browse photos from the left.</div></div></div></div></div>';

	    		//hide the news stuff
	    		//Y.ui.hideNewsBar();
	    		//hide the video stuff

	    		Y.one("#storiesContainer").appendChild(html);

	    		Y.controller.listenToPhotoList();
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

	    		if (txt) {
	    			return txt.replace(/<\/?[^>]+(>|$)/g, "");
	    		}

	    		else {
	    			return "";
	    		}
	    		
	    	},

	    	_humanizeSite: function(url) {
	    		var hash = {
	    			"live-feeds.cricbuzz.com": "Cricbuzz",
	    			"timesofindia.feedsportal.com": "Times of India",
	    			"cricketnext.in.com": "CricketNext",
	    			"www.espncricinfo.com": "Cricinfo"
	    		};

	    		var classes = {
	    			"live-feeds.cricbuzz.com": "cricbuzz-cls",
		    		"timesofindia.feedsportal.com": "timesofindia-cls",
		    		"cricketnext.in.com": "cricketnext-cls",
		    		"www.espncricinfo.com": "cricinfo-cls",
	    		};

	    		if (hash[url]) {
	    			return {
		    			url: hash[url],
		    			cls: classes[url]
			    	};
	    		}
	    		else {
	    			return {
		    			url: url,
		    			cls: ""
			    	};
	    		}
	    	},

	    	_isUrl: function(url) {
    			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    			return regexp.test(url);
	    	}
	    }
	 
	}, '1.0' /* module version */, {
	    requires: ['base', 'yql', 'resize-base', 'resize-constrain', 'controller']
	});