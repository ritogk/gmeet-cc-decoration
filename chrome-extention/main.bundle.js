/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/core/ccOveserver.ts":
/*!*****************************************!*\
  !*** ./src/content/core/ccOveserver.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CcOveserver": () => (/* binding */ CcOveserver)
/* harmony export */ });
/* harmony import */ var _content_elements_original_ccAreaElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/content/elements/original/ccAreaElement */ "./src/content/elements/original/ccAreaElement.ts");

const config = { childList: true, subtree: true };
/**
 * 字幕の変更監視クラス
 */
class CcOveserver {
    constructor(callbackFunc) {
        this.observer = null;
        this.run = () => {
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
            const oveserverNode = new _content_elements_original_ccAreaElement__WEBPACK_IMPORTED_MODULE_0__.CcAreaElement().getCcElement();
            this.observer.observe(oveserverNode, config);
        };
        this.stop = () => {
            var _a;
            (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
        this.callbackFuncObserver = callbackFunc;
    }
}


/***/ }),

/***/ "./src/content/core/selector.ts":
/*!**************************************!*\
  !*** ./src/content/core/selector.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selector": () => (/* binding */ selector)
/* harmony export */ });
/**
 * GoogleMeetのElementのセレクター
 */
const controlCcButton = "#ow3 > div.T4LgNb > div > div:nth-child(14) > div.crqnQb > div.J0M6X.nulMpf.Didmac.G03iKb > div > div > div.Tmb7Fd > div > div.juFBl";
const ccMainArea = ".a4cQT";
const ccArea = "#ow3 > div.T4LgNb > div > div:nth-child(14) > div.crqnQb > div.a4cQT > div:nth-child(1) > div:nth-child(1)";
const usersArea = "#ow3 > div.T4LgNb > div > div:nth-child(14) > div.crqnQb > div:nth-child(2) > div.axUSnc.P9KVBf";
const controlArea = "#ow3 > div.T4LgNb > div > div:nth-child(14) > div.crqnQb > div.J0M6X.nulMpf.Didmac.G03iKb > div > div > div.Tmb7Fd > div";
const selector = {
    controlArea: controlArea,
    controlCcButton: controlCcButton,
    ccMainArea: ccMainArea,
    ccArea: ccArea,
    usersArea: usersArea,
};



/***/ }),

/***/ "./src/content/elements/UsersCcAreaElement.ts":
/*!****************************************************!*\
  !*** ./src/content/elements/UsersCcAreaElement.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsersCcAreaElement": () => (/* binding */ UsersCcAreaElement)
/* harmony export */ });
/* harmony import */ var _content_elements_original_UsersAreaElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/content/elements/original/UsersAreaElement */ "./src/content/elements/original/UsersAreaElement.ts");
/* harmony import */ var _core_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/dom */ "./src/core/dom.ts");


const userCcAreaClassName = "user-cc-area-class-name";
const userCcClassName = "user-cc-class-name";
var CcSize;
(function (CcSize) {
    CcSize[CcSize["SMALL"] = 0] = "SMALL";
    CcSize[CcSize["Large"] = 1] = "Large";
})(CcSize || (CcSize = {}));
/**
 * 全ユーザーの字幕Elementに関するクラス
 */
