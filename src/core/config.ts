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
  displayOriginalCc: DisplayOriginalCc
  ccSizeRate: number
  ccRows: number
}

/**
 * ポップアップ内で入力した設定情報
 */
export class Config implements ConfigInterface {
  private config: ConfigObjectInterface = {
    opacityRate: 0.5,
    displayOriginalCc: DisplayOriginalCc.OK,
    ccSizeRate: 0.5,
    ccRows: 5,
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
    this.config.displayOriginalCc =
      (await getStorage("configDisplayOriginalCc")) ??
      this.config.displayOriginalCc
    this.config.ccSizeRate =
      (await getStorage("configCcSizeRate")) ?? this.config.opacityRate
    this.config.ccRows =
      (await getStorage("configCcRows")) ?? this.config.ccRows
  }

  observeGoogleStorage = (): void => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      const config = this.config
      if ("configOpacityRate" in changes) {
        config.opacityRate = changes.configOpacityRate.newValue
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
      this.setConfig(config)
    })
  }
}
