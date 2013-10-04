function WinIcon(x, y, name, data, url_pic_unclicked, url_pic_clicked) {
	var myWin;
	
	var mouse_down = function() {
		icon.changePic(url_pic_clicked);
	}
	var mouse_up = function() {
		if(!name)
			name = "UNTITLED";
		if(!data)
			data = "";
	
		if(!myWin) {
			myWin = Window(640, 480, document.body, name, data);
			
		} else {
			if(!myWin.visible) {
				myWin.open();
			}
		}
		icon.changePic(url_pic_unclicked);
	}
	var func_mouse_hover_enter = function () {
		$(this).addClass("icon_hover");
	};
	var func_mouse_hover_leave = function () {
		$(this).removeClass("icon_hover");
	};
	//MyIcon implements Icon but creates the function that we need
	var icon = Icon(url_pic_unclicked, mouse_down, mouse_up, func_mouse_hover_enter, func_mouse_hover_leave, x, y);

	return icon;
}