window.onload = () => {
  const rangeDiv = document.getElementsByClassName("range-div")
  for (let i = 0; i < rangeDiv.length; i++) {
    const rangeDivElement = rangeDiv[i]
    const thumbElement =
      rangeDivElement.getElementsByClassName("range-thumb")[0]
    const rangeElement = rangeDivElement.getElementsByClassName("range")[0]
    // 0~?の範囲にマッピングした最大値
    const mapMax =
      (Number(rangeElement.max) - Number(rangeElement.min)) /
      Number(rangeElement.step)
    const thumbWidth = thumbElement.clientWidth

    rangeElement.addEventListener("input", (event) => {
      const value = event.target.value
      const width = event.target.clientWidth
      // 0~?の範囲にマッピングした現在値
      const mapValue =
        (Number(rangeElement.value) - Number(rangeElement.min)) /
        Number(rangeElement.step)
      thumbElement.style.left =
        Math.ceil((mapValue * (width - thumbWidth)) / mapMax) + "px"
      console.log(value)
      console.log(mapValue)
      console.log(event.target)
      thumbElement.setAttribute("data-val", Number(value))
    })
    rangeElement.dispatchEvent(new Event("input"))
  }
}
