import { render } from "@testing-library/react";
import dayjs from "dayjs";

import Clock from "../../components/clock/Clock";

describe("Clock", () => {
  test.concurrent("Default", () => {
    const now = dayjs().format("YYYY/MM/DD HH:mm:ss");
    const { container } = render(<Clock />);
    expect(container).toHaveTextContent(now);
  });
});
