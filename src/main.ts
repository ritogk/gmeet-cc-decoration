import { SpeachOveserver } from "@/speachOveserver"
import { UsersAreaElement } from "@/elements/UsersAreaElement"

const usersAreaElement = new UsersAreaElement()

const callbackObserver = (name: string, imagePath: string, speach: string) => {
  console.log("[字幕変更検知]")
  console.log(name)
  console.log(imagePath)
  console.log(speach)

  if (usersAreaElement.findUserCcElement(name)) {
    usersAreaElement.appendUserCcElement(name, speach)
  } else {
    usersAreaElement.updateUserCcElement(name, speach)
  }
}

const speachOveserver = new SpeachOveserver(callbackObserver)

import { ControlButtonElement } from "@/elements/controlButtonElement"
const clickCallback = (clicked: boolean) => {
  debugger
  if (clicked) {
    // 字幕監視実行
    speachOveserver.start()
    usersAreaElement.runInterval()
  } else {
    // 字幕監視停止
    speachOveserver.stop()
    usersAreaElement.stopInterval()
  }
}
const controlButtonElement = new ControlButtonElement(clickCallback)
controlButtonElement.createElement()
