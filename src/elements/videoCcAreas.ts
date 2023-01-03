import { videoAreas } from "@/elements/videoAreas"
export interface videoCcAreasInterface {
  appendElement: (name: string, speach: string) => void
  updateElement: (name: string, speach: string) => void
  deleteAll: () => void
  existElement: (name: string) => boolean
}

const videoCcAeraClassName = "speachArea"

export class VideoCcAreas implements videoCcAreasInterface {
  private videoAreasElement = new videoAreas().getElement()
  appendElement(name: string, speach: string): void {
    debugger
    if (!this.videoAreasElement) return
    const userAreaList = Array.from(this.videoAreasElement.children)

    const userAreaElement = userAreaList.find((element) => {
      // 画面共有ようのエリアはinnerTextが取得できないのでその対応
      const userNameArea = element.querySelector("[data-self-name]")
      if (!userNameArea) return false
      if (userNameArea.textContent?.startsWith(name)) {
        return true
      }
      return false
    })
    if (!userAreaElement) return

    // 非表示のVideoタグが紛れる事があるのでその対応。
    const videoAreaElements = userAreaElement.querySelectorAll("video")
    let videoAreaElement: HTMLVideoElement | null = null
    if (videoAreaElements.length >= 2) {
      videoAreaElements.forEach((element) => {
        if (element.style.display == "none") return
        videoAreaElement = element
      })
    } else {
      videoAreaElement = videoAreaElements[0]
    }
    if (videoAreaElement === null) return

    const videoSpeachElements =
      userAreaElement.getElementsByClassName(videoCcAeraClassName)
    const fontSize = Math.floor(videoAreaElement.clientWidth / 35)
    if (videoSpeachElements.length === 0) {
      // 新規
      const newElement = document.createElement("div")
      newElement.style.color = "white"
      newElement.style.position = "absolute"
      newElement.style.bottom = "0"
      newElement.style.width = "100%"
      newElement.style.backgroundColor = "rgba(0,0,0,0.25)"
      newElement.style.margin = "0"
      newElement.style.zIndex = "1000000"
      newElement.textContent = speach
      newElement.className = videoCcAeraClassName
      newElement.style.opacity = "0.5"
      newElement.style.fontWeight = "700"
      newElement.style.textAlign = "center"
      newElement.style.pointerEvents = "none"
      if (fontSize < 27) {
        newElement.style.webkitTextStroke = "1px #000"
      } else {
        newElement.style.webkitTextStroke = "2px #000"
      }

      if (fontSize < 18) {
        newElement.style.fontSize = "18px"
      } else {
        newElement.style.fontSize = `${fontSize}px`
      }
      videoAreaElement.parentElement?.after(newElement)
    } else {
      // 更新
      const videoSpeachElement = <HTMLElement>videoSpeachElements[0]
      if (fontSize < 27) {
        videoSpeachElement.style.webkitTextStroke = "1px #000"
      } else {
        videoSpeachElement.style.webkitTextStroke = "2px #000"
      }

      if (fontSize < 18) {
        videoSpeachElement.style.fontSize = "16px"
      } else {
        videoSpeachElement.style.fontSize = `${fontSize}px`
      }
      videoSpeachElement.textContent = speach
    }
  }
  updateElement(name: string, speach: string): void {}
  deleteAll(): void {}
  existElement(name: string): boolean {
    return false
  }

  // private generateElementStyle(videoWidth: number): ElementCSSInlineStyle {
  //   // ぐるぐるまわしてセットしたい。
  //   //   const element = this.getElement()
  //   //   if (element === null) return
  //   //   element.style.width = "40px"
  //   //   element.style.height = "40px"
  //   //   element.style.backgroundColor = "rgb(60, 64, 67)"
  //   //   element.style.borderRadius = "20px"
  //   //   element.style.paddingTop = "12px"
  //   //   element.style.paddingBottom = "12px"
  //   //   element.style.display = "inline-block"
  //   //   element.style.boxSizing = "border-box"
  //   //   element.style.filter = "brightness(1)"
  //   //   element.innerText = "ON"
  //   //   element.style.color = "#FFF"
  //   //   if (this.mouseOver) {
  //   //     element.style.filter = "brightness(1.15)"
  //   //   }
  //   //   if (this.clicked) {
  //   //     element.style.color = "#000"
  //   //     element.innerText = "OFF"
  //   //     element.style.backgroundColor = "rgb(138,180,248)"
  //   //   }
  // }
}
