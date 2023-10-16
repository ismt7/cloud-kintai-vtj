import { Service, Staff, StaffRole } from "../../client";

async function fetchLoginStaff(
  cognitoUserId: string,
  mailAddress: string,
  callback: (
    createdStaff: Staff | null,
    createdStaffRole: StaffRole | null
  ) => void
) {
  const SYSTEM_STAFF_ID = 1;

  if (!cognitoUserId || !mailAddress) {
    callback(null, null);
    return;
  }

  console.log("cognitoUserId", cognitoUserId);

  // スタッフの存在確認
  const staff = await Service.getStaffByCognitoUserId(
    cognitoUserId,
    SYSTEM_STAFF_ID
  ).catch((e) => {
    console.log(e);
    return null;
  });

  console.log("staff", staff);

  if (staff) {
    const staffRole = await Service.getStaffRole(
      staff.id,
      SYSTEM_STAFF_ID
    ).catch((e) => {
      console.log(e);
      return null;
    });

    if (!staffRole) {
      callback(null, null);
      return;
    }

    callback(staff, staffRole);
    return;
  }

  // スタッフ情報の作成
  const createdStaff = await Service.createStaff(
    {
      mail_address: mailAddress,
      cognito_user_id: cognitoUserId,
    },
    SYSTEM_STAFF_ID
  ).catch((e) => {
    console.log(e);
    return null;
  });

  if (!createdStaff) {
    callback(null, null);
    return;
  }

  // スタッフロールの作成(初回は「ゲスト」ロール)
  const GUEST_ROLE_ID = 4;
  const createdStaffRole = await Service.createStaffRole(
    {
      staff_id: createdStaff.id,
      role_id: GUEST_ROLE_ID,
    },
    SYSTEM_STAFF_ID
  ).catch((e) => {
    console.log(e);
    return null;
  });

  if (!createdStaffRole) {
    callback(null, null);
    return;
  }

  callback(createdStaff, createdStaffRole);
}

export default fetchLoginStaff;
