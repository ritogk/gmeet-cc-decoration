import { DisplayOriginalCc } from "@/core/config"

export interface ElementsType {
  opacityRate: HTMLInputElement | null
  displayOriginalCc: NodeListOf<HTMLInputElement> | null
  fontSizeRate: HTMLInputElement | null
}

export class Elements {
  private elemets: ElementsType = {
    opacityRate: null,
    displayOriginalCc: null,
    fontSizeRate: null,
  }

  private callbackFuncChange: (
    opacityRate: number,
    displayOriginalCc: DisplayOriginalCc,
    fontSizeRate: number
  ) => void

  constructor(
    opacityRate: number,
    displayOriginalCc: DisplayOriginalCc,
    fontSizeRate: number,
    callbackFuncChange: (
      opacityRate: number,
      displayOriginalCc: DisplayOriginalCc,
      fontSizeRate: number
    ) => void
  ) {
    this.callbackFuncChange = callbackFuncChange
    this.elemets.opacityRate = <HTMLInputElement>(
      document.getElementsByName("opacityRate")[0]
    )
    this.elemets.displayOriginalCc = <NodeListOf<HTMLInputElement>>(
      document.getElementsByName("displayOriginalCc")
    )
    this.elemets.fontSizeRate = <HTMLInputElement>(
      document.getElementsByName("fontSizeRate")[0]
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
    this.elemets.fontSizeRate.value = fontSizeRate.toString()

    this.elemets.opacityRate.addEventListener("change", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.callbackFuncChange(
          Number(event.target.value),
          (this.getDisplayOriginalCcElementChecked() as HTMLInputElement)
            .value as DisplayOriginalCc,
          Number(this.getFontSizeRateElement()?.value ?? "0")
        )
      }
    })

    this.elemets.displayOriginalCc[0].addEventListener("change", (event) => {
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        this.callbackFuncChange(
          Number(this.getOpacityRateElement()?.value ?? "0"),
          event.target.value as DisplayOriginalCc,
          Number(this.getFontSizeRateElement()?.value ?? "0")
        )
      }
    })
    this.elemets.displayOriginalCc[1].addEventListener("change", (event) => {
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        this.callbackFuncChange(
          Number(this.getOpacityRateElement()?.value ?? "0"),
          event.target.value as DisplayOriginalCc,
          Number(this.getFontSizeRateElement()?.value ?? "0")
        )
      }
    })

    this.elemets.fontSizeRate.addEventListener("change", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.callbackFuncChange(
          Number(this.getOpacityRateElement()?.value ?? "0"),
          (this.getDisplayOriginalCcElementChecked() as HTMLInputElement)
            .value as DisplayOriginalCc,
          Number(event.target.value)
        )
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

  getDisplayOriginalCcElementChecked = (): HTMLInputElement | null => {
    if (!this.elemets.displayOriginalCc) return null

    if (this.elemets.displayOriginalCc[0].checked) {
      return this.elemets.displayOriginalCc[0]
    } else {
      return this.elemets.displayOriginalCc[1]
    }
  }

  getFontSizeRateElement = (): HTMLInputElement | null => {
    return this.elemets.fontSizeRate
  }

  setFontSizeRateElementValue = (fontSizeRate: number): void => {
    if (!this.elemets.fontSizeRate) return
    this.elemets.fontSizeRate.value = fontSizeRate.toString()
  }
}
