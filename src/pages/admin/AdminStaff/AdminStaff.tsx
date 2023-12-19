import {
  Button,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  DataGrid,
  GridToolbarContainer,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../../components/Title/Title";
import { Staff } from "../../../hooks/useStaffs/common";
import useStaffs from "../../../hooks/useStaffs/useStaffs";

// const defaultValues: Staff = {
//   sub: "",
//   givenName: "",
//   familyName: "",
//   email: "",
// };

export default function AdminStaff() {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  const { staffs, loading: staffLoading, error: staffError } = useStaffs();

  // const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  // const [selectedStaffId, setSelectedStaffId] = useState<Staff["id"] | null>(
  //   null
  // );

  // const { register } = useForm<Staff>({
  //   mode: "onChange",
  //   defaultValues,
  // });

  // const { fields: staffFields } = useFieldArray({
  //   control,
  //   name: "staffs",
  // });

  // useEffect(() => {
  //   if (staffLoading || staffRoleLoading) return;

  //   // setValue(
  //   //   "staffs",
  //   //   staffs.map((staff) => ({
  //   //     staffId: staff.id,
  //   //     lastName: staff.last_name,
  //   //     firstName: staff.first_name,
  //   //     mailAddress: staff.mail_address,
  //   //     iconPath: staff.icon_path,
  //   //     createdAt: staff.created_at,
  //   //     updatedAt: staff.updated_at,
  //   //     staffRole:
  //   //       staffRoles.find((staffRole) => staffRole.staff_id === staff.id) ||
  //   //       null,
  //   //   }))
  //   );
  // }, [staffLoading, staffRoleLoading, staffs, staffRoles]);

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

  if (staffLoading) {
    return <LinearProgress />;
  }

  if (staffError) {
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
            rows={staffs}
            columns={[
              {
                field: "sub",
                headerName: "スタッフID",
                width: 300,
              },
              {
                field: "name",
                headerName: "名前",
                width: 200,
                valueGetter(params: GridValueGetterParams<Staff>) {
                  const { givenName, familyName } = params.row;

                  if (!givenName && !familyName) return "(未設定)";

                  if (!givenName || !familyName) {
                    return givenName || familyName;
                  }

                  return `${familyName} ${givenName}`;
                },
              },
              {
                field: "mailAddress",
                headerName: "メールアドレス",
                width: 200,
              },
              // {
              //   field: "actions",
              //   headerName: "操作",
              //   type: "actions",
              //   sortable: false,
              //   getActions: (
              //     params: GridRowParams<
              //       FieldArrayWithId<AdminStaffInputs, "staffs", "id">
              //     >
              //   ) => [
              //     <GridActionsCellItem
              //       key="edit"
              //       label="編集"
              //       icon={<EditIcon />}
              //       onClick={() => {
              //         setSelectedStaffId(params.row.staffId);
              //         setEditDialogOpen(true);
              //       }}
              //     />,
              //     <GridActionsCellItem
              //       key="delete"
              //       label="削除"
              //       icon={<DeleteIcon />}
              //       onClick={() => {
              //         const confirm = window.confirm("本当に削除しますか？");
              //         if (confirm) {
              //           console.log("削除処理");
              //         }
              //       }}
              //     />,
              //   ],
              // },
            ]}
            getRowId={(row) => row.sub}
            slots={{
              toolbar: customToolbar,
            }}
            autoHeight
          />
        </Stack>
      </Container>
      {/* <AdminStaffEditDialog
        open={editDialogOpen}
        selectedStaffId={selectedStaffId}
        register={register}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedStaffId(null);
        }}
      /> */}
    </>
  );
}
