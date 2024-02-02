import { useState, useEffect } from "react";
import { Button, styled } from "@mui/material";
import { WorkStatus, WorkStatusCodes } from "../common";

const ReturnDirectlyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.clock_out.main,
  "&:hover": {
    color: theme.palette.clock_out.contrastText,
    backgroundColor: theme.palette.clock_out.main,
  },
  "&:disabled": {
    backgroundColor: "#E0E0E0",
  },
}));

export default function ReturnDirectly({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(workStatus?.code !== WorkStatusCodes.WORKING);
  }, [workStatus]);

  return (
    <ReturnDirectlyButton
      onClick={() => {
        setDisabled(true);
        onClick();
      }}
      disabled={disabled}
    >
      直帰
    </ReturnDirectlyButton>
  );
}
