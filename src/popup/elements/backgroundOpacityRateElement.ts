import { setStorage } from "@/core/chromeStorage"
import { getMessage } from "@/core/i18n"

interface backgroundOpacityRateElement {
  getElement(): HTMLInputElement | null
}

export class BackgroundOpacityRateElement
  implements backgroundOpacityRateElement
{
  constructor(opacityRate: number) {
    const element = this.getElement()
    // 初期値
    element.value = opacityRate.toString()
    // 変更後にstorageに保存
    element.addEventListener("change", (event: any) => {
      if (event.target instanceof HTMLInputElement) {
        setStorage("configBackgroundOpacityRate", event.target.value)
      }
    })
    // ラベルの言語を変更
    const labelElement = document.getElementById("LabelBackgroundTransparency")
    if (labelElement) {
      labelElement.innerText = getMessage("BackgroundTransparency")
    }
  }

  getElement = (): HTMLInputElement => {
    return <HTMLInputElement>document.getElementById("backgroundOpacityRate")
  }
}
