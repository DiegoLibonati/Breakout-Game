import type { Page } from "@/types/pages";
import type {
  BallComponent,
  BlockComponent,
  UserComponent,
} from "@/types/components";

import { Ball } from "@/core/ball";
import { User } from "@/core/user";

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
} from "@/constants/vars";

import "@/pages/BreakoutPage/BreakoutPage.css";

export const BreakoutPage = (): Page => {
  const main = document.createElement("main") as Page;
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

  let user = new User({ ...userPosition });
  let ball = new Ball(ballDiameter, { ...ballPosition }, { ...ballDirection });
  let score = initialScore;
  let blocks = [...initialBlocks];
  let intervalBall: number | null = null;
  let isGameActive = true;

  const setInitialValues = (): void => {
    user = new User({ ...userPosition });
    ball = new Ball(ballDiameter, { ...ballPosition }, { ...ballDirection });
    score = initialScore;
    blocks = [...initialBlocks];
    isGameActive = true;

    intervalBall = setInterval(moveBall, 10);
  };

  const endGame = (message: string): void => {
    isGameActive = false;

    if (intervalBall !== null) {
      clearInterval(intervalBall);
      intervalBall = null;
    }

    document.removeEventListener("keydown", moveUser);

    const scoreElement = main.querySelector<HTMLDivElement>(".game__header")!;
    scoreElement.innerHTML = `<p class="game__score">${message}</p>`;
  };

  const moveBall = (): void => {
    if (!isGameActive) return;

    const ballElement = main.querySelector<BallComponent>(".ball");

    ball.move();

    if (ballElement) {
      ballElement.style.left = `${ball.position.x}px`;
      ballElement.style.bottom = `${ball.position.y}px`;
    }

    checkForCollisions();
  };

  const checkForCollisions = (): void => {
    const countElement =
      main.querySelector<HTMLSpanElement>(".game__score-count");

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
    if (ball.position.y <= 0) {
      endGame(`You score was: ${score}, but you lose.`);
      return;
    }

    if (blocks.length === 0) {
      endGame("You WIN!");
      return;
    }

    // blocks collision
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]!;

      if (
        ball.position.x > block.bottomLeft.x &&
        ball.position.x < block.bottomRight.x &&
        ball.position.y + ball.diameter > block.bottomLeft.y &&
        ball.position.y < block.topLeft.y
      ) {
        const allBlocks = Array.from(
          main.querySelectorAll<BlockComponent>(".block")
        );
        allBlocks[i]?.classList.remove("block");
        blocks.splice(i, 1);
        ball.changeDirection();
        score++;

        if (countElement) {
          countElement.innerHTML = String(score);
        }
        break;
      }
    }
  };

  const moveUser = (e: KeyboardEvent): void => {
    if (!isGameActive) return;

    const key = e.key;

    if (
      (key !== "ArrowLeft" && key !== "ArrowRight") ||
      (key === "ArrowLeft" && user.position.x <= 0) ||
      (key === "ArrowRight" && user.position.x >= widthBoard - widthBlock)
    )
      return;

    const userElement = main.querySelector<UserComponent>(".user");

    user.move(key);
    if (userElement) {
      userElement.style.left = `${user.position.x}px`;
    }
  };

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

  main.cleanup = (): void => {
    isGameActive = false;

    if (intervalBall !== null) {
      clearInterval(intervalBall);
      intervalBall = null;
    }

    document.removeEventListener("keydown", moveUser);

    blocks = [];
  };

  return main;
};
