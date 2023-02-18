import { setStorage } from "@/core/chromeStorage"

interface ccRowsElementInterface {
  getElement(): HTMLInputElement | null
}

export class CcRowsElement implements ccRowsElementInterface {
  constructor(ccRows: number) {
    const element = this.getElement()
    // 初期値
    element.value = ccRows.toString()
    // 変更後にstorageに保存
    element.addEventListener("change", (event: any) => {
      if (event.target instanceof HTMLInputElement) {
        setStorage("configCcRows", event.target.value)
      }
    })
  }

  getElement = (): HTMLInputElement => {
    return <HTMLInputElement>document.getElementById("ccRows")
  }
}
