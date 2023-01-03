import { SpeachOveserver } from "@/speachOveserver"
import { UsersAreaElement } from "@/elements/UsersAreaElement"

const usersAreaElement = new UsersAreaElement()

const callbackObserver = (name: string, imagePath: string, speach: string) => {
  console.log("mutate: speach")
  console.log(`name: ${name}`)
  console.log(`imagePath: ${imagePath}`)
  console.log(`speach: ${speach}`)

  if (usersAreaElement.findUserCcElement(name)) {
    usersAreaElement.appendUserCcElement(name, speach)
  } else {
    usersAreaElement.updateUserCcElement(name, speach)
  }
}

const speachOveserver = new SpeachOveserver(callbackObserver)

import { ControlButtonElement } from "@/elements/controlButtonElement"
const clickCallback = (clicked: boolean) => {
  console.log("click: controlButton")
  if (clicked) {
    // 字幕監視実行
    speachOveserver.start()
    console.log("start: observer")
    usersAreaElement.runInterval()
    console.log("run: interval")
  } else {
    // 字幕監視停止
    speachOveserver.stop()
    console.log("stop: observer")
    usersAreaElement.stopInterval()
    console.log("stop: interval")
    usersAreaElement.deleteUserCcElements()
    console.log("delete: cc elements")
  }
}
const controlButtonElement = new ControlButtonElement(clickCallback)
controlButtonElement.createElement()
