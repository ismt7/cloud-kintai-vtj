import dayjs from "dayjs";
import { Rest, Service, Staff } from "../../client";

async function fetchRest(staff: Staff, callback: (value: Rest | null) => void) {
  const { id: staffId } = staff;
  const now = dayjs();
  const today = now.format("YYYYMMDD");
  const fromDate = today;
  const toDate = today;

  const rests = await Service.getRestsByStaffId(
    staffId,
    fromDate,
    toDate
  ).catch((error) => {
    console.log(error);
    return null;
  });

  if (!rests || rests.length === 0) {
    const createdRest = await Service.createRest(
      {
        staff_id: staffId,
        work_date: now.format("YYYY-MM-DD"),
      },
      staffId
    ).catch((error) => {
      console.log(error);
      return null;
    });

    callback(createdRest);
  }

  callback(rests ? rests[0] : null);
}

export default fetchRest;
