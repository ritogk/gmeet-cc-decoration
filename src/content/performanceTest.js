// ↓ 字幕の動作チェック用スクリプト
document.dispatchEvent(
  new CustomEvent("runScript", {
    bubbles: true,
    detail: {
      name: "あなた",
      speach:
        "あいうえお。かきくけこ。さしすせそ。たちつてと。なにぬねのはひふへほぱぴぷぺぽらりるれろ",
    },
  })
)
