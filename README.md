jWinUI --- Version 0.3

This is a simple Windows UI in JavaScript.

---------------------------------------------

How do you use it you might ask? Well it's pretty simple:

Create a window in the body of the page:

```Javascript
var width = 640, height = 480;
var place = document.body;
var title = "I am a title";
var url = "aPage.html";

var win = Window(width, height, place, title, url);
```

- Width => width in px of the Window
- Height => height in px of the Window
- place => the dom element into which you want your Window to be rendered
- title => the title that will appear on the Window
- url => the url of the local html file that you want to load inside this new Window

```Javascript
$(document).ready(function(){
	window_init();
	var win = Window(640, 480, document.body, "TEST", "a_page.html");
	var icon = WinIcon(50, 50, "Title", "url.html", "myIconNotClicked.jpg", "myIconClicked.jpg");
});
```