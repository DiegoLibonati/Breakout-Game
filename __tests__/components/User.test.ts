import type { UserProps } from "@/types/props";
import type { UserComponent } from "@/types/components";

import { User } from "@/components/User/User";

const renderComponent = (props: UserProps): UserComponent => {
  const container = User(props);
  document.body.appendChild(container);
  return container;
};

describe("User Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: UserProps = {
    x: 230,
    y: 10,
  };

  it("should render user with correct class", () => {
    renderComponent(defaultProps);

    const user = document.querySelector<HTMLDivElement>(".user");
    expect(user).toBeInTheDocument();
    expect(user?.tagName).toBe("DIV");
  });

  it("should position user with correct coordinates", () => {
    renderComponent(defaultProps);

    const user = document.querySelector<HTMLDivElement>(".user");
    expect(user?.style.left).toBe("230px");
    expect(user?.style.bottom).toBe("10px");
  });

  it("should render at different positions", () => {
    renderComponent({ x: 300, y: 20 });

    const user = document.querySelector<HTMLDivElement>(".user");
    expect(user?.style.left).toBe("300px");
    expect(user?.style.bottom).toBe("20px");
  });
});
