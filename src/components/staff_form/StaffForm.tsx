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
import { useEffect, useState } from "react";
import { useAppSelector } from "../../lib/hooks";
import { selectStaffList } from "../../lib/store";
import Button from "../button/Button";

const StaffForm = () => {
  const staffs = useAppSelector(selectStaffList);
  const staff = staffs.selectedData;
  const [lastName, setLastName] = useState(staff?.lastName || "");
  const [firstName, setFirstName] = useState(staff?.firstName || "");
  const [mailAddress, setMailAddress] = useState(staff?.mailAddress || "");
  const [selectedRole, setSelectedRole] = useState(
    staff?.staffRoles.roleId || 2
  );

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
    setMailAddress(event.target.value);
  };

  useEffect(() => {
    setLastName(staff?.lastName || "");
    setFirstName(staff?.firstName || "");
    setMailAddress(staff?.mailAddress || "");
    setSelectedRole(staff?.staffRoles.roleId || 2);
  }, [staff]);

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button color="delete" label="スタッフを削除" />
      </Box>
      <Box>
        <Stack spacing={3} sx={{ display: "inline-block" }}>
          <Box>
            <TextField
              label="スタッフコード"
              value={staff?.staffId || ""}
              disabled={true}
            />
          </Box>
          <Box>
            <Stack direction="row" spacing={3}>
              <Box>
                <TextField
                  label="名前(姓)"
                  value={lastName}
                  onChange={handleChangeLastName}
                />
              </Box>
              <Box>
                <TextField
                  label="名前(名)"
                  value={firstName}
                  onChange={handleChangeFirstName}
                />
              </Box>
            </Stack>
          </Box>
          <Box>
            <TextField
              label="メールアドレス"
              value={mailAddress}
              onChange={handleChangeMailAddress}
              sx={{ width: 1 }}
            />
          </Box>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">権限</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="権限"
                value={String(selectedRole)}
                sx={{ width: 1 }}
                onChange={handleChangeRole}
              >
                <MenuItem value={1}>システム管理者</MenuItem>
                <MenuItem value={2}>スタッフ</MenuItem>
                <MenuItem value={3}>スタッフ管理者</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            {staffs.selectedData ? (
              <Button label="保存" />
            ) : (
              <Button label="作成" />
            )}
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
export default StaffForm;
