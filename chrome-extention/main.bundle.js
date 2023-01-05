/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Config": () => (/* binding */ Config)
/* harmony export */ });
/**
 * ポップアップ内で入力した設定情報
 */
class Config {
    constructor(callbackFunc) {
        this.config = {
            opacityRate: 0.5,
            isDisplayOriginalCc: 1,
        };
        this.getStorage = () => new Promise((resolve) => {
            chrome.storage.local.get(["opacityRate", "isDisplayOriginalCc"], (data) => {
                resolve(data);
            });
        });
        this.callbackFuncChangeConfig = callbackFunc;
    }
    getConfig() {
        return this.config;
    }
    setConfig(config) {
        this.config = config;
        this.callbackFuncChangeConfig(this.config);
    }
    async loadConfig() {
        const config = await this.getStorage();
        this.setConfig(config);
    }
}


/***/ }),

/***/ "./src/core/ccOveserver.ts":
/*!*********************************!*\
  !*** ./src/core/ccOveserver.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CcOveserver": () => (/* binding */ CcOveserver)
/* harmony export */ });
/* harmony import */ var _elements_ccAreaElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/elements/ccAreaElement */ "./src/elements/ccAreaElement.ts");

const config = { childList: true, subtree: true };
/**
 * 字幕の変更監視クラス
 */
class CcOveserver {
    constructor(callbackFunc) {
        this.observer = null;
        this.callbackFuncObserver = callbackFunc;
    }
    run() {
        const mutationCallback = (mutations, observer) => {
            var _a, _b, _c, _d;
            for (const mutation of mutations) {
                if (mutation.type === "childList") {
                    if (mutation.target.nodeName === "SPAN") {
                        const speechAreaNode = mutation.target;
                        const userAreaNode = (_b = (_a = speechAreaNode.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
                        if (!userAreaNode)
                            return;
                        const userAreaNodeList = Array.from(userAreaNode.children);
                        if (userAreaNodeList.length !== 3)
                            return;
                        this.callbackFuncObserver((_c = userAreaNodeList[1].textContent) !== null && _c !== void 0 ? _c : "", userAreaNodeList[0].src, (_d = userAreaNodeList[2].textContent) !== null && _d !== void 0 ? _d : "");
                    }
                }
            }
        };
        this.observer = new MutationObserver(mutationCallback);
        const oveserverNode = new _elements_ccAreaElement__WEBPACK_IMPORTED_MODULE_0__.CcAreaElement().getCcElement();
        this.observer.observe(oveserverNode, config);
    }
    stop() {
        var _a;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
}


/***/ }),

/***/ "./src/core/dom.ts":
/*!*************************!*\
  !*** ./src/core/dom.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeElement": () => (/* binding */ removeElement)
/* harmony export */ });
/**
 * Elementの削除を行います。
 * @param el
 * @param speed
 */
const removeElement = (el, speed) => {
    var seconds = speed / 1000;
    el.style.transition = "opacity " + seconds + "s ease";
    el.style.opacity = "0";
    setTimeout(function () {
        var _a;
        (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el);
    }, speed);
};



/***/ }),

/***/ "./src/core/selector.ts":
/*!******************************!*\
  !*** ./src/core/selector.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selector": () => (/* binding */ selector)
/* harmony export */ });
/**
 * GoogleMeetのElementのセレクター
 */
const controlCcButton = "#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div.UnvNgf.Sdwpn.P9KVBf.IYIJAc.BIBiNe > div.Tmb7Fd > div > div.juFBl";
const ccMainArea = ".a4cQT";
const ccArea = "#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div.a4cQT > div:nth-child(1) > div:nth-child(1)";
const usersArea = "#ow3 > div.T4LgNb > div > div:nth-child(13) > div.crqnQb > div:nth-child(2) > div.axUSnc.P9KVBf";
const selector = {
    controlCcButton: controlCcButton,
    ccMainArea: ccMainArea,
    ccArea: ccArea,
    usersArea: usersArea,
};



/***/ }),

/***/ "./src/elements/UsersAreaElement.ts":
/*!******************************************!*\
  !*** ./src/elements/UsersAreaElement.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsersAreaElement": () => (/* binding */ UsersAreaElement)
/* harmony export */ });
/* harmony import */ var _core_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/selector */ "./src/core/selector.ts");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/dom */ "./src/core/dom.ts");


const userCcClassName = "user-cc-class-name";
/**
 * ユーザーエリアのElementに関するクラス
 */
