import type { BallProps } from "@/types/props";
import type { BallComponent } from "@/types/components";

import "@/components/Ball/Ball.css";

export const Ball = ({ x, y }: BallProps): BallComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = "ball";

  divRoot.style.left = `${x}px`;
  divRoot.style.bottom = `${y}px`;

  return divRoot;
};
