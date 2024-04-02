import PersonIcon from "@mui/icons-material/Person";
import { Chip, Grid, Stack, Typography } from "@mui/material";

export function FilterGrid() {
  return (
    <Grid item xs={12}>
      <Stack direction="row" spacing={1}>
        <Typography variant="body1">フィルター：</Typography>
        <Chip
          label="すべて"
          color="primary"
          icon={<PersonIcon fontSize="small" />}
        />
        <Chip
          label="スタッフ"
          color="primary"
          icon={<PersonIcon fontSize="small" />}
          variant="outlined"
        />
        <Chip
          label="管理者"
          color="primary"
          icon={<PersonIcon fontSize="small" />}
          variant="outlined"
        />
      </Stack>
    </Grid>
  );
}
