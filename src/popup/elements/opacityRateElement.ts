import { setStorage } from "@/core/chromeStorage"

interface opacityRateElementInterface {
  getElement(): HTMLInputElement | null
}

export class OpacityRateElement implements opacityRateElementInterface {
  constructor(opacityRate: number) {
    const element = this.getElement()
    // 初期値
    element.value = opacityRate.toString()
    // 変更後にstorageに保存
    element.addEventListener("change", (event: any) => {
      if (event.target instanceof HTMLInputElement) {
        setStorage("configOpacityRate", event.target.value)
      }
    })
  }

  getElement = (): HTMLInputElement => {
    return <HTMLInputElement>document.getElementById("opacityRate")
  }
}
