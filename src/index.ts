import "@/index.css";
import { BreakoutPage } from "@/pages/BreakoutPage/BreakoutPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const breakoutPage = BreakoutPage();
  app.appendChild(breakoutPage);
};

document.addEventListener("DOMContentLoaded", onInit);
