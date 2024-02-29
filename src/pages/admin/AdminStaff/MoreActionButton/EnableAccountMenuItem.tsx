import PersonIcon from "@mui/icons-material/Person";
import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { StaffType } from "../../../../hooks/useStaffs/useStaffs";
import { UpdateStaffInput } from "../../../../API";
import { useDispatch } from "react-redux";
import enableStaff from "../../../../hooks/common/enableStaff";
import { setSnackbarSuccess } from "../../../../lib/reducers/snackbarReducer";
import * as MESSAGE_CODE from "../../../../errors";
import { useState } from "react";

export function EnableAccountMenuItem({
  staff,
  updateStaff,
}: {
  staff: StaffType;
  updateStaff: (input: UpdateStaffInput) => Promise<void>;
}) {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const { id, cognitoUserId } = staff;

  const handleClick = async () => {
    setIsProcessing(true);
    await enableStaff(cognitoUserId).catch(() => {
      dispatch(setSnackbarSuccess(MESSAGE_CODE.E12001));
      setIsProcessing(false);
      throw new Error(MESSAGE_CODE.E12001);
    });

    await updateStaff({
      id: id,
      enabled: true,
    })
      .then(() => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.S12001));
      })
      .catch(() => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.E12001));
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        {isProcessing ? (
          <CircularProgress size={18} />
        ) : (
          <PersonIcon fontSize="small" />
        )}
      </ListItemIcon>
      <ListItemText>アカウントを有効化</ListItemText>
    </MenuItem>
  );
}
