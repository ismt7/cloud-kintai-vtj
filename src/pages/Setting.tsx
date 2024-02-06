import {
  Breadcrumbs,
  Container,
  LinearProgress,
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
import useCognitoUser from "../hooks/useCognitoUser";

export default function Setting() {
  const { cognitoUser, loading: cognitoUserLoading } = useCognitoUser();

  if (cognitoUserLoading || cognitoUser === undefined) {
    return <LinearProgress />;
  }

  if (cognitoUser === null) {
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
        <Title text="個人設定" />
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
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
}
