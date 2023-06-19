import { render } from "@testing-library/react";

import Button from "../../../components/button/Button";

describe("Button Component(", () => {
  test.concurrent("ボタンのラベルが正しく表示されるか", () => {
    const { getByText } = render(<Button label="ボタン" />);
    expect(getByText("ボタン")).toBeInTheDocument();
  });

  test("ボタンをクリックした時にイベントが発火するか", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button label="ボタン" onClick={handleClick} />);

    getByText("ボタン").click();
    expect(handleClick).toHaveBeenCalled();
  });

  test.concurrent("保存ボタンにレイアウト崩れがないか(ビジュアルリグレッション)", () => {
    const { asFragment } = render(<Button label="保存" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
