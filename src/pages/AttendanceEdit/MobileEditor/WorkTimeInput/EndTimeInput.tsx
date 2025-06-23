import { Box, Stack } from "@mui/material";
import { renderTimeViewClock, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

import QuickInputChips from "@/components/QuickInputChips";
import { AppConfigContext } from "@/context/AppConfigContext";

import { AttendanceEditInputs } from "../../common";

/**
 * 勤務終了時刻の入力コンポーネント（モバイル用）。
 *
 * @param workDate 勤務日（dayjsオブジェクトまたはnull）
 * @param control react-hook-formのControlオブジェクト
 * @param setValue react-hook-formのsetValue関数
 * @returns 勤務終了時刻入力UI
 */
export default function EndTimeInput({
  workDate,
  control,
  setValue,
}: {
  workDate: dayjs.Dayjs | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<AttendanceEditInputs, any>;
  setValue: UseFormSetValue<AttendanceEditInputs>;
}) {
  /**
   * クイック入力用の終了時刻リストを取得するContext関数
   */
  const { getQuickInputEndTimes } = useContext(AppConfigContext);

  /**
   * クイック入力用の終了時刻リストのstate
   */
  const [quickInputEndTimes, setQuickInputEndTimes] = useState<
    { time: string; enabled: boolean }[]
  >([]);

  useEffect(() => {
    const quickInputTimes = getQuickInputEndTimes(true);
    if (quickInputTimes.length > 0) {
      setQuickInputEndTimes(
        quickInputTimes.map((entry) => ({
          time: entry.time,
          enabled: entry.enabled,
        }))
      );
    }
  }, [getQuickInputEndTimes]);

  if (!workDate) {
    return null;
  }

  return (
    <Stack direction="column" spacing={1}>
      <Stack spacing={1}>
        <Controller
          name="endTime"
          control={control}
          render={({ field }) => (
            <TimePicker
              value={field.value ? dayjs(field.value) : null}
              ampm={false}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              slotProps={{
                textField: { size: "small" },
              }}
              onChange={(value) => {
                field.onChange(
                  value && value.isValid()
                    ? value
                        .year(workDate.year())
                        .month(workDate.month())
                        .date(workDate.date())
                        .second(0)
                        .millisecond(0)
                        .toISOString()
                    : null
                );
              }}
            />
          )}
        />
        <Box>
          <QuickInputChips
            quickInputTimes={quickInputEndTimes}
            workDate={workDate}
            onSelectTime={(endTime) => setValue("endTime", endTime)}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
