// cspell:words testid
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import createStaff from "../../lib/staff/CreateStaff";
import updateStaff from "../../lib/staff/UpdateStaff";
import updateStaffRole from "../../lib/staff_role/updateStaffRole";
import { selectLoginStaff, selectStaffList } from "../../lib/store";
import Button from "../button/Button";

const StaffForm = () => {
  const loginStaff = useAppSelector(selectLoginStaff);
  const staffs = useAppSelector(selectStaffList);

  const dispatch = useAppDispatch();
  const selectedStaff = staffs.selectedData;

  const [lastName, setLastName] = useState(selectedStaff?.lastName || "");
  const [firstName, setFirstName] = useState(selectedStaff?.firstName || "");
  const [mailAddress, setMailAddress] = useState(
    selectedStaff?.mailAddress || ""
  );
  const [selectedRole, setSelectedRole] = useState(
    selectedStaff?.staffRoles.roleId || 2
  );
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [createButtonDisabled, setCreateButtonDisabled] = useState(true);

  const mailAddressInputRef = useRef<HTMLInputElement>(null);

  const [mailAddressInputError, setMailAddressInputError] = useState(false);

  const handleChangeRole = (event: SelectChangeEvent) => {
    setSelectedRole(Number(event.target.value));
  };

  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleChangeMailAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (mailAddressInputRef.current) {
      const ref = mailAddressInputRef.current;
      setMailAddressInputError(!ref.validity.valid);

      if (!ref.value) {
        setMailAddressInputError(false);
      }
    }
    setMailAddress(event.target.value);
  };

  const handleSave = () => {
    if (selectedStaff) {
      void dispatch(updateStaff({ staff: selectedStaff }));
      void dispatch(
        updateStaffRole({
          staffId: selectedStaff.staffId,
          roleId: selectedRole,
        })
      );
    }
  };

  const handleCreate = () => {
    void dispatch(
      createStaff({
        staffCreate: {
          lastName,
          firstName,
          mailAddress,
        },
      })
    );

    setCreateButtonDisabled(true);
  };

  useEffect(() => {
    setLastName(selectedStaff?.lastName || "");
    setFirstName(selectedStaff?.firstName || "");
    setMailAddress(selectedStaff?.mailAddress || "");
    setSelectedRole(selectedStaff?.staffRoles.roleId || 2);
  }, [selectedStaff]);

  useEffect(() => {
    if (selectedStaff) {
      const isDisabled =
        lastName === "" ||
        firstName === "" ||
        mailAddress === "" ||
        (selectedStaff.lastName === lastName &&
          selectedStaff.firstName === firstName &&
          selectedStaff.mailAddress === mailAddress &&
          selectedStaff.staffRoles.roleId === selectedRole) ||
        mailAddressInputError;
      setSaveButtonDisabled(isDisabled);
      return;
    }

    const isDisabled =
      lastName === "" ||
      firstName === "" ||
      mailAddress === "" ||
      mailAddressInputError;

    setCreateButtonDisabled(isDisabled);
  }, [lastName, firstName, mailAddress, selectedRole]);

  return (
    <Stack spacing={1}>
      {staffs.selectedData && (
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button color="delete" label="スタッフを削除" />
        </Box>
      )}
      <Box>
        <Stack spacing={3} sx={{ display: "inline-block" }}>
          <Box>
            <TextField
              label="スタッフコード"
              value={selectedStaff?.staffId || ""}
              disabled={true}
            />
          </Box>
          <Box>
            <Stack direction="row" spacing={3}>
              <Box>
                <TextField
                  label="名前(姓)"
                  inputProps={{ maxLength: 10, "data-testid": "last-name" }}
                  value={lastName}
                  required={true}
                  onChange={handleChangeLastName}
                />
              </Box>
              <Box>
                <TextField
                  label="名前(名)"
                  inputProps={{ maxLength: 10, "data-testid": "first-name" }}
                  value={firstName}
                  required={true}
                  onChange={handleChangeFirstName}
                />
              </Box>
            </Stack>
          </Box>
          <Box>
            <TextField
              label="メールアドレス"
              inputRef={mailAddressInputRef}
              inputProps={{
                type: "email",
                maxLength: 100,
                pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
                "data-testid": "mail-address",
              }}
              error={mailAddressInputError}
              helperText={
                mailAddressInputError ? "入力内容に誤りがあります" : ""
              }
              value={mailAddress}
              required={true}
              onChange={handleChangeMailAddress}
              sx={{ width: 1 }}
            />
          </Box>
          <Box>
            <FormControl fullWidth>
              <InputLabel required={true}>権限</InputLabel>
              <Select
                data-testid="staff-role"
                labelId="staff-role"
                label="権限"
                value={String(selectedRole)}
                required={true}
                sx={{ width: 1 }}
                onChange={handleChangeRole}
              >
                {loginStaff.data?.staffRoles.roleId === 1 && (
                  <MenuItem value={1}>システム管理者</MenuItem>
                )}
                <MenuItem value={2}>スタッフ</MenuItem>
                <MenuItem value={3}>スタッフ管理者</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            {staffs.selectedData ? (
              <Button
                label="保存"
                disabled={saveButtonDisabled}
                onClick={handleSave}
              />
            ) : (
              <Button
                label="作成"
                disabled={createButtonDisabled}
                onClick={handleCreate}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
export default StaffForm;
