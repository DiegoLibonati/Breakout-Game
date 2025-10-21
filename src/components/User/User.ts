import { UserProps } from "@src/entities/props";

import "@src/components/User/User.css";

export const User = ({ x, y }: UserProps): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className = "user";

  divRoot.style.left = `${x}px`;
  divRoot.style.bottom = `${y}px`;

  return divRoot;
};
