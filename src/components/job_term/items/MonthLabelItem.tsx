import { Typography } from "@mui/material";

interface MonthLabelItemProps {
  targetMonth: string;
}

export default function MonthLabelItem({ targetMonth }: MonthLabelItemProps) {
  return <Typography variant="body1">{targetMonth.substring(2)}月</Typography>;
}