class UsersAreaElement {
    constructor() {
        // 字幕の透明度を変える
        this.userCcOpacityRate = 0.5;
        this.displayUserCcList = [];
        this.cclimitSecond = 10;
        this.intervalId = 0;
    }
    getElement() {
        return document.querySelector(_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.usersArea);
    }
    // ユーザーエリアの要素を取得
    findUserAreaElement(name) {
        const usersAreaElement = this.getElement();
        if (!usersAreaElement)
            return undefined;
        const userAreaList = Array.from(usersAreaElement.children);
        return userAreaList.find((element) => {
            var _a;
            // 画面共有ようのエリアはinnerTextが取得できないのでその対応
            const userNameArea = element.querySelector("[data-self-name]");
            if (!userNameArea)
                return false;
            if ((_a = userNameArea.textContent) === null || _a === void 0 ? void 0 : _a.startsWith(name)) {
                return true;
            }
            return false;
        });
    }
    // ユーザーのvideo要素を取得
    findUserVideoElement(name) {
        const userAreaElement = this.findUserAreaElement(name);
        if (!userAreaElement)
            return undefined;
        // 非表示のVideoタグが紛れる事があるのでその対応。
        const videoAreaElements = userAreaElement.querySelectorAll("video");
        let userVideoElement = null;
        if (videoAreaElements.length >= 2) {
            videoAreaElements.forEach((element) => {
                if (element.style.display == "none")
                    return;
                userVideoElement = element;
            });
        }
        else {
            userVideoElement = videoAreaElements[0];
        }
        return userVideoElement !== null ? userVideoElement : undefined;
    }
    // ユーザー字幕の取得
    findUserCcElement(name) {
        const userAreaElement = this.findUserAreaElement(name);
        if (!userAreaElement)
            return undefined;
        const userCcElement = userAreaElement.querySelector("." + userCcClassName);
        return userCcElement !== null ? userCcElement : undefined;
    }
    // 字幕 追加
    appendUserCcElement(name, speach) {
        var _a;
        const userAreaElement = this.findUserAreaElement(name);
        if (!userAreaElement)
            return;
        const userVideoElement = this.findUserVideoElement(name);
        if (!userVideoElement)
            return;
        const userCcElement = document.createElement("div");
        userCcElement.style.color = "white";
        userCcElement.style.position = "absolute";
        userCcElement.style.bottom = "0";
        userCcElement.style.width = "100%";
        userCcElement.style.backgroundColor = "rgba(0,0,0,0.25)";
        userCcElement.style.margin = "0";
        userCcElement.style.zIndex = "1000000";
        userCcElement.textContent = speach;
        userCcElement.className = userCcClassName;
        userCcElement.style.opacity = this.userCcOpacityRate.toString();
        userCcElement.style.fontWeight = "700";
        userCcElement.style.textAlign = "center";
        userCcElement.style.pointerEvents = "none";
        const fontSize = Math.floor(userVideoElement.clientWidth / 35);
        fontSize < 18
            ? (userCcElement.style.fontSize = "15px")
            : (userCcElement.style.fontSize = `${fontSize}px`);
        fontSize < 27
            ? (userCcElement.style.webkitTextStroke = "1px #000")
            : (userCcElement.style.webkitTextStroke = "2px #000");
        (_a = userVideoElement.parentElement) === null || _a === void 0 ? void 0 : _a.after(userCcElement);
        // ログに追加
        const userCcEmenet = this.findUserCcElement(name);
        if (!userCcEmenet)
            return;
        this.appendDisplayUserCc(name, userCcEmenet);
    }
    // 字幕 更新
    updateUserCcElement(name, speach) {
        const userAreraElement = this.findUserAreaElement(name);
        if (!userAreraElement)
            return;
        const userVideoElement = this.findUserVideoElement(name);
        if (!userVideoElement)
            return;
        const userCcElement = this.findUserCcElement(name);
        if (!userCcElement)
            return;
        userCcElement.textContent = speach;
        const fontSize = Math.floor(userVideoElement.clientWidth / 35);
        fontSize < 18
            ? (userCcElement.style.fontSize = "15px")
            : (userCcElement.style.fontSize = `${fontSize}px`);
        fontSize < 27
            ? (userCcElement.style.webkitTextStroke = "1px #000")
            : (userCcElement.style.webkitTextStroke = "2px #000");
        // ログに追加
        this.appendDisplayUserCc(name, userCcElement);
    }
    // 字幕 削除
    deleteUserCcElement(name) {
        const displaySpeach = this.displayUserCcList.find((x) => x.name === name);
        if (!displaySpeach)
            return;
        (0,_core_dom__WEBPACK_IMPORTED_MODULE_1__.removeElement)(displaySpeach.element, 2000);
    }
    // 全字幕 削除
    deleteUserCcElements() {
        this.displayUserCcList.forEach((x) => {
            (0,_core_dom__WEBPACK_IMPORTED_MODULE_1__.removeElement)(x.element, 2000);
        });
    }
    setUserCcOpacityRate(opacityRate) {
        this.userCcOpacityRate = opacityRate;
        this.displayUserCcList.forEach((x) => {
            x.element.style.opacity = this.userCcOpacityRate.toString();
        });
    }
    appendDisplayUserCc(name, element) {
        this.displayUserCcList = this.displayUserCcList.filter((displayUserSpeash) => displayUserSpeash.name !== name);
        this.displayUserCcList.push({
            name: name,
            time: new Date().getTime(),
            element: element,
        });
    }
    runInterval() {
        // 一定時間表示した字幕は消す
        this.intervalId = window.setInterval(() => {
            const oldDisplayUserCcList = this.displayUserCcList.filter((x) => (new Date().getTime() - x.time) / 1000 > this.cclimitSecond);
            oldDisplayUserCcList.forEach((x) => {
                (0,_core_dom__WEBPACK_IMPORTED_MODULE_1__.removeElement)(x.element, 2000);
            });
            this.displayUserCcList = this.displayUserCcList.filter((x) => (new Date().getTime() - x.time) / 1000 < this.cclimitSecond);
        }, 3000);
    }
    stopInterval() {
        clearInterval(this.intervalId);
    }
}


