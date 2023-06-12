import { render } from "@testing-library/react";

import Footer from "../../components/footer/Footer";

describe("Footer Component(", () => {
  test.concurrent("フッターにレイアウト崩れが発生していないか(ビジュアルリグレッション)", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
