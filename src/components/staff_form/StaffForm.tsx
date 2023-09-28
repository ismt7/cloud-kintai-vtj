import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Role, Service, Staff, StaffRole } from "../../client";
import { LoginStaff } from "../staff_list/StaffList";

interface FormState {
  last_name: Staff["last_name"];
  first_name: Staff["first_name"];
  mail_address: Staff["mail_address"];
  icon_path: Staff["icon_path"];
  staff_role: StaffRole | null;
}

async function fetchStaff(
  loginStaff: Staff,
  staffId: number,
  callback: (
    staffResponse: Staff | null,
    staffRoleResponse: StaffRole | null
  ) => void
) {
  const staff = await Service.getStaff(staffId, loginStaff.id).catch(
    (error) => {
      console.log(error);
      return null;
    }
  );

  const staffRole = await Service.getStaffRole(staffId, loginStaff.id).catch(
    (error) => {
      console.log(error);
      return null;
    }
  );

  callback(staff, staffRole);
}

async function fetchRoles(
  loginStaff: Staff,
  callback: (value: Role[]) => void
) {
  const roles = await Service.getRoles(loginStaff.id).catch((error) => {
    console.log(error);
    return [] as Role[];
  });

  callback(roles);
}

const initialState: FormState = {
  last_name: "",
  first_name: "",
  mail_address: "",
  icon_path: "",
  staff_role: null,
};

const StaffForm = ({ loginStaff }: { loginStaff: LoginStaff }) => {
  const { staffId } = useParams();

  const [staff, setStaff] = useState<Staff | null>(null);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (!loginStaff || !staffId) return;

    void fetchStaff(
      loginStaff,
      Number(staffId),
      (staffResponse, staffRoleResponse) => {
        if (!staffResponse) return;

        setStaff(staffResponse);
        setFormState({
          ...formState,
          last_name: staffResponse.last_name,
          first_name: staffResponse?.first_name,
          mail_address: staffResponse?.mail_address,
          icon_path: staffResponse?.icon_path,
          staff_role: staffRoleResponse,
        });
      }
    );

    void fetchRoles(loginStaff, (value) => setRoles(value));
  }, [loginStaff, staffId]);

  function changeHandler<T>(key: string, value: T) {
    setFormState({
      ...formState,
      [key]: value,
    });
  }

  const clickSaveButtonHandler = async () => {
    if (!staff || !loginStaff) return;

    await Service.updateStaff(
      staff.id,
      {
        last_name: formState.last_name,
        first_name: formState.first_name,
        mail_address: formState.mail_address,
        icon_path: formState.icon_path,
      },
      loginStaff.id
    ).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Stack spacing={1}>
      {formState && (
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="delete"
            // onClick={handleDelete}
            onClick={() => {
              /* 処理なし */
            }}
            sx={{ width: "150px" }}
          >
            スタッフを削除
          </Button>
        </Box>
      )}
      <Stack spacing={3} sx={{ display: "inline-block" }}>
        <Box>
          <Typography>{`スタッフID: ${staff?.id || ""}`}</Typography>
        </Box>
        <Stack direction="row" spacing={3}>
          <Box>
            <TextField
              label="名前(姓)"
              inputProps={{ maxLength: 10, "data-testid": "last-name" }}
              value={formState.last_name}
              required={true}
              onChange={(event) =>
                changeHandler<Staff["last_name"]>(
                  "last_name",
                  event.target.value
                )
              }
            />
          </Box>
          <Box>
            <TextField
              label="名前(名)"
              inputProps={{ maxLength: 10, "data-testid": "first-name" }}
              value={formState.first_name}
              required={true}
              onChange={(event) =>
                changeHandler<Staff["first_name"]>(
                  "first_name",
                  event.target.value
                )
              }
            />
          </Box>
        </Stack>
        <Box>
          <TextField
            label="メールアドレス"
            // inputRef={mailAddressInputRef}
            // inputProps={{
            //   type: "email",
            //   maxLength: 100,
            //   pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
            //   "data-testid": "mail-address",
            // }}
            // error={mailAddressInputError}
            // helperText={mailAddressInputError ? "入力内容に誤りがあります" : ""}
            value={formState.mail_address}
            required={true}
            onChange={(event) => {
              changeHandler<Staff["mail_address"]>(
                "mail_address",
                event.target.value
              );
            }}
            sx={{ width: 1 }}
          />
        </Box>
        <Box>
          {roles.length >= 1 && formState.staff_role && (
            <Autocomplete
              value={roles.find(
                (item) => item.id === formState.staff_role?.role_id
              )}
              options={roles}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="役割" />}
              onChange={(_, value) => {
                if (!value || !formState.staff_role) return;

                changeHandler<FormState["staff_role"]>("staff_role", {
                  ...formState.staff_role,
                  role_id: value.id,
                });
              }}
            />
          )}
        </Box>
        <Box>
          {staff ? (
            <Button
              variant="contained"
              onClick={() => {
                void clickSaveButtonHandler();
              }}
              sx={{ width: "150px" }}
            >
              保存
            </Button>
          ) : (
            <Button
              variant="contained"
              // onClick={handleCreate}
              onClick={() => {
                /* 処理なし */
              }}
              sx={{ width: "150px" }}
            >
              作成
            </Button>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};
export default StaffForm;
