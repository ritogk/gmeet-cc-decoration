import { getMessage } from "@/core/i18n"

interface TitleElementsInterface {}

export class TitleElements implements TitleElementsInterface {
  constructor() {
    // ラベルの言語を変更
    const LabelCustomCcElement = document.getElementById("LabelCustomCc")
    if (LabelCustomCcElement) {
      LabelCustomCcElement.innerText = getMessage("CustomCc")
    }
    const LabelOriginalCcElement = document.getElementById("LabelOriginalCc")
    if (LabelOriginalCcElement) {
      LabelOriginalCcElement.innerText = getMessage("OriginalCc")
    }
  }
}
