import { Ball } from "@src/models/Ball";

const BALL = {
  diameter: 20,
  position: { x: 2, y: 2 },
  direction: { x: 2, y: 1 },
};

describe("Ball Class", () => {
  let ball: Ball = new Ball(BALL.diameter, BALL.position, BALL.direction);

  test("It must have the correct initial state when initializing an instance of Ball.", () => {
    expect(ball.diameter).toBe(BALL.diameter);
    expect(ball.position.x).toBe(BALL.position.x);
    expect(ball.position.y).toBe(BALL.position.y);
    expect(ball.direction.x).toBe(BALL.direction.x);
    expect(ball.direction.y).toBe(BALL.direction.y);
  });

  test("It must create the element that will be used to render the ball.", () => {
    const ballElement = ball.create();

    expect(ballElement instanceof HTMLDivElement).toBeTruthy();
    expect(ballElement.classList.contains("ball")).toBeTruthy();
    expect(ballElement.style.left).toBe(`${ball.position.x}px`);
    expect(ballElement.style.bottom).toBe(`${ball.position.y}px`);
  });

  test("It must change direction of the ball when executing the change of direction method.", () => {
    expect(ball.direction.x).toBe(BALL.direction.x);
    expect(ball.direction.y).toBe(BALL.direction.y);

    ball.changeDirection();

    expect(ball.direction.x).toBe(2);
    expect(ball.direction.y).toBe(-1);

    ball.changeDirection();

    expect(ball.direction.x).toBe(-2);
    expect(ball.direction.y).toBe(-1);

    ball.changeDirection();

    expect(ball.direction.x).toBe(-2);
    expect(ball.direction.y).toBe(1);

    ball.changeDirection();

    expect(ball.direction.x).toBe(2);
    expect(ball.direction.y).toBe(1);
  });

  test("It must move the ball based on the direction.", () => {
    expect(ball.position.x).toBe(BALL.position.x);
    expect(ball.position.y).toBe(BALL.position.y);

    ball.move();

    expect(ball.position.x).toBe(4);
    expect(ball.position.y).toBe(3);
  });
});
