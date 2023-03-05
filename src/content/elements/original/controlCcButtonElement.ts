import { Selector } from "@/content/core/selector"

export interface ControlCcButtonElementInterface {
  getElement(): HTMLElement | null
  addEventListenerClick(callback: (clicked: boolean) => void): void
}

/**
 * CCボタンのElementに関するクラス
 */
export class ControlCcButtonElement implements ControlCcButtonElementInterface {
  private clicked = false

  getElement = (): HTMLElement | null => {
    return document.querySelector(
      Selector.getInstance().getSelector().controlCcButton
    )
  }

  addEventListenerClick(callback: (clicked: boolean) => void): void {
    const element = this.getElement()
    if (!element) return
    element.addEventListener("click", (e: any): void => {
      this.clicked = !this.clicked
      callback(this.clicked)
    })
    return
  }
}
