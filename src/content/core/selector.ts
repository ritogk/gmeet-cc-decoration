/**
 * GoogleMeetのElementのセレクター
 * セレクターの「div:nth-child(13)」の要素番号が14だったり13だったりでしょっちゅう変化する。
 * 「#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb」まではどのElementも同じ
 *  #ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div.J0M6X.nulMpf.Didmac.G03iKb > div > div > div.Tmb7Fd > div > div.juFBl
 */

interface selectorInterface {
  loadSelector: () => Promise<void>
  getSelector: () => selectorItem
}

interface selectorItem {
  controlArea: string
  controlCcButton: string
  ccMainArea: string
  ccArea: string
  usersArea: string
}
export class Selector implements selectorInterface {
  private static _instance: selectorInterface

  private static selectorItem: selectorItem = {
    ccArea: "",
    ccMainArea: "",
    controlArea: "",
    controlCcButton: "",
    usersArea: "",
  }

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
        Selector.selectorItem = JSON.parse(atob(data.content))
        return Promise<void>
      })
  }

  getSelector = (): selectorItem => {
    return Selector.selectorItem
  }
}
