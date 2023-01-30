import { createTheme, Link as MuiLink, ThemeProvider } from "@mui/material";

interface LinkProps {
  label?: string;
  href?: string;
  onClick?: () => void;
}

const palette = {
  primary: { main: "#0FA85E", contrastText: "#fff" },
};

const theme = createTheme({
  palette,
  typography: {
    fontFamily: ["Noto Sans JP"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Noto Sans JP';
          font-style: bold;
          font-weight: 700;
        }`,
    },
    MuiLink: {
      variants: [
        {
          props: { variant: "button", color: "primary" },
          style: {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
            textDecoration: "none",
            "&:hover": {
              backgroundColor: palette.primary.contrastText,
              color: palette.primary.main,
              textDecoration: "none",
            },
          },
        },
      ],
    },
  },
});

const Link = ({
  label = "link",
  href = "/",
  onClick = () => {},
  ...props
}: LinkProps) => (
  <ThemeProvider theme={theme}>
    <MuiLink
      href={href}
      variant="button"
      sx={{ p: 1, ...props }}
      onClick={onClick}
    >
      {label}
    </MuiLink>
  </ThemeProvider>
);
export default Link;
