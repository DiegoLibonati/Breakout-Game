import { BreakoutPage } from "@src/pages/BreakoutPage/BreakoutPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const breakoutPage = BreakoutPage();
  app.appendChild(breakoutPage);
};

document.addEventListener("DOMContentLoaded", onInit);
