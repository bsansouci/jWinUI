function WinIcon(x, y, title, data, urlPicUnclicked, url_pic_clicked) {
	var myWin;
	
	var mouseDown = function() {
		icon.changePic(url_pic_clicked);
	}
	var mouseUp = function() {
		if(!title)
			title = "UNTITLED";
		if(!data)
			data = "";
	
		if(!myWin) {
			myWin = Window(640, 480, document.body, title, data);
			
		} else {
			if(!myWin.visible) {
				myWin.open();
			}
		}
		icon.changePic(urlPicUnclicked);
	}
	var funcMouseHoverEnter = function () {
		$(this).addClass("icon-hover");
	};
	var funcMouseHoverLeave = function () {
		$(this).removeClass("icon-hover");
	};
	//MyIcon implements Icon but creates the function that we need
	var icon = Icon(urlPicUnclicked, mouseDown, mouseUp, funcMouseHoverEnter, funcMouseHoverLeave, x, y);

	return icon;
}