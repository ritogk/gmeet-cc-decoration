import { ccButton } from "@/selector/original"

export interface ControlButtonInterface {
  createButton(): void
  deleteButton(): void
  getElement(): HTMLDivElement | null
}

export class ControlButton implements ControlButtonInterface {
  private drawed = false
  private mouseOver = false
  private clicked = false

  createButton() {
    const element = document.createElement("div")
    element.className = "controlButton"
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
    element.addEventListener("mouseover", this.changeStyle)
    element.addEventListener("mouseleave", this.changeStyle)
    element.addEventListener("click", this.changeStyle)

    const ccButtonElement = document.querySelector(ccButton)
    if (ccButtonElement !== null && ccButtonElement.parentNode != null) {
      ccButtonElement.parentNode.insertBefore(
        element,
        ccButtonElement.nextElementSibling
      )
    }
  }

  deleteButton() {
    document.querySelector(".controlButton")?.remove()
  }

  setElement(): void {
    // this.drawed = true
  }
  getElement(): HTMLDivElement | null {
    return document.querySelector(".controlButton")
  }

  private changeStyle(e: any): void {
    const element = this.getElement()
    console.log(element)
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
    if (this.mouseOver) {
      element.style.filter = "brightness(1.15)"
    }
    if (this.clicked) {
      element.style.color = "#000"
      element.innerText = "OFF"
    }
  }
}
