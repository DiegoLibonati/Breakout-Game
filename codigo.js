const blocksDisplay = document.querySelector(".blocks_container");

// Board Config
const widthBoard = 600;
const heightBoard = 300;

// Bloques Config
const widthBlock = 100;
const heightBlock = 20;

// User Config
const widthUserBlock = 100;
const heightUserBlock = 20;
const startUser = [250 , 0];
let currentPositionUser = startUser;

// ball Config
const diameterBall = 20;
const startBall = [270, 40];
let currentPositionBall = startBall;
let xDirection = 2;
let yDirection = 1;

// Game config
let score = 0;


class Block{
    constructor(x, y){
        this.bottomLeft = [x, y];
        this.bottomRight = [x + widthBlock, y];
        this.topLeft = [x, y + heightBlock];
        this.topRight = [x + widthBlock, y + heightBlock];
    }
}

const blocks =[
    new Block(0, 279),
    new Block(100, 279),
    new Block(200, 279),
    new Block(300, 279),
    new Block(400, 279),
    new Block(500, 279),
    new Block(0, 259),
    new Block(100, 259),
    new Block(200, 259),
    new Block(300, 259),
    new Block(400, 259),
    new Block(500, 259),
];

function createBlocks(){
    for(i = 0; i < blocks.length; i++){
        const block = document.createElement("div");
        block.setAttribute("class", "block");
        blocksDisplay.append(block);
        block.style.left = `${blocks[i].bottomLeft[0]}px`;
        block.style.bottom = `${blocks[i].bottomLeft[1]}px`;
    }
   
}

createBlocks();
createUser();
drawUser();
createBall();
drawBall();


function createUser(){
    const userBlock = document.createElement("div");
    userBlock.setAttribute("class", "user");
    blocksDisplay.append(userBlock);
}

function drawUser(){
    const userBlock = document.querySelector(".user");
    userBlock.style.left = `${currentPositionUser[0]}px`;
    userBlock.style.bottom = `${currentPositionUser[1]}px`;
}

function moveUser(e){
    const block = document.querySelector(".user");
    if (e.key == "ArrowLeft" && currentPositionUser[0] > 0){
       block.style.left = `${currentPositionUser[0] -= 10}px`
       drawUser();
    }

    if (e.key == "ArrowRight" && (currentPositionUser[0] < widthBoard - widthBlock)){
        block.style.left = `${currentPositionUser[0] += 10}px`
        drawUser();
    }

}

document.addEventListener("keydown", moveUser);

function createBall(){
    const ball = document.createElement("div");
    ball.setAttribute("class", "ball");
    blocksDisplay.append(ball);
}

function drawBall(){
    const ball = document.querySelector(".ball");
    ball.style.left = `${currentPositionBall[0]}px`
    ball.style.bottom = `${currentPositionBall[1]}px`
}

function moveBall(){
    currentPositionBall[0] += xDirection;
    currentPositionBall[1] += yDirection;
    drawBall();
    checkForCollisions();
}

function checkForCollisions(){

    for (i = 0; i < blocks.length; i++){
        if ( (currentPositionBall[0] > blocks[i].bottomLeft[0] && currentPositionBall[0] < blocks[i].bottomRight[0]) && (currentPositionBall[1] + diameterBall) > blocks[i].bottomLeft[1] && currentPositionBall[1] < blocks[i].topLeft[1]){
            const allBlocks = Array.from(document.querySelectorAll(".block"));
            allBlocks[i].classList.remove("block");
            blocks.splice(i, 1);
            changeDirection();
            score++
            document.getElementById("contador").innerHTML = score;
        }
    }

    // walls
    if (currentPositionBall[0] >= (widthBoard - diameterBall) || currentPositionBall[1] >= (heightBoard-diameterBall) || currentPositionBall[0] <= 0){
        changeDirection();
    }

    // user
    if ((currentPositionBall[0] > currentPositionUser[0] && currentPositionBall[0] < currentPositionUser[0] + widthBlock) && (currentPositionBall[1] > currentPositionUser[1] && currentPositionBall[1] < currentPositionUser[1] + heightBlock)){
        changeDirection();
    }

    // game over
    if (currentPositionBall[1] <=0){
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
        document.querySelector(".score").innerHTML = `<p> You score was: ${score}, but you lose. </p>`;
    }

    // win
    if (blocks.length == 0){
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
        document.querySelector(".score").innerHTML = `<p> You WIN </p>`;
    }

}

function changeDirection(){
    if (xDirection === 2 && yDirection === 1){
        yDirection = -1;
        return
    }
    if(xDirection === 2 && yDirection === -1){
        xDirection = -2;
        return
    }
    if(xDirection === -2 && yDirection === -1){
        yDirection = 1;
        return
    }
    if(xDirection === -2 && yDirection === 1){
        xDirection = 2;
        return
    }

}

let timerId = setInterval(moveBall, 10);
