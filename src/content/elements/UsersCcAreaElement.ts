import { UsersAreaElement } from "@/content/elements/original/UsersAreaElement"
import { removeElement } from "@/core/dom"
export interface usersCcAreaElementInterface {
  getElements(): NodeListOf<Element> | undefined
  deleteElements(): void
  getElement(name: string): Element | undefined
  createElement(name: string): void
  updateElement(name: string): void
  findCcElement: (name: string) => HTMLSpanElement | undefined
  appendCcElement: (name: string, speach: string) => void
  updateCcElement: (name: string, speach: string) => void
  deleteCcElement: (name: string) => void
  setUserCcOpacityRate: (opacityRate: number) => void
  setCcSizeRate: (ccSizeRate: number) => void
  runInterval: () => void
  stopInterval: () => void
}

const userCcAreaClassName = "user-cc-area-class-name"
const userCcClassName = "user-cc-class-name"

enum CcSize {
  SMALL,
  Large,
}

/**
 * 全ユーザーの字幕Elementに関するクラス
 */
export class UsersCcAreaElement implements usersCcAreaElementInterface {
  private interval_excuting = false
  private usersAreaElement: UsersAreaElement
  private userCcOpacityRate = 0.5
  private userCcSizeRate = 0.5

  constructor(interval_excuting: boolean) {
    this.interval_excuting = interval_excuting
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
    const userVideoElement = this.usersAreaElement.findUserVideoElement(name)
    if (!userVideoElement) return

    const userCcAreaElement = document.createElement("div")
    userCcAreaElement.style.position = "absolute"
    userCcAreaElement.style.bottom = "0"
    userCcAreaElement.style.textAlign = "left"
    userCcAreaElement.style.backgroundColor = "rgba(0,0,0,0.28)"
    userCcAreaElement.style.margin = "0"
    userCcAreaElement.style.zIndex = "1000000"
    userCcAreaElement.style.left = "0"
    userCcAreaElement.style.right = "0"
    userCcAreaElement.style.pointerEvents = "none"
    userCcAreaElement.style.overflow = "hidden"
    userCcAreaElement.scrollTop = 1000
    userCcAreaElement.className = userCcAreaClassName
    const ccSize = this.calcCcSize(userVideoElement)
    switch (ccSize) {
      case CcSize.Large:
        userCcAreaElement.style.height = `${
          (userVideoElement.clientHeight / 2.8) * (this.userCcSizeRate * 2)
        }px`
        const padding = (userVideoElement.clientWidth * 0.28) / 2
        userCcAreaElement.style.paddingLeft = `${padding}px`
        userCcAreaElement.style.paddingRight = `${padding}px`
        break
      case CcSize.SMALL:
        userCcAreaElement.style.height = `${
          (userVideoElement.clientHeight / 2.1) * (this.userCcSizeRate * 2)
        }px`
        userCcAreaElement.style.paddingLeft = `10px`
        userCcAreaElement.style.paddingRight = `10px`
      default:
        break
    }
    userVideoElement.parentElement?.after(userCcAreaElement)
    this.appendDisplayElement(name, userCcAreaElement)
  }

  updateElement = (name: string): void => {
    const userVideoElement = this.usersAreaElement.findUserVideoElement(name)
    if (!userVideoElement) return

    const userAreaElement = this.usersAreaElement.findUserAreaElement(name)
    if (!userAreaElement) return

    const userCcAreaElement = <HTMLDivElement | undefined>(
      userAreaElement.querySelector("." + userCcAreaClassName)
    )
    if (!userCcAreaElement) return
    if (userCcAreaElement) {
      userCcAreaElement.scrollTop = 1000
    }
    const ccSize = this.calcCcSize(userVideoElement)
    switch (ccSize) {
      case CcSize.Large:
        userCcAreaElement.style.height = `${
          (userVideoElement.clientHeight / 2.8) * (this.userCcSizeRate * 2)
        }px`
        const padding = (userVideoElement.clientWidth * 0.28) / 2
        userCcAreaElement.style.paddingLeft = `${padding}px`
        userCcAreaElement.style.paddingRight = `${padding}px`
        break
      case CcSize.SMALL:
        userCcAreaElement.style.height = `${
          (userVideoElement.clientHeight / 2.1) * (this.userCcSizeRate * 2)
        }px`
        userCcAreaElement.style.paddingLeft = `10px`
        userCcAreaElement.style.paddingRight = `10px`
      default:
        break
    }
    this.deleteDisplayElement(name)
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
    const userCcElement = document.createElement("div")

    // 「。」で改行させる
    userCcElement.innerHTML = speach.replace(/\。/g, "。<br>")
    userCcElement.style.color = "white"
    userCcElement.style.margin = "0"
    userCcElement.style.zIndex = "1000001"
    userCcElement.className = userCcClassName
    userCcElement.style.opacity = this.userCcOpacityRate.toString()
    userCcElement.style.fontWeight = "700"
    userCcElement.style.pointerEvents = "none"

    const style = this.generateUserCcStyle(userVideoElement.clientWidth)
    userCcElement.style.fontSize = style.fontSize
    userCcElement.style.webkitTextStroke = style.webkitTextStroke
    this.getElement(name)?.appendChild(userCcElement)
  }

