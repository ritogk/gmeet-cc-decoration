import { selector } from "@/selector"

export interface ccAreaElementInterface {
  getElement(): HTMLElement | null
}

export class CcAreaElement implements ccAreaElementInterface {
  getElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.ccArea)
  }
}