class UsersCcAreaElement {
    constructor(interval_excuting) {
        this.interval_excuting = false;
        this.elementOpacityRate = 0.5;
        this.elementSizeRate = 0.5;
        this.getElements = () => {
            var _a;
            return (_a = this.usersAreaElement
                .getElement()) === null || _a === void 0 ? void 0 : _a.querySelectorAll(userCcAreaClassName);
        };
        // all delete
        this.deleteElements = () => {
            this.displayElements.forEach((x) => {
                (0,_core_dom__WEBPACK_IMPORTED_MODULE_1__.removeElement)(x.element, 2000);
            });
        };
        this.getElement = (name) => {
            var _a;
            const userAreaElement = this.usersAreaElement.findUserAreaElement(name);
            return ((_a = userAreaElement === null || userAreaElement === void 0 ? void 0 : userAreaElement.querySelector("." + userCcAreaClassName)) !== null && _a !== void 0 ? _a : undefined);
        };
        this.createElement = (name) => {
            var _a;
            const userVideoElement = this.usersAreaElement.findUserVideoElement(name);
            if (!userVideoElement)
                return;
            const userAreaElement = this.usersAreaElement.findUserAreaElement(name);
            if (!userAreaElement)
                return;
            const userCcAreaElement = document.createElement("div");
            // style
            const style = this.generateElementStyle(userAreaElement.clientWidth, userAreaElement.clientHeight);
            userCcAreaElement.style.height = style.height;
            userCcAreaElement.style.fontSize = style.fontSize;
            userCcAreaElement.style.lineHeight = style.lineHeight;
            userCcAreaElement.style.webkitTextStroke = style.webkitTextStroke;
            userCcAreaElement.style.paddingLeft = style.paddingLeft;
            userCcAreaElement.style.paddingRight = style.paddingRight;
            userCcAreaElement.style.position = style.position;
            userCcAreaElement.style.bottom = style.bottom;
            userCcAreaElement.style.textAlign = style.textAlign;
            userCcAreaElement.style.backgroundColor = style.backgroundColor;
            userCcAreaElement.style.margin = style.margin;
            userCcAreaElement.style.zIndex = style.zIndex;
            userCcAreaElement.style.left = style.left;
            userCcAreaElement.style.right = style.right;
            userCcAreaElement.style.pointerEvents = style.pointerEvents;
            userCcAreaElement.style.overflow = style.overflow;
            userCcAreaElement.style.opacity = style.opacity;
            // 字幕を上スクロールさせる
            userCcAreaElement.scrollTop = 1000;
            userCcAreaElement.className = userCcAreaClassName;
            (_a = userVideoElement.parentElement) === null || _a === void 0 ? void 0 : _a.after(userCcAreaElement);
            this.appendDisplayElement(name, userCcAreaElement);
        };
        this.updateElement = (name) => {
            const userVideoElement = this.usersAreaElement.findUserVideoElement(name);
            if (!userVideoElement)
                return;
            const userAreaElement = this.usersAreaElement.findUserAreaElement(name);
            if (!userAreaElement)
                return;
            const userCcAreaElement = (userAreaElement.querySelector("." + userCcAreaClassName));
            if (!userCcAreaElement)
                return;
            if (userCcAreaElement) {
                userCcAreaElement.scrollTop = 1000;
            }
            const style = this.generateElementStyle(userAreaElement.clientWidth, userAreaElement.clientHeight);
            userCcAreaElement.style.height = style.height;
            userCcAreaElement.style.fontSize = style.fontSize;
            userCcAreaElement.style.lineHeight = style.lineHeight;
            userCcAreaElement.style.webkitTextStroke = style.webkitTextStroke;
            userCcAreaElement.style.paddingLeft = style.paddingLeft;
            userCcAreaElement.style.paddingRight = style.paddingRight;
            userCcAreaElement.style.opacity = style.opacity;
            this.deleteDisplayElement(name);
            this.appendDisplayElement(name, userCcAreaElement);
        };
        // 字幕エリアの取得
        this.findCcElement = (name) => {
            const userAreaElement = this.usersAreaElement.findUserAreaElement(name);
            if (!userAreaElement)
                return undefined;
            const userCcElement = userAreaElement.querySelector("." + userCcClassName);
            return userCcElement !== null ? userCcElement : undefined;
        };
        // 字幕エリア 追加
        this.appendCcElement = (name, speach) => {
            var _a;
            const userVideoElement = this.usersAreaElement.findUserVideoElement(name);
            if (!userVideoElement)
                return;
            const userAreaElement = this.usersAreaElement.findUserAreaElement(name);
            if (!userAreaElement)
                return;
            const userCcElement = document.createElement("div");
            userCcElement.innerHTML = this.formatSpeach(speach);
            userCcElement.className = userCcClassName;
            // style
            const style = this.generateUserCcStyle(userAreaElement.clientWidth);
            userCcElement.style.color = style.color;
            userCcElement.style.margin = style.margin;
            userCcElement.style.zIndex = style.zIndex;
            userCcElement.style.fontWeight = style.fontWeight;
            userCcElement.style.pointerEvents = style.pointerEvents;
            (_a = this.getElement(name)) === null || _a === void 0 ? void 0 : _a.appendChild(userCcElement);
        };
        // 字幕エリアのstyleを生成する
        this.generateElementStyle = (baseWidth, baseHeight) => {
            const style = {
                height: "",
                fontSize: "15px",
                lineHeight: "15px",
                webkitTextStroke: "1px #000",
                opacity: this.elementOpacityRate.toString(),
                paddingLeft: "",
                paddingRight: "",
                position: "absolute",
                bottom: "0",
                textAlign: "left",
                backgroundColor: "rgba(0,0,0,0.28)",
                margin: "0",
                zIndex: "1000000",
                left: "0",
                right: "0",
                pointerEvents: "none",
                overflow: "hidden",
            };
            const height = (baseHeight / 2.8) * (this.elementSizeRate * 2);
            style.height = `${height}px`;
            const padding = (baseWidth * 0.28) / 2;
            style.paddingLeft = `${padding}px`;
            style.paddingRight = `${padding}px`;
            const lineHeight = height / 4;
            const fontSize = lineHeight * 0.7;
            style.fontSize = `${fontSize}px`;
            style.lineHeight = `${lineHeight}px`;
            style.webkitTextStroke = `${fontSize >= 23 ? 2 : 1}px #000`;
            return style;
        };
        // 字幕エリアの透明度を変える
        this.setElementOpacityRate = (opacityRate) => {
            this.elementOpacityRate = opacityRate;
            this.displayElements.forEach((x) => {
                x.element.style.opacity = this.elementOpacityRate.toString();
            });
        };
        // 字幕エリアのサイズを変える
        this.setElementSizeRate = (ccSizeRate) => {
            this.elementSizeRate = ccSizeRate;
            this.displayElements.forEach((x) => {
                const userVideoElement = this.usersAreaElement.findUserVideoElement(x.name);
                if (!userVideoElement)
                    return;
                const userAreaElement = this.usersAreaElement.findUserAreaElement(x.name);
                if (!userAreaElement)
                    return;
                const elementStyle = this.generateElementStyle(userAreaElement.clientWidth, userAreaElement.clientHeight);
                x.element.style.height = elementStyle.height;
                x.element.style.paddingLeft = elementStyle.paddingLeft;
                x.element.style.paddingRight = elementStyle.paddingRight;
                x.element.style.fontSize = elementStyle.fontSize;
                x.element.style.lineHeight = elementStyle.lineHeight;
                x.element.style.webkitTextStrokeWidth = elementStyle.webkitTextStroke;
                x.element.style.opacity = elementStyle.opacity;
            });
        };
        // 字幕 更新
        this.updateCcElement = (name, speach) => {
            // 空白文字の場合は更新させない。
            if (speach.trim().length === 0)
                return;
            const userVideoElement = this.usersAreaElement.findUserVideoElement(name);
            if (!userVideoElement)
                return;
            const userAreaElement = this.usersAreaElement.findUserAreaElement(name);
            if (!userAreaElement)
                return;
            const userCcElement = this.findCcElement(name);
            if (!userCcElement)
                return;
            userCcElement.innerHTML = this.formatSpeach(speach);
        };
        // 字幕 削除
        this.deleteCcElement = (name) => {
            const displaySpeach = this.displayElements.find((x) => x.name === name);
            if (!displaySpeach)
                return;
            (0,_core_dom__WEBPACK_IMPORTED_MODULE_1__.removeElement)(displaySpeach.element, 2000);
        };
        // 字幕のフォントサイズを計算
        this.calcCcSize = (baseWidth) => {
            return baseWidth >= 550 ? CcSize.Large : CcSize.SMALL;
        };
        // 字幕のstyleを生成する
        this.generateUserCcStyle = (baseWidth) => {
            const style = {
                color: "white",
                margin: "0",
                zIndex: "1000001",
                fontWeight: "700",
                pointerEvents: "none",
            };
            return style;
        };
        // 整形する
        this.formatSpeach = (speach) => {
            let str = "";
            // 連続する「。」を削除
            str = speach.replace(/\。。/g, "。");
            // 「。」で改行させる
            str = str.replace(/\。/g, "。<br>");
            return str;
        };
        this.displayElements = [];
        this.appendDisplayElement = (name, element) => {
            this.displayElements.push({
                name: name,
                time: new Date().getTime(),
                element: element,
            });
        };
        this.deleteDisplayElement = (name) => {
            this.displayElements = this.displayElements.filter((displayUserSpeash) => displayUserSpeash.name !== name);
        };
        this.cclimitSecond = 8;
        this.intervalId = 0;
        this.runInterval = () => {
            if (this.interval_excuting)
                return;
            // 一定時間表示した字幕は消す
            this.intervalId = window.setInterval(() => {
                const oldDisplayElements = this.displayElements.filter((x) => (new Date().getTime() - x.time) / 1000 > this.cclimitSecond);
                oldDisplayElements.forEach((x) => {
                    (0,_core_dom__WEBPACK_IMPORTED_MODULE_1__.removeElement)(x.element, 2000);
                });
                this.displayElements = this.displayElements.filter((x) => (new Date().getTime() - x.time) / 1000 < this.cclimitSecond);
            }, 3000);
        };
        this.stopInterval = () => {
            clearInterval(this.intervalId);
        };
        this.interval_excuting = interval_excuting;
        this.usersAreaElement = new _content_elements_original_UsersAreaElement__WEBPACK_IMPORTED_MODULE_0__.UsersAreaElement();
    }
}


