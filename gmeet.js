let displayUsersSpeash = []

// 字幕を非表示にする。
// 単純にdisplay:noneだと変更が検知されない。
ccArea = document.querySelector(".a4cQT")
const hideCCArea = () => {
  ccArea.style.opacity = "0"
}

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
        userSpeach = speechArea.parentNode.innerText
        console.log(userName)
        console.log(userSpeach)
        setSpeach(userName, userSpeach)
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

// システム停止
const stopSystem = () => {
  observer.disconnect()
  clearInterval(intervalId)
  displayUsersSpeash.forEach((x) => {
    removeFadeOut(x.element, 2000)
  })
}

const setSpeach = (userName, userSpeach) => {
  // meetの映像一覧
  userAreasElement = document.querySelector(
    "#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div:nth-child(2) > div.axUSnc.P9KVBf"
  )
  userAreas = Array.from(userAreasElement.children)
  // 先頭文字列一致
  targetUserArea = userAreas.find((element) =>
    element.querySelector("[data-self-name]").innerText.startsWith(userName)
  )
  // video要素取得
  targetVideoArea = targetUserArea.querySelector("video")
  const fontSize = Math.floor(targetUserArea.clientWidth / 35)
  // 古い字幕は消す
  speachArea = targetUserArea.querySelector(".speachArea")
  if (speachArea === null) {
    // 新規
    const newElement = document.createElement("div")
    newElement.style.color = "white"
    newElement.style.position = "absolute"
    newElement.style.bottom = "0"
    newElement.style.width = "100%"
    newElement.style.backgroundColor = "rgba(0,0,0,0.25)"
    newElement.style.margin = "0"
    newElement.style.zIndex = "1000000"
    newElement.textContent = userSpeach
    newElement.className = "speachArea"
    newElement.style.opacity = "0.5"
    newElement.style.fontWeight = "700"
    newElement.style.textAlign = "center"
    newElement.style.pointerEvents = "none"
    if (fontSize < 27) {
      newElement.style.webkitTextStroke = "1px #000"
    } else {
      newElement.style.webkitTextStroke = "2px #000"
    }

    if (fontSize < 18) {
      newElement.style.fontSize = "18px"
    } else {
      newElement.style.fontSize = `${fontSize}px`
    }
    speachArea = targetVideoArea.parentNode.after(newElement)
  } else {
    // 書き換え
    if (fontSize < 27) {
      speachArea.style.webkitTextStroke = "1px #000"
    } else {
      speachArea.style.webkitTextStroke = "2px #000"
    }

    if (fontSize < 18) {
      speachArea.style.fontSize = "16px"
    } else {
      speachArea.style.fontSize = `${fontSize}px`
    }
    speachArea.textContent = userSpeach
  }

  displayUsersSpeash = displayUsersSpeash.filter(
    (displayUserSpeash) => displayUserSpeash.userName !== userName
  )
  displayUsersSpeash.push({
    userName: userName,
    time: new Date().getTime(),
    element: speachArea,
  })
}

// 古い字幕を消す
const intervalId = setInterval(() => {
  oldUsersSpeach = displayUsersSpeash.filter(
    (displayUserSpeash) =>
      (new Date().getTime() - displayUserSpeash.time) / 1000 > 10
  )

  console.log(oldUsersSpeach)
  oldUsersSpeach.forEach((x) => {
    removeFadeOut(x.element, 2000)
  })
}, 3000)

// ふわっとelementを消す
function removeFadeOut(el, speed) {
  var seconds = speed / 1000
  el.style.transition = "opacity " + seconds + "s ease"

  el.style.opacity = 0
  setTimeout(function () {
    el.parentNode.removeChild(el)
  }, speed)
}

// 仮想DOMについて何もわかってない。

// videoタグのtop leftとか全部取得して videoタグのすぐそこにdom追加でabsoluteでOK
// 名前で絞り込んで、その中のvideoタグを取得してその隣に要素を追加するようにする

// 親要素(absolute)にoverflow: hidden;

// 議事録は、spa

// フォントサイズの変更はこいつを使えばよさそう。
// https://kubogen.com/web-programing-233/
