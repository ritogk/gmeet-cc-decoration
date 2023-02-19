window.onload = () => {
  var rangeDiv = document.getElementsByClassName("range-div")
  for (let i = 0; i < rangeDiv.length; i++) {
    const rangeDivElement = rangeDiv[i]
    var thumbElement = rangeDivElement.getElementsByClassName("range-thumb")[0]
    var rangeElement = rangeDivElement.getElementsByClassName("range")[0]
    var max =
      (Number(rangeElement.max) - Number(rangeElement.min)) /
      Number(rangeElement.step)
    var tw = Number(
      getComputedStyle(document.querySelector(":root"))
        .getPropertyValue("--range-width")
        .trim()
        .replace("px", "")
    )

    rangeElement.addEventListener("input", (event) => {
      const value = event.target.value
      var w = event.target.clientWidth
      var val = Math.floor(map(Number(value), 0.5, 1.5, 0, 10))
      var xPX = (val * (w - tw)) / max
      thumbElement.style.left = xPX
      thumbElement.setAttribute("data-val", Number(value))
    })
    rangeElement.dispatchEvent(new Event("input"))
  }
}

const map = (target_num, in_min, in_max, out_min, out_max) => {
  // 入力値(最大)と変換したい値の "差"
  const input_diff = in_max - target_num
  // 入力値の長さ
  const input_range = in_max - in_min
  // 出力値の長さ
  const output_range = out_max - out_min
  // (差 / 長さ) で "割合" を出す
  const percentage = input_diff / input_range
  // 前項の "割合" を使って "出力値側" の、最大値との "差" を出す
  const out_diff = percentage * output_range
  // "出力の最大値" から "出力値側の差" を除く
  // ※ "output_range" からではなく "out_max" から
  const rs = out_max - out_diff
  //結果
  return rs
}
