import { Config, ConfigObjectInterface, DisplayOriginalCc } from "@/core/config"
export const main = async (): Promise<void> => {
  console.log("start: popup")

  const config = new Config((config: ConfigObjectInterface) => {})
  await config.loadConfig()
  const configData = config.getConfig()
  console.log(`load config: ${JSON.stringify(configData)}`)

  // elementsの初期設定
  const initElements = (): void => {
    // 字幕の透明度
    const opacityRateElement = <HTMLInputElement>(
      document.getElementsByName("opacityRate")[0]
    )
    opacityRateElement.value = configData.opacityRate.toString()
    // 既存の字幕
    const displayOriginalCcElements = <NodeListOf<HTMLInputElement>>(
      document.getElementsByName("displayOriginalCc")
    )
    displayOriginalCcElements[0].value = DisplayOriginalCc.OK
    displayOriginalCcElements[1].value = DisplayOriginalCc.NG
    if (configData.displayOriginalCc === DisplayOriginalCc.OK) {
      displayOriginalCcElements[0].checked = true
    }
    if (configData.displayOriginalCc === DisplayOriginalCc.NG) {
      displayOriginalCcElements[1].checked = true
    }
  }
  initElements()

  // 監視処理
  const observe = (): void => {
    const opacityRateElement = <HTMLInputElement>(
      document.getElementsByName("opacityRate")[0]
    )
    opacityRateElement.addEventListener("change", (event: Event) => {
      console.log("change opacityRate")
      if (event.target instanceof HTMLInputElement) {
        console.log(event.target.value)
        chrome.storage.local.set({ opacityRate: event.target.value })
        configData.opacityRate = parseInt(event.target.value)
      }
    })

    const displayOriginalCcElements = <NodeListOf<HTMLInputElement>>(
      document.getElementsByName("displayOriginalCc")
    )
    displayOriginalCcElements[0].addEventListener("change", (event) => {
      console.log("change displayOriginalCcElements")
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        console.log(event.target.value)
        chrome.storage.local.set({ displayOriginalCc: DisplayOriginalCc.OK })
        configData.displayOriginalCc = DisplayOriginalCc.OK
      }
    })
    displayOriginalCcElements[1].addEventListener("change", (event) => {
      console.log("change displayOriginalCcElements")
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        console.log(event.target.value)
        chrome.storage.local.set({ displayOriginalCc: DisplayOriginalCc.NG })
        configData.displayOriginalCc = DisplayOriginalCc.NG
      }
    })

    // chromeStorageを監視して変更されたらContents側にメッセージを送る
    chrome.storage.onChanged.addListener((changes, namespace) => {
      console.log("change storage")
      console.log(`send active tab: ${configData}`)
      chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs: any) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            JSON.stringify(configData),
            function (response) {}
          )
        }
      )
    })
  }
  observe()
}

window.addEventListener("load", main, false)
