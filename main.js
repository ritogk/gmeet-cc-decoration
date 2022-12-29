let beforeCC = ""
// 変更を監視するノードを選択
const targetNode = document.querySelector("#main")
// (変更を監視する) オブザーバーのオプション
// attributes: 属性の変更を関し
// childList: 直接のこの
// subtree: 監視対象のノードの子ノードも監視する
// attributeFilter: 指定した属性のみを監視する
// https://ja.javascript.info/mutation-observer
const config = {
  attributes: true,
  subtree: true,
  attributeFilter: ["span"],
  // childList: true,
  // characterData: true,
  attributeOldValue: true,
  // characterDataOldValue: true,
}

// 変更が発見されたときに実行されるコールバック関数
const callback = function (mutationsList, observer) {
  console.log("st")
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("childList")
      console.log(mutation)
    } else if (mutation.type === "attributes") {
      console.log("attributes")
      console.log(mutation)
    }
    if (mutation.type === "characterData") {
      console.log("characterData")
      console.log(mutation)
    }
  }
  console.log("ed")
}

// コールバック関数に結びつけられたオブザーバーのインスタンスを生成
const observer = new MutationObserver(callback)

// 対象ノードの設定された変更の監視を開始
observer.observe(targetNode, config)
