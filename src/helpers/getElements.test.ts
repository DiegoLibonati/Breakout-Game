import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../../tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the elements of the document that the 'getElements' function exports.", () => {
      const { blocksDisplay, countElement, scoreElement, ball, user } =
        getElements();

      expect(blocksDisplay).toBeInTheDocument();
      expect(countElement).toBeInTheDocument();
      expect(scoreElement).toBeInTheDocument();

      expect(user).not.toBeInTheDocument();
      expect(ball).not.toBeInTheDocument();
    });
  });
});
