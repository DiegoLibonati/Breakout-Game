export const getElements = () => ({
  blocksDisplay: document.querySelector(".blocks") as HTMLElement,
  countElement: document.getElementById("counter") as HTMLSpanElement,
  scoreElement: document.querySelector(".score") as HTMLDivElement,
  user: document.querySelector(".user") as HTMLDivElement,
  ball: document.querySelector(".ball") as HTMLDivElement,
});
