import { CcAreaElement } from "@/content/elements/original/ccAreaElement"
import { ControlAreaElement } from "@/content/elements/original/controlAreaElement"
import { ControlCcButtonElement } from "@/content/elements/original/controlCcButtonElement"
import { UsersAreaElement } from "@/content/elements/original/UsersAreaElement"
import { main } from "@/content/main"
import { Selector } from "@/content/core/selector"
import { sendMessage } from "@/core/slack"
import { SlackApi, Channel } from "@ritogk/private-api"

const slackApi = new SlackApi()

slackApi.apiSlackSendPost({
  apiSlackSendPostRequest: {
    channel: Channel.LogXserverVps,
    text: "testdayo!",
  },
})

const run = async () => {
  const selector = Selector.getInstance()
  await selector.loadSelector()

  const ccAreaElement = new CcAreaElement()
  const controlAreaElement = new ControlAreaElement()
  const controlCcButtonElement = new ControlCcButtonElement()
  const usersAreaElement = new UsersAreaElement()

  // 会議画面が表示された時間
  let meetShowedTime = 0
  const jsLoaded = (): void => {
    // URLが会議画面(https://meet.google.com/xxx-yyy-zzzz)でない場合は処理させない
    if (location.href === "https://meet.google.com/") return
    if (meetShowedTime === 0) {
      meetShowedTime = Date.now()
    }
    // 全ての要素が描画されるまで待つ
    const ccArea = ccAreaElement.getElement()
    const controlArea = controlAreaElement.getElement()
    const controlCcButton = controlCcButtonElement.getElement()
    const usersArea = usersAreaElement.getElement()
    if (ccArea && controlArea && controlCcButton && usersArea) {
      clearInterval(jsInitCheckTimer)
      main()
    } else {
      if (Date.now() - meetShowedTime >= 15000) {
        const errorReport = [
          { ccArea: ccArea ? "○" : "✕" },
          { controlArea: controlArea ? "○" : "✕" },
          { controlCcButton: controlCcButton ? "○" : "✕" },
          { usersArea: usersArea ? "○" : "✕" },
        ]
        sendMessage(JSON.stringify(errorReport))
        clearInterval(jsInitCheckTimer)
      }
    }
  }
  const jsInitCheckTimer = setInterval(jsLoaded, 1000)
}

window.addEventListener("load", run, false)
