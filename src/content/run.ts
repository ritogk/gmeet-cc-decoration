import { CcAreaElement } from "@/content/elements/original/ccAreaElement"
import { ControlAreaElement } from "@/content/elements/original/controlAreaElement"
import { UsersAreaElement } from "@/content/elements/original/UsersAreaElement"
import { main } from "@/content/main"
import { Selector } from "@/content/core/selector"

const run = async () => {
  const selector = Selector.getInstance()
  await selector.loadSelector()

  const ccAreaElement = new CcAreaElement()
  const controlAreaElement = new ControlAreaElement()
  const usersAreaElement = new UsersAreaElement()
  const jsLoaded = (): void => {
    // 全ての要素が描画されるまで待つ
    if (
      ccAreaElement.getElement() &&
      controlAreaElement.getElement() &&
      controlAreaElement.getCcBottomElement() &&
      usersAreaElement.getElement()
    ) {
      clearInterval(jsInitCheckTimer)
      main()
    }
  }
  const jsInitCheckTimer = setInterval(jsLoaded, 1000)
}

window.addEventListener("load", run, false)
