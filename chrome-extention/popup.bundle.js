/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/chromeStorage.ts":
/*!***********************************!*\
  !*** ./src/core/chromeStorage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStorage": () => (/* binding */ getStorage),
/* harmony export */   "setStorage": () => (/* binding */ setStorage)
/* harmony export */ });
const getStorage = async (key) => {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, (data) => {
            if (key in data)
                resolve(data[key]);
            resolve(null);
        });
    });
};
const setStorage = (key, value) => {
    chrome.storage.local.set({ [key]: value });
};


/***/ }),

/***/ "./src/core/config.ts":
/*!****************************!*\
  !*** ./src/core/config.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Config": () => (/* binding */ Config),
/* harmony export */   "DisplayOriginalCc": () => (/* binding */ DisplayOriginalCc)
/* harmony export */ });
/* harmony import */ var _core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/chromeStorage */ "./src/core/chromeStorage.ts");

var DisplayOriginalCc;
(function (DisplayOriginalCc) {
    DisplayOriginalCc["OK"] = "1";
    DisplayOriginalCc["NG"] = "2";
})(DisplayOriginalCc || (DisplayOriginalCc = {}));
/**
 * ポップアップ内で入力した設定情報
 */
class Config {
    constructor(callbackFunc) {
        this.config = {
            opacityRate: 0.5,
            displayOriginalCc: DisplayOriginalCc.OK,
            ccSizeRate: 0.5,
            ccRows: 5,
            ccMaringRate: 0.5,
        };
        this.getConfig = () => {
            return this.config;
        };
        this.setConfig = (config) => {
            this.config = config;
            this.callbackFuncChangeConfig(this.config);
        };
        this.loadConfig = async () => {
            var _a, _b, _c, _d, _e;
            this.config.opacityRate =
                (_a = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configOpacityRate"))) !== null && _a !== void 0 ? _a : this.config.opacityRate;
            this.config.displayOriginalCc =
                (_b = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configDisplayOriginalCc"))) !== null && _b !== void 0 ? _b : this.config.displayOriginalCc;
            this.config.ccSizeRate =
                (_c = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configCcSizeRate"))) !== null && _c !== void 0 ? _c : this.config.opacityRate;
            this.config.ccRows =
                (_d = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configCcRows"))) !== null && _d !== void 0 ? _d : this.config.ccRows;
            this.config.ccMaringRate =
                (_e = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configCcMarginRate"))) !== null && _e !== void 0 ? _e : this.config.ccMaringRate;
        };
        this.observeGoogleStorage = () => {
            chrome.storage.onChanged.addListener((changes, namespace) => {
                const config = this.config;
                if ("configOpacityRate" in changes) {
                    config.opacityRate = changes.configOpacityRate.newValue;
                }
                if ("configDisplayOriginalCc" in changes) {
                    config.displayOriginalCc = changes.configDisplayOriginalCc.newValue;
                }
                if ("configCcSizeRate" in changes) {
                    config.ccSizeRate = changes.configCcSizeRate.newValue;
                }
                if ("configCcRows" in changes) {
                    config.ccRows = changes.configCcRows.newValue;
                }
                if ("configCcMarginRate" in changes) {
                    config.ccMaringRate = changes.configCcMarginRate.newValue;
                }
                this.setConfig(config);
            });
        };
        this.callbackFuncChangeConfig = callbackFunc;
    }
}


/***/ }),

/***/ "./src/core/logger.ts":
/*!****************************!*\
  !*** ./src/core/logger.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logger": () => (/* binding */ Logger)
/* harmony export */ });
class Logger {
    constructor(isOutput) {
        this.isOutput = false;
        this.log = (text) => {
            if (!this.isOutput)
                return;
            console.log(text);
        };
        this.isOutput = isOutput;
    }
}


/***/ }),

/***/ "./src/popup/elements/ccMarginRateElement.ts":
/*!***************************************************!*\
  !*** ./src/popup/elements/ccMarginRateElement.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CcMarginRateElement": () => (/* binding */ CcMarginRateElement)
/* harmony export */ });
/* harmony import */ var _core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/chromeStorage */ "./src/core/chromeStorage.ts");

