import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Button from "../../stories/Button";

describe("Button", () => {
  test("onClick", () => {
    const onClickMock = jest.fn();
    render(<Button label="label" onClick={onClickMock} />);
    userEvent.click(screen.getByRole("button"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("Disabled", () => {
    render(<Button label="label" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("Snapshot", () => {
    const { container } = render(<Button label="label" />);
    expect(container).toMatchSnapshot();
  });
});
