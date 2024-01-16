import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { Staff } from "../../../hooks/useStaffs/common";

export default function AdminStaffEditDialog({
  open,
  selectedStaffId,
  register,
  onClose,
}: {
  open: boolean;
  selectedStaffId: number | null;
  register: UseFormRegister<Staff>;
  onClose: () => void;
}) {
  if (!selectedStaffId) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>スタッフ編集</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <Stack spacing={2}>
          <Box>
            <TextField
              label="名前(姓)"
              inputProps={{ maxLength: 10, "data-testid": "last-name" }}
              required={true}
              // {...register(`staffs.${selectedStaffId}.lastName`)}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={onClose}>更新</Button>
      </DialogActions>
    </Dialog>
  );
}
