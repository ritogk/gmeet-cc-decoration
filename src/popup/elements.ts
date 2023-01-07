import { DisplayOriginalCc } from "@/core/config"

export interface ElementsType {
  opacityRate: HTMLInputElement | null
  displayOriginalCc: NodeListOf<HTMLInputElement> | null
}

export class Elements {
  private elemets: ElementsType = {
    opacityRate: null,
    displayOriginalCc: null,
  }

  constructor(opacityRate: number, displayOriginalCc: DisplayOriginalCc) {
    this.elemets.opacityRate = <HTMLInputElement>(
      document.getElementsByName("opacityRate")[0]
    )
    this.elemets.displayOriginalCc = <NodeListOf<HTMLInputElement>>(
      document.getElementsByName("displayOriginalCc")
    )

    this.elemets.displayOriginalCc[0].value = DisplayOriginalCc.OK
    this.elemets.displayOriginalCc[1].value = DisplayOriginalCc.NG

    // 初期値
    this.elemets.opacityRate.value = opacityRate.toString()
    if (displayOriginalCc === DisplayOriginalCc.OK) {
      this.elemets.displayOriginalCc[0].checked = true
    } else {
      this.elemets.displayOriginalCc[1].checked = true
    }

    this.elemets.opacityRate.addEventListener("change", (event: Event) => {
      console.log("change opacityRate")
      if (event.target instanceof HTMLInputElement) {
        console.log(event.target.value)
        chrome.storage.local.set({ opacityRate: event.target.value })
        // configData.opacityRate = parseInt(event.target.value)
      }
    })

    this.elemets.displayOriginalCc[0].addEventListener("change", (event) => {
      console.log("change displayOriginalCcElements")
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        console.log(event.target.value)
        chrome.storage.local.set({ displayOriginalCc: DisplayOriginalCc.OK })
        // configData.displayOriginalCc = DisplayOriginalCc.OK
      }
    })
    this.elemets.displayOriginalCc[1].addEventListener("change", (event) => {
      console.log("change displayOriginalCcElements")
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        console.log(event.target.value)
        chrome.storage.local.set({ displayOriginalCc: DisplayOriginalCc.NG })
        // configData.displayOriginalCc = DisplayOriginalCc.NG
      }
    })
  }

  getElements = (): ElementsType => {
    return this.elemets
  }

  getOpacityRateElement = (): HTMLInputElement | null => {
    return this.elemets.opacityRate
  }

  setOpacityRateElementValue = (opacityRate: number): void => {
    if (!this.elemets.opacityRate) return
    this.elemets.opacityRate.value = opacityRate.toString()
  }

  getDisplayOriginalCcElement = (): NodeListOf<HTMLInputElement> | null => {
    return this.elemets.displayOriginalCc
  }

  setDisplayOriginalCcElementChecked = (
    displayOriginalCc: DisplayOriginalCc
  ): void => {
    if (!this.elemets.displayOriginalCc) return

    if (displayOriginalCc === DisplayOriginalCc.OK) {
      this.elemets.displayOriginalCc[0].checked = true
    }
    if (displayOriginalCc === DisplayOriginalCc.NG) {
      this.elemets.displayOriginalCc[1].checked = true
    }
  }
}
