import { BlockProps } from "@src/entities/props";

import { Block } from "@src/components/Block/Block";

type RenderComponent = {
  container: HTMLDivElement;
  props: BlockProps;
};

const renderComponent = (props: BlockProps): RenderComponent => {
  const container = Block(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("Block.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: BlockProps = { x: 100, y: 50 };
      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toBe("block");
    });

    test("It should return an HTMLDivElement", () => {
      const props: BlockProps = { x: 0, y: 0 };
      const { container } = renderComponent(props);

      expect(container.tagName).toBe("DIV");
    });

    test("It should have correct CSS class", () => {
      const props: BlockProps = { x: 10, y: 20 };
      const { container } = renderComponent(props);

      expect(container).toHaveClass("block");
    });
  });

  describe("Position Tests.", () => {
    test("It should set left position from x prop", () => {
      const props: BlockProps = { x: 150, y: 100 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBe("150px");
    });

    test("It should set bottom position from y prop", () => {
      const props: BlockProps = { x: 100, y: 200 };
      const { container } = renderComponent(props);

      expect(container.style.bottom).toBe("200px");
    });

    test("It should set both left and bottom positions", () => {
      const props: BlockProps = { x: 75, y: 125 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBe("75px");
      expect(container.style.bottom).toBe("125px");
    });
  });

  describe("Different Position Values Tests.", () => {
    test("It should handle zero positions", () => {
      const props: BlockProps = { x: 0, y: 0 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBe("0px");
      expect(container.style.bottom).toBe("0px");
    });

    test("It should handle large position values", () => {
      const props: BlockProps = { x: 1000, y: 800 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBe("1000px");
      expect(container.style.bottom).toBe("800px");
    });

    test("It should handle negative positions", () => {
      const props: BlockProps = { x: -50, y: -100 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBe("-50px");
      expect(container.style.bottom).toBe("-100px");
    });

    test("It should handle decimal positions", () => {
      const props: BlockProps = { x: 50.5, y: 75.75 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBe("50.5px");
      expect(container.style.bottom).toBe("75.75px");
    });
  });

  describe("Props Integration Tests.", () => {
    test("It should use x prop for left style", () => {
      const props: BlockProps = { x: 250, y: 100 };
      const { container, props: componentProps } = renderComponent(props);

      expect(container.style.left).toBe(`${componentProps.x}px`);
    });

    test("It should use y prop for bottom style", () => {
      const props: BlockProps = { x: 100, y: 300 };
      const { container, props: componentProps } = renderComponent(props);

      expect(container.style.bottom).toBe(`${componentProps.y}px`);
    });

    test("It should maintain prop values after rendering", () => {
      const props: BlockProps = { x: 150, y: 250 };
      const { props: componentProps } = renderComponent(props);

      expect(componentProps.x).toBe(150);
      expect(componentProps.y).toBe(250);
    });
  });

  describe("Style Attribute Tests.", () => {
    test("It should format position values with px unit", () => {
      const props: BlockProps = { x: 100, y: 200 };
      const { container } = renderComponent(props);

      expect(container.style.left).toContain("px");
      expect(container.style.bottom).toContain("px");
    });

    test("It should have both style properties set", () => {
      const props: BlockProps = { x: 80, y: 60 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBeTruthy();
      expect(container.style.bottom).toBeTruthy();
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle very large numbers", () => {
      const props: BlockProps = { x: 9999, y: 9999 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBe("9999px");
      expect(container.style.bottom).toBe("9999px");
    });

    test("It should handle fractional pixel values", () => {
      const props: BlockProps = { x: 123.456, y: 789.012 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBe("123.456px");
      expect(container.style.bottom).toBe("789.012px");
    });
  });

  describe("Positioning System Tests.", () => {
    test("It should use left for horizontal positioning", () => {
      const props: BlockProps = { x: 100, y: 50 };
      const { container } = renderComponent(props);

      expect(container.style.left).toBeDefined();
      expect(container.style.right).toBeFalsy();
    });

    test("It should use bottom for vertical positioning", () => {
      const props: BlockProps = { x: 100, y: 50 };
      const { container } = renderComponent(props);

      expect(container.style.bottom).toBeDefined();
      expect(container.style.top).toBeFalsy();
    });

    test("It should not set other position properties", () => {
      const props: BlockProps = { x: 100, y: 50 };
      const { container } = renderComponent(props);

      expect(container.style.right).toBe("");
      expect(container.style.top).toBe("");
    });
  });
});