class CcMarginRateElement {
    constructor(ccMarginRate) {
        this.getElement = () => {
            return document.getElementById("ccMarginRate");
        };
        const element = this.getElement();
        // 初期値
        element.value = ccMarginRate.toString();
        // 変更後にstorageに保存
        element.addEventListener("change", (event) => {
            if (event.target instanceof HTMLInputElement) {
                (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.setStorage)("configCcMarginRate", event.target.value);
            }
        });
    }
}


/***/ }),

/***/ "./src/popup/elements/ccRowsElement.ts":
/*!*********************************************!*\
  !*** ./src/popup/elements/ccRowsElement.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CcRowsElement": () => (/* binding */ CcRowsElement)
/* harmony export */ });
/* harmony import */ var _core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/chromeStorage */ "./src/core/chromeStorage.ts");

class CcRowsElement {
    constructor(ccRows) {
        this.getElement = () => {
            return document.getElementById("ccRows");
        };
        const element = this.getElement();
        // 初期値
        element.value = ccRows.toString();
        // 変更後にstorageに保存
        element.addEventListener("change", (event) => {
            if (event.target instanceof HTMLInputElement) {
                (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.setStorage)("configCcRows", event.target.value);
            }
        });
        // value値の表示制御
        const rangeDiv = document.getElementsByClassName("range-div");
        for (let i = 0; i < rangeDiv.length; i++) {
            const rangeDivElement = rangeDiv[i];
            const thumbElement = (rangeDivElement.getElementsByClassName("range-thumb")[0]);
            const rangeElement = (rangeDivElement.getElementsByClassName("range")[0]);
            // 0~?の範囲にマッピングした最大値
            const mapMax = (Number(rangeElement.max) - Number(rangeElement.min)) /
                Number(rangeElement.step);
            const thumbWidth = thumbElement.clientWidth;
            rangeElement.addEventListener("input", (event) => {
                if (!(event.target instanceof HTMLInputElement)) {
                    return;
                }
                const value = event.target.value;
                const width = event.target.clientWidth;
                // 0~?の範囲にマッピングした現在値
                const mapValue = (Number(rangeElement.value) - Number(rangeElement.min)) /
                    Number(rangeElement.step);
                thumbElement.style.left =
                    Math.ceil((mapValue * (width - thumbWidth)) / mapMax) + "px";
                console.log(value);
                console.log(mapValue);
                console.log(event.target);
                thumbElement.setAttribute("data-val", value);
            });
            rangeElement.dispatchEvent(new Event("input"));
        }
    }
}


/***/ }),

/***/ "./src/popup/elements/ccSizeRateElement.ts":
/*!*************************************************!*\
  !*** ./src/popup/elements/ccSizeRateElement.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CcSizeRateElement": () => (/* binding */ CcSizeRateElement)
/* harmony export */ });
/* harmony import */ var _core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/chromeStorage */ "./src/core/chromeStorage.ts");

class CcSizeRateElement {
    constructor(ccSizeRate) {
        this.getElement = () => {
            return document.getElementById("ccSizeRate");
        };
        const element = this.getElement();
        // 初期値
        element.value = ccSizeRate.toString();
        // 変更後にstorageに保存
        element.addEventListener("change", (event) => {
            if (event.target instanceof HTMLInputElement) {
                (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.setStorage)("configCcSizeRate", event.target.value);
            }
        });
    }
}


/***/ }),

/***/ "./src/popup/elements/displayOriginalCcElement.ts":
/*!********************************************************!*\
  !*** ./src/popup/elements/displayOriginalCcElement.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplayOriginalCcElement": () => (/* binding */ DisplayOriginalCcElement)
/* harmony export */ });
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/config */ "./src/core/config.ts");
/* harmony import */ var _core_chromeStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/chromeStorage */ "./src/core/chromeStorage.ts");


