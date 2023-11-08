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

  // if (!rests || rests.length === 0) {
  //   const createdRest = await Service.createRest(
  //     {
  //       staff_id: staffId,
  //       work_date: now.format("YYYY-MM-DD"),
  //     },
  //     staffId
  //   ).catch((e) => {
  //     throw e;
  //   });

  //   return createdRest;
  // }

  return rests ? rests[0] : null;
}
