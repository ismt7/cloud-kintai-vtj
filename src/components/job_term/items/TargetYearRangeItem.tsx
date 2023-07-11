import { Box, List, ListItemButton, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface TargetYearRangeItemProps {
  targetYear: number;
}

export default function TargetYearRangeItem({
  targetYear,
}: TargetYearRangeItemProps) {
  const navigate = useNavigate();

  const now = dayjs();
  const targetYearList = [...Array<number>(3)].map(
    (_, i) => now.year() + i - 1
  );

  return (
    <List>
      <Stack direction="row">
        {targetYearList.map((item) => (
          <>
            <Box>
              <ListItemButton
                selected={targetYear === item}
                onClick={() => {
                  navigate(`/admin/master/job_term/${item}`);
                }}
              >
                {item}年
              </ListItemButton>
            </Box>
          </>
        ))}
      </Stack>
    </List>
  );
}
