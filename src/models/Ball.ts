import { Coords } from "../entities/vite-env";

export class Ball {
  constructor(
    public diameter: number,
    public position: Coords,
    public direction: Coords
  ) {}

  create(): HTMLDivElement {
    const ball = document.createElement("div") as HTMLDivElement;

    ball.classList.add("ball");

    ball.style.left = `${this.position.x}px`;
    ball.style.bottom = `${this.position.y}px`;

    return ball;
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
