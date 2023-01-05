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

  // 設定読み込み
  chrome.storage.local.get(
    ["opacityRate", "isDisplayOriginalCc"],
    function (values) {
      console.log(values)
      // 字幕の透明度
      usersAreaElement.setUserCcOpacityRate(values.opacityRate)

      // 字幕の表示非表示制御
      if (values.isDisplayOriginalCc == "1") {
        ccAreaElement.showElement()
      } else {
        ccAreaElement.hideElement()
      }
    }
  )

  // 変更検知
  chrome.runtime.onMessage.addListener(function (
    message: string,
    sender,
    sendResponse
  ) {
    console.log("receive: popup → content_scripts")
    debugger
    const data = JSON.parse(message)

    // 字幕の透明度
    usersAreaElement.setUserCcOpacityRate(data.opacityRate)

    debugger
    // 字幕の表示非表示制御
    if (data.isDisplayOriginalCc == "1") {
      ccAreaElement.showElement()
    } else {
      ccAreaElement.hideElement()
    }

    //ccAreaElement.showElement()
  })
}

document.addEventListener("runScript", (e) => {
  main()
})

// // script呼び出し用イベント
// const event = new Event("runScript", { bubbles: true })
// document.dispatchEvent(event)