/***/ }),

/***/ "./src/content/elements/original/UsersAreaElement.ts":
/*!***********************************************************!*\
  !*** ./src/content/elements/original/UsersAreaElement.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsersAreaElement": () => (/* binding */ UsersAreaElement)
/* harmony export */ });
/* harmony import */ var _content_core_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/content/core/selector */ "./src/content/core/selector.ts");

/**
 * ユーザーエリアのElementに関するクラス
 */
class UsersAreaElement {
    constructor() {
        this.getElement = () => {
            return document.querySelector(_content_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.usersArea);
        };
        // ユーザーエリアの要素を取得
        this.findUserAreaElement = (name) => {
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
        };
        // 画面共有エリアの要素を取得
        this.findScreenSharingAreaElement = () => {
            const usersAreaElement = this.getElement();
            if (!usersAreaElement)
                return undefined;
            const userAreaList = Array.from(usersAreaElement.children);
            // 画面共有中は先頭のdivタグ内にZY8hPcクラスが含まれない。
            if (userAreaList[0].querySelector(".ZY8hPc")) {
                return undefined;
            }
            return userAreaList[0];
        };
        // 画面共有エリアのvideo要素を取得
        this.findScreenSharingVideoElement = () => {
            const screenSharingAreaElement = this.findScreenSharingAreaElement();
            if (!screenSharingAreaElement)
                return undefined;
            // 非表示のVideoタグが紛れる事があるのでその対応。
            const videoAreaElements = screenSharingAreaElement.querySelectorAll("video");
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
        };
        // ユーザーのvideo要素を取得
        this.findUserVideoElement = (name) => {
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
        };
    }
}


