import { selector } from "@/selector"
export interface usersAreaElementInterface {
  getElement(): HTMLElement | null
  appendUserCcElement: (name: string, speach: string) => void
  updateUserCcElement: (name: string, speach: string) => void
  deleteAll: () => void
  findUserCcElement: (name: string) => Element | undefined
}

const userCcClassName = "user-cc-class-name"

export class UsersAreaElement implements usersAreaElementInterface {
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

  getElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.usersArea)
  }

  // 字幕追加
  appendUserCcElement(name: string, speach: string): void {
    const userAreaElement = this.findUserAreaElement(name)
    if (userAreaElement) return

    const userVideoElement = this.findUserVideoElement(name)
    if (!userVideoElement) return

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
    const fontSize = Math.floor(userVideoElement.clientWidth / 35)
    fontSize < 18
      ? (userCcElement.style.fontSize = "18px")
      : (userCcElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (userCcElement.style.webkitTextStroke = "1px #000")
      : (userCcElement.style.webkitTextStroke = "2px #000")
    userVideoElement.parentElement?.after(userCcElement)

    // ログに追加
    const userCcEmenet = this.findUserCcElement(name)
    if (!userCcEmenet) return
    this.appendDisplaySpeach(name, userCcEmenet)
  }

  // 更新
  updateUserCcElement(name: string, speach: string): void {
    const userAreraElement = this.findUserAreaElement(name)
    if (!userAreraElement) return

    const userVideoElement = this.findUserVideoElement(name)
    if (!userVideoElement) return

    const userCcElement = this.findUserCcElement(name)
    if (!userCcElement) return

    const fontSize = Math.floor(userVideoElement.clientWidth / 35)
    fontSize < 18
      ? (userCcElement.style.fontSize = "18px")
      : (userCcElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (userCcElement.style.webkitTextStroke = "1px #000")
      : (userCcElement.style.webkitTextStroke = "2px #000")
    // ログに追加
    this.appendDisplaySpeach(name, userCcElement)
  }
  deleteAll(): void {}

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
    const usersAreaElement = this.getElement()
    if (!usersAreaElement) return undefined
    const userAreaList = Array.from(usersAreaElement.children)
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

  // ユーザーのvideo要素を取得
  findUserVideoElement(name: string): HTMLVideoElement | undefined {
    const userAreaElement = this.findUserAreaElement(name)
    if (userAreaElement === undefined) return undefined
    // 非表示のVideoタグが紛れる事があるのでその対応。
    const videoAreaElements = userAreaElement.querySelectorAll("video")
    let userVideoElement: HTMLVideoElement | null = null
    if (videoAreaElements.length >= 2) {
      videoAreaElements.forEach((element) => {
        if (element.style.display == "none") return
        userVideoElement = element
      })
    } else {
      userVideoElement = videoAreaElements[0]
    }
    return userVideoElement !== null ? userVideoElement : undefined
  }

  // ユーザー字幕の取得
  findUserCcElement(name: string): HTMLDivElement | undefined {
    const userAreaElement = this.findUserAreaElement(name)
    if (userAreaElement === undefined) return undefined

    const userCcElement = userAreaElement.querySelector("." + userCcClassName)
    return userCcElement !== null ? <HTMLDivElement>userCcElement : undefined
  }
}
