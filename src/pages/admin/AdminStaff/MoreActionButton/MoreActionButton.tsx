import DeleteIcon from "@mui/icons-material/Delete";
import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StaffType } from "../../../../hooks/useStaffs/useStaffs";
import { DeleteStaffInput, UpdateStaffInput } from "../../../../API";
import { DisableAccountMenuItem } from "./DisableAccountMenuItem";
import { EnableAccountMenuItem } from "./EnableAccountMenuItem";
import deleteCognitoUser from "../../../../hooks/common/deleteCognitoUser";
import { useDispatch } from "react-redux";
import { setSnackbarSuccess } from "../../../../lib/reducers/snackbarReducer";
import * as MESSAGE_CODE from "../../../../errors";

export function MoreActionButton({
  staff,
  updateStaff,
  deleteStaff,
}: {
  staff: StaffType;
  updateStaff: (input: UpdateStaffInput) => Promise<void>;
  deleteStaff: (input: DeleteStaffInput) => Promise<void>;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { enabled: accountEnabled } = staff;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {accountEnabled ? (
          <DisableAccountMenuItem staff={staff} updateStaff={updateStaff} />
        ) : (
          <EnableAccountMenuItem staff={staff} updateStaff={updateStaff} />
        )}
        <DeleteAccountMenuItem staff={staff} deleteStaff={deleteStaff} />
      </Menu>
    </>
  );
}

function DeleteAccountMenuItem({
  staff,
  deleteStaff,
}: {
  staff: StaffType;
  deleteStaff: (input: DeleteStaffInput) => Promise<void>;
}) {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    setIsProcessing(true);
    const { id, cognitoUserId, familyName, givenName } = staff;

    const deleteMessage = (() => {
      const messages = [];
      messages.push(`「${familyName} ${givenName}」のアカウントを削除します。`);
      messages.push(
        "削除すると元に戻せないことを理解した上で、削除処理を実行しますか?"
      );
      return messages.join("\n");
    })();
    // eslint-disable-next-line no-alert
    const result = window.confirm(deleteMessage);
    if (!result) {
      return;
    }

    await deleteCognitoUser(cognitoUserId)
      .catch(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.E10004)))
      .finally(() => {
        setIsProcessing(false);
      });

    await deleteStaff({
      id,
    })
      .then(() => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.S10004));
      })
      .catch(() => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.E10004));
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
          <DeleteIcon fontSize="small" />
        )}
      </ListItemIcon>
      <ListItemText>アカウントを削除</ListItemText>
    </MenuItem>
  );
}
