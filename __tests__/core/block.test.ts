import type { Coords, Sizes } from "@/types/app";

import { Block } from "@/core/block";

describe("Block", () => {
  describe("Constructor", () => {
    it("should create a Block instance with correct properties", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.position).toEqual({ x: 100, y: 200 });
      expect(block.sizes).toEqual({ width: 50, height: 30 });
    });

    it("should calculate bottomLeft corner correctly", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.bottomLeft).toEqual({ x: 100, y: 200 });
    });

    it("should calculate bottomRight corner correctly", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.bottomRight).toEqual({ x: 150, y: 200 });
    });

    it("should calculate topLeft corner correctly", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.topLeft).toEqual({ x: 100, y: 230 });
    });

    it("should calculate topRight corner correctly", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.topRight).toEqual({ x: 150, y: 230 });
    });

    it("should calculate all corners correctly for different values", () => {
      const position: Coords = { x: 0, y: 0 };
      const sizes: Sizes = { width: 100, height: 80 };
      const block = new Block(position, sizes);

      expect(block.bottomLeft).toEqual({ x: 0, y: 0 });
      expect(block.bottomRight).toEqual({ x: 100, y: 0 });
      expect(block.topLeft).toEqual({ x: 0, y: 80 });
      expect(block.topRight).toEqual({ x: 100, y: 80 });
    });

    it("should handle zero sizes", () => {
      const position: Coords = { x: 50, y: 50 };
      const sizes: Sizes = { width: 0, height: 0 };
      const block = new Block(position, sizes);

      expect(block.bottomLeft).toEqual({ x: 50, y: 50 });
      expect(block.bottomRight).toEqual({ x: 50, y: 50 });
      expect(block.topLeft).toEqual({ x: 50, y: 50 });
      expect(block.topRight).toEqual({ x: 50, y: 50 });
    });

    it("should handle negative position", () => {
      const position: Coords = { x: -50, y: -100 };
      const sizes: Sizes = { width: 40, height: 60 };
      const block = new Block(position, sizes);

      expect(block.bottomLeft).toEqual({ x: -50, y: -100 });
      expect(block.bottomRight).toEqual({ x: -10, y: -100 });
      expect(block.topLeft).toEqual({ x: -50, y: -40 });
      expect(block.topRight).toEqual({ x: -10, y: -40 });
    });

    it("should handle decimal values", () => {
      const position: Coords = { x: 10.5, y: 20.75 };
      const sizes: Sizes = { width: 15.25, height: 25.5 };
      const block = new Block(position, sizes);

      expect(block.bottomLeft).toEqual({ x: 10.5, y: 20.75 });
      expect(block.bottomRight).toEqual({ x: 25.75, y: 20.75 });
      expect(block.topLeft).toEqual({ x: 10.5, y: 46.25 });
      expect(block.topRight).toEqual({ x: 25.75, y: 46.25 });
    });

    it("should handle large values", () => {
      const position: Coords = { x: 1000, y: 2000 };
      const sizes: Sizes = { width: 500, height: 300 };
      const block = new Block(position, sizes);

      expect(block.bottomLeft).toEqual({ x: 1000, y: 2000 });
      expect(block.bottomRight).toEqual({ x: 1500, y: 2000 });
      expect(block.topLeft).toEqual({ x: 1000, y: 2300 });
      expect(block.topRight).toEqual({ x: 1500, y: 2300 });
    });
  });

  describe("create", () => {
    it("should create a BlockComponent with correct position", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      const component = block.create();

      expect(component).toBeInstanceOf(HTMLDivElement);
      expect(component).toHaveClass("block");
      expect(component.style.left).toBe("100px");
      expect(component.style.bottom).toBe("200px");
    });

    it("should create component at bottomLeft position", () => {
      const position: Coords = { x: 50, y: 75 };
      const sizes: Sizes = { width: 40, height: 20 };
      const block = new Block(position, sizes);

      const component = block.create();

      expect(component.style.left).toBe("50px");
      expect(component.style.bottom).toBe("75px");
    });

    it("should create component at zero position", () => {
      const position: Coords = { x: 0, y: 0 };
      const sizes: Sizes = { width: 100, height: 80 };
      const block = new Block(position, sizes);

      const component = block.create();

      expect(component.style.left).toBe("0px");
      expect(component.style.bottom).toBe("0px");
    });

    it("should create component with negative position", () => {
      const position: Coords = { x: -50, y: -100 };
      const sizes: Sizes = { width: 40, height: 60 };
      const block = new Block(position, sizes);

      const component = block.create();

      expect(component.style.left).toBe("-50px");
      expect(component.style.bottom).toBe("-100px");
    });

    it("should create multiple components with same position", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      const component1 = block.create();
      const component2 = block.create();

      expect(component1.style.left).toBe("100px");
      expect(component2.style.left).toBe("100px");
      expect(component1).not.toBe(component2);
    });

    it("should create component regardless of size", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 1000, height: 800 };
      const block = new Block(position, sizes);

      const component = block.create();

      expect(component.style.left).toBe("100px");
      expect(component.style.bottom).toBe("200px");
    });
  });

  describe("Corner Relationships", () => {
    it("should have bottomRight.x equal to bottomLeft.x plus width", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.bottomRight.x).toBe(block.bottomLeft.x + sizes.width);
    });

    it("should have topLeft.y equal to bottomLeft.y plus height", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.topLeft.y).toBe(block.bottomLeft.y + sizes.height);
    });

    it("should have all bottom corners at same y", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.bottomLeft.y).toBe(block.bottomRight.y);
    });

    it("should have all top corners at same y", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.topLeft.y).toBe(block.topRight.y);
    });

    it("should have all left corners at same x", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.bottomLeft.x).toBe(block.topLeft.x);
    });

    it("should have all right corners at same x", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      expect(block.bottomRight.x).toBe(block.topRight.x);
    });

    it("should form a rectangle with correct dimensions", () => {
      const position: Coords = { x: 100, y: 200 };
      const sizes: Sizes = { width: 50, height: 30 };
      const block = new Block(position, sizes);

      const width = block.bottomRight.x - block.bottomLeft.x;
      const height = block.topLeft.y - block.bottomLeft.y;

      expect(width).toBe(sizes.width);
      expect(height).toBe(sizes.height);
    });
  });

  describe("Multiple Blocks", () => {
    it("should create multiple blocks independently", () => {
      const block1 = new Block({ x: 0, y: 0 }, { width: 50, height: 30 });
      const block2 = new Block({ x: 100, y: 100 }, { width: 40, height: 20 });

      expect(block1.bottomLeft).toEqual({ x: 0, y: 0 });
      expect(block2.bottomLeft).toEqual({ x: 100, y: 100 });
    });

    it("should maintain independent corner calculations", () => {
      const block1 = new Block({ x: 0, y: 0 }, { width: 50, height: 30 });
      const block2 = new Block({ x: 0, y: 0 }, { width: 100, height: 80 });

      expect(block1.topRight).toEqual({ x: 50, y: 30 });
      expect(block2.topRight).toEqual({ x: 100, y: 80 });
    });
  });

  describe("Edge Cases", () => {
    it("should handle very small sizes", () => {
      const position: Coords = { x: 100, y: 100 };
      const sizes: Sizes = { width: 0.1, height: 0.1 };
      const block = new Block(position, sizes);

      expect(block.bottomRight).toEqual({ x: 100.1, y: 100 });
      expect(block.topLeft).toEqual({ x: 100, y: 100.1 });
    });

    it("should handle very large sizes", () => {
      const position: Coords = { x: 0, y: 0 };
      const sizes: Sizes = { width: 10000, height: 8000 };
      const block = new Block(position, sizes);

      expect(block.bottomRight).toEqual({ x: 10000, y: 0 });
      expect(block.topLeft).toEqual({ x: 0, y: 8000 });
      expect(block.topRight).toEqual({ x: 10000, y: 8000 });
    });

    it("should handle square blocks", () => {
      const position: Coords = { x: 50, y: 50 };
      const sizes: Sizes = { width: 100, height: 100 };
      const block = new Block(position, sizes);

      const width = block.bottomRight.x - block.bottomLeft.x;
      const height = block.topLeft.y - block.bottomLeft.y;

      expect(width).toBe(height);
    });
  });
});
