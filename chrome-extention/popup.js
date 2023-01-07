window.onload = (event) => {
  main()
}

/**
 * メイン
 */
async function main() {
  // config読み込み
  const config = await getChromeStorage()
  // inputの初期化
  let opacityRate = 0.5
  if ("opacityRate" in config) {
    opacityRate = config.opacityRate
  }
  document.getElementsByName("opacityRate")[0].value = opacityRate
  let isDisplayOriginalCc = "1"
  if ("isDisplayOriginalCc" in config) {
    isDisplayOriginalCc = config.isDisplayOriginalCc
  }
  const isDisplayOriginalCcElements = document.getElementsByName(
    "isDisplayOriginalCc"
  )
  if (isDisplayOriginalCc == "1") {
    isDisplayOriginalCcElements[0].checked = true
  }
  if (isDisplayOriginalCc == "2") {
    isDisplayOriginalCcElements[1].checked = true
  }
  // 監視
  observe()
}

/**
 * chrome storageから値を取得します。
 */
async function getChromeStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["opacityRate", "isDisplayOriginalCc"], (data) => {
      console.log(data)
      resolve(data)
    })
  })
}

// 変更検知処理
function observe() {
  // input:透明度 監視
  const opacityRateElement = document.getElementsByName("opacityRate")[0]
  opacityRateElement.addEventListener("change", function (event) {
    console.log("change opacityRate")
    console.log(event.target.value)
    chrome.storage.local.set({ opacityRate: event.target.value })
  })

  // input:既存の字幕 監視
  const isDisplayOriginalCcElements = document.getElementsByName(
    "isDisplayOriginalCc"
  )
  isDisplayOriginalCcElements[0].addEventListener(
    "change",
    function (event) {
      console.log("change isDisplayOriginalCcElement")
      if (!event.target.checked) return
      console.log(event.target.value)
      chrome.storage.local.set({ isDisplayOriginalCc: event.target.value })
    },
    false
  )
  isDisplayOriginalCcElements[1].addEventListener(
    "change",
    function (event) {
      console.log("change isDisplayOriginalCcElement")
      if (!event.target.checked) return
      console.log(event.target.value)
      chrome.storage.local.set({ isDisplayOriginalCc: event.target.value })
    },
    false
  )

  // chromeStorageを監視して変更されたらContents側にメッセージを送る
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log("changes")
    console.log(changes)
    chrome.storage.local.get(
      ["opacityRate", "isDisplayOriginalCc"],
      function (values) {
        console.log("send activetav")
        console.log(values)
        sendToContents(values)
      }
    )
  })
}

// 現在アクティブなタブにデータを送信
function sendToContents(values) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      JSON.stringify(values),
      function (response) {}
    )
  })
}
