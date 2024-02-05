import { Button, styled } from "@mui/material";
import { useEffect, useState } from "react";

import { WorkStatus, WorkStatusCodes } from "../common";

const GoDirectlyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.clock_in.main,
  "&:hover": {
    color: theme.palette.clock_in.contrastText,
    backgroundColor: theme.palette.clock_in.main,
  },
  "&:disabled": {
    backgroundColor: "#E0E0E0",
  },
}));

export default function GoDirectlyItem({
  workStatus,
  onClick,
}: {
  workStatus: WorkStatus | null;
  onClick: () => void;
}) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(workStatus?.code !== WorkStatusCodes.BEFORE_WORK);
  }, [workStatus]);

  return (
    <GoDirectlyButton
      onClick={() => {
        setDisabled(true);
        onClick();
      }}
      disabled={disabled}
    >
      直行
    </GoDirectlyButton>
  );
}
