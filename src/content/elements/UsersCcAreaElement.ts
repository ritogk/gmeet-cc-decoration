import { UsersAreaElement } from "@/content/elements/UsersAreaElement"
import { removeElement } from "@/core/dom"
export interface usersCcAreaElementInterface {
  getElements(): NodeListOf<Element> | undefined
  deleteElements(): void
  getElement(name: string): Element | undefined
  createElement(name: string): void
  findCcElement: (name: string) => HTMLSpanElement | undefined
  appendCcElement: (name: string, speach: string) => void
  updateCcElement: (name: string, speach: string) => void
  deleteCcElement: (name: string) => void
  runInterval: () => void
  stopInterval: () => void
}

const userCcAreaClassName = "user-cc-area-class-name"
const userCcClassName = "user-cc-class-name"

/**
 * ユーザーエリアのElementに関するクラス
 */
export class UsersCcAreaElement implements usersCcAreaElementInterface {
  private usersAreaElement: UsersAreaElement
  constructor() {
    this.usersAreaElement = new UsersAreaElement()
  }

  getElements = (): NodeListOf<Element> | undefined => {
    return this.usersAreaElement
      .getElement()
      ?.querySelectorAll(userCcAreaClassName)
  }

  // all delete
  deleteElements = (): void => {
    this.displayElements.forEach((x) => {
      removeElement(x.element, 2000)
    })
  }

  getElement = (name: string): Element | undefined => {
    const userAreaElement = this.usersAreaElement.findUserAreaElement(name)
    return (
      userAreaElement?.querySelector("." + userCcAreaClassName) ?? undefined
    )
  }

  createElement = (name: string): void => {
    const element = document.createElement("div")

    const userVideoElement = this.usersAreaElement.findUserVideoElement(name)
    if (!userVideoElement) return

    const fontSize = Math.floor(userVideoElement.clientWidth / 35)

    const userCcAreaElement = document.createElement("div")
    userCcAreaElement.style.position = "absolute"
    userCcAreaElement.style.bottom = "0"
    userCcAreaElement.style.textAlign = "left"
    userCcAreaElement.style.backgroundColor = "rgba(0,0,0,0.25)"
    userCcAreaElement.style.margin = "0"
    userCcAreaElement.style.zIndex = "1000000"
    userCcAreaElement.style.left = "0"
    userCcAreaElement.style.right = "0"
    userCcAreaElement.style.pointerEvents = "none"
    userCcAreaElement.style.overflow = "hidden"
    userCcAreaElement.scrollTop = 1000
    userCcAreaElement.className = userCcAreaClassName
    if (fontSize >= 16) {
      userCcAreaElement.style.height = `${
        userVideoElement.clientHeight / 3.3
      }px`
      const padding = (userVideoElement.clientWidth * 0.365) / 2
      userCcAreaElement.style.paddingLeft = `${padding}px`
      userCcAreaElement.style.paddingRight = `${padding}px`
    } else {
      userCcAreaElement.style.paddingLeft = `10px`
      userCcAreaElement.style.paddingRight = `10px`
    }
    userVideoElement.parentElement?.after(userCcAreaElement)
    this.appendDisplayElement(name, userCcAreaElement)
  }

  // ユーザー字幕の取得
  findCcElement = (name: string): HTMLSpanElement | undefined => {
    const userAreaElement = this.usersAreaElement.findUserAreaElement(name)
    if (!userAreaElement) return undefined
    const userCcElement = userAreaElement.querySelector("." + userCcClassName)
    return userCcElement !== null ? <HTMLDivElement>userCcElement : undefined
  }

  // 字幕 追加
  appendCcElement = (name: string, speach: string): void => {
    const userVideoElement = this.usersAreaElement.findUserVideoElement(name)
    if (!userVideoElement) return
    const userCcElement = document.createElement("span")
    userCcElement.style.color = "white"
    userCcElement.style.margin = "0"
    userCcElement.style.zIndex = "1000001"
    userCcElement.textContent = speach
    userCcElement.className = userCcClassName
    userCcElement.style.opacity = this.userCcOpacityRate.toString()
    userCcElement.style.fontWeight = "700"
    userCcElement.style.pointerEvents = "none"
    const fontSize = Math.floor(userVideoElement.clientWidth / 35)
    fontSize < 18
      ? (userCcElement.style.fontSize = "15px")
      : (userCcElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (userCcElement.style.webkitTextStroke = "1px #000")
      : (userCcElement.style.webkitTextStroke = "2px #000")

    this.getElement(name)?.appendChild(userCcElement)
  }

  // 字幕 更新
  updateCcElement = (name: string, speach: string): void => {
    const userVideoElement = this.usersAreaElement.findUserVideoElement(name)
    if (!userVideoElement) return
    const userCcElement = this.findCcElement(name)
    if (!userCcElement) return
    userCcElement.textContent = speach
    const fontSize = Math.floor(userVideoElement.clientWidth / 35)
    fontSize < 18
      ? (userCcElement.style.fontSize = "15px")
      : (userCcElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (userCcElement.style.webkitTextStroke = "1px #000")
      : (userCcElement.style.webkitTextStroke = "2px #000")
    const userCcAreaElement = userCcElement.parentElement
    if (!userCcAreaElement) return
    if (userCcAreaElement) {
      userCcAreaElement.scrollTop = 1000
    }
    if (fontSize >= 16) {
      userCcAreaElement.style.height = `${
        userVideoElement.clientHeight / 3.3
      }px`
      const padding = (userVideoElement.clientWidth * 0.365) / 2
      userCcAreaElement.style.paddingLeft = `${padding}px`
      userCcAreaElement.style.paddingRight = `${padding}px`
    } else {
      userCcAreaElement.style.paddingLeft = `10px`
      userCcAreaElement.style.paddingRight = `10px`
    }
    // ログに追加
    this.appendDisplayElement(name, userCcAreaElement)
  }

  // 字幕 削除
  deleteCcElement = (name: string): void => {
    const displaySpeach = this.displayElements.find((x) => x.name === name)
    if (!displaySpeach) return
    removeElement(displaySpeach.element, 2000)
  }

  // 字幕の透明度を変える
  private userCcOpacityRate = 0.5
  setUserCcOpacityRate = (opacityRate: number) => {
    this.userCcOpacityRate = opacityRate
    this.displayElements.forEach((x) => {
      x.element.style.opacity = this.userCcOpacityRate.toString()
    })
  }
  private displayElements: {
    name: string
    time: number
    element: HTMLElement
  }[] = []
  private appendDisplayElement = (name: string, element: HTMLElement): void => {
    this.displayElements = this.displayElements.filter(
      (displayUserSpeash) => displayUserSpeash.name !== name
    )
    this.displayElements.push({
      name: name,
      time: new Date().getTime(),
      element: element,
    })
  }

  private readonly cclimitSecond = 7
  private intervalId: number = 0
  runInterval = (): void => {
    // // 一定時間表示した字幕は消す
    // this.intervalId = window.setInterval(() => {
    //   const oldDisplayUserCcList = this.displayUserCcList.filter(
    //     (x) => (new Date().getTime() - x.time) / 1000 > this.cclimitSecond
    //   )
    //   oldDisplayUserCcList.forEach((x) => {
    //     removeElement(x.element, 2000)
    //   })
    //   this.displayUserCcList = this.displayUserCcList.filter(
    //     (x) => (new Date().getTime() - x.time) / 1000 < this.cclimitSecond
    //   )
    // }, 3000)
  }
  stopInterval = (): void => {
    clearInterval(this.intervalId)
  }
}
