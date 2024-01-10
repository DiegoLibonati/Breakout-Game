import { Block } from "./Block";

const blocksDisplay = document.querySelector(
  ".blocks_container"
) as HTMLElement;
const countElement = document.getElementById("contador") as HTMLSpanElement;
const scoreElement = document.querySelector(".score") as HTMLDivElement;

// Board Config
const widthBoard: number = 600;
const heightBoard: number = 300;

// Bloques Config
const widthBlock: number = 100;
const heightBlock: number = 20;

// User Config
// const widthUserBlock: number = 100;
// const heightUserBlock: number = 20;
const startUser: number[] = [250, 0];
let currentPositionUser: number[] = startUser;

// ball Config
const diameterBall: number = 20;
const startBall: number[] = [270, 40];
let currentPositionBall: number[] = startBall;
let xDirection: number = 2;
let yDirection: number = 1;

// Game config
let score: number = 0;

const blocks: Block[] = [
  new Block(0, 279, widthBlock, heightBlock),
  new Block(100, 279, widthBlock, heightBlock),
  new Block(200, 279, widthBlock, heightBlock),
  new Block(300, 279, widthBlock, heightBlock),
  new Block(400, 279, widthBlock, heightBlock),
  new Block(500, 279, widthBlock, heightBlock),
  new Block(0, 259, widthBlock, heightBlock),
  new Block(100, 259, widthBlock, heightBlock),
  new Block(200, 259, widthBlock, heightBlock),
  new Block(300, 259, widthBlock, heightBlock),
  new Block(400, 259, widthBlock, heightBlock),
  new Block(500, 259, widthBlock, heightBlock),
];

const createBlocks = (): void => {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.setAttribute("class", "block");
    blocksDisplay.append(block);
    block.style.left = `${blocks[i].bottomLeft[0]}px`;
    block.style.bottom = `${blocks[i].bottomLeft[1]}px`;
  }
};

const createUser = (): void => {
  const userBlock = document.createElement("div");
  userBlock.setAttribute("class", "user");
  blocksDisplay.append(userBlock);
};

const drawUser = (): void => {
  const userBlock = document.querySelector(".user") as HTMLDivElement;
  userBlock.style.left = `${currentPositionUser[0]}px`;
  userBlock.style.bottom = `${currentPositionUser[1]}px`;
};

const moveUser = (e: KeyboardEvent): void => {
  const block = document.querySelector(".user") as HTMLDivElement;
  if (e.key == "ArrowLeft" && currentPositionUser[0] > 0) {
    block.style.left = `${(currentPositionUser[0] -= 10)}px`;
    drawUser();
  }

  if (
    e.key == "ArrowRight" &&
    currentPositionUser[0] < widthBoard - widthBlock
  ) {
    block.style.left = `${(currentPositionUser[0] += 10)}px`;
    drawUser();
  }
};

document.addEventListener("keydown", moveUser);

const createBall = (): void => {
  const ball = document.createElement("div");
  ball.setAttribute("class", "ball");
  blocksDisplay.append(ball);
};

const drawBall = (): void => {
  const ball = document.querySelector(".ball") as HTMLDivElement;
  ball.style.left = `${currentPositionBall[0]}px`;
  ball.style.bottom = `${currentPositionBall[1]}px`;
};

const moveBall = (): void => {
  currentPositionBall[0] += xDirection;
  currentPositionBall[1] += yDirection;
  drawBall();
  checkForCollisions();
};

const checkForCollisions = () => {
  for (let i = 0; i < blocks.length; i++) {
    if (
      currentPositionBall[0] > blocks[i].bottomLeft[0] &&
      currentPositionBall[0] < blocks[i].bottomRight[0] &&
      currentPositionBall[1] + diameterBall > blocks[i].bottomLeft[1] &&
      currentPositionBall[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;

      countElement.innerHTML = String(score);
    }
  }

  // walls
  if (
    currentPositionBall[0] >= widthBoard - diameterBall ||
    currentPositionBall[1] >= heightBoard - diameterBall ||
    currentPositionBall[0] <= 0
  ) {
    changeDirection();
  }

  // user
  if (
    currentPositionBall[0] > currentPositionUser[0] &&
    currentPositionBall[0] < currentPositionUser[0] + widthBlock &&
    currentPositionBall[1] > currentPositionUser[1] &&
    currentPositionBall[1] < currentPositionUser[1] + heightBlock
  ) {
    changeDirection();
  }

  // game over
  if (currentPositionBall[1] <= 0) {
    clearInterval(timerId);
    document.removeEventListener("keydown", moveUser);
    scoreElement.innerHTML = `<p> You score was: ${score}, but you lose. </p>`;
  }

  // win
  if (blocks.length == 0) {
    clearInterval(timerId);
    document.removeEventListener("keydown", moveUser);
    scoreElement.innerHTML = `<p> You WIN </p>`;
  }
};

const changeDirection = (): void => {
  if (xDirection === 2 && yDirection === 1) {
    yDirection = -1;
    return;
  }
  if (xDirection === 2 && yDirection === -1) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -1) {
    yDirection = 1;
    return;
  }
  if (xDirection === -2 && yDirection === 1) {
    xDirection = 2;
    return;
  }
};

createBlocks();
createUser();
drawUser();
createBall();
drawBall();

const timerId = setInterval(moveBall, 10);
