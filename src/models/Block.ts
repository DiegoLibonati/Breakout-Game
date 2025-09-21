import { Coords, Sizes } from "@src/entities/vite-env";

export class Block {
  public bottomLeft: Coords;
  public bottomRight: Coords;
  public topLeft: Coords;
  public topRight: Coords;

  constructor(public position: Coords, public sizes: Sizes) {
    this.bottomLeft = { x: position.x, y: position.y };
    this.bottomRight = { x: position.x + sizes.width, y: position.y };
    this.topLeft = { x: position.x, y: position.y + sizes.height };
    this.topRight = {
      x: position.x + sizes.width,
      y: position.y + sizes.height,
    };
  }

  create(): HTMLDivElement {
    const block = document.createElement("div") as HTMLDivElement;

    block.classList.add("block");

    block.style.left = `${this.bottomLeft.x}px`;
    block.style.bottom = `${this.bottomLeft.y}px`;

    return block;
  }
}
