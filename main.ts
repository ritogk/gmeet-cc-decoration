// import * as test from "./test"
// import * as test2 from "./test2"
import { ZipCodeValidator } from "./test3"
function functet() {
  // console.log(test.data.a)
  // console.log(test.data.b)
  // console.log(test2.data.c)
  // console.log(test2.data.d)
}

const zip = new ZipCodeValidator()
console.log(zip.isAcceptable("4"))

document.getElementById("main")?.remove()
