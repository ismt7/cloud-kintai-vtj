import { useAuthenticator } from "@aws-amplify/ui-react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import {
  Box,
  Breadcrumbs,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowParams,
  GridToolbarContainer,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatchV2 } from "../../../app/hooks";
import Title from "../../../components/Title/Title";
import {
  E10004,
  E11001,
  E12001,
  S10004,
  S11001,
  S12001,
} from "../../../errors";
import deleteCognitoUser from "../../../hooks/common/deleteCognitoUser";
import disableStaff from "../../../hooks/common/disableStaff";
import enableStaff from "../../../hooks/common/enableStaff";
import { StaffRole } from "../../../hooks/useStaffs/common";
import useStaffs, { StaffType } from "../../../hooks/useStaffs/useStaffs";
import { setSnackbarSuccess } from "../../../lib/reducers/snackbarReducer";
import CreateStaffDialog from "./CreateStaffDialog";
import SyncCognitoUser from "./SyncCognitoUser";

export default function AdminStaff() {
  const { route } = useAuthenticator();
  const navigate = useNavigate();
  const dispatch = useAppDispatchV2();

  const {
    staffs,
    loading: staffLoading,
    error: staffError,
    refreshStaff,
    createStaff,
    updateStaff,
    deleteStaff,
  } = useStaffs();

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  const customToolbar = () => (
    <GridToolbarContainer>
      <CreateStaffDialog refreshStaff={refreshStaff} />
      <SyncCognitoUser
        staffs={staffs}
        refreshStaff={refreshStaff}
        createStaff={createStaff}
        updateStaff={updateStaff}
      />
    </GridToolbarContainer>
  );

  const renderErrorMessage = () => (
    <Typography variant="body1">
      データ取得中に予期せぬ問題が発生しました。管理者に連絡してください。
    </Typography>
  );

  if (staffLoading) {
    return <LinearProgress />;
  }

  if (staffError) {
    return renderErrorMessage();
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ height: 1, pt: 2 }}>
        <Stack spacing={2}>
          <Box>
            <Breadcrumbs>
              <Link to="/" color="inherit">
                TOP
              </Link>
              <Typography color="text.primary">スタッフ一覧</Typography>
            </Breadcrumbs>
          </Box>
          <Title text="スタッフ一覧" />
          <DataGrid
            rows={staffs}
            columns={[
              {
                field: "actions",
                headerName: "操作",
                type: "actions",
                sortable: false,
                getActions: (params: GridRowParams<StaffType>) => [
                  <GridActionsCellItem
                    key="edit"
                    label="編集"
                    icon={<EditIcon />}
                    onClick={() => {
                      navigate(`/admin/staff/${params.id}/edit`);
                    }}
                  />,
                  <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon />}
                    label="アカウントを削除する"
                    showInMenu
                    onClick={() => {
                      // eslint-disable-next-line no-alert
                      const result = window.confirm(
                        "削除すると元に戻せません。本当に削除しますか？"
                      );
                      if (result) {
                        void deleteCognitoUser(params.row.cognitoUserId)
                          .then(() => {
                            deleteStaff({
                              id: params.row.id,
                            })
                              .then(() => {
                                dispatch(setSnackbarSuccess(S10004));
                              })
                              .catch(() => {
                                dispatch(setSnackbarSuccess(E10004));
                              });
                          })
                          .catch(() => dispatch(setSnackbarSuccess(E10004)));
                      }
                    }}
                  />,
                  (() => {
                    if (!params.row.enabled) {
                      return (
                        <GridActionsCellItem
                          key="enable"
                          icon={<PersonIcon />}
                          label="アカウントを有効にする"
                          showInMenu
                          onClick={() => {
                            void enableStaff(params.row.cognitoUserId)
                              .then(() => {
                                updateStaff({
                                  id: params.row.id,
                                  enabled: true,
                                })
                                  .then(() => {
                                    dispatch(setSnackbarSuccess(S12001));
                                  })
                                  .catch(() => {
                                    dispatch(setSnackbarSuccess(E12001));
                                  });
                              })
                              .catch(() => {
                                dispatch(setSnackbarSuccess(E12001));
                              });
                          }}
                        />
                      );
                    }

                    return (
                      <GridActionsCellItem
                        key="disable"
                        icon={<PersonOffIcon />}
                        label="アカウントを無効にする"
                        showInMenu
                        onClick={() => {
                          void disableStaff(params.row.cognitoUserId)
                            .then(() => {
                              updateStaff({
                                id: params.row.id,
                                enabled: false,
                              })
                                .then(() => {
                                  dispatch(setSnackbarSuccess(S11001));
                                })
                                .catch(() => {
                                  dispatch(setSnackbarSuccess(E11001));
                                });
                            })
                            .catch(() => {
                              dispatch(setSnackbarSuccess(E11001));
                            });
                        }}
                      />
                    );
                  })(),
                ],
              },
              {
                field: "enabled",
                headerName: "アカウント状態",
                width: 150,
                valueGetter(params: GridValueGetterParams<StaffType>) {
                  const { enabled } = params.row;

                  if (enabled) return "有効";

                  return "無効";
                },
              },
              {
                field: "status",
                headerName: "ステータス",
                width: 200,
                valueGetter(params: GridValueGetterParams<StaffType>) {
                  const { status } = params.row;

                  if (!status) return "(未設定)";

                  switch (status) {
                    case "CONFIRMED":
                      return "確認済み";
                    case "FORCE_CHANGE_PASSWORD":
                      return "パスワード変更必要";
                    default:
                      return status;
                  }
                },
              },
              {
                field: "name",
                headerName: "名前",
                width: 200,
                valueGetter(params: GridValueGetterParams<StaffType>) {
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
                width: 300,
              },
              {
                field: "role",
                headerName: "権限",
                width: 200,
                valueGetter(params: GridValueGetterParams<StaffType>) {
                  const { role } = params.row;
                  if (!role) return "(未設定)";

                  switch (role) {
                    case StaffRole.ADMIN:
                      return "管理者";
                    case StaffRole.STAFF_ADMIN:
                      return "スタッフ管理者";
                    case StaffRole.STAFF:
                      return "スタッフ";
                    default:
                      return "(未設定)";
                  }
                },
              },
              {
                field: "createdAt",
                headerName: "作成日時",
                width: 200,
                valueGetter(params: GridValueGetterParams<StaffType>) {
                  const { createdAt } = params.row;

                  if (!createdAt) return "(未設定)";

                  return dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss");
                },
              },
              {
                field: "updatedAt",
                headerName: "更新日時",
                width: 200,
                valueGetter(params: GridValueGetterParams<StaffType>) {
                  const { updatedAt } = params.row;

                  if (!updatedAt) return "(未設定)";

                  return dayjs(updatedAt).format("YYYY/MM/DD HH:mm:ss");
                },
              },
            ]}
            getRowId={(row) => row.cognitoUserId}
            slots={{
              toolbar: customToolbar,
            }}
            autoHeight
          />
        </Stack>
      </Container>
    </>
  );
}
