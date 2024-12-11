import { Block } from "./Block";

const BLOCK = {
  position: { x: 2, y: 2 },
  sizes: { width: 250, height: 25 },
};

describe("Block Class", () => {
  let block: Block = new Block(BLOCK.position, BLOCK.sizes);

  test("It must have the correct initial state when initializing an instance of Block.", () => {
    const bottomLeft = { x: BLOCK.position.x, y: BLOCK.position.y };
    const bottomRight = {
      x: BLOCK.position.x + BLOCK.sizes.width,
      y: BLOCK.position.y,
    };
    const topLeft = {
      x: BLOCK.position.x,
      y: BLOCK.position.y + BLOCK.sizes.height,
    };
    const topRight = {
      x: BLOCK.position.x + BLOCK.sizes.width,
      y: BLOCK.position.y + BLOCK.sizes.height,
    };

    expect(block.position.x).toBe(BLOCK.position.x);
    expect(block.position.y).toBe(BLOCK.position.y);
    expect(block.sizes.width).toBe(BLOCK.sizes.width);
    expect(block.sizes.height).toBe(BLOCK.sizes.height);
    expect(block.bottomLeft).toEqual(bottomLeft);
    expect(block.bottomRight).toEqual(bottomRight);
    expect(block.topLeft).toEqual(topLeft);
    expect(block.topRight).toEqual(topRight);
  });

  test("It must create the element that will be used to render the block.", () => {
    const blockElement = block.create();

    expect(blockElement instanceof HTMLDivElement).toBeTruthy();
    expect(blockElement.classList.contains("block")).toBeTruthy();
    expect(blockElement.style.left).toBe(`${block.bottomLeft.x}px`);
    expect(blockElement.style.bottom).toBe(`${block.bottomLeft.y}px`);
  });
});
