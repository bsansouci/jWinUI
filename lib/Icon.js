function Icon(url_pic, func_mouse_down, func_mouse_up, func_mouse_hover_enter, func_mouse_hover_leave, x, y) {
	var iDiv = document.createElement('div');
	iDiv.className = "Clickable";

	var loaded = false;
	var img =  new Image();
	var final_obj = {};
	
	final_obj.iDiv = iDiv;
	final_obj.img = img;
	final_obj.loaded = loaded;
	final_obj.changePic = function (url) {
		img.src = url;
	}

	$(iDiv).hover(func_mouse_hover_enter, func_mouse_hover_leave);
	$(iDiv).mousedown(func_mouse_down);
	$(iDiv).mouseup(func_mouse_up);

	img.onload = function() {
		if(!final_obj.loaded) {
			iDiv.className = iDiv.className + " icon";
			iDiv.setAttribute("style", "position: absolute; left:" + y + "px; top:" + x + "px; width:" + (this.width + 10) + "px; height:" + (this.height + 10) + "px;");
			this.setAttribute("style", "position: absolute; top:5px; left:5px;");
			final_obj.loaded = true;
		}
	};
	
	img.src = url_pic;
	
	
	
	iDiv.appendChild(img);
	
	document.body.appendChild(iDiv);
	
	return final_obj;
}