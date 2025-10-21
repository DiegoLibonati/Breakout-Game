import { UserProps } from "@src/entities/props";

import { User } from "@src/components/User/User";

type RenderComponent = {
  container: HTMLDivElement;
  props: UserProps;
};

const renderComponent = (props: UserProps): RenderComponent => {
  const container = User(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("User.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: UserProps = {
        x: 100,
        y: 50,
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toBe("user");
    });

    test("It should return HTMLDivElement", () => {
      const props: UserProps = {
        x: 0,
        y: 0,
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("DIV");
    });

    test("It should have correct CSS class", () => {
      const props: UserProps = {
        x: 10,
        y: 20,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("user");
    });
  });

  describe("Position Tests.", () => {
    test("It should set left position from x prop", () => {
      const props: UserProps = {
        x: 150,
        y: 100,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("150px");
    });

    test("It should set bottom position from y prop", () => {
      const props: UserProps = {
        x: 100,
        y: 200,
      };

      const { container } = renderComponent(props);

      expect(container.style.bottom).toBe("200px");
    });

    test("It should set both left and bottom positions", () => {
      const props: UserProps = {
        x: 75,
        y: 125,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("75px");
      expect(container.style.bottom).toBe("125px");
    });
  });

  describe("Different Position Values Tests.", () => {
    test("It should handle zero positions", () => {
      const props: UserProps = {
        x: 0,
        y: 0,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("0px");
      expect(container.style.bottom).toBe("0px");
    });

    test("It should handle large position values", () => {
      const props: UserProps = {
        x: 1000,
        y: 800,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("1000px");
      expect(container.style.bottom).toBe("800px");
    });

    test("It should handle negative x position", () => {
      const props: UserProps = {
        x: -50,
        y: 100,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("-50px");
    });

    test("It should handle negative y position", () => {
      const props: UserProps = {
        x: 100,
        y: -50,
      };

      const { container } = renderComponent(props);

      expect(container.style.bottom).toBe("-50px");
    });

    test("It should handle both negative positions", () => {
      const props: UserProps = {
        x: -25,
        y: -75,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("-25px");
      expect(container.style.bottom).toBe("-75px");
    });

    test("It should handle decimal position values", () => {
      const props: UserProps = {
        x: 50.5,
        y: 75.75,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("50.5px");
      expect(container.style.bottom).toBe("75.75px");
    });
  });

  describe("Multiple Users Tests.", () => {
    test("It should render multiple users with different positions", () => {
      const props1: UserProps = {
        x: 100,
        y: 50,
      };

      const props2: UserProps = {
        x: 200,
        y: 150,
      };

      const { container: user1 } = renderComponent(props1);
      const { container: user2 } = renderComponent(props2);

      expect(user1.style.left).toBe("100px");
      expect(user1.style.bottom).toBe("50px");
      expect(user2.style.left).toBe("200px");
      expect(user2.style.bottom).toBe("150px");
    });

    test("It should render multiple users independently", () => {
      const props1: UserProps = {
        x: 50,
        y: 50,
      };

      const props2: UserProps = {
        x: 100,
        y: 100,
      };

      renderComponent(props1);
      renderComponent(props2);

      const allUsers = document.querySelectorAll(".user");

      expect(allUsers.length).toBe(2);
    });

    test("It should maintain separate positions for each user", () => {
      const props1: UserProps = {
        x: 10,
        y: 20,
      };

      const props2: UserProps = {
        x: 30,
        y: 40,
      };

      const props3: UserProps = {
        x: 50,
        y: 60,
      };

      const { container: user1 } = renderComponent(props1);
      const { container: user2 } = renderComponent(props2);
      const { container: user3 } = renderComponent(props3);

      expect(user1.style.left).not.toBe(user2.style.left);
      expect(user2.style.bottom).not.toBe(user3.style.bottom);
    });
  });

  describe("Props Integration Tests.", () => {
    test("It should use x prop for left style", () => {
      const props: UserProps = {
        x: 250,
        y: 100,
      };

      const { container, props: componentProps } = renderComponent(props);

      expect(container.style.left).toBe(`${componentProps.x}px`);
    });

    test("It should use y prop for bottom style", () => {
      const props: UserProps = {
        x: 100,
        y: 300,
      };

      const { container, props: componentProps } = renderComponent(props);

      expect(container.style.bottom).toBe(`${componentProps.y}px`);
    });

    test("It should maintain prop values after rendering", () => {
      const props: UserProps = {
        x: 150,
        y: 250,
      };

      const { props: componentProps } = renderComponent(props);

      expect(componentProps.x).toBe(150);
      expect(componentProps.y).toBe(250);
    });
  });

  describe("Style Attribute Tests.", () => {
    test("It should have left style property set", () => {
      const props: UserProps = {
        x: 80,
        y: 60,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBeTruthy();
    });

    test("It should have bottom style property set", () => {
      const props: UserProps = {
        x: 80,
        y: 60,
      };

      const { container } = renderComponent(props);

      expect(container.style.bottom).toBeTruthy();
    });

    test("It should format position values with px unit", () => {
      const props: UserProps = {
        x: 100,
        y: 200,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toContain("px");
      expect(container.style.bottom).toContain("px");
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle x as 0", () => {
      const props: UserProps = {
        x: 0,
        y: 100,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("0px");
    });

    test("It should handle y as 0", () => {
      const props: UserProps = {
        x: 100,
        y: 0,
      };

      const { container } = renderComponent(props);

      expect(container.style.bottom).toBe("0px");
    });

    test("It should handle very large numbers", () => {
      const props: UserProps = {
        x: 9999,
        y: 9999,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("9999px");
      expect(container.style.bottom).toBe("9999px");
    });

    test("It should handle fractional pixel values", () => {
      const props: UserProps = {
        x: 123.456,
        y: 789.012,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBe("123.456px");
      expect(container.style.bottom).toBe("789.012px");
    });
  });

  describe("Position Update Tests.", () => {
    test("It should create new user with updated position", () => {
      const props1: UserProps = {
        x: 50,
        y: 50,
      };

      const { container: user1 } = renderComponent(props1);
      expect(user1.style.left).toBe("50px");
      expect(user1.style.bottom).toBe("50px");

      document.body.innerHTML = "";

      const props2: UserProps = {
        x: 150,
        y: 150,
      };

      const { container: user2 } = renderComponent(props2);
      expect(user2.style.left).toBe("150px");
      expect(user2.style.bottom).toBe("150px");
    });

    test("It should handle position changes between renders", () => {
      const positions = [
        { x: 10, y: 20 },
        { x: 30, y: 40 },
        { x: 50, y: 60 },
      ];

      positions.forEach((pos) => {
        document.body.innerHTML = "";
        const { container } = renderComponent(pos);
        expect(container.style.left).toBe(`${pos.x}px`);
        expect(container.style.bottom).toBe(`${pos.y}px`);
      });
    });
  });

  describe("Positioning System Tests.", () => {
    test("It should use left for horizontal positioning", () => {
      const props: UserProps = {
        x: 100,
        y: 50,
      };

      const { container } = renderComponent(props);

      expect(container.style.left).toBeDefined();
      expect(container.style.right).toBeFalsy();
    });

    test("It should use bottom for vertical positioning", () => {
      const props: UserProps = {
        x: 100,
        y: 50,
      };

      const { container } = renderComponent(props);

      expect(container.style.bottom).toBeDefined();
      expect(container.style.top).toBeFalsy();
    });

    test("It should not set other position properties", () => {
      const props: UserProps = {
        x: 100,
        y: 50,
      };

      const { container } = renderComponent(props);

      expect(container.style.right).toBe("");
      expect(container.style.top).toBe("");
    });
  });
});
