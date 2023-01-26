import { Button as MuiButton, createTheme, ThemeProvider } from "@mui/material";

type Color =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "cancel"
  | "rest"
  | "clock_in"
  | "clock_out"
  | "login"
  | "logout";
type Variant = "text" | "outlined" | "contained";
type Size = "small" | "medium" | "large";

interface ButtonProps {
  color?: Color;
  variant?: Variant;
  disabled?: boolean;
  size?: Size;
  label?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  onClick?: () => void;
}

declare module "@mui/material/styles" {
  interface Palette {
    cancel: Palette["error"];
    rest: Palette["primary"];
    clock_in: Palette["primary"];
    clock_out: Palette["error"];
    login: Palette["primary"];
    logout: Palette["error"];
  }

  interface PaletteOptions {
    cancel?: PaletteOptions["error"];
    rest?: PaletteOptions["primary"];
    clock_in?: PaletteOptions["primary"];
    clock_out?: PaletteOptions["error"];
    login?: PaletteOptions["primary"];
    logout?: PaletteOptions["error"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    cancel: true;
    rest: true;
    clock_in: true;
    clock_out: true;
    login: true;
    logout: true;
  }

  interface ButtonPropsVariantOverrides {
    cancel: true;
    rest: true;
    clock_in: true;
    clock_out: true;
    login: true;
    logout: true;
  }
}

const palette = {
  primary: { main: "#0FA85E", contrastText: "#fff" },
  secondary: { main: "#B33D47", contrastText: "#fff" },
  success: { main: "#0FA85E", contrastText: "#fff" },
  error: { main: "#B33D47", contrastText: "#fff" },
  warning: { main: "#B33D47", contrastText: "#fff" },
  cancel: { main: "#B33D47", contrastText: "#fff" },
  rest: { main: "#2ACEDB", contrastText: "#fff" },
  clock_in: { main: "#0FA85E", contrastText: "#fff" },
  clock_out: { main: "#B33D47", contrastText: "#fff" },
  login: { main: "#0FA85E", contrastText: "#fff" },
  logout: { main: "#B33D47", contrastText: "#fff" },
};

const useMuiButtonVariant = (
  main_color: string,
  sub_color: string,
  variant_name: Variant,
  color_name: Color
) => ({
  props: { variant: variant_name, color: color_name },
  style: {
    backgroundColor: variant_name === "contained" ? main_color : sub_color,
    color: variant_name === "contained" ? sub_color : main_color,
    boxShadow: "none",
    border: `3px solid ${main_color}`,
    "&:hover": {
      backgroundColor: variant_name === "contained" ? sub_color : main_color,
      color: variant_name === "contained" ? main_color : sub_color,
      border: `3px solid ${main_color}`,
      boxShadow: "none",
    },
    "&:disabled": {
      border: "3px solid #E0E0E0",
    },
  },
});

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
    MuiButton: {
      variants: [
        useMuiButtonVariant(
          palette.primary.main,
          palette.primary.contrastText,
          "contained",
          "primary"
        ),
        useMuiButtonVariant(
          palette.cancel.main,
          palette.cancel.contrastText,
          "contained",
          "cancel"
        ),
        useMuiButtonVariant(
          palette.rest.main,
          palette.rest.contrastText,
          "contained",
          "rest"
        ),
        {
          props: { variant: "outlined", color: "clock_in", size: "large" },
          style: {
            backgroundColor: palette.clock_in.contrastText,
            color: palette.clock_in.main,
            boxShadow: "none",
            border: `3px solid ${palette.clock_in.main}`,
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            "&:hover": {
              backgroundColor: palette.clock_in.main,
              color: palette.clock_in.contrastText,
              border: `3px solid ${palette.clock_in.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid",
            },
          },
        },
        {
          props: { variant: "contained", color: "clock_in", size: "large" },
          style: {
            backgroundColor: palette.clock_in.main,
            color: palette.clock_in.contrastText,
            boxShadow: "none",
            border: `3px solid ${palette.clock_in.main}`,
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            "&:hover": {
              backgroundColor: palette.clock_in.contrastText,
              color: palette.clock_in.main,
              border: `3px solid ${palette.clock_in.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid",
            },
          },
        },
        useMuiButtonVariant(
          palette.clock_in.main,
          palette.clock_in.contrastText,
          "contained",
          "clock_in"
        ),
        {
          props: { variant: "text", color: "clock_in" },
          style: {
            backgroundColor: palette.clock_in.contrastText,
            color: palette.clock_in.main,
            boxShadow: "none",
            border: `3px solid ${palette.clock_in.contrastText}`,
            "&:hover": {
              backgroundColor: palette.clock_in.main,
              color: palette.clock_in.contrastText,
              border: `3px solid ${palette.clock_in.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid",
            },
          },
        },
        {
          props: { variant: "outlined", color: "clock_out", size: "large" },
          style: {
            backgroundColor: palette.clock_out.contrastText,
            color: palette.clock_out.main,
            boxShadow: "none",
            border: `3px solid ${palette.clock_out.main}`,
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            "&:hover": {
              backgroundColor: palette.clock_out.main,
              color: palette.clock_out.contrastText,
              border: `3px solid ${palette.clock_out.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid",
            },
          },
        },
        {
          props: { variant: "contained", color: "clock_out", size: "large" },
          style: {
            backgroundColor: palette.clock_out.main,
            color: palette.clock_out.contrastText,
            boxShadow: "none",
            border: `3px solid ${palette.clock_out.main}`,
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            "&:hover": {
              backgroundColor: palette.clock_out.contrastText,
              color: palette.clock_out.main,
              border: `3px solid ${palette.clock_out.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid",
            },
          },
        },
        useMuiButtonVariant(
          palette.clock_out.main,
          palette.clock_out.contrastText,
          "contained",
          "clock_out"
        ),
        {
          props: { variant: "text", color: "clock_out" },
          style: {
            backgroundColor: palette.clock_out.contrastText,
            color: palette.clock_out.main,
            boxShadow: "none",
            border: `3px solid ${palette.clock_out.contrastText}`,
            "&:hover": {
              backgroundColor: palette.clock_out.main,
              color: palette.clock_out.contrastText,
              border: `3px solid ${palette.clock_out.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid",
            },
          },
        },
        {
          props: { variant: "text", color: "rest" },
          style: {
            backgroundColor: palette.rest.contrastText,
            color: palette.rest.main,
            boxShadow: "none",
            border: `3px solid ${palette.rest.contrastText}`,
            "&:hover": {
              backgroundColor: palette.rest.main,
              color: palette.rest.contrastText,
              border: `3px solid ${palette.rest.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid #E0E0E0",
            },
          },
        },
        {
          props: { variant: "outlined", color: "login" },
          style: {
            backgroundColor: palette.login.contrastText,
            color: palette.login.main,
            boxShadow: "none",
            border: "3px solid white",
            "&:hover": {
              backgroundColor: palette.login.main,
              color: palette.login.contrastText,
              border: "3px solid white",
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid #E0E0E0",
            },
          },
        },
        useMuiButtonVariant(
          palette.logout.main,
          palette.logout.contrastText,
          "contained",
          "logout"
        ),
        useMuiButtonVariant(
          palette.logout.main,
          palette.logout.contrastText,
          "outlined",
          "logout"
        ),
      ],
    },
  },
});

const Button = ({
  color = "primary",
  variant = "contained",
  disabled = false,
  size = "medium",
  label = "Button",

  onClick = () => {},
  ...props
}: ButtonProps) => (
  <ThemeProvider theme={theme}>
    <MuiButton
      color={color}
      variant={variant}
      disabled={disabled}
      size={size}
      onClick={onClick}
      style={{ ...props }}
    >
      {label}
    </MuiButton>
  </ThemeProvider>
);

export default Button;
