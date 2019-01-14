// var colors =// here the array will be removed and instead we make a function to generate a random color for us [
//     "rgb(255, 0, 0)",
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 255, 255)",
//     "rgb(0, 0, 255)",
//     "rgb(255, 0, 255)"
// ]
var numSquares = 6;
var colors = []; //generateRandomColors(numSquares); // the value that we pass is the number of colors it generate, easy mode 3, hard mode 6 
var pickedColor; // pickColor(); //defining the function to randomize the color 
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode"); //it gives us 2 buttons


init();

// we run init func, it sets up our mode button listeners, and square listeners, then it runs reset which picks colors, it picks random color out of those colors it picks, it changes the text content,
function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    //mode buttons event listeners 
    //looing through the buttons
    for (var i = 0; i < modeButtons.length; i++) { //by doing so, if in future we wanna add more difficulty mode without adding eventListeners we can
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected"); // removing the class at first for both buttons
            this.classList.add("selected"); //this refer to what we are clicking on
            //choosing the number of squares to show
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
            //pick new colors
            //pick a new pickedcolor
            //update page to reflect changes
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        //adding initial colors to squares or changing the colors of each square
        //squares[i].style.backgroundColor = colors[i]; //we dont use it anymore cuz reset does it

        //adding click listeners to squares , or event handler
        squares[i].addEventListener("click", function() {
            //grabbing the color after clicking
            var clickedColor = this.style.backgroundColor;
            //comparing color to the pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                //changing text content for the button after we won, to play again 
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                // to fade the wrong pick
                this.style.backgroundColor = "rgb(27, 27, 68)";
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    //picking a new random color from array 
    pickedColor = pickColor();
    //changin colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    //changing colors of squares
    for (var i = 0; i < squares.length; i++) { //in this loop we are changing the color of squares to match the color from the colors array if there is only 3 items in the colors array. we need are gonna hide the other 3 squares 
        if (colors[i]) { //if there is a color we change the background color to that color 
            squares[i].style.display = "block"; //bringing back the squares after clicking on Hard button
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    //resetting the background color for div to, bcuz if u win it holds the previous color in the new game
    h1.style.backgroundColor = "rgb(27,27,68)";
}

// easyBtn.addEventListener("click", function() {
//     //giving the class="selected" to see which one is selected 
//     easyBtn.classList.add("selected");
//     hardBtn.classList.remove("selected");
//     //generating new colors after the button is clicked 
//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     // hiding the second 3 squares 
//     for (var i = 0; i < squares.length; i++) {
//         if (colors[i]) {
//             squares[i].style.backgroundColor = colors[i]; //as we set earlier in this functoin , colors has only 3 elements so we loop through all 3 and check if there is a color at that index, if there is we are gonna change the color of those 3
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
// });
// hardBtn.addEventListener("click", function() {
//     hardBtn.classList.add("selected");
//     easyBtn.classList.remove("selected");
//     //generating new colors after the button is clicked 
//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     // hiding the second 3 squares 
//     for (var i = 0; i < squares.length; i++) {
//         squares[i].style.backgroundColor = colors[i];
//         squares[i].style.display = "block";
//     }
// });



resetButton.addEventListener("click", function() {
    reset(); // //generating new colors 
    // colors = generateRandomColors(numSquares);
    // //picking a new random color from array 
    // pickedColor = pickColor();
    // //changin colorDisplay to match picked color
    // colorDisplay.textContent = pickedColor;
    // // after clicking on play again button, we want that text to be changed to new colors or to reset 
    // this.textContent = "new Colors"; //instead of this , we can write resetButton bcuz we are inside the resetButton
    // //changing the colors of squares 
    // for (var i = 0; i < squares.length; i++) {
    //     squares[i].style.backgroundColor = colors[i];
    // }
    // //resetting the background color for div to, bcuz if u win it holds the previous color in the new game
    // h1.style.backgroundColor = "rgb(27,27,68)";

    // //when we click on play again the word "correct" is still there, we want to reset it. how to find it, we fist find the reset buton which we want something happens after clicking, we want to change on display which called messageDisplay 
    // messageDisplay.textContent = "";
});

// we are doing this line into reset => so no need ... colorDisplay.textContent = pickedColor; //this line and the other two lines above are to show the picked color in h1 tag 

function changeColors(color) {
    //loop through all squares 
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    //changing each color to match given color
}

function pickColor() { //here we need 2 things: a random number between 0 to 255 & we should use that number to access that number to return that number. 
    var random = Math.floor(Math.random() * colors.length); //math.random gives a random value and floor will chop the deciam point therefore we only have a value beteween 0 and 1, then we multiply by the colors array to get the random index of each element of the array 
    return colors[random];
}

function generateRandomColors(num) {
    //creating array 
    var arr = [];
    //adding num random colors to array,
    for (var i = 0; i < num; i++) { //repeating num times
        //get random color and push into arr
        arr.push(randomColor());
        //making a function to ease the life randomColor it is... 
    }
    //returning the  array 
    return arr;
}

function randomColor() {
    //pick a red from 0 to 255
    var r = Math.floor(Math.random() * 256);
    //pick a green from 0 to 255
    var g = Math.floor(Math.random() * 256);
    //pick a blue from 0 to 255
    var b = Math.floor(Math.random() * 256);
    //"rgb(r,g,b)";
    return "rgb(" + r + ", " + g + ", " + b + ")";
}