  // 字幕 更新
  updateCcElement = (name: string, speach: string): void => {
    // 空白文字の場合は更新させない。
    if (speach.trim().length === 0) return

    const userVideoElement = this.usersAreaElement.findUserVideoElement(name)
    if (!userVideoElement) return
    const userCcElement = this.findCcElement(name)
    if (!userCcElement) return

    // 「。」で改行させる
    userCcElement.innerHTML = speach.replace(/\。/g, "。<br>")
    userCcElement.style.opacity = this.userCcOpacityRate.toString()

    const style = this.generateUserCcStyle(userVideoElement.clientWidth)
    userCcElement.style.fontSize = style.fontSize
    userCcElement.style.webkitTextStroke = style.webkitTextStroke
  }

  // 字幕 削除
  deleteCcElement = (name: string): void => {
    const displaySpeach = this.displayElements.find((x) => x.name === name)
    if (!displaySpeach) return
    removeElement(displaySpeach.element, 2000)
  }

  // 字幕のフォントサイズを計算
  calcCcSize = (element: Element): CcSize => {
    return element.clientWidth >= 550 ? CcSize.Large : CcSize.SMALL
  }

  // 字幕の透明度を変える
  setUserCcOpacityRate = (opacityRate: number): void => {
    this.userCcOpacityRate = opacityRate
    this.displayElements.forEach((x) => {
      const userVideoElement = this.usersAreaElement.findUserVideoElement(
        x.name
      )
      if (!userVideoElement) return
      const userCcElement = this.findCcElement(x.name)
      if (!userCcElement) return
      userCcElement.style.opacity = this.userCcOpacityRate.toString()
    })
  }

  // 字幕のサイズを変える
  setCcSizeRate = (ccSizeRate: number): void => {
    this.userCcSizeRate = ccSizeRate
    this.displayElements.forEach((x) => {
      const userVideoElement = this.usersAreaElement.findUserVideoElement(
        x.name
      )
      if (!userVideoElement) return

      const ccSize = this.calcCcSize(userVideoElement)
      switch (ccSize) {
        case CcSize.Large:
          x.element.style.height = `${
            (userVideoElement.clientHeight / 2.8) * (this.userCcSizeRate * 2)
          }px`
          const padding = (userVideoElement.clientWidth * 0.28) / 2
          x.element.style.paddingLeft = `${padding}px`
          x.element.style.paddingRight = `${padding}px`
          break
        case CcSize.SMALL:
          x.element.style.height = `${
            (userVideoElement.clientHeight / 2.1) * (this.userCcSizeRate * 2)
          }px`
          x.element.style.paddingLeft = `10px`
          x.element.style.paddingRight = `10px`
        default:
          break
      }

      const style = this.generateUserCcStyle(userVideoElement.clientWidth)
      const userCcElement = this.findCcElement(x.name)
      if (!userCcElement) return
      userCcElement.style.fontSize = style.fontSize
      userCcElement.style.webkitTextStroke = style.webkitTextStroke
    })
  }

  // 字幕のstyleを生成する
  private generateUserCcStyle = (
    baseWidth: number
  ): { fontSize: string; webkitTextStroke: string } => {
    const style = { fontSize: "15px", webkitTextStroke: "1px #000" }
    const ccSize = baseWidth >= 550 ? CcSize.Large : CcSize.SMALL
    switch (ccSize) {
      case CcSize.Large:
        const fontSize = Math.floor(baseWidth / 30) * (this.userCcSizeRate * 2)
        style.fontSize = `${fontSize}px`
        style.webkitTextStroke = `${fontSize >= 23 ? 2 : 1}px #000`
        break
      case CcSize.SMALL:
        style.fontSize = `${15 * (this.userCcSizeRate * 2)}px`
        style.webkitTextStroke = "1px #000"
      default:
        break
    }
    return style
  }

  private displayElements: {
    name: string
    time: number
    element: HTMLElement
  }[] = []
  private appendDisplayElement = (name: string, element: HTMLElement): void => {
    this.displayElements.push({
      name: name,
      time: new Date().getTime(),
      element: element,
    })
  }

  private deleteDisplayElement = (name: string): void => {
    this.displayElements = this.displayElements.filter(
      (displayUserSpeash) => displayUserSpeash.name !== name
    )
  }

  private readonly cclimitSecond = 8
  private intervalId: number = 0
  runInterval = (): void => {
    if (this.interval_excuting) return
    // 一定時間表示した字幕は消す
    this.intervalId = window.setInterval(() => {
      const oldDisplayElements = this.displayElements.filter(
        (x) => (new Date().getTime() - x.time) / 1000 > this.cclimitSecond
      )
      oldDisplayElements.forEach((x) => {
        removeElement(x.element, 2000)
      })
      this.displayElements = this.displayElements.filter(
        (x) => (new Date().getTime() - x.time) / 1000 < this.cclimitSecond
      )
    }, 3000)
  }
  stopInterval = (): void => {
    clearInterval(this.intervalId)
  }
}
