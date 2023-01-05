window.onload = (event) => {
  observe()
}

function observe() {
  // 透明度
  const opacityRateElement = document.getElementsByName("opacityRate")[0]
  opacityRateElement.addEventListener("change", function (event) {
    console.log(event.target.value)
    chrome.storage.local.set({ opacityRate: event.target.value })
  })

  // 既存の字幕
  const isDisplayOriginalCcElements = document.getElementsByName(
    "isDisplayOriginalCc"
  )
  isDisplayOriginalCcElements[0].addEventListener(
    "change",
    function (event) {
      if (!event.target.checked) return
      console.log(event.target.value)
      chrome.storage.local.set({ isDisplayOriginalCc: event.target.value })
    },
    false
  )
  isDisplayOriginalCcElements[1].addEventListener(
    "change",
    function (event) {
      if (!event.target.checked) return
      console.log(event.target.value)
      chrome.storage.local.set({ isDisplayOriginalCc: event.target.value })
    },
    false
  )

  // アプリケーション側に設定値を送信
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    chrome.storage.local.get(
      ["opacityRate", "isDisplayOriginalCc"],
      function (values) {
        console.log("send:start")
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
