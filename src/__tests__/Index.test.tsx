import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Top from "../pages/Top";

test.concurrent("TOP画面への遷移", () => {
  const route = "/";
  render(
    <MemoryRouter initialEntries={[route]}>
      <Top />
    </MemoryRouter>
  );
  expect(screen.getByText("Top")).toBeInTheDocument();
});

test.concurrent("勤怠打刻画面への遷移", () => {
  const route = "/register";
  render(
    <MemoryRouter initialEntries={[route]}>
      <Register />
    </MemoryRouter>
  );
  expect(screen.getByText("Register")).toBeInTheDocument();
});

test.concurrent("ログイン画面への遷移", () => {
  const route = "/login";
  render(
    <MemoryRouter initialEntries={[route]}>
      <Login />
    </MemoryRouter>
  );
  expect(screen.getByText("Register")).toBeInTheDocument();
});
