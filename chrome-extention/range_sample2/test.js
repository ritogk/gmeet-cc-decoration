window.onload = () => {
  const rangeDiv = document.getElementsByClassName("range-div")
  for (let i = 0; i < rangeDiv.length; i++) {
    const rangeDivElement = rangeDiv[i]
    const thumbElement =
      rangeDivElement.getElementsByClassName("range-thumb")[0]
    const rangeElement = rangeDivElement.getElementsByClassName("range")[0]
    const max =
      (Number(rangeElement.max) - Number(rangeElement.min)) /
      Number(rangeElement.step)
    const tw = thumbElement.clientWidth

    rangeElement.addEventListener("input", (event) => {
      const value = event.target.value
      const w = event.target.clientWidth
      const val =
        (Number(rangeElement.value) - Number(rangeElement.min)) /
        Number(rangeElement.step)
      const xPX = (val * (w - tw)) / max
      thumbElement.style.left = xPX
      thumbElement.setAttribute("data-val", Number(value))
    })
    rangeElement.dispatchEvent(new Event("input"))
  }
}
