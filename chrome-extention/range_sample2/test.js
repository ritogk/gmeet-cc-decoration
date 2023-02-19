window.onload = () => {
  var $range = $(".range")
  $range.each(function () {
    var $thumb = $(this).next(".range-thumb")
    var max = 10
    var tw = 17 // Thumb width. See CSS

    $(this).on("input input.range", function () {
      var w = $(this).width()
      console.log(w)
      var val = Math.floor(map(Number(this.value), 0.5, 1.5, 0, 10))
      var txt = val >= max ? "1.5" : val
      var xPX = (val * (w - tw)) / max
      $thumb.css({ left: xPX }).attr("data-val", Number(this.value))
    })
  })

  $range.trigger("input.range") // Calc on load
  $(window).on("resize", () => $range.trigger("input.range")) // and on resize
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
