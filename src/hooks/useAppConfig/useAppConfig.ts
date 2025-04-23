import { useState } from "react";
import dayjs from "dayjs";
import { AppConfigDataManager } from "./AppConfigDataManager";
import { AppConfig, CreateAppConfigInput, UpdateAppConfigInput } from "@/API";

// 特定の項目だけを選択して型定義
export type DefaultAppConfig = Pick<
  AppConfig,
  "name" | "workStartTime" | "workEndTime"
>;

const DEFAULT_CONFIG: DefaultAppConfig = {
  name: "default",
  workStartTime: "09:00",
  workEndTime: "18:00",
};

export default function useAppConfig() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const dataManager = new AppConfigDataManager();

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const fetchedConfig = await dataManager.fetch();
      setConfig(fetchedConfig);
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

  return {
    config,
    loading,
    fetchConfig,
    saveConfig,
    getStartTime,
    getEndTime,
    getConfigId,
  };
}
