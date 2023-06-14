import { render } from "@testing-library/react";

import Menu from "../../components/menu/Menu";

describe("Menu Component", () => {
  test.concurrent("メニューにレイアウト崩れなどないか(ビジュアルリグレッション)", () => {
    const { asFragment } = render(<Menu />);
    expect(asFragment()).toMatchSnapshot();
  });
});
