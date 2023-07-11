// cspell:words testid
import { Button as MuiButton } from "@mui/material";

import { Color, Variant } from "../../lib/theme";

type Size = "small" | "medium" | "large";

export interface ButtonProps {
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
