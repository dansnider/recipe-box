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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
/******/ })
/************************************************************************/
/******/ ({

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getActiveTab(document) {
	var pageData = {};

	pageData.isRecipe = checkIfRecipe(document);
	pageData.url = window.location.href;
	pageData.image = getMainImageUrl(document);
	pageData.title = document.head.querySelector("meta[property='og:title']") != null ? document.head.querySelector("meta[property='og:title']").content : document.head.querySelector('title').innerText;
	pageData.description = document.head.querySelector("meta[property='og:description']") != null ? document.head.querySelector("meta[property='og:description']").content : "";

	return pageData;
}

function checkIfRecipe(document) {
	var pageType = document.head.querySelector("meta[property='og:type']");

	if (pageType != null && pageType.content != "article") {
		return false;
	}

	if (contains('recipe') || contains('ingredients')) {
		return true;
	} else {
		return false;
	}
}

function contains(string) {
	return document.body.innerText.indexOf(string) > -1;
}

function getMainImageUrl(document) {
	var img = document.querySelectorAll('img');
	var twitterImage = document.head.querySelector("meta[name='twitter:image']");
	var ogImage = document.head.querySelector("meta[property='og:image]");
	var images = [];

	// social images are good results
	if (twitterImage) {
		return twitterImage.content;
	} else if (ogImage) {
		return ogImage.content;
	}

	// return src of largest image
	if (img.length) {

		img.forEach(function (image) {
			image.area = image.width * image.height;

			if (image.area > 16 * 16) {
				images.push(image);
			}
		});

		images.sort(function (a, b) {
			return b.area - a.area;
		});

		return images[0].src;
	} else {
		return "";
	}
}

chrome.runtime.sendMessage({
	action: "getActiveTab",
	source: getActiveTab(document)
});

/***/ })

/******/ });