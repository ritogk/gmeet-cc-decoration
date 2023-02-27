/**
 * GoogleMeetのElementのセレクター
 * セレクターの「div:nth-child(13)」の要素番号が14だったり13だったりでしょっちゅう変化する。
 * 「#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb」まではどのElementも同じ
 *  #ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div.J0M6X.nulMpf.Didmac.G03iKb > div > div > div.Tmb7Fd > div > div.juFBl
 */

export interface selectorInterface {
  loadSelector: () => Promise<void>
  getControlCcButton: () => string
  getCcMainArea: () => string
  getCcArea: () => string
  getUsersArea: () => string
  getControlArea: () => string
}

/**
 * 字幕の変更監視クラス
 */
export class Selector implements selectorInterface {
  private ccMainArea = ""
  private ccArea = ""
  private usersArea = ""
  private controlArea = ""
  private controlCcButton = ""
  constructor() {
    this.loadSelector()
  }

  loadSelector = async (): Promise<void> => {
    await fetch(
      "https://api.github.com/repos/ritogk/gmeet-visual-predictive/contents/src/files/selector.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const selectors: {
          controlArea: string
          controlCcButton: string
          ccMainArea: string
          ccArea: string
          usersArea: string
        } = JSON.parse(atob(data.content))
        this.ccMainArea = selectors.ccMainArea
        this.ccArea = selectors.ccArea
        this.usersArea = selectors.usersArea
        this.controlArea = selectors.controlArea
        this.controlCcButton = selectors.controlCcButton
        return Promise<void>
      })
  }

  getControlCcButton = (): string => {
    return this.controlCcButton
  }

  getCcMainArea = (): string => {
    return this.ccMainArea
  }

  getCcArea = (): string => {
    return this.ccArea
  }

  getUsersArea = (): string => {
    return this.usersArea
  }

  getControlArea = (): string => {
    return this.controlArea
  }
}
