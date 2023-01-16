import { UsersAreaElement } from "@/content/elements/original/UsersAreaElement"
import { removeElement } from "@/core/dom"
export interface screenSharingCcAreaElement {
  getElement(): Element | undefined
  deleteElement(): void
  createElement(): void
  updateElement(): void
  appendCcElement: (name: string, speach: string) => void
  updateCcElement: (name: string, speach: string) => void
  deleteCcElement: (name: string) => void
  runInterval: () => void
  stopInterval: () => void
}

const screenSharingCcAreaClassName = "screen-sharing-cc-area-class-name"
const screenSharingNameClassName = "screen-sharing-name-class-name"
const screenSharingSpeachClassName = "screen-sharing-speach-class-name"

/**
 * 全ユーザーの字幕Elementに関するクラス
 */
export class ScreenSharingCcAreaElement implements screenSharingCcAreaElement {
  private usersAreaElement: UsersAreaElement
  constructor() {
    this.usersAreaElement = new UsersAreaElement()
  }

  getElement = (): Element | undefined => {
    return (
      this.usersAreaElement
        .findScreenSharingAreaElement()
        ?.querySelector("." + screenSharingCcAreaClassName) ?? undefined
    )
  }

  // delete
  deleteElement = (): void => {
    this.displayElements.forEach((x) => {
      removeElement(x.element, 2000)
    })
  }

  createElement = (): void => {
    const videoElement = this.usersAreaElement.findScreenSharingVideoElement()
    if (!videoElement) return

    const fontSize = this.calcCcFontSize(videoElement)

    const element = document.createElement("div")
    element.style.position = "absolute"
    element.style.bottom = "0"
    element.style.textAlign = "left"
    element.style.backgroundColor = "rgba(0,0,0,0.35)"
    element.style.margin = "0"
    element.style.zIndex = "1000000"
    element.style.left = "0"
    element.style.right = "0"
    element.style.pointerEvents = "none"
    element.style.overflow = "hidden"
    element.scrollTop = 1000
    element.className = screenSharingCcAreaClassName
    if (fontSize >= 16) {
      element.style.height = `${videoElement.clientHeight / 3.1}px`
      const padding = (videoElement.clientWidth * 0.365) / 2
      element.style.paddingLeft = `${padding}px`
      element.style.paddingRight = `${padding}px`
    } else {
      element.style.paddingLeft = `10px`
      element.style.paddingRight = `10px`
    }
    videoElement.parentElement?.after(element)
    this.appendDisplayElement(element)
  }

  updateElement = (): void => {
    const videoElement = this.usersAreaElement.findScreenSharingVideoElement()
    if (!videoElement) return

    const screenSharingElement =
      this.usersAreaElement.findScreenSharingAreaElement()
    if (!screenSharingElement) return

    const element = <HTMLDivElement | undefined>(
      screenSharingElement.querySelector("." + screenSharingCcAreaClassName)
    )
    if (!element) return
    if (element) {
      element.scrollTop = 1000
    }
    const fontSize = this.calcCcFontSize(videoElement)
    if (fontSize >= 16) {
      element.style.height = `${videoElement.clientHeight / 3.1}px`
      const padding = (videoElement.clientWidth * 0.365) / 2
      element.style.paddingLeft = `${padding}px`
      element.style.paddingRight = `${padding}px`
    } else {
      element.style.paddingLeft = `10px`
      element.style.paddingRight = `10px`
    }
    this.deleteDisplayElement()
    this.appendDisplayElement(element)
  }

  // 会話の要素を取得
  private findSpeachElement = (): HTMLSpanElement | undefined => {
    const screenSharingAreaElement =
      this.usersAreaElement.findScreenSharingAreaElement()
    if (!screenSharingAreaElement) return undefined
    const ccElement = screenSharingAreaElement.querySelector(
      "." + screenSharingSpeachClassName
    )
    return ccElement !== null ? <HTMLDivElement>ccElement : undefined
  }

  // 名前の要素を取得
  private findNameElement = (): HTMLDivElement | undefined => {
    const screenSharingAreaElement =
      this.usersAreaElement.findScreenSharingAreaElement()
    if (!screenSharingAreaElement) return undefined
    const nameElement = screenSharingAreaElement.querySelector(
      "." + screenSharingNameClassName
    )
    return nameElement !== null ? <HTMLDivElement>nameElement : undefined
  }

