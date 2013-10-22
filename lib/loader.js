function loadScript(path, callback) {
	function load(array, func) {
		var script = document.createElement('script');
		script.src = array;
		script.onload = script.onreadystatechange = function () {
			script.onreadystatechange = script.onload = null;
			func();
		}
		document.head.appendChild(script);
	}

	(function () {
		if (path.length > 0) {
			load(path.shift(), arguments.callee);
		} else {
			callback && callback();
		}
	})();
}