/***/ }),

/***/ "./src/elements/ccAreaElement.ts":
/*!***************************************!*\
  !*** ./src/elements/ccAreaElement.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CcAreaElement": () => (/* binding */ CcAreaElement)
/* harmony export */ });
/* harmony import */ var _core_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/selector */ "./src/core/selector.ts");

/**
 * 字幕エリアのElementに関するクラス
 */
class CcAreaElement {
    constructor() {
        this.opacate = false;
    }
    hideElement() {
        const element = this.getElement();
        if (element === null)
            return;
        element.style.opacity = "0";
        this.opacate = true;
    }
    showElement() {
        const element = this.getElement();
        if (element === null)
            return;
        element.style.opacity = "1";
        this.opacate = false;
    }
    getElement() {
        return document.querySelector(_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.ccMainArea);
    }
    getCcElement() {
        return document.querySelector(_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.ccArea);
    }
}


/***/ }),

/***/ "./src/elements/controlButtonElement.ts":
/*!**********************************************!*\
  !*** ./src/elements/controlButtonElement.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlButtonElement": () => (/* binding */ ControlButtonElement)
/* harmony export */ });
/* harmony import */ var _core_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/selector */ "./src/core/selector.ts");

/**
 * システムのコントロールボタンに関するクラス
 */
