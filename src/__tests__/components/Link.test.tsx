import { render } from "@testing-library/react";

import Link from "../../components/link/Link";

describe("Link Component(", () => {
  test.concurrent("リンクのラベルが正しく表示されるか", () => {
    const { getByText } = render(<Link label="リンク" />);
    expect(getByText("リンク")).toBeInTheDocument();
  });

  test("リンクをクリックした時にイベントが発火するか", () => {
    const mockUrl = "http://example.com";
    const handleClick = jest.fn();
    const { getByText } = render(<Link label="リンク" href={mockUrl} onClick={handleClick} />);

    getByText("リンク").click();
    expect(handleClick).toHaveBeenCalled();
  });
});
