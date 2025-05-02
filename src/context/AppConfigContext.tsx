import { createContext } from "react";
import { DEFAULT_CONFIG } from "@/hooks/useAppConfig/useAppConfig";
import dayjs from "dayjs";
import { CreateAppConfigInput, UpdateAppConfigInput } from "@/API";

type AppConfigContextProps = {
  fetchConfig: () => Promise<void>;
  saveConfig: (
    newConfig: CreateAppConfigInput | UpdateAppConfigInput
  ) => Promise<void>;
  getStartTime: () => dayjs.Dayjs;
  getEndTime: () => dayjs.Dayjs;
  getConfigId: () => string | null;
  getLinks: () => {
    label: string;
    url: string;
    enabled: boolean;
    icon: string;
  }[];
  getReasons: () => {
    reason: string;
    enabled: boolean;
  }[];
  getOfficeMode: () => boolean;
  getQuickInputStartTimes: (onlyEnabled?: boolean) => {
    time: string;
    enabled: boolean;
  }[];
  getQuickInputEndTimes: (onlyEnabled?: boolean) => {
    time: string;
    enabled: boolean;
  }[];
  getLunchRestStartTime: () => dayjs.Dayjs;
  getLunchRestEndTime: () => dayjs.Dayjs;
};

export const AppConfigContext = createContext<AppConfigContextProps>({
  fetchConfig: async () => {
    console.log("The process is not implemented.");
  },
  saveConfig: async () => {
    console.log("The process is not implemented.");
  },
  getStartTime: () => dayjs(DEFAULT_CONFIG.workStartTime, "HH:mm"),
  getEndTime: () => dayjs(DEFAULT_CONFIG.workEndTime, "HH:mm"),
  getConfigId: () => null,
  getLinks: () => [],
  getReasons: () => [],
  getOfficeMode: () => false,
  getQuickInputStartTimes: () => [],
  getQuickInputEndTimes: () => [],
  getLunchRestStartTime: () =>
    dayjs(DEFAULT_CONFIG.lunchRestStartTime, "HH:mm"),
  getLunchRestEndTime: () => dayjs(DEFAULT_CONFIG.lunchRestEndTime, "HH:mm"),
});
