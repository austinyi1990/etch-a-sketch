$(document).ready(function() {
	var gridSize = 16;
	var container = $("#container");
	var checkbox = $("input:checkbox");
	var loadingWrapper = $("#loading-wrapper")
	var lastButton = "set-default";
	var squares;

	createGrid(gridSize);
	checkbox.change(checkBorder);
	drawDefault();
	buttonClick();

	function createGrid(size){
		//Empty out containers children if there is any before creating the new grid
		container.empty();

		//Makes sure each square is of the exact same size regardless of what is chosen for the grid size
		squareSize = Math.floor(900/size);

		//Make container width the exact same width of the row. Avoids several other issues
		container.css("width", squareSize * size);

		for(var i=0; i<size*size; i++){
			var squareToAdd = $("<div class='square'></div>");
			squareToAdd.css("width",squareSize);
			squareToAdd.css("height", squareSize);
			container.append(squareToAdd);
		}

		//Store all the square divs in memory to use later
		squares = $(".square");
		
		//Draw grid lines based off checkbox
		checkBorder();
	}

	function checkBorder() {
		if(checkbox.is(":checked")){
			squares.css("outline-style", "solid");
		}
		else{
			squares.css("outline-style", "none");
		}
	};

	function drawDefault(){
		squares.hover(function() {
			$(this).css("backgroundColor", "black");
		});
	}

	function drawRandom(){
		squares.hover(function() {
			var randomColor = "#"+((1<<24)*Math.random()|0).toString(16)
			$(this).css("backgroundColor", randomColor);
		});
	}

	//Credit to sitekickr
	function drawIncremental(){
		squares.hover(function() {
			var darkenPercent = 15;
			var rgb = $(this).css("background-color");
			rgb = rgb.replace("rgb(", "").replace(")", "").split(",");
			var red = $.trim(rgb[0]);
			var green = $.trim(rgb[1]);
			var blue = $.trim(rgb[2]);

			red = parseInt(red * (100 - darkenPercent) / 100);
			green = parseInt(green * (100 - darkenPercent) / 100);
			blue = parseInt(blue * (100 - darkenPercent) / 100);

			rgb = "rgb(" + red + ", " + green + ", " + blue + ")";

			$(this).css("background-color", rgb);
		});
	}

	//Animating backgroundColor requires JQuery UI
	function drawTrailing(){
		squares.mouseover(
			function() {
         		$(this).animate({backgroundColor: "#000000"}, 0);
	    }).mouseout(
	    	function() {
	    		$(this).animate({backgroundColor: "#DCDDD8"}, 1000);
	    });       
	}

	function buttonClick(){
		//Which button was selected
		$(":button").click(function() {
			var whichButton = $(this).attr("name");
			var prevSize = gridSize;
			
			//If clear has been selected, then do not prompt and redraw based on the last button selected
			if(whichButton == "clear"){
				whichButton = lastButton;
			}
			else{
				gridSize = prompt("Please enter the size of your grid (0<x<129)");
				
				//Throw prompt if not a number, < 1, > 128, or a decimal
				while(gridSize != null && (isNaN(gridSize) ||gridSize < 1 || gridSize > 128 || gridSize % 1 != 0)){
					gridSize = prompt("Invalid input. Please try again.");
				}

				//Prevent gridSize from being overwritten if cancel is selected and exit out of the function
				if(gridSize == null){
					gridSize = prevSize;
					return;
				}

				lastButton = whichButton;
			}

			switch(whichButton) {
				case "set-default":
					createGrid(gridSize);
					drawDefault();
					break;
				case "random":
					createGrid(gridSize);
					drawRandom();
					break;
				case "incremental":
					createGrid(gridSize);
					drawIncremental();
					break;
				case "trailing":
					createGrid(gridSize);
					drawTrailing();
					break;
			}
		});
	}
});