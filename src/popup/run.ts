import { Config, ConfigObjectInterface, DisplayOriginalCc } from "@/core/config"
import { Elements } from "@/popup/elements"
import { setStorage } from "@/core/chromeStorage"
import { Logger } from "@/core/logger"

export const run = async (): Promise<void> => {
  const logger = new Logger(false)
  logger.log("start: popup")

  // config読み込み
  const config = new Config((config: ConfigObjectInterface) => {})
  await config.loadConfig()
  const configData = config.getConfig()
  logger.log(`load config: ${JSON.stringify(configData)}`)

  // elementsの変更後のコールバック関数
  const callbackFuncChangeElement = (
    opacityRate: number,
    displayOriginalCc: DisplayOriginalCc,
    ccSizeRate: number
  ) => {
    // configとストレージを更新
    logger.log("changeElement")
    configData.opacityRate = opacityRate
    configData.displayOriginalCc = displayOriginalCc
    configData.ccSizeRate = ccSizeRate
    setStorage("configOpacityRate", opacityRate)
    setStorage("configDisplayOriginalCc", displayOriginalCc)
    setStorage("configCcSizeRate", ccSizeRate)
  }
  const elements = new Elements(
    configData.opacityRate,
    configData.displayOriginalCc,
    configData.ccSizeRate,
    callbackFuncChangeElement
  )
}

window.addEventListener("load", run, false)
