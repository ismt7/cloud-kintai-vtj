import { Box, Typography } from "@mui/material";

const Footer = () => (
  <footer
    style={{
      backgroundColor: "#0FA85E",
    }}
  >
    <Box textAlign="center" sx={{ p: 1 }}>
      <Typography variant="body1" color="white">
        © 2024 Virtual VirtualTech Japan Inc. All rights reserved.
      </Typography>
    </Box>
  </footer>
);

export default Footer;
