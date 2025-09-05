import { screen } from "@testing-library/dom";

import { OFFICIAL_BODY } from "../tests/jest.constants";

describe("index.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It should render the page title.", () => {
      const headerPage = screen.getByRole("heading", { name: /breakout/i });
      expect(headerPage).toBeInTheDocument();
    });

    test("It must render the game board and score.", () => {
      const boardPlay = document.querySelector(".game__blocks") as HTMLElement;
      const score = screen.getByText(`Score:`);

      expect(score).toBeInTheDocument();
      expect(boardPlay).toBeInTheDocument();
      expect(boardPlay.children).toBeTruthy();
    });

    test("User must render.", () => {
      const user = document.querySelector(".user") as HTMLDivElement;

      expect(user).toBeInTheDocument();
    });

    test("It must render the ball.", () => {
      const ball = document.querySelector(".ball") as HTMLDivElement;

      expect(ball).toBeInTheDocument();
    });

    test("It must render the blocks to break.", () => {
      const blocks = document.querySelectorAll(".block") as NodeList;

      expect(blocks).toBeTruthy();

      for (let block of blocks) {
        expect(block).toBeInTheDocument();
      }
    });
  });
});
