import { Coords, MoveKeys } from "@src/entities/app";

import { User as UserComponent } from "@src/components/User/User";

export class User {
  constructor(public position: Coords) {}

  create(): HTMLDivElement {
    return UserComponent({ x: this.position.x, y: this.position.y });
  }

  move(key: MoveKeys): void {
    const units = 10;

    if (key === "ArrowLeft") this.position.x -= units;
    else if (key === "ArrowRight") this.position.x += units;
  }
}
