import type { UserProps } from "@/types/props";
import type { UserComponent } from "@/types/components";

import "@/components/User/User.css";

export const User = ({ x, y }: UserProps): UserComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = "user";

  divRoot.style.left = `${x}px`;
  divRoot.style.bottom = `${y}px`;

  return divRoot;
};
