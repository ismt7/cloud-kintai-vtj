import dayjs from "dayjs";

import MoveDateItem from "../MoveDateItem";
import { Label } from "./Label";

export function WorkDateItem({ workDate }: { workDate: dayjs.Dayjs }) {
  return (
    <>
      <Label variant="body1">勤務日</Label>
      <MoveDateItem workDate={workDate} />
    </>
  );
}
