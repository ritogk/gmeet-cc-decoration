import { getStorage } from "@/core/chromeStorage"
export interface ConfigInterface {
  loadConfig(): Promise<void>
  getConfig(): ConfigObjectInterface
  setConfig(config: ConfigObjectInterface): void
  observeGoogleStorage(): void
}

export enum DisplayOriginalCc {
  OK = "1",
  NG = "2",
}

export interface ConfigObjectInterface {
  opacityRate: number
  backgroundOpacityRate: number
  displayOriginalCc: DisplayOriginalCc
  ccSizeRate: number
  ccRows: number
  ccMaringRate: number
}

/**
 * ポップアップ内で入力した設定情報
 */
export class Config implements ConfigInterface {
  private config: ConfigObjectInterface = {
    opacityRate: 0.5,
    backgroundOpacityRate: 0.3,
    displayOriginalCc: DisplayOriginalCc.OK,
    ccSizeRate: 0.5,
    ccRows: 5,
    ccMaringRate: 0.5,
  }

  private callbackFuncChangeConfig: (config: ConfigObjectInterface) => void

  constructor(callbackFunc: (config: ConfigObjectInterface) => void) {
    this.callbackFuncChangeConfig = callbackFunc
  }

  getConfig = (): ConfigObjectInterface => {
    return this.config
  }

  setConfig = (config: ConfigObjectInterface): void => {
    this.config = config
    this.callbackFuncChangeConfig(this.config)
  }

  loadConfig = async (): Promise<void> => {
    this.config.opacityRate =
      (await getStorage("configOpacityRate")) ?? this.config.opacityRate
    this.config.backgroundOpacityRate =
      (await getStorage("configBackgroundOpacityRate")) ??
      this.config.backgroundOpacityRate
    this.config.displayOriginalCc =
      (await getStorage("configDisplayOriginalCc")) ??
      this.config.displayOriginalCc
    this.config.ccSizeRate =
      (await getStorage("configCcSizeRate")) ?? this.config.opacityRate
    this.config.ccRows =
      (await getStorage("configCcRows")) ?? this.config.ccRows
    this.config.ccMaringRate =
      (await getStorage("configCcMarginRate")) ?? this.config.ccMaringRate
  }

  observeGoogleStorage = (): void => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      const config = this.config
      if ("configOpacityRate" in changes) {
        config.opacityRate = changes.configOpacityRate.newValue
      }
      if ("configBackgroundOpacityRate" in changes) {
        config.backgroundOpacityRate =
          changes.configBackgroundOpacityRate.newValue
      }
      if ("configDisplayOriginalCc" in changes) {
        config.displayOriginalCc = changes.configDisplayOriginalCc.newValue
      }
      if ("configCcSizeRate" in changes) {
        config.ccSizeRate = changes.configCcSizeRate.newValue
      }
      if ("configCcRows" in changes) {
        config.ccRows = changes.configCcRows.newValue
      }
      if ("configCcMarginRate" in changes) {
        config.ccMaringRate = changes.configCcMarginRate.newValue
      }
      this.setConfig(config)
    })
  }
}
