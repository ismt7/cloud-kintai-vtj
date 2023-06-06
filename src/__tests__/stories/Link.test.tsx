import { render } from "@testing-library/react";

import Link from "../../components/link/Link";

describe("Link", () => {
  test.concurrent("Snapshot", () => {
    const onClickMock = jest.fn();
    const { container } = render(
      <Link label="label" href="/" onClick={onClickMock} />
    );
    expect(container).toMatchSnapshot();
  });
});
