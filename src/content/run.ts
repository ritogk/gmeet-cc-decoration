import { CcAreaElement } from "@/content/elements/original/ccAreaElement"
import { ControlAreaElement } from "@/content/elements/original/controlAreaElement"
import { UsersAreaElement } from "@/content/elements/original/UsersAreaElement"
import { main } from "@/content/main"
const run = (): void => {
  const ccAreaElement = new CcAreaElement()
  const controlAreaElement = new ControlAreaElement()
  const usersAreaElement = new UsersAreaElement()
  const jsLoaded = (): void => {
    if (
      ccAreaElement.getElement() &&
      controlAreaElement.getElement() &&
      usersAreaElement.getElement()
    ) {
      clearInterval(jsInitCheckTimer)
      main()
    }
  }
  const jsInitCheckTimer = setInterval(jsLoaded, 1000)
}

window.addEventListener("load", run, false)
