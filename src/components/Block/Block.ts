import { BlockProps } from "@src/entities/props";

import "@src/components/Block/Block.css";

export const Block = ({ x, y }: BlockProps): HTMLDivElement => {
  const divRoot = document.createElement("div") as HTMLDivElement;
  divRoot.className = "block";

  divRoot.style.left = `${x}px`;
  divRoot.style.bottom = `${y}px`;

  return divRoot;
};