/***/ }),

/***/ "./src/content/elements/original/ccAreaElement.ts":
/*!********************************************************!*\
  !*** ./src/content/elements/original/ccAreaElement.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CcAreaElement": () => (/* binding */ CcAreaElement)
/* harmony export */ });
/* harmony import */ var _content_core_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/content/core/selector */ "./src/content/core/selector.ts");

/**
 * 字幕エリアのElementに関するクラス
 */
class CcAreaElement {
    constructor() {
        this.opacate = false;
        this.hideElement = () => {
            const element = this.getElement();
            if (element === null)
                return;
            element.style.opacity = "0";
            this.opacate = true;
        };
        this.showElement = () => {
            const element = this.getElement();
            if (element === null)
                return;
            element.style.opacity = "1";
            this.opacate = false;
        };
        this.getElement = () => {
            return document.querySelector(_content_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.ccMainArea);
        };
        this.getCcElement = () => {
            return document.querySelector(_content_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.ccArea);
        };
    }
}


/***/ }),

/***/ "./src/content/elements/original/controlAreaElement.ts":
/*!*************************************************************!*\
  !*** ./src/content/elements/original/controlAreaElement.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlAreaElement": () => (/* binding */ ControlAreaElement)
/* harmony export */ });
/* harmony import */ var _content_core_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/content/core/selector */ "./src/content/core/selector.ts");

/**
 * コントロールエリアElementに関するクラス
 */
class ControlAreaElement {
    constructor() {
        this.getElement = () => {
            return document.querySelector(_content_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.controlArea);
        };
        this.getCcBottomElement = () => {
            return document.querySelector(_content_core_selector__WEBPACK_IMPORTED_MODULE_0__.selector.controlCcButton);
        };
    }
}


/***/ }),

/***/ "./src/content/elements/switchingButtonElement.ts":
/*!********************************************************!*\
  !*** ./src/content/elements/switchingButtonElement.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SwitchingButtonElement": () => (/* binding */ SwitchingButtonElement)
/* harmony export */ });
/* harmony import */ var _content_elements_original_controlAreaElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/content/elements/original/controlAreaElement */ "./src/content/elements/original/controlAreaElement.ts");

/**
 * システムのスイッチングボタンに関するクラス
 */
