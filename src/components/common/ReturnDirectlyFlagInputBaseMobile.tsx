import { Switch } from "@mui/material";
import ReturnDirectlyFlagInputBase from "./ReturnDirectlyFlagInputBase";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
  disabled?: boolean;
  onChangeFlag?: (checked: boolean) => void;
  label?: string;
  checkedValueName?: string;
}

export default function ReturnDirectlyFlagInputBaseMobile(props: Props) {
  return (
    <ReturnDirectlyFlagInputBase
      {...props}
      inputComponent={Switch}
      layout="inline"
    />
  );
}