class DisplayOriginalCcElement {
    constructor(displayOriginalCc) {
        this.getElements = () => {
            return (document.getElementsByName("displayOriginalCc"));
        };
        this.getSelectElement = () => {
            const elements = this.getElements();
            if (elements[0].checked) {
                return elements[0];
            }
            else {
                return elements[1];
            }
        };
        const elements = this.getElements();
        elements[0].value = _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK;
        elements[1].value = _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.NG;
        // 初期値
        debugger;
        if (displayOriginalCc === _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK) {
            elements[0].checked = true;
        }
        else {
            elements[1].checked = true;
        }
        // 変更後にstorageに保存
        elements[0].addEventListener("change", (event) => {
            if (event.target instanceof HTMLInputElement) {
                if (!event.target.checked)
                    return;
                console.log(1);
                (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_1__.setStorage)("configDisplayOriginalCc", event.target.value);
            }
        });
        // 変更後にstorageに保存
        elements[1].addEventListener("change", (event) => {
            if (event.target instanceof HTMLInputElement) {
                if (!event.target.checked)
                    return;
                console.log(2);
                (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_1__.setStorage)("configDisplayOriginalCc", event.target.value);
            }
        });
    }
}


/***/ }),

/***/ "./src/popup/elements/opacityRateElement.ts":
/*!**************************************************!*\
  !*** ./src/popup/elements/opacityRateElement.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpacityRateElement": () => (/* binding */ OpacityRateElement)
/* harmony export */ });
/* harmony import */ var _core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/chromeStorage */ "./src/core/chromeStorage.ts");

class OpacityRateElement {
    constructor(opacityRate) {
        this.getElement = () => {
            return document.getElementById("opacityRate");
        };
        const element = this.getElement();
        // 初期値
        element.value = opacityRate.toString();
        // 変更後にstorageに保存
        element.addEventListener("change", (event) => {
            if (event.target instanceof HTMLInputElement) {
                (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.setStorage)("configOpacityRate", event.target.value);
            }
        });
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/popup/run.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "run": () => (/* binding */ run)
/* harmony export */ });
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/config */ "./src/core/config.ts");
/* harmony import */ var _popup_elements_opacityRateElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/popup/elements/opacityRateElement */ "./src/popup/elements/opacityRateElement.ts");
/* harmony import */ var _popup_elements_ccSizeRateElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/popup/elements/ccSizeRateElement */ "./src/popup/elements/ccSizeRateElement.ts");
/* harmony import */ var _popup_elements_ccRowsElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/popup/elements/ccRowsElement */ "./src/popup/elements/ccRowsElement.ts");
/* harmony import */ var _popup_elements_ccMarginRateElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/popup/elements/ccMarginRateElement */ "./src/popup/elements/ccMarginRateElement.ts");
/* harmony import */ var _popup_elements_displayOriginalCcElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/popup/elements/displayOriginalCcElement */ "./src/popup/elements/displayOriginalCcElement.ts");
/* harmony import */ var _core_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/logger */ "./src/core/logger.ts");







const run = async () => {
    const logger = new _core_logger__WEBPACK_IMPORTED_MODULE_6__.Logger(false);
    logger.log("start: popup");
    // config読み込み
    const config = new _core_config__WEBPACK_IMPORTED_MODULE_0__.Config((config) => { });
    await config.loadConfig();
    const configData = config.getConfig();
    logger.log(`load config: ${JSON.stringify(configData)}`);
    const opacityRateElement = new _popup_elements_opacityRateElement__WEBPACK_IMPORTED_MODULE_1__.OpacityRateElement(configData.opacityRate);
    const ccSizeRateElement = new _popup_elements_ccSizeRateElement__WEBPACK_IMPORTED_MODULE_2__.CcSizeRateElement(configData.ccSizeRate);
    const ccRowsElement = new _popup_elements_ccRowsElement__WEBPACK_IMPORTED_MODULE_3__.CcRowsElement(configData.ccRows);
    const ccMarginRateElement = new _popup_elements_ccMarginRateElement__WEBPACK_IMPORTED_MODULE_4__.CcMarginRateElement(configData.ccMaringRate);
    const displayOriginalCcElement = new _popup_elements_displayOriginalCcElement__WEBPACK_IMPORTED_MODULE_5__.DisplayOriginalCcElement(configData.displayOriginalCc);
};
window.addEventListener("load", run, false);

})();

/******/ })()
;
//# sourceMappingURL=popup.bundle.js.map