// 監視処理
import { ConfigObjectInterface } from "@/core/config"

const getStorage = (key: string, value: any): void => {}

export const setStorage = (key: string, value: any): void => {
  chrome.storage.local.set({ [key]: value })
}

export const sendContents = (config: ConfigObjectInterface): void => {
  console.log(`send active tab: ${config}`)
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        JSON.stringify(config),
        function (response) {}
      )
    }
  )
}
