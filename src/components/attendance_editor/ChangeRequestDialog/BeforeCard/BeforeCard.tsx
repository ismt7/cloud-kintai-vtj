import {
  Card,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Attendance } from "../../../../API";
import PaidHolidayFlagTableRow from "./PaidHolidayFlagTableRow";
import GoDirectlyFlagTableRow from "./GoDirectlyFlagTableRow";
import ReturnDirectlyFlagTableRow from "./ReturnDirectlyFlagTableRow";
import WorkTimeTableRow from "./WorkTimeTableRow";
import RestTableRow from "./RestTableRow";
import RemarksTableRow from "./RemarksTableRow";

export default function BeforeCard({
  attendance,
}: {
  attendance: Attendance | null;
}) {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        変更前
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <PaidHolidayFlagTableRow value={attendance?.paidHolidayFlag} />
            <GoDirectlyFlagTableRow value={attendance?.goDirectlyFlag} />
            <ReturnDirectlyFlagTableRow
              value={attendance?.returnDirectlyFlag}
            />
            <WorkTimeTableRow
              startTime={
                attendance?.startTime ? dayjs(attendance.startTime) : null
              }
              endTime={attendance?.endTime ? dayjs(attendance.endTime) : null}
            />
            <RestTableRow
              rests={
                attendance?.rests
                  ? attendance.rests.filter(
                      (item): item is NonNullable<typeof item> => item !== null
                    )
                  : []
              }
            />
            <RemarksTableRow value={attendance?.remarks} />
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
