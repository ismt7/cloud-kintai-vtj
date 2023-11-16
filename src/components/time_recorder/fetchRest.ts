import dayjs from "dayjs";
import { Service, Staff } from "../../client";

export default async function fetchRest(staff: Staff) {
  const { id: staffId } = staff;
  const now = dayjs();
  const today = now.format("YYYYMMDD");
  const fromDate = today;
  const toDate = today;

  const rests = await Service.getRestsByStaffId(
    staffId,
    fromDate,
    toDate
  ).catch((e) => {
    throw e;
  });

  return rests ? rests[0] : null;
}
