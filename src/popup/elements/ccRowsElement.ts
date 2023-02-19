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

    // value値の表示制御
    const rangeDiv = document.getElementsByClassName("range-div")
    for (let i = 0; i < rangeDiv.length; i++) {
      const rangeDivElement = rangeDiv[i]
      const thumbElement = <HTMLSpanElement>(
        rangeDivElement.getElementsByClassName("range-thumb")[0]
      )
      const rangeElement = <HTMLInputElement>(
        rangeDivElement.getElementsByClassName("range")[0]
      )
      // 0~?の範囲にマッピングした最大値
      const mapMax =
        (Number(rangeElement.max) - Number(rangeElement.min)) /
        Number(rangeElement.step)
      const thumbWidth = thumbElement.clientWidth

      rangeElement.addEventListener("input", (event) => {
        if (!(event.target instanceof HTMLInputElement)) {
          return
        }
        const value = event.target.value
        const width = event.target.clientWidth
        // 0~?の範囲にマッピングした現在値
        const mapValue =
          (Number(rangeElement.value) - Number(rangeElement.min)) /
          Number(rangeElement.step)
        thumbElement.style.left =
          Math.ceil((mapValue * (width - thumbWidth)) / mapMax) + "px"
        console.log(value)
        console.log(mapValue)
        console.log(event.target)
        thumbElement.setAttribute("data-val", value)
      })
      rangeElement.dispatchEvent(new Event("input"))
    }
  }

  getElement = (): HTMLInputElement => {
    return <HTMLInputElement>document.getElementById("ccRows")
  }
}
