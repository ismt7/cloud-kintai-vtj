import { Typography } from "@mui/material";

export default function Title({ text }: { text: string }) {
  return (
    <Typography
      variant="h4"
      sx={{ pl: 1, borderBottom: "solid 5px #0FA85E", color: "#0FA85E" }}
    >
      {text}
    </Typography>
  );
}
