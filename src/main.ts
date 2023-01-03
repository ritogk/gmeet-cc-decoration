import { CcOveserver } from "@/ccOveserver"
import { UsersAreaElement } from "@/elements/UsersAreaElement"

const usersAreaElement = new UsersAreaElement()
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

import { ControlButtonElement } from "@/elements/controlButtonElement"
import { CcMainAreaElement } from "@/elements/ccMainAreaElement"
const ccMainAreaElement = new CcMainAreaElement()
const callbackFuncClick = (clicked: boolean) => {
  console.log("click: controlButton")
  if (clicked) {
    ccOveserver.run()
    console.log("start: observer")
    usersAreaElement.runInterval()
    console.log("run: interval")
    ccMainAreaElement.opacateElement()
  } else {
    // 字幕監視停止
    ccOveserver.stop()
    console.log("stop: observer")
    usersAreaElement.stopInterval()
    console.log("stop: interval")
    usersAreaElement.deleteUserCcElements()
    console.log("delete: cc elements")
    ccMainAreaElement.showElement()
  }
}
const ccOveserver = new CcOveserver(callbackFuncObserver)
const controlButtonElement = new ControlButtonElement(callbackFuncClick)
controlButtonElement.createElement()
