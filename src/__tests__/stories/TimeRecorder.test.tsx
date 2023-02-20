import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import TimeRecorder from "../../components/time_recorder/TimeRecorder";
import { store } from "../../lib/store";
import { theme } from "../../lib/theme";

describe("TimeRecorder", () => {
  test.concurrent("renders time recorder", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TimeRecorder />
        </ThemeProvider>
      </Provider>
    );

    expect(getByText(/勤務開始/i)).toBeInTheDocument();
    expect(getByText(/勤務終了/i)).toBeInTheDocument();
    expect(getByText(/休憩開始/i)).toBeInTheDocument();
    expect(getByText(/休憩終了/i)).toBeInTheDocument();
    expect(getByText(/直行/i)).toBeInTheDocument();
    expect(getByText(/直帰/i)).toBeInTheDocument();
  });
});
