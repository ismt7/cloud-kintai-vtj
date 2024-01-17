import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Autocomplete, Box, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { StaffRole } from "../../../hooks/useStaffs/common";
import createStaff from "../../../hooks/common/createStaff";
import addUserToGroup from "../../../hooks/common/addUserToGroup";
import { useAppDispatchV2 } from "../../../app/hooks";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../lib/reducers/snackbarReducer";
import { E10001, E10002, S10002 } from "../../../errors";

type Inputs = {
  familyName?: string;
  givenName?: string;
  mailAddress?: string;
  role: string;
};

const defaultValues: Inputs = {
  familyName: undefined,
  givenName: undefined,
  mailAddress: undefined,
  role: StaffRole.STAFF,
};

const ROLE_OPTIONS = [
  { value: StaffRole.ADMIN, label: "管理者" },
  { value: StaffRole.STAFF_ADMIN, label: "スタッフ管理者" },
  { value: StaffRole.STAFF, label: "スタッフ" },
];

export default function CreateStaffDialog({
  refreshStaff,
}: {
  refreshStaff: () => Promise<void>;
}) {
  const dispatch = useAppDispatchV2();
  const [open, setOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset(defaultValues);
    setOpen(false);
  };

  const onSubmit = async (data: Inputs) => {
    const { familyName, givenName, mailAddress, role } = data;
    if (!familyName || !givenName || !mailAddress || !role) {
      throw new Error("Invalid data");
    }

    createStaff(mailAddress, familyName, givenName)
      .then(async () => {
        await addUserToGroup(mailAddress, role)
          .then(() => {
            dispatch(setSnackbarSuccess(S10002));
            handleClose();
            refreshStaff().catch(() => {
              dispatch(setSnackbarError(E10001));
            });
          })
          .catch(() => {
            dispatch(setSnackbarError(E10002));
          });
      })
      .catch(() => {
        dispatch(setSnackbarError(E10002));
      });
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        startIcon={<AddCircleIcon />}
        onClick={handleClickOpen}
      >
        スタッフ登録
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>スタッフ登録</DialogTitle>
        <DialogContent>
          <DialogContentText>
            登録するスタッフの情報を入力してください。
          </DialogContentText>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                {...register("familyName", { required: true })}
                label="名前(姓)"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                {...register("givenName", { required: true })}
                label="名前(名)"
                type="text"
                fullWidth
                variant="standard"
              />
            </Stack>
            <TextField
              {...register("mailAddress", { required: true })}
              label="メールアドレス"
              type="email"
              fullWidth
              variant="standard"
            />
            <Box>
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={
                      ROLE_OPTIONS.find(
                        (option) => String(option.value) === field.value
                      ) ?? null
                    }
                    disablePortal
                    id="combo-box-demo"
                    options={ROLE_OPTIONS}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="権限"
                        required
                        variant="standard"
                      />
                    )}
                    onChange={(_, data) => {
                      if (!data) return;
                      setValue("role", data.value);
                    }}
                  />
                )}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            disabled={!isDirty || !isValid || isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
