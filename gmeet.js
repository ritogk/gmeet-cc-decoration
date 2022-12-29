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
videoArea = document.querySelector(
  "#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div:nth-child(2) > div.axUSnc.P9KVBf"
).children
videoArea = Array.from(videoArea)
// 先頭文字列一致
targetVideoArea = videoArea.find((element) =>
  element.innerText.startsWith("あなた")
)
