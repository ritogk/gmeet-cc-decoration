import { setStorage } from "@/core/chromeStorage"

interface CcSizeRateElementInterface {
  getElement(): HTMLInputElement | null
}

export class CcSizeRateElement implements CcSizeRateElementInterface {
  constructor(ccSizeRate: number) {
    const element = this.getElement()
    // 初期値
    element.value = ccSizeRate.toString()
    // 変更後にstorageに保存
    element.addEventListener("change", (event: any) => {
      if (event.target instanceof HTMLInputElement) {
        setStorage("configCcSizeRate", event.target.value)
      }
    })
  }

  getElement = (): HTMLInputElement => {
    return <HTMLInputElement>document.getElementById("ccSizeRate")
  }
}
