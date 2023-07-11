import { DataGrid } from "@mui/x-data-grid";

import dayjs from "dayjs";
import { useEffect } from "react";
import { useAppDispatchV2, useAppSelectorV2 } from "../../app/hooks";
import {
  fetchAttendances,
  selectAttendanceDaily,
} from "./attendanceDailySlice";
import GetColumns from "./Column";

export default function AttendanceDailyList() {
  const { attendances } = useAppSelectorV2(selectAttendanceDaily);
  const dispatch = useAppDispatchV2();

  useEffect(() => {
    const now = dayjs();

    void dispatch(
      fetchAttendances({
        fromWorkDate: Number(now.subtract(30, "day").format("YYYYMMDD")),
        toWorkDate: Number(now.format("YYYYMMDD")),
      })
    );
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={attendances}
        columns={GetColumns()}
        slots={{
          noRowsOverlay: () => <div>データがありません</div>,
          footer: () => null,
        }}
      />
    </div>
  );
}
