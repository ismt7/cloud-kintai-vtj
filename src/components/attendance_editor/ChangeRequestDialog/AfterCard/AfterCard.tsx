import {
  Card,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { AttendanceChangeRequest } from "../../../../API";
import PaidHolidayFlagTableRow from "./PaidHolidayFlagTableRow";
import GoDirectlyFlagTableRow from "./GoDirectlyFlagTableRow";
import ReturnDirectlyFlagTableRow from "./ReturnDirectlyFlagTableRow";
import WorkTimeTableRow from "./WorkTimeTableRow";
import RestTableRow from "./RestTableRow";
import RemarksTableRow from "./RemarksTableRow";

export default function AfterCard({
  changeRequest,
}: {
  changeRequest: AttendanceChangeRequest | null;
}) {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        変更後
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <PaidHolidayFlagTableRow value={changeRequest?.paidHolidayFlag} />
            <GoDirectlyFlagTableRow value={changeRequest?.goDirectlyFlag} />
            <ReturnDirectlyFlagTableRow
              value={changeRequest?.returnDirectlyFlag}
            />
            <WorkTimeTableRow
              startTime={
                changeRequest?.startTime ? dayjs(changeRequest.startTime) : null
              }
              endTime={
                changeRequest?.endTime ? dayjs(changeRequest.endTime) : null
              }
            />
            <RestTableRow
              rests={
                changeRequest?.rests
                  ? changeRequest.rests.filter(
                      (item): item is NonNullable<typeof item> => item !== null
                    )
                  : []
              }
            />
            <RemarksTableRow value={changeRequest?.remarks} />
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
