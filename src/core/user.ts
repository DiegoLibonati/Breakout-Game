import type { Coords, MoveKeys } from "@/types/app";
import type { UserComponent as UserComponentT } from "@/types/components";

import { User as UserComponent } from "@/components/User/User";

export class User {
  constructor(public position: Coords) {}

  create(): UserComponentT {
    return UserComponent({ x: this.position.x, y: this.position.y });
  }

  move(key: MoveKeys): void {
    const units = 10;

    if (key === "ArrowLeft") {
      this.position.x -= units;
      return;
    }

    this.position.x += units;
  }
}
