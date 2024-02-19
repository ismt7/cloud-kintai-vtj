import { Alert, AlertTitle, Box } from "@mui/material";

import { Attendance } from "../../../API";

export default function NoDataAlert({
  attendance,
}: {
  attendance: Attendance | null | undefined;
}) {
  if (attendance) {
    return null;
  }

  return (
    <Box>
      <Alert severity="info">
        <AlertTitle>お知らせ</AlertTitle>
        指定された日付に勤怠情報の登録がありませんでした。保存時に新規作成されます。
      </Alert>
    </Box>
  );
}
