import { selector } from "@/selector"

export interface ccMainAreaInterface {
  hideElement(): void
  showElement(): void
  getElement(): HTMLElement | null
}

export class CcMainArea implements ccMainAreaInterface {
  hided = false
  hideElement(): void {
    const element = this.getElement()
    if (element === null) return
    element.style.opacity = "0"
    this.hided = true
  }

  showElement(): void {
    const element = this.getElement()
    if (element === null) return
    element.style.opacity = "1"
    this.hided = false
  }

  getElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.ccMainArea)
  }
}
