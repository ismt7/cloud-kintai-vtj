import React from "react";
import { Container, Typography, Box } from "@mui/material";
import dayjs from "dayjs";

const OfficePage: React.FC = () => {
  const currentDate = dayjs().format("YYYY-MM-DD");

  return (
    <Container>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          オフィスページ
        </Typography>
        <Typography variant="body1">本日は {currentDate} です。</Typography>
      </Box>
    </Container>
  );
};

export default OfficePage;
