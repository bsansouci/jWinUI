jWinUI --- Version 0.4

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
var x = 100, y = 60;

var win = Window(url, title, x, y, width, height, place);
/* this is the equivalent of var win = Window(url, title) because all the rest are default values */
```

- Width => width in px of the Window
- Height => height in px of the Window
- place => the dom element into which you want your Window to be rendered
- title => the title that will appear on the Window
- url => the url of the local html file that you want to load inside this new Window
- x and y => the x and y positions of the window

Create an WinIcon:
----

```Javascript
var url_pic_unclicked = "my_image.png";
var url_pic_clicked = "my_image_clicked.png";

var icon =  WinIcon(win, url_pic_unclicked, url_pic_clicked, x, y, data, title, width, height, place);
/* Here we don't need to specify anything after url_pic_clicked because the varible win already exists, and therefore the icon will use it's data */
```
p
- x and y => the x and y positions of the icon (relative to the container)
- width => width in px of the Window
- height => height in px of the Window
- title => the title that will appear on the Window opened when clicked
- data => the url of a file that will be displayed inside the window
- url_pic_unclicked => the url of the image that will represent the icon when it's not clicked
- url_pic_clicked => the url of the image that will appear when the icon is clicked
- win => the window that will be opened when the icon is clicked (if null, it uses the x, y, title, data, width and height)


Here's an example: 
----

```Javascript
$(document).ready(function(){
	var window1 = Window("test.html", "Window1", 50, 50);
	var window2 = Window("test2.html", "Window2", 50, 200);

	var icon = WinIcon(window1, "./img/folder_icon.png", "./img/folder_icon_clicked.png", 50, 50);
	var icon2 = WinIcon(window2, "./img/folder_icon.png", "./img/folder_icon_clicked.png", 150, 50);
});
```