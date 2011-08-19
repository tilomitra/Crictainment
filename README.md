Crictainment - Cricket Media App
================================


What is it?
-----------

Crictainment is a mobile web app that pulls in cricket news from a half-dozen cricket sites and 
presents them to you in a curated manner.

It also pulls in highlights and recent photos.

There is no server, it's all HTML5/CSS/JavaScript. 

Where can I see it in action?
-----------------------------

www.tilomitra.com/crictainment

Note that if things don't load initially, just refresh the page (this is still a hack, you know). Sometimes, pulling
the data takes a little longer than usual.

For best experience, view that site on a Webkit browser (sorry FF and IE), or on your iPad and add to your home screen.


Why did you make it?
--------------------

Because...
* I'm a cricket fan
* nothing in this app uses device-level capabilities so why make a native app?
* I could not finish a native app in the 24 hours that it took me to make this.
* I was tired of visiting different sites to get different points of view.
* I want an app that works cross-platform.
* I wanted to experiment with HTML5 and mobile performance.


Technical Details
-----------------

* All HTML5/CSS/JS.
* All open source.
* YUI3 for widgets/scrolling
* YQL/Pipes for pulling in data and feeds
* Optimized for iPad (in terms of viewport, meta tags, etc.) Just add it to the iPad home screen and check it out.
* Native feel when browsing the app. Animations are all CSS3-based.


Todo
----

* I'm using scrollability in some places. I'd like to either pull this out or edit Scrollability to it does flicking
even when using the mouse.
* I haven't figured out how to pull stories from a few of the sites. I think Cricinfo works and Cricbuzz works, but
some of the other ones don't.
* The videos are pulled from www.criconline.tv but the host there stopped updating his site, so I'll need to find another
provider.


                                