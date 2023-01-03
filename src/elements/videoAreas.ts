import { selector } from "@/selector"

export interface videoAreasInterface {
  getElement(): HTMLElement | null
}

export class videoAreas implements videoAreasInterface {
  getElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>(selector.videoAreas)
  }
}
