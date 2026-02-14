import type { BallProps } from "@/types/props";
import type { BallComponent } from "@/types/components";

import { Ball } from "@/components/Ball/Ball";

const renderComponent = (props: BallProps): BallComponent => {
  const container = Ball(props);
  document.body.appendChild(container);
  return container;
};

describe("Ball Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: BallProps = {
    x: 100,
    y: 50,
  };

  it("should render ball with correct class", () => {
    renderComponent(defaultProps);

    const ball = document.querySelector<HTMLDivElement>(".ball");
    expect(ball).toBeInTheDocument();
    expect(ball?.tagName).toBe("DIV");
  });

  it("should position ball with correct coordinates", () => {
    renderComponent(defaultProps);

    const ball = document.querySelector<HTMLDivElement>(".ball");
    expect(ball?.style.left).toBe("100px");
    expect(ball?.style.bottom).toBe("50px");
  });

  it("should render at different positions", () => {
    renderComponent({ x: 200, y: 150 });

    const ball = document.querySelector<HTMLDivElement>(".ball");
    expect(ball?.style.left).toBe("200px");
    expect(ball?.style.bottom).toBe("150px");
  });
});
