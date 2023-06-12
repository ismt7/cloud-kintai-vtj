import { render } from "@testing-library/react";

import Clock from "../../../components/clock/Clock";

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("Clock Component(", () => {
  test("現在時刻が正しいフォーマットで表示されるか", () => {
    jest.setSystemTime(new Date(2023, 0, 1, 9, 0, 0));

    const { getByText } = render(<Clock />);
    expect(getByText("2023/01/01 09:00:00")).toBeInTheDocument();
  });
});
