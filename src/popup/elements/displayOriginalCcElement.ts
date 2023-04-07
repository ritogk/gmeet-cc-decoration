import { DisplayOriginalCc } from "@/core/config"
import { setStorage } from "@/core/chromeStorage"
import { getMessage } from "@/core/i18n"

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
        setStorage("configDisplayOriginalCc", event.target.value)
      }
    })
    // 変更後にstorageに保存
    elements[1].addEventListener("change", (event: any) => {
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        setStorage("configDisplayOriginalCc", event.target.value)
      }
    })

    // ラベルの言語を変更
    const LabelHideElement = document.getElementById("LabelHide")
    if (LabelHideElement) {
      LabelHideElement.innerText = getMessage("Hide")
    }
    // ラベルの言語を変更
    const LabelShowElement = document.getElementById("LabelShow")
    if (LabelShowElement) {
      LabelShowElement.innerText = getMessage("Show")
    }
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
