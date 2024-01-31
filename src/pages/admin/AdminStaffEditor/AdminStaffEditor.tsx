import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useStaffs from "../../../hooks/useStaffs/useStaffs";
import { useAppDispatchV2 } from "../../../app/hooks";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../lib/reducers/snackbarReducer";
import { E05001, E05003, S05003 } from "../../../errors";
import Title from "../../../components/Title/Title";
import { Staff, StaffRole } from "../../../hooks/useStaffs/common";
import { ROLE_OPTIONS } from "../AdminStaff/CreateStaffDialog";
import updateCognitoUser from "../../../hooks/common/updateCognitoUser";
import removeUserFromGroup from "../../../hooks/common/removeUserFromGroup";
import addUserToGroup from "../../../hooks/common/addUserToGroup";

type Inputs = {
  staffId?: Staff["sub"];
  familyName?: Staff["familyName"];
  givenName?: Staff["givenName"];
  mailAddress?: Staff["mailAddress"];
  beforeRoles: StaffRole[];
  role: string;
};

const defaultValues: Inputs = {
  staffId: undefined,
  familyName: undefined,
  givenName: undefined,
  mailAddress: undefined,
  beforeRoles: [],
  role: StaffRole.STAFF,
};

export default function AdminStaffEditor() {
  const dispatch = useAppDispatchV2();
  const { staffId } = useParams();

  const [saving, setSaving] = useState(false);

  const {
    staffs,
    loading: staffLoading,
    error: staffError,
    updateStaff,
  } = useStaffs();

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = (data: Inputs) => {
    const { familyName, givenName, mailAddress, beforeRoles, role } = data;
    if (!familyName || !givenName || !mailAddress || !role) {
      throw new Error("Invalid data");
    }

    setSaving(true);
    updateCognitoUser(mailAddress, familyName, givenName, mailAddress)
      .then(async () => {
        if (beforeRoles.length >= 1 && beforeRoles[0] !== role) {
          const removeGroupsResponse = await Promise.all(
            beforeRoles.map(async (r) => {
              await removeUserFromGroup(mailAddress, String(r)).catch((e) => {
                throw e;
              });
            })
          )
            .then(() => true)
            .catch(() => false);

          if (!removeGroupsResponse) {
            dispatch(setSnackbarError(E05003));
            return;
          }

          await addUserToGroup(mailAddress, role).catch(() => {
            dispatch(setSnackbarError(E05003));
          });

          const staff = staffs.find((s) => s.cognitoUserId === staffId);
          if (!staff) {
            dispatch(setSnackbarError(E05001));
            return;
          }

          await updateStaff({
            id: staff.id,
            familyName,
            givenName,
            mailAddress,
            role,
          })
            .then(() => {
              dispatch(setSnackbarSuccess(S05003));
            })
            .catch(() => {
              dispatch(setSnackbarError(E05003));
            });
        }
      })
      .catch(() => {
        dispatch(setSnackbarError(E05003));
      })
      .finally(() => {
        setSaving(false);
      });
  };

  useEffect(() => {
    if (!staffId || staffLoading || staffs.length === 0) {
      return;
    }

    const staff = staffs.find((s) => s.cognitoUserId === staffId);
    if (!staff) {
      dispatch(setSnackbarError(E05001));
      return;
    }

    setValue("staffId", staff.cognitoUserId);
    setValue("familyName", staff.familyName);
    setValue("givenName", staff.givenName);
    setValue("mailAddress", staff.mailAddress);
    setValue("beforeRoles", [staff.role]);
    setValue("role", staff.role);
  }, [staffId, staffLoading]);

  if (staffLoading) {
    return <LinearProgress />;
  }

  if (staffError) {
    dispatch(setSnackbarError(E05001));
    return null;
  }

  const makeStaffName = () => {
    const { familyName, givenName } = getValues();

    if (!familyName || !givenName) {
      return "(未設定)";
    }

    return `${familyName} ${givenName}`;
  };

  return (
    <Container maxWidth="xl" sx={{ height: 1, pt: 2 }}>
      <Stack spacing={2}>
        <Breadcrumbs>
          <Link to="/" color="inherit">
            TOP
          </Link>
          <Link to="/admin/staff" color="inherit">
            スタッフ一覧
          </Link>
          <Typography color="text.primary">{makeStaffName()}</Typography>
          <Typography color="text.primary">スタッフ編集</Typography>
        </Breadcrumbs>
        <Title text="スタッフ編集" />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>スタッフID</TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {getValues("staffId")}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>スタッフ名</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      {...register("familyName", { required: true })}
                      label="姓"
                    />
                    <TextField
                      {...register("givenName", { required: true })}
                      label="名"
                    />
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>メールアドレス</TableCell>
                <TableCell>
                  <TextField
                    {...register("mailAddress", { required: true })}
                    label="メールアドレス"
                    sx={{ width: 400 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>権限</TableCell>
                <TableCell>
                  <Box>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          value={
                            ROLE_OPTIONS.find(
                              (option) => String(option.value) === field.value
                            ) ?? null
                          }
                          options={ROLE_OPTIONS}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="権限"
                              sx={{ width: 400 }}
                            />
                          )}
                          onChange={(_, data) => {
                            if (!data) return;
                            setValue("role", data.value);
                            field.onChange(data.value);
                          }}
                        />
                      )}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <Button
            variant="contained"
            size="medium"
            disabled={!isValid || !isDirty || isSubmitting}
            startIcon={saving ? <CircularProgress size={15} /> : undefined}
            onClick={handleSubmit(onSubmit)}
          >
            保存
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
