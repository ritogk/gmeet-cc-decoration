function observe() {
  const opacityRateElement = document.getElementsByName("opacityRate")[0]
  opacityRateElement.addEventListener(
    "change",
    function (event) {
      console.log(event.target.value)
    },
    false
  )

  const isDisplayOriginalCcElements = document.getElementsByName(
    "isDisplayOriginalCc"
  )
  isDisplayOriginalCcElements[0].addEventListener(
    "change",
    function (event) {
      if (!event.target.checked) return
      console.log(event.target.value)
    },
    false
  )
  isDisplayOriginalCcElements[1].addEventListener(
    "change",
    function (event) {
      if (!event.target.checked) return
      console.log(event.target.value)
    },
    false
  )
}

window.onload = (event) => {
  observe()
}

// 現在アクティブなタブにデータを送信
function sendToContents() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      JSON.stringify({ contents: "test value from popup" }),
      function (response) {}
    )
  })
}
document.getElementById("send").addEventListener("click", sendToContents)
