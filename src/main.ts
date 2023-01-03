// import { ControlButton } from "@/elements/controlButton"
// import { CcMainArea } from "@/elements/ccMainArea"

// const controlButton = new ControlButton()
// controlButton.createElement()

// const ccMainArea = new CcMainArea()
// ccMainArea.hideElement()

import { SpeachOveserver } from "@/speachOveserver"

const callback = (name: string, imagePath: string, speach: string) => {
  console.log("[字幕変更検知]")
  console.log(name)
  console.log(imagePath)
  console.log(speach)
}

const speachOveserver = new SpeachOveserver(callback)

speachOveserver.start()
