var Please = (function () {
	// Create local variable, global to the window system.
	var ALL_WINDOWS = [];
	var TASK_BAR = null;
	var cur = null, cur2 = null;
	var CLIPBOARD = "";

	// API object with the following public fields
	var OS = {
		createWindow: createWindow
	};

	// Once the page is fully loaded, we will load the taskbar
	$(document).ready(function () {
		TASK_BAR = taskbar_init(parseInt($(window).width()), parseInt($(window).height()));

		// Load the right click menu

	   $(document).contextmenu({
			delegate: ".window",
			preventSelect: true,
			taphold: false,
			menu: [
				{title: "Change background color", cmd: "change_background_color", uiIcon: "ui-icon-scissors"},
				{title: "Copy color", cmd: "copy_color", uiIcon: "ui-icon-copy"},
				// {title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: true },
				{title: "----"},
				{title: "More", children: [
					{title: "Sub 1 (using callback)", action: function(event, ui) { alert("action callback sub1");} },
					{title: "Sub 2", cmd: "sub1"}
					]}
				],
			// Handle menu selection to implement a fake-clipboard
			select: function(event, ui) {
				var $target = ui.target;
				switch(ui.cmd){
					case "change_background_color":
						if($('.settings_background_color').prop('checked')) {
							_change_background_color($(".color").val());
						} else {
							_change_background_color($(".color").val(), $target[0]);
						}
						
						break;
					case "copy_color":
						$(".color").val(_get_background_color($target[0]));
						break;
				}
				
				// Optionally return false, to prevent closing the menu now
			},
			// Implement the beforeOpen callback to dynamically change the entries
			beforeOpen: function(event, ui) {
				var $menu = ui.menu,
					$target = ui.target;
				
	// 			$(document)
	// //				.contextmenu("replaceMenu", [{title: "aaa"}, {title: "bbb"}])
	// //				.contextmenu("replaceMenu", "#options2")
	// //				.contextmenu("setEntry", "cut", {title: "Cuty", uiIcon: "ui-icon-heart", disabled: true})
	// 				.contextmenu("setEntry", "copy", "Copy '" + $target.text() + "'")
	// 				.contextmenu("setEntry", "paste", "Paste" + (CLIPBOARD ? " '" + CLIPBOARD + "'" : ""))
	// 				.contextmenu("enableEntry", "paste", (CLIPBOARD !== ""));

				// Optionally return false, to prevent opening the menu now
			}
		});
		$(".ui-helper-hidden").css({"z-index": 100});

	});

	// Some function to swap items, used for the window draw order
	Array.prototype.swapItems = function (a, b) {
		this[a] = this.splice(b, 1, this[a])[0];
	    return this;
	}

	document.onContextMenu

	$(window).mousedown(function(e) {
		if(e.button === 2) {
			
		}
		
	});
	$(window).mouseup(function(e) {
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
			
			// TODO: you don't want the icons (close, maximize and restore) to
			// move
			

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


	// Return the function that the user wants. It's used to create a window and add it
	// to the DOM
	function createWindow(filename, title, x, y, width, height, place) {
		var iDiv = document.createElement('div');
		var tmp1 = -1, tmp2 = -1, tmp3 = -1, tmp4 = -1;
		
		var finalObj = {};


		// Dynamic number of arguments forces this step
		// We check for null and set to defaults if yes
		if(!title)
			title = "unknown";

		if(!x)
			x = 100;

		if(!y)
			y = 60;

		if(!width)
			width = 640;

		if(!height)
			height = 480;

		if(!place)
			place = document.body;

		iDiv.className = "window";
		iDiv.setAttribute("id", "window" + ALL_WINDOWS.length);

		

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
				var scripts = iDiv.getElementsByTagName('script');
				if(scripts.length > 0) {
					loadScript(scripts[0], insertWindowInDOM); // only load one script for now
				} else {
					insertWindowInDOM();
				}
				
				function insertWindowInDOM() {
					iDiv.getElementsByTagName('script')
					// Will do everything so that the TaskBar knows about the Window
					_addWindowToTaskBar(iDiv, finalObj);

					// Finally show the Window
					$(iDiv).slideDown(300, function () {
						finalObj.visible = true;
						finalObj.focus();

						// We then load the eventListeners
						// They are the ones handling clicking on close/reduce/maximize
						_loadEventListeners(finalObj);

					});
				}
				function loadScript(obj, callback)
				{
					

				    // Adding the script tag to the head as suggested before
				    var head = document.getElementsByTagName('head')[0];
				    var script = document.createElement('script');
				    script.type = 'text/javascript';
				    script.src = obj.src;

				    // remove the object from the DOM now that we're going to load it globally
					$(obj).remove();

				    // Then bind the event to the callback function.
				    // There are several events for cross browser compatibility.
				    script.onreadystatechange = callback;
				    script.onload = callback;

				    // Fire the loading
				    head.appendChild(script);
				}
				
				
			});
		}
		
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
			finalObj.visible = true;
			document.body.appendChild(finalObj.iDiv);
			_addWindowToTaskBar(finalObj.iDiv, finalObj);
			$(finalObj.iDiv).slideDown(300, function() {
				finalObj.focus();
				_loadEventListeners(finalObj);
			});
			
			// I don't remember why I added this line, because it doesn't make sens for cur 
			// to be assigned directly. What happens is you open a window and it's directly
			// following your mouse, even you didn't click on anything.
			//cur = $(finalObj.iDiv);
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
		return finalObj;
	}

	var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
	function _hex(x) {
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}
	function _rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return _hex(rgb[1]) + _hex(rgb[2]) + _hex(rgb[3]);
	}


	function _get_background_color (div) {
		return _rgb2hex($(div).css("background-color"));
	}

	function _change_background_color (color, window) {
		if(window) {
			$(window).css({"background-color": "#" + color});
			return;
		}

		ALL_WINDOWS.map(function(element) {
			$(element.iDiv).css({"background-color": "#" + color});
		})

		return;
	}

	function _loadEventListeners(context) {
		$(context.iDivBar).children(".reduce-button").mousedown(function () {
			this.src = "./img/down_button.png";
		});
		$(context.iDivBar).children(".reduce-button").mouseup(function() {
			this.src = "./img/reduce_button.png";
			$(this).closest(".window").slideUp(300, function() {
				// Now that the window isn't visible anymore, we
				// should tell the context, so we can open it again
				context.visible = false;
			});
		});
		
		
		$(context.iDivBar).children(".close-button").mousedown(function() {
			this.src = "./img/down_button.png";
		});
		$(context.iDivBar).children(".close-button").mouseup(function() {
			this.src = "./img/close_button.png";
			$(this).closest(".window").slideUp(300, function() {
				context.close();
			});
		});

		$(context.iDiv).mousedown(function(e) {
			if(e.button === 0) {
				context.focus();
			}
		});
		$(context.iDivBar).mousedown(function(e) {
			if(e.button === 0) {
				cur = $(context.iDiv);
			}
			e.preventDefault();
		});
		
		$(window).mouseup(function() {
			cur = null;
		});
	}
	function _addWindowToTaskBar(win, context) {
		var text = $(TASK_BAR).html();
		var id = $(win).attr("id");
		var title = $(win).children(".window-bar").children(".title").html();
		var newButton = document.createElement('span');
		
		newButton.className = "task-bar-button " + id;
		
		$(newButton).html(title);
		$(newButton).click(function () {
			context.focus();
			$(win).slideDown(300);
		});
		TASK_BAR.appendChild(newButton);
	}


	return OS;
})();