// --== CS400 File Header Information ==--
// Name: Arjay McCandless
// Email: mccandless2@wisc.edu
// Team: DG
// Role: Front End Developer 2
// TA: Yelun
// Lecturer: Gary Dahl
// Notes to Grader: assisted Arjay with displaying of squares and buttons to change maze 

let circle = document.querySelector('.circle');
let x = 0;
let y = 0;
let map = [
  [2, 0, 1, 1],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 3, 0, 1]
];
// will hold all of ours mazes once loaded
let maze1 = [];
let maze2 = [];
let maze3 = [];
let maze4 = [];
let maze5 = [];

//calculating square height and width to fit screen
let squareW = ( screen.width * 0.99 ) / (map[0].length );
let squareH = ((screen.height - 300) * 0.98) / map.length;
let remainderW = (( screen.width * 0.99 ) / (map[0].length) ) % 1;
squareW -= remainderW;
let remainderH = (((screen.height - 300) * 0.98) / map.length) % 1;
squareH -= remainderH;
let topp = '200px'
// keeps track of how many mazes the user has completed
let completed = 0;

//called at start to load mazes and initialize game
function begin() {
  circle.style.position = 'absolute';
  loadMazes();
  maze11();
}
//the code to take in user keyboard input and see if they have completed the maze
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      if(x!=0 && map[y][x-1]!=1){
        circle.style.left = parseInt(circle.style.left) - squareW + 'px';
        x-=1;
      }
      break;

    case 'ArrowRight':
      if(x!= map[0].length-1 && map[y][x+1]!=1){
        circle.style.left = parseInt(circle.style.left) + squareW + 'px';
        x+=1;
      }
      break;

    case 'ArrowUp':
      if(y!=0 && map[y-1][x]!=1){
        circle.style.top = parseInt(circle.style.top) - squareH + 'px';
        y-=1;
      }
      break;

    case 'ArrowDown':
      if(y!=map.length-1 && map[y+1][x]!=1){
        circle.style.top = parseInt(circle.style.top) + squareH + 'px';
        y+=1;
      }
      break;
  }
  // goal squares are marked by a 3 in the map so reaching 3 means player completed the maze
  if( map[y][x] == 3) {
    alert("Congrats!!");
    completed++;
  }
  // if completed == 5 the user has completed lal of our mazes
  if(completed == 5) {
    alert("Thank you for finishing all of our mazes.");
  }

});

// function to display function
function initialLoad() {
  var ArrayOfImages = ['Images/openPath.jpg', 'Images/WallSquare.jpg', 'Images/start.jpg', 'Images/goal.jpg'];

  //clear out images from last maze
  var images = document.getElementsByTagName('img');
  var length = images.length; 
  for (var i = 0; i < length; i++) {
    images[0].parentNode.removeChild(images[0]);
  }
  // reset the posisiton of the player
  x = 0;
  y = 0;
  circle.style.left = 0;
  circle.style.top = topp;
  // calculate height and width of squares
  squareW = ( screen.width * 0.98 ) / (map[0].length);
  remainderW = (( screen.width * 0.98 ) / (map[0].length) ) % 1;
  squareW -= remainderW;
  squareH = ((screen.height - 300) * 0.98) / map.length;
  remainderH = (((screen.height - 300) * 0.98) / map.length) % 1;
  squareH -= remainderH;
  // set heigh and width of player
  circle.style.width = squareW + 'px';
  circle.style.height = squareH + 'px';
  move = squareW;

// for each row in the map
//console.log(map[0].length-1);
  for (i = 0; i <= map.length; i++) {
    //console.log(`top: ${200 + squareH * i};`);
    // for each column in the map
    for (j = 0; j < map[0].length; j++) {
      //let loc = map[i][j];
      console.log(`square${map.length*i + j}`);
      var img = document.createElement('img');
      var tempclass = `square${map.length*i + j}`;
      img.classList.add(`square${map.length*i + j}`);
      // if last column make it a wall square
      if( j == map[0].length-1) {
        img.src = ArrayOfImages[1];
      } else {
        let idx = map[i][j];
        let val = ArrayOfImages[idx];
        img.src = val;
      }
      // style and size image
      img.style.top = `${200 + squareH*i}px`;
      img.style.left = `${squareW *j}px`;
      img.style.width = squareW + 'px';
      img.style.height = squareH + 'px';
      img.style.zIndex = "-1";
      //add image to document
      document.body.appendChild(img);
      //console.log(j);
    }

  }
  
}

// called by button on html to load in maze 1
function maze11() {
map = maze1;
initialLoad();
}
// called by button in html to switch to maze 2
function maze22() {
map = maze2;
initialLoad();
}
//called by button in html to switch to maze 3
function maze33() {
map = maze3;
initialLoad();
}
//called by button in html to switch to maze 4
function maze44() {
map = maze4;
initialLoad();
}
//called by button in html to switch to maze 5
function maze55() {
map = maze5;
initialLoad();
}

// function to load in all the mazes from the csvs
// the same steps are repeated 5 times for each maze
// first get the URL, next request the data
// after that split the data by new line characters to create 1D array
// split 1D arrays by commas to create 2D array
// then store in variable for access later
function loadMazes() {
  //load maze 1
 var url = "Mazes/maze1.csv";

var request = new XMLHttpRequest();  
request.open("GET", url, false);   
request.send(null);  

//maze1 = new Array();
var jsonObject = request.responseText.split("\n");
for (var i = 0; i < jsonObject.length -1; i++) {
  maze1[i] = (jsonObject[i].split(','));
}
//load amze 2
var url = "Mazes/maze2.csv";

var request = new XMLHttpRequest();  
request.open("GET", url, false);   
request.send(null);  

//maze2 = new Array();
var jsonObject = request.responseText.split("\n");
for (var i = 0; i < jsonObject.length -1; i++) {
  maze2.push(jsonObject[i].split(','));
}

//load maze 3
  var url = "Mazes/maze3.csv";

var request = new XMLHttpRequest();  
request.open("GET", url, false);   
request.send(null);  

//maze3 = new Array();
var jsonObject = request.responseText.split("\n");
for (var i = 0; i < jsonObject.length -1; i++) {
  maze3.push(jsonObject[i].split(','));
}

//load maze 4
 var url = "Mazes/maze4.csv";

var request = new XMLHttpRequest();  
request.open("GET", url, false);   
request.send(null);  

//maze4 = new Array();
var jsonObject = request.responseText.split("\n");
for (var i = 0; i < jsonObject.length -1; i++) {
  maze4.push(jsonObject[i].split(','));
}
// load maze 5
 var url = "Mazes/maze5.csv";

var request = new XMLHttpRequest();  
request.open("GET", url, false);   
request.send(null);  
//sleep(500);
//maze5 = new Array();
var jsonObject = request.responseText.split("\n");
for (var i = 0; i < jsonObject.length -1; i++) {
  maze5.push(jsonObject[i].split(','));
}
//sleep(500);

}