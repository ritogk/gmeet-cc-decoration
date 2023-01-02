(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./test3"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    // import * as test from "./test"
    // import * as test2 from "./test2"
    const test3_1 = require("./test3");
    function functet() {
        // console.log(test.data.a)
        // console.log(test.data.b)
        // console.log(test2.data.c)
        // console.log(test2.data.d)
    }
    const zip = new test3_1.ZipCodeValidator();
    console.log(zip.isAcceptable("4"));
    (_a = document.getElementById("main")) === null || _a === void 0 ? void 0 : _a.remove();
});