  // 字幕を追加
  appendCcElement = (name: string, speach: string): void => {
    const videoElement = this.usersAreaElement.findScreenSharingVideoElement()
    if (!videoElement) return

    const fontSize = this.calcCcFontSize(videoElement)

    // 名前
    const nameElement = document.createElement("div")
    nameElement.style.color = "white"
    nameElement.style.margin = "0"
    nameElement.style.zIndex = "1000001"
    nameElement.textContent = `【${name}】`
    nameElement.className = screenSharingNameClassName
    nameElement.style.opacity = this.ccOpacityRate.toString()
    nameElement.style.fontWeight = "700"
    nameElement.style.pointerEvents = "none"
    fontSize < 18
      ? (nameElement.style.fontSize = "15px")
      : (nameElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (nameElement.style.webkitTextStroke = "1px #000")
      : (nameElement.style.webkitTextStroke = "2px #000")
    this.getElement()?.appendChild(nameElement)

    // 会話
    const speachElement = document.createElement("span")
    speachElement.style.color = "white"
    speachElement.style.margin = "0"
    speachElement.style.zIndex = "1000001"
    speachElement.textContent = `${speach}`
    speachElement.className = screenSharingSpeachClassName
    speachElement.style.opacity = this.ccOpacityRate.toString()
    speachElement.style.fontWeight = "700"
    speachElement.style.pointerEvents = "none"
    fontSize < 18
      ? (speachElement.style.fontSize = "15px")
      : (speachElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (speachElement.style.webkitTextStroke = "1px #000")
      : (speachElement.style.webkitTextStroke = "2px #000")
    this.getElement()?.appendChild(speachElement)
  }

  // 字幕を更新
  updateCcElement = (name: string, speach: string): void => {
    const videoElement = this.usersAreaElement.findScreenSharingVideoElement()
    if (!videoElement) return

    let fontSize = this.calcCcFontSize(videoElement)

    // 名前
    const nameElement = this.findNameElement()
    if (!nameElement) return
    nameElement.style.opacity = this.ccOpacityRate.toString()
    nameElement.textContent = `【${name}】`
    fontSize < 18
      ? (nameElement.style.fontSize = "15px")
      : (nameElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (nameElement.style.webkitTextStroke = "1px #000")
      : (nameElement.style.webkitTextStroke = "2px #000")

    // 会話
    const ccElement = this.findSpeachElement()
    if (!ccElement) return
    // // 直前の文字数より少ない場合は反映させない
    // if ((ccElement.textContent?.length ?? 100) >= speach.length) return
    ccElement.style.opacity = this.ccOpacityRate.toString()
    ccElement.textContent = `${speach}`
    fontSize < 18
      ? (ccElement.style.fontSize = "15px")
      : (ccElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (ccElement.style.webkitTextStroke = "1px #000")
      : (ccElement.style.webkitTextStroke = "2px #000")
  }

  // 字幕 削除
  deleteCcElement = (name: string): void => {
    const displaySpeach = this.displayElements[0]
    if (!displaySpeach) return
    removeElement(displaySpeach.element, 2000)
  }

  // 字幕のフォントサイズを計算
  calcCcFontSize = (element: Element): number => {
    return Math.floor(element.clientWidth / 33)
  }

  // 字幕の透明度を変える
  private ccOpacityRate = 0.5
  setUserCcOpacityRate = (opacityRate: number) => {
    this.ccOpacityRate = opacityRate
    this.displayElements.forEach((x) => {
      x.element.style.opacity = this.ccOpacityRate.toString()
    })
  }
  private displayElements: {
    time: number
    element: HTMLElement
  }[] = []
  private appendDisplayElement = (element: HTMLElement): void => {
    this.displayElements.push({
      time: new Date().getTime(),
      element: element,
    })
  }

  private deleteDisplayElement = (): void => {
    this.displayElements = []
  }

  private readonly cclimitSecond = 8
  private intervalId: number = 0
  runInterval = (): void => {
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
