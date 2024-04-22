import { Grid, Link, Stack, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import TrainIcon from "@mui/icons-material/Train";

export function LinkGridItem({
  url,
  title,
  iconType,
}: {
  url: string;
  title: string;
  iconType: string;
}) {
  const Icon = iconType === "train" ? TrainIcon : LinkIcon;

  return (
    <Grid item xs={4}>
      <Link href={url} target="_blank" color={"inherit"} underline="none">
        <Stack
          direction="column"
          spacing={0}
          alignItems="center"
          sx={{
            p: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <Icon fontSize="large" />
          <Typography variant="caption">{title}</Typography>
        </Stack>
      </Link>
    </Grid>
  );
}
