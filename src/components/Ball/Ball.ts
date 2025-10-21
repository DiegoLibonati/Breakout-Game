import { BallProps } from "@src/entities/props";

import "@src/components/Ball/Ball.css";

export const Ball = ({ x, y }: BallProps): HTMLDivElement => {
  const divRoot = document.createElement("div") as HTMLDivElement;
  divRoot.className = "ball";

  divRoot.style.left = `${x}px`;
  divRoot.style.bottom = `${y}px`;

  return divRoot;
};
