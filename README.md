# Breakout-Game-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made the game Breakout, in which we must use a platform to move to the sides to hit the ball and in this way the ball hits the blocks. Once we knock down all the blocks we win, if the ball hits the bottom we lose. The controls are the left and right arrows.

## IMPORTANT 

- ¡NOT SUPPORT FOR MOBILE!

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/49`](https://www.diegolibonati.com.ar/#/project/49)

## Video

https://user-images.githubusercontent.com/99032604/199374036-1b0e5ac6-860e-4dfa-8810-0895a085983c.mp4

## Documentation

The `blocksDisplay` variable stores the game board. In `widthBoard and heightBoard` the size of the board is set, in `widthBlock and heightBlock` the size of the blocks is set, in `widthUserBlock, heightUserBlock, startUser and currentPositionUser` the user properties are set, in `diameterBall, startBall, currentPositionBall, xDirection and yDirection` you set the ball properties and finally `score` which refers to the player score, when he breaks a block he will add a point:

```
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
```

The `Block` class refers to the creation of the blocks, these blocks will have a `bottomLeft, bottomRight, topLeft and topRight`:

```
export class Block {
  public bottomLeft: number[];
  public bottomRight: number[];
  public topLeft: number[];
  public topRight: number[];
  constructor(
    public x: number,
    public y: number,
    public widthBlock: number,
    public heightBlock: number
  ) {
    this.bottomLeft = [x, y];
    this.bottomRight = [x + widthBlock, y];
    this.topLeft = [x, y + heightBlock];
    this.topRight = [x + widthBlock, y + heightBlock];
  }
}
```

In the array `blocks` we are going to store all the instances of blocks we want to store:

```
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
```

The `createBlocks()` function creates the blocks to be broken:

```
const createBlocks = (): void => {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.setAttribute("class", "block");
    blocksDisplay.append(block);
    block.style.left = `${blocks[i].bottomLeft[0]}px`;
    block.style.bottom = `${blocks[i].bottomLeft[1]}px`;
  }
};
```

The `createUser()` function creates the user:

```
const createUser = (): void => {
  const userBlock = document.createElement("div");
  userBlock.setAttribute("class", "user");
  blocksDisplay.append(userBlock);
};
```

The `drawUser()` function draws the user:

```
const drawUser = (): void => {
  const userBlock = document.querySelector(".user") as HTMLDivElement;
  userBlock.style.left = `${currentPositionUser[0]}px`;
  userBlock.style.bottom = `${currentPositionUser[1]}px`;
};
```

The `moveUser()` function moves the user:

```
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
```

The `createBall()` function creates the ball, the `drawBall()` function draws the ball, the `moveBall()` function moves the ball:

```
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
```

The `checkForCollisions()` function basically checks if the ball collides with a block, if so it removes the block and adds a point to the `score`:

```
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
```

The `changeDirection()` function will be executed every time the ball collides with something, depending on where the ball was coming from it will change direction:

```
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
```
