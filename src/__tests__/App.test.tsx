import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Attendance from "../Attendance";
import Top from "../Top";

test.concurrent("TOP画面への遷移", () => {
  const route = "/top";
  render(
    <MemoryRouter initialEntries={[route]}>
      <Top />
    </MemoryRouter>
  );
  expect(screen.getByText("Top")).toBeInTheDocument();
});

test.concurrent("勤怠打刻画面への遷移", () => {
  const route = "/attendance";
  render(
    <MemoryRouter initialEntries={[route]}>
      <Attendance />
    </MemoryRouter>
  );
  expect(screen.getByText("勤怠打刻画面")).toBeInTheDocument();
});
