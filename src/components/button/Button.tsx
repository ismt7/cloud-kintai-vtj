import { Button as MuiButton } from "@mui/material";
import { Color, Variant } from "../../lib/theme";

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

const Button = ({
  color = "primary",
  variant = "contained",
  disabled = false,
  size = "medium",
  label = "Button",

  onClick = () => {},
  ...props
}: ButtonProps) => (
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
);

export default Button;
