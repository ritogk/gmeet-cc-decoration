import { selector } from "@/selector"

export interface ccMainAreaInterface {
  hideCcArea(): void
  getElement(): HTMLElement | null
}

export class CcMainArea implements ccMainAreaInterface {
  hideCcArea(): void {
    const element = this.getElement()
    if (element === null) return
    element.style.opacity = "0"
  }

  getElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.ccMainArea)
  }
}
