import { Avatar, IconButton } from "@mui/material";

export default function StaffIcon({ name }: { name: string | undefined }) {
  return (
    <IconButton aria-label="account">
      <Avatar>{name ? name.slice(0, 1) : ""}</Avatar>
    </IconButton>
  );
}
