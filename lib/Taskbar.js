function taskbar_init(window_width, window_height) {
	// Some event handling, in case of window resize, adjust the size of the bar
	window.onresize = function(event) {
	    if(TASK_BAR) {
			TASK_BAR.setAttribute("style", "top:" + (parseInt($(window).height()) - 40) + "px; width:" + (parseInt($(window).width())) + "px;");
		}
	}

	var height = 40;
	var task_bar = document.createElement('div');
	task_bar.setAttribute("id", "task-bar");
	task_bar.setAttribute("style", "height: " + height + "px; top: " + (window_height - height) + "px; width: " + window_width + "px;");

	document.body.appendChild(task_bar);
	TASK_BAR = task_bar;

	return task_bar;
}