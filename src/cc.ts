interface ccInterface {
  getName: () => string
  getImagePath: () => string
  getSpeach: () => string
}

export class Cc implements ccInterface {
  private speachAreaElement: Element[] | null = null

  constructor(spanElement: HTMLSpanElement) {
    const speachAreaElement = spanElement.parentNode?.parentNode?.parentNode
    if (!speachAreaElement) return
    const childElement = speachAreaElement.children
    this.speachAreaElement = Array.from(childElement)
  }

  getImagePath(): string {
    if (this.speachAreaElement === null) return ""
    return (this.speachAreaElement[0] as HTMLImageElement).src
  }

  getName(): string {
    if (this.speachAreaElement === null) return ""
    return (this.speachAreaElement[1] as HTMLDivElement).innerText
  }

  getSpeach(): string {
    if (this.speachAreaElement === null) return ""
    return (this.speachAreaElement[2] as HTMLDivElement).innerText
  }
}
