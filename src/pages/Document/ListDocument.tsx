import { Grid, LinearProgress, Link, Typography } from "@mui/material";
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
    <Grid container spacing={2}>
      {documents.map((document, index) => (
        <Grid item xs={12} key={index}>
          <Link href={`/docs/${document.id}`} target="_blank">
            <Typography variant="body1">{document.title}</Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
