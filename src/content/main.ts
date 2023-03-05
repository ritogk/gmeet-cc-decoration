import { Config, ConfigObjectInterface, DisplayOriginalCc } from "@/core/config"
import { UsersAreaElement } from "@/content/elements/original/UsersAreaElement"
import { UsersCcAreaElement } from "@/content/elements/UsersCcAreaElement"
import { ControlCcButtonElement } from "@/content/elements/original/controlCcButtonElement"
import { CcAreaElement } from "@/content/elements/original/ccAreaElement"
import { CcOveserver } from "@/content/core/ccOveserver"
import { Logger } from "@/core/logger"
import { env } from "@/core/envLocal"

export const main = async (): Promise<void> => {
  const debug = env.debugMode

  const logger = new Logger(debug)
  logger.log("start: application")

  const usersAreaElement = new UsersAreaElement()
  const usersCcAreaElement = new UsersCcAreaElement(debug)
  const ccAreaElement = new CcAreaElement()
  let screenShared = false

  /**
   * 設定ファイル変更時のコールバック関数
   * @param config
   */
  const callbackFuncChangeConfig = (config: ConfigObjectInterface) => {
    logger.log(JSON.stringify(config))
    usersCcAreaElement.setOpacityRate(config.opacityRate)
    usersCcAreaElement.setBackgroundOpacityRate(config.backgroundOpacityRate)
    usersCcAreaElement.setSizeRate(config.ccSizeRate)
    usersCcAreaElement.setCcRows(config.ccRows)
    usersCcAreaElement.setCcMarginRate(config.ccMaringRate)
    usersCcAreaElement.changeElementsStyle()

    // 字幕の表示非表示制御
    if (config.displayOriginalCc == DisplayOriginalCc.OK) {
      ccAreaElement.showElement()
    } else {
      ccAreaElement.hideElement()
    }
  }
  const config = new Config(callbackFuncChangeConfig)
  await config.loadConfig()
  const configData = config.getConfig()
  logger.log(`load config: ${JSON.stringify(configData)}`)
  config.observeGoogleStorage()

  // elementの初期設定
  usersCcAreaElement.setOpacityRate(configData.opacityRate)
  usersCcAreaElement.setBackgroundOpacityRate(configData.backgroundOpacityRate)
  if (configData.displayOriginalCc == DisplayOriginalCc.OK) {
    ccAreaElement.showElement()
  } else {
    ccAreaElement.hideElement()
  }
  usersCcAreaElement.setSizeRate(configData.ccSizeRate)
  usersCcAreaElement.setCcRows(configData.ccRows)
  usersCcAreaElement.setCcMarginRate(configData.ccMaringRate)
  usersCcAreaElement.changeElementsStyle()

  /**
   * コントロールボタン押下後のコールバック関数
   * @param clicked
   */
  const callbackFuncClick = (clicked: boolean) => {
    logger.log("click: controlButton")
    if (clicked) {
      ccOveserver.run()
      logger.log("start: observer")
      usersCcAreaElement.runInterval()
      logger.log("run: interval")
    } else {
      ccOveserver.stop()
      logger.log("stop: observer")
      usersCcAreaElement.stopInterval()
      logger.log("stop: interval")
      usersCcAreaElement.deleteElements()
      logger.log("delete: cc elements")
    }
  }
  const controlCcButtonElement = new ControlCcButtonElement()
  controlCcButtonElement.addEventListenerClick(callbackFuncClick)

  /**
   * 字幕変更検知後のコールバック関数
   * @param name
   * @param imagePath
   * @param speach
   */
  const callbackFuncObserver = (
    name: string,
    imagePath: string,
    speach: string
  ) => {
    logger.log("mutate: cc")
    logger.log(`name: ${name}`)
    logger.log(`imagePath: ${imagePath}`)
    logger.log(`speach: ${speach}`)

    if (usersAreaElement.findScreenSharingAreaElement()) {
      // 画面共有on
      if (!screenShared) {
        usersCcAreaElement.deleteElements()
        screenShared = true
      }
    } else {
      // 画面共有off
      if (screenShared) {
        usersCcAreaElement.deleteElements()
        screenShared = false
      }
    }
    if (!usersCcAreaElement.getElement(name)) {
      usersCcAreaElement.createElement(name)
      usersCcAreaElement.appendCcElement(name, speach)
    } else {
      usersCcAreaElement.updateElement(name)
      usersCcAreaElement.updateCcElement(name, speach)
    }
  }
  const ccOveserver = new CcOveserver(callbackFuncObserver)

  // 動作確認用の入口
  document.addEventListener("runScript", (e: any) => {
    callbackFuncObserver(e.detail.name, "c:/a/b", e.detail.speach)
  })
}
