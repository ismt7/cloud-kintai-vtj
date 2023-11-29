import {
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowParams,
  GridToolbarContainer,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Staff, StaffRole } from "../../../client";
import Title from "../../../components/Title/Title";
import useRoles from "../../../hooks/useRoles";
import useStaffRoles from "../../../hooks/useStaffRoles";
import useStaffs from "../../../hooks/useStaffs";
// eslint-disable-next-line import/no-cycle
import AdminStaffEditDialog from "./AdminStaffEditDialog";

type StaffInputs = {
  staffId: Staff["id"] | null;
  lastName: Staff["last_name"];
  firstName: Staff["first_name"];
  mailAddress: Staff["mail_address"];
  iconPath: Staff["icon_path"];
  createdAt: Staff["created_at"];
  updatedAt: Staff["updated_at"];
  staffRole: StaffRole | null;
};

export type AdminStaffInputs = {
  staffs: StaffInputs[];
};

const defaultValues: AdminStaffInputs = {
  staffs: [],
};
// const defaultValues: StaffInputs = {
//   lastName: "",
//   firstName: "",
//   mailAddress: "",
//   iconPath: "",
//   staffRole: null,
// };

export default function AdminStaff() {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  const { staffs, loading: staffLoading, error: staffError } = useStaffs();
  const {
    staffRoles,
    loading: staffRoleLoading,
    error: staffRoleError,
  } = useStaffRoles();
  const { roles, loading: roleLoading, error: roleError } = useRoles();

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [selectedStaffId, setSelectedStaffId] = useState<Staff["id"] | null>(
    null
  );

  const { register, control, setValue } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { fields: staffFields } = useFieldArray({
    control,
    name: "staffs",
  });

  useEffect(() => {
    if (staffLoading || staffRoleLoading) return;

    setValue(
      "staffs",
      staffs.map((staff) => ({
        staffId: staff.id,
        lastName: staff.last_name,
        firstName: staff.first_name,
        mailAddress: staff.mail_address,
        iconPath: staff.icon_path,
        createdAt: staff.created_at,
        updatedAt: staff.updated_at,
        staffRole:
          staffRoles.find((staffRole) => staffRole.staff_id === staff.id) ||
          null,
      }))
    );
  }, [staffLoading, staffRoleLoading, staffs, staffRoles]);

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  const customToolbar = () => (
    <GridToolbarContainer>
      <Button
        variant="text"
        size="small"
        disabled={true}
        startIcon={<AddCircleIcon />}
        onClick={() => {}}
      >
        スタッフ登録
      </Button>
    </GridToolbarContainer>
  );

  if (staffLoading || staffRoleLoading || roleLoading) {
    return <LinearProgress />;
  }

  if (staffError || staffRoleError || roleError) {
    return (
      <Typography variant="body1">
        データ取得中に予期せぬ問題が発生しました。管理者に連絡してください。
      </Typography>
    );
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ height: 1, pt: 2 }}>
        <Stack spacing={2}>
          <Title text="スタッフ一覧" />
          <DataGrid
            rows={staffFields}
            columns={[
              {
                field: "staffId",
                headerName: "スタッフID",
                width: 100,
                align: "right",
              },
              {
                field: "name",
                headerName: "名前",
                width: 200,
                valueGetter(
                  params: GridValueGetterParams<
                    FieldArrayWithId<AdminStaffInputs, "staffs", "id">
                  >
                ) {
                  const { lastName, firstName } = params.row;

                  return `${lastName || ""} ${firstName || ""}`;
                },
              },
              {
                field: "mailAddress",
                headerName: "メールアドレス",
                width: 200,
              },
              {
                field: "role",
                headerName: "権限",
                width: 200,
                valueGetter(
                  params: GridValueGetterParams<
                    FieldArrayWithId<AdminStaffInputs, "staffs", "id">
                  >
                ) {
                  const { staffRole } = params.row;
                  if (!staffRole) return "";

                  const { role_id: roleId } = staffRole;
                  const matchRole = roles.find((role) => role.id === roleId);
                  if (!matchRole) return "";

                  return matchRole.name;
                },
              },
              {
                field: "createdAt",
                headerName: "作成日時",
                width: 100,
                valueGetter(
                  params: GridValueGetterParams<
                    FieldArrayWithId<AdminStaffInputs, "staffs", "id">
                  >
                ) {
                  const { createdAt } = params.row;
                  if (!createdAt) return "";
                  return dayjs(createdAt).format("YYYY/MM/DD");
                },
              },
              {
                field: "updatedAt",
                headerName: "更新日時",
                width: 100,
                valueGetter(
                  params: GridValueGetterParams<
                    FieldArrayWithId<AdminStaffInputs, "staffs", "id">
                  >
                ) {
                  const { updatedAt } = params.row;
                  if (!updatedAt) return "";
                  return dayjs(updatedAt).format("YYYY/MM/DD");
                },
              },
              {
                field: "actions",
                headerName: "操作",
                type: "actions",
                sortable: false,
                getActions: (
                  params: GridRowParams<
                    FieldArrayWithId<AdminStaffInputs, "staffs", "id">
                  >
                ) => [
                  <GridActionsCellItem
                    key="edit"
                    label="編集"
                    icon={<EditIcon />}
                    onClick={() => {
                      setSelectedStaffId(params.row.staffId);
                      setEditDialogOpen(true);
                    }}
                  />,
                  <GridActionsCellItem
                    key="delete"
                    label="削除"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      const confirm = window.confirm("本当に削除しますか？");
                      if (confirm) {
                        console.log("削除処理");
                      }
                    }}
                  />,
                ],
              },
            ]}
            slots={{
              toolbar: customToolbar,
            }}
            autoHeight
          />
        </Stack>
      </Container>
      <AdminStaffEditDialog
        open={editDialogOpen}
        selectedStaffId={selectedStaffId}
        register={register}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedStaffId(null);
        }}
      />
    </>
  );
}
