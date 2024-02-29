import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Box,
  Breadcrumbs,
  Container,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatchV2 } from "../../../app/hooks";
import Title from "../../../components/Title/Title";
import * as MESSAGE_CODE from "../../../errors";
import useCognitoUser from "../../../hooks/useCognitoUser";
import useStaffs from "../../../hooks/useStaffs/useStaffs";
import { setSnackbarError } from "../../../lib/reducers/snackbarReducer";
import CreateStaffDialog from "./CreateStaffDialog";
import SyncCognitoUser from "./SyncCognitoUser";
import { StaffNameTableCell } from "./StaffNameTableCell";
import { AccountStatusTableCell } from "./AccountStatusTableCell";
import { StatusTableCell } from "./StatusTableCell";
import { RoleTableCell } from "./RoleTableCell";
import { CreatedAtTableCell } from "./CreatedAtTableCell";
import { UpdatedAtTableCell } from "./UpdatedAtTableCell";
import { EditButton } from "./EditButton";
import { MoreActionButton } from "./MoreActionButton/MoreActionButton";
import "./styles.scss";

export default function AdminStaff() {
  const { route } = useAuthenticator();
  const navigate = useNavigate();
  const dispatch = useAppDispatchV2();

  const { cognitoUser, loading: cognitoUserLoading } = useCognitoUser();

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

  if (staffLoading || cognitoUserLoading) {
    return <LinearProgress />;
  }

  if (staffError || cognitoUser === null) {
    dispatch(setSnackbarError(MESSAGE_CODE.E00001));
    return null;
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
          <Stack direction="row" spacing={2}>
            <CreateStaffDialog
              staffs={staffs}
              refreshStaff={refreshStaff}
              createStaff={createStaff}
              updateStaff={updateStaff}
            />
            <SyncCognitoUser
              staffs={staffs}
              refreshStaff={refreshStaff}
              createStaff={createStaff}
              updateStaff={updateStaff}
            />
          </Stack>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>アカウント状態</TableCell>
                  <TableCell>ステータス</TableCell>
                  <TableCell>名前</TableCell>
                  <TableCell>メールアドレス</TableCell>
                  <TableCell>権限</TableCell>
                  <TableCell>作成日時</TableCell>
                  <TableCell>更新日時</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffs.map((staff, index) => (
                  <TableRow key={index} className="table-row">
                    <TableCell>
                      <Stack direction="row" spacing={0}>
                        <EditButton staff={staff} />
                        <MoreActionButton
                          staff={staff}
                          updateStaff={updateStaff}
                          deleteStaff={deleteStaff}
                        />
                      </Stack>
                    </TableCell>
                    <AccountStatusTableCell staff={staff} />
                    <StatusTableCell staff={staff} />
                    <StaffNameTableCell staff={staff} />
                    <TableCell>{staff.mailAddress}</TableCell>
                    <RoleTableCell staff={staff} />
                    <CreatedAtTableCell staff={staff} />
                    <UpdatedAtTableCell staff={staff} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </>
  );
}
