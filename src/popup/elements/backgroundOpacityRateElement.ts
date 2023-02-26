import { setStorage } from "@/core/chromeStorage"

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
  }

  getElement = (): HTMLInputElement => {
    return <HTMLInputElement>document.getElementById("backgroundOpacityRate")
  }
}
