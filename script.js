// API ->
// Window(width, height, place, text, title, x, y)
// changeTextWindow(win, text, title)
// function Icon(url_pic, function_click, classe_hover, x, y)
// function MyIcon(url_pic, x, y, name, data)



$(document).ready(function(){
	window_init();

	var win = Window(640, 480, document.body, "TEST", "Test");
	var icon = WinIcon(50, 50, "LOLs", "LOL", "http://www.hiveworkshop.com/forums/resource_images/14/icons_13978_btn.jpg", "http://www.hiveworkshop.com/forums/resource_images/14/icons_13978_disbtn.jpg");
	
});