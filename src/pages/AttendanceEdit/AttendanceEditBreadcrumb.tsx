import { Breadcrumbs, Link, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function AttendanceEditBreadcrumb({
  workDate,
}: {
  workDate: dayjs.Dayjs;
}) {
  return (
    <Breadcrumbs>
      <Link href="/" color="inherit">
        TOP
      </Link>
      <Link href={"/attendance/list"} color="inherit">
        勤怠一覧
      </Link>
      <Typography color="text.primary">
        {dayjs(workDate).format("YYYY/MM/DD")}
      </Typography>
    </Breadcrumbs>
  );
}
