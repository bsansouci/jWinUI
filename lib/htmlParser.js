var HTMLParser = function() {
	var parser = {};

	parser.parseHTML = function(win, oldNames) {
		var allElements = [];
		var id = win.iDiv.getAttribute("data-id");

		newNames = oldNames.map(function (element) {
			return id + "_" + element.replace(/[\n\r.#]/g, '');
		});

		for (var i = oldNames.length - 1; i >= 0; i--) {
			if(oldNames[i].charAt(0) == "#"){
				$(oldNames[i], $(win.iDiv).children(".window-text")).attr("id", newNames[i]);
			}
		}

		
	};

	return parser;
};