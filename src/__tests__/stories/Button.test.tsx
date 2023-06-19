import { render, screen } from "@testing-library/react";

import Button from "../../components/button/Button";

describe("Button", () => {
  test.concurrent("onClick", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button label="label1" onClick={onClickMock} />);

    getByText("label1").click();
    expect(onClickMock).toHaveBeenCalled();
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
