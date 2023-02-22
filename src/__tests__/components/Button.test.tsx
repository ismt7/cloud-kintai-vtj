import { render } from "@testing-library/react";
import Button from "../../components/button/Button";

test.concurrent("Button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button label="ボタン" onClick={handleClick} />);
  expect(getByText("ボタン")).toBeInTheDocument();

  getByText("ボタン").click();
  expect(handleClick).toHaveBeenCalled();
});

test.concurrent("保存ボタン", () => {
  const { asFragment } = render(<Button label="保存" />);
  expect(asFragment()).toMatchSnapshot();
});
