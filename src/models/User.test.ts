import { User } from "./User";

const USER = {
  position: { x: 2, y: 2 },
};

describe("User Class", () => {
  let user: User = new User({
    x: USER.position.x,
    y: USER.position.y,
  });

  test("It must have the correct initial state when initializing an instance of User.", () => {
    expect(user.position.x).toBe(USER.position.x);
    expect(user.position.y).toBe(USER.position.y);
  });

  test("It must create the element that will be used to render the user.", () => {
    const userElement = user.create();

    expect(userElement instanceof HTMLDivElement).toBeTruthy();
    expect(userElement.classList.contains("user")).toBeTruthy();
    expect(userElement.style.left).toBe(`${user.position.x}px`);
    expect(userElement.style.bottom).toBe(`${user.position.y}px`);
  });

  test("The user must move.", () => {
    expect(user.position.x).toBe(USER.position.x);
    expect(user.position.y).toBe(USER.position.y);

    user.move("ArrowLeft");

    expect(user.position.x).toBe(USER.position.x - 10);
    expect(user.position.y).toBe(USER.position.y);

    user.move("ArrowRight");

    expect(user.position.x).toBe(USER.position.x);
    expect(user.position.y).toBe(USER.position.y);
  });
});
