import { TableRow, TableCell, Stack, Box } from "@mui/material";
import dayjs from "dayjs";
import { Rest } from "../../../../API";

export default function RestTableRow({ rests }: { rests: Rest[] }) {
  return (
    <TableRow>
      <TableCell>休憩時間</TableCell>
      <TableCell>
        {(() => {
          if (rests.length === 0) {
            return "(変更なし)";
          }

          return (
            <Stack spacing={1}>
              {rests.map((rest, index) => {
                const startTime = rest.startTime ? dayjs(rest.startTime) : null;
                const endTime = rest.endTime ? dayjs(rest.endTime) : null;

                return (
                  <Box key={index}>
                    {`${startTime?.format("HH:mm") ?? "--:--"} 〜 ${
                      endTime?.format("HH:mm") ?? "--:--"
                    }`}
                  </Box>
                );
              })}
            </Stack>
          );
        })()}
      </TableCell>
    </TableRow>
  );
}
