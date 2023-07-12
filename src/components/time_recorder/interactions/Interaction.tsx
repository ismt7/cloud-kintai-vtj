import { expect } from "@storybook/jest";
import { waitFor, userEvent, screen } from "@storybook/testing-library";

export default function GetInteraction() {
  return async () => {
    // 出勤前状態で「勤務開始」ボタンのみが有効化されていることを確認
    await waitFor(async () => {
      expect(screen.getByText(/勤務開始/i)).toBeEnabled();
      expect(screen.getByText(/休憩開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩終了/i)).toBeDisabled();
      expect(screen.getByText(/勤務終了/i)).toBeDisabled();
      expect(screen.getByText(/直行/i)).toBeEnabled();
      expect(screen.getByText(/直帰/i)).toBeDisabled();

      const startButton = screen.getByRole("button", { name: /勤務開始/i });
      void userEvent.click(startButton);
    });

    // 出勤後状態で「休憩開始」「勤務終了」「直帰」ボタンのみが有効化されていることを確認
    await waitFor(() => {
      expect(screen.getByText(/勤務開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩開始/i)).toBeEnabled();
      expect(screen.getByText(/休憩終了/i)).toBeDisabled();
      expect(screen.getByText(/勤務終了/i)).toBeEnabled();
      expect(screen.getByText(/直行/i)).toBeDisabled();
      expect(screen.getByText(/直帰/i)).toBeEnabled();

      const restStartButton = screen.getByRole("button", { name: /休憩開始/i });
      void userEvent.click(restStartButton);
    });

    // 休憩中状態で「休憩終了」ボタンのみが有効化されていることを確認
    await waitFor(() => {
      expect(screen.getByText(/勤務開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩終了/i)).toBeEnabled();
      expect(screen.getByText(/勤務終了/i)).toBeDisabled();
      expect(screen.getByText(/直行/i)).toBeDisabled();
      expect(screen.getByText(/直帰/i)).toBeDisabled();

      const restEndButton = screen.getByRole("button", { name: /休憩終了/i });
      void userEvent.click(restEndButton);
    });

    // 休憩終了後の状態で「勤務終了」「直帰」「休憩開始」ボタンのみが有効化されていることを確認
    await waitFor(() => {
      expect(screen.getByText(/勤務開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩開始/i)).toBeEnabled();
      expect(screen.getByText(/休憩終了/i)).toBeDisabled();
      expect(screen.getByText(/勤務終了/i)).toBeEnabled();
      expect(screen.getByText(/直行/i)).toBeDisabled();
      expect(screen.getByText(/直帰/i)).toBeEnabled();

      const endButton = screen.getByRole("button", { name: /勤務終了/i });
      void userEvent.click(endButton);
    });

    // 勤務終了後の状態ですべてのボタンが無効化されていることを確認
    await waitFor(() => {
      expect(screen.getByText(/勤務開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩開始/i)).toBeDisabled();
      expect(screen.getByText(/休憩終了/i)).toBeDisabled();

      const endButton = screen.getByRole("button", { name: /勤務終了/i });
      expect(endButton).toBeDisabled();

      expect(screen.getByText(/直行/i)).toBeDisabled();
      expect(screen.getByText(/直帰/i)).toBeDisabled();
    });
  };
}
