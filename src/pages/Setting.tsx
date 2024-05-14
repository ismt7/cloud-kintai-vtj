import {
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import Title from "../components/Title/Title";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Layout";
import {
  mappingStaffRole,
  roleLabelMap,
  StaffType,
} from "../hooks/useStaffs/useStaffs";
import fetchStaff from "../hooks/useStaff/fetchStaff";
import dayjs from "dayjs";

export default function Setting() {
  const { cognitoUser } = useContext(AuthContext);
  const [staff, setStaff] = useState<StaffType | null | undefined>(undefined);

  useEffect(() => {
    if (!cognitoUser) return;

    fetchStaff(cognitoUser.id)
      .then((res) => {
        if (!res) return;

        setStaff({
          ...res,
          familyName: res.familyName,
          givenName: res.givenName,
          owner: res.owner ?? false,
          role: mappingStaffRole(res.role),
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  if (!cognitoUser || staff === undefined) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 2 }}>
      <Stack direction="column" spacing={2}>
        <Breadcrumbs>
          <Link href="/" color="inherit">
            TOP
          </Link>
          <Typography color="text.primary">個人設定</Typography>
        </Breadcrumbs>
        <Title>個人設定</Title>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: 200 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    名前
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {cognitoUser.familyName} {cognitoUser.givenName} さん
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    メールアドレス
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {cognitoUser.mailAddress}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    権限
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {staff?.role ? roleLabelMap.get(staff.role) : "未設定"}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    利用開始日
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {staff?.usageStartDate
                      ? dayjs(staff.usageStartDate).format("YYYY/MM/DD")
                      : "未設定"}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
}
