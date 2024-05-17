import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { WorkStatus, WorkStatusCodes } from "../common";

const GoDirectlyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.clock_in.contrastText,
  backgroundColor: theme.palette.clock_in.main,
  border: `3px solid ${theme.palette.clock_in.main}`,
  width: 120,
  height: 120,
  borderRadius: 100,
  "&:hover": {
    color: theme.palette.clock_in.main,
    backgroundColor: theme.palette.clock_in.contrastText,
  },
  "&:disabled": {
    border: "3px solid #E0E0E0",
    backgroundColor: "#E0E0E0",
  },
}));

export default function GoDirectlyItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: (time: dayjs.Dayjs) => void;
}) {
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    setDisabled(workStatus?.code !== WorkStatusCodes.BEFORE_WORK);
  }, [workStatus]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultStartTime = dayjs().hour(9).minute(0).second(0).millisecond(0);

  return (
    <>
      <GoDirectlyButton onClick={handleClickOpen} disabled={disabled}>
        直行
      </GoDirectlyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>直行時刻の選択</DialogTitle>
        <DialogContent>
          <DialogContentText>
            直行予定の時刻を選択してください
          </DialogContentText>
          <TimePicker
            value={defaultStartTime}
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
            }}
            slotProps={{
              textField: { size: "small" },
            }}
            onChange={(newTime) => {
              if (!newTime) return setSelectedTime(null);
              if (!newTime.isValid()) return;

              setSelectedTime(newTime);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            onClick={() => {
              if (!selectedTime) return;
              setDisabled(true);
              handleClose();
              onClick(selectedTime);
            }}
          >
            直行
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
