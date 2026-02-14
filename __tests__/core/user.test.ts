import { User } from "@/core/user";

describe("User Class", () => {
  it("should initialize with correct position", () => {
    const user = new User({ x: 230, y: 10 });

    expect(user.position).toEqual({ x: 230, y: 10 });
  });

  it("should create user component", () => {
    const user = new User({ x: 230, y: 10 });

    const component = user.create();
    document.body.appendChild(component);

    expect(component).toHaveClass("user");
    expect(component.style.left).toBe("230px");
    expect(component.style.bottom).toBe("10px");

    document.body.innerHTML = "";
  });

  it("should move left when ArrowLeft is pressed", () => {
    const user = new User({ x: 230, y: 10 });

    user.move("ArrowLeft");

    expect(user.position).toEqual({ x: 220, y: 10 });
  });

  it("should move right when ArrowRight is pressed", () => {
    const user = new User({ x: 230, y: 10 });

    user.move("ArrowRight");

    expect(user.position).toEqual({ x: 240, y: 10 });
  });

  it("should move multiple times", () => {
    const user = new User({ x: 230, y: 10 });

    user.move("ArrowLeft");
    user.move("ArrowLeft");
    user.move("ArrowRight");

    expect(user.position).toEqual({ x: 220, y: 10 });
  });
});
