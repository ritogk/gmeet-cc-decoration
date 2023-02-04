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
    const userAreaElement = this.usersAreaElement.findUserAreaElement(name)
    if (!userAreaElement) return

    const userCcAreaElement = document.createElement("div")

    // style
    const style = this.generateElementStyle(
      userAreaElement.clientWidth,
      userAreaElement.clientHeight
    )
    userCcAreaElement.style.height = style.height
    userCcAreaElement.style.fontSize = style.fontSize
    userCcAreaElement.style.lineHeight = style.lineHeight
    userCcAreaElement.style.webkitTextStroke = style.webkitTextStroke
    userCcAreaElement.style.paddingLeft = style.paddingLeft
    userCcAreaElement.style.paddingRight = style.paddingRight
    userCcAreaElement.style.position = style.position
    userCcAreaElement.style.bottom = style.bottom
    userCcAreaElement.style.textAlign = style.textAlign
    userCcAreaElement.style.backgroundColor = style.backgroundColor
    userCcAreaElement.style.margin = style.margin
    userCcAreaElement.style.zIndex = style.zIndex
    userCcAreaElement.style.left = style.left
    userCcAreaElement.style.right = style.right
    userCcAreaElement.style.pointerEvents = style.pointerEvents
    userCcAreaElement.style.overflow = style.overflow

    // 字幕を上スクロールさせる
    userCcAreaElement.scrollTop = 1000
    userCcAreaElement.className = userCcAreaClassName

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

    const style = this.generateElementStyle(
      userAreaElement.clientWidth,
      userAreaElement.clientHeight
    )
    userCcAreaElement.style.height = style.height
    userCcAreaElement.style.fontSize = style.fontSize
    userCcAreaElement.style.lineHeight = style.lineHeight
    userCcAreaElement.style.webkitTextStroke = style.webkitTextStroke
    userCcAreaElement.style.paddingLeft = style.paddingLeft
    userCcAreaElement.style.paddingRight = style.paddingRight
    this.deleteDisplayElement(name)
    this.appendDisplayElement(name, userCcAreaElement)
  }

  // 字幕エリアの取得
  findCcElement = (name: string): HTMLSpanElement | undefined => {
    const userAreaElement = this.usersAreaElement.findUserAreaElement(name)
    if (!userAreaElement) return undefined
    const userCcElement = userAreaElement.querySelector("." + userCcClassName)
    return userCcElement !== null ? <HTMLDivElement>userCcElement : undefined
  }

  // 字幕エリア 追加
  appendCcElement = (name: string, speach: string): void => {
    const userVideoElement = this.usersAreaElement.findUserVideoElement(name)
    if (!userVideoElement) return
    const userAreaElement = this.usersAreaElement.findUserAreaElement(name)
    if (!userAreaElement) return

    const userCcElement = document.createElement("div")

    // 「。」で改行させる
    userCcElement.innerHTML = speach.replace(/\。/g, "。<br>")
    userCcElement.className = userCcClassName

    // style
    const style = this.generateUserCcStyle(userAreaElement.clientWidth)
    userCcElement.style.color = style.color
    userCcElement.style.margin = style.margin
    userCcElement.style.zIndex = style.zIndex
    userCcElement.style.opacity = style.opacity
    userCcElement.style.fontWeight = style.fontWeight
    userCcElement.style.pointerEvents = style.pointerEvents

    this.getElement(name)?.appendChild(userCcElement)
  }

  // 字幕エリア 更新
  updateCcElement = (name: string, speach: string): void => {
    // 空白文字の場合は更新させない。
    if (speach.trim().length === 0) return

    const userVideoElement = this.usersAreaElement.findUserVideoElement(name)
    if (!userVideoElement) return
    const userAreaElement = this.usersAreaElement.findUserAreaElement(name)
    if (!userAreaElement) return
    const userCcElement = this.findCcElement(name)
    if (!userCcElement) return

    // 「。」で改行させる
    userCcElement.innerHTML = speach.replace(/\。/g, "。<br>")
    userCcElement.style.opacity = this.userCcOpacityRate.toString()

    const style = this.generateUserCcStyle(userAreaElement.clientWidth)
  }

  // 字幕エリア 削除
  deleteCcElement = (name: string): void => {
    const displaySpeach = this.displayElements.find((x) => x.name === name)
    if (!displaySpeach) return
    removeElement(displaySpeach.element, 2000)
  }

  // 字幕エリアのstyleを生成する
  private generateElementStyle = (
    baseWidth: number,
    baseHeight: number
  ): {
    height: string
    fontSize: string
    lineHeight: string
    webkitTextStroke: string
    paddingLeft: string
    paddingRight: string
    position: string
    bottom: string
    textAlign: string
    backgroundColor: string
    margin: string
    zIndex: string
    left: string
    right: string
    pointerEvents: string
    overflow: string
  } => {
    const style = {
      height: "",
      fontSize: "15px",
      lineHeight: "15px",
      webkitTextStroke: "1px #000",
      paddingLeft: "",
      paddingRight: "",
      position: "absolute",
      bottom: "0",
      textAlign: "left",
      backgroundColor: "rgba(0,0,0,0.28)",
      margin: "0",
      zIndex: "1000000",
      left: "0",
      right: "0",
      pointerEvents: "none",
      overflow: "hidden",
    }

    const height = (baseHeight / 2.8) * (this.userCcSizeRate * 2)
    style.height = `${height}px`
    const padding = (baseWidth * 0.28) / 2
    style.paddingLeft = `${padding}px`
    style.paddingRight = `${padding}px`
    const lineHeight = height / 4
    const fontSize = lineHeight * 0.7
    style.fontSize = `${fontSize}px`
    style.lineHeight = `${lineHeight}px`
    style.webkitTextStroke = `${fontSize >= 23 ? 2 : 1}px #000`
    return style
  }

  // 字幕のフォントサイズを計算
  calcCcSize = (baseWidth: number): CcSize => {
    return baseWidth >= 550 ? CcSize.Large : CcSize.SMALL
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
      const userAreaElement = this.usersAreaElement.findUserAreaElement(x.name)
      if (!userAreaElement) return

      const elementStyle = this.generateElementStyle(
        userAreaElement.clientWidth,
        userAreaElement.clientHeight
      )
      x.element.style.height = elementStyle.height
      x.element.style.paddingLeft = elementStyle.paddingLeft
      x.element.style.paddingRight = elementStyle.paddingRight
      x.element.style.fontSize = elementStyle.fontSize
      x.element.style.lineHeight = elementStyle.lineHeight
      x.element.style.webkitTextStrokeWidth = elementStyle.webkitTextStroke
    })
  }

  // 字幕のstyleを生成する
  private generateUserCcStyle = (
    baseWidth: number
  ): {
    color: string
    margin: string
    zIndex: string
    opacity: string
    fontWeight: string
    pointerEvents: string
  } => {
    const style = {
      color: "white",
      margin: "0",
      zIndex: "1000001",
      opacity: this.userCcOpacityRate.toString(),
      fontWeight: "700",
      pointerEvents: "none",
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
