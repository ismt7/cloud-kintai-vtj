import { createAsyncThunk } from "@reduxjs/toolkit";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { Service, Staff } from "../../client";

const fetchLoginStaff = createAsyncThunk(
  "loginStaff/fetchLoginStaff",
  async (): Promise<Staff | null> => {
    const { user } = useAuthenticator();
    const cognitoUserId = user?.attributes?.sub;
    const mailAddress = user?.attributes?.email;

    if (!cognitoUserId || !mailAddress) {
      return null;
    }

    const staff = await Service.getStaffByCognitoUserId(cognitoUserId, 1).catch(
      (e) => {
        console.log(e);
        return null;
      }
    );

    if (staff) {
      return staff;
    }

    const createdStaff = await Service.createStaff({
      mail_address: mailAddress,
      cognito_user_id: cognitoUserId,
    }).catch((e) => {
      console.log(e);
      return null;
    });

    if (!createdStaff) {
      return null;
    }

    console.log("createdStaff", createdStaff);

    return createdStaff;
  }
);
export default fetchLoginStaff;
