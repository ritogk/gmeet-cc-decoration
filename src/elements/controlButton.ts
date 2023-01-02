import { ccButton } from "@/selector/original"

export interface ControlButtonInterface {
  createElement(): void
  deleteElement(): void
  getElement(): HTMLDivElement | null
}

export class ControlButton implements ControlButtonInterface {
  private drawed = false
  private mouseOver = false
  private clicked = false

  createElement() {
    const element = document.createElement("div")
    element.className = "controlButton"
    element.addEventListener("mouseover", this.overElement)
    element.addEventListener("mouseleave", this.leaveElement)
    element.addEventListener("click", this.clickElement)

    const ccButtonElement = document.querySelector(ccButton)
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
    document.querySelector(".controlButton")?.remove()
    this.drawed = false
    this.mouseOver = false
    this.clicked = false
  }

  getElement(): HTMLDivElement | null {
    return document.querySelector(".controlButton")
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
