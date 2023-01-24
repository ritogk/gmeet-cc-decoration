import { Config, ConfigObjectInterface, DisplayOriginalCc } from "@/core/config"
import { UsersAreaElement } from "@/content/elements/original/UsersAreaElement"
import { UsersCcAreaElement } from "@/content/elements/UsersCcAreaElement"
import { SwitchingButtonElement } from "@/content/elements/switchingButtonElement"
import { CcAreaElement } from "@/content/elements/original/ccAreaElement"
import { ScreenSharingCcAreaElement } from "@/content/elements/ScreenSharingCcAreaElement"
import { CcOveserver } from "@/content/core/ccOveserver"
import { Logger } from "@/core/logger"

export const main = async (): Promise<void> => {
  const debug = true

  const logger = new Logger(debug)
  logger.log("start: application")

  const usersAreaElement = new UsersAreaElement()
  const usersCcAreaElement = new UsersCcAreaElement(debug)
  const ccAreaElement = new CcAreaElement()
  // const screenSharingCcAreaElement = new ScreenSharingCcAreaElement()
  let screenShared = false

  /**
   * 設定ファイル変更時のコールバック関数
   * @param config
   */
  const callbackFuncChangeConfig = (config: ConfigObjectInterface) => {
    logger.log(JSON.stringify(config))
    // 字幕の透明度
    usersCcAreaElement.setUserCcOpacityRate(config.opacityRate)
    // screenSharingCcAreaElement.setUserCcOpacityRate(config.opacityRate)

    // 字幕の表示非表示制御
    if (config.displayOriginalCc == DisplayOriginalCc.OK) {
      ccAreaElement.showElement()
    } else {
      ccAreaElement.hideElement()
    }
    usersCcAreaElement.setFontSizeRate(config.fontSizeRate)
  }
  const config = new Config(callbackFuncChangeConfig)
  await config.loadConfig()
  logger.log(`load config: ${JSON.stringify(config.getConfig())}`)
  config.observeGoogleStorage()

  // elementの初期設定
  usersCcAreaElement.setUserCcOpacityRate(config.getConfig().opacityRate)
  if (config.getConfig().displayOriginalCc == DisplayOriginalCc.OK) {
    ccAreaElement.showElement()
  } else {
    ccAreaElement.hideElement()
  }
  usersCcAreaElement.setFontSizeRate(config.getConfig().fontSizeRate)
  // screenSharingCcAreaElement.setUserCcOpacityRate(
  //   config.getConfig().opacityRate
  // )

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
      // screenSharingCcAreaElement.runInterval()
      logger.log("run: interval")
    } else {
      ccOveserver.stop()
      logger.log("stop: observer")
      usersCcAreaElement.stopInterval()
      // screenSharingCcAreaElement.stopInterval()
      logger.log("stop: interval")
      usersCcAreaElement.deleteElements()
      // screenSharingCcAreaElement.deleteElement()
      logger.log("delete: cc elements")
    }
  }
  const controlButtonElement = new SwitchingButtonElement(callbackFuncClick)
  controlButtonElement.createElement()

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
        // screenSharingCcAreaElement.deleteElement()
        screenShared = true
      }
      // if (!screenSharingCcAreaElement.getElement()) {
      //   screenSharingCcAreaElement.createElement()
      //   screenSharingCcAreaElement.appendCcElement(name, speach)
      // } else {
      //   screenSharingCcAreaElement.updateElement()
      //   screenSharingCcAreaElement.updateCcElement(name, speach)
      // }
    } else {
      // 画面共有off
      if (screenShared) {
        usersCcAreaElement.deleteElements()
        // screenSharingCcAreaElement.deleteElement()
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

  // ↓ 呼び出しスクリプト
  // document.dispatchEvent(
  //   new CustomEvent("runScript", {
  //     bubbles: true,
  //     detail: {
  //       name: "あなた",
  //       speach:
  //         "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほぱぴぷぺぽらりるれろ",
  //     },
  //   })
  // )
  // 動作確認用の入口
  document.addEventListener("runScript", (e: any) => {
    callbackFuncObserver(e.detail.name, "c:/a/b", e.detail.speach)
  })
}