class SwitchingButtonElement {
    constructor(callback) {
        this.drawed = false;
        this.mouseOver = false;
        this.clicked = false;
        this.createElement = () => {
            const element = document.createElement("div");
            element.id = SwitchingButtonElement.ELEMENT_ID;
            element.addEventListener("mouseover", this.callbackFuncMouseOver);
            element.addEventListener("mouseleave", this.callbackFuncMouseLeave);
            element.addEventListener("click", this.callbackFuncClick);
            const ccButtonElement = new _content_elements_original_controlAreaElement__WEBPACK_IMPORTED_MODULE_0__.ControlAreaElement().getCcBottomElement();
            if (ccButtonElement !== null && ccButtonElement.parentNode != null) {
                ccButtonElement.parentNode.insertBefore(element, ccButtonElement.nextElementSibling);
                this.changeStyle();
                this.drawed = true;
            }
        };
        this.deleteElement = () => {
            var _a;
            (_a = document.getElementById(SwitchingButtonElement.ELEMENT_ID)) === null || _a === void 0 ? void 0 : _a.remove();
            this.drawed = false;
            this.mouseOver = false;
            this.clicked = false;
        };
        this.getElement = () => {
            return document.getElementById(SwitchingButtonElement.ELEMENT_ID);
        };
        this.callbackFuncMouseOver = (e) => {
            this.mouseOver = true;
            this.changeStyle();
        };
        this.callbackFuncMouseLeave = (e) => {
            this.mouseOver = false;
            this.changeStyle();
        };
        this.callbackFuncClick = (e) => {
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
}
SwitchingButtonElement.ELEMENT_ID = "controlButton";


/***/ }),

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
        };
        this.getConfig = () => {
            return this.config;
        };
        this.setConfig = (config) => {
            this.config = config;
            this.callbackFuncChangeConfig(this.config);
        };
        this.loadConfig = async () => {
            var _a, _b, _c, _d;
            this.config.opacityRate =
                (_a = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configOpacityRate"))) !== null && _a !== void 0 ? _a : this.config.opacityRate;
            this.config.displayOriginalCc =
                (_b = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configDisplayOriginalCc"))) !== null && _b !== void 0 ? _b : this.config.displayOriginalCc;
            this.config.ccSizeRate =
                (_c = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configCcSizeRate"))) !== null && _c !== void 0 ? _c : this.config.opacityRate;
            this.config.ccRows =
                (_d = (await (0,_core_chromeStorage__WEBPACK_IMPORTED_MODULE_0__.getStorage)("configCcRows"))) !== null && _d !== void 0 ? _d : this.config.ccRows;
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
                this.setConfig(config);
            });
        };
        this.callbackFuncChangeConfig = callbackFunc;
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
/*!*****************************!*\
  !*** ./src/content/main.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/config */ "./src/core/config.ts");
/* harmony import */ var _content_elements_original_UsersAreaElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/content/elements/original/UsersAreaElement */ "./src/content/elements/original/UsersAreaElement.ts");
/* harmony import */ var _content_elements_UsersCcAreaElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/content/elements/UsersCcAreaElement */ "./src/content/elements/UsersCcAreaElement.ts");
/* harmony import */ var _content_elements_switchingButtonElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/content/elements/switchingButtonElement */ "./src/content/elements/switchingButtonElement.ts");
/* harmony import */ var _content_elements_original_ccAreaElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/content/elements/original/ccAreaElement */ "./src/content/elements/original/ccAreaElement.ts");
/* harmony import */ var _content_core_ccOveserver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/content/core/ccOveserver */ "./src/content/core/ccOveserver.ts");
/* harmony import */ var _core_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/logger */ "./src/core/logger.ts");







