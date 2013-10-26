$(document).ready(function () {
	var win1 = Please.createWindow("test.html", "Window1", 200, 50);
	var win2 = Please.createWindow("test2.html", "Window2", 200, 200);
	var settings = Please.createWindow("settings.html", "Settings", 800, 200, 300, 300);

	var icon = WinIcon(win1, "img/folder_icon.png", "img/folder_icon_clicked.png", 50, 50);
	var icon2 = WinIcon(win2, "img/folder_icon.png", "img/folder_icon_clicked.png", 150, 50);
});