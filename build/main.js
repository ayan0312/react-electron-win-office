/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, author, description, main, scripts, build, bugs, repository, license, dependencies, devDependencies, devEngines, default */
/***/ (function(module) {

module.exports = {"name":"ayan-timer","version":"0.2.0","author":{"name":"ayan0312","email":"ayan0312000@outlook.com","url":"https://jangred.cn"},"description":"a tomato timer","main":"./build/main.js","scripts":{"build":"npm run build:main && npm run build:renderer","dev":"npm run dev:electron","build:main":"cross-env NODE_ENV=production webpack --config webpack/webpackConfigMain.babel.js","build:renderer":"cross-env NODE_ENV=production webpack --config webpack/webpackConfigRenderer.babel.js","dev:web":"cross-env NODE_ENV=development webpack-dev-server --config webpack/webDevRunner.babel.js --watch","dev:electron":"cross-env NODE_ENV=development IS_ELECTRON=true webpack --config webpack/webpackConfigMain.babel.js && cross-env NODE_ENV=development electron ./build/main.js","package:win":"npm run build && electron-builder build --win --x64","clean:build":"rimraf ./build","clean:release":"rimraf ./release","test":"mocha"},"build":{"productName":"ayanTimer","appId":"com.example.app","files":["build","package.json"],"win":{"target":["nsis","msi"]},"directories":{"buildResources":"resources","output":"release"}},"bugs":{"url":"https://github.com/ayan0312/ayanTimer/issues"},"repository":"https://github.com/ayan0312/ayanTimer.git","license":"MIT","dependencies":{"asar":"^2.0.1","node-gyp":"^4.0.0"},"devDependencies":{"@babel/core":"^7.4.5","@babel/plugin-proposal-class-properties":"^7.4.4","@babel/plugin-proposal-export-default-from":"^7.2.0","@babel/plugin-syntax-dynamic-import":"^7.2.0","@babel/preset-env":"^7.4.5","@babel/register":"^7.4.4","art-template":"^4.13.2","art-template-loader":"^1.4.3","autoprefixer":"^9.5.1","babel-loader":"^8.0.6","chai":"^4.2.0","chalk":"^2.4.2","core-js":"^3.1.3","cross-env":"^5.2.0","css-loader":"^0.28.11","dotenv":"^8.0.0","dotenv-webpack":"^1.7.0","electron":"^5.0.2","electron-builder":"^20.41.0","file-loader":"^3.0.1","html-webpack-plugin":"^3.2.0","merge":"^1.2.1","mini-css-extract-plugin":"^0.7.0","mocha":"^6.1.4","mochawesome":"^3.1.2","node-sass":"^4.12.0","node-sass-utils":"^1.1.2","postcss-loader":"^3.0.0","sass-loader":"^7.0.3","style-loader":"^0.23.1","terser-webpack-plugin":"^1.3.0","url-loader":"^1.1.2","webpack":"^4.32.2","webpack-cli":"^3.3.2","webpack-dev-server":"^3.4.1","webpack-merge":"^4.2.1"},"devEngines":{"node":"12.2.0","npm":"6.9.0"}};

/***/ }),

/***/ "./src/main/index.js":
/*!***************************!*\
  !*** ./src/main/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mainWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainWindow */ "./src/main/mainWindow.js");

const win = _mainWindow__WEBPACK_IMPORTED_MODULE_0__["ElectronWindow"].getInstance();
win.main();

/***/ }),

/***/ "./src/main/mainWindow.js":
/*!********************************!*\
  !*** ./src/main/mainWindow.js ***!
  \********************************/
/*! exports provided: ElectronWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectronWindow", function() { return ElectronWindow; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/env */ "./src/main/util/env.js");
/* harmony import */ var _shared_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/config */ "./src/shared/config.js");
/* harmony import */ var _shared_windowStyles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/windowStyles */ "./src/shared/windowStyles.js");





let _mainWindow,
    resourcesDirectory = new _util_env__WEBPACK_IMPORTED_MODULE_1__["ResourcesDirectory"]();

