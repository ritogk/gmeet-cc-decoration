/**
 * GoogleMeetのElementのセレクター
 * セレクターの「div:nth-child(13)」の要素番号が14だったり13だったりでしょっちゅう変化する。
 * 「#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb」まではどのElementも同じ
 *  #ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div.J0M6X.nulMpf.Didmac.G03iKb > div > div > div.Tmb7Fd > div > div.juFBl
 */
const controlCcButton =
  "div.crqnQb > div.J0M6X.nulMpf.Didmac.G03iKb > div > div > div.Tmb7Fd > div > div.juFBl"
const ccMainArea = ".a4cQT"
const ccArea = "div.crqnQb > div.a4cQT > div:nth-child(1) > div:nth-child(1)"
const usersArea = "div.crqnQb > div:nth-child(2) > div.axUSnc.P9KVBf"
const controlArea =
  "div.crqnQb > div.J0M6X.nulMpf.Didmac.G03iKb > div > div > div.Tmb7Fd > div"

const selector = {
  controlArea: controlArea,
  controlCcButton: controlCcButton,
  ccMainArea: ccMainArea,
  ccArea: ccArea,
  usersArea: usersArea,
}

export { selector }
