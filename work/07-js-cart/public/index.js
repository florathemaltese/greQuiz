/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cart": () => (/* binding */ cart),
/* harmony export */   "renderCart": () => (/* binding */ renderCart)
/* harmony export */ });


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var cart = [{
  name: 'Big White',
  src: 'http://placekitten.com/50/50?image=1',
  price: '0.99',
  quantity: '0'
}, {
  name: 'Medium Grey',
  src: 'http://placekitten.com/50/50?image=2',
  price: '3.14',
  quantity: '0'
}, {
  name: 'Little Black',
  src: 'http://placekitten.com/50/50?image=3',
  price: '2.73',
  quantity: '0'
}];
var cartElement = document.querySelector('.cart');
function renderCart() {
  var cartHtml = cart.map(function (item, index) {
    var displayClass = item.quantity <= 0 ? "not-displayed" : "";
    return "\n            <li class=\"item ".concat(displayClass, "\">\n                <img src=\"").concat(item.src, "\" alt=\"").concat(item.name, "\">\n                <div class=\"item-name\">").concat(item.name, "</div>\n                <div class=\"item-price\">$").concat(item.price, "</div>\n                <div class=\"item-quant\">").concat(item.quantity, "</div>\n                <div class=\"item-totalprice\">$").concat((item.price * item.quantity).toFixed(2), "</div>\n                <button class=\"item-minusbutton\" data-index=\"").concat(index, "\">-</button>\n                <button class=\"item-addbutton\" data-index=\"").concat(index, "\">+</button>\n            </li>\n        ");
  }).join('');
  cartElement.innerHTML = cartHtml;
  var cartMessage = document.querySelector('.cart-message');
  var cartTotalprice = document.querySelector('.cart-totalprice');
  var checkoutButton = document.querySelector('.button-checkout');
  var isAllZero = true;
  var totalPrice = 0;
  var _iterator = _createForOfIteratorHelper(cart),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (item.quantity > 0) {
        isAllZero = false;
        totalPrice += item.price * item.quantity;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (isAllZero) {
    cartMessage.innerHTML = "Nothing in the cart";
    cartTotalprice.innerHTML = "0";
    checkoutButton.classList.add('not-displayed');
  } else {
    cartMessage.innerHTML = "";
    cartTotalprice.innerHTML = "Total Price: $".concat(totalPrice.toFixed(2));
    checkoutButton.classList.remove('not-displayed');
  }
}
renderCart();
cartElement.addEventListener('click', function (e) {
  if (e.target.classList.contains('item-minusbutton')) {
    var cartIndex = e.target.dataset.index;
    if (cart[cartIndex].quantity > 0) {
      cart[cartIndex].quantity--;
    }
    renderCart();
  }
  if (e.target.classList.contains('item-addbutton')) {
    var _cartIndex = e.target.dataset.index;
    cart[_cartIndex].quantity++;
    renderCart();
  }
});
var viewButton = document.querySelector('.button-viewcart');
var hideButton = document.querySelector('.button-hidecart');
var cartframe = document.querySelector('.cartframe');
viewButton.addEventListener('click', function () {
  cartframe.classList.remove('not-displayed');
  viewButton.classList.add('not-displayed');
});
hideButton.addEventListener('click', function () {
  cartframe.classList.add('not-displayed');
  viewButton.classList.remove('not-displayed');
});
var checkout = document.querySelector('.button-checkout');
checkout.addEventListener('click', function () {
  update();
});
function update() {
  cartframe.classList.add('not-displayed');
  viewButton.classList.remove('not-displayed');
  for (var _i = 0, _cart = cart; _i < _cart.length; _i++) {
    var item = _cart[_i];
    item.quantity = 0;
  }
  renderCart();
}

/***/ }),

/***/ "./src/productPage.js":
/*!****************************!*\
  !*** ./src/productPage.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ "./src/cart.js");



var products = [{
  name: 'Big White',
  src: 'http://placekitten.com/150/150?image=1',
  price: '0.99'
}, {
  name: 'Medium Grey',
  src: 'http://placekitten.com/150/150?image=2',
  price: '3.14'
}, {
  name: 'Little Black',
  src: 'http://placekitten.com/150/150?image=3',
  price: '2.73'
}];
var productsEl = document.querySelector('.products');
function renderProducts() {
  var productHtml = products.map(function (product, index) {
    return "\n            <li class=\"product\">\n                <img src=\"".concat(product.src, "\" alt=\"").concat(product.name, "\">\n                <div class=\"product-name\">").concat(product.name, "</div>\n                <div class=\"product-price\">$").concat(product.price, "</div>\n                <button class=\"product-addbutton\" data-index=\"").concat(index, "\">Add to Cart</button>\n            </li>\n        ");
  }).join('');
  productsEl.innerHTML = productHtml;
}
renderProducts();
productsEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('product-addbutton')) {
    var productIndex = e.target.dataset.index;
    _cart__WEBPACK_IMPORTED_MODULE_0__.cart[productIndex].quantity++;
    (0,_cart__WEBPACK_IMPORTED_MODULE_0__.renderCart)();
  }
});

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/cart.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/productPage.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map