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
