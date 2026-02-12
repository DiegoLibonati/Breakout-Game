import type { BlockComponent } from "@/types/components";
import type { BlockProps } from "@/types/props";

import { Block } from "@/components/Block/Block";

const renderComponent = (props: BlockProps): BlockComponent => {
  const container = Block(props);
  document.body.appendChild(container);
  return container;
};

describe("Block", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Render", () => {
    it("should create a div element", () => {
      const container = renderComponent({ x: 0, y: 0 });

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.tagName).toBe("DIV");
    });

    it("should have correct CSS class", () => {
      const container = renderComponent({ x: 0, y: 0 });

      expect(container).toHaveClass("block");
    });

    it("should set left position from x prop", () => {
      const container = renderComponent({ x: 100, y: 0 });

      expect(container.style.left).toBe("100px");
    });

    it("should set bottom position from y prop", () => {
      const container = renderComponent({ x: 0, y: 50 });

      expect(container.style.bottom).toBe("50px");
    });

    it("should set both positions correctly", () => {
      const container = renderComponent({ x: 150, y: 200 });

      expect(container.style.left).toBe("150px");
      expect(container.style.bottom).toBe("200px");
    });
  });

  describe("Props", () => {
    it("should handle zero values", () => {
      const container = renderComponent({ x: 0, y: 0 });

      expect(container.style.left).toBe("0px");
      expect(container.style.bottom).toBe("0px");
    });

    it("should handle positive values", () => {
      const container = renderComponent({ x: 300, y: 400 });

      expect(container.style.left).toBe("300px");
      expect(container.style.bottom).toBe("400px");
    });

    it("should handle negative values", () => {
      const container = renderComponent({ x: -50, y: -100 });

      expect(container.style.left).toBe("-50px");
      expect(container.style.bottom).toBe("-100px");
    });

    it("should handle decimal values", () => {
      const container = renderComponent({ x: 10.5, y: 20.75 });

      expect(container.style.left).toBe("10.5px");
      expect(container.style.bottom).toBe("20.75px");
    });

    it("should handle large values", () => {
      const container = renderComponent({ x: 9999, y: 8888 });

      expect(container.style.left).toBe("9999px");
      expect(container.style.bottom).toBe("8888px");
    });

    it("should handle different x and y combinations", () => {
      const combinations = [
        { x: 0, y: 100 },
        { x: 100, y: 0 },
        { x: 50, y: 50 },
        { x: 200, y: 300 },
      ];

      combinations.forEach(({ x, y }) => {
        document.body.innerHTML = "";
        const container = renderComponent({ x, y });

        expect(container.style.left).toBe(`${x}px`);
        expect(container.style.bottom).toBe(`${y}px`);
      });
    });
  });

  describe("DOM Structure", () => {
    it("should be a standalone element", () => {
      const container = renderComponent({ x: 0, y: 0 });

      expect(container.children.length).toBe(0);
    });

    it("should have no text content", () => {
      const container = renderComponent({ x: 0, y: 0 });

      expect(container.textContent).toBe("");
    });

    it("should have no inner HTML", () => {
      const container = renderComponent({ x: 0, y: 0 });

      expect(container.innerHTML).toBe("");
    });
  });

  describe("Styling", () => {
    it("should only have block class", () => {
      const container = renderComponent({ x: 0, y: 0 });

      expect(container.className).toBe("block");
    });

    it("should not have additional classes", () => {
      const container = renderComponent({ x: 0, y: 0 });

      expect(container.classList.length).toBe(1);
    });

    it("should have inline styles for positioning", () => {
      const container = renderComponent({ x: 100, y: 200 });

      expect(container.style.left).toBeDefined();
      expect(container.style.bottom).toBeDefined();
    });
  });

  describe("Return Type", () => {
    it("should return BlockComponent type", () => {
      const container = Block({ x: 0, y: 0 });

      expect(container).toBeInstanceOf(HTMLDivElement);
    });

    it("should be appendable to DOM", () => {
      const container = Block({ x: 0, y: 0 });

      document.body.appendChild(container);

      expect(document.body.contains(container)).toBe(true);
    });
  });

  describe("Multiple Blocks", () => {
    it("should render multiple blocks independently", () => {
      const block1 = renderComponent({ x: 10, y: 20 });
      const block2 = renderComponent({ x: 30, y: 40 });

      expect(block1.style.left).toBe("10px");
      expect(block1.style.bottom).toBe("20px");
      expect(block2.style.left).toBe("30px");
      expect(block2.style.bottom).toBe("40px");
    });

    it("should have unique positions", () => {
      const block1 = renderComponent({ x: 100, y: 100 });
      const block2 = renderComponent({ x: 200, y: 200 });

      expect(block1.style.left).not.toBe(block2.style.left);
      expect(block1.style.bottom).not.toBe(block2.style.bottom);
    });

    it("should all have the same CSS class", () => {
      const block1 = renderComponent({ x: 0, y: 0 });
      const block2 = renderComponent({ x: 50, y: 50 });
      const block3 = renderComponent({ x: 100, y: 100 });

      expect(block1).toHaveClass("block");
      expect(block2).toHaveClass("block");
      expect(block3).toHaveClass("block");
    });
  });

  describe("Edge Cases", () => {
    it("should handle very large numbers", () => {
      const container = renderComponent({ x: 999999, y: 888888 });

      expect(container.style.left).toBe("999999px");
      expect(container.style.bottom).toBe("888888px");
    });

    it("should handle very small decimal values", () => {
      const container = renderComponent({ x: 0.001, y: 0.002 });

      expect(container.style.left).toBe("0.001px");
      expect(container.style.bottom).toBe("0.002px");
    });

    it("should handle same x and y values", () => {
      const container = renderComponent({ x: 150, y: 150 });

      expect(container.style.left).toBe("150px");
      expect(container.style.bottom).toBe("150px");
    });
  });
});
