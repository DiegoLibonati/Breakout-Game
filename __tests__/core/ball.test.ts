import type { Coords } from "@/types/app";

import { Ball } from "@/core/ball";

describe("Ball", () => {
  describe("Constructor", () => {
    it("should create a Ball instance with correct properties", () => {
      const position: Coords = { x: 100, y: 200 };
      const direction: Coords = { x: 2, y: 1 };
      const ball = new Ball(10, position, direction);

      expect(ball.diameter).toBe(10);
      expect(ball.position).toEqual({ x: 100, y: 200 });
      expect(ball.direction).toEqual({ x: 2, y: 1 });
    });

    it("should set diameter correctly", () => {
      const ball = new Ball(20, { x: 0, y: 0 }, { x: 2, y: 1 });

      expect(ball.diameter).toBe(20);
    });

    it("should set position correctly", () => {
      const position: Coords = { x: 50, y: 75 };
      const ball = new Ball(10, position, { x: 2, y: 1 });

      expect(ball.position).toEqual({ x: 50, y: 75 });
    });

    it("should set direction correctly", () => {
      const direction: Coords = { x: -2, y: -1 };
      const ball = new Ball(10, { x: 0, y: 0 }, direction);

      expect(ball.direction).toEqual({ x: -2, y: -1 });
    });

    it("should handle zero values", () => {
      const ball = new Ball(0, { x: 0, y: 0 }, { x: 0, y: 0 });

      expect(ball.diameter).toBe(0);
      expect(ball.position).toEqual({ x: 0, y: 0 });
      expect(ball.direction).toEqual({ x: 0, y: 0 });
    });

    it("should handle negative values", () => {
      const ball = new Ball(10, { x: -50, y: -100 }, { x: -2, y: -1 });

      expect(ball.position).toEqual({ x: -50, y: -100 });
      expect(ball.direction).toEqual({ x: -2, y: -1 });
    });
  });

  describe("create", () => {
    it("should create a BallComponent with correct position", () => {
      const ball = new Ball(10, { x: 100, y: 200 }, { x: 2, y: 1 });

      const component = ball.create();

      expect(component).toBeInstanceOf(HTMLDivElement);
      expect(component).toHaveClass("ball");
      expect(component.style.left).toBe("100px");
      expect(component.style.bottom).toBe("200px");
    });

    it("should create component at initial position", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: 1 });

      const component = ball.create();

      expect(component.style.left).toBe("0px");
      expect(component.style.bottom).toBe("0px");
    });

    it("should create component after position changes", () => {
      const ball = new Ball(10, { x: 50, y: 50 }, { x: 2, y: 1 });

      ball.position.x = 100;
      ball.position.y = 150;

      const component = ball.create();

      expect(component.style.left).toBe("100px");
      expect(component.style.bottom).toBe("150px");
    });

    it("should create multiple components with same position", () => {
      const ball = new Ball(10, { x: 100, y: 200 }, { x: 2, y: 1 });

      const component1 = ball.create();
      const component2 = ball.create();

      expect(component1.style.left).toBe("100px");
      expect(component2.style.left).toBe("100px");
      expect(component1).not.toBe(component2);
    });
  });

  describe("move", () => {
    it("should move ball by direction vector", () => {
      const ball = new Ball(10, { x: 100, y: 200 }, { x: 2, y: 1 });

      ball.move();

      expect(ball.position).toEqual({ x: 102, y: 201 });
    });

    it("should move multiple times", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: 1 });

      ball.move();
      ball.move();
      ball.move();

      expect(ball.position).toEqual({ x: 6, y: 3 });
    });

    it("should move with negative direction", () => {
      const ball = new Ball(10, { x: 100, y: 100 }, { x: -2, y: -1 });

      ball.move();

      expect(ball.position).toEqual({ x: 98, y: 99 });
    });

    it("should move from zero position", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: 1 });

      ball.move();

      expect(ball.position).toEqual({ x: 2, y: 1 });
    });

    it("should handle zero direction", () => {
      const ball = new Ball(10, { x: 100, y: 100 }, { x: 0, y: 0 });

      ball.move();

      expect(ball.position).toEqual({ x: 100, y: 100 });
    });

    it("should accumulate position changes", () => {
      const ball = new Ball(10, { x: 50, y: 50 }, { x: 2, y: 1 });

      for (let i = 0; i < 10; i++) {
        ball.move();
      }

      expect(ball.position).toEqual({ x: 70, y: 60 });
    });
  });

  describe("changeDirection", () => {
    it("should change from (2, 1) to (2, -1)", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: 1 });

      ball.changeDirection();

      expect(ball.direction).toEqual({ x: 2, y: -1 });
    });

    it("should change from (2, -1) to (-2, -1)", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: -1 });

      ball.changeDirection();

      expect(ball.direction).toEqual({ x: -2, y: -1 });
    });

    it("should change from (-2, -1) to (-2, 1)", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: -2, y: -1 });

      ball.changeDirection();

      expect(ball.direction).toEqual({ x: -2, y: 1 });
    });

    it("should change from (-2, 1) to (2, 1)", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: -2, y: 1 });

      ball.changeDirection();

      expect(ball.direction).toEqual({ x: 2, y: 1 });
    });

    it("should cycle through all directions", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: 1 });

      ball.changeDirection();
      expect(ball.direction).toEqual({ x: 2, y: -1 });

      ball.changeDirection();
      expect(ball.direction).toEqual({ x: -2, y: -1 });

      ball.changeDirection();
      expect(ball.direction).toEqual({ x: -2, y: 1 });

      ball.changeDirection();
      expect(ball.direction).toEqual({ x: 2, y: 1 });
    });

    it("should complete full cycle and return to initial direction", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: 1 });

      ball.changeDirection();
      ball.changeDirection();
      ball.changeDirection();
      ball.changeDirection();

      expect(ball.direction).toEqual({ x: 2, y: 1 });
    });

    it("should not change direction if not in valid state", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 5, y: 5 });

      ball.changeDirection();

      expect(ball.direction).toEqual({ x: 5, y: 5 });
    });
  });

  describe("Integration", () => {
    it("should move and change direction correctly", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: 1 });

      ball.move();
      expect(ball.position).toEqual({ x: 2, y: 1 });

      ball.changeDirection();
      expect(ball.direction).toEqual({ x: 2, y: -1 });

      ball.move();
      expect(ball.position).toEqual({ x: 4, y: 0 });
    });

    it("should create component after moving", () => {
      const ball = new Ball(10, { x: 0, y: 0 }, { x: 2, y: 1 });

      ball.move();

      const component = ball.create();

      expect(component.style.left).toBe("2px");
      expect(component.style.bottom).toBe("1px");
    });

    it("should maintain correct state through multiple operations", () => {
      const ball = new Ball(10, { x: 50, y: 50 }, { x: 2, y: 1 });

      ball.move();
      ball.changeDirection();
      ball.move();
      ball.changeDirection();

      expect(ball.position).toEqual({ x: 54, y: 50 });
      expect(ball.direction).toEqual({ x: -2, y: -1 });
    });
  });

  describe("Edge Cases", () => {
    it("should handle large position values", () => {
      const ball = new Ball(10, { x: 9999, y: 9999 }, { x: 2, y: 1 });

      ball.move();

      expect(ball.position).toEqual({ x: 10001, y: 10000 });
    });

    it("should handle decimal values", () => {
      const ball = new Ball(10.5, { x: 10.5, y: 20.75 }, { x: 2, y: 1 });

      expect(ball.diameter).toBe(10.5);
      expect(ball.position).toEqual({ x: 10.5, y: 20.75 });
    });

    it("should handle negative positions", () => {
      const ball = new Ball(10, { x: -50, y: -100 }, { x: 2, y: 1 });

      ball.move();

      expect(ball.position).toEqual({ x: -48, y: -99 });
    });
  });
});