const main = async () => {
    const debug = false;
    const logger = new _core_logger__WEBPACK_IMPORTED_MODULE_6__.Logger(debug);
    logger.log("start: application");
    const usersAreaElement = new _content_elements_original_UsersAreaElement__WEBPACK_IMPORTED_MODULE_1__.UsersAreaElement();
    const usersCcAreaElement = new _content_elements_UsersCcAreaElement__WEBPACK_IMPORTED_MODULE_2__.UsersCcAreaElement(debug);
    const ccAreaElement = new _content_elements_original_ccAreaElement__WEBPACK_IMPORTED_MODULE_4__.CcAreaElement();
    // const screenSharingCcAreaElement = new ScreenSharingCcAreaElement()
    let screenShared = false;
    /**
     * 設定ファイル変更時のコールバック関数
     * @param config
     */
    const callbackFuncChangeConfig = (config) => {
        logger.log(JSON.stringify(config));
        // 字幕の透明度
        usersCcAreaElement.setElementOpacityRate(config.opacityRate);
        // screenSharingCcAreaElement.setUserCcOpacityRate(config.opacityRate)
        // 字幕の表示非表示制御
        if (config.displayOriginalCc == _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK) {
            ccAreaElement.showElement();
        }
        else {
            ccAreaElement.hideElement();
        }
        usersCcAreaElement.setElementSizeRate(config.ccSizeRate);
    };
    const config = new _core_config__WEBPACK_IMPORTED_MODULE_0__.Config(callbackFuncChangeConfig);
    await config.loadConfig();
    logger.log(`load config: ${JSON.stringify(config.getConfig())}`);
    config.observeGoogleStorage();
    // elementの初期設定
    usersCcAreaElement.setElementOpacityRate(config.getConfig().opacityRate);
    if (config.getConfig().displayOriginalCc == _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK) {
        ccAreaElement.showElement();
    }
    else {
        ccAreaElement.hideElement();
    }
    usersCcAreaElement.setElementSizeRate(config.getConfig().ccSizeRate);
    // screenSharingCcAreaElement.setUserCcOpacityRate(
    //   config.getConfig().opacityRate
    // )
    /**
     * コントロールボタン押下後のコールバック関数
     * @param clicked
     */
    const callbackFuncClick = (clicked) => {
        logger.log("click: controlButton");
        if (clicked) {
            ccOveserver.run();
            logger.log("start: observer");
            usersCcAreaElement.runInterval();
            // screenSharingCcAreaElement.runInterval()
            logger.log("run: interval");
        }
        else {
            ccOveserver.stop();
            logger.log("stop: observer");
            usersCcAreaElement.stopInterval();
            // screenSharingCcAreaElement.stopInterval()
            logger.log("stop: interval");
            usersCcAreaElement.deleteElements();
            // screenSharingCcAreaElement.deleteElement()
            logger.log("delete: cc elements");
        }
    };
    const controlButtonElement = new _content_elements_switchingButtonElement__WEBPACK_IMPORTED_MODULE_3__.SwitchingButtonElement(callbackFuncClick);
    controlButtonElement.createElement();
    /**
     * 字幕変更検知後のコールバック関数
     * @param name
     * @param imagePath
     * @param speach
     */
    const callbackFuncObserver = (name, imagePath, speach) => {
        logger.log("mutate: cc");
        logger.log(`name: ${name}`);
        logger.log(`imagePath: ${imagePath}`);
        logger.log(`speach: ${speach}`);
        if (usersAreaElement.findScreenSharingAreaElement()) {
            // 画面共有on
            if (!screenShared) {
                usersCcAreaElement.deleteElements();
                // screenSharingCcAreaElement.deleteElement()
                screenShared = true;
            }
            // if (!screenSharingCcAreaElement.getElement()) {
            //   screenSharingCcAreaElement.createElement()
            //   screenSharingCcAreaElement.appendCcElement(name, speach)
            // } else {
            //   screenSharingCcAreaElement.updateElement()
            //   screenSharingCcAreaElement.updateCcElement(name, speach)
            // }
        }
        else {
            // 画面共有off
            if (screenShared) {
                usersCcAreaElement.deleteElements();
                // screenSharingCcAreaElement.deleteElement()
                screenShared = false;
            }
        }
        if (!usersCcAreaElement.getElement(name)) {
            usersCcAreaElement.createElement(name);
            usersCcAreaElement.appendCcElement(name, speach);
        }
        else {
            usersCcAreaElement.updateElement(name);
            usersCcAreaElement.updateCcElement(name, speach);
        }
    };
    const ccOveserver = new _content_core_ccOveserver__WEBPACK_IMPORTED_MODULE_5__.CcOveserver(callbackFuncObserver);
    // ↓ 呼び出しスクリプト
    // document.dispatchEvent(
    //   new CustomEvent("runScript", {
    //     bubbles: true,
    //     detail: {
    //       name: "あなた",
    //       speach:
    //         "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほぱぴぷぺぽらりるれろ",
    //     },
    //   })
    // )
    // 動作確認用の入口
    document.addEventListener("runScript", (e) => {
        callbackFuncObserver(e.detail.name, "c:/a/b", e.detail.speach);
    });
};

})();

/******/ })()
;
//# sourceMappingURL=main.bundle.js.map