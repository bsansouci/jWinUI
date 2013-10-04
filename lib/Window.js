/* ******************** WINDOW LIBRARY BEGINNING *********************** */

function window_init(){
	taskbar_init(parseInt($(window).width()), parseInt($(window).height()));
	// setupEventListener();
};

window.onresize = function(event) {
    if(TASK_BAR) {
		TASK_BAR.setAttribute("style", "top:" + (parseInt($(window).height()) - 40) + "px; width:" + (parseInt($(window).width())) + "px;");
	}
}


var all_windows = [];
var TASK_BAR = null;

Array.prototype.swapItems = function (a, b) {
	this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

function Window(width, height, place, title, filename, x, y) {
	var iDiv = document.createElement('div');
	var tmp1 = -1, tmp2 = -1, tmp3 = -1, tmp4 = -1;
	var cur = null, cur2 = null;
	
	var final_obj = {};
	
	if(!title)
		title = "unknown";
	
	iDiv.className = "window";
	iDiv.setAttribute("id", "window" + all_windows.length);
	if(x == null)
		x = 100;
	if(y == null)
		y = 60;
	iDiv.setAttribute("style","width:" + width + "px; height:" + height + "px; left:" + x +"px; top:" + y + "px; z-index: 1;");
	iDiv.setAttribute("data-id", all_windows.length);
	
	var iDiv_bar = document.createElement('div');
	iDiv_bar.className = "window_bar";
	iDiv_bar.setAttribute("style","width:" + width + "px; height:25px;");
	
	$(iDiv_bar).html( '<span class="title" style="position: absolute; left: 10px; top: 0px; font-size: 24px;">' + title + '</span>\
	<img class="reduce_button" src="./img/reduce_button.png" style="position: absolute; left:' + (width - 68) + 'px; top: 2px;"></img>\
	<img class="close_button" src="./img/close_button.png" style="position: absolute; left:' + (width - 24) + 'px; top: 2px;"></img>\
	<img class="maximize_button" src="./img/maximize_button.png" style="position: absolute; left:' + (width - 46) + 'px; top: 2px;"></img>');
	
	var iDiv_corner = document.createElement('div');
	iDiv_corner.className = "window_corner";
	iDiv_corner.setAttribute("style", "left:" + (width - 10) + "px; top:" + (height - 10) + "px;");
	
	$(iDiv_corner).mousedown(function(e) {
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
			
			var chil_win_bar = $(cur2).children(".window_bar");
			
			$(cur2).css({"height": "+=" + y2 + "px", "width": "+=" + x2 + "px"});
			$(cur2).children(".window_corner").css({"left": "+=" + x2 + "px", "top": "+=" + y2 + "px"});
			chil_win_bar.css({"width": "+=" + x2 + "px"});
			chil_win_bar.children(".close_button").css({"left": "+=" + x2 + "px"});
			chil_win_bar.children(".reduce_button").css({"left": "+=" + x2 + "px"});
			chil_win_bar.children(".maximize_button").css({"left": "+=" + x2 + "px"});
			
			tmp3 = mx;
			tmp4 = my;
		} else {
			tmp3 = -1;
			tmp4 = -1;
		}
		
	});
	
	iDiv.appendChild(iDiv_bar);
	iDiv.appendChild(iDiv_corner);
	$(iDiv).hide();
	
	if (filename) {
		// Asynchronous loading of the file
		$.get(filename, function (data) {
			$(iDiv).append("<div class='window_text' style='position: relative; left: 10px; top: 30px;'>" + data + "</div>");
			// Append the div to the DOM tree
			place.appendChild(iDiv);

			// Will do everything so that the TaskBar knows about the Window
			addWindowToTaskBar(iDiv);

			// Finally show the Window
			$(iDiv).slideDown(300, function () {
				final_obj.visible = true;
				var i = all_windows.length;
				while (i--) {
					$(all_windows[i].iDiv).css({ "z-index": i });
					$(all_windows[i].iDiv).data("id", i);
				}

				// We then load the eventListeners
				// They are the ones handling clicking on close/reduce/maximize
				loadEventListeners();
			});
		});
	}

	$(iDiv).hide();
	
    // Feed in the Window with it's fields
	final_obj.iDiv = iDiv;
	final_obj.iDiv_bar = iDiv_bar;
	final_obj.iDiv_corner = iDiv_corner;
	final_obj.visible = false;
	
    
	all_windows.push(final_obj);
	
	
	// This function will change the text and title within the Window
	final_obj.text = function (text, title) {
		if(!text){
			return $(this.iDiv).children(".window_text").html();
		}
		$(this.iDiv).children(".window_text").html(text);
		if(title) {
			var class_name = final_obj.taskbar_name;
			var task_bar_button = $(TASK_BAR).children("." + class_name);
			task_bar_button.html(title);
			task_bar_button.removeClass(class_name);
			task_bar_button.addClass(title.split(" ").join("_"));
			final_obj.taskbar_name = title;
			$(final_obj.iDiv).children(".window_bar").children(".title").html(title);
		}
	}
	
	// This will close the Window, delete it from the DOM and
	// update the taskbar
	final_obj.close = function () {
		this.visible = false;
		$(TASK_BAR).children("." + $(this.iDiv).attr("id")).remove();
		$(this.iDiv).remove();
	}
	
	final_obj.open = function() {
		document.body.appendChild(final_obj.iDiv);
		addWindowToTaskBar(final_obj.iDiv);
		$(final_obj.iDiv).slideDown(300, function() {
			final_obj.visible = true;
		});
	
		final_obj.focus();
		loadEventListeners();
	}

	final_obj.focus = function () {
	    var id = parseInt($(this.iDiv).data('id'));

	    if (id < all_windows.length - 1) {
	        while (id < all_windows.length - 1) {
	        	id++;
	        	all_windows.swapItems(id, id - 1);
	        }
	        var i = all_windows.length;
	        while (i--) {
	        	$(all_windows[i].iDiv).css({ "z-index": i });
	            $(all_windows[i].iDiv).data("id", i);
	        }
	    }
	    cur = $(this.iDiv);
	}
	
	/* Private functions */	
	function loadEventListeners() {
		$(".reduce_button").mousedown(function () {
			console.log("TEST");
			this.src = "./img/down_button.png";
		});
		$(".reduce_button").mouseup(function() {
			this.src = "./img/reduce_button.png";
			$(this).closest(".window").slideUp(300, function() {
				// Now that the window isn't visible anymore, we
				// should tell the final_obj, so we can open it again
				final_obj.visible = false;
			});
		});
		
		
		$(".close_button").mousedown(function() {
			this.src = "./img/down_button.png";
		});
		$(".close_button").mouseup(function() {
			this.src = "./img/close_button.png";
			$(this).closest(".window").slideUp(300, function() {
				final_obj.close();
			});
		});


		$(iDiv_bar).mousedown(function(e) {
			e.preventDefault();
			final_obj.focus();
		});
		
		$(window).mouseup(function() {
			cur = null;
		});
	}
	function addWindowToTaskBar(win) {
		var text = $(TASK_BAR).html();
		var id = $(win).attr("id");
		var title = $(win).children(".window_bar").children(".title").html();
		var new_button = document.createElement('span');
		
		new_button.className = "task_bar_button " + id;
		
		$(new_button).html(title);
		$(new_button).click(function() {
			$(win).slideDown(300);
		});
		TASK_BAR.appendChild(new_button);
	}
	
	/* End of private functions */
	return final_obj;
}

/* ****************************************************** WINDOW LIBRARY END ***************************************************************** */