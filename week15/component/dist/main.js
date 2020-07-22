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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel.view":
/*!***********************!*\
  !*** ./carousel.view ***!
  \***********************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n\n\t\t\n\t\tclass Carousel {\n\t\t\tsetAttribute(name, value) { // attribute\n\t\t\t\tthis[name] = value;\n\t\t\t}\n\t\t\trender() {\n\t\t\t\treturn  Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"template\", {}, \"\\n    \", Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"div\", {}, \"\\n        \", Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"img\", {\"src\":\"\",\"alt\":\"\",\"isSelfClosing\":true}, ),\"\\n    \"),\"\\n\")\n\t\t\t}\n\t\t\tmountTo(parent) {\n\t\t\t\tthis.render().mountTo(parent)\n\t\t\t}\n\t\t}\n\t\n\n//# sourceURL=webpack:///./carousel.view?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: create, Text, Wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction create(Cls, attributes) {\n  var o;\n\n  if (typeof Cls === 'string') {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n        if (typeof child === 'string') child = new Text(child);\n\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        o.children.push(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // children\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, handler, config) {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n/* harmony import */ var _carousel_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.view */ \"./carousel.view\");\n\n // class MyComponent {\n// \tconstructor(type) {\n// \t\tthis.children = [];\n// \t\t// this.root = document.createElement(\"div\");\n// \t}\n// \tsetAttribute(name, value) { // attribute\n// \t\tthis.root.setAttribute(name, value);\n// \t}\n// \tappendChild(child) { // children\n// \t\tthis.children.push(child);\n// \t}\n// \trender() {\n// \t\treturn <article>\n// \t\t\t<header>I'm header</header>\n// \t\t\t{this.slot}\n// \t\t\t<footer>I'm footer</footer>\n// \t\t</article>\t\n// \t}\n// \tmountTo(parent) {\n// \t\tthis.slot = <div></div>;\n// \t\tfor (let child of this.children) {\n// \t\t\tthis.slot.appendChild(child);\n// \t\t}\n// \t\tthis.render().mountTo(parent)\n// \t}\n// }\n// class Carousel {\n// \tconstructor(type) {\n// \t\tthis.children = [];\n// \t\tthis.attributes = new Map();\n// \t\tthis.properties = new Map();\n// \t}\n// \tsetAttribute(name, value) { // attribute\n// \t\tthis[name] = value;\n// \t}\n// \tappendChild(child) { // children\n// \t\tthis.children.push(child);\n// \t}\n// \trender() {\n// \t\tlet position = 0;\n// \t\tlet children = this.data.map(url => {\n// \t\t\t\t\tlet element = <img src={url} alt=\"cat\" />;\n// \t\t\t\t\telement.addEventListener(\"dragstart\", event => event.preventDefault());\n// \t\t\t\t\treturn element;\n// \t\t\t\t});\n// \t\tlet root = <div class=\"carousel\">{ children }</div>\n// \t\tlet nextPic = () => {  \n// \t\t\tlet nextPosition = (position + 1) % this.data.length;\n// \t\t\tlet current = children[position];\n// \t\t\tlet next = children[nextPosition];\n// \t\t\tcurrent.style.transition = \"ease 0s\";\n// \t\t\tnext.style.transition = \"ease 0s\";\n// \t\t\tcurrent.style.transform = `translateX(${- 100 * position}%)`;\n// \t\t\tnext.style.transform = `translateX(${100 - 100 * nextPosition}%)`;\n// \t\t\tsetTimeout(() => {\n// \t\t\t\t// = \"\" means use css rule\n// \t\t\t\tcurrent.style.transition = \"\";\n// \t\t\t\tnext.style.transition = \"\";\n// \t\t\t\tcurrent.style.transform = `translateX(${- 100 - 100 * position}%)`;\n// \t\t\t\tnext.style.transform = `translateX(${- 100 * nextPosition}%)`;\n// \t\t\t\tposition = nextPosition;\n// \t\t\t}, 16);\n// \t\t\tsetTimeout(nextPic, 3000);\n// \t\t}\n// \t\tsetTimeout(nextPic, 3000);\n// \t\t// 鼠标移动\n// \t\troot.addEventListener(\"mousedown\", (event) => {\n// \t\t\tlet startX = event.clientX, \n// \t\t\t\tstartY = event.clientY;\n// \t\t\tlet nextPosition = (position + 1) % this.data.length;\n// \t\t\tlet lastPosition = (position - 1 + this.data.length) % this.data.length;\n// \t\t\tlet current = children[position];\n// \t\t\tlet next = children[nextPosition];\n// \t\t\tlet last = children[lastPosition];\n// \t\t\tcurrent.style.transition = \"ease 0s\";\n// \t\t\tnext.style.transition = \"ease 0s\";\n// \t\t\tlast.style.transition = \"ease 0s\";\n// \t\t\tcurrent.style.transform = `translateX(${ - 500 * position}px)`;\n// \t\t\tnext.style.transform = `translateX(${500 - 500 * lastPosition}px)`;  \n// \t\t\tlast.style.transform = `translateX(${- 500 - 500 * nextPosition}px)`;\n// \t\t\tlet move = (event) => {\n// \t\t\t\tcurrent.style.transform = `translateX(${ event.clientX - startX - 500 * position}px)`;\n// \t\t\t\tnext.style.transform = `translateX(${ event.clientX - startX - 500 - 500 * nextPosition}px)`;\n// \t\t\t\tlast.style.transform = `translateX(${ event.clientX - startX + 500 - 500 * lastPosition}px)`;\n// \t\t\t};\n// \t\t\tlet up = (event) => {\n// \t\t\t\tlet offset = 0;\n// \t\t\t\tif (event.clientX - startX > 250) {\n// \t\t\t\t\toffset = 1;\n// \t\t\t\t} else if (event.clientX - startX < -250) {\n// \t\t\t\t\toffset = -1;\n// \t\t\t\t}\n// \t\t\t\t// 打开 transition\n// \t\t\t\tcurrent.style.transition = \"\";\n// \t\t\t\tnext.style.transition = \"\";\n// \t\t\t\tlast.style.transition = \"\";\n// \t\t\t\tcurrent.style.transform = `translateX(${ offset * 500 - 500 * position}px)`;\n// \t\t\t\tnext.style.transform = `translateX(${ offset * 500 - 500 - 500 * nextPosition}px)`;\n// \t\t\t\tlast.style.transform = `translateX(${ offset * 500 + 500 - 500 * lastPosition}px)`;\n// \t\t\t\tposition =  (position - offset + this.data.length) % this.data.length;\n// \t\t\t\tdocument.removeEventListener(\"mousemove\", move);\n// \t\t\t\tdocument.removeEventListener(\"mouseup\", up);\n// \t\t\t};\n// \t\t\tdocument.addEventListener(\"mousemove\", move);\n// \t\t\tdocument.addEventListener(\"mouseup\", up);\n// \t\t});\n// \t\treturn \troot;\n// \t}\n// \tmountTo(parent) {\n// \t\tthis.render().mountTo(parent)\n// \t}\n// }\n// let component = <div id=\"jhyu\"  cls=\"b\" style=\"width:100px;height:100px;background-color:lightgreen\">\n// \t\t\t\t\t<div>hey</div>\n// \t\t\t\t\t<div>javascript</div>\n// \t\t\t\t\t<div>component</div>\n// \t\t\t\t</div>\n// let component = <MyComponent>\n// \t\t\t\t\t<div>jhyu jhyu jhyu</div>\n// \t\t\t\t</MyComponent>\n\nvar component = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(_carousel_view__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], {\n  data: [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]\n});\ncomponent.mountTo(document.body); // console.log(component);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });