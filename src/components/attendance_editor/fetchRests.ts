import dayjs from "dayjs";
import { Service } from "../../client";

async function fetchRests(
  staffId: number,
  fromDate: dayjs.Dayjs,
  toDate: dayjs.Dayjs
) {
  const rests = await Service.getRestsByStaffId(
    staffId,
    fromDate.format("YYYYMMDD"),
    toDate.format("YYYYMMDD")
  ).catch((error) => {
    throw error;
  });

  return rests;
}

export default fetchRests;
