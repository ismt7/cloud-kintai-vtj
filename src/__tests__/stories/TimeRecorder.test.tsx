import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TimeRecorder from "../../stories/TimeRecorder";

describe("TimeRecorder", () => {
  const clockInOnClickMock = jest.fn();
  const clockOutOnClickMock = jest.fn();
  const restStartOnClickMock = jest.fn();
  const restEndOnClickMock = jest.fn();
  const goDirectOnClickMock = jest.fn();
  const returnDirectOnClickMock = jest.fn();

  beforeEach(() => {
    render(
      <TimeRecorder
        clockInOnClick={clockInOnClickMock}
        clockOutOnClick={clockOutOnClickMock}
        restStartOnClick={restStartOnClickMock}
        restEndOnClick={restEndOnClickMock}
        goDirectOnClick={goDirectOnClickMock}
        returnDirectOnClick={returnDirectOnClickMock}
      />
    );
  });

  test("勤務開始 → 勤務終了", async () => {
    userEvent.click(screen.getByRole("button", { name: /勤務開始/i }));
    userEvent.click(screen.getByRole("button", { name: /勤務終了/i }));

    expect(clockInOnClickMock).toHaveBeenCalledTimes(1);
    expect(clockOutOnClickMock).toHaveBeenCalledTimes(1);
    expect(restStartOnClickMock).toHaveBeenCalledTimes(0);
    expect(restEndOnClickMock).toHaveBeenCalledTimes(0);
    expect(goDirectOnClickMock).toHaveBeenCalledTimes(0);
    expect(returnDirectOnClickMock).toHaveBeenCalledTimes(0);
  });

  test("勤務開始 → 休憩開始 → 休憩終了 → 勤務終了", async () => {
    expect(screen.getByText(/出勤前/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /勤務開始/i }));
    expect(screen.getByText(/勤務中/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /休憩開始/i }));
    expect(screen.getByText(/休憩中/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /休憩終了/i }));
    expect(screen.getByText(/勤務中/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /勤務終了/i }));
    expect(screen.getByText(/退勤済み/i)).toBeInTheDocument();

    expect(clockInOnClickMock).toHaveBeenCalledTimes(1);
    expect(clockOutOnClickMock).toHaveBeenCalledTimes(1);
    expect(restStartOnClickMock).toHaveBeenCalledTimes(1);
    expect(restEndOnClickMock).toHaveBeenCalledTimes(1);
    expect(goDirectOnClickMock).toHaveBeenCalledTimes(0);
    expect(returnDirectOnClickMock).toHaveBeenCalledTimes(0);
  });

  test("直行 → 直帰", async () => {
    userEvent.click(screen.getByRole("button", { name: /直行/i }));
    userEvent.click(screen.getByRole("button", { name: /直帰/i }));

    expect(clockInOnClickMock).toHaveBeenCalledTimes(0);
    expect(clockOutOnClickMock).toHaveBeenCalledTimes(0);
    expect(restStartOnClickMock).toHaveBeenCalledTimes(0);
    expect(restEndOnClickMock).toHaveBeenCalledTimes(0);
    expect(goDirectOnClickMock).toHaveBeenCalledTimes(1);
    expect(returnDirectOnClickMock).toHaveBeenCalledTimes(1);
  });

  test("直行 → 休憩開始 → 休憩終了 → 直帰", async () => {
    userEvent.click(screen.getByRole("button", { name: /直行/i }));
    userEvent.click(screen.getByRole("button", { name: /休憩開始/i }));
    userEvent.click(screen.getByRole("button", { name: /休憩終了/i }));
    userEvent.click(screen.getByRole("button", { name: /直帰/i }));

    expect(clockInOnClickMock).toHaveBeenCalledTimes(0);
    expect(clockOutOnClickMock).toHaveBeenCalledTimes(0);
    expect(restStartOnClickMock).toHaveBeenCalledTimes(1);
    expect(restEndOnClickMock).toHaveBeenCalledTimes(1);
    expect(goDirectOnClickMock).toHaveBeenCalledTimes(1);
    expect(returnDirectOnClickMock).toHaveBeenCalledTimes(1);
  });

  test("勤務開始 → 直帰", async () => {
    userEvent.click(screen.getByRole("button", { name: /勤務開始/i }));
    userEvent.click(screen.getByRole("button", { name: /直帰/i }));

    expect(clockInOnClickMock).toHaveBeenCalledTimes(1);
    expect(clockOutOnClickMock).toHaveBeenCalledTimes(0);
    expect(restStartOnClickMock).toHaveBeenCalledTimes(0);
    expect(restEndOnClickMock).toHaveBeenCalledTimes(0);
    expect(goDirectOnClickMock).toHaveBeenCalledTimes(0);
    expect(returnDirectOnClickMock).toHaveBeenCalledTimes(1);
  });

  test("直行 → 勤務終了", async () => {
    userEvent.click(screen.getByRole("button", { name: /直行/i }));
    userEvent.click(screen.getByRole("button", { name: /勤務終了/i }));

    expect(clockInOnClickMock).toHaveBeenCalledTimes(0);
    expect(clockOutOnClickMock).toHaveBeenCalledTimes(1);
    expect(restStartOnClickMock).toHaveBeenCalledTimes(0);
    expect(restEndOnClickMock).toHaveBeenCalledTimes(0);
    expect(goDirectOnClickMock).toHaveBeenCalledTimes(1);
    expect(returnDirectOnClickMock).toHaveBeenCalledTimes(0);
  });
});
