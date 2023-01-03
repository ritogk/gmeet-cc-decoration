// import { ControlButton } from "@/elements/controlButton"
// import { CcMainArea } from "@/elements/ccMainArea"

// const controlButton = new ControlButton()
// controlButton.createElement()

// const ccMainArea = new CcMainArea()
// ccMainArea.hideElement()

import { SpeachOveserver } from "@/speachOveserver"
import { UsersAreaElement } from "@/elements/UsersAreaElement"

const usersAreaElement = new UsersAreaElement()

const callback = (name: string, imagePath: string, speach: string) => {
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

const speachOveserver = new SpeachOveserver(callback)

speachOveserver.start()
