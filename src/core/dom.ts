/**
 * Elementの削除を行います。
 * @param el
 * @param speed
 */
const removeElement = (el: HTMLElement, speed: number) => {
  var seconds = speed / 1000
  el.style.transition = "opacity " + seconds + "s ease"
  el.style.opacity = "0"
  setTimeout(function () {
    el.parentNode?.removeChild(el)
  }, speed)
}

export { removeElement }
