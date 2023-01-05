window.onload = (event) => {
  // 初期値のセット
  chrome.storage.local.get(
    ["opacityRate", "isDisplayOriginalCc"],
    function (values) {
      // name: opacityRate
      document.getElementsByName("opacityRate")[0].value = values.opacityRate

      // name: isDisplayOriginalCc
      const isDisplayOriginalCcElements = document.getElementsByName(
        "isDisplayOriginalCc"
      )
      if (values.isDisplayOriginalCc == "1") {
        isDisplayOriginalCcElements[0].checked = true
      }
      if (values.isDisplayOriginalCc == "2") {
        isDisplayOriginalCcElements[1].checked = true
      }
    }
  )
  observe()
}

// 変更検知処理
function observe() {
  // 透明度
  const opacityRateElement = document.getElementsByName("opacityRate")[0]
  opacityRateElement.addEventListener("change", function (event) {
    console.log("change opacityRate")
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

  // アプリケーション側に設定値を送信
  chrome.storage.onChanged.addListener(function (changes, namespace) {
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
