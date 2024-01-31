import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";

type Inputs = {
  holidayDate: string;
  name: string;
};

const defaultValues: Inputs = {
  holidayDate: "",
  name: "",
};

export default function AddCompanyHolidayCalendarDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Inputs) => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues,
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          reset(defaultValues);
          onClose();
        }}
      >
        <DialogTitle>会社休日を追加</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText>
              休日としたい日付と休日名を入力してください。
            </DialogContentText>
            <Controller
              name="holidayDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label="日付"
                  format="YYYY/MM/DD"
                  {...field}
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            <TextField
              label="休日名"
              required
              {...register("name", {
                required: true,
              })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset(defaultValues);
              onClose();
            }}
          >
            キャンセル
          </Button>
          <Button
            disabled={!isValid || !isDirty || isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
