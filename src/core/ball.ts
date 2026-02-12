import type { Coords } from "@/types/app";
import type { BallComponent as BallComponentT } from "@/types/components";

import { Ball as BallComponent } from "@/components/Ball/Ball";

export class Ball {
  constructor(
    public diameter: number,
    public position: Coords,
    public direction: Coords
  ) {}

  create(): BallComponentT {
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
