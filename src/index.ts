import { Coords, Rows, Sizes } from "./entities/vite-env";

import { getElements } from "./helpers/getElements";

import { Ball } from "./models/Ball";
import { Block } from "./models/Block";
import { User } from "./models/User";

// Board Config
const widthBoard: number = 600;
const heightBoard: number = 300;

// Bloques Config
const rows: Rows = { y1: 279, y2: 259, y3: 239 };
const widthBlock: number = 100;
const heightBlock: number = 20;

let user: User;
let ball: Ball;
let score: number;
let blocks: Block[];

let intervalBall: NodeJS.Timeout;

const createBlocks = (): void => {
  const { blocksDisplay } = getElements();

  blocks.forEach((block) => {
    const blockElement = block.create();
    blocksDisplay.append(blockElement);
  });
};

const createUser = (): void => {
  const { blocksDisplay } = getElements();

  const userElement = user.create();
  blocksDisplay.append(userElement);
};

const createBall = (): void => {
  const { blocksDisplay } = getElements();

  const ballElement = ball.create();
  blocksDisplay.append(ballElement);
};

const moveUser = (e: KeyboardEvent): void => {
  const key = e.key;

  if (
    (key !== "ArrowLeft" && key !== "ArrowRight") ||
    (key == "ArrowLeft" && user.position.x <= 0) ||
    (key == "ArrowRight" && user.position.x >= widthBoard - widthBlock)
  )
    return;

  const { user: userElement } = getElements();

  user.move(key);
  userElement.style.left = `${user.position.x}px`;
};

const moveBall = (): void => {
  const { ball: ballElement } = getElements();

  ball.move();

  ballElement.style.left = `${ball.position.x}px`;
  ballElement.style.bottom = `${ball.position.y}px`;
  checkForCollisions();
};

const checkForCollisions = () => {
  const { scoreElement, countElement } = getElements();

  // walls
  if (
    ball.position.x >= widthBoard - ball.diameter ||
    ball.position.y >= heightBoard - ball.diameter ||
    ball.position.x <= 0
  ) {
    ball.changeDirection();
  }

  // user
  if (
    ball.position.x > user.position.x &&
    ball.position.x < user.position.x + widthBlock &&
    ball.position.y > user.position.y &&
    ball.position.y < user.position.y + heightBlock
  ) {
    ball.changeDirection();
  }

  // win or game over
  if (ball.position.y <= 0 || !blocks.length) {
    clearInterval(intervalBall);
    document.removeEventListener("keydown", moveUser);
    scoreElement.innerHTML = !blocks.length
      ? `<p class="game__score"> You WIN </p>`
      : `<p class="game__score"> You score was: ${score}, but you lose. </p>`;
  }

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i] as Block;

    if (
      ball.position.x > block.bottomLeft.x &&
      ball.position.x < block.bottomRight.x &&
      ball.position.y + ball.diameter > block.bottomLeft.y &&
      ball.position.y < block.topLeft.y
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      ball.changeDirection();
      score++;

      countElement.innerHTML = String(score);
      break;
    }
  }
};

const setInitialValues = (): void => {
  const userPosition: Coords = { x: 250, y: 0 };

  const ballDiameter: number = 20;
  const ballPosition: Coords = { x: 270, y: 40 };
  const ballDirection: Coords = { x: 2, y: 1 };

  const blockSizes: Sizes = { width: widthBlock, height: heightBlock };

  const initialScore: number = 0;
  const initialBlocks: Block[] = [
    new Block({ x: 0, y: rows.y1 }, blockSizes),
    new Block({ x: 100, y: rows.y1 }, blockSizes),
    new Block({ x: 200, y: rows.y1 }, blockSizes),
    new Block({ x: 300, y: rows.y1 }, blockSizes),
    new Block({ x: 400, y: rows.y1 }, blockSizes),
    new Block({ x: 500, y: rows.y1 }, blockSizes),

    new Block({ x: 0, y: rows.y2 }, blockSizes),
    new Block({ x: 100, y: rows.y2 }, blockSizes),
    new Block({ x: 200, y: rows.y2 }, blockSizes),
    new Block({ x: 300, y: rows.y2 }, blockSizes),
    new Block({ x: 400, y: rows.y2 }, blockSizes),
    new Block({ x: 500, y: rows.y2 }, blockSizes),

    new Block({ x: 0, y: rows.y3 }, blockSizes),
    new Block({ x: 100, y: rows.y3 }, blockSizes),
    new Block({ x: 200, y: rows.y3 }, blockSizes),
    new Block({ x: 300, y: rows.y3 }, blockSizes),
    new Block({ x: 400, y: rows.y3 }, blockSizes),
    new Block({ x: 500, y: rows.y3 }, blockSizes),
  ];

  user = new User(userPosition);
  ball = new Ball(ballDiameter, ballPosition, ballDirection);
  score = initialScore;
  blocks = initialBlocks;

  intervalBall = setInterval(moveBall, 10);
};

const onInit = () => {
  setInitialValues();

  createBlocks();
  createUser();
  createBall();

  document.addEventListener("keydown", moveUser);
};

document.addEventListener("DOMContentLoaded", onInit);
