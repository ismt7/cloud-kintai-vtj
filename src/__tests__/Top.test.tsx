import { render } from "@testing-library/react";
import Top from "../pages/Top";

test("Top component Snapshot test", () => {
  const view = render(<Top />);
  expect(view).toMatchSnapshot();
});
