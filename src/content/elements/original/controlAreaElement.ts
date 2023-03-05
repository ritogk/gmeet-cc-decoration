import { Selector } from "@/content/core/selector"

export interface ControlAreaElementInterface {
  getElement(): HTMLElement | null
}

/**
 * コントロールエリアElementに関するクラス
 */
export class ControlAreaElement implements ControlAreaElementInterface {
  getElement = (): HTMLElement | null => {
    return document.querySelector<HTMLElement>(
      Selector.getInstance().getSelector().controlArea
    )
  }
}
