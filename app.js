document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const GRID_WIDTH = 10;
    //console.log(squares);

    //the tetrominoes
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
  console.log(random)
  let current = theTetriminoes[random][currentRotation];
  

  //drw the first rotation of first tetromino

function draw(){
    current.forEach(index=>{
        squares[currentPosition+index].classList.add('tetromino')
    })
}

draw();

//undraw tetromeno
function undraw(){
    current.forEach(index=>{
        squares[currentPosition+index].classList.remove('tetromino')
    })
}

//make tetromino move down every sec

timerId = setInterval(moveDown,800);



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
        random = Math.floor(Math.random()*theTetriminoes.length);
        current = theTetriminoes[random][currentRotation];
        currentPosition = 4;
        draw();
        
    }
}

//move tetromino left unless is at the edge or there is a blockage
function moveLeft(){
    undraw();
    const isAtLeftEdge = current.some(index=> (currentPosition+index)%GRID_WIDTH===0);
    if(!isAtLeftEdge){
        currentPosition = -1;

    }

    if(current.some(index=> squares[currentPosition+index].classList.contains('taken'))){
        currentPosition += 1;
    }
    draw();
}












})