class ElectronWindow {
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ElectronWindow();
      return this.instance;
    }
  }

  constructor() {
    this.instance = null;
  }

  main() {
    this._InitBaseEnvironment();
  }

  _InitBaseEnvironment() {
    electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('ready', this._CreateWindow);
    electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        electron__WEBPACK_IMPORTED_MODULE_0__["app"].quit();
      }
    });
    electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('activate', () => {
      if (_mainWindow === null) {
        this._CreateWindow();
      }
    });
  }

  _CreateWindow() {
    _mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"]({
      width: _util_env__WEBPACK_IMPORTED_MODULE_1__["Env"].isDev() ? _shared_windowStyles__WEBPACK_IMPORTED_MODULE_3__["default"].MAX_WIDTH : parseInt(_shared_windowStyles__WEBPACK_IMPORTED_MODULE_3__["default"].WINDOW_WIDTH),
      height: parseInt(_shared_windowStyles__WEBPACK_IMPORTED_MODULE_3__["default"].WINDOW_HEIGHT),
      backgroundColor: _shared_windowStyles__WEBPACK_IMPORTED_MODULE_3__["default"].BACKGROUND_COLOR,
      show: false,
      resizable: false,
      movable: true,
      maximizable: false,
      fullscreenable: false,
      autoHideMenuBar: true,
      titleBarStyle: 'hiddenInset',
      frame: false
    });

    _mainWindow.loadURL(resourcesDirectory.getIndexURL());

    if (_util_env__WEBPACK_IMPORTED_MODULE_1__["Env"].isDev()) {
      _mainWindow.webContents.openDevTools();
    }

    _mainWindow.once('ready-to-show', () => {
      if (!_mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }

      if (_shared_config__WEBPACK_IMPORTED_MODULE_2__["config"].START_MINIMIZED === 'true') {
        _mainWindow.minimize();
      } else {
        _mainWindow.show();

        _mainWindow.focus();
      }
    });

    _mainWindow.on('closed', () => {
      _mainWindow = null;
    });
  }

}

/***/ }),

/***/ "./src/main/util/env.js":
/*!******************************!*\
  !*** ./src/main/util/env.js ***!
  \******************************/
/*! exports provided: Env, ResourcesDirectory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Env", function() { return Env; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourcesDirectory", function() { return ResourcesDirectory; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Env {
  static getEnv() {
    return this.env;
  }

  static isDev() {
    return this.env === 'development';
  }

  static isProd() {
    return this.env === 'production';
  }

}

_defineProperty(Env, "env",  true ? "development" : undefined);

class ResourcesDirectory {
  constructor() {
    this.port = process.env.PORT || 1212;
  }

  getIndexURL() {
    return Env.isDev() ? `http://localhost:${this.port}/index.html` : `file://${__dirname}/index.html`;
  }

}

/***/ }),

/***/ "./src/shared/config.js":
/*!******************************!*\
  !*** ./src/shared/config.js ***!
  \******************************/
/*! exports provided: config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../package.json */ "./package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../package.json */ "./package.json", 1);

const config = {
  APP_NAME: _package_json__WEBPACK_IMPORTED_MODULE_0__["build"].productName,
  APP_VERSION: _package_json__WEBPACK_IMPORTED_MODULE_0__["version"],
  REPO_OWNER: 'ayanTimer',
  REPO_NAME: 'ayanTimer-desktop',
  DEBUG_PROD: process.env.DEBUG_PROD === 'true' || false,
  UPGRADE_EXTENSIONS: process.env.UPGRADE_EXTENSIONS === 'true' || false,
  START_MINIMIZED: process.env.START_MINIMIZED === 'true' || false
};

/***/ }),

/***/ "./src/shared/windowStyles.js":
/*!************************************!*\
  !*** ./src/shared/windowStyles.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  WINDOW_WIDTH: '350px',
  WINDOW_HEIGHT: '700px',
  MAX_WIDTH: '750PX',
  MAX_HEIGHT: '800PX',
  MIN_WIDTH: '350PX',
  MIN_HEIGHT: '650PX',
  BACKGROUND_COLOR: "#efefef"
});

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map