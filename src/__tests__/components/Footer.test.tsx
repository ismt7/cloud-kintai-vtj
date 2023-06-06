import { render } from "@testing-library/react";

import Footer from "../../components/footer/Footer";

test.concurrent("フッター", () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
