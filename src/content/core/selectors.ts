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
  private static _instance: selectorInterface

  private static ccMainArea = ""
  private static ccArea = ""
  private static usersArea = ""
  private static controlArea = ""
  private static controlCcButton = ""

  private constructor() {}

  public static getInstance(): selectorInterface {
    // instanceがなければ生成
    if (!this._instance) {
      this._instance = new Selector()
    }

    // 自身が持つインスタンスを返す
    return this._instance
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

        Selector.ccArea = selectors.ccArea
        Selector.usersArea = selectors.usersArea
        Selector.controlArea = selectors.controlArea
        Selector.ccMainArea = selectors.ccMainArea
        Selector.controlCcButton = selectors.controlCcButton
        return Promise<void>
      })
  }

  getControlCcButton = (): string => {
    return Selector.controlCcButton
  }

  getCcMainArea = (): string => {
    return Selector.ccMainArea
  }

  getCcArea = (): string => {
    return Selector.ccArea
  }

  getUsersArea = (): string => {
    return Selector.usersArea
  }

  getControlArea = (): string => {
    return Selector.controlArea
  }
}
