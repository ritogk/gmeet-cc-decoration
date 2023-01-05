import { Config, ConfigObjectInterface } from "@/config"
import { UsersAreaElement } from "@/elements/UsersAreaElement"
import { ControlButtonElement } from "@/elements/controlButtonElement"
import { CcAreaElement } from "@/elements/ccAreaElement"
import { CcOveserver } from "@/core/ccOveserver"

export const main = () => {
  console.log("start: application")
  /**
   * コントロールボタン押下後のコールバック関数
   * @param clicked
   */
  const callbackFuncClick = (clicked: boolean) => {
    console.log("click: controlButton")
    if (clicked) {
      ccOveserver.run()
      console.log("start: observer")
      usersAreaElement.runInterval()
      console.log("run: interval")
    } else {
      ccOveserver.stop()
      console.log("stop: observer")
      usersAreaElement.stopInterval()
      console.log("stop: interval")
      usersAreaElement.deleteUserCcElements()
      console.log("delete: cc elements")
    }
  }

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

    if (!usersAreaElement.findUserCcElement(name)) {
      usersAreaElement.appendUserCcElement(name, speach)
    } else {
      usersAreaElement.updateUserCcElement(name, speach)
    }
  }

  const usersAreaElement = new UsersAreaElement()
  const ccAreaElement = new CcAreaElement()
  const controlButtonElement = new ControlButtonElement(callbackFuncClick)
  controlButtonElement.createElement()
  const ccOveserver = new CcOveserver(callbackFuncObserver)

  /**
   * 設定ファイル変更時のコールバック関数
   * @param config
   */
  const callbackFuncChangeConfig = (config: ConfigObjectInterface) => {
    console.log("callback simasuta!")
    // 字幕の透明度
    usersAreaElement.setUserCcOpacityRate(config.opacityRate)

    // 字幕の表示非表示制御
    if (config.isDisplayOriginalCc == 1) {
      ccAreaElement.showElement()
    } else {
      ccAreaElement.hideElement()
    }
  }
  const config = new Config(callbackFuncChangeConfig)
  config.loadConfig()

  // ポップアップ側の変更検知
  chrome.runtime.onMessage.addListener(function (
    message: string,
    sender,
    sendResponse
  ) {
    console.log("receive: popup → content_scripts")
    const data = <ConfigObjectInterface>JSON.parse(message)
    config.setConfig(data)
  })
}

// 動作確認用の入口
document.addEventListener("runScript", (e) => {
  main()
})

// // script呼び出し用イベント
// const event = new Event("runScript", { bubbles: true })
// document.dispatchEvent(event)
