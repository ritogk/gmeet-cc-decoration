import { selector } from "./selector"
export interface speachOveserverInterface {
  start: () => void
  stop: () => void
}

const config = { attributes: true, childList: true, subtree: true }
const oveserverNode = document.querySelector(selector.ccArea)

export class SpeachOveserver implements speachOveserverInterface {
  private callback: (name: string, imagePath: string, speach: string) => void

  constructor(
    callback: (name: string, imagePath: string, speach: string) => void
  ) {
    this.callback = callback
  }
  start() {
    const mutationCallback: MutationCallback = (
      mutations: MutationRecord[],
      observer: MutationObserver
    ) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          if (mutation.target.nodeName === "SPAN") {
            const speechArea = mutation.target
            const speachUserArea = speechArea.parentNode?.parentNode?.parentNode
            if (!speachUserArea) return
            const speachUserAreaChildren = speachUserArea.children
            this.callback(
              (speachUserAreaChildren as any)[1].innerText,
              (speachUserAreaChildren as any)[0].src,
              (speechArea as any).parentNode.innerText
            )
            // userImage =
            // userName =
            // userSpeach =
            // console.log("[字幕検知]")
            // console.log(userName)
            // console.log(userSpeach)
            // setSpeach(userName, userSpeach)
          }
        } else if (mutation.type === "attributes") {
          //   console.log(mutation)
        }
      }
    }
    const observer = new MutationObserver(mutationCallback)

    observer.observe(<Node>oveserverNode, config)
  }
  stop() {}
}
