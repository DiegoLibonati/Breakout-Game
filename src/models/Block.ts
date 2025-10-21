import { Coords, Sizes } from "@src/entities/app";

import { Block as BlockComponent } from "@src/components/Block/Block";

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
    return BlockComponent({ x: this.bottomLeft.x, y: this.bottomLeft.y });
  }
}
