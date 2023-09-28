import { configureStore } from "@reduxjs/toolkit";

import {
  LoginStaffStatus,
  testLoginStaffReducer,
} from "../../../lib/reducers/loginStaffReducer";

export default function GetDefaultStoreMock() {
  return configureStore({
    reducer: {
      loginStaffReducer: testLoginStaffReducer({
        status: LoginStaffStatus.DONE,
        data: {
          id: 999,
          last_name: "田中",
          first_name: "太郎",
          mail_address: "tanaka@example.com",
          icon_path: "",
          cognito_user_id: "",
          created_at: "",
          created_by: 1,
          updated_at: null,
          updated_by: null,
        },
      }),
    },
  });
}
