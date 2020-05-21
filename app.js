document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const GRID_WIDTH = 10;

    let nextRandom = 0;

    let timerId;
    
    //The Tetrominoes
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
  ]

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
  ]

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ]

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
  ]
  
  const theTetriminoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4;
  let currentRotation = 0;

  //random tetromino selection
  let random = Math.floor(Math.random()*theTetriminoes.length)
  //console.log(random)
  let current = theTetriminoes[random][currentRotation];
  

  //drw the first rotation of first tetromino

function draw(){
    current.forEach(index=>{
        squares[currentPosition+index].classList.add('tetromino')
    });
}

draw();

//undraw tetromeno
function undraw(){
    current.forEach(index=>{
        squares[currentPosition+index].classList.remove('tetromino')
    });
}

//make tetromino move down every sec

//timerId = setInterval(moveDown,800);

//Assign keycodes to functions
function control(e){
    if(e.keyCode === 37){
        moveLeft();
    }
    else if(e.keyCode===38){
        rotate();
    }
    else if(e.keyCode===39){
        moveRight();
    }
    else if(e.keyCode===40){
        moveDown();
    }
}

//keydown speeds up the down movemnet
document.addEventListener('keydown',control);

//movedown function

function moveDown(){

    undraw();
    currentPosition+=GRID_WIDTH;
    draw();
    freeze();
}

function freeze(){
    if(current.some(index=> squares[currentPosition+index+GRID_WIDTH].classList.contains('taken'))){
        current.forEach(index=> squares[currentPosition+index].classList.add('taken'))
        //start  a new tetromino falling
        random = nextRandom;
        nextRandom = Math.floor(Math.random()*theTetriminoes.length);
        current = theTetriminoes[random][currentRotation];
        currentPosition = 4;
        draw();
        displayShape();
        
    }
}
//freeze();

//move tetromino left unless is at the edge or there is a blockage
function moveLeft(){
    undraw();
    const isAtLeftEdge = current.some(index=> (currentPosition+index)%GRID_WIDTH===0);
    if(!isAtLeftEdge){
        currentPosition += -1;

    }

    if(current.some(index=> squares[currentPosition+index].classList.contains('taken'))){
        currentPosition += 1;
    }
    draw();
}


function moveRight(){
    undraw();
    const isAtLeftEdge = current.some(index=> (currentPosition+index)%GRID_WIDTH=== GRID_WIDTH-1);
    if(!isAtLeftEdge){
        currentPosition += +1;

    }

    if(current.some(index=> squares[currentPosition+index].classList.contains('taken'))){
        currentPosition -= 1;
    }
    draw();
}

//rotate tromino
function rotate(){
    undraw();
    currentRotation++;
    if(currentRotation === current.length){
        currentRotation = 0;
    }
    current = theTetriminoes[random][currentRotation];
    draw();
}

// show nextup tetromino

const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

//the tetrominos without rotations
const upNextTetromino = [
    [1,displayWidth +1,displayWidth*2+1, 2], //l
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],  //z
    [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
    [0, 1, displayWidth, displayWidth + 1], /* oTetromino */ 
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
]

//display the next shape in the mini grid
function displayShape(){
    displaySquares.forEach(square =>{
        square.classList.remove('tetromino');
    })

    upNextTetromino[nextRandom].forEach(index =>{
        displaySquares[displayIndex + index].classList.add('tetromino');
        
    });
}

//add function to button

startBtn.addEventListener('click',()=>{
if(timerId){
    clearInterval(timerId)
    timerId = null
}
else{
    draw()
    timerId = setInterval(moveDown,800);
    nextRandom = Math.floor(Math.random()*theTetriminoes.length)
    displayShape()
}

})







});