import { Typography } from "@mui/material";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <Typography
      variant="h4"
      sx={{ pl: 1, borderBottom: "solid 5px #0FA85E", color: "#0FA85E" }}
    >
      {text}
    </Typography>
  );
}
