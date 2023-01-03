import { UsersAreaElement } from "@/elements/UsersAreaElement"
import { ControlButtonElement } from "@/elements/controlButtonElement"
import { CcAreaElement } from "@/elements/ccAreaElement"
import { CcOveserver } from "@/core/ccOveserver"

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
    ccAreaElement.opacateElement()
  } else {
    ccOveserver.stop()
    console.log("stop: observer")
    usersAreaElement.stopInterval()
    console.log("stop: interval")
    usersAreaElement.deleteUserCcElements()
    console.log("delete: cc elements")
    ccAreaElement.showElement()
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
  console.log("mutate: speach")
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
