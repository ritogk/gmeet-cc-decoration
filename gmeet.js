let beforeCC = ""
// 変更を監視するノードを選択
const targetNode = document.querySelector(".K6EKFb")
const config = { attributes: true, childList: true, subtree: true }

// 変更が発見されたときに実行されるコールバック関数
const callback = function (mutationsList, observer) {
  console.log("[st]")
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      if (mutation.target.localName === "span") {
        speechArea = mutation.target
        speachUserArea = speechArea.parentNode.parentNode.parentNode
        speachUserAreaChildren = speachUserArea.children
        userImage = speachUserAreaChildren[0]
        userName = speachUserAreaChildren[1].innerText
        speach = speechArea.innerText
        console.log(userName)
        // spanが追加されずに更新される時があるからその対応がいる。
        console.log(speach)
      }
    } else if (mutation.type === "attributes") {
      //   console.log(mutation)
    }
  }
  console.log("[ed]")
}

// コールバック関数に結びつけられたオブザーバーのインスタンスを生成
const observer = new MutationObserver(callback)

// 対象ノードの設定された変更の監視を開始
observer.observe(targetNode, config)

// meetの映像一覧
userAreas = document.querySelector(
  "#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div:nth-child(2) > div.axUSnc.P9KVBf"
).children
userAreas = Array.from(userAreas)
// 先頭文字列一致
targetUserArea = userAreas.find((element) =>
  element.querySelector("[data-self-name]").innerText.startsWith("あなた")
)

// video要素取得
targetVideoArea = targetUserArea.querySelector("video")

// if (targetVideoArea === null) {
//   // 動画なし
//   targetImgArea = targetUserArea.querySelector("img")
//   photoArea = targetImgArea.parentNode.parentNode
// } else {
//   // 動画あり
// }

// document.querySelector("#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div:nth-child(2) > div.axUSnc.cZXVke.P9KVBf > div.dkjMxf > div > div.koV58.Zi94Db.S7urwe > div.LBDzPb > div")

// // relativeの要素
// node = document.querySelector(
//   "#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div:nth-child(2) > div.axUSnc.P9KVBf > div.dkjMxf > div > div.koV58.Zi94Db"
// )
const newElement = document.createElement("div")
newElement.style.color = "white"
newElement.style.position = "absolute"
newElement.style.bottom = "0"
newElement.style.width = "100%"
newElement.style.backgroundColor = "rgba(0,0,0,0.25)"
newElement.style.margin = "0"
newElement.style.zIndex = "1000000"
newElement.textContent = "たちつてと"
newElement.className = "speachArea"
a = targetVideoArea.parentNode.after(newElement)

// 仮想DOMについて何もわかってない。

// videoタグのtop leftとか全部取得して videoタグのすぐそこにdom追加でabsoluteでOK
// 名前で絞り込んで、その中のvideoタグを取得してその隣に要素を追加するようにする

// 親要素(absolute)にoverflow: hidden;
