import { Config, ConfigObjectInterface } from "@/core/config"
import { TitleElements } from "@/popup/elements/titleElements"
import { OpacityRateElement } from "@/popup/elements/opacityRateElement"
import { BackgroundOpacityRateElement } from "@/popup/elements/backgroundOpacityRateElement"
import { CcSizeRateElement } from "@/popup/elements/ccSizeRateElement"
import { CcRowsElement } from "@/popup/elements/ccRowsElement"
import { CcMarginRateElement } from "@/popup/elements/ccMarginRateElement"
import { DisplayOriginalCcElement } from "@/popup/elements/displayOriginalCcElement"
import { Logger } from "@/core/logger"
import "bootstrap"
import "@/popup/elements/scss/main.scss"

export const main = async (): Promise<void> => {
  const logger = new Logger(false)
  logger.log("start: popup")

  // config読み込み
  const config = new Config((config: ConfigObjectInterface) => {})
  await config.loadConfig()
  const configData = config.getConfig()
  logger.log(`load config: ${JSON.stringify(configData)}`)

  const titleElements = new TitleElements()
  const opacityRateElement = new OpacityRateElement(configData.opacityRate)
  const backgroundOpacityRateElement = new BackgroundOpacityRateElement(
    configData.backgroundOpacityRate
  )
  const ccSizeRateElement = new CcSizeRateElement(configData.ccSizeRate)
  const ccRowsElement = new CcRowsElement(configData.ccRows)
  const ccMarginRateElement = new CcMarginRateElement(configData.ccMaringRate)
  const displayOriginalCcElement = new DisplayOriginalCcElement(
    configData.displayOriginalCc
  )
}
