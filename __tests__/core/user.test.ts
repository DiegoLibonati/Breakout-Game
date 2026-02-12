import type { Coords } from "@/types/app";

import { User } from "@/core/user";

describe("User", () => {
  describe("Constructor", () => {
    it("should create a User instance with correct properties", () => {
      const position: Coords = { x: 100, y: 200 };
      const user = new User(position);

      expect(user.position).toEqual({ x: 100, y: 200 });
    });

    it("should set position correctly", () => {
      const position: Coords = { x: 50, y: 75 };
      const user = new User(position);

      expect(user.position).toEqual({ x: 50, y: 75 });
    });

    it("should handle zero values", () => {
      const position: Coords = { x: 0, y: 0 };
      const user = new User(position);

      expect(user.position).toEqual({ x: 0, y: 0 });
    });

    it("should handle negative values", () => {
      const position: Coords = { x: -50, y: -100 };
      const user = new User(position);

      expect(user.position).toEqual({ x: -50, y: -100 });
    });

    it("should handle decimal values", () => {
      const position: Coords = { x: 10.5, y: 20.75 };
      const user = new User(position);

      expect(user.position).toEqual({ x: 10.5, y: 20.75 });
    });

    it("should handle large values", () => {
      const position: Coords = { x: 9999, y: 8888 };
      const user = new User(position);

      expect(user.position).toEqual({ x: 9999, y: 8888 });
    });
  });

  describe("create", () => {
    it("should create a UserComponent with correct position", () => {
      const user = new User({ x: 100, y: 200 });

      const component = user.create();

      expect(component).toBeInstanceOf(HTMLDivElement);
      expect(component).toHaveClass("user");
      expect(component.style.left).toBe("100px");
      expect(component.style.bottom).toBe("200px");
    });

    it("should create component at initial position", () => {
      const user = new User({ x: 0, y: 0 });

      const component = user.create();

      expect(component.style.left).toBe("0px");
      expect(component.style.bottom).toBe("0px");
    });

    it("should create component after position changes", () => {
      const user = new User({ x: 50, y: 50 });

      user.position.x = 100;
      user.position.y = 150;

      const component = user.create();

      expect(component.style.left).toBe("100px");
      expect(component.style.bottom).toBe("150px");
    });

    it("should create multiple components with same position", () => {
      const user = new User({ x: 100, y: 200 });

      const component1 = user.create();
      const component2 = user.create();

      expect(component1.style.left).toBe("100px");
      expect(component2.style.left).toBe("100px");
      expect(component1).not.toBe(component2);
    });

    it("should create component with negative position", () => {
      const user = new User({ x: -50, y: -100 });

      const component = user.create();

      expect(component.style.left).toBe("-50px");
      expect(component.style.bottom).toBe("-100px");
    });
  });

  describe("move", () => {
    it("should move left when ArrowLeft is pressed", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowLeft");

      expect(user.position).toEqual({ x: 90, y: 200 });
    });

    it("should move right when ArrowRight is pressed", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowRight");

      expect(user.position).toEqual({ x: 110, y: 200 });
    });

    it("should not change y position when moving left", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowLeft");

      expect(user.position.y).toBe(200);
    });

    it("should not change y position when moving right", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowRight");

      expect(user.position.y).toBe(200);
    });

    it("should move by 10 units to the left", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowLeft");

      expect(user.position.x).toBe(90);
    });

    it("should move by 10 units to the right", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowRight");

      expect(user.position.x).toBe(110);
    });

    it("should move multiple times to the left", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowLeft");
      user.move("ArrowLeft");
      user.move("ArrowLeft");

      expect(user.position).toEqual({ x: 70, y: 200 });
    });

    it("should move multiple times to the right", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowRight");
      user.move("ArrowRight");
      user.move("ArrowRight");

      expect(user.position).toEqual({ x: 130, y: 200 });
    });

    it("should move left and right alternately", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowLeft");
      user.move("ArrowRight");
      user.move("ArrowLeft");

      expect(user.position).toEqual({ x: 90, y: 200 });
    });

    it("should handle moving from zero position", () => {
      const user = new User({ x: 0, y: 0 });

      user.move("ArrowRight");

      expect(user.position).toEqual({ x: 10, y: 0 });
    });

    it("should allow negative x position when moving left", () => {
      const user = new User({ x: 5, y: 100 });

      user.move("ArrowLeft");

      expect(user.position).toEqual({ x: -5, y: 100 });
    });

    it("should accumulate position changes", () => {
      const user = new User({ x: 0, y: 0 });

      for (let i = 0; i < 10; i++) {
        user.move("ArrowRight");
      }

      expect(user.position.x).toBe(100);
    });
  });

  describe("Integration", () => {
    it("should create component after moving", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowLeft");

      const component = user.create();

      expect(component.style.left).toBe("90px");
      expect(component.style.bottom).toBe("200px");
    });

    it("should maintain correct position through multiple operations", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowRight");
      user.move("ArrowRight");
      user.move("ArrowLeft");

      const component = user.create();

      expect(component.style.left).toBe("110px");
      expect(user.position.x).toBe(110);
    });

    it("should handle move and create multiple times", () => {
      const user = new User({ x: 0, y: 0 });

      user.move("ArrowRight");
      const component1 = user.create();

      user.move("ArrowRight");
      const component2 = user.create();

      expect(component1.style.left).toBe("10px");
      expect(component2.style.left).toBe("20px");
    });
  });

  describe("Multiple Users", () => {
    it("should create multiple users independently", () => {
      const user1 = new User({ x: 100, y: 100 });
      const user2 = new User({ x: 200, y: 200 });

      expect(user1.position).toEqual({ x: 100, y: 100 });
      expect(user2.position).toEqual({ x: 200, y: 200 });
    });

    it("should move users independently", () => {
      const user1 = new User({ x: 100, y: 100 });
      const user2 = new User({ x: 200, y: 200 });

      user1.move("ArrowLeft");
      user2.move("ArrowRight");

      expect(user1.position.x).toBe(90);
      expect(user2.position.x).toBe(210);
    });
  });

  describe("Edge Cases", () => {
    it("should handle very large x values", () => {
      const user = new User({ x: 99999, y: 100 });

      user.move("ArrowRight");

      expect(user.position.x).toBe(100009);
    });

    it("should handle very small negative x values", () => {
      const user = new User({ x: -99999, y: 100 });

      user.move("ArrowLeft");

      expect(user.position.x).toBe(-100009);
    });

    it("should handle decimal x values", () => {
      const user = new User({ x: 10.5, y: 20.75 });

      user.move("ArrowRight");

      expect(user.position.x).toBe(20.5);
      expect(user.position.y).toBe(20.75);
    });

    it("should maintain y position through multiple moves", () => {
      const user = new User({ x: 100, y: 200 });

      user.move("ArrowLeft");
      user.move("ArrowRight");
      user.move("ArrowLeft");
      user.move("ArrowRight");

      expect(user.position.y).toBe(200);
    });
  });
});
