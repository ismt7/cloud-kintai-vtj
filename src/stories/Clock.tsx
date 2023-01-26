import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Noto Sans JP';
          font-style: bold;
          font-weight: 700;
        }`,
    },
  },
});

const Clock = () => {
  const [time, setTime] = React.useState(dayjs().format("YYYY/MM/DD HH:mm:ss"));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("YYYY/MM/DD HH:mm:ss"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="black" textAlign="center" sx={{ p: 3 }} borderRadius="5px">
        <Typography variant="h4" color="white">
          {time}
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Clock;
