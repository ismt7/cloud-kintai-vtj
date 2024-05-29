import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Chip, Stack, TextField } from "@mui/material";
import { useContext } from "react";

import { AttendanceEditContext } from "../AttendanceEditProvider";

export default function StaffCommentInput() {
  const { changeRequests, register, setValue } = useContext(
    AttendanceEditContext
  );

  if (!register || !setValue) {
    return null;
  }

  return (
    <Box>
      <TextField
        {...register("staffComment")}
        multiline
        fullWidth
        minRows={2}
        placeholder="修正理由欄：管理者へ伝えたいことを記載"
        disabled={changeRequests.length > 0}
      />
      <Box>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} alignItems={"center"}>
          <Chip
            label="打刻忘れ"
            variant="outlined"
            color="primary"
            icon={<AddCircleOutlineOutlinedIcon fontSize="small" />}
            disabled={changeRequests.length > 0}
            onClick={() =>
              setValue("staffComment", "打刻忘れ", { shouldDirty: true })
            }
          />
        </Stack>
      </Box>
    </Box>
  );
}
