YUI().use('node', 'yql', 'datasource', 'dataschema', function(Y) {
	


	var pipeModel = {
		
		fetch: function() {
			var q = "select * from rss where url='http://pipes.yahoo.com/pipes/pipe.run?_id=151e9e4b100e74de48458aa2a2d871ef&_render=rss'";
			Y.YQL(q, function(result) {
		     	console.log(result);
		     	//self.organize(result);
		     });
		}

	};


	var cricinfoModel = {

		pipe: function() {
			
			var pipe = 'http://pipes.yahoo.com/pipes/',
			ds = new Y.DataSource.Get({
				source:pipe
			}),

			self = this;

			ds.sendRequest({
			    request: 'pipe.info?_id=151e9e4b100e74de48458aa2a2d871ef',
			    callback: {
			        success: function(e){        
			            console.log(e);
			        },
			        failure: function(e){
			            alert("failure");
			        }
			    }
			});
		},

		getXML: function() {
			var path = "http://query.yahooapis.com/v1/public/yql?format=xml&",
			req = "q=select%20*%20from%20html%20where%20url%20IN%20(select%20channel.item.link%20from%20xml%20where%20url%3D'http%3A%2F%2Fwww.espncricinfo.com%2Frss%2Fcontent%2Fstory%2Ffeeds%2F0.xml')%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22storyTxt%22%5D'&diagnostics=true",	
			ds = new Y.DataSource.Get({
			    source: path
			}),

			self = this;

			ds.sendRequest({
			    request: req,
			    callback: {
			        success: function(e){
			            var res = e.data.results;
			            console.log(res);
			            for (var i = 0; i<res.length; i++) {
			            	Y.one('body').appendChild(res[i]);
			            }
			        },
			        failure: function(e){
			            alert("failure");
			        }
			    }
			});

		},
        getJSON: function() {

        	var self = this;
	        var query = "select * from html where url IN (select channel.item.link from xml where url='http://www.espncricinfo.com/rss/content/story/feeds/0.xml') and xpath='//div[@class="+'"stryCntnr"'+"]'";
			console.log(query);
			Y.YQL(query, function(result) {
		     	//console.log(result);
		     	//self.organize(result);
		     });
		},

		organize: function(result) {
			var mySchema = {
			    metaFields: {current:"profile.current", target:"profile.target"},
			    resultListLocator: "query.results.div",
			    resultFields: [{key:"p"}]
			};
			 
			// Returns an object with the properties "results" and "meta"
			var myOutput = Y.DataSchema.JSON.apply(mySchema, result);
			console.log(myOutput);
		}
	};


		    pipeModel.fetch();

});