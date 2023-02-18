import { DisplayOriginalCc } from "@/core/config"
import { setStorage } from "@/core/chromeStorage"

interface DisplayOriginalCcElementInterface {
  getElements(): NodeListOf<HTMLInputElement> | null
  getSelectElement(): HTMLInputElement
}

export class DisplayOriginalCcElement
  implements DisplayOriginalCcElementInterface
{
  constructor(displayOriginalCc: DisplayOriginalCc) {
    const elements = this.getElements()
    elements[0].value = DisplayOriginalCc.OK
    elements[1].value = DisplayOriginalCc.NG
    // 初期値
    debugger
    if (displayOriginalCc === DisplayOriginalCc.OK) {
      elements[0].checked = true
    } else {
      elements[1].checked = true
    }

    // 変更後にstorageに保存
    elements[0].addEventListener("change", (event: any) => {
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        console.log(1)
        setStorage("configDisplayOriginalCc", event.target.value)
      }
    })
    // 変更後にstorageに保存
    elements[1].addEventListener("change", (event: any) => {
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        console.log(2)
        setStorage("configDisplayOriginalCc", event.target.value)
      }
    })
  }

  getElements = (): NodeListOf<HTMLInputElement> => {
    return <NodeListOf<HTMLInputElement>>(
      document.getElementsByName("displayOriginalCc")
    )
  }

  getSelectElement = (): HTMLInputElement => {
    const elements = this.getElements()
    if (elements[0].checked) {
      return elements[0]
    } else {
      return elements[1]
    }
  }
}
