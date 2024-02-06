import { Box, Link } from "@mui/material";

import LogoImage from "../../images/logo.png";

export default function Logo() {
  return (
    <Box
      sx={{
        height: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <img
          src={LogoImage}
          alt="クラウド勤怠のロゴ"
          style={{ height: "100%" }}
        />
      </Link>
    </Box>
  );
}
