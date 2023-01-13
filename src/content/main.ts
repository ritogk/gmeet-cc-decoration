import { Config, ConfigObjectInterface, DisplayOriginalCc } from "@/core/config"
import { UsersAreaElement } from "@/content/elements/UsersAreaElement"
import { UsersCcAreaElement } from "@/content/elements/UsersCcAreaElement"
import { SwitchingButtonElement } from "@/content/elements/switchingButtonElement"
import { CcAreaElement } from "@/content/elements/ccAreaElement"
import { ScreenSharingCcAreaElement } from "@/content/elements/ScreenSharingCcAreaElement"
import { CcOveserver } from "@/content/core/ccOveserver"

export const main = async (): Promise<void> => {
  console.log("start: application")

  const usersAreaElement = new UsersAreaElement()
  const usersCcAreaElement = new UsersCcAreaElement()
  const ccAreaElement = new CcAreaElement()
  const screenSharingCcAreaElement = new ScreenSharingCcAreaElement()
  let screenShared = false
  /**
   * 設定ファイル変更時のコールバック関数
   * @param config
   */
  const callbackFuncChangeConfig = (config: ConfigObjectInterface) => {
    console.log(JSON.stringify(config))
    // 字幕の透明度
    usersCcAreaElement.setUserCcOpacityRate(config.opacityRate)
    screenSharingCcAreaElement.setUserCcOpacityRate(config.opacityRate)

    // 字幕の表示非表示制御
    if (config.displayOriginalCc == DisplayOriginalCc.OK) {
      ccAreaElement.showElement()
    } else {
      ccAreaElement.hideElement()
    }
  }
  const config = new Config(callbackFuncChangeConfig)
  await config.loadConfig()
  console.log(`load config: ${JSON.stringify(config.getConfig())}`)
  config.observeGoogleStorage()

  // elementの初期設定
  usersCcAreaElement.setUserCcOpacityRate(config.getConfig().opacityRate)
  if (config.getConfig().displayOriginalCc == DisplayOriginalCc.OK) {
    ccAreaElement.showElement()
  } else {
    ccAreaElement.hideElement()
  }
  screenSharingCcAreaElement.setUserCcOpacityRate(
    config.getConfig().opacityRate
  )

  /**
   * コントロールボタン押下後のコールバック関数
   * @param clicked
   */
  const callbackFuncClick = (clicked: boolean) => {
    console.log("click: controlButton")
    if (clicked) {
      ccOveserver.run()
      console.log("start: observer")
      usersCcAreaElement.runInterval()
      screenSharingCcAreaElement.runInterval()
      console.log("run: interval")
    } else {
      ccOveserver.stop()
      console.log("stop: observer")
      usersCcAreaElement.stopInterval()
      screenSharingCcAreaElement.stopInterval()
      console.log("stop: interval")
      usersCcAreaElement.deleteElements()
      screenSharingCcAreaElement.deleteElement()
      console.log("delete: cc elements")
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
    console.log("mutate: cc")
    console.log(`name: ${name}`)
    console.log(`imagePath: ${imagePath}`)
    console.log(`speach: ${speach}`)

    if (usersAreaElement.findScreenSharingAreaElement()) {
      // 画面共有on
      if (!screenShared) {
        usersCcAreaElement.deleteElements()
        screenSharingCcAreaElement.deleteElement()
        screenShared = true
      }
      if (!screenSharingCcAreaElement.getElement()) {
        screenSharingCcAreaElement.createElement()
        screenSharingCcAreaElement.appendCcElement(name, speach)
      } else {
        screenSharingCcAreaElement.updateElement()
        screenSharingCcAreaElement.updateCcElement(name, speach)
      }
    } else {
      // 画面共有off
      if (screenShared) {
        usersCcAreaElement.deleteElements()
        screenSharingCcAreaElement.deleteElement()
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
}

// 動作確認用の入口
document.addEventListener("runScript", (e) => {
  main()
})

// // script呼び出し用イベント
// const event = new Event("runScript", { bubbles: true })
// document.dispatchEvent(event)
