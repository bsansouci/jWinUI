function WinIcon(myWin, urlPicUnclicked, urlPicClicked, x, y, data, title, width, height, place) {
	if(!myWin) 
		myWin = Window(data, title, width, height, place, x, y);

	var mouseDown = function() {
		icon.changePic(urlPicClicked);
	}
	var mouseUp = function() {
		if(!myWin.visible) {
			myWin.open();
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
	
	$(icon.iDiv).html("<center>" + $(icon.iDiv).html() + "<br /><span style='font-size:12px;'>" + $(myWin.iDivBar).children(".title").html() + "</span></center>");
	return icon;
}