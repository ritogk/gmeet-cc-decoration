import { setStorage } from "@/core/chromeStorage"
import { getMessage } from "@/core/i18n"

interface CcMarginRateElementInterface {
  getElement(): HTMLInputElement | null
}

export class CcMarginRateElement implements CcMarginRateElementInterface {
  constructor(ccMarginRate: number) {
    const element = this.getElement()
    // 初期値
    element.value = ccMarginRate.toString()
    // 変更後にstorageに保存
    element.addEventListener("change", (event: any) => {
      if (event.target instanceof HTMLInputElement) {
        setStorage("configCcMarginRate", event.target.value)
      }
    })
    // ラベルの言語を変更
    const labelElement = document.getElementById("LabelMargins")
    if (labelElement) {
      labelElement.innerText = getMessage("Margins")
    }
  }

  getElement = (): HTMLInputElement => {
    return <HTMLInputElement>document.getElementById("ccMarginRate")
  }
}
