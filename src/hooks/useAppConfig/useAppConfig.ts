import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AppConfigDataManager } from "./AppConfigDataManager";
import { AppConfig, CreateAppConfigInput, UpdateAppConfigInput } from "@/API";

// 特定の項目だけを選択して型定義
export type DefaultAppConfig = Pick<
  AppConfig,
  | "name"
  | "workStartTime"
  | "workEndTime"
  | "lunchRestStartTime"
  | "lunchRestEndTime"
  | "links"
  | "officeMode"
  | "reasons"
  | "quickInputStartTimes"
  | "quickInputEndTimes"
>;

export const DEFAULT_CONFIG: DefaultAppConfig = {
  name: "default",
  workStartTime: "09:00",
  workEndTime: "18:00",
  lunchRestStartTime: "12:00",
  lunchRestEndTime: "13:00",
  officeMode: false,
  links: [],
  reasons: [],
  quickInputStartTimes: [],
  quickInputEndTimes: [],
};

const LOCAL_STORAGE_KEY = "appConfig";

export default function useAppConfig() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const dataManager = new AppConfigDataManager();

  useEffect(() => {
    // ローカルストレージからキャッシュを読み込む
    const cachedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cachedConfig) {
      setConfig(JSON.parse(cachedConfig));
    }
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const fetchedConfig = await dataManager.fetch();
      setConfig(fetchedConfig);
      // キャッシュをローカルストレージに保存
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchedConfig));
    } catch (error) {
      console.error("Failed to fetch app config:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (
    newConfig: CreateAppConfigInput | UpdateAppConfigInput
  ) => {
    setLoading(true);
    try {
      let savedConfig;
      if ("id" in newConfig && newConfig.id) {
        // IDが存在する場合は更新
        savedConfig = await dataManager.update(
          newConfig as UpdateAppConfigInput
        );
      } else {
        // IDが存在しない場合は作成
        savedConfig = await dataManager.create(
          newConfig as CreateAppConfigInput
        );
      }
      setConfig(savedConfig);
      // キャッシュをローカルストレージに保存
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedConfig));
    } catch (error) {
      console.error("Failed to save app config:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStartTime = () =>
    config
      ? dayjs(config.workStartTime, "HH:mm")
      : dayjs(DEFAULT_CONFIG.workStartTime, "HH:mm");
  const getEndTime = () =>
    config
      ? dayjs(config.workEndTime, "HH:mm")
      : dayjs(DEFAULT_CONFIG.workEndTime, "HH:mm");

  const getConfigId = () => config?.id || null;

  const getLinks = () => {
    if (config && config.links) {
      return config.links.map((link) => ({
        label: link?.label || "",
        url: link?.url || "",
        enabled: link?.enabled || false,
        icon: link?.icon || "",
      }));
    }
    return [];
  };

  const getReasons = () => {
    if (config && config.reasons) {
      return config.reasons
        .filter((reason) => reason !== null)
        .map((reason) => ({
          reason: reason?.reason || "",
          enabled: reason?.enabled || false,
        }));
    }
    return [];
  };

  const getOfficeMode = () => config?.officeMode || false;

  const getQuickInputStartTimes = (onlyEnabled = false) => {
    if (config && config.quickInputStartTimes) {
      return config.quickInputStartTimes
        .filter((time) => time !== null && (!onlyEnabled || time?.enabled))
        .map((time) => ({
          time: time?.time || "",
          enabled: time?.enabled || false,
        }));
    }
    return [];
  };

  const getQuickInputEndTimes = (onlyEnabled = false) => {
    if (config && config.quickInputEndTimes) {
      return config.quickInputEndTimes
        .filter((time) => time !== null && (!onlyEnabled || time?.enabled))
        .map((time) => ({
          time: time?.time || "",
          enabled: time?.enabled || false,
        }));
    }
    return [];
  };

  const getLunchRestStartTime = () =>
    config
      ? dayjs(config.lunchRestStartTime, "HH:mm")
      : dayjs("12:00", "HH:mm");

  const getLunchRestEndTime = () =>
    config ? dayjs(config.lunchRestEndTime, "HH:mm") : dayjs("13:00", "HH:mm");

  return {
    config,
    loading,
    fetchConfig,
    saveConfig,
    getStartTime,
    getEndTime,
    getConfigId,
    getLinks,
    getReasons,
    getOfficeMode,
    getQuickInputStartTimes,
    getQuickInputEndTimes,
    getLunchRestStartTime,
    getLunchRestEndTime,
  };
}
