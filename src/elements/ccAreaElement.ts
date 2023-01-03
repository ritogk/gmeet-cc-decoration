import { selector } from "@/selector"

export interface ccAreaElementInterface {
  opacateElement(): void
  showElement(): void
  getElement(): HTMLElement | null
}

export class CcAreaElement implements ccAreaElementInterface {
  opacate = false
  opacateElement(): void {
    const element = this.getElement()
    if (element === null) return
    element.style.opacity = "0"
    this.opacate = true
  }

  showElement(): void {
    const element = this.getElement()
    if (element === null) return
    element.style.opacity = "1"
    this.opacate = false
  }

  getElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.ccMainArea)
  }

  getCcElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.ccArea)
  }
}
