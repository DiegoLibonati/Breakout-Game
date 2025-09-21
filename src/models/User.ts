import { Coords, MoveKeys } from "@src/entities/vite-env";

export class User {
  constructor(public position: Coords) {}

  create(): HTMLDivElement {
    const user = document.createElement("div") as HTMLDivElement;

    user.classList.add("user");

    user.style.left = `${this.position.x}px`;
    user.style.bottom = `${this.position.y}px`;

    return user;
  }

  move(key: MoveKeys): void {
    const units = 10;

    if (key === "ArrowLeft") this.position.x -= units;
    else if (key === "ArrowRight") this.position.x += units;
  }
}
