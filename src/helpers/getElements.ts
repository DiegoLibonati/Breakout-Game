export const getElements = () => ({
  blocksDisplay: document.querySelector(".blocks_container") as HTMLElement,
  countElement: document.getElementById("contador") as HTMLSpanElement,
  scoreElement: document.querySelector(".score") as HTMLDivElement,
  user: document.querySelector(".user") as HTMLDivElement,
  ball: document.querySelector(".ball") as HTMLDivElement,
});
