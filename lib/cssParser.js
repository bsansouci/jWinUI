var CSSParser = function() {
	var parser = {};

	// parser.parseCSS = function (file, id, func) {
	// 	var allClasses = [];

	// 	$.get(file, function(data) {
	// 		// Make a copy of the data
	// 		var dataCopy = data.slice();

	// 		var reg = new RegExp(".?{");
	// 		var dataArray = data.split(reg).map(function (element) {
	// 			var tmp = element.split('}');
	// 			return tmp[tmp.length - 1];
	// 		});
			
	// 		// Previous code to remove the # in front of each element
	// 		var parsedNames = dataArray.map(function (element) {
	// 			return element;
	// 			// return element.replace(/[\n\r.#]/g, '');
	// 		});
	// 		// Remove the last element that is usually empty because of the way
	// 		// we parse things
	// 		parsedNames = parsedNames.slice(0, parsedNames.length - 1);

	// 		parsedNames.map(function(element) {
	// 			// console.log(element + "  LOL   " + dataCopy);

	// 			var reg = new RegExp(element + ".{");
	// 			// If the first char is "#" or "." then you want to add it in front of the ID*
	// 			// If it doesn't have anything (so it's neither a class or an id) you can just add the id in front
	// 			var firstChar = element.charAt(0);
	// 			dataCopy = dataCopy.replace(reg, (firstChar == '#' || firstChar == '.' ? firstChar : '') + id + "_" + element.replace(/[\n\r.#]/g, '') + " {");
	// 		});

	// 		if (func) {
	// 			func(dataCopy);
	// 		}
	// 	});
	// };

	parser.injectCSS = function () {
		
	};

	return parser;
};