import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import dayjs from "dayjs";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AttendanceEditor from "../../../components/attendance_editor/AttendanceEditor";
import GetStoreMock from "../../../components/attendance_editor/mocks/MockReducer";

import { theme } from "../../../lib/theme";

describe("AttendanceEditor Component(", () => {
  test.concurrent(
    "レイアウト崩れが発生していないか(ビジュアルリグレッション)",
    () => {
      // Arrange: テスト準備
      const now = dayjs();
      const targetWorkDate = now.format("YYYYMMDD");

      // Act: テスト実行
      const { asFragment } = render(
        <Provider store={GetStoreMock()}>
          <MemoryRouter
            initialEntries={[`/admin/attendances/edit/${targetWorkDate}/999`]}
          >
            <ThemeProvider theme={theme}>
              <Routes>
                <Route
                  path="/admin/attendances/edit/:targetWorkDate/:targetStaffId"
                  element={<AttendanceEditor />}
                />
              </Routes>
            </ThemeProvider>
          </MemoryRouter>
        </Provider>
      );

      // Assert: 検証
      expect(asFragment()).toMatchSnapshot();
    }
  );
});
