export interface ConfigInterface {
  loadConfig(): Promise<void>
  getConfig(): ConfigObjectInterface
  setConfig(config: ConfigObjectInterface): void
  observeConfig(): void
}

export interface ConfigObjectInterface {
  opacityRate: number
  isDisplayOriginalCc: number
}

/**
 * ポップアップ内で入力した設定情報
 */
export class Config implements ConfigInterface {
  private config: ConfigObjectInterface = {
    opacityRate: 0.5,
    isDisplayOriginalCc: 1,
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
    const config = await this.getStorage()
    this.setConfig(config)
  }

  private getStorage = (): Promise<ConfigObjectInterface> => {
    return new Promise((resolve) => {
      chrome.storage.local.get(
        ["opacityRate", "isDisplayOriginalCc"],
        (data) => {
          resolve(data as ConfigObjectInterface)
        }
      )
    })
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
