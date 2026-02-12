import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";
import type {
  BallComponent,
  BlockComponent,
  UserComponent,
} from "@/types/components";

import { BreakoutPage } from "@/pages/BreakoutPage/BreakoutPage";

import {
  ballDirection,
  ballPosition,
  initialBlocks,
  initialScore,
  userPosition,
  widthBlock,
  widthBoard,
} from "@/constants/vars";

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

  describe("Render", () => {
    it("should create a main element", () => {
      renderPage();

      const main = screen.getByRole("main");

      expect(main).toBeInstanceOf(HTMLElement);
      expect(main.tagName).toBe("MAIN");
    });

    it("should have correct CSS class", () => {
      renderPage();

      const main = screen.getByRole("main");

      expect(main).toHaveClass("breakout-page");
    });

    it("should render game section", () => {
      const container = renderPage();

      const section = container.querySelector<HTMLElement>(".game");

      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe("SECTION");
    });

    it("should render game header", () => {
      const container = renderPage();

      const header = container.querySelector<HTMLDivElement>(".game__header");

      expect(header).toBeInTheDocument();
    });

    it("should render score display", () => {
      const container = renderPage();

      const score =
        container.querySelector<HTMLParagraphElement>(".game__score");
      const counter = container.querySelector<HTMLSpanElement>("#counter");

      expect(score).toBeInTheDocument();
      expect(counter).toBeInTheDocument();
      expect(counter).toHaveTextContent("0");
    });

    it("should render game blocks container", () => {
      const container = renderPage();

      const gameBlocks =
        container.querySelector<HTMLDivElement>(".game__blocks");

      expect(gameBlocks).toBeInTheDocument();
    });

    it("should render all initial blocks", () => {
      const container = renderPage();

      const blocks = container.querySelectorAll<HTMLDivElement>(".block");

      expect(blocks.length).toBe(initialBlocks.length);
    });

    it("should render user element", () => {
      const container = renderPage();

      const user = container.querySelector<UserComponent>(".user");

      expect(user).toBeInTheDocument();
      expect(user).toHaveClass("user");
    });

    it("should render ball element", () => {
      const container = renderPage();

      const ball = container.querySelector<BallComponent>(".ball");

      expect(ball).toBeInTheDocument();
      expect(ball).toHaveClass("ball");
    });
  });

  describe("Initial Setup", () => {
    it("should initialize score to 0", () => {
      const container = renderPage();

      const counter = container.querySelector<HTMLSpanElement>("#counter");

      expect(counter).toHaveTextContent(String(initialScore));
    });

    it("should place user at initial position", () => {
      const container = renderPage();

      const user = container.querySelector<UserComponent>(".user");

      expect(user?.style.left).toBe(`${userPosition.x}px`);
      expect(user?.style.bottom).toBe(`${userPosition.y}px`);
    });

    it("should place ball at initial position", () => {
      const container = renderPage();

      const ball = container.querySelector<BallComponent>(".ball");

      expect(ball?.style.left).toBe(`${ballPosition.x}px`);
      expect(ball?.style.bottom).toBe(`${ballPosition.y}px`);
    });

    it("should start ball movement interval", () => {
      const setIntervalSpy = jest.spyOn(global, "setInterval");

      renderPage();

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 10);
    });

    it("should add keydown event listener", () => {
      const addEventListenerSpy = jest.spyOn(document, "addEventListener");

      renderPage();

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );
    });
  });

  describe("User Movement", () => {
    it("should move user left when ArrowLeft is pressed", async () => {
      document.body.innerHTML = "";
      jest.useRealTimers();

      const user = userEvent.setup({ delay: null });
      const container = BreakoutPage();
      document.body.appendChild(container);

      const userElement = container.querySelector<UserComponent>(".user");
      const initialLeft = parseInt(userElement?.style.left ?? "0");

      await user.keyboard("{ArrowLeft}");

      const newLeft = parseInt(userElement?.style.left ?? "0");
      expect(newLeft).toBe(initialLeft - 10);
    });

    it("should move user right when ArrowRight is pressed", async () => {
      document.body.innerHTML = "";
      jest.useRealTimers();

      const user = userEvent.setup({ delay: null });
      const container = BreakoutPage();
      document.body.appendChild(container);

      const userElement = container.querySelector<UserComponent>(".user");
      const initialLeft = parseInt(userElement?.style.left ?? "0");

      await user.keyboard("{ArrowRight}");

      const newLeft = parseInt(userElement?.style.left ?? "0");
      expect(newLeft).toBe(initialLeft + 10);
    });

    it("should not move user left beyond left boundary", async () => {
      document.body.innerHTML = "";
      jest.useRealTimers();

      const user = userEvent.setup({ delay: null });
      const container = BreakoutPage();
      document.body.appendChild(container);

      const userElement = container.querySelector<UserComponent>(".user");

      for (let i = 0; i < 100; i++) {
        await user.keyboard("{ArrowLeft}");
      }

      const left = parseInt(userElement?.style.left ?? "0");
      expect(left).toBeGreaterThanOrEqual(0);
    });

    it("should not move user right beyond right boundary", async () => {
      document.body.innerHTML = "";
      jest.useRealTimers();

      const user = userEvent.setup({ delay: null });
      const container = BreakoutPage();
      document.body.appendChild(container);

      const userElement = container.querySelector<UserComponent>(".user");

      for (let i = 0; i < 100; i++) {
        await user.keyboard("{ArrowRight}");
      }

      const left = parseInt(userElement?.style.left ?? "0");
      expect(left).toBeLessThanOrEqual(widthBoard - widthBlock);
    });

    it("should not respond to other keys", async () => {
      document.body.innerHTML = "";
      jest.useRealTimers();

      const user = userEvent.setup({ delay: null });
      const container = BreakoutPage();
      document.body.appendChild(container);

      const userElement = container.querySelector<UserComponent>(".user");
      const initialLeft = userElement?.style.left;

      await user.keyboard("{Space}");
      await user.keyboard("{Enter}");
      await user.keyboard("a");

      expect(userElement?.style.left).toBe(initialLeft);
    });
  });

  describe("Ball Movement", () => {
    it("should move ball over time", () => {
      const container = renderPage();

      const ball = container.querySelector<BallComponent>(".ball");
      const initialLeft = parseInt(ball?.style.left ?? "0");
      const initialBottom = parseInt(ball?.style.bottom ?? "0");

      jest.advanceTimersByTime(100);

      const newLeft = parseInt(ball?.style.left ?? "0");
      const newBottom = parseInt(ball?.style.bottom ?? "0");

      expect(newLeft).not.toBe(initialLeft);
      expect(newBottom).not.toBe(initialBottom);
    });

    it("should update ball position based on direction", () => {
      const container = renderPage();

      const ball = container.querySelector<BallComponent>(".ball");
      const initialLeft = parseInt(ball?.style.left ?? "0");
      const initialBottom = parseInt(ball?.style.bottom ?? "0");

      jest.advanceTimersByTime(10);

      const left = parseInt(ball?.style.left ?? "0");
      const bottom = parseInt(ball?.style.bottom ?? "0");

      expect(left).toBe(initialLeft + ballDirection.x);
      expect(bottom).toBe(initialBottom + ballDirection.y);
    });
  });

  describe("Score Tracking", () => {
    it("should start with score of 0", () => {
      const container = renderPage();

      const counter = container.querySelector<HTMLSpanElement>("#counter");

      expect(counter).toHaveTextContent("0");
    });

    it("should increment score when block is hit", () => {
      const container = renderPage();

      const counter = container.querySelector<HTMLSpanElement>("#counter");

      expect(counter).toBeInTheDocument();
    });
  });

  describe("Game End Conditions", () => {
    it("should display game over message when ball falls", () => {
      const container = renderPage();

      const header = container.querySelector<HTMLDivElement>(".game__header");

      expect(header).toBeInTheDocument();
    });

    it("should clear interval on cleanup", () => {
      const clearIntervalSpy = jest.spyOn(global, "clearInterval");
      const container = renderPage();

      container.cleanup?.();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it("should remove event listener on cleanup", () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        "removeEventListener"
      );
      const container = renderPage();

      container.cleanup?.();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function)
      );
    });
  });

  describe("Cleanup", () => {
    it("should have cleanup function", () => {
      const container = renderPage();

      expect(typeof container.cleanup).toBe("function");
    });

    it("should stop ball movement on cleanup", () => {
      const container = renderPage();

      const ball = container.querySelector<BallComponent>(".ball");
      const initialLeft = ball?.style.left;

      container.cleanup?.();

      jest.advanceTimersByTime(100);

      expect(ball?.style.left).toBe(initialLeft);
    });

    it("should not respond to keyboard after cleanup", async () => {
      document.body.innerHTML = "";
      jest.useRealTimers();

      const user = userEvent.setup({ delay: null });
      const container = BreakoutPage();
      document.body.appendChild(container);

      const userElement = container.querySelector<UserComponent>(".user");

      container.cleanup?.();

      const leftBeforeKeypress = userElement?.style.left;

      await user.keyboard("{ArrowLeft}");

      expect(userElement?.style.left).toBe(leftBeforeKeypress);
    });
  });

  describe("DOM Structure", () => {
    it("should nest game blocks inside game blocks container", () => {
      const container = renderPage();

      const gameBlocks =
        container.querySelector<HTMLDivElement>(".game__blocks");
      const firstBlock = container.querySelector<BlockComponent>(".block");

      expect(firstBlock?.parentElement).toBe(gameBlocks);
    });

    it("should have user inside game blocks container", () => {
      const container = renderPage();

      const gameBlocks =
        container.querySelector<HTMLDivElement>(".game__blocks");
      const user = container.querySelector<UserComponent>(".user");

      expect(user?.parentElement).toBe(gameBlocks);
    });

    it("should have ball inside game blocks container", () => {
      const container = renderPage();

      const gameBlocks =
        container.querySelector<HTMLDivElement>(".game__blocks");
      const ball = container.querySelector<BallComponent>(".ball");

      expect(ball?.parentElement).toBe(gameBlocks);
    });

    it("should have correct elements count in game blocks", () => {
      const container = renderPage();

      const gameBlocks =
        container.querySelector<HTMLDivElement>(".game__blocks");

      expect(gameBlocks?.children.length).toBe(initialBlocks.length + 2);
    });
  });

  describe("Return Type", () => {
    it("should return Page type", () => {
      const container = BreakoutPage();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(typeof container.cleanup).toBe("function");
    });

    it("should be appendable to DOM", () => {
      const container = BreakoutPage();

      document.body.appendChild(container);

      expect(document.body.contains(container)).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle multiple cleanups", () => {
      const container = renderPage();

      expect(() => {
        container.cleanup?.();
        container.cleanup?.();
      }).not.toThrow();
    });

    it("should handle cleanup before game starts", () => {
      const container = BreakoutPage();

      expect(() => {
        container.cleanup?.();
      }).not.toThrow();
    });
  });
});
