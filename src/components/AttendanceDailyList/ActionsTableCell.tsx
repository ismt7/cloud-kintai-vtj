import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Badge, IconButton, TableCell } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AttendanceDaily } from "../../hooks/useAttendanceDaily/useAttendanceDaily";
import useAttendances from "../../hooks/useAttendances/useAttendances";

export function ActionsTableCell({ row }: { row: AttendanceDaily }) {
  const navigate = useNavigate();
  const { attendances, getAttendances } = useAttendances();

  useEffect(() => {
    getAttendances(row.sub);
  }, []);

  return (
    <TableCell sx={{ width: 50, minWidth: 50 }}>
      <IconButton
        onClick={() => {
          const { sub: staffId } = row;
          navigate(`/admin/staff/${staffId}/attendance`);
        }}
      >
        <Badge
          badgeContent={(() => {
            const changeRequestCount = attendances.filter((attendance) =>
              attendance.changeRequests
                ? attendance.changeRequests
                    .filter(
                      (item): item is NonNullable<typeof item> => item !== null
                    )
                    .filter((item) => !item.completed).length > 0
                : false
            ).length;

            return changeRequestCount;
          })()}
          color="primary"
        >
          <CalendarMonthIcon />
        </Badge>
      </IconButton>
    </TableCell>
  );
}
