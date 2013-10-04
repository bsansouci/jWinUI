// AutoLaunch for convinience
(function () {
	$(document).ready(function () {
		windowInit();
	});
})();


// This function will initialize the taskbar, by giving it a width and height
function windowInit(){
	taskbar_init(parseInt($(window).width()), parseInt($(window).height()));
};

window.onresize = function(event) {
    if(TASK_BAR) {
		TASK_BAR.setAttribute("style", "top:" + (parseInt($(window).height()) - 40) + "px; width:" + (parseInt($(window).width())) + "px;");
	}
}


var ALL_WINDOWS = [];
var TASK_BAR = null;

Array.prototype.swapItems = function (a, b) {
	this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

function Window(width, height, place, title, filename, x, y) {
	var iDiv = document.createElement('div');
	var tmp1 = -1, tmp2 = -1, tmp3 = -1, tmp4 = -1;
	var cur = null, cur2 = null;
	
	var finalObj = {};
	
	if(!title)
		title = "unknown";
	
	iDiv.className = "window";
	iDiv.setAttribute("id", "window" + ALL_WINDOWS.length);
	if(x == null)
		x = 100;
	if(y == null)
		y = 60;

	// Setting the attributes of iDiv, which will contain the top bar, the right draggable corner and the main content

	iDiv.setAttribute("style","width:" + width + "px; height:" + height + "px; left:" + x +"px; top:" + y + "px; z-index: 1;");
	iDiv.setAttribute("data-id", ALL_WINDOWS.length);
	
	var iDivBar = document.createElement('div');
	iDivBar.className = "window-bar";
	iDivBar.setAttribute("style","width:" + width + "px; height:25px;");
	
	$(iDivBar).html( '<span class="title" style="position: absolute; left: 10px; top: 0px; font-size: 24px;">' + title + '</span>\
	<img class="reduce-button" src="./img/reduce_button.png" style="position: absolute; left:' + (width - 68) + 'px; top: 2px;"></img>\
	<img class="close-button" src="./img/close_button.png" style="position: absolute; left:' + (width - 24) + 'px; top: 2px;"></img>\
	<img class="maximize-button" src="./img/maximize_button.png" style="position: absolute; left:' + (width - 46) + 'px; top: 2px;"></img>');
	
	var iDivCorner = document.createElement('div');
	iDivCorner.className = "window-corner";
	iDivCorner.setAttribute("style", "left:" + (width - 10) + "px; top:" + (height - 10) + "px;");
	
	$(iDivCorner).mousedown(function(e) {
		cur2 = $(this).closest(".window");
	});
	$(window).mouseup(function() {
		cur2 = null;
	});

	
	$(window).mousemove(function (e) {
		if(cur) {
			var x = $(cur).offset().left;
			var y = $(cur).offset().top;
			var mx = e.clientX;
			var my = e.clientY;
			
			var x2 = 0, y2 = 0;
			
			if(tmp1 != -1 && tmp1 != mx) {
				x2 = mx - tmp1;
			}
			
			if(tmp2 != -1 && tmp2 != my) {
				y2 = my - tmp2;
			}

			$(cur).css({"top": "+=" + y2 + "px", "left": "+=" + x2 + "px"});
			
			tmp1 = mx;
			tmp2 = my;
		} else {
			tmp1 = -1;
			tmp2 = -1;
		}
		
		if(cur2) {
			var x = parseInt($(cur2).css("width"));
			var y = parseInt($(cur2).css("width"));
			var mx = e.clientX;
			var my = e.clientY;
			
			var x2 = 0, y2 = 0;
			
			if(tmp3 != -1 && tmp3 != mx) {
				x2 = mx - tmp3;
			}
			
			if(tmp4 != -1 && tmp4 != my) {
				y2 = my - tmp4;
			}
			
			var chilWinBar = $(cur2).children(".window-bar");
			
			$(cur2).css({"height": "+=" + y2 + "px", "width": "+=" + x2 + "px"});
			$(cur2).children(".window-corner").css({"left": "+=" + x2 + "px", "top": "+=" + y2 + "px"});
			$(cur2).children(".window-text").css({ "width": "+=" + x2 + "px" });

			chilWinBar.css({ "width": "+=" + x2 + "px" });
			chilWinBar.children(".close-button").css({"left": "+=" + x2 + "px"});
			chilWinBar.children(".reduce-button").css({"left": "+=" + x2 + "px"});
			chilWinBar.children(".maximize-button").css({"left": "+=" + x2 + "px"});
			

			tmp3 = mx;
			tmp4 = my;
		} else {
			tmp3 = -1;
			tmp4 = -1;
		}
		
	});
	
	iDiv.appendChild(iDivBar);
	iDiv.appendChild(iDivCorner);
	$(iDiv).hide();
	
	if (filename) {
		// Asynchronous loading of the file
		$.get(filename, function (data) {
			// Create the div which will contain the data just loaded
			var windowText = document.createElement('div');
			windowText.className = "window-text";
			windowText.setAttribute("style", 'position: relative; left: 10px; top: 30px; width: ' + (width - 20) + 'px;');
			$(windowText).html(data);

			$(iDiv).append(windowText);
			// Append the div to the DOM tree
			place.appendChild(iDiv);

			// Will do everything so that the TaskBar knows about the Window
			addWindowToTaskBar(iDiv);

			// Finally show the Window
			$(iDiv).slideDown(300, function () {
				finalObj.visible = true;
				finalObj.focus();

				// We then load the eventListeners
				// They are the ones handling clicking on close/reduce/maximize
				loadEventListeners();
			});
		});
	}

	$(iDiv).hide();
	
    // Feed in the Window with it's fields
	finalObj.iDiv = iDiv;
	finalObj.iDivBar = iDivBar;
	finalObj.iDivCorner = iDivCorner;
	finalObj.visible = false;
	
    
	ALL_WINDOWS.push(finalObj);
	
	
	// This function will change the text and title within the Window
	finalObj.text = function (text, title) {
		if(!text){
			return $(this.iDiv).children(".window-text").html();
		}
		$(this.iDiv).children(".window-text").html(text);
		if(title) {
			var className = finalObj.taskbar_name;
			var taskBarButton = $(TASK_BAR).children("." + className);
			taskBarButton.html(title);
			taskBarButton.removeClass(className);
			taskBarButton.addClass(title.split(" ").join("_"));
			finalObj.taskbar_name = title;
			$(finalObj.iDiv).children(".window-bar").children(".title").html(title);
		}
	}
	
	// This will close the Window, delete it from the DOM and
	// update the taskbar
	finalObj.close = function () {
		this.visible = false;
		$(TASK_BAR).children("." + $(this.iDiv).attr("id")).remove();
		$(this.iDiv).remove();
	}
	
	finalObj.open = function() {
		document.body.appendChild(finalObj.iDiv);
		addWindowToTaskBar(finalObj.iDiv);
		$(finalObj.iDiv).slideDown(300, function() {
			finalObj.visible = true;
		});
	
		finalObj.focus();
		cur = $(finalObj.iDiv);
		loadEventListeners();
	}

	finalObj.focus = function () {
	    var id = parseInt($(this.iDiv).data('id'));

	    if (id < ALL_WINDOWS.length - 1) {
	        while (id < ALL_WINDOWS.length - 1) {
	        	id++;
	        	ALL_WINDOWS.swapItems(id, id - 1);
	        }
	        var i = ALL_WINDOWS.length;
	        while (i--) {
	        	$(ALL_WINDOWS[i].iDiv).css({ "z-index": i });
	            $(ALL_WINDOWS[i].iDiv).data("id", i);
	        }
	    }
	    
	}
	
	/* Private functions */	
	function loadEventListeners() {
		$(".reduce-button").mousedown(function () {
			console.log("TEST");
			this.src = "./img/down_button.png";
		});
		$(".reduce-button").mouseup(function() {
			this.src = "./img/reduce-button.png";
			$(this).closest(".window").slideUp(300, function() {
				// Now that the window isn't visible anymore, we
				// should tell the finalObj, so we can open it again
				finalObj.visible = false;
			});
		});
		
		
		$(".close-button").mousedown(function() {
			this.src = "./img/down_button.png";
		});
		$(".close-button").mouseup(function() {
			this.src = "./img/close_button.png";
			$(this).closest(".window").slideUp(300, function() {
				finalObj.close();
			});
		});


		$(iDivBar).mousedown(function(e) {
			e.preventDefault();
			finalObj.focus();
			cur = $(finalObj.iDiv);
		});
		
		$(window).mouseup(function() {
			cur = null;
		});
	}
	function addWindowToTaskBar(win) {
		var text = $(TASK_BAR).html();
		var id = $(win).attr("id");
		var title = $(win).children(".window-bar").children(".title").html();
		var newButton = document.createElement('span');
		
		newButton.className = "task-bar-button " + id;
		
		$(newButton).html(title);
		$(newButton).click(function () {
			finalObj.focus();
			$(win).slideDown(300);
		});
		TASK_BAR.appendChild(newButton);
	}
	
	/* End of private functions */
	return finalObj;
}