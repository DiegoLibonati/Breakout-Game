import { Ball } from "@src/models/Ball";
import { Block } from "@src/models/Block";
import { User } from "@src/models/User";

import {
  ballDiameter,
  ballDirection,
  ballPosition,
  heightBlock,
  heightBoard,
  initialBlocks,
  initialScore,
  userPosition,
  widthBlock,
  widthBoard,
} from "@src/constants/vars";

import "@src/pages/BreakoutPage/BreakoutPage.css";

let user: User;
let ball: Ball;
let score: number;
let blocks: Block[];

let intervalBall: NodeJS.Timeout;

const setInitialValues = (): void => {
  user = new User(userPosition);
  ball = new Ball(ballDiameter, ballPosition, ballDirection);
  score = initialScore;
  blocks = initialBlocks;

  intervalBall = setInterval(moveBall, 10);
};

const moveBall = (): void => {
  const ballElement = document.querySelector<HTMLDivElement>(".ball");

  ball.move();

  ballElement!.style.left = `${ball.position.x}px`;
  ballElement!.style.bottom = `${ball.position.y}px`;

  checkForCollisions();
};

const checkForCollisions = () => {
  const countElement =
    document.querySelector<HTMLSpanElement>(".game__score-count");
  const scoreElement = document.querySelector<HTMLDivElement>(".game__header");

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
    scoreElement!.innerHTML = !blocks.length
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
      const allBlocks = Array.from(
        document.querySelectorAll<HTMLDivElement>(".block")
      );
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      ball.changeDirection();
      score++;

      countElement!.innerHTML = String(score);
      break;
    }
  }
};

const moveUser = (e: KeyboardEvent): void => {
  const key = e.key;

  if (
    (key !== "ArrowLeft" && key !== "ArrowRight") ||
    (key == "ArrowLeft" && user.position.x <= 0) ||
    (key == "ArrowRight" && user.position.x >= widthBoard - widthBlock)
  )
    return;

  const userElement = document.querySelector<HTMLDivElement>(".user");

  user.move(key);
  userElement!.style.left = `${user.position.x}px`;
};

export const BreakoutPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "breakout-page";

  main.innerHTML = `
    <section class="game">
      <div class="game__header">
        <p class="game__score">
          Score: <span id="counter" class="game__score-count">0</span>
        </p>
      </div>

      <div class="game__blocks"></div>
    </section>
  `;

  const gameBlocks = main.querySelector<HTMLDivElement>(".game__blocks");

  setInitialValues();

  blocks.forEach((block) => {
    const blockElement = block.create();
    gameBlocks!.append(blockElement);
  });

  const userElement = user.create();
  gameBlocks!.append(userElement);

  const ballElement = ball.create();
  gameBlocks!.append(ballElement);

  document.addEventListener("keydown", moveUser);

  return main;
};
