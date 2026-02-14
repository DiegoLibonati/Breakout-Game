import { Block } from "@/core/block";

describe("Block Class", () => {
  it("should initialize with correct properties", () => {
    const block = new Block({ x: 50, y: 300 }, { width: 100, height: 20 });

    expect(block.position).toEqual({ x: 50, y: 300 });
    expect(block.sizes).toEqual({ width: 100, height: 20 });
  });

  it("should calculate correct corner positions", () => {
    const block = new Block({ x: 50, y: 300 }, { width: 100, height: 20 });

    expect(block.bottomLeft).toEqual({ x: 50, y: 300 });
    expect(block.bottomRight).toEqual({ x: 150, y: 300 });
    expect(block.topLeft).toEqual({ x: 50, y: 320 });
    expect(block.topRight).toEqual({ x: 150, y: 320 });
  });

  it("should create block component", () => {
    const block = new Block({ x: 50, y: 300 }, { width: 100, height: 20 });

    const component = block.create();
    document.body.appendChild(component);

    expect(component).toHaveClass("block");
    expect(component.style.left).toBe("50px");
    expect(component.style.bottom).toBe("300px");

    document.body.innerHTML = "";
  });
});
