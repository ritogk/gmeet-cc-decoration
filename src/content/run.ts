import { selector } from "@/content/core/selector"
import { main } from "@/content/main"
const run = (): void => {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000)
  function jsLoaded() {
    if (document.querySelector(selector.ccMainArea) != null) {
      clearInterval(jsInitCheckTimer)
      main()
    }
  }
}

window.addEventListener("load", run, false)
