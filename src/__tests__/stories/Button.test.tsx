import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../../components/button/Button";

describe("Button", () => {
  test.concurrent("onClick", () => {
    const onClickMock = jest.fn();
    render(<Button label="label1" onClick={onClickMock} />);
    userEvent.click(screen.getByRole("button", { name: "label1" }));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test.concurrent("Disabled", () => {
    render(<Button label="label2" disabled />);
    expect(screen.getByRole("button", { name: "label2" })).toBeDisabled();
  });

  test.concurrent("Snapshot", () => {
    const { container } = render(<Button label="label" />);
    expect(container).toMatchSnapshot();
  });
});
