window.onload = () => {
  var rangeDiv = document.getElementsByClassName("range-div")
  for (let i = 0; i < rangeDiv.length; i++) {
    const rangeDivElement = rangeDiv[i]
    var thumbElement = rangeDivElement.getElementsByClassName("range-thumb")[0]
    var rangeElement = rangeDivElement.getElementsByClassName("range")[0]
    const max =
      (Number(rangeElement.max) - Number(rangeElement.min)) /
      Number(rangeElement.step)
    var tw = thumbElement.clientWidth

    rangeElement.addEventListener("input", (event) => {
      const value = event.target.value
      var w = event.target.clientWidth
      var val =
        (Number(rangeElement.value) - Number(rangeElement.min)) /
        Number(rangeElement.step)
      var xPX = (val * (w - tw)) / max
      thumbElement.style.left = xPX
      thumbElement.setAttribute("data-val", Number(value))
    })
    rangeElement.dispatchEvent(new Event("input"))
  }
}
