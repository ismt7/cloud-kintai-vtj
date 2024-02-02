import {
  Chip,
  Grid,
  LinearProgress,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useDocuments from "../../hooks/useDocuments/useDocuments";

export default function ListDocument() {
  const {
    documents,
    loading: documentLoading,
    error: documentError,
  } = useDocuments();

  if (documentLoading) {
    return <LinearProgress />;
  }

  if (documentError) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ p: 5 }}>
      <Grid item xs={12}>
        <TextField label="キーワード" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <Link href="/docs/post">
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: 120,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddCircleIcon fontSize="large" color="success" />
          </Paper>
        </Link>
      </Grid>
      {documents.map((document, index) => (
        <Grid item xs={4} key={index}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Stack direction="column" spacing={2}>
              <Link href={`/docs/${document.id}`}>
                <Typography variant="body1">{document.title}</Typography>
              </Link>
              <Stack direction="row" spacing={1}>
                {document.targetRole ? (
                  (() => {
                    const targetRole = document.targetRole.filter(
                      (item): item is NonNullable<typeof item> => item !== null
                    );
                    return targetRole.map((role, i) => (
                      <Chip label={role} key={i} />
                    ));
                  })()
                ) : (
                  <Chip label={"すべて"} />
                )}
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
