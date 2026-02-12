import type { BlockProps } from "@/types/props";
import type { BlockComponent } from "@/types/components";

import "@/components/Block/Block.css";

export const Block = ({ x, y }: BlockProps): BlockComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = "block";

  divRoot.style.left = `${x}px`;
  divRoot.style.bottom = `${y}px`;

  return divRoot;
};
