function Clickable(func_mouse_down, func_mouse_up, class_hover) {
	var iDiv = document.createElement('div');
	iDiv.className = "Clickable";
	
	$(iDiv).hover(function() {
		$(this).addClass(class_hover);
	}, function() {
		$(this).removeClass(class_hover);
	});
	
	$(iDiv).mousedown(func_mouse_down);
	$(iDiv).mouseup(func_mouse_up);
	return iDiv;
}