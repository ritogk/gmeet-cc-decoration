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
            fontSizeRate: 0.5,
        };
        this.getConfig = () => {
            return this.config;
        };
        this.setConfig = (config) => {
            this.config = config;
            this.callbackFuncChangeConfig(this.config);
        };
        this.loadConfig = async () => {
            var _a, _b, _c;
            this.config.opacityRate =
                (_a = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configOpacityRate"))) !== null && _a !== void 0 ? _a : this.config.opacityRate;
            this.config.displayOriginalCc =
                (_b = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configDisplayOriginalCc"))) !== null && _b !== void 0 ? _b : this.config.displayOriginalCc;
            this.config.fontSizeRate =
                (_c = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configFontSizeRate"))) !== null && _c !== void 0 ? _c : this.config.opacityRate;
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
                if ("configFontSizeRate" in changes) {
                    config.fontSizeRate = changes.configFontSizeRate.newValue;
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

/***/ "./src/popup/elements.ts":
/*!*******************************!*\
  !*** ./src/popup/elements.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Elements": () => (/* binding */ Elements)
/* harmony export */ });
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/config */ "./src/core/config.ts");

class Elements {
    constructor(opacityRate, displayOriginalCc, fontSizeRate, callbackFuncChange) {
        this.elemets = {
            opacityRate: null,
            displayOriginalCc: null,
            fontSizeRate: null,
        };
        this.getElements = () => {
            return this.elemets;
        };
        this.getOpacityRateElement = () => {
            return this.elemets.opacityRate;
        };
        this.setOpacityRateElementValue = (opacityRate) => {
            if (!this.elemets.opacityRate)
                return;
            this.elemets.opacityRate.value = opacityRate.toString();
        };
        this.getDisplayOriginalCcElement = () => {
            return this.elemets.displayOriginalCc;
        };
        this.setDisplayOriginalCcElementChecked = (displayOriginalCc) => {
            if (!this.elemets.displayOriginalCc)
                return;
            if (displayOriginalCc === _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK) {
                this.elemets.displayOriginalCc[0].checked = true;
            }
            if (displayOriginalCc === _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.NG) {
                this.elemets.displayOriginalCc[1].checked = true;
            }
        };
        this.getDisplayOriginalCcElementChecked = () => {
            if (!this.elemets.displayOriginalCc)
                return null;
            if (this.elemets.displayOriginalCc[0].checked) {
                return this.elemets.displayOriginalCc[0];
            }
            else {
                return this.elemets.displayOriginalCc[1];
            }
        };
        this.getFontSizeRateElement = () => {
            return this.elemets.fontSizeRate;
        };
        this.setFontSizeRateElementValue = (fontSizeRate) => {
            if (!this.elemets.fontSizeRate)
                return;
            this.elemets.fontSizeRate.value = fontSizeRate.toString();
        };
        this.callbackFuncChange = callbackFuncChange;
        this.elemets.opacityRate = (document.getElementsByName("opacityRate")[0]);
        this.elemets.displayOriginalCc = (document.getElementsByName("displayOriginalCc"));
        this.elemets.fontSizeRate = (document.getElementsByName("fontSizeRate")[0]);
        this.elemets.displayOriginalCc[0].value = _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK;
        this.elemets.displayOriginalCc[1].value = _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.NG;
        // 初期値
        this.elemets.opacityRate.value = opacityRate.toString();
        if (displayOriginalCc === _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK) {
            this.elemets.displayOriginalCc[0].checked = true;
        }
        else {
            this.elemets.displayOriginalCc[1].checked = true;
        }
        this.elemets.fontSizeRate.value = fontSizeRate.toString();
        this.elemets.opacityRate.addEventListener("change", (event) => {
            var _a, _b;
            if (event.target instanceof HTMLInputElement) {
                this.callbackFuncChange(Number(event.target.value), this.getDisplayOriginalCcElementChecked()
                    .value, Number((_b = (_a = this.getFontSizeRateElement()) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "0"));
            }
        });
        this.elemets.displayOriginalCc[0].addEventListener("change", (event) => {
            var _a, _b, _c, _d;
            if (event.target instanceof HTMLInputElement) {
                if (!event.target.checked)
                    return;
                this.callbackFuncChange(Number((_b = (_a = this.getOpacityRateElement()) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "0"), event.target.value, Number((_d = (_c = this.getFontSizeRateElement()) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "0"));
            }
        });
        this.elemets.displayOriginalCc[1].addEventListener("change", (event) => {
            var _a, _b, _c, _d;
            if (event.target instanceof HTMLInputElement) {
                if (!event.target.checked)
                    return;
                this.callbackFuncChange(Number((_b = (_a = this.getOpacityRateElement()) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "0"), event.target.value, Number((_d = (_c = this.getFontSizeRateElement()) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "0"));
            }
        });
        this.elemets.fontSizeRate.addEventListener("change", (event) => {
            var _a, _b;
            if (event.target instanceof HTMLInputElement) {
                this.callbackFuncChange(Number((_b = (_a = this.getOpacityRateElement()) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "0"), this.getDisplayOriginalCcElementChecked()
                    .value, Number(event.target.value));
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
/* harmony import */ var _popup_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/popup/elements */ "./src/popup/elements.ts");
/* harmony import */ var _core_chromeStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/chromeStorage */ "./src/core/chromeStorage.ts");
/* harmony import */ var _core_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/logger */ "./src/core/logger.ts");




const run = async () => {
    const logger = new _core_logger__WEBPACK_IMPORTED_MODULE_3__.Logger(false);
    logger.log("start: popup");
    // config読み込み
    const config = new _core_config__WEBPACK_IMPORTED_MODULE_0__.Config((config) => { });
    await config.loadConfig();
    const configData = config.getConfig();
    logger.log(`load config: ${JSON.stringify(configData)}`);
    // elementsの変更後のコールバック関数
    const callbackFuncChangeElement = (opacityRate, displayOriginalCc, fontSizeRate) => {
        // configとストレージを更新
        logger.log("changeElement");
        configData.opacityRate = opacityRate;
        configData.displayOriginalCc = displayOriginalCc;
        configData.fontSizeRate = fontSizeRate;
        (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_2__.setStorage)("configOpacityRate", opacityRate);
        (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_2__.setStorage)("configDisplayOriginalCc", displayOriginalCc);
        (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_2__.setStorage)("configFontSizeRate", fontSizeRate);
    };
    const elements = new _popup_elements__WEBPACK_IMPORTED_MODULE_1__.Elements(configData.opacityRate, configData.displayOriginalCc, configData.fontSizeRate, callbackFuncChangeElement);
};
window.addEventListener("load", run, false);

})();

/******/ })()
;
//# sourceMappingURL=popup.bundle.js.map