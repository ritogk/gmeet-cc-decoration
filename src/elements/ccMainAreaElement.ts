import { selector } from "@/selector"

export interface ccMainAreaElementInterface {
  hideElement(): void
  showElement(): void
  getElement(): HTMLElement | null
}

export class CcMainAreaElement implements ccMainAreaElementInterface {
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
