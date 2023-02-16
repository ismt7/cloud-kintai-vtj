import {
  createTheme,
  Link as MuiLink,
  SxProps,
  Theme,
  ThemeProvider,
} from "@mui/material";

interface LinkProps {
  label?: string;
  href?: string;
  color?: "primary" | "secondary";
  sx?: SxProps<Theme> | undefined;
  onClick?: () => void;
}

const palette = {
  primary: { main: "#0FA85E", contrastText: "#fff" },
  secondary: { main: "#fff", contrastText: "#0FA85E" },
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
        {
          props: { variant: "button", color: "secondary" },
          style: {
            backgroundColor: palette.secondary.main,
            color: palette.secondary.contrastText,
            textDecoration: "none",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: palette.secondary.contrastText,
              color: palette.secondary.main,
              textDecoration: "none",
              borderRadius: "5px",
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
  color = "primary",
  onClick = () => {},
  sx = {},
}: LinkProps) => (
  <ThemeProvider theme={theme}>
    <MuiLink
      href={href}
      variant="button"
      color={color}
      sx={sx}
      onClick={onClick}
    >
      {label}
    </MuiLink>
  </ThemeProvider>
);
export default Link;
