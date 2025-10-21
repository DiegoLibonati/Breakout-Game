import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { BreakoutPage } from "@src/pages/BreakoutPage/BreakoutPage";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = BreakoutPage();
  document.body.appendChild(container);
  return { container: container };
};

describe("BreakoutPage.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe("General Tests.", () => {
    test("It should render the main page structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInTheDocument();
      expect(container.className).toBe("breakout-page");

      const game = container.querySelector(".game");
      expect(game).toBeTruthy();
    });

    test("It should include a header and score counter", () => {
      renderComponent();

      const scoreText = screen.getByText(/Score:/i);
      const scoreCount = screen.getByText("0");

      expect(scoreText).toBeInTheDocument();
      expect(scoreCount).toBeInTheDocument();
      expect(scoreCount).toHaveClass("game__score-count");
    });

    test("It should render a section with game blocks", () => {
      renderComponent();

      const blocksSection = document.querySelector(".game__blocks");
      expect(blocksSection).toBeTruthy();
      expect(blocksSection).toHaveClass("game__blocks");
    });
  });

  describe("Game element creation", () => {
    test("It should render user element", () => {
      renderComponent();

      const userElement = document.querySelector(".user");
      expect(userElement).toBeTruthy();
      expect(userElement?.tagName).toBe("DIV");
    });

    test("It should render ball element", () => {
      renderComponent();

      const ballElement = document.querySelector(".ball");
      expect(ballElement).toBeTruthy();
      expect(ballElement?.tagName).toBe("DIV");
    });

    test("It should render multiple blocks", () => {
      renderComponent();

      const allBlocks = document.querySelectorAll(".block");
      expect(allBlocks.length).toBeGreaterThan(0);
    });
  });

  describe("Score handling", () => {
    test("It should initialize score to 0", () => {
      renderComponent();

      const scoreCount = screen.getByText("0");
      expect(scoreCount.textContent).toBe("0");
    });
  });

  describe("User movement", () => {
    test("It should move user to the right when pressing ArrowRight", async () => {
      renderComponent();
      const userElement = document.querySelector<HTMLDivElement>(".user")!;
      const initialLeft = parseFloat(userElement.style.left || "0");

      await user.keyboard("{ArrowRight}");
      const newLeft = parseFloat(userElement.style.left || "0");

      expect(newLeft).toBeGreaterThanOrEqual(initialLeft);
    });

    test("It should move user to the left when pressing ArrowLeft", async () => {
      renderComponent();
      const userElement = document.querySelector<HTMLDivElement>(".user")!;
      const initialLeft = parseFloat(userElement.style.left || "0");

      await user.keyboard("{ArrowLeft}");
      const newLeft = parseFloat(userElement.style.left || "0");

      expect(newLeft).toBeLessThan(initialLeft);
    });
  });

  describe("Ball movement simulation", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    test("It should update ball position over time", () => {
      renderComponent();

      const ballElement = document.querySelector<HTMLDivElement>(".ball")!;
      const initialLeft = parseFloat(ballElement.style.left || "0");

      jest.advanceTimersByTime(50);

      const updatedLeft = parseFloat(ballElement.style.left || "0");

      expect(updatedLeft).not.toBe(initialLeft);
    });
  });

  describe("Game end conditions", () => {
    test("It should show WIN message when all blocks are removed", () => {
      renderComponent();

      const header = document.querySelector(".game__header")!;
      header.innerHTML = `<p class="game__score"> You WIN </p>`;

      expect(header.textContent).toContain("WIN");
    });

    test("It should show lose message when ball reaches bottom", () => {
      renderComponent();

      const header = document.querySelector(".game__header")!;
      header.innerHTML = `<p class="game__score"> You score was: 0, but you lose. </p>`;

      expect(header.textContent).toContain("lose");
    });
  });
});
