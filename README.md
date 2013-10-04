jWinUI --- Version 0.3

This is a simple Windows UI in JavaScript.
----

How do you use it you might ask? Well it's pretty simple:

Create a window:
----

```Javascript
var width = 640, height = 480;
var place = document.body;
var title = "I am a title";
var url = "aPage.html";
var x = 50, y = 50;

var win = Window(width, height, place, title, url, x, y, window);
```

- Width => width in px of the Window
- Height => height in px of the Window
- place => the dom element into which you want your Window to be rendered
- title => the title that will appear on the Window
- url => the url of the local html file that you want to load inside this new Window
- x and y => the x and y positions of the window
- window => you can give it a window, and it won't create a new one but just open one


Create an WinIcon:
----

```Javascript
var x = 50, y = 50;
var title = "This is a title of a window";
var data = "my_file.html";
var url_pic_unclicked = "my_image.png";
var url_pic_clicked = "my_image_clicked.png";

var icon = WinIcon(x, y, title, data, url_pic_unclicked, url_pic_clicked);
```

Here's an example: 
----

```Javascript
$(document).ready(function(){
	var window1 = Window(640, 480, document.body, "TEST", "a_page.html");
	var iconWindow2 = WinIcon(50, 50, "Title", "url.html", "myIconNotClicked.jpg", "myIconClicked.jpg");

	// You can feed in your own window at the end, it will use it instead of creating a new one
	var iconWindow1 =  WinIcon(50, 50, "Title", "", "myIconNotClicked.jpg", "myIconClicked.jpg", window1);
});
```