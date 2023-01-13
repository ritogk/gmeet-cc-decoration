import { UsersAreaElement } from "@/content/elements/UsersAreaElement"
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
const screenSharingCcClassName = "screen-sharing-cc-class-name"

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
    const ccAreaElement = document.createElement("div")
    ccAreaElement.style.position = "absolute"
    ccAreaElement.style.bottom = "0"
    ccAreaElement.style.textAlign = "left"
    ccAreaElement.style.backgroundColor = "rgba(0,0,0,0.25)"
    ccAreaElement.style.margin = "0"
    ccAreaElement.style.zIndex = "1000000"
    ccAreaElement.style.left = "0"
    ccAreaElement.style.right = "0"
    ccAreaElement.style.pointerEvents = "none"
    ccAreaElement.style.overflow = "hidden"
    ccAreaElement.scrollTop = 1000
    ccAreaElement.className = screenSharingCcAreaClassName
    if (fontSize >= 16) {
      ccAreaElement.style.height = `${videoElement.clientHeight / 3.3}px`
      const padding = (videoElement.clientWidth * 0.365) / 2
      ccAreaElement.style.paddingLeft = `${padding}px`
      ccAreaElement.style.paddingRight = `${padding}px`
    } else {
      ccAreaElement.style.paddingLeft = `10px`
      ccAreaElement.style.paddingRight = `10px`
    }
    videoElement.parentElement?.after(ccAreaElement)
    this.appendDisplayElement(ccAreaElement)
  }

  updateElement = (): void => {
    const videoElement = this.usersAreaElement.findScreenSharingVideoElement()
    if (!videoElement) return

    const screenSharingElement =
      this.usersAreaElement.findScreenSharingAreaElement()
    if (!screenSharingElement) return

    const ccAreaElement = <HTMLDivElement | undefined>(
      screenSharingElement.querySelector("." + screenSharingCcAreaClassName)
    )
    if (!ccAreaElement) return
    if (ccAreaElement) {
      ccAreaElement.scrollTop = 1000
    }
    const fontSize = this.calcCcFontSize(videoElement)
    if (fontSize >= 16) {
      ccAreaElement.style.height = `${videoElement.clientHeight / 3.3}px`
      const padding = (videoElement.clientWidth * 0.365) / 2
      ccAreaElement.style.paddingLeft = `${padding}px`
      ccAreaElement.style.paddingRight = `${padding}px`
    } else {
      ccAreaElement.style.paddingLeft = `10px`
      ccAreaElement.style.paddingRight = `10px`
    }
    this.deleteDisplayElement()
    this.appendDisplayElement(ccAreaElement)
  }

  // 字幕の取得
  findCcElement = (): HTMLSpanElement | undefined => {
    const screenSharingAreaElement =
      this.usersAreaElement.findScreenSharingAreaElement()
    if (!screenSharingAreaElement) return undefined
    const ccElement = screenSharingAreaElement.querySelector(
      "." + screenSharingCcClassName
    )
    return ccElement !== null ? <HTMLDivElement>ccElement : undefined
  }

  // 字幕 追加
  appendCcElement = (name: string, speach: string): void => {
    const videoElement = this.usersAreaElement.findScreenSharingVideoElement()
    if (!videoElement) return
    const ccElement = document.createElement("span")
    ccElement.style.color = "white"
    ccElement.style.margin = "0"
    ccElement.style.zIndex = "1000001"
    ccElement.textContent = speach
    ccElement.className = screenSharingCcClassName
    ccElement.style.opacity = "1"
    ccElement.style.fontWeight = "700"
    ccElement.style.pointerEvents = "none"
    const fontSize = this.calcCcFontSize(videoElement)
    fontSize < 18
      ? (ccElement.style.fontSize = "15px")
      : (ccElement.style.fontSize = `${fontSize}px`)
    fontSize < 27
      ? (ccElement.style.webkitTextStroke = "1px #000")
      : (ccElement.style.webkitTextStroke = "2px #000")

    this.getElement()?.appendChild(ccElement)
  }

  // 字幕 更新
  updateCcElement = (name: string, speach: string): void => {
    const videoElement = this.usersAreaElement.findScreenSharingVideoElement()
    if (!videoElement) return
    const ccElement = this.findCcElement()
    if (!ccElement) return
    // // 直前の文字数より少ない場合は反映させない
    // if ((ccElement.textContent?.length ?? 100) >= speach.length) return
    ccElement.textContent = speach
    const fontSize = this.calcCcFontSize(videoElement)
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
    return Math.floor(element.clientWidth / 35)
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
      console.log(this.displayElements)
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
