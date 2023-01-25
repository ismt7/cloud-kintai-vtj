import { Button as MuiButton, createTheme, ThemeProvider } from "@mui/material";
import "./button.css";

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
  | "clock_out";
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
  }

  interface PaletteOptions {
    cancel?: PaletteOptions["error"];
    rest?: PaletteOptions["primary"];
    clock_in?: PaletteOptions["primary"];
    clock_out?: PaletteOptions["error"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    cancel: true;
    rest: true;
    clock_in: true;
    clock_out: true;
  }

  interface ButtonPropsVariantOverrides {
    cancel: true;
    rest: true;
    clock_in: true;
    clock_out: true;
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
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
            boxShadow: "none",
            border: `3px solid ${palette.primary.main}`,
            "&:hover": {
              backgroundColor: palette.primary.contrastText,
              color: palette.primary.main,
              border: `3px solid ${palette.primary.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid",
            },
          },
        },
        {
          props: { variant: "contained", color: "cancel" },
          style: {
            backgroundColor: palette.cancel.main,
            color: palette.cancel.contrastText,
            boxShadow: "none",
            border: `3px solid ${palette.cancel.main}`,
            "&:hover": {
              backgroundColor: palette.cancel.contrastText,
              color: palette.cancel.main,
              border: "3px solid",
              boxShadow: "none",
            },
          },
        },
        {
          props: { variant: "contained", color: "rest" },
          style: {
            backgroundColor: palette.rest.main,
            color: palette.rest.contrastText,
            boxShadow: "none",
            border: `3px solid ${palette.rest.main}`,
            "&:hover": {
              backgroundColor: palette.rest.contrastText,
              color: palette.rest.main,
              border: `3px solid ${palette.rest.main}`,
              boxShadow: "none",
            },
            "&:disabled": {
              border: "3px solid",
            },
          },
        },
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

  ...props
}: ButtonProps) => (
  <ThemeProvider theme={theme}>
    <MuiButton
      color={color}
      variant={variant}
      disabled={disabled}
      size={size}
      style={{ ...props }}
    >
      {label}
    </MuiButton>
  </ThemeProvider>
);

export default Button;
