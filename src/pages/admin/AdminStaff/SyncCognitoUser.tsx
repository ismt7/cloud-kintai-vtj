import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";

import { CreateStaffInput, UpdateStaffInput } from "../../../API";
import { useAppDispatchV2 } from "../../../app/hooks";
import * as MESSAGE_CODE from "../../../errors";
import fetchCognitoUsers from "../../../hooks/common/fetchCognitoUsers";
import { StaffType } from "../../../hooks/useStaffs/useStaffs";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../lib/reducers/snackbarReducer";

export default function SyncCognitoUser({
  staffs,
  refreshStaff,
  createStaff,
  updateStaff,
}: {
  staffs: StaffType[];
  refreshStaff: () => Promise<void>;
  createStaff: (input: CreateStaffInput) => Promise<void>;
  updateStaff: (input: UpdateStaffInput) => Promise<void>;
}) {
  const dispatch = useAppDispatchV2();
  const [cognitoUserLoading, setCognitoUserLoading] = useState(false);

  const handleSyncCognitoUser = async () => {
    setCognitoUserLoading(true);
    const cognitoUsers = await fetchCognitoUsers().catch(() => {
      dispatch(setSnackbarError(MESSAGE_CODE.E05005));
      return null;
    });

    if (!cognitoUsers) {
      return;
    }

    await Promise.all(
      cognitoUsers.map(async (cognitoUser) => {
        const isExistStaff = staffs.find(
          (staff) => staff.cognitoUserId === cognitoUser.sub
        );

        if (isExistStaff) {
          await updateStaff({
            id: isExistStaff.id,
            cognitoUserId: cognitoUser.sub,
            familyName: cognitoUser.familyName,
            givenName: cognitoUser.givenName,
            mailAddress: cognitoUser.mailAddress,
            role: cognitoUser.roles[0],
            enabled: cognitoUser.enabled,
            status: cognitoUser.status,
            owner: cognitoUser.owner,
          }).catch((e) => {
            throw e;
          });
          return;
        }

        await createStaff({
          cognitoUserId: cognitoUser.sub,
          familyName: cognitoUser.familyName,
          givenName: cognitoUser.givenName,
          mailAddress: cognitoUser.mailAddress,
          role: cognitoUser.roles[0],
          enabled: cognitoUser.enabled,
          status: cognitoUser.status,
          owner: cognitoUser.owner,
        }).catch((e) => {
          throw e;
        });
      })
    )
      .then(async () => {
        await refreshStaff()
          .then(() => {
            dispatch(setSnackbarSuccess(MESSAGE_CODE.S05005));
          })
          .catch(() => {
            dispatch(setSnackbarError(MESSAGE_CODE.E05001));
          });
      })
      .catch((e) => {
        dispatch(setSnackbarError(MESSAGE_CODE.E05005));
        throw e;
      })
      .finally(() => {
        setCognitoUserLoading(false);
      });
  };

  return (
    <Box>
      <Button
        variant="text"
        size="medium"
        disabled={cognitoUserLoading}
        startIcon={
          cognitoUserLoading ? <CircularProgress size={15} /> : <SyncIcon />
        }
        onClick={handleSyncCognitoUser}
      >
        ユーザー同期
      </Button>
    </Box>
  );
}
