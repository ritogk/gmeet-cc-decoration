window.onload = () => {
  var $range = $(".range")
  $range.each(function () {
    var $thumb = $(this).next(".range-thumb")
    var max = parseInt(this.max, 10)
    var tw = 20 // Thumb width. See CSS

    $(this).on("input input.range", function () {
      var w = $(this).width()
      console.log(w)
      var val = parseInt(this.value, 10)
      var txt = val >= max ? "10" : val
      var xPX = (val * (w - tw)) / max // Position in PX
      // var xPC = xPX * 100 / w;     // Position in % (if ever needed)
      $thumb.css({ left: xPX }).attr("data-val", txt)
    })
  })

  $range.trigger("input.range") // Calc on load
  $(window).on("resize", () => $range.trigger("input.range")) // and on resize
}
