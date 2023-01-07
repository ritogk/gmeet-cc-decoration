import { getStorage } from "@/core/googleStorage"
export interface ConfigInterface {
  loadConfig(): Promise<void>
  getConfig(): ConfigObjectInterface
  setConfig(config: ConfigObjectInterface): void
  observeConfig(): void
}

export enum DisplayOriginalCc {
  OK = "1",
  NG = "2",
}

export interface ConfigObjectInterface {
  opacityRate: number
  displayOriginalCc: DisplayOriginalCc
}

/**
 * ポップアップ内で入力した設定情報
 */
export class Config implements ConfigInterface {
  private config: ConfigObjectInterface = {
    opacityRate: 0.5,
    displayOriginalCc: DisplayOriginalCc.OK,
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
      (await getStorage("opacityRate")) ?? this.config.opacityRate
    this.config.displayOriginalCc =
      (await getStorage("displayOriginalCc")) ?? this.config.displayOriginalCc
  }

  observeConfig = (): void => {
    // ポップアップ側の変更検知
    chrome.runtime.onMessage.addListener(
      (message: string, sender, sendResponse) => {
        console.log("receive: popup → content_scripts")
        const data = <ConfigObjectInterface>JSON.parse(message)
        this.setConfig(data)
      }
    )
  }
}
