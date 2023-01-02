import { selector } from "@/selector"

export interface ccMainAreaInterface {
  hideElement(): void
  getElement(): HTMLElement | null
}

export class CcMainArea implements ccMainAreaInterface {
  hideElement(): void {
    const element = this.getElement()
    if (element === null) return
    element.style.opacity = "0"
  }

  getElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.ccMainArea)
  }
}
