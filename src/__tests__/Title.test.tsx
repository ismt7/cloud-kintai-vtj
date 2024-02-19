import { render } from "@testing-library/react";

import Title from "../components/Title/Title";

// スナップショットテスト
test("Title component snapshot", () => {
  const { asFragment } = render(<Title text="Title" />);
  expect(asFragment()).toMatchSnapshot();
});
