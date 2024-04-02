import { Grid, TextField } from "@mui/material";

export function SearchGrid({
  setSearchKeyword,
}: {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Grid item xs={12}>
      <TextField
        label="キーワード"
        fullWidth
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </Grid>
  );
}
