$(document).ready(function () {
	var portfolioWindow = Window("test.html", "Portfolio", 50, 50);
	var myDocumentsWindow = Window("test2.html", "My Documents", 50, 200);
	var icon = WinIcon(portfolioWindow, "./img/folder_icon.png", "./img/folder_icon_clicked.png", 50, 50);
	var icon2 = WinIcon(myDocumentsWindow, "./img/folder_icon.png", "./img/folder_icon_clicked.png", 150, 50);
});