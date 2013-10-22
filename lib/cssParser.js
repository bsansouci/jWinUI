(function() {
	initParser();
})();

function initParser() {

}

function parseCSS (file, func) {
	var allClasses = [];
	$.get(file, function(data) {
		var reg = new RegExp(".?{");
		var dataArray = data.split(reg).map(function (element) {
			var tmp = element.split('}');
			return tmp[tmp.length - 1];
		});
		
		var parsedNames = dataArray.map(function (element) {
			return element.replace(/[\n\r.#]/g, '');
		});
		// Remove the last element that is usually empty because of the way
		// we parse things
		parsedNames = parsedNames.slice(0, parsedNames.length - 1);
		if (func) {
			func(parsedNames);
		}
	});
}

function rewriteCSSFile (filename, id, dataNew) {
	$.get(filename, function(dataOld) {
		dataNew.map(function(element) {
			var reg = new RegExp(element + ".{");
			dataOld = dataOld.replace(reg, id + "_" + element);
		});
		console.log(dataOld);
	});
}