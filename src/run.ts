import { selector } from "@/core/selector"
import { main } from "@/main"
window.addEventListener("load", run, false)

function run() {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000)
  function jsLoaded() {
    if (document.querySelector(selector.ccMainArea) != null) {
      clearInterval(jsInitCheckTimer)
      main()
    }
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("haittekita yo!")
  console.log(message)
})
