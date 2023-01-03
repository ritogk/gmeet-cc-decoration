import { selector } from "@/selector"

export interface ControlButtonElementInterface {
  createElement(): void
  deleteElement(): void
  getElement(): HTMLElement | null
}

export class ControlButtonElement implements ControlButtonElementInterface {
  private drawed = false
  private mouseOver = false
  private clicked = false
  static ELEMENT_ID = "controlButton"

  createElement() {
    const element = document.createElement("div")
    element.id = ControlButtonElement.ELEMENT_ID
    element.addEventListener("mouseover", this.overElement)
    element.addEventListener("mouseleave", this.leaveElement)
    element.addEventListener("click", this.clickElement)

    const ccButtonElement = document.querySelector(selector.ccButton)
    if (ccButtonElement !== null && ccButtonElement.parentNode != null) {
      ccButtonElement.parentNode.insertBefore(
        element,
        ccButtonElement.nextElementSibling
      )
      this.changeStyle()
      this.drawed = true
    }
  }

  deleteElement() {
    document.getElementById(ControlButtonElement.ELEMENT_ID)?.remove()
    this.drawed = false
    this.mouseOver = false
    this.clicked = false
  }

  getElement(): HTMLElement | null {
    return document.getElementById(ControlButtonElement.ELEMENT_ID)
  }

  private overElement: (e: any) => void = () => {
    this.mouseOver = true
    this.changeStyle()
  }

  private leaveElement: (e: any) => void = () => {
    this.mouseOver = false
    this.changeStyle()
  }

  private clickElement: (e: any) => void = () => {
    this.clicked = !this.clicked
    this.changeStyle()
  }

  private changeStyle: () => void = () => {
    const element = this.getElement()
    if (element === null) return

    element.style.width = "40px"
    element.style.height = "40px"
    element.style.backgroundColor = "rgb(60, 64, 67)"
    element.style.borderRadius = "20px"
    element.style.paddingTop = "12px"
    element.style.paddingBottom = "12px"
    element.style.display = "inline-block"
    element.style.boxSizing = "border-box"
    element.style.filter = "brightness(1)"
    element.innerText = "ON"
    element.style.color = "#FFF"

    if (this.mouseOver) {
      element.style.filter = "brightness(1.15)"
    }
    if (this.clicked) {
      element.style.color = "#000"
      element.innerText = "OFF"
      element.style.backgroundColor = "rgb(138,180,248)"
    }
  }
}
