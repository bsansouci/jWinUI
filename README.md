jWinUI --- Version 0.2

This is a simple Windows UI in JavaScript.

---------------------------------------------

Here is a sample code:

```
$(document).ready(function(){
	window_init();

	var win = Window(640, 480, document.body, "TEST", "Test");
	var icon = WinIcon(50, 50, "Title", "HTML content", "myIconNotClicked.jpg", "myIconClicked.jpg");
	
});
```