import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Autocomplete, Box, CircularProgress, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useAppDispatchV2 } from "../../../app/hooks";
import * as MESSAGE_CODE from "../../../errors";
import addUserToGroup from "../../../hooks/common/addUserToGroup";
import createCognitoUser from "../../../hooks/common/createCognitoUser";
import useCognitoUser from "../../../hooks/useCognitoUser";
import { StaffRole, StaffType } from "../../../hooks/useStaffs/useStaffs";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../lib/reducers/snackbarReducer";
import { CreateStaffInput, UpdateStaffInput } from "../../../API";
import { handleSyncCognitoUser } from "./handleSyncCognitoUser";

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

export const ROLE_OPTIONS = [
  { value: StaffRole.ADMIN, label: "管理者" },
  { value: StaffRole.STAFF, label: "スタッフ" },
];

export default function CreateStaffDialog({
  staffs,
  refreshStaff,
  createStaff,
  updateStaff,
}: {
  staffs: StaffType[];
  refreshStaff: () => Promise<void>;
  createStaff: (input: CreateStaffInput) => Promise<void>;
  updateStaff: (input: UpdateStaffInput) => Promise<void>;
}) {
  const dispatch = useAppDispatchV2();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cognitoUser, loading: cognitoUserLoading } = useCognitoUser();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isValid },
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
    setIsSubmitting(true);
    const { familyName, givenName, mailAddress, role } = data;
    if (!familyName || !givenName || !mailAddress || !role) {
      setIsSubmitting(false);
      throw new Error("Invalid data");
    }

    createCognitoUser(mailAddress, familyName, givenName)
      .then(async () => {
        await addUserToGroup(mailAddress, role)
          .then(async () => {
            handleSyncCognitoUser(
              staffs,
              refreshStaff,
              createStaff,
              updateStaff
            )
              .catch(() => {
                dispatch(setSnackbarError(MESSAGE_CODE.E10001));
              })
              .finally(() => {
                handleClose();
              });
          })
          .catch(() => {
            dispatch(setSnackbarError(MESSAGE_CODE.E10002));
          });
      })
      .catch(() => {
        dispatch(setSnackbarError(MESSAGE_CODE.E10002));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (cognitoUserLoading) {
    return null;
  }

  if (cognitoUser === null) {
    dispatch(setSnackbarError(MESSAGE_CODE.E00001));
    return null;
  }

  return (
    <>
      <Button
        variant="contained"
        size="medium"
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
            startIcon={
              isSubmitting ? (
                <CircularProgress
                  size={15}
                  sx={{ color: "rgba(0, 0, 0, 0.26)" }}
                />
              ) : null
            }
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
