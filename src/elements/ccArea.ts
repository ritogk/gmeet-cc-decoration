import { selector } from "@/selector"

export interface ccMainAreaInterface {
  getElement(): HTMLElement | null
}

export class CcArea implements ccMainAreaInterface {
  getElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.ccArea)
  }
}
