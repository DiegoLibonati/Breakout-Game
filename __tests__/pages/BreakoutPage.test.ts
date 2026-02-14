import type { Page } from "@/types/pages";

import { BreakoutPage } from "@/pages/BreakoutPage/BreakoutPage";

const renderPage = (): Page => {
  const container = BreakoutPage();
  document.body.appendChild(container);
  return container;
};

describe("BreakoutPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".breakout-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render game header with score", () => {
    renderPage();

    const scoreElement = document.querySelector<HTMLSpanElement>("#counter");
    expect(scoreElement).toBeInTheDocument();
    expect(scoreElement?.textContent).toBe("0");
  });

  it("should render game blocks container", () => {
    renderPage();

    const gameBlocks = document.querySelector<HTMLDivElement>(".game__blocks");
    expect(gameBlocks).toBeInTheDocument();
  });

  it("should render initial blocks", () => {
    renderPage();

    const blocks = document.querySelectorAll<HTMLDivElement>(".block");
    expect(blocks.length).toBeGreaterThan(0);
  });

  it("should render user paddle", () => {
    renderPage();

    const user = document.querySelector<HTMLDivElement>(".user");
    expect(user).toBeInTheDocument();
  });

  it("should render ball", () => {
    renderPage();

    const ball = document.querySelector<HTMLDivElement>(".ball");
    expect(ball).toBeInTheDocument();
  });

  it("should start ball movement interval", () => {
    const setIntervalSpy = jest.spyOn(global, "setInterval");

    renderPage();

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 10);

    setIntervalSpy.mockRestore();
  });

  it("should move user left on ArrowLeft key press", () => {
    renderPage();

    const user = document.querySelector<HTMLDivElement>(".user");
    const initialLeft = user?.style.left;

    const keyEvent = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    document.dispatchEvent(keyEvent);

    expect(user?.style.left).not.toBe(initialLeft);
  });

  it("should move user right on ArrowRight key press", () => {
    renderPage();

    const user = document.querySelector<HTMLDivElement>(".user");
    const initialLeft = user?.style.left;

    const keyEvent = new KeyboardEvent("keydown", { key: "ArrowRight" });
    document.dispatchEvent(keyEvent);

    expect(user?.style.left).not.toBe(initialLeft);
  });

  it("should not move user on invalid key press", () => {
    renderPage();

    const user = document.querySelector<HTMLDivElement>(".user");
    const initialLeft = user?.style.left;

    const keyEvent = new KeyboardEvent("keydown", { key: "Enter" });
    document.dispatchEvent(keyEvent);

    expect(user?.style.left).toBe(initialLeft);
  });

  it("should cleanup intervals and event listeners on page cleanup", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const page = renderPage();

    page.cleanup?.();

    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );

    clearIntervalSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
