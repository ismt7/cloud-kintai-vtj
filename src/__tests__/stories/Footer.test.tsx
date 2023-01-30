import { render } from "@testing-library/react";
import Footer from "../../components/footer/Footer";

describe("Footer", () => {
  test("Default", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
