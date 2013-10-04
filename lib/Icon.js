function Icon(url_pic, func_mouse_down, func_mouse_up, class_hover, x, y) {
	
	//Icon implments Clickable
	var iDiv = Clickable(func_mouse_down, func_mouse_up, class_hover)
	
	var img =  new Image();
	var final_obj = {};
	
	img.onload = function() {
		iDiv.className = iDiv.className + " icon";
		iDiv.setAttribute("style", "position: absolute; left:" + y + "px; top:" + x + "px; width:" + (this.width + 10) + "px; height:" + (this.height + 10) + "px;");
		this.setAttribute("style", "position: absolute; top:5px; left:5px;");
	};
	
	img.src = url_pic;
	
	
	final_obj.iDiv = iDiv;
	
	
	iDiv.appendChild(img);
	
	document.body.appendChild(iDiv);
	final_obj.changePic = function(url) {
		img.src = url;
	}
	return final_obj;
}