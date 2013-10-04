var WINDOW_EVENT_LISTENERS = [];
function addMouseMoveEvent(event_function) {
	WINDOW_EVENT_LISTENERS.push(event_function);
	
	$(window).mousemove(function() {
		var i = WINDOW_EVENT_LISTENERS.length;
		while(i--) {
			var func = WINDOW_EVENT_LISTENERS[i];
			func();
		}
	});
}