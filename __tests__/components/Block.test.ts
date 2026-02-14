import type { BlockProps } from "@/types/props";
import type { BlockComponent } from "@/types/components";

import { Block } from "@/components/Block/Block";

const renderComponent = (props: BlockProps): BlockComponent => {
  const container = Block(props);
  document.body.appendChild(container);
  return container;
};

describe("Block Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: BlockProps = {
    x: 50,
    y: 300,
  };

  it("should render block with correct class", () => {
    renderComponent(defaultProps);

    const block = document.querySelector<HTMLDivElement>(".block");
    expect(block).toBeInTheDocument();
    expect(block?.tagName).toBe("DIV");
  });

  it("should position block with correct coordinates", () => {
    renderComponent(defaultProps);

    const block = document.querySelector<HTMLDivElement>(".block");
    expect(block?.style.left).toBe("50px");
    expect(block?.style.bottom).toBe("300px");
  });

  it("should render at different positions", () => {
    renderComponent({ x: 100, y: 400 });

    const block = document.querySelector<HTMLDivElement>(".block");
    expect(block?.style.left).toBe("100px");
    expect(block?.style.bottom).toBe("400px");
  });
});
