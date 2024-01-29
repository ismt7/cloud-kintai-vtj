import { API } from "aws-amplify";
import dayjs from "dayjs";
import { sendMail } from "../../graphql/queries";
import { CognitoUser } from "../../hooks/useCognitoUser";
import { StaffRole } from "../../hooks/useStaffs/common";
import { StaffType } from "../../hooks/useStaffs/useStaffs";

export default function sendChangeRequestMail(
  cognitoUser: CognitoUser,
  workDate: dayjs.Dayjs,
  staffs: StaffType[]
) {
  const { id, familyName, givenName } = cognitoUser;

  const adminStaffs = staffs.filter(
    (staff) =>
      staff.role === StaffRole.ADMIN || staff.role === StaffRole.STAFF_ADMIN
  );

  if (adminStaffs.length === 0) {
    return;
  }

  const makeWorkDate = () => dayjs(workDate).format("YYYY/MM/DD");

  const makeStaffName = () => {
    if (!familyName && !givenName) {
      return "スタッフ";
    }

    if (familyName && givenName) {
      return `${familyName} ${givenName} さん`;
    }

    return `${familyName || givenName} さん`;
  };

  const makeAttendanceEditUrl = () => {
    const targetDate = workDate.format("YYYYMMDD");
    return `https://dev.kintai.virtualtech.jp/admin/attendances/edit/${targetDate}/${id}`;
  };

  void API.graphql({
    query: sendMail,
    variables: {
      data: {
        to: adminStaffs.map((staff) => staff.mailAddress),
        subject: `勤怠の変更リクエストが申請されました - ${makeWorkDate()}`,
        body: [
          "スタッフ管理者 各位",
          "",
          "お疲れ様です",
          "",
          `${makeStaffName()}から勤怠の変更リクエストが申請されました。`,
          "申請内容を確認して「承認」または「却下」を選択してください",
          "",
          makeAttendanceEditUrl(),
          "",
        ].join("\n"),
      },
    },
  });
}
