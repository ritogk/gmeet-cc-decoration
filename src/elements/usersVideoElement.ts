import { videoAreas } from "@/elements/videoAreas"
export interface usersVideoElementInterface {
  appendUserCcElement: (name: string, speach: string) => void
  updateElement: (name: string, speach: string) => void
  deleteAll: () => void
  existCcElement: (name: string) => boolean
}

const userCcClassName = "user-cc-class-name"

export class UsersVideoElement implements usersVideoElementInterface {
  private usersVideoElement = new videoAreas().getElement()
  private displaySpeeches: {
    name: string
    time: number
    element: HTMLElement
  }[] = []
  private observerintervalId: number = 0

  constructor() {
    // 古い字幕を消す
    this.observerintervalId = window.setInterval(() => {
      const oldUsersSpeach = this.displaySpeeches.filter(
        (displayUserSpeash) =>
          (new Date().getTime() - displayUserSpeash.time) / 1000 > 10
      )

      oldUsersSpeach.forEach((x) => {
        this.removeFadeOut(x.element, 2000)
      })

      this.displaySpeeches = this.displaySpeeches.filter(
        (displayUserSpeash) =>
          (new Date().getTime() - displayUserSpeash.time) / 1000 < 10
      )
      console.log("[表示中の字幕]")
      console.log(this.displaySpeeches)
    }, 3000)
  }

  // 字幕追加
  appendUserCcElement(name: string, speach: string): void {
    const userAreaElement = this.findUserAreaElement(name)
    if (userAreaElement === undefined) return

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

    const fontSize = Math.floor(videoAreaElement.clientWidth / 35)
    const userCcElement = document.createElement("div")
    userCcElement.style.color = "white"
    userCcElement.style.position = "absolute"
    userCcElement.style.bottom = "0"
    userCcElement.style.width = "100%"
    userCcElement.style.backgroundColor = "rgba(0,0,0,0.25)"
    userCcElement.style.margin = "0"
    userCcElement.style.zIndex = "1000000"
    userCcElement.textContent = speach
    userCcElement.className = userCcClassName
    userCcElement.style.opacity = "0.5"
    userCcElement.style.fontWeight = "700"
    userCcElement.style.textAlign = "center"
    userCcElement.style.pointerEvents = "none"
    if (fontSize < 27) {
      userCcElement.style.webkitTextStroke = "1px #000"
    } else {
      userCcElement.style.webkitTextStroke = "2px #000"
    }

    if (fontSize < 18) {
      userCcElement.style.fontSize = "18px"
    } else {
      userCcElement.style.fontSize = `${fontSize}px`
    }
    videoAreaElement.parentElement?.after(userCcElement)
    // ログに追加
    this.appendDisplaySpeach(
      name,
      userAreaElement.getElementsByClassName(userCcClassName)[0] as HTMLElement
    )
  }
  updateElement(name: string, speach: string): void {}
  deleteAll(): void {}

  // 字幕の存在チェック
  existCcElement(name: string): boolean {
    const userAreaElement = this.findUserAreaElement(name)
    if (userAreaElement === undefined) return false
    return userAreaElement.getElementsByClassName(userCcClassName).length > 0
  }

  // ふわっとelementを消す
  private removeFadeOut(el: HTMLElement, speed: number) {
    var seconds = speed / 1000
    el.style.transition = "opacity " + seconds + "s ease"

    el.style.opacity = "0"
    setTimeout(function () {
      el.parentNode?.removeChild(el)
    }, speed)
  }

  // 表示した字幕を配列に追加する
  private appendDisplaySpeach(name: string, element: HTMLElement) {
    this.displaySpeeches = this.displaySpeeches.filter(
      (displayUserSpeash) => displayUserSpeash.name !== name
    )
    this.displaySpeeches.push({
      name: name,
      time: new Date().getTime(),
      element: element,
    })
  }

  // ユーザーエリアの要素を取得
  private findUserAreaElement(name: string): Element | undefined {
    if (!this.usersVideoElement) return undefined
    const userAreaList = Array.from(this.usersVideoElement.children)
    return userAreaList.find((element) => {
      // 画面共有ようのエリアはinnerTextが取得できないのでその対応
      const userNameArea = element.querySelector("[data-self-name]")
      if (!userNameArea) return false
      if (userNameArea.textContent?.startsWith(name)) {
        return true
      }
      return false
    })
  }
}
