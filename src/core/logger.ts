interface loggerInterface {
  log(text: string): void
}

export class Logger implements loggerInterface {
  private isOutput = false
  constructor(isOutput: boolean) {
    this.isOutput = isOutput
  }

  log = (text: string): void => {
    if (!this.isOutput) return
    console.log(text)
  }
}