class ControlButtonElement {
    constructor(callback) {
        this.drawed = false;
        this.mouseOver = false;
        this.clicked = false;
        // このへんのhandle処理から
        this.callbackFuncMouseOver = () => {
            this.mouseOver = true;
            this.changeStyle();
        };
        this.callbackFuncMouseLeave = () => {
            this.mouseOver = false;
            this.changeStyle();
        };
        this.callbackFuncClick = () => {
            this.clicked = !this.clicked;
            this.changeStyle();
            this.clickCallback(this.clicked);
        };
        this.changeStyle = () => {
            const element = this.getElement();
            if (element === null)
                return;
            element.style.width = "40px";
            element.style.height = "40px";
            element.style.backgroundColor = "rgb(60, 64, 67)";
            element.style.borderRadius = "20px";
            element.style.paddingTop = "12px";
            element.style.paddingBottom = "12px";
            element.style.display = "inline-block";
            element.style.boxSizing = "border-box";
            element.style.filter = "brightness(1)";
            element.innerText = "ON";
            element.style.color = "#FFF";
            if (this.mouseOver) {
                element.style.filter = "brightness(1.15)";
            }
            if (this.clicked) {
                element.style.color = "#000";
                element.innerText = "OFF";
                element.style.backgroundColor = "rgb(138,180,248)";
            }
        };
        this.clickCallback = callback;
    }
    createElement() {
        const element = document.createElement("div");
        element.id = ControlButtonElement.ELEMENT_ID;
        element.addEventListener("mouseover", this.callbackFuncMouseOver);
        element.addEventListener("mouseleave", this.callbackFuncMouseLeave);
        element.addEventListener("click", this.callbackFuncClick);
        const ccButtonElement = document.querySelector(_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.controlCcButton);
        if (ccButtonElement !== null && ccButtonElement.parentNode != null) {
            ccButtonElement.parentNode.insertBefore(element, ccButtonElement.nextElementSibling);
            this.changeStyle();
            this.drawed = true;
        }
    }
    deleteElement() {
        var _a;
        (_a = document.getElementById(ControlButtonElement.ELEMENT_ID)) === null || _a === void 0 ? void 0 : _a.remove();
        this.drawed = false;
        this.mouseOver = false;
        this.clicked = false;
    }
    getElement() {
        return document.getElementById(ControlButtonElement.ELEMENT_ID);
    }
}
ControlButtonElement.ELEMENT_ID = "controlButton";


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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config */ "./src/config.ts");
/* harmony import */ var _elements_UsersAreaElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/elements/UsersAreaElement */ "./src/elements/UsersAreaElement.ts");
/* harmony import */ var _elements_controlButtonElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/elements/controlButtonElement */ "./src/elements/controlButtonElement.ts");
/* harmony import */ var _elements_ccAreaElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/elements/ccAreaElement */ "./src/elements/ccAreaElement.ts");
/* harmony import */ var _core_ccOveserver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/ccOveserver */ "./src/core/ccOveserver.ts");





const main = () => {
    console.log("start: application");
    /**
     * コントロールボタン押下後のコールバック関数
     * @param clicked
     */
    const callbackFuncClick = (clicked) => {
        console.log("click: controlButton");
        if (clicked) {
            ccOveserver.run();
            console.log("start: observer");
            usersAreaElement.runInterval();
            console.log("run: interval");
        }
        else {
            ccOveserver.stop();
            console.log("stop: observer");
            usersAreaElement.stopInterval();
            console.log("stop: interval");
            usersAreaElement.deleteUserCcElements();
            console.log("delete: cc elements");
        }
    };
    /**
     * 字幕変更検知後のコールバック関数
     * @param name
     * @param imagePath
     * @param speach
     */
    const callbackFuncObserver = (name, imagePath, speach) => {
        console.log("mutate: cc");
        console.log(`name: ${name}`);
        console.log(`imagePath: ${imagePath}`);
        console.log(`speach: ${speach}`);
        if (!usersAreaElement.findUserCcElement(name)) {
            usersAreaElement.appendUserCcElement(name, speach);
        }
        else {
            usersAreaElement.updateUserCcElement(name, speach);
        }
    };
    const usersAreaElement = new _elements_UsersAreaElement__WEBPACK_IMPORTED_MODULE_1__.UsersAreaElement();
    const ccAreaElement = new _elements_ccAreaElement__WEBPACK_IMPORTED_MODULE_3__.CcAreaElement();
    const controlButtonElement = new _elements_controlButtonElement__WEBPACK_IMPORTED_MODULE_2__.ControlButtonElement(callbackFuncClick);
    controlButtonElement.createElement();
    const ccOveserver = new _core_ccOveserver__WEBPACK_IMPORTED_MODULE_4__.CcOveserver(callbackFuncObserver);
    /**
     * 設定ファイル変更時のコールバック関数
     * @param config
     */
    const callbackFuncChangeConfig = (config) => {
        console.log("callback simasuta!");
        // 字幕の透明度
        usersAreaElement.setUserCcOpacityRate(config.opacityRate);
        // 字幕の表示非表示制御
        if (config.isDisplayOriginalCc == 1) {
            ccAreaElement.showElement();
        }
        else {
            ccAreaElement.hideElement();
        }
    };
    const config = new _config__WEBPACK_IMPORTED_MODULE_0__.Config(callbackFuncChangeConfig);
    config.loadConfig();
    // ポップアップ側の変更検知
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log("receive: popup → content_scripts");
        const data = JSON.parse(message);
        config.setConfig(data);
    });
};
// 動作確認用の入口
document.addEventListener("runScript", (e) => {
    main();
});
// // script呼び出し用イベント
// const event = new Event("runScript", { bubbles: true })
// document.dispatchEvent(event)

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map