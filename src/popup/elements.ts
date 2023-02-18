import { DisplayOriginalCc } from "@/core/config"

export interface ElementsType {
  opacityRate: HTMLInputElement | null
  displayOriginalCc: NodeListOf<HTMLInputElement> | null
  ccSizeRate: HTMLInputElement | null
  ccRows: HTMLInputElement | null
  ccMarginRate: HTMLInputElement | null
}

export class Elements {
  private elemets: ElementsType = {
    opacityRate: null,
    displayOriginalCc: null,
    ccSizeRate: null,
    ccRows: null,
    ccMarginRate: null,
  }

  private callbackFuncChange: (
    opacityRate: number,
    displayOriginalCc: DisplayOriginalCc,
    ccSizeRate: number,
    ccRows: number,
    ccMarginRate: number
  ) => void

  constructor(
    opacityRate: number,
    displayOriginalCc: DisplayOriginalCc,
    ccSizeRate: number,
    ccRows: number,
    ccMarginRate: number,
    callbackFuncChange: (
      opacityRate: number,
      displayOriginalCc: DisplayOriginalCc,
      ccSizeRate: number,
      ccRows: number,
      ccMarginRate: number
    ) => void
  ) {
    this.callbackFuncChange = callbackFuncChange
    this.elemets.opacityRate = <HTMLInputElement>(
      document.getElementsByName("opacityRate")[0]
    )
    this.elemets.displayOriginalCc = <NodeListOf<HTMLInputElement>>(
      document.getElementsByName("displayOriginalCc")
    )
    this.elemets.ccSizeRate = <HTMLInputElement>(
      document.getElementsByName("ccSizeRate")[0]
    )
    this.elemets.ccRows = <HTMLInputElement>(
      document.getElementsByName("ccRows")[0]
    )
    this.elemets.ccMarginRate = <HTMLInputElement>(
      document.getElementsByName("ccMarginRate")[0]
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
    this.elemets.ccSizeRate.value = ccSizeRate.toString()
    this.elemets.ccRows.value = ccRows.toString()
    this.elemets.ccMarginRate.value = ccMarginRate.toString()

    this.elemets.opacityRate.addEventListener("change", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.callbackFuncChange(
          Number(event.target.value),
          (this.getDisplayOriginalCcElementChecked() as HTMLInputElement)
            .value as DisplayOriginalCc,
          Number(this.getCcSizeRateElement()?.value ?? "0"),
          Number(this.getCcRowsElement()?.value ?? "0"),
          Number(this.getCcMarginRateElement()?.value ?? "0")
        )
      }
    })

    this.elemets.displayOriginalCc[0].addEventListener("change", (event) => {
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        this.callbackFuncChange(
          Number(this.getOpacityRateElement()?.value ?? "0"),
          event.target.value as DisplayOriginalCc,
          Number(this.getCcSizeRateElement()?.value ?? "0"),
          Number(this.getCcRowsElement()?.value ?? "0"),
          Number(this.getCcMarginRateElement()?.value ?? "0")
        )
      }
    })
    this.elemets.displayOriginalCc[1].addEventListener("change", (event) => {
      if (event.target instanceof HTMLInputElement) {
        if (!event.target.checked) return
        this.callbackFuncChange(
          Number(this.getOpacityRateElement()?.value ?? "0"),
          event.target.value as DisplayOriginalCc,
          Number(this.getCcSizeRateElement()?.value ?? "0"),
          Number(this.getCcRowsElement()?.value ?? "0"),
          Number(this.getCcMarginRateElement()?.value ?? "0")
        )
      }
    })

    this.elemets.ccSizeRate.addEventListener("change", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.callbackFuncChange(
          Number(this.getOpacityRateElement()?.value ?? "0"),
          (this.getDisplayOriginalCcElementChecked() as HTMLInputElement)
            .value as DisplayOriginalCc,
          Number(event.target.value),
          Number(this.getCcRowsElement()?.value ?? "0"),
          Number(this.getCcMarginRateElement()?.value ?? "0")
        )
      }
    })

    this.elemets.ccRows.addEventListener("change", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.callbackFuncChange(
          Number(this.getOpacityRateElement()?.value ?? "0"),
          (this.getDisplayOriginalCcElementChecked() as HTMLInputElement)
            .value as DisplayOriginalCc,
          Number(this.getCcSizeRateElement()?.value ?? "0"),
          Number(event.target.value),
          Number(this.getCcMarginRateElement()?.value ?? "0")
        )
      }
    })

    this.elemets.ccMarginRate.addEventListener("change", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.callbackFuncChange(
          Number(this.getOpacityRateElement()?.value ?? "0"),
          (this.getDisplayOriginalCcElementChecked() as HTMLInputElement)
            .value as DisplayOriginalCc,
          Number(this.getCcSizeRateElement()?.value ?? "0"),
          Number(this.getCcRowsElement()?.value ?? "0"),
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

  getCcSizeRateElement = (): HTMLInputElement | null => {
    return this.elemets.ccSizeRate
  }

  setCcSizeRateElementValue = (ccSizeRate: number): void => {
    if (!this.elemets.ccSizeRate) return
    this.elemets.ccSizeRate.value = ccSizeRate.toString()
  }

  getCcRowsElement = (): HTMLInputElement | null => {
    return this.elemets.ccRows
  }

  setCcRowsElementValue = (ccRows: number): void => {
    if (!this.elemets.ccRows) return
    this.elemets.ccRows.value = ccRows.toString()
  }

  getCcMarginRateElement = (): HTMLInputElement | null => {
    return this.elemets.ccMarginRate
  }

  setCcMarginRateElementValue = (ccMarginRate: number): void => {
    if (!this.elemets.ccMarginRate) return
    this.elemets.ccMarginRate.value = ccMarginRate.toString()
  }
}
