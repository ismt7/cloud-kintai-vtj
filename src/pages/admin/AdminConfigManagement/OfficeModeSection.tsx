import { FormControlLabel, Stack, Switch, Typography } from "@mui/material";

interface OfficeModeSectionProps {
  officeMode: boolean;
  onOfficeModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hourlyPaidHolidayEnabled: boolean;
  onHourlyPaidHolidayEnabledChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const OfficeModeSection = ({
  officeMode,
  onOfficeModeChange,
  hourlyPaidHolidayEnabled,
  onHourlyPaidHolidayEnabledChange,
}: OfficeModeSectionProps) => (
  <>
    <Stack direction="row" spacing={4} alignItems="center">
      <Stack sx={{ flex: 1 }}>
        <Typography variant="h6">オフィスモード(β版)</Typography>
        <Typography variant="body2" color="textSecondary">
          オフィスモードを有効にすると、オフィスに設置した端末からQRコードを読み込み出退勤が可能になります。
          <br />
          ベータ(β)版は、まだ完全ではないため、予期しない動作が発生する可能性があります。
        </Typography>
      </Stack>
      <FormControlLabel
        control={
          <Switch
            checked={officeMode}
            onChange={onOfficeModeChange}
            color="primary"
          />
        }
        label={officeMode ? "有効" : "無効"}
        sx={{ minWidth: 120 }}
      />
    </Stack>
    <Stack direction="row" spacing={4} alignItems="center" sx={{ mt: 1 }}>
      <Stack sx={{ flex: 1 }}>
        <Typography variant="h6">時間単位休暇(β版)</Typography>
        <Typography variant="body2" color="textSecondary">
          時間単位で休暇を取得できる機能を有効にします。
          <br />
        </Typography>
      </Stack>
      <FormControlLabel
        control={
          <Switch
            checked={hourlyPaidHolidayEnabled}
            onChange={onHourlyPaidHolidayEnabledChange}
            color="primary"
          />
        }
        label={hourlyPaidHolidayEnabled ? "有効" : "無効"}
        sx={{ minWidth: 120 }}
      />
    </Stack>
  </>
);

export default OfficeModeSection;
