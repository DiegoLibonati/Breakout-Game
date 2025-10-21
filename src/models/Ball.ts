import { Coords } from "@src/entities/app";

import { Ball as BallComponent } from "@src/components/Ball/Ball";

export class Ball {
  constructor(
    public diameter: number,
    public position: Coords,
    public direction: Coords
  ) {}

  create(): HTMLDivElement {
    return BallComponent({ x: this.position.x, y: this.position.y });
  }

  move(): void {
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

  changeDirection(): void {
    if (this.direction.x === 2 && this.direction.y === 1) {
      this.direction.y = -1;
    } else if (this.direction.x === 2 && this.direction.y === -1) {
      this.direction.x = -2;
    } else if (this.direction.x === -2 && this.direction.y === -1) {
      this.direction.y = 1;
    } else if (this.direction.x === -2 && this.direction.y === 1) {
      this.direction.x = 2;
    }
  }
}
