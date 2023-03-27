export const sendMessage = (text: string) => {
  const params = {
    channel: "#general",
    username: "エラーレポート(GoogleMeetリラックス)",
    text: text,
    iconEmoji: ":ghost:",
  }
  const query = new URLSearchParams(params)
  fetch(
    `https://script.google.com/macros/s/AKfycbwwJBYjGJQAvTN1DJN8hlKQn6haUugmz6RHHpmX4slGbJfcLhwf3HhP__pwHJXNxyIr/exec?${query}`,
    { method: "POST" }
  )
    .then((response) => console.log(response))
    .catch((error) => console.error(error))
}
