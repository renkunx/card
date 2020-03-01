var card =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var Card, QJ, extend, payment, pinyin,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	__webpack_require__(1);

	QJ = __webpack_require__(5);

	payment = __webpack_require__(6);

	extend = __webpack_require__(7);

	pinyin = __webpack_require__(13);

	Card = (function() {
	  var bindVal;

	  Card.prototype.initializedDataAttr = "data-jp-card-initialized";

	  Card.prototype.cardTemplate = '' + '<div class="jp-card-container">' + '<div class="jp-card">' + '<div class="jp-card-front">' + '<div class="jp-card-logo jp-card-elo">' + '<div class="e">e</div>' + '<div class="l">l</div>' + '<div class="o">o</div>' + '</div>' + '<div class="jp-card-logo jp-card-visa">Visa</div>' + '<div class="jp-card-logo jp-card-visaelectron">Visa<div class="elec">Electron</div></div>' + '<div class="jp-card-logo jp-card-mastercard">Mastercard</div>' + '<div class="jp-card-logo jp-card-maestro">Maestro</div>' + '<div class="jp-card-logo jp-card-amex"></div>' + '<div class="jp-card-logo jp-card-discover">discover</div>' + '<div class="jp-card-logo jp-card-unionpay">UnionPay</div>' + '<div class="jp-card-logo jp-card-dinersclub"></div>' + '<div class="jp-card-logo jp-card-dankort"><div class="dk"><div class="d"></div><div class="k"></div></div></div>' + '<div class="jp-card-logo jp-card-jcb">' + '<div class="j">J</div>' + '<div class="c">C</div>' + '<div class="b">B</div>' + '</div>' + '<div class="jp-card-lower">' + '<div class="jp-card-shiny"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-number jp-card-display">{{number}}</div>' + '<div class="jp-card-name jp-card-display">{{name}}</div>' + '<div class="jp-card-expiry jp-card-display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>' + '</div>' + '</div>' + '<div class="jp-card-back">' + '<div class="jp-card-bar"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-shiny"></div>' + '</div>' + '</div>' + '</div>';

	  Card.prototype.template = function(tpl, data) {
	    return tpl.replace(/\{\{(.*?)\}\}/g, function(match, key, str) {
	      return data[key];
	    });
	  };

	  Card.prototype.cardTypes = ['jp-card-amex', 'jp-card-dankort', 'jp-card-dinersclub', 'jp-card-discover', 'jp-card-unionpay', 'jp-card-jcb', 'jp-card-laser', 'jp-card-maestro', 'jp-card-mastercard', 'jp-card-unionpay', 'jp-card-visa', 'jp-card-visaelectron', 'jp-card-elo'];

	  Card.prototype.defaults = {
	    formatting: true,
	    formSelectors: {
	      numberInput: 'input[name="number"]',
	      expiryInput: 'input[name="expiry"]',
	      cvcInput: 'input[name="cvc"]',
	      nameInput: 'input[name="name"]'
	    },
	    cardSelectors: {
	      cardContainer: '.jp-card-container',
	      card: '.jp-card',
	      numberDisplay: '.jp-card-number',
	      expiryDisplay: '.jp-card-expiry',
	      cvcDisplay: '.jp-card-cvc',
	      nameDisplay: '.jp-card-name'
	    },
	    messages: {
	      validDate: 'valid\nthru',
	      monthYear: 'month/year'
	    },
	    placeholders: {
	      number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;',
	      cvc: '&bull;&bull;&bull;',
	      expiry: '&bull;&bull;/&bull;&bull;',
	      name: 'Full Name'
	    },
	    masks: {
	      cardNumber: false
	    },
	    classes: {
	      valid: 'jp-card-valid',
	      invalid: 'jp-card-invalid'
	    },
	    debug: false
	  };

	  function Card(opts) {
	    this.maskCardNumber = bind(this.maskCardNumber, this);
	    var toInitialize;
	    this.options = extend(true, this.defaults, opts);
	    if (!this.options.form) {
	      console.log("Please provide a form");
	      return;
	    }
	    this.$el = QJ(this.options.form);
	    if (!this.options.container) {
	      console.log("Please provide a container");
	      return;
	    }
	    this.$container = QJ(this.options.container);
	    toInitialize = QJ.isDOMElement(this.$container) ? this.$container : this.$container[0];
	    if (toInitialize.getAttribute(this.initializedDataAttr)) {
	      return;
	    }
	    toInitialize.setAttribute(this.initializedDataAttr, true);
	    this.render();
	    this.attachHandlers();
	    this.handleInitialPlaceholders();
	  }

	  Card.prototype.render = function() {
	    var $cardContainer, baseWidth, name, obj, ref, ref1, selector, ua;
	    QJ.append(this.$container, this.template(this.cardTemplate, extend({}, this.options.messages, this.options.placeholders)));
	    ref = this.options.cardSelectors;
	    for (name in ref) {
	      selector = ref[name];
	      this["$" + name] = QJ.find(this.$container, selector);
	    }
	    ref1 = this.options.formSelectors;
	    for (name in ref1) {
	      selector = ref1[name];
	      selector = this.options[name] ? this.options[name] : selector;
	      obj = QJ.find(this.$el, selector);
	      if (!obj.length && this.options.debug) {
	        console.error("Card can't find a " + name + " in your form.");
	      }
	      this["$" + name] = obj;
	    }
	    if (this.options.formatting) {
	      Payment.formatCardNumber(this.$numberInput);
	      Payment.formatCardCVC(this.$cvcInput);
	      Payment.formatCardExpiry(this.$expiryInput);
	    }
	    if (this.options.width) {
	      $cardContainer = QJ(this.options.cardSelectors.cardContainer)[0];
	      baseWidth = parseInt($cardContainer.clientWidth || window.getComputedStyle($cardContainer).width);
	      $cardContainer.style.transform = "scale(" + (this.options.width / baseWidth) + ")";
	    }
	    if (typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : void 0) {
	      ua = navigator.userAgent.toLowerCase();
	      if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
	        QJ.addClass(this.$card, 'jp-card-safari');
	      }
	    }
	    if (/MSIE 10\./i.test(navigator.userAgent)) {
	      QJ.addClass(this.$card, 'jp-card-ie-10');
	    }
	    if (/rv:11.0/i.test(navigator.userAgent)) {
	      return QJ.addClass(this.$card, 'jp-card-ie-11');
	    }
	  };

	  Card.prototype.attachHandlers = function() {
	    var expiryFilters, numberInputFilters;
	    numberInputFilters = [this.validToggler('cardNumber')];
	    if (this.options.masks.cardNumber) {
	      numberInputFilters.push(this.maskCardNumber);
	    }
	    bindVal(this.$numberInput, this.$numberDisplay, {
	      fill: false,
	      filters: numberInputFilters
	    });
	    QJ.on(this.$numberInput, 'payment.cardType', this.handle('setCardType'));
	    expiryFilters = [
	      function(val) {
	        return val.replace(/(\s+)/g, '');
	      }
	    ];
	    expiryFilters.push(this.validToggler('cardExpiry'));
	    bindVal(this.$expiryInput, this.$expiryDisplay, {
	      join: function(text) {
	        if (text[0].length === 2 || text[1]) {
	          return "/";
	        } else {
	          return "";
	        }
	      },
	      filters: expiryFilters
	    });
	    bindVal(this.$cvcInput, this.$cvcDisplay, {
	      filters: this.validToggler('cardCVC')
	    });
	    QJ.on(this.$cvcInput, 'focus', this.handle('flipCard'));
	    QJ.on(this.$cvcInput, 'blur', this.handle('unflipCard'));
	    return bindVal(this.$nameInput, this.$nameDisplay, {
	      fill: false,
	      filters: this.validToggler('cardHolderName'),
	      join: ' ',
	      computed: function(text) {
	        if (/[\u4E00-\u9FFF]+/.test(text)) {
	          return pinyin(text, {
	            style: pinyin.STYLE_NORMAL
	          }).join(' ').toUpperCase();
	        } else {
	          return text;
	        }
	      }
	    });
	  };

	  Card.prototype.handleInitialPlaceholders = function() {
	    var el, name, ref, results, selector;
	    ref = this.options.formSelectors;
	    results = [];
	    for (name in ref) {
	      selector = ref[name];
	      el = this["$" + name];
	      if (QJ.val(el)) {
	        QJ.trigger(el, 'paste');
	        results.push(setTimeout(function() {
	          return QJ.trigger(el, 'keyup');
	        }));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };

	  Card.prototype.handle = function(fn) {
	    return (function(_this) {
	      return function(e) {
	        var args;
	        args = Array.prototype.slice.call(arguments);
	        args.unshift(e.target);
	        return _this.handlers[fn].apply(_this, args);
	      };
	    })(this);
	  };

	  Card.prototype.validToggler = function(validatorName) {
	    var isValid;
	    if (validatorName === "cardExpiry") {
	      isValid = function(val) {
	        var objVal;
	        objVal = Payment.fns.cardExpiryVal(val);
	        return Payment.fns.validateCardExpiry(objVal.month, objVal.year);
	      };
	    } else if (validatorName === "cardCVC") {
	      isValid = (function(_this) {
	        return function(val) {
	          return Payment.fns.validateCardCVC(val, _this.cardType);
	        };
	      })(this);
	    } else if (validatorName === "cardNumber") {
	      isValid = function(val) {
	        return Payment.fns.validateCardNumber(val);
	      };
	    } else if (validatorName === "cardHolderName") {
	      isValid = function(val) {
	        return val !== "";
	      };
	    }
	    return (function(_this) {
	      return function(val, $in, $out) {
	        var result;
	        result = isValid(val);
	        _this.toggleValidClass($in, result);
	        _this.toggleValidClass($out, result);
	        return val;
	      };
	    })(this);
	  };

	  Card.prototype.toggleValidClass = function(el, test) {
	    QJ.toggleClass(el, this.options.classes.valid, test);
	    return QJ.toggleClass(el, this.options.classes.invalid, !test);
	  };

	  Card.prototype.maskCardNumber = function(val, el, out) {
	    var mask, numbers;
	    mask = this.options.masks.cardNumber;
	    numbers = val.split(' ');
	    if (numbers.length >= 3) {
	      numbers.forEach(function(item, idx) {
	        if (idx !== numbers.length - 1) {
	          return numbers[idx] = numbers[idx].replace(/\d/g, mask);
	        }
	      });
	      return numbers.join(' ');
	    } else {
	      return val.replace(/\d/g, mask);
	    }
	  };

	  Card.prototype.handlers = {
	    setCardType: function($el, e) {
	      var cardType;
	      cardType = e.data;
	      if (!QJ.hasClass(this.$card, cardType)) {
	        QJ.removeClass(this.$card, 'jp-card-unknown');
	        QJ.removeClass(this.$card, this.cardTypes.join(' '));
	        QJ.addClass(this.$card, "jp-card-" + cardType);
	        QJ.toggleClass(this.$card, 'jp-card-identified', cardType !== 'unknown');
	        return this.cardType = cardType;
	      }
	    },
	    flipCard: function() {
	      return QJ.addClass(this.$card, 'jp-card-flipped');
	    },
	    unflipCard: function() {
	      return QJ.removeClass(this.$card, 'jp-card-flipped');
	    }
	  };

	  bindVal = function(el, out, opts) {
	    var joiner, o, outDefaults;
	    if (opts == null) {
	      opts = {};
	    }
	    opts.fill = opts.fill || false;
	    opts.filters = opts.filters || [];
	    if (!(opts.filters instanceof Array)) {
	      opts.filters = [opts.filters];
	    }
	    opts.join = opts.join || "";
	    if (!(typeof opts.join === "function")) {
	      joiner = opts.join;
	      opts.join = function() {
	        return joiner;
	      };
	    }
	    outDefaults = (function() {
	      var j, len, results;
	      results = [];
	      for (j = 0, len = out.length; j < len; j++) {
	        o = out[j];
	        results.push(o.textContent);
	      }
	      return results;
	    })();
	    QJ.on(el, 'focus', function() {
	      return QJ.addClass(out, 'jp-card-focused');
	    });
	    QJ.on(el, 'blur', function() {
	      return QJ.removeClass(out, 'jp-card-focused');
	    });
	    QJ.on(el, 'keyup change paste', function(e) {
	      var elem, filter, i, j, join, k, len, len1, outEl, outVal, ref, results, val;
	      val = (function() {
	        var j, len, results;
	        results = [];
	        for (j = 0, len = el.length; j < len; j++) {
	          elem = el[j];
	          results.push(QJ.val(elem));
	        }
	        return results;
	      })();
	      join = opts.join(val);
	      val = val.join(join);
	      if (val === join) {
	        val = "";
	      }
	      ref = opts.filters;
	      for (j = 0, len = ref.length; j < len; j++) {
	        filter = ref[j];
	        val = filter(val, el, out);
	      }
	      results = [];
	      for (i = k = 0, len1 = out.length; k < len1; i = ++k) {
	        outEl = out[i];
	        if (opts.fill) {
	          outVal = val + outDefaults[i].substring(val.length);
	        } else {
	          outVal = val || outDefaults[i];
	        }
	        if (typeof opts.computed === "function") {
	          outVal = opts.computed(val) || outDefaults[i];
	        }
	        results.push(outEl.textContent = outVal);
	      }
	      return results;
	    });
	    return el;
	  };

	  return Card;

	})();

	module.exports = Card;

	global.Card = Card;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/dist/cjs.js!./card.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/dist/cjs.js!./card.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".jp-card.jp-card-safari.jp-card-identified .jp-card-front:before,.jp-card.jp-card-safari.jp-card-identified .jp-card-back:before{background-image:repeating-linear-gradient(45deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.03) 4px),repeating-linear-gradient(90deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(210deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),-webkit-linear-gradient(-245deg, rgba(255,255,255,0) 50%,rgba(255,255,255,0.2) 70%,rgba(255,255,255,0) 90%);background-image:repeating-linear-gradient(45deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.03) 4px),repeating-linear-gradient(90deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(210deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),linear-gradient(-25deg, rgba(255,255,255,0) 50%,rgba(255,255,255,0.2) 70%,rgba(255,255,255,0) 90%)}.jp-card.jp-card-ie-10.jp-card-flipped,.jp-card.jp-card-ie-11.jp-card-flipped{-webkit-transform:0deg;-moz-transform:0deg;-ms-transform:0deg;-o-transform:0deg;transform:0deg}.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-front,.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-front{-webkit-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-ms-transform:rotateY(0deg);-o-transform:rotateY(0deg);transform:rotateY(0deg)}.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back,.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back{-webkit-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-ms-transform:rotateY(0deg);-o-transform:rotateY(0deg);transform:rotateY(0deg)}.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back:after,.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back:after{left:18%}.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-cvc,.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-cvc{-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);-ms-transform:rotateY(180deg);-o-transform:rotateY(180deg);transform:rotateY(180deg);left:5%}.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny,.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny{left:84%}.jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny:after,.jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny:after{left:-480%;-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);-ms-transform:rotateY(180deg);-o-transform:rotateY(180deg);transform:rotateY(180deg)}.jp-card.jp-card-ie-10.jp-card-amex .jp-card-back,.jp-card.jp-card-ie-11.jp-card-amex .jp-card-back{display:none}.jp-card-logo{height:36px;width:60px;font-style:italic}.jp-card-logo,.jp-card-logo:before,.jp-card-logo:after{box-sizing:border-box}.jp-card-logo.jp-card-amex{text-transform:uppercase;font-size:4px;font-weight:bold;color:white;background-image:repeating-radial-gradient(circle at center, #fff 1px, #999 2px);background-image:repeating-radial-gradient(circle at center, #fff 1px, #999 2px);border:1px solid #EEE}.jp-card-logo.jp-card-amex:before,.jp-card-logo.jp-card-amex:after{width:28px;display:block;position:absolute;left:16px}.jp-card-logo.jp-card-amex:before{height:28px;content:\"american\";top:3px;text-align:left;padding-left:2px;padding-top:11px;background:#267AC3}.jp-card-logo.jp-card-amex:after{content:\"express\";bottom:11px;text-align:right;padding-right:2px}.jp-card.jp-card-amex.jp-card-flipped{-webkit-transform:none;-moz-transform:none;-ms-transform:none;-o-transform:none;transform:none}.jp-card.jp-card-amex.jp-card-identified .jp-card-front:before,.jp-card.jp-card-amex.jp-card-identified .jp-card-back:before{background-color:#108168}.jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-logo.jp-card-amex{opacity:1}.jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-cvc{visibility:visible}.jp-card.jp-card-amex.jp-card-identified .jp-card-front:after{opacity:1}.jp-card-logo.jp-card-discover{background:#f60;color:#111;text-transform:uppercase;font-style:normal;font-weight:bold;font-size:10px;text-align:center;overflow:hidden;z-index:1;padding-top:9px;letter-spacing:.03em;border:1px solid #EEE}.jp-card-logo.jp-card-discover:before,.jp-card-logo.jp-card-discover:after{content:\" \";display:block;position:absolute}.jp-card-logo.jp-card-discover:before{background:white;width:200px;height:200px;border-radius:200px;bottom:-5%;right:-80%;z-index:-1}.jp-card-logo.jp-card-discover:after{width:8px;height:8px;border-radius:4px;top:10px;left:27px;background-color:#f60;background-image:-webkit-radial-gradient(#f60,#fff);background-image:radial-gradient(  #f60,#fff);content:\"network\";font-size:4px;line-height:24px;text-indent:-7px}.jp-card .jp-card-front .jp-card-logo.jp-card-discover{right:12%;top:18%}.jp-card.jp-card-discover.jp-card-identified .jp-card-front:before,.jp-card.jp-card-discover.jp-card-identified .jp-card-back:before{background-color:#86B8CF}.jp-card.jp-card-discover.jp-card-identified .jp-card-logo.jp-card-discover{opacity:1}.jp-card.jp-card-discover.jp-card-identified .jp-card-front:after{-webkit-transition:400ms;-moz-transition:400ms;transition:400ms;content:\" \";display:block;background-color:#f60;background-image:-webkit-linear-gradient(#f60,#ffa366,#f60);background-image:linear-gradient(#f60,#ffa366,#f60);height:50px;width:50px;border-radius:25px;position:absolute;left:100%;top:15%;margin-left:-25px;box-shadow:inset 1px 1px 3px 1px rgba(0,0,0,0.5)}.jp-card-logo.jp-card-unionpay{width:66px;display:block;height:40px;background:#e21836;-webkit-transform:skew(-15deg);-moz-transform:skew(20deg);-o-transform:skew(20deg);border-radius:5px;font-size:10px;z-index:1;line-height:33px;color:#fff;text-align:center;font-family:\"Sans-serif\", \"Microsoft Yahei\", \"\\5FAE\\8F6F\\96C5\\9ED1\", \"Hiragino Sans\", \"Gulim\", \"\\5B8B\\4F53\";font-weight:bold}.jp-card-logo.jp-card-unionpay:after,.jp-card-logo.jp-card-unionpay:before{display:block;margin:0 auto;position:absolute;height:40px;top:0;z-index:-1}.jp-card-logo.jp-card-unionpay:before{content:\" \";width:30px;background:#00447c;left:22px;border-top-left-radius:5px;border-bottom-left-radius:5px}.jp-card-logo.jp-card-unionpay:after{content:\"\\94F6\\8054\";width:22px;background:#007b84;left:44px;border-radius:5px;font-size:10px;line-height:57px;text-indent:-22px}.jp-card.jp-card-unionpay.jp-card-identified .jp-card-back:before,.jp-card.jp-card-unionpay.jp-card-identified .jp-card-front:before{background-color:#987c00}.jp-card.jp-card-unionpay.jp-card-identified .jp-card-logo.jp-card-unionpay{opacity:1}.jp-card-logo.jp-card-visa{text-transform:uppercase;color:white;text-align:center;font-weight:bold;font-size:24px;line-height:18px;margin-top:5px}.jp-card-logo.jp-card-visa:before,.jp-card-logo.jp-card-visa:after{content:\" \";display:block;width:100%;height:25%}.jp-card-logo.jp-card-visa:before{position:absolute;left:-4px;width:0;height:0;border-style:solid;border-width:0 12px 6px 0;border-color:transparent #ffffff transparent transparent}.jp-card.jp-card-visa.jp-card-identified .jp-card-front:before,.jp-card.jp-card-visa.jp-card-identified .jp-card-back:before{background-color:#191278}.jp-card.jp-card-visa.jp-card-identified .jp-card-logo.jp-card-visa{opacity:1;box-shadow:none}.jp-card-logo.jp-card-visaelectron{background:white;text-transform:uppercase;color:#1A1876;text-align:center;font-weight:bold;font-size:15px;line-height:18px}.jp-card-logo.jp-card-visaelectron:before,.jp-card-logo.jp-card-visaelectron:after{content:\" \";display:block;width:100%;height:25%}.jp-card-logo.jp-card-visaelectron:before{background:#1A1876}.jp-card-logo.jp-card-visaelectron:after{background:#E79800}.jp-card-logo.jp-card-visaelectron .elec{float:right;font-family:arial;font-size:9px;margin-right:1px;margin-top:-5px;text-transform:none}.jp-card.jp-card-visaelectron.jp-card-identified .jp-card-front:before,.jp-card.jp-card-visaelectron.jp-card-identified .jp-card-back:before{background-color:#191278}.jp-card.jp-card-visaelectron.jp-card-identified .jp-card-logo.jp-card-visaelectron{opacity:1}.jp-card-logo.jp-card-mastercard{color:white;font-style:normal;text-transform:lowercase;font-weight:bold;text-align:center;font-size:9px;line-height:84px;z-index:1;text-shadow:1px 1px rgba(0,0,0,0.6)}.jp-card-logo.jp-card-mastercard:before,.jp-card-logo.jp-card-mastercard:after{content:\" \";display:block;width:36px;top:0;position:absolute;height:36px;border-radius:18px}.jp-card-logo.jp-card-mastercard:before{left:0;background:#EB001B;z-index:-1;opacity:0.9}.jp-card-logo.jp-card-mastercard:after{right:0;background:#FF5F00;z-index:-2}.jp-card.jp-card-mastercard.jp-card-identified .jp-card-front .jp-card-logo.jp-card-mastercard,.jp-card.jp-card-mastercard.jp-card-identified .jp-card-back .jp-card-logo.jp-card-mastercard{box-shadow:none}.jp-card.jp-card-mastercard.jp-card-identified .jp-card-front:before,.jp-card.jp-card-mastercard.jp-card-identified .jp-card-back:before{background-color:#0061A8}.jp-card.jp-card-mastercard.jp-card-identified .jp-card-logo.jp-card-mastercard{opacity:1}.jp-card-logo.jp-card-maestro{color:white;font-style:normal;text-transform:lowercase;font-weight:bold;text-align:center;font-size:14px;line-height:84px;z-index:1;text-shadow:1px 1px rgba(0,0,0,0.6)}.jp-card-logo.jp-card-maestro:before,.jp-card-logo.jp-card-maestro:after{content:\" \";display:block;width:36px;top:0;position:absolute;height:36px;border-radius:18px}.jp-card-logo.jp-card-maestro:before{left:0;background:#EB001B;z-index:-2}.jp-card-logo.jp-card-maestro:after{right:0;background:#00A2E5;z-index:-1;opacity:0.8}.jp-card.jp-card-maestro.jp-card-identified .jp-card-front .jp-card-logo.jp-card-maestro,.jp-card.jp-card-maestro.jp-card-identified .jp-card-back .jp-card-logo.jp-card-maestro{box-shadow:none}.jp-card.jp-card-maestro.jp-card-identified .jp-card-front:before,.jp-card.jp-card-maestro.jp-card-identified .jp-card-back:before{background-color:#0B2C5F}.jp-card.jp-card-maestro.jp-card-identified .jp-card-logo.jp-card-maestro{opacity:1}.jp-card-logo.jp-card-dankort{width:60px;height:36px;padding:3px;border-radius:8px;border:#000 1px solid;background-color:#fff}.jp-card-logo.jp-card-dankort .dk{position:relative;width:100%;height:100%;overflow:hidden}.jp-card-logo.jp-card-dankort .dk:before{background-color:#ED1C24;content:'';position:absolute;width:100%;height:100%;display:block;border-radius:6px}.jp-card-logo.jp-card-dankort .dk:after{content:'';position:absolute;top:50%;margin-top:-7.7px;right:0;width:0;height:0;border-style:solid;border-width:7px 7px 10px 0;border-color:transparent #ED1C24 transparent transparent;z-index:1}.jp-card-logo.jp-card-dankort .d,.jp-card-logo.jp-card-dankort .k{position:absolute;top:50%;width:50%;display:block;height:15.4px;margin-top:-7.7px;background:white}.jp-card-logo.jp-card-dankort .d{left:0;border-radius:0 8px 10px 0}.jp-card-logo.jp-card-dankort .d:before{content:'';position:absolute;top:50%;left:50%;display:block;background:#ED1C24;border-radius:2px 4px 6px 0px;height:5px;width:7px;margin:-3px 0 0 -4px}.jp-card-logo.jp-card-dankort .k{right:0}.jp-card-logo.jp-card-dankort .k:before,.jp-card-logo.jp-card-dankort .k:after{content:'';position:absolute;right:50%;width:0;height:0;border-style:solid;margin-right:-1px}.jp-card-logo.jp-card-dankort .k:before{top:0;border-width:8px 5px 0 0;border-color:#ED1C24 transparent transparent transparent}.jp-card-logo.jp-card-dankort .k:after{bottom:0;border-width:0 5px 8px 0;border-color:transparent transparent #ED1C24 transparent}.jp-card.jp-card-dankort.jp-card-identified .jp-card-front:before,.jp-card.jp-card-dankort.jp-card-identified .jp-card-back:before{background-color:#0055C7}.jp-card.jp-card-dankort.jp-card-identified .jp-card-logo.jp-card-dankort{opacity:1}.jp-card-logo.jp-card-elo{height:50px;width:50px;border-radius:100%;background:black;color:white;text-align:center;text-transform:lowercase;font-size:21px;font-style:normal;letter-spacing:1px;font-weight:bold;padding-top:13px}.jp-card-logo.jp-card-elo .e,.jp-card-logo.jp-card-elo .l,.jp-card-logo.jp-card-elo .o{display:inline-block;position:relative}.jp-card-logo.jp-card-elo .e{-webkit-transform:rotate(-15deg);-moz-transform:rotate(-15deg);-ms-transform:rotate(-15deg);-o-transform:rotate(-15deg);transform:rotate(-15deg)}.jp-card-logo.jp-card-elo .o{position:relative;display:inline-block;width:12px;height:12px;right:0;top:7px;border-radius:100%;background-image:-webkit-linear-gradient( #ff0 50%,red 50%);background-image:linear-gradient( #ff0 50%,red 50%);-webkit-transform:rotate(40deg);-moz-transform:rotate(40deg);-ms-transform:rotate(40deg);-o-transform:rotate(40deg);transform:rotate(40deg);text-indent:-9999px}.jp-card-logo.jp-card-elo .o:before{content:\"\";position:absolute;width:49%;height:49%;background:black;border-radius:100%;text-indent:-99999px;top:25%;left:25%}.jp-card.jp-card-elo.jp-card-identified .jp-card-front:before,.jp-card.jp-card-elo.jp-card-identified .jp-card-back:before{background-color:#6F6969}.jp-card.jp-card-elo.jp-card-identified .jp-card-logo.jp-card-elo{opacity:1}.jp-card-logo.jp-card-jcb{border-radius:5px 0px 5px 0px;-moz-border-radius:5px 0px 5px 0px;-webkit-border-radius:5px 0px 5px 0px;background-color:white;font-style:normal;color:white;width:50px;padding:2px 0 0 2px}.jp-card-logo.jp-card-jcb>div{width:15px;margin-right:1px;display:inline-block;text-align:center;text-shadow:1px 1px rgba(0,0,0,0.6);border-radius:5px 0px 5px 0px;-moz-border-radius:5px 0px 5px 0px;-webkit-border-radius:5px 0px 5px 0px}.jp-card-logo.jp-card-jcb>div:before,.jp-card-logo.jp-card-jcb>div:after{content:\" \";display:block;height:8px}.jp-card-logo.jp-card-jcb>div.j{background-color:#000063;background-image:-webkit-linear-gradient(left, #000063,#008cff);background-image:linear-gradient(to right,#000063,#008cff)}.jp-card-logo.jp-card-jcb>div.c{background-color:#630000;background-image:-webkit-linear-gradient(left, #630000,#ff008d);background-image:linear-gradient(to right,#630000,#ff008d)}.jp-card-logo.jp-card-jcb>div.b{background-color:#006300;background-image:-webkit-linear-gradient(left, #006300,lime);background-image:linear-gradient(to right,#006300,lime)}.jp-card.jp-card-jcb.jp-card-identified .jp-card-front:before,.jp-card.jp-card-jcb.jp-card-identified .jp-card-back:before{background-color:#CB8000}.jp-card.jp-card-jcb.jp-card-identified .jp-card-logo.jp-card-jcb{opacity:1;box-shadow:none}.jp-card-logo.jp-card-dinersclub{font-family:serif;height:40px;width:100px;color:white;font-size:17px;font-style:normal;letter-spacing:1px}.jp-card-logo.jp-card-dinersclub::before,.jp-card-logo.jp-card-dinersclub::after{display:block;position:relative}.jp-card-logo.jp-card-dinersclub::before{content:'Diners Club'}.jp-card-logo.jp-card-dinersclub::after{content:'International';text-transform:uppercase;font-size:0.6em}.jp-card.jp-card-dinersclub .jp-card-front .jp-card-logo{box-shadow:none !important}.jp-card.jp-card-dinersclub.jp-card-identified .jp-card-front:before,.jp-card.jp-card-dinersclub.jp-card-identified .jp-card-back:before{background-color:#999}.jp-card.jp-card-dinersclub.jp-card-identified .jp-card-logo.jp-card-dinersclub{opacity:1}.jp-card-container{-webkit-perspective:1000px;-moz-perspective:1000px;perspective:1000px;width:350px;max-width:100%;height:200px;margin:auto;z-index:1;position:relative}.jp-card{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;line-height:1;position:relative;width:100%;height:100%;min-width:315px;border-radius:10px;-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;-o-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transition:all 400ms linear;-moz-transition:all 400ms linear;transition:all 400ms linear}.jp-card>*,.jp-card>*:after,.jp-card>*:before{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:inherit}.jp-card.jp-card-flipped{-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);-ms-transform:rotateY(180deg);-o-transform:rotateY(180deg);transform:rotateY(180deg)}.jp-card .jp-card-back,.jp-card .jp-card-front{-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;-o-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transition:all 400ms linear;-moz-transition:all 400ms linear;transition:all 400ms linear;width:100%;height:100%;position:absolute;top:0;left:0;overflow:hidden;border-radius:10px;background:#DDD}.jp-card .jp-card-back:before,.jp-card .jp-card-front:before{content:\" \";display:block;position:absolute;width:100%;height:100%;top:0;left:0;opacity:0;border-radius:10px;-webkit-transition:all 400ms ease;-moz-transition:all 400ms ease;transition:all 400ms ease}.jp-card .jp-card-back:after,.jp-card .jp-card-front:after{content:\" \";display:block}.jp-card .jp-card-back .jp-card-display,.jp-card .jp-card-front .jp-card-display{color:#fff;font-weight:normal;opacity:0.5;-webkit-transition:opacity 400ms linear;-moz-transition:opacity 400ms linear;transition:opacity 400ms linear}.jp-card .jp-card-back .jp-card-display.jp-card-focused,.jp-card .jp-card-front .jp-card-display.jp-card-focused{opacity:1;font-weight:700}.jp-card .jp-card-back .jp-card-cvc,.jp-card .jp-card-front .jp-card-cvc{font-family:\"Bitstream Vera Sans Mono\",Consolas,Courier,monospace;font-size:14px}.jp-card .jp-card-back .jp-card-shiny,.jp-card .jp-card-front .jp-card-shiny{width:50px;height:35px;border-radius:5px;background:#CCC;position:relative}.jp-card .jp-card-back .jp-card-shiny:before,.jp-card .jp-card-front .jp-card-shiny:before{content:\" \";display:block;width:70%;height:60%;border-top-right-radius:5px;border-bottom-right-radius:5px;background:#d9d9d9;position:absolute;top:20%}.jp-card .jp-card-front .jp-card-logo{position:absolute;opacity:0;right:5%;top:8%;-webkit-transition:400ms;-moz-transition:400ms;transition:400ms}.jp-card .jp-card-front .jp-card-lower{width:80%;position:absolute;left:10%;bottom:30px}@media only screen and (max-width: 480px){.jp-card .jp-card-front .jp-card-lower{width:90%;left:5%}}.jp-card .jp-card-front .jp-card-lower .jp-card-cvc{visibility:hidden;float:right;position:relative;bottom:5px}.jp-card .jp-card-front .jp-card-lower .jp-card-number{font-family:\"Bitstream Vera Sans Mono\",Consolas,Courier,monospace;font-size:24px;clear:both;margin-bottom:30px}.jp-card .jp-card-front .jp-card-lower .jp-card-expiry{font-family:\"Bitstream Vera Sans Mono\",Consolas,Courier,monospace;letter-spacing:0;position:relative;float:right;width:25%}.jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after,.jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-weight:bold;font-size:7px;white-space:pre;display:block;opacity:0.5}.jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before{content:attr(data-before);margin-bottom:2px;font-size:7px;text-transform:uppercase}.jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after{position:absolute;content:attr(data-after);text-align:right;right:100%;margin-right:5px;margin-top:2px;bottom:0}.jp-card .jp-card-front .jp-card-lower .jp-card-name{text-transform:uppercase;font-family:\"Bitstream Vera Sans Mono\",Consolas,Courier,monospace;font-size:20px;max-height:45px;position:absolute;bottom:0;width:190px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:horizontal;overflow:hidden;text-overflow:ellipsis}.jp-card .jp-card-back{-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);-ms-transform:rotateY(180deg);-o-transform:rotateY(180deg);transform:rotateY(180deg)}.jp-card .jp-card-back .jp-card-bar{background-color:#444;background-image:-webkit-linear-gradient(#444,#333);background-image:linear-gradient(#444,#333);width:100%;height:20%;position:absolute;top:10%}.jp-card .jp-card-back:after{content:\" \";display:block;background-color:#fff;background-image:-webkit-linear-gradient(#fff,#fff);background-image:linear-gradient(#fff,#fff);width:80%;height:16%;position:absolute;top:40%;left:2%}.jp-card .jp-card-back .jp-card-cvc{position:absolute;top:40%;left:85%;-webkit-transition-delay:600ms;-moz-transition-delay:600ms;transition-delay:600ms}.jp-card .jp-card-back .jp-card-shiny{position:absolute;top:66%;left:2%}.jp-card .jp-card-back .jp-card-shiny:after{content:\"This card has been issued by Jesse Pollak and is licensed for anyone to use anywhere for free. It comes with no warranty. For support issues, please visit: github.com/jessepollak/card.\";position:absolute;left:120%;top:5%;color:white;font-size:7px;width:230px;opacity:0.5}.jp-card.jp-card-identified{box-shadow:0 0 20px rgba(0,0,0,0.3)}.jp-card.jp-card-identified .jp-card-back,.jp-card.jp-card-identified .jp-card-front{background-color:#000;background-color:rgba(0,0,0,0.5)}.jp-card.jp-card-identified .jp-card-back:before,.jp-card.jp-card-identified .jp-card-front:before{-webkit-transition:all 400ms ease;-moz-transition:all 400ms ease;transition:all 400ms ease;background-image:repeating-linear-gradient(45deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.03) 4px),repeating-linear-gradient(90deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(210deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-radial-gradient(circle at 30% 30%, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-radial-gradient(circle at 70% 70%, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-radial-gradient(circle at 90% 20%, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-radial-gradient(circle at 15% 80%, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),-webkit-linear-gradient(-245deg, rgba(255,255,255,0) 50%,rgba(255,255,255,0.2) 70%,rgba(255,255,255,0) 90%);background-image:repeating-linear-gradient(45deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.03) 4px),repeating-linear-gradient(90deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(210deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-radial-gradient(circle at 30% 30%, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-radial-gradient(circle at 70% 70%, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-radial-gradient(circle at 90% 20%, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-radial-gradient(circle at 15% 80%, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),linear-gradient(-25deg, rgba(255,255,255,0) 50%,rgba(255,255,255,0.2) 70%,rgba(255,255,255,0) 90%);opacity:1}.jp-card.jp-card-identified .jp-card-back .jp-card-logo,.jp-card.jp-card-identified .jp-card-front .jp-card-logo{box-shadow:0 0 0 2px rgba(255,255,255,0.3)}.jp-card.jp-card-identified.no-radial-gradient .jp-card-back:before,.jp-card.jp-card-identified.no-radial-gradient .jp-card-front:before{background-image:repeating-linear-gradient(45deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.03) 4px),repeating-linear-gradient(90deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(210deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),-webkit-linear-gradient(-245deg, rgba(255,255,255,0) 50%,rgba(255,255,255,0.2) 70%,rgba(255,255,255,0) 90%);background-image:repeating-linear-gradient(45deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.03) 4px),repeating-linear-gradient(90deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),repeating-linear-gradient(210deg, rgba(255,255,255,0) 1px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.05) 4px),linear-gradient(-25deg, rgba(255,255,255,0) 50%,rgba(255,255,255,0.2) 70%,rgba(255,255,255,0) 90%)}\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// Generated by CoffeeScript 1.10.0
	(function() {
	  var QJ, rreturn, rtrim;

	  QJ = function(selector) {
	    if (QJ.isDOMElement(selector)) {
	      return selector;
	    }
	    return document.querySelectorAll(selector);
	  };

	  QJ.isDOMElement = function(el) {
	    return el && (el.nodeName != null);
	  };

	  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	  QJ.trim = function(text) {
	    if (text === null) {
	      return "";
	    } else {
	      return (text + "").replace(rtrim, "");
	    }
	  };

	  rreturn = /\r/g;

	  QJ.val = function(el, val) {
	    var ret;
	    if (arguments.length > 1) {
	      return el.value = val;
	    } else {
	      ret = el.value;
	      if (typeof ret === "string") {
	        return ret.replace(rreturn, "");
	      } else {
	        if (ret === null) {
	          return "";
	        } else {
	          return ret;
	        }
	      }
	    }
	  };

	  QJ.preventDefault = function(eventObject) {
	    if (typeof eventObject.preventDefault === "function") {
	      eventObject.preventDefault();
	      return;
	    }
	    eventObject.returnValue = false;
	    return false;
	  };

	  QJ.normalizeEvent = function(e) {
	    var original;
	    original = e;
	    e = {
	      which: original.which != null ? original.which : void 0,
	      target: original.target || original.srcElement,
	      preventDefault: function() {
	        return QJ.preventDefault(original);
	      },
	      originalEvent: original,
	      data: original.data || original.detail
	    };
	    if (e.which == null) {
	      e.which = original.charCode != null ? original.charCode : original.keyCode;
	    }
	    return e;
	  };

	  QJ.on = function(element, eventName, callback) {
	    var el, i, j, len, len1, multEventName, originalCallback, ref;
	    if (element.length) {
	      for (i = 0, len = element.length; i < len; i++) {
	        el = element[i];
	        QJ.on(el, eventName, callback);
	      }
	      return;
	    }
	    if (eventName.match(" ")) {
	      ref = eventName.split(" ");
	      for (j = 0, len1 = ref.length; j < len1; j++) {
	        multEventName = ref[j];
	        QJ.on(element, multEventName, callback);
	      }
	      return;
	    }
	    originalCallback = callback;
	    callback = function(e) {
	      e = QJ.normalizeEvent(e);
	      return originalCallback(e);
	    };
	    if (element.addEventListener) {
	      return element.addEventListener(eventName, callback, false);
	    }
	    if (element.attachEvent) {
	      eventName = "on" + eventName;
	      return element.attachEvent(eventName, callback);
	    }
	    element['on' + eventName] = callback;
	  };

	  QJ.addClass = function(el, className) {
	    var e;
	    if (el.length) {
	      return (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = el.length; i < len; i++) {
	          e = el[i];
	          results.push(QJ.addClass(e, className));
	        }
	        return results;
	      })();
	    }
	    if (el.classList) {
	      return el.classList.add(className);
	    } else {
	      return el.className += ' ' + className;
	    }
	  };

	  QJ.hasClass = function(el, className) {
	    var e, hasClass, i, len;
	    if (el.length) {
	      hasClass = true;
	      for (i = 0, len = el.length; i < len; i++) {
	        e = el[i];
	        hasClass = hasClass && QJ.hasClass(e, className);
	      }
	      return hasClass;
	    }
	    if (el.classList) {
	      return el.classList.contains(className);
	    } else {
	      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	    }
	  };

	  QJ.removeClass = function(el, className) {
	    var cls, e, i, len, ref, results;
	    if (el.length) {
	      return (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = el.length; i < len; i++) {
	          e = el[i];
	          results.push(QJ.removeClass(e, className));
	        }
	        return results;
	      })();
	    }
	    if (el.classList) {
	      ref = className.split(' ');
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        cls = ref[i];
	        results.push(el.classList.remove(cls));
	      }
	      return results;
	    } else {
	      return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	    }
	  };

	  QJ.toggleClass = function(el, className, bool) {
	    var e;
	    if (el.length) {
	      return (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = el.length; i < len; i++) {
	          e = el[i];
	          results.push(QJ.toggleClass(e, className, bool));
	        }
	        return results;
	      })();
	    }
	    if (bool) {
	      if (!QJ.hasClass(el, className)) {
	        return QJ.addClass(el, className);
	      }
	    } else {
	      return QJ.removeClass(el, className);
	    }
	  };

	  QJ.append = function(el, toAppend) {
	    var e;
	    if (el.length) {
	      return (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = el.length; i < len; i++) {
	          e = el[i];
	          results.push(QJ.append(e, toAppend));
	        }
	        return results;
	      })();
	    }
	    return el.insertAdjacentHTML('beforeend', toAppend);
	  };

	  QJ.find = function(el, selector) {
	    if (el instanceof NodeList || el instanceof Array) {
	      el = el[0];
	    }
	    return el.querySelectorAll(selector);
	  };

	  QJ.trigger = function(el, name, data) {
	    var e, error, ev;
	    try {
	      ev = new CustomEvent(name, {
	        detail: data
	      });
	    } catch (error) {
	      e = error;
	      ev = document.createEvent('CustomEvent');
	      if (ev.initCustomEvent) {
	        ev.initCustomEvent(name, true, true, data);
	      } else {
	        ev.initEvent(name, true, true, data);
	      }
	    }
	    return el.dispatchEvent(ev);
	  };

	  module.exports = QJ;

	}).call(this);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// Generated by CoffeeScript 1.10.0
	(function() {
	  var Payment, QJ, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, formatMonthExpiry, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictCombinedExpiry, restrictExpiry, restrictMonthExpiry, restrictNumeric, restrictYearExpiry, setCardType,
	    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	  QJ = __webpack_require__(5);

	  defaultFormat = /(\d{1,4})/g;

	  cards = [
	    {
	      type: 'amex',
	      pattern: /^3[47]/,
	      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
	      length: [15],
	      cvcLength: [4],
	      luhn: true
	    }, {
	      type: 'dankort',
	      pattern: /^5019/,
	      format: defaultFormat,
	      length: [16],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'hipercard',
	      pattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
	      format: defaultFormat,
	      length: [14, 15, 16, 17, 18, 19],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'dinersclub',
	      pattern: /^(36|38|30[0-5])/,
	      format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
	      length: [14],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'discover',
	      pattern: /^(6011|65|64[4-9]|622)/,
	      format: defaultFormat,
	      length: [16],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'jcb',
	      pattern: /^35/,
	      format: defaultFormat,
	      length: [16],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'laser',
	      pattern: /^(6706|6771|6709)/,
	      format: defaultFormat,
	      length: [16, 17, 18, 19],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'maestro',
	      pattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
	      format: defaultFormat,
	      length: [12, 13, 14, 15, 16, 17, 18, 19],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'mastercard',
	      pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
	      format: defaultFormat,
	      length: [16],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'unionpay',
	      pattern: /^62/,
	      format: defaultFormat,
	      length: [16, 17, 18, 19],
	      cvcLength: [3],
	      luhn: false
	    }, {
	      type: 'visaelectron',
	      pattern: /^4(026|17500|405|508|844|91[37])/,
	      format: defaultFormat,
	      length: [16],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'elo',
	      pattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
	      format: defaultFormat,
	      length: [16],
	      cvcLength: [3],
	      luhn: true
	    }, {
	      type: 'visa',
	      pattern: /^4/,
	      format: defaultFormat,
	      length: [13, 16, 19],
	      cvcLength: [3],
	      luhn: true
	    }
	  ];

	  cardFromNumber = function(num) {
	    var card, j, len;
	    num = (num + '').replace(/\D/g, '');
	    for (j = 0, len = cards.length; j < len; j++) {
	      card = cards[j];
	      if (card.pattern.test(num)) {
	        return card;
	      }
	    }
	  };

	  cardFromType = function(type) {
	    var card, j, len;
	    for (j = 0, len = cards.length; j < len; j++) {
	      card = cards[j];
	      if (card.type === type) {
	        return card;
	      }
	    }
	  };

	  luhnCheck = function(num) {
	    var digit, digits, j, len, odd, sum;
	    odd = true;
	    sum = 0;
	    digits = (num + '').split('').reverse();
	    for (j = 0, len = digits.length; j < len; j++) {
	      digit = digits[j];
	      digit = parseInt(digit, 10);
	      if ((odd = !odd)) {
	        digit *= 2;
	      }
	      if (digit > 9) {
	        digit -= 9;
	      }
	      sum += digit;
	    }
	    return sum % 10 === 0;
	  };

	  hasTextSelected = function(target) {
	    var e, error, ref;
	    try {
	      if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
	        return true;
	      }
	      if ((typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
	        if (document.selection.createRange().text) {
	          return true;
	        }
	      }
	    } catch (error) {
	      e = error;
	    }
	    return false;
	  };

	  reFormatCardNumber = function(e) {
	    return setTimeout((function(_this) {
	      return function() {
	        var target, value;
	        target = e.target;
	        value = QJ.val(target);
	        value = Payment.fns.formatCardNumber(value);
	        QJ.val(target, value);
	        return QJ.trigger(target, 'change');
	      };
	    })(this));
	  };

	  formatCardNumber = function(maxLength) {
	    return function(e) {
	      var card, digit, i, j, len, length, re, target, upperLength, upperLengths, value;
	      digit = String.fromCharCode(e.which);
	      if (!/^\d+$/.test(digit)) {
	        return;
	      }
	      target = e.target;
	      value = QJ.val(target);
	      card = cardFromNumber(value + digit);
	      length = (value.replace(/\D/g, '') + digit).length;
	      upperLengths = [16];
	      if (card) {
	        upperLengths = card.length;
	      }
	      if (maxLength) {
	        upperLengths = upperLengths.filter(function(x) {
	          return x <= maxLength;
	        });
	      }
	      for (i = j = 0, len = upperLengths.length; j < len; i = ++j) {
	        upperLength = upperLengths[i];
	        if (length >= upperLength && upperLengths[i + 1]) {
	          continue;
	        }
	        if (length >= upperLength) {
	          return;
	        }
	      }
	      if (hasTextSelected(target)) {
	        return;
	      }
	      if (card && card.type === 'amex') {
	        re = /^(\d{4}|\d{4}\s\d{6})$/;
	      } else {
	        re = /(?:^|\s)(\d{4})$/;
	      }
	      if (re.test(value)) {
	        e.preventDefault();
	        QJ.val(target, value + ' ' + digit);
	        return QJ.trigger(target, 'change');
	      }
	    };
	  };

	  formatBackCardNumber = function(e) {
	    var target, value;
	    target = e.target;
	    value = QJ.val(target);
	    if (e.meta) {
	      return;
	    }
	    if (e.which !== 8) {
	      return;
	    }
	    if (hasTextSelected(target)) {
	      return;
	    }
	    if (/\d\s$/.test(value)) {
	      e.preventDefault();
	      QJ.val(target, value.replace(/\d\s$/, ''));
	      return QJ.trigger(target, 'change');
	    } else if (/\s\d?$/.test(value)) {
	      e.preventDefault();
	      QJ.val(target, value.replace(/\s\d?$/, ''));
	      return QJ.trigger(target, 'change');
	    }
	  };

	  formatExpiry = function(e) {
	    var digit, target, val;
	    digit = String.fromCharCode(e.which);
	    if (!/^\d+$/.test(digit)) {
	      return;
	    }
	    target = e.target;
	    val = QJ.val(target) + digit;
	    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
	      e.preventDefault();
	      QJ.val(target, "0" + val + " / ");
	      return QJ.trigger(target, 'change');
	    } else if (/^\d\d$/.test(val)) {
	      e.preventDefault();
	      QJ.val(target, val + " / ");
	      return QJ.trigger(target, 'change');
	    }
	  };

	  formatMonthExpiry = function(e) {
	    var digit, target, val;
	    digit = String.fromCharCode(e.which);
	    if (!/^\d+$/.test(digit)) {
	      return;
	    }
	    target = e.target;
	    val = QJ.val(target) + digit;
	    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
	      e.preventDefault();
	      QJ.val(target, "0" + val);
	      return QJ.trigger(target, 'change');
	    } else if (/^\d\d$/.test(val)) {
	      e.preventDefault();
	      QJ.val(target, "" + val);
	      return QJ.trigger(target, 'change');
	    }
	  };

	  formatForwardExpiry = function(e) {
	    var digit, target, val;
	    digit = String.fromCharCode(e.which);
	    if (!/^\d+$/.test(digit)) {
	      return;
	    }
	    target = e.target;
	    val = QJ.val(target);
	    if (/^\d\d$/.test(val)) {
	      QJ.val(target, val + " / ");
	      return QJ.trigger(target, 'change');
	    }
	  };

	  formatForwardSlash = function(e) {
	    var slash, target, val;
	    slash = String.fromCharCode(e.which);
	    if (slash !== '/') {
	      return;
	    }
	    target = e.target;
	    val = QJ.val(target);
	    if (/^\d$/.test(val) && val !== '0') {
	      QJ.val(target, "0" + val + " / ");
	      return QJ.trigger(target, 'change');
	    }
	  };

	  formatBackExpiry = function(e) {
	    var target, value;
	    if (e.metaKey) {
	      return;
	    }
	    target = e.target;
	    value = QJ.val(target);
	    if (e.which !== 8) {
	      return;
	    }
	    if (hasTextSelected(target)) {
	      return;
	    }
	    if (/\d(\s|\/)+$/.test(value)) {
	      e.preventDefault();
	      QJ.val(target, value.replace(/\d(\s|\/)*$/, ''));
	      return QJ.trigger(target, 'change');
	    } else if (/\s\/\s?\d?$/.test(value)) {
	      e.preventDefault();
	      QJ.val(target, value.replace(/\s\/\s?\d?$/, ''));
	      return QJ.trigger(target, 'change');
	    }
	  };

	  restrictNumeric = function(e) {
	    var input;
	    if (e.metaKey || e.ctrlKey) {
	      return true;
	    }
	    if (e.which === 32) {
	      return e.preventDefault();
	    }
	    if (e.which === 0) {
	      return true;
	    }
	    if (e.which < 33) {
	      return true;
	    }
	    input = String.fromCharCode(e.which);
	    if (!/[\d\s]/.test(input)) {
	      return e.preventDefault();
	    }
	  };

	  restrictCardNumber = function(maxLength) {
	    return function(e) {
	      var card, digit, length, target, value;
	      target = e.target;
	      digit = String.fromCharCode(e.which);
	      if (!/^\d+$/.test(digit)) {
	        return;
	      }
	      if (hasTextSelected(target)) {
	        return;
	      }
	      value = (QJ.val(target) + digit).replace(/\D/g, '');
	      card = cardFromNumber(value);
	      length = 16;
	      if (card) {
	        length = card.length[card.length.length - 1];
	      }
	      if (maxLength) {
	        length = Math.min(length, maxLength);
	      }
	      if (!(value.length <= length)) {
	        return e.preventDefault();
	      }
	    };
	  };

	  restrictExpiry = function(e, length) {
	    var digit, target, value;
	    target = e.target;
	    digit = String.fromCharCode(e.which);
	    if (!/^\d+$/.test(digit)) {
	      return;
	    }
	    if (hasTextSelected(target)) {
	      return;
	    }
	    value = QJ.val(target) + digit;
	    value = value.replace(/\D/g, '');
	    if (value.length > length) {
	      return e.preventDefault();
	    }
	  };

	  restrictCombinedExpiry = function(e) {
	    return restrictExpiry(e, 6);
	  };

	  restrictMonthExpiry = function(e) {
	    return restrictExpiry(e, 2);
	  };

	  restrictYearExpiry = function(e) {
	    return restrictExpiry(e, 4);
	  };

	  restrictCVC = function(e) {
	    var digit, target, val;
	    target = e.target;
	    digit = String.fromCharCode(e.which);
	    if (!/^\d+$/.test(digit)) {
	      return;
	    }
	    if (hasTextSelected(target)) {
	      return;
	    }
	    val = QJ.val(target) + digit;
	    if (!(val.length <= 4)) {
	      return e.preventDefault();
	    }
	  };

	  setCardType = function(e) {
	    var allTypes, card, cardType, target, val;
	    target = e.target;
	    val = QJ.val(target);
	    cardType = Payment.fns.cardType(val) || 'unknown';
	    if (!QJ.hasClass(target, cardType)) {
	      allTypes = (function() {
	        var j, len, results;
	        results = [];
	        for (j = 0, len = cards.length; j < len; j++) {
	          card = cards[j];
	          results.push(card.type);
	        }
	        return results;
	      })();
	      QJ.removeClass(target, 'unknown');
	      QJ.removeClass(target, allTypes.join(' '));
	      QJ.addClass(target, cardType);
	      QJ.toggleClass(target, 'identified', cardType !== 'unknown');
	      return QJ.trigger(target, 'payment.cardType', cardType);
	    }
	  };

	  Payment = (function() {
	    function Payment() {}

	    Payment.fns = {
	      cardExpiryVal: function(value) {
	        var month, prefix, ref, year;
	        value = value.replace(/\s/g, '');
	        ref = value.split('/', 2), month = ref[0], year = ref[1];
	        if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
	          prefix = (new Date).getFullYear();
	          prefix = prefix.toString().slice(0, 2);
	          year = prefix + year;
	        }
	        month = parseInt(month, 10);
	        year = parseInt(year, 10);
	        return {
	          month: month,
	          year: year
	        };
	      },
	      validateCardNumber: function(num) {
	        var card, ref;
	        num = (num + '').replace(/\s+|-/g, '');
	        if (!/^\d+$/.test(num)) {
	          return false;
	        }
	        card = cardFromNumber(num);
	        if (!card) {
	          return false;
	        }
	        return (ref = num.length, indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(num));
	      },
	      validateCardExpiry: function(month, year) {
	        var currentTime, expiry, prefix, ref, ref1;
	        if (typeof month === 'object' && 'month' in month) {
	          ref = month, month = ref.month, year = ref.year;
	        } else if (typeof month === 'string' && indexOf.call(month, '/') >= 0) {
	          ref1 = Payment.fns.cardExpiryVal(month), month = ref1.month, year = ref1.year;
	        }
	        if (!(month && year)) {
	          return false;
	        }
	        month = QJ.trim(month);
	        year = QJ.trim(year);
	        if (!/^\d+$/.test(month)) {
	          return false;
	        }
	        if (!/^\d+$/.test(year)) {
	          return false;
	        }
	        month = parseInt(month, 10);
	        if (!(month && month <= 12)) {
	          return false;
	        }
	        if (year.length === 2) {
	          prefix = (new Date).getFullYear();
	          prefix = prefix.toString().slice(0, 2);
	          year = prefix + year;
	        }
	        expiry = new Date(year, month);
	        currentTime = new Date;
	        expiry.setMonth(expiry.getMonth() - 1);
	        expiry.setMonth(expiry.getMonth() + 1, 1);
	        return expiry > currentTime;
	      },
	      validateCardCVC: function(cvc, type) {
	        var ref, ref1;
	        cvc = QJ.trim(cvc);
	        if (!/^\d+$/.test(cvc)) {
	          return false;
	        }
	        if (type && cardFromType(type)) {
	          return ref = cvc.length, indexOf.call((ref1 = cardFromType(type)) != null ? ref1.cvcLength : void 0, ref) >= 0;
	        } else {
	          return cvc.length >= 3 && cvc.length <= 4;
	        }
	      },
	      cardType: function(num) {
	        var ref;
	        if (!num) {
	          return null;
	        }
	        return ((ref = cardFromNumber(num)) != null ? ref.type : void 0) || null;
	      },
	      formatCardNumber: function(num) {
	        var card, groups, ref, upperLength;
	        card = cardFromNumber(num);
	        if (!card) {
	          return num;
	        }
	        upperLength = card.length[card.length.length - 1];
	        num = num.replace(/\D/g, '');
	        num = num.slice(0, upperLength);
	        if (card.format.global) {
	          return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
	        } else {
	          groups = card.format.exec(num);
	          if (groups == null) {
	            return;
	          }
	          groups.shift();
	          groups = groups.filter(function(n) {
	            return n;
	          });
	          return groups.join(' ');
	        }
	      }
	    };

	    Payment.restrictNumeric = function(el) {
	      return QJ.on(el, 'keypress', restrictNumeric);
	    };

	    Payment.cardExpiryVal = function(el) {
	      return Payment.fns.cardExpiryVal(QJ.val(el));
	    };

	    Payment.formatCardCVC = function(el) {
	      Payment.restrictNumeric(el);
	      QJ.on(el, 'keypress', restrictCVC);
	      return el;
	    };

	    Payment.formatCardExpiry = function(el) {
	      var month, year;
	      Payment.restrictNumeric(el);
	      if (el.length && el.length === 2) {
	        month = el[0], year = el[1];
	        this.formatCardExpiryMultiple(month, year);
	      } else {
	        QJ.on(el, 'keypress', restrictCombinedExpiry);
	        QJ.on(el, 'keypress', formatExpiry);
	        QJ.on(el, 'keypress', formatForwardSlash);
	        QJ.on(el, 'keypress', formatForwardExpiry);
	        QJ.on(el, 'keydown', formatBackExpiry);
	      }
	      return el;
	    };

	    Payment.formatCardExpiryMultiple = function(month, year) {
	      QJ.on(month, 'keypress', restrictMonthExpiry);
	      QJ.on(month, 'keypress', formatMonthExpiry);
	      return QJ.on(year, 'keypress', restrictYearExpiry);
	    };

	    Payment.formatCardNumber = function(el, maxLength) {
	      Payment.restrictNumeric(el);
	      QJ.on(el, 'keypress', restrictCardNumber(maxLength));
	      QJ.on(el, 'keypress', formatCardNumber(maxLength));
	      QJ.on(el, 'keydown', formatBackCardNumber);
	      QJ.on(el, 'keyup blur', setCardType);
	      QJ.on(el, 'paste', reFormatCardNumber);
	      QJ.on(el, 'input', reFormatCardNumber);
	      return el;
	    };

	    Payment.getCardArray = function() {
	      return cards;
	    };

	    Payment.setCardArray = function(cardArray) {
	      cards = cardArray;
	      return true;
	    };

	    Payment.addToCardArray = function(cardObject) {
	      return cards.push(cardObject);
	    };

	    Payment.removeFromCardArray = function(type) {
	      var key, value;
	      for (key in cards) {
	        value = cards[key];
	        if (value.type === type) {
	          cards.splice(key, 1);
	        }
	      }
	      return true;
	    };

	    return Payment;

	  })();

	  module.exports = Payment;

	  global.Payment = Payment;

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*!
	 * node.extend
	 * Copyright 2011, John Resig
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * @fileoverview
	 * Port of jQuery.extend that actually works on node.js
	 */
	var is = __webpack_require__(9);
	var has = __webpack_require__(10);

	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;

	// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
	var setProperty = function setP(target, name, value) {
	  if (defineProperty && name === '__proto__') {
	    defineProperty(target, name, {
	      enumerable: true,
	      configurable: true,
	      value: value,
	      writable: true
	    });
	  } else {
	    target[name] = value;
	  }
	};

	// Return undefined instead of __proto__ if '__proto__' is not an own property
	var getProperty = function getP(obj, name) {
	  if (name === '__proto__') {
	    if (!has(obj, name)) {
	      return void 0;
	    } else if (gOPD) {
	      // In early versions of node, obj['__proto__'] is buggy when obj has
	      // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
	      return gOPD(obj, name).value;
	    }
	  }

	  return obj[name];
	};

	// eslint-disable-next-line func-style
	function extend() {
	  var target = arguments[0] || {};
	  var i = 1;
	  var length = arguments.length;
	  var deep = false;
	  var options, name, src, copy, copyIsArray, clone;

	  // Handle a deep copy situation
	  if (typeof target === 'boolean') {
	    deep = target;
	    target = arguments[1] || {};
	    // skip the boolean and the target
	    i = 2;
	  }

	  // Handle case when target is a string or something (possible in deep copy)
	  if (typeof target !== 'object' && !is.fn(target)) {
	    target = {};
	  }

	  for (; i < length; i++) {
	    // Only deal with non-null/undefined values
	    options = arguments[i];
	    if (options != null) {
	      if (typeof options === 'string') {
	        options = options.split('');
	      }
	      // Extend the base object
	      for (name in options) {
	        src = getProperty(target, name);
	        copy = getProperty(options, name);

	        // Prevent never-ending loop
	        if (target === copy) {
	          continue;
	        }

	        // Recurse if we're merging plain objects or arrays
	        if (deep && copy && (is.hash(copy) || (copyIsArray = is.array(copy)))) {
	          if (copyIsArray) {
	            copyIsArray = false;
	            clone = src && is.array(src) ? src : [];
	          } else {
	            clone = src && is.hash(src) ? src : {};
	          }

	          // Never move original objects, clone them
	          setProperty(target, name, extend(deep, clone, copy));

	        // Don't bring in undefined values
	        } else if (typeof copy !== 'undefined') {
	          setProperty(target, name, copy);
	        }
	      }
	    }
	  }

	  // Return the modified object
	  return target;
	}

	/**
	 * @public
	 */
	extend.version = '1.1.7';

	/**
	 * Exports module.
	 */
	module.exports = extend;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/* globals window, HTMLElement */

	'use strict';

	/**!
	 * is
	 * the definitive JavaScript type testing library
	 *
	 * @copyright 2013-2014 Enrico Marino / Jordan Harband
	 * @license MIT
	 */

	var objProto = Object.prototype;
	var owns = objProto.hasOwnProperty;
	var toStr = objProto.toString;
	var symbolValueOf;
	if (typeof Symbol === 'function') {
	  symbolValueOf = Symbol.prototype.valueOf;
	}
	var bigIntValueOf;
	if (typeof BigInt === 'function') {
	  bigIntValueOf = BigInt.prototype.valueOf;
	}
	var isActualNaN = function (value) {
	  return value !== value;
	};
	var NON_HOST_TYPES = {
	  'boolean': 1,
	  number: 1,
	  string: 1,
	  undefined: 1
	};

	var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
	var hexRegex = /^[A-Fa-f0-9]+$/;

	/**
	 * Expose `is`
	 */

	var is = {};

	/**
	 * Test general.
	 */

	/**
	 * is.type
	 * Test if `value` is a type of `type`.
	 *
	 * @param {*} value value to test
	 * @param {String} type type
	 * @return {Boolean} true if `value` is a type of `type`, false otherwise
	 * @api public
	 */

	is.a = is.type = function (value, type) {
	  return typeof value === type;
	};

	/**
	 * is.defined
	 * Test if `value` is defined.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if 'value' is defined, false otherwise
	 * @api public
	 */

	is.defined = function (value) {
	  return typeof value !== 'undefined';
	};

	/**
	 * is.empty
	 * Test if `value` is empty.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is empty, false otherwise
	 * @api public
	 */

	is.empty = function (value) {
	  var type = toStr.call(value);
	  var key;

	  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
	    return value.length === 0;
	  }

	  if (type === '[object Object]') {
	    for (key in value) {
	      if (owns.call(value, key)) {
	        return false;
	      }
	    }
	    return true;
	  }

	  return !value;
	};

	/**
	 * is.equal
	 * Test if `value` is equal to `other`.
	 *
	 * @param {*} value value to test
	 * @param {*} other value to compare with
	 * @return {Boolean} true if `value` is equal to `other`, false otherwise
	 */

	is.equal = function equal(value, other) {
	  if (value === other) {
	    return true;
	  }

	  var type = toStr.call(value);
	  var key;

	  if (type !== toStr.call(other)) {
	    return false;
	  }

	  if (type === '[object Object]') {
	    for (key in value) {
	      if (!is.equal(value[key], other[key]) || !(key in other)) {
	        return false;
	      }
	    }
	    for (key in other) {
	      if (!is.equal(value[key], other[key]) || !(key in value)) {
	        return false;
	      }
	    }
	    return true;
	  }

	  if (type === '[object Array]') {
	    key = value.length;
	    if (key !== other.length) {
	      return false;
	    }
	    while (key--) {
	      if (!is.equal(value[key], other[key])) {
	        return false;
	      }
	    }
	    return true;
	  }

	  if (type === '[object Function]') {
	    return value.prototype === other.prototype;
	  }

	  if (type === '[object Date]') {
	    return value.getTime() === other.getTime();
	  }

	  return false;
	};

	/**
	 * is.hosted
	 * Test if `value` is hosted by `host`.
	 *
	 * @param {*} value to test
	 * @param {*} host host to test with
	 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
	 * @api public
	 */

	is.hosted = function (value, host) {
	  var type = typeof host[value];
	  return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
	};

	/**
	 * is.instance
	 * Test if `value` is an instance of `constructor`.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an instance of `constructor`
	 * @api public
	 */

	is.instance = is['instanceof'] = function (value, constructor) {
	  return value instanceof constructor;
	};

	/**
	 * is.nil / is.null
	 * Test if `value` is null.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is null, false otherwise
	 * @api public
	 */

	is.nil = is['null'] = function (value) {
	  return value === null;
	};

	/**
	 * is.undef / is.undefined
	 * Test if `value` is undefined.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is undefined, false otherwise
	 * @api public
	 */

	is.undef = is.undefined = function (value) {
	  return typeof value === 'undefined';
	};

	/**
	 * Test arguments.
	 */

	/**
	 * is.args
	 * Test if `value` is an arguments object.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an arguments object, false otherwise
	 * @api public
	 */

	is.args = is.arguments = function (value) {
	  var isStandardArguments = toStr.call(value) === '[object Arguments]';
	  var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
	  return isStandardArguments || isOldArguments;
	};

	/**
	 * Test array.
	 */

	/**
	 * is.array
	 * Test if 'value' is an array.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an array, false otherwise
	 * @api public
	 */

	is.array = Array.isArray || function (value) {
	  return toStr.call(value) === '[object Array]';
	};

	/**
	 * is.arguments.empty
	 * Test if `value` is an empty arguments object.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
	 * @api public
	 */
	is.args.empty = function (value) {
	  return is.args(value) && value.length === 0;
	};

	/**
	 * is.array.empty
	 * Test if `value` is an empty array.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an empty array, false otherwise
	 * @api public
	 */
	is.array.empty = function (value) {
	  return is.array(value) && value.length === 0;
	};

	/**
	 * is.arraylike
	 * Test if `value` is an arraylike object.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an arguments object, false otherwise
	 * @api public
	 */

	is.arraylike = function (value) {
	  return !!value && !is.bool(value)
	    && owns.call(value, 'length')
	    && isFinite(value.length)
	    && is.number(value.length)
	    && value.length >= 0;
	};

	/**
	 * Test boolean.
	 */

	/**
	 * is.bool
	 * Test if `value` is a boolean.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a boolean, false otherwise
	 * @api public
	 */

	is.bool = is['boolean'] = function (value) {
	  return toStr.call(value) === '[object Boolean]';
	};

	/**
	 * is.false
	 * Test if `value` is false.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is false, false otherwise
	 * @api public
	 */

	is['false'] = function (value) {
	  return is.bool(value) && Boolean(Number(value)) === false;
	};

	/**
	 * is.true
	 * Test if `value` is true.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is true, false otherwise
	 * @api public
	 */

	is['true'] = function (value) {
	  return is.bool(value) && Boolean(Number(value)) === true;
	};

	/**
	 * Test date.
	 */

	/**
	 * is.date
	 * Test if `value` is a date.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a date, false otherwise
	 * @api public
	 */

	is.date = function (value) {
	  return toStr.call(value) === '[object Date]';
	};

	/**
	 * is.date.valid
	 * Test if `value` is a valid date.
	 *
	 * @param {*} value value to test
	 * @returns {Boolean} true if `value` is a valid date, false otherwise
	 */
	is.date.valid = function (value) {
	  return is.date(value) && !isNaN(Number(value));
	};

	/**
	 * Test element.
	 */

	/**
	 * is.element
	 * Test if `value` is an html element.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an HTML Element, false otherwise
	 * @api public
	 */

	is.element = function (value) {
	  return value !== undefined
	    && typeof HTMLElement !== 'undefined'
	    && value instanceof HTMLElement
	    && value.nodeType === 1;
	};

	/**
	 * Test error.
	 */

	/**
	 * is.error
	 * Test if `value` is an error object.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an error object, false otherwise
	 * @api public
	 */

	is.error = function (value) {
	  return toStr.call(value) === '[object Error]';
	};

	/**
	 * Test function.
	 */

	/**
	 * is.fn / is.function (deprecated)
	 * Test if `value` is a function.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a function, false otherwise
	 * @api public
	 */

	is.fn = is['function'] = function (value) {
	  var isAlert = typeof window !== 'undefined' && value === window.alert;
	  if (isAlert) {
	    return true;
	  }
	  var str = toStr.call(value);
	  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
	};

	/**
	 * Test number.
	 */

	/**
	 * is.number
	 * Test if `value` is a number.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a number, false otherwise
	 * @api public
	 */

	is.number = function (value) {
	  return toStr.call(value) === '[object Number]';
	};

	/**
	 * is.infinite
	 * Test if `value` is positive or negative infinity.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
	 * @api public
	 */
	is.infinite = function (value) {
	  return value === Infinity || value === -Infinity;
	};

	/**
	 * is.decimal
	 * Test if `value` is a decimal number.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a decimal number, false otherwise
	 * @api public
	 */

	is.decimal = function (value) {
	  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
	};

	/**
	 * is.divisibleBy
	 * Test if `value` is divisible by `n`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} n dividend
	 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
	 * @api public
	 */

	is.divisibleBy = function (value, n) {
	  var isDividendInfinite = is.infinite(value);
	  var isDivisorInfinite = is.infinite(n);
	  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
	  return isDividendInfinite || isDivisorInfinite || (isNonZeroNumber && value % n === 0);
	};

	/**
	 * is.integer
	 * Test if `value` is an integer.
	 *
	 * @param value to test
	 * @return {Boolean} true if `value` is an integer, false otherwise
	 * @api public
	 */

	is.integer = is['int'] = function (value) {
	  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
	};

	/**
	 * is.maximum
	 * Test if `value` is greater than 'others' values.
	 *
	 * @param {Number} value value to test
	 * @param {Array} others values to compare with
	 * @return {Boolean} true if `value` is greater than `others` values
	 * @api public
	 */

	is.maximum = function (value, others) {
	  if (isActualNaN(value)) {
	    throw new TypeError('NaN is not a valid value');
	  } else if (!is.arraylike(others)) {
	    throw new TypeError('second argument must be array-like');
	  }
	  var len = others.length;

	  while (--len >= 0) {
	    if (value < others[len]) {
	      return false;
	    }
	  }

	  return true;
	};

	/**
	 * is.minimum
	 * Test if `value` is less than `others` values.
	 *
	 * @param {Number} value value to test
	 * @param {Array} others values to compare with
	 * @return {Boolean} true if `value` is less than `others` values
	 * @api public
	 */

	is.minimum = function (value, others) {
	  if (isActualNaN(value)) {
	    throw new TypeError('NaN is not a valid value');
	  } else if (!is.arraylike(others)) {
	    throw new TypeError('second argument must be array-like');
	  }
	  var len = others.length;

	  while (--len >= 0) {
	    if (value > others[len]) {
	      return false;
	    }
	  }

	  return true;
	};

	/**
	 * is.nan
	 * Test if `value` is not a number.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is not a number, false otherwise
	 * @api public
	 */

	is.nan = function (value) {
	  return !is.number(value) || value !== value;
	};

	/**
	 * is.even
	 * Test if `value` is an even number.
	 *
	 * @param {Number} value value to test
	 * @return {Boolean} true if `value` is an even number, false otherwise
	 * @api public
	 */

	is.even = function (value) {
	  return is.infinite(value) || (is.number(value) && value === value && value % 2 === 0);
	};

	/**
	 * is.odd
	 * Test if `value` is an odd number.
	 *
	 * @param {Number} value value to test
	 * @return {Boolean} true if `value` is an odd number, false otherwise
	 * @api public
	 */

	is.odd = function (value) {
	  return is.infinite(value) || (is.number(value) && value === value && value % 2 !== 0);
	};

	/**
	 * is.ge
	 * Test if `value` is greater than or equal to `other`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} other value to compare with
	 * @return {Boolean}
	 * @api public
	 */

	is.ge = function (value, other) {
	  if (isActualNaN(value) || isActualNaN(other)) {
	    throw new TypeError('NaN is not a valid value');
	  }
	  return !is.infinite(value) && !is.infinite(other) && value >= other;
	};

	/**
	 * is.gt
	 * Test if `value` is greater than `other`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} other value to compare with
	 * @return {Boolean}
	 * @api public
	 */

	is.gt = function (value, other) {
	  if (isActualNaN(value) || isActualNaN(other)) {
	    throw new TypeError('NaN is not a valid value');
	  }
	  return !is.infinite(value) && !is.infinite(other) && value > other;
	};

	/**
	 * is.le
	 * Test if `value` is less than or equal to `other`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} other value to compare with
	 * @return {Boolean} if 'value' is less than or equal to 'other'
	 * @api public
	 */

	is.le = function (value, other) {
	  if (isActualNaN(value) || isActualNaN(other)) {
	    throw new TypeError('NaN is not a valid value');
	  }
	  return !is.infinite(value) && !is.infinite(other) && value <= other;
	};

	/**
	 * is.lt
	 * Test if `value` is less than `other`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} other value to compare with
	 * @return {Boolean} if `value` is less than `other`
	 * @api public
	 */

	is.lt = function (value, other) {
	  if (isActualNaN(value) || isActualNaN(other)) {
	    throw new TypeError('NaN is not a valid value');
	  }
	  return !is.infinite(value) && !is.infinite(other) && value < other;
	};

	/**
	 * is.within
	 * Test if `value` is within `start` and `finish`.
	 *
	 * @param {Number} value value to test
	 * @param {Number} start lower bound
	 * @param {Number} finish upper bound
	 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
	 * @api public
	 */
	is.within = function (value, start, finish) {
	  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
	    throw new TypeError('NaN is not a valid value');
	  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
	    throw new TypeError('all arguments must be numbers');
	  }
	  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
	  return isAnyInfinite || (value >= start && value <= finish);
	};

	/**
	 * Test object.
	 */

	/**
	 * is.object
	 * Test if `value` is an object.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is an object, false otherwise
	 * @api public
	 */
	is.object = function (value) {
	  return toStr.call(value) === '[object Object]';
	};

	/**
	 * is.primitive
	 * Test if `value` is a primitive.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a primitive, false otherwise
	 * @api public
	 */
	is.primitive = function isPrimitive(value) {
	  if (!value) {
	    return true;
	  }
	  if (typeof value === 'object' || is.object(value) || is.fn(value) || is.array(value)) {
	    return false;
	  }
	  return true;
	};

	/**
	 * is.hash
	 * Test if `value` is a hash - a plain object literal.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a hash, false otherwise
	 * @api public
	 */

	is.hash = function (value) {
	  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
	};

	/**
	 * Test regexp.
	 */

	/**
	 * is.regexp
	 * Test if `value` is a regular expression.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a regexp, false otherwise
	 * @api public
	 */

	is.regexp = function (value) {
	  return toStr.call(value) === '[object RegExp]';
	};

	/**
	 * Test string.
	 */

	/**
	 * is.string
	 * Test if `value` is a string.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if 'value' is a string, false otherwise
	 * @api public
	 */

	is.string = function (value) {
	  return toStr.call(value) === '[object String]';
	};

	/**
	 * Test base64 string.
	 */

	/**
	 * is.base64
	 * Test if `value` is a valid base64 encoded string.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
	 * @api public
	 */

	is.base64 = function (value) {
	  return is.string(value) && (!value.length || base64Regex.test(value));
	};

	/**
	 * Test base64 string.
	 */

	/**
	 * is.hex
	 * Test if `value` is a valid hex encoded string.
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
	 * @api public
	 */

	is.hex = function (value) {
	  return is.string(value) && (!value.length || hexRegex.test(value));
	};

	/**
	 * is.symbol
	 * Test if `value` is an ES6 Symbol
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a Symbol, false otherise
	 * @api public
	 */

	is.symbol = function (value) {
	  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
	};

	/**
	 * is.bigint
	 * Test if `value` is an ES-proposed BigInt
	 *
	 * @param {*} value value to test
	 * @return {Boolean} true if `value` is a BigInt, false otherise
	 * @api public
	 */

	is.bigint = function (value) {
	  // eslint-disable-next-line valid-typeof
	  return typeof BigInt === 'function' && toStr.call(value) === '[object BigInt]' && typeof bigIntValueOf.call(value) === 'bigint';
	};

	module.exports = is;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(11);

	module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var implementation = __webpack_require__(12);

	module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// 解压拼音库。
	// @param {Object} dict_combo, 压缩的拼音库。
	// @param {Object} 解压的拼音库。
	function buildPinyinCache(dict_combo){
	  let hans;
	  let uncomboed = {};

	  for(let py in dict_combo){
	    hans = dict_combo[py];
	    for(let i = 0, han, l = hans.length; i < l; i++){
	      han = hans.charCodeAt(i);
	      if(!uncomboed.hasOwnProperty(han)){
	        uncomboed[han] = py;
	      }else{
	        uncomboed[han] += "," + py;
	      }
	    }
	  }

	  return uncomboed;
	}

	const PINYIN_DICT = buildPinyinCache(__webpack_require__(14));
	const Pinyin = __webpack_require__(15);
	const pinyin = new Pinyin(PINYIN_DICT);

	module.exports = pinyin.convert.bind(pinyin);
	module.exports.compare = pinyin.compare.bind(pinyin);
	module.exports.STYLE_NORMAL = Pinyin.STYLE_NORMAL;
	module.exports.STYLE_TONE = Pinyin.STYLE_TONE;
	module.exports.STYLE_TONE2 = Pinyin.STYLE_TONE2;
	module.exports.STYLE_TO3NE = Pinyin.STYLE_TO3NE;
	module.exports.STYLE_INITIALS = Pinyin.STYLE_INITIALS;
	module.exports.STYLE_FIRST_LETTER = Pinyin.STYLE_FIRST_LETTER;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = {
	"a":"",
	"ā":"吖锕錒",
	"á":"嗄",
	"ǎ":"",
	"à":"",
	"āi":"哎哀埃娭溾嗳銰锿噯諰鎄",
	"ái":"啀娾捱皑凒隑嵦溰嘊敱敳皚磑癌",
	"ǎi":"毐昹娾欸絠嗳矮蔼躷噯濭藹譪霭靄",
	"ài":"艾伌欬爱砹硋堨焥隘嗌嗳塧嫒愛碍叆暧瑷僾噯壒嬡懓薆鴱懝曖璦賹餲皧瞹馤礙譺鑀鱫靉",
	"ān":"安侒峖桉氨偣庵菴谙啽媕萻葊痷腤裺鹌蓭誝鞍鞌盦諳馣鮟盫鵪韽鶕",
	"án":"玵啽雸儑",
	"ǎn":"垵俺唵埯铵揞晻罯銨",
	"àn":"厈屵屽犴岸咹按洝荌案胺豻堓隌晻暗貋儑錌闇黯",
	"āng":"肮骯",
	"áng":"卬岇昂昻",
	"ǎng":"",
	"àng":"枊盎醠",
	"āo":"泑柪眑梎軪熝爊",
	"áo":"敖厫隞嗷嗸嶅廒慠滶獓蔜遨骜摮獒璈磝墽翱聱螯翶謷謸翺鳌鏕鏖鰲鷔鼇",
	"ǎo":"艹抝芺袄眑郩镺媪媼襖",
	"ào":"岙扷抝坳垇岰柪傲奡軪奧嫯嶅慠澚隩墺嶴懊擙澳鏊驁",
	"ba":"罷",
	"bā":"丷八仈巴叭朳玐夿岜扷芭峇柭疤哱哵捌笆粑羓蚆釟豝鲃魞",
	"bá":"叐犮抜妭拔茇炦癹胈菝詙跋軷颰魃鼥",
	"bǎ":"钯鈀靶",
	"bà":"坝弝爸皅垻跁鲃魞鲅鲌罷鮁鮊覇矲霸壩灞欛",
	"bāi":"挀掰擘",
	"bái":"白",
	"bǎi":"百佰栢瓸捭竡粨絔摆擺襬",
	"bài":"呗庍拝败拜唄敗猈稗粺薭贁韛",
	"bān":"扳攽朌肦班般颁斑搬斒頒搫瘢鳻螌褩癍辬",
	"bǎn":"阪坂岅昄板版瓪钣粄舨鈑蝂魬闆",
	"bàn":"办半伴扮坢姅怑绊柈秚湴絆跘鉡靽辦瓣",
	"bāng":"邦垹帮捠梆浜邫幇幚縍幫鞤",
	"bǎng":"绑綁牓膀髈",
	"bàng":"玤挷蚄傍棒棓硥谤塝搒稖蒡蛖蜯镑縍艕謗鎊",
	"bāo":"勹包佨孢苞枹胞剝笣煲龅裦蕔褒襃闁齙",
	"báo":"窇雹",
	"bǎo":"宝怉饱保鸨宲珤堢媬葆寚飹飽褓駂鳵緥鴇賲藵寳寶靌",
	"bào":"勽犳报怉抱豹趵铇菢蚫袌報鉋鲍骲髱虣鮑儤曓嚗曝爆犦忁鑤",
	"bei":"呗唄",
	"bēi":"陂卑杯柸盃庳桮悲揹棓椑碑鹎箄諀鞞藣鵯",
	"běi":"鉳",
	"bèi":"贝孛狈貝邶备昁杮牬苝郥钡俻倍悖狽偝偹梖珼鄁備僃惫棑棓焙琲軰辈愂碚禙蓓蛽犕褙誖鞁骳輩鋇憊糒鞴鐾",
	"bēn":"泍贲栟喯犇賁锛漰錛蟦",
	"běn":"夲本苯奙畚翉楍",
	"bèn":"坋坌泍炃倴捹桳渀笨逩撪",
	"bēng":"伻祊奟崩絣閍嗙嵭痭嘣綳繃",
	"béng":"甮甭",
	"běng":"埄埲菶琣琫綳繃鞛",
	"bèng":"泵迸堋逬揼跰塴綳甏镚繃蹦鏰",
	"bī":"皀屄偪毴逼楅榌豍螕鵖鲾鎞鰏",
	"bí":"荸鼻嬶",
	"bǐ":"匕比夶朼佊吡妣沘疕纰彼毞肶柀秕俾娝笔粃紕舭啚崥筆鄙聛貏",
	"bì":"币必毕闬闭佖坒庇芘诐邲咇妼怭怶畁畀肶苾哔柲毖珌畐疪祕胇荜贲陛毙狴畢笓粊袐铋婢敝旇梐紴翍萆萞閇閈閉堛弼弻愊愎湢皕禆筚詖貱賁赑嗶彃滗滭煏痺痹睤睥腷蓖蓽蜌裨跸鉍閟飶幣弊熚獙碧稫箅箆綼蔽鄪馝幤潷獘罼襅駜髲壁嬖廦篦篳縪薜觱避鮅斃濞蹕鞞髀奰璧鄨鎞鏎饆繴襣襞鞸韠魓躃躄驆鶝朇贔鐴鷝鷩鼊",
	"biān":"辺边炞砭笾猵编萹煸牑甂箯糄編臱蝙鞕獱邉鍽鳊邊鞭鯾鯿籓籩",
	"biǎn":"贬疺窆匾貶惼揙碥稨褊糄鴘藊覵鶣",
	"biàn":"卞弁忭抃汳汴苄釆变峅玣変昪覍徧缏遍閞辡緶艑諚辧辨辩辫辮辯變",
	"biāo":"灬杓标飑骉髟彪淲猋脿颩僄墂幖摽滮蔈颮骠標熛膔膘麃瘭磦镖飚飙儦檦篻颷瀌藨謤爂臕贆鏢穮镳飈飆飊飇鑣驫",
	"biáo":"嫑",
	"biǎo":"表婊裱諘褾錶檦",
	"biào":"俵摽鳔",
	"biē":"柭憋蟞癟鳖鱉鼈虌龞",
	"bié":"別柲莂蛂徶襒蟞蹩",
	"biě":"癟",
	"biè":"別彆",
	"bīn":"汃邠玢砏宾彬梹傧斌椕滨缤槟瑸豩賓賔镔儐濒頻濱濵虨豳檳璸瀕霦繽鑌顮",
	"bǐn":"",
	"bìn":"摈殡膑髩儐擯鬂殯臏髌鬓髕鬢",
	"bīng":"冫仌仒氷冰兵幷栟掤梹蛃絣槟鋲檳",
	"bǐng":"丙邴陃怲抦秉苪昞昺柄炳饼眪偋屛寎棅琕禀稟鈵鉼鞆餅餠鞞鞸",
	"bìng":"並併幷枋垪庰倂栤病窉竝偋傡寎摒誁鮩靐",
	"bo":"啵蔔噃",
	"bō":"癶拨波癷玻剝哱盋砵趵钵饽紴缽菠袰溊碆鉢僠嶓撥播餑磻礡蹳皪驋鱍",
	"bó":"仢彴肑驳帛狛瓝苩侼柭胉郣亳挬浡瓟秡袯钹铂桲淿脖舶萡袹博殕渤葧鹁愽搏猼鉑鈸馎鲌僰榑煿牔箔膊艊誖馛駁踣鋍镈壆馞駮鮊穛襏謈嚗懪簙鎛餺鵓糪髆髉欂襮礴鑮",
	"bǒ":"癷蚾跛",
	"bò":"孹擗擘檗檘譒蘗",
	"bū":"峬庯逋钸晡鈽誧餔錻鯆鵏",
	"bú":"鳪轐醭",
	"bǔ":"卟补哺捕捬補鸔",
	"bù":"布佈吥步咘怖抪歩歨柨钚勏埔埗悑捗荹部埠婄瓿鈈廍蔀箁踄郶篰餢",
	"cā":"嚓擦攃",
	"cǎ":"礤礸",
	"cà":"遪囃",
	"cāi":"偲猜",
	"cái":"才扐材财財裁纔",
	"cǎi":"毝倸啋埰婇寀彩採棌睬跴綵踩",
	"cài":"埰寀菜蔡縩",
	"cān":"參叄飡骖叅喰湌傪嬠餐爘驂囋",
	"cán":"残蚕惭殘慚摲蝅慙蠺蠶",
	"cǎn":"惨朁慘憯穇篸黪黲",
	"càn":"灿孱傪粲嘇摻儏澯薒燦璨謲鏒",
	"cāng":"仓仺伧沧苍玱鸧倉舱傖凔嵢滄獊蒼瑲濸篬艙螥鶬",
	"cáng":"匨臧欌鑶",
	"càng":"賶",
	"cāo":"撡操糙",
	"cáo":"曺曹傮嘈嶆慒漕蓸槽褿艚螬鏪",
	"cǎo":"屮艸草愺慅懆騲",
	"cào":"肏鄵襙鼜",
	"cè":"夨冊册厕恻拺测荝敇畟側厠笧粣萗廁惻測策萴筞筴蓛箣憡簎",
	"cēn":"參叄叅嵾穇篸",
	"cén":"岑汵埁涔笒",
	"cēng":"噌",
	"céng":"层曽層嶒橧竲驓",
	"cèng":"蹭",
	"cī":"呰呲玼疵趀偨跐縒骴髊蠀齹",
	"cí":"词珁兹垐柌祠茨瓷粢詞辝慈甆辞磁雌鹚糍辤飺餈嬨濨薋鴜礠辭鷀鶿",
	"cǐ":"此佌泚玼皉啙跐鮆",
	"cì":"朿次佽刾庛茦栨莿絘蛓赐螆賜",
	"cōng":"匆囪囱苁忩枞茐怱悤棇焧葱楤漗聡蓯蔥骢暰樅樬潨熜瑽璁聦聪瞛篵聰蟌鍯繱鏓鏦騘驄",
	"cóng":"丛徔従婃孮徖從悰淙琮碂慒漎潀潈誴賨賩樷錝藂叢灇欉爜",
	"cǒng":"",
	"còng":"愡憁謥",
	"cōu":"",
	"cóu":"",
	"cǒu":"",
	"còu":"凑湊傶楱腠辏輳",
	"cū":"怚粗觕麁麄橻麆麤",
	"cú":"徂殂",
	"cǔ":"皻",
	"cù":"促猝脨媨瘄蔟誎趗噈憱踧醋瘯踿簇縬趨鼀蹙蹵蹴顣",
	"cuān":"汆撺鋑镩蹿攛躥鑹",
	"cuán":"濽櫕巑攢灒欑穳",
	"cuàn":"窜殩熶窽篡窾簒竄爨",
	"cuī":"隹崔脺催凗嵟缞墔慛摧榱漼槯磪縗鏙",
	"cuǐ":"漼熣璀趡皠",
	"cuì":"伜忰疩倅粋紣翆脃脆啐啛崒悴淬萃椊毳焠琗瘁粹綷翠膵膬濢竁襊顇臎",
	"cūn":"邨村皴踆澊竴膥",
	"cún":"存侟拵壿澊",
	"cǔn":"刌忖",
	"cùn":"寸吋籿",
	"cuō":"搓瑳遳磋蹉醝鎈",
	"cuó":"虘嵯嵳痤睉矬蒫瘥蔖鹾酂鹺酇",
	"cuǒ":"脞",
	"cuò":"剉剒厝夎挫莡莝庴措逪锉蓌错縒諎銼錯",
	"chā":"扠扱芆臿挿偛嗏插揷馇銟锸艖疀嚓鍤鎈餷",
	"chá":"秅苴垞査茬茶捈梌嵖搽猹靫楂槎詧察摖檫",
	"chǎ":"紁蹅镲鑔",
	"chà":"仛奼汊岔侘衩诧剎姹紁詫",
	"chāi":"芆肞钗釵",
	"chái":"犲侪柴豺祡喍儕",
	"chǎi":"茝",
	"chài":"虿袃訍瘥蠆囆",
	"chān":"辿觇梴搀覘裧摻緂鋓幨襜攙",
	"chán":"苂婵谗單孱棎湹禅馋煘缠僝嶃嶄獑蝉誗鋋儃嬋廛潹潺緾澶磛禪毚螹蟐鄽瀍繟蟬儳劖繵蟾酁嚵壥巉瀺欃纏纒躔镵艬讒鑱饞",
	"chǎn":"产刬旵丳斺浐剗谄啴產産铲阐蒇剷嵼摌滻嘽幝蕆諂閳骣燀簅冁繟醦譂鏟闡囅灛讇",
	"chàn":"忏刬剗硟摲幝幨燀懴儳懺羼韂顫",
	"chāng":"伥昌倀娼淐猖菖阊椙琩裮锠錩閶鲳闛鯧鼚",
	"cháng":"仩仧兏肠苌镸長尝偿常徜瓺萇場甞腸嘗塲嫦瑺膓償嚐鲿鱨",
	"chǎng":"昶惝場敞僘厰塲廠氅鋹",
	"chàng":"怅玚畅鬯唱悵焻瑒暢畼誯韔",
	"chāo":"抄弨怊欩钞訬焯超鈔勦摷綽劋樔窼",
	"cháo":"牊晁巣巢鄛鼌漅樔潮窲罺鼂轈謿",
	"chǎo":"炒眧粆焣煼槱麨巐",
	"chào":"仦仯耖觘",
	"chē":"伡車俥砗唓莗硨蛼",
	"ché":"",
	"chě":"扯偖撦奲",
	"chè":"屮彻呫坼迠烢烲焎聅掣揊硩頙徹摰撤澈勶瞮爡",
	"chen":"伧傖",
	"chēn":"肜抻郴捵棽琛嗔綝瘨瞋諃賝謓",
	"chén":"尘臣忱沉辰陈迧茞宸栕莀莐陳敐晨桭梣訦谌軙愖跈鈂煁蔯塵敶樄瘎霃螴諶薼麎曟鷐",
	"chěn":"趻硶碜墋夦磣踸鍖贂醦",
	"chèn":"衬爯疢龀偁趂趁榇稱齓齔儭嚫穪谶櫬襯讖",
	"chēng":"朾阷泟柽爯凈棦浾琤偁淨碀蛏晿牚搶赪僜憆摚稱靗撐撑緽橖橕瞠赬頳檉竀罉鎗矃穪蟶鏿鐣饓鐺",
	"chéng":"氶丞成朾呈承枨诚郕乗城埩娍宬峸洆荿埕挰晟浧珹掁珵窚脭铖堘惩揨棖椉程筬絾裎塍塖溗誠畻酲鋮憕撜澂橙檙鯎瀓懲騬",
	"chěng":"侱徎悜逞骋庱睈裎騁",
	"chèng":"秤牚稱竀穪",
	"chi":"麶",
	"chī":"吃妛哧彨胵蚩鸱瓻眵笞粚喫訵嗤媸摛痴絺樆噄殦瞝誺噭螭鴟鵄癡魑齝攡彲黐",
	"chí":"弛池驰迟坻沶狋茌迡持柢竾荎俿歭耛菭蚳赿筂貾遅跢遟馳箈箎墀徲漦踟遲篪謘鍉邌鶗鶙",
	"chǐ":"叺伬扡呎肔侈卶齿垑奓拸胣恥耻蚇袳豉欼歯袲裭誃鉹褫齒",
	"chì":"彳叱斥佁杘灻赤饬侙抶勅恜柅炽勑捇眙翄翅敕烾啻湁飭傺痸腟誃鉓雴憏瘈翤遫銐慗慸瘛翨熾懘趩鶒鷘",
	"chōng":"充忡沖茺浺珫翀舂嘃摏徸憃憧衝罿艟蹖",
	"chóng":"虫崈崇痋隀漴褈緟蝩蟲爞",
	"chǒng":"宠埫寵",
	"chòng":"铳揰銃",
	"chou":"鮘",
	"chōu":"抽牰婤掫紬搊跾瘳篘醔犨犫",
	"chóu":"怞俦诪帱栦惆梼畤紬绸菗椆畴絒愁皗稠筹裯詶酧酬綢踌儔雔嚋嬦幬懤盩薵檮燽雠疇籌躊醻讐讎雦",
	"chǒu":"丒丑吜杽杻偢瞅醜矁魗",
	"chòu":"臰遚殠",
	"chu":"橻",
	"chū":"出岀初榋摢摴樗貙櫖齣",
	"chú":"刍除芻耝厨滁蒢豠锄媰耡蒭蜍趎鉏雏犓廚篨鋤橱幮櫉藸蟵躇雛櫥蹰鶵躕",
	"chǔ":"処杵础椘處储楮禇楚褚濋儲檚璴礎齭齼",
	"chù":"亍処竌怵泏绌豖欪炪竐俶敊埱珿絀菆傗鄐慉搐滀触閦儊嘼諔憷斶歜臅黜觸矗",
	"chuā":"欻",
	"chuǎ":"",
	"chuà":"",
	"chuāi":"搋",
	"chuái":"膗",
	"chuǎi":"",
	"chuài":"啜欼膪踹",
	"chuān":"巛川氚穿猭瑏",
	"chuán":"舡舩剶船圌遄傳椯椽歂暷篅膞輲",
	"chuǎn":"舛荈喘堾歂僢踳",
	"chuàn":"汌串玔钏釧猭賗鶨",
	"chuāng":"刅疮窓創窗牎摐牕瘡窻",
	"chuáng":"床牀喠噇朣橦",
	"chuǎng":"闯傸磢闖",
	"chuàng":"怆刱剏剙創愴",
	"chuī":"吹炊龡",
	"chuí":"垂倕埀桘陲捶菙圌搥棰腄槌硾锤箠錘鎚顀",
	"chuǐ":"",
	"chuì":"惙",
	"chūn":"芚旾杶春萅媋暙椿槆瑃箺蝽橁輴櫄鰆鶞",
	"chún":"纯肫陙唇浱純莼脣湻犉滣蒓鹑漘蓴膞醇醕錞鯙鶉",
	"chǔn":"朐偆萶惷睶賰蠢",
	"chuō":"逴趠踔戳繛",
	"chuò":"辶吷辵拺哾娖娕啜婥婼惙涰淖辍酫綽踀箹輟鋜龊擉磭餟繛歠鏃嚽齪鑡孎",
	"da":"繨",
	"dā":"咑哒耷笚嗒搭褡噠墶撘鎝鎉",
	"dá":"达迏迖迚呾妲怛沓垯炟羍荅荙畗剳匒惮畣笪逹溚詚達跶靼憚薘鞑燵蟽鐽韃龖龘",
	"dǎ":"",
	"dà":"亣汏眔",
	"dāi":"呆呔獃懛",
	"dǎi":"歹逮傣",
	"dài":"代诒轪侢垈岱帒甙绐迨带怠柋殆玳贷帯貣軑埭帶紿蚮袋軚逮釱棣詒貸軩瑇跢廗箉叇曃緿蝳駘鮘鴏戴艜黛簤蹛瀻霴襶黱靆",
	"dān":"丹妉単眈砃耼耽郸聃躭酖單媅愖殚瘅匰箪褝鄲頕儋勯擔殫甔癉襌簞聸",
	"dǎn":"伔刐抌玬瓭胆衴疸紞赕亶馾撢撣賧燀黕膽皽黵",
	"dàn":"旦但帎呾沊泹狚诞唌柦疍訑啗啖惔惮淡萏蛋啿弾氮腅蜑觛亶瘅窞蓞誕僤噉馾髧儋嘾彈憚醈憺擔澹禫餤駳鴠癉膻癚嚪繵贉霮饏黮",
	"dāng":"珰裆筜當儅噹澢璫襠簹艡蟷鐺闣",
	"dǎng":"党谠當擋譡黨攩灙欓讜",
	"dàng":"氹凼圵宕砀垱荡档偒菪婸崵愓瓽逿嵣當雼潒碭儅瞊蕩趤壋擋檔璗盪礑簜蘯闣",
	"dāo":"刀刂忉朷氘舠釖鱽裯魛螩",
	"dáo":"捯",
	"dǎo":"导岛陦島捣祷禂搗隝嘄嶋嶌槝導隯壔嶹擣蹈檮禱",
	"dào":"辺到帱悼梼焘盗菿椡盜絩道稲箌翢噵稻艔衜檤衟幬燾翿軇瓙纛",
	"de":"旳",
	"dē":"嘚",
	"dé":"恴淂蚮悳惪棏锝徳德鍀",
	"dēi":"嘚",
	"děi":"",
	"dèn":"扥扽",
	"dēng":"灯登豋僜噔嬁燈璒竳簦艠蹬",
	"děng":"等戥",
	"dèng":"邓凳鄧隥墱嶝憕瞪磴镫櫈瀓覴鐙",
	"dī":"氐仾低奃岻彽秪袛啲埞羝隄堤渧趆滴碮樀磾鞮鏑",
	"dí":"扚廸旳狄肑籴苖迪唙敌浟涤荻啇梑笛觌靮滌蓧馰髢嘀嫡翟蔋蔐頔敵篴镝嚁藡豴蹢鏑糴覿鸐",
	"dǐ":"氐厎坘诋邸阺呧坻弤抵拞枑柢牴砥掋菧觝詆軧楴聜骶鯳",
	"dì":"坔旳杕玓怟枤苐俤哋埅帝埊娣逓递偙梊焍珶眱祶第菂谛釱媂揥棣渧睇缔蒂遆僀楴禘腣遞鉪墆墑墬嵽摕疐碲蔕蝃遰慸甋締蝭嶳諦諟踶螮",
	"diǎ":"嗲",
	"diān":"佔敁掂傎厧嵮滇槇槙瘨窴颠蹎巅顚顛癫巓攧巔癲齻",
	"dián":"",
	"diǎn":"典奌点婰敟椣跕碘蒧蕇踮點嚸",
	"diàn":"电阽坫店垫扂玷痁钿婝惦淀奠琔殿痶蜔鈿電墊壂橂橝澱靛磹癜簟驔",
	"diāo":"刁叼汈刟虭凋奝弴彫蛁椆琱貂碉鳭瞗錭雕鮉鲷簓鼦鯛鵰",
	"diǎo":"扚屌鳥",
	"diào":"弔伄吊钓盄窎訋掉釣铞铫絩鈟竨蓧誂銚銱雿魡調瘹窵鋽藋鑃",
	"diē":"爹跌褺",
	"dié":"佚怢泆苵迭咥垤峌恎挕昳柣绖胅瓞眣耊啑戜眰谍喋堞崼幉惵揲畳絰耋臷詄趃跕軼镻叠楪殜牃牒跮嵽碟蜨褋槢艓蝶疂諜蹀鴩螲鲽鞢曡疉鰈疊氎",
	"diě":"",
	"diè":"哋",
	"dīng":"仃叮奵帄玎甼町疔盯耵虰酊釘靪",
	"dǐng":"奵艼顶酊頂鼎嵿鼑濎薡鐤",
	"dìng":"订忊饤矴定訂釘飣啶掟萣铤椗腚碇锭碠聢蝊鋌錠磸顁",
	"diū":"丟丢铥颩銩",
	"dōng":"东冬咚岽東苳昸氡倲鸫埬娻崬崠涷笗菄徚氭蝀鮗鼕鯟鶇鶫",
	"dǒng":"揰董墥嬞懂箽蕫諌",
	"dòng":"动冻侗垌姛峒恫挏栋洞狪胨迵凍戙烔胴動娻崠硐棟湩絧腖働勭燑駧霘",
	"dōu":"吺枓侸唗兜兠蔸橷瞗篼",
	"dóu":"唞",
	"dǒu":"乧阧抖钭陡蚪鈄",
	"dòu":"吋豆郖浢狵荳逗饾鬥梪毭渎脰酘痘閗窦鬦鋀餖斣瀆闘竇鬪鬬鬭",
	"dū":"厾剢阇嘟督醏闍",
	"dú":"独涜渎椟牍犊裻読獨錖凟匵嬻瀆櫝殰牘犢瓄皾騳黩讀豄贕韣髑鑟韇韥黷讟",
	"dǔ":"竺笃堵暏琽赌睹覩賭篤",
	"dù":"芏妒杜妬姤荰秺晵渡靯镀螙斁殬鍍蠧蠹",
	"duān":"耑偳剬媏端褍鍴",
	"duǎn":"短",
	"duàn":"段断塅缎葮椴煅瑖腶碫锻緞毈簖鍛斷躖籪",
	"duī":"垖堆塠痽磓镦鴭鐓鐜",
	"duǐ":"啍頧",
	"duì":"队对兊兌対杸祋怼陮敓敚隊碓綐對憞憝濧濻薱懟瀢瀩譈譵轛",
	"dūn":"吨惇蜳墪墫墩撴獤噸撉橔犜礅蹾蹲驐",
	"dǔn":"盹趸躉",
	"dùn":"伅坉庉忳沌炖盾砘逇钝顿遁鈍楯頓碷遯憞潡燉踲",
	"duo":"",
	"duō":"夛多咄哆畓剟掇敠敪毲裰跢嚉",
	"duó":"仛夺沰铎剫敓敚喥痥鈬奪凙踱鐸",
	"duǒ":"朵朶哚垜挆埵崜缍袳椯硾趓躱躲綞亸軃鬌嚲奲",
	"duò":"杕杝刴剁枤沲陊陏饳垜尮挆挅柁柂柮桗舵隋媠惰隓跢跥跺飿馱墮憜駄墯隳鵽",
	"ē":"妸妿娿婀屙痾",
	"é":"讹吪囮迗俄峉哦娥峩峨涐莪珴訛皒睋鈋锇鹅磀誐鋨頟额魤額鵞鵝譌",
	"ě":"枙娿砨惡頋噁騀鵈",
	"è":"厄戹歺岋阨呃扼苊阸呝枙砐轭咢咹垩姶洝砈匎敋蚅饿偔卾堊娾悪硆谔軛鄂阏堮堨崿惡愕湂萼豟軶遌遏鈪廅搕搤搹琧痷腭僫蝁锷鹗蕚遻頞颚餓噩擜覨諤閼餩鍔鳄歞顎礘櫮鰐鶚鰪讍齃鑩齶鱷",
	"ēi":"诶欸誒",
	"éi":"诶欸誒",
	"ěi":"诶欸誒",
	"èi":"诶欸誒",
	"ēn":"奀恩蒽煾",
	"ěn":"峎",
	"èn":"摁",
	"ēng":"鞥",
	"ér":"儿而児杒侕兒陑峏洏耏荋栭胹唲梕袻鸸粫聏輀鲕隭髵鮞鴯轜",
	"ěr":"尒尓尔耳迩洱饵栮毦珥铒衈爾鉺餌駬薾邇趰",
	"èr":"二弍弐佴刵咡贰貮貳誀樲髶",
	"fā":"冹沷発發彂醗醱",
	"fá":"乏伐姂坺垡浌疺罚茷阀栰笩傠筏瞂罰閥墢罸橃藅",
	"fǎ":"佱法峜砝鍅灋",
	"fà":"珐琺髪蕟髮",
	"fān":"帆忛犿拚畨勫噃嬏幡憣旙旛繙翻藩轓颿籓飜鱕",
	"fán":"凢凣凡匥杋柉矾籵钒舤烦舧笲釩棥煩緐墦樊蕃燔璠膰薠襎羳蹯瀿礬蘩鐇鐢蠜鷭",
	"fǎn":"反払仮返橎",
	"fàn":"氾犯奿汎泛饭范贩畈訉軓婏桳梵盕笵販軬飰飯滼嬎範輽瀪",
	"fāng":"匚方邡汸芳枋牥祊钫淓蚄堏趽鈁錺鴋",
	"fáng":"防妨房肪埅鲂魴",
	"fǎng":"仿访彷纺昉昘瓬眆倣旊眪紡舫訪髣鶭",
	"fàng":"放趽",
	"fēi":"飞妃非飛啡婓婔渄绯扉斐暃猆靟裶緋蜚霏鲱餥馡騑騛鯡飝",
	"féi":"肥疿淝腓痱蜰",
	"fěi":"朏胐匪诽奜悱斐棐榧翡蕜誹篚",
	"fèi":"吠犻芾废杮柹沸狒肺胏昲胇费俷剕厞疿砩陫屝笰萉廃費痱镄廢曊橃橨癈鼣濷蟦櫠鐨靅",
	"fēn":"吩帉纷芬昐氛玢砏竕衯紛翂梤棻訜躮酚鈖雰馚朆餴饙",
	"fén":"坆坟妢岎汾朌枌炃羒蚠蚡棼焚蒶隫墳幩濆獖蕡魵鳻橨燌燓豮鼢羵鼖豶轒鐼馩黂",
	"fěn":"粉黺",
	"fèn":"坋弅奋忿秎偾愤粪僨憤獖瞓奮橨膹糞鲼瀵鱝",
	"fēng":"丰仹凨凬夆妦沣沨凮枫炐封疯盽砜風埄峰峯莑偑桻烽琒堼崶渢猦葑锋楓犎蜂熢瘋碸僼篈鄷鋒檒豐鎽鏠酆寷灃蘴霻蠭靊飌麷",
	"féng":"夆浲逢堸溄馮摓漨綘艂縫",
	"fěng":"讽風覂唪諷",
	"fèng":"凤奉俸桻湗焨煈赗鳯鳳鴌縫賵",
	"fó":"仏仸坲梻",
	"fōu":"",
	"fóu":"紑",
	"fǒu":"缶妚炰缹缻殕雬鴀",
	"fū":"伕邞呋妋抙姇枎玞肤怤柎砆胕荂衭娐尃捊荴旉琈紨趺酜麸稃跗鈇筟綒鄜孵粰蓲敷膚鳺麩糐麬麱懯璷",
	"fú":"乀巿弗払伏凫甶刜孚扶芣芙芾咈姇宓岪帗怫枎泭绂绋苻茀俘垘枹柫柭氟洑炥玸畉畐祓罘胕茯郛韨鳬哹垺栿浮畗砩莩蚨袚匐桴涪烰琈符笰紱紼翇艴菔虙袱幅棴絥罦葍福綍艀蜉辐鉘鉜颫鳧榑稪箁箙粰褔豧韍颰幞澓蝠髴鴔諨踾輻鮄癁襆鮲黻襥鵩纀鶝",
	"fǔ":"阝呒抚甫乶府弣拊斧俌俛柎郙俯蚥釡釜捬脯辅椨焤盙腑滏蜅腐輔嘸撫頫鬴簠黼",
	"fù":"讣付妇负附咐坿彿竎阜驸复峊柎洑祔訃負赴蚥袝偩冨婏婦捬紨蚹傅媍富復秿萯蛗覄詂赋椱缚腹鲋榑禣複褔赙緮蕧蝜蝮賦駙嬔縛輹鮒賻鍑鍢鳆覆馥鰒",
	"gā":"旮伽夾嘎嘠",
	"gá":"钆軋尜釓嘎嘠噶錷",
	"gǎ":"尕玍朒嘎嘠",
	"gà":"尬魀",
	"gāi":"侅该郂陔垓姟峐荄晐赅畡祴絯隑該豥賅賌",
	"gǎi":"忋改絠",
	"gài":"丐乢匄匃杚钙摡溉葢鈣戤概槩蓋漑槪瓂",
	"gān":"甘忓迀攼玕肝咁坩泔矸苷柑玵竿疳酐粓凲尲尴筸漧鳱尶尷魐",
	"gǎn":"仠芉皯秆衦赶敢桿稈感澉趕橄擀澸篢簳鳡鱤",
	"gàn":"佄旰汵盰绀倝凎淦紺詌骭幹榦檊簳贑赣贛灨",
	"gāng":"冈冮刚纲肛岡牨疘矼缸剛罡堈崗掆釭棡犅堽摃碙綱罁鋼鎠",
	"gǎng":"岗犺崗",
	"gàng":"焵焹筻槓鋼戅戆戇",
	"gāo":"皋羔羙高皐髙臯睪槔睾槹獋橰篙糕餻櫜韟鷎鼛鷱",
	"gǎo":"夰杲菒稁搞缟槀槁稾稿镐縞藁檺藳鎬",
	"gào":"吿告勂诰郜峼祮祰锆筶禞誥鋯",
	"gē":"戈仡圪扢犵纥戓肐牫咯紇饹哥袼鸽割彁滒戨歌鴚擱謌鴿鎶",
	"gé":"呄佮佫匌挌阁革敋格鬲愅猲臵蛒裓隔颌嗝塥滆觡搿槅膈閣閤獦镉鞈韐骼臈諽輵擱鮥鮯櫊鎑鎘韚轕鞷騔",
	"gě":"個哿笴舸嘅嗰蓋鲄",
	"gè":"亇吤茖虼個硌铬箇鉻",
	"gěi":"給",
	"gēn":"根跟",
	"gén":"哏",
	"gěn":"",
	"gèn":"亙亘艮茛揯搄",
	"gēng":"刯庚畊浭耕菮椩焿絙絚赓鹒緪縆羮賡羹鶊",
	"gěng":"郠哽埂峺挭绠耿莄梗綆鲠骾鯁",
	"gèng":"堩緪縆",
	"gōng":"工弓公厷功攻杛侊糿糼肱宫紅宮恭躬龚匑塨幊愩觥躳慐匔碽篢髸觵龏龔",
	"gǒng":"廾巩汞拱唝拲栱珙嗊輁澒銾鞏",
	"gòng":"贡羾唝貢嗊愩慐熕",
	"gōu":"佝沟芶钩痀袧缑鈎溝鉤緱褠篝簼鞲韝",
	"gǒu":"芶岣狗苟枸玽耉耇笱耈蚼豿",
	"gòu":"呴坸构诟购垢姤冓啂夠够傋訽媾彀搆詬遘雊構煹觏撀糓覯購",
	"gū":"杚呱咕姑孤沽泒苽巭巬柧轱唃唂罛鸪笟菇菰蛄蓇觚軱軲辜酤稒鈲磆箍箛嫴篐橭鮕鴣",
	"gú":"",
	"gǔ":"夃古扢抇汩诂谷股牯罟羖逧钴傦啒淈脵蛊嗗尳愲詁馉毂賈鈷鼔鼓嘏榖皷鹘穀縎糓薣濲皼臌轂餶櫎瀔盬瞽鶻蠱",
	"gù":"固怘故凅顾堌崓崮梏牿棝祻雇榾痼锢僱錮鲴鯝顧",
	"guā":"瓜刮呱胍栝桰铦鸹歄煱颪趏劀緺銛諣踻銽颳鴰騧",
	"guá":"",
	"guǎ":"冎叧呙呱咼剐剮寡",
	"guà":"卦坬诖挂啩掛罣袿絓罫褂詿",
	"guāi":"乖",
	"guái":"叏",
	"guǎi":"拐枴柺罫箉",
	"guài":"夬怪恠",
	"guān":"关纶官矜覌倌矝莞涫棺蒄窤閞綸関瘝癏観闗鳏關鰥觀鱞",
	"guǎn":"莞馆琯痯筦斡管輨璭舘錧館鳤",
	"guàn":"卝毌丱贯泴覌悺惯掼淉貫悹祼慣摜潅遦樌盥罆雚観躀鏆灌爟瓘矔礶鹳罐觀鑵欟鱹鸛",
	"guāng":"光灮炚炛炗咣垙姯挄洸茪桄烡珖胱硄僙輄潢銧黆",
	"guǎng":"広犷廣獷臩",
	"guàng":"俇桄逛臦撗",
	"guī":"归圭妫规邽皈茥闺帰珪胿亀硅窐袿規媯廆椝瑰郌嫢摫閨鲑嬀嶲槣槻槼鳺璝瞡龜鮭巂歸雟鬶騩櫰櫷瓌蘬鬹",
	"guǐ":"宄氿朹轨庋佹匦诡陒垝姽恑攱癸軌鬼庪祪軓匭晷湀蛫觤詭厬簋蟡",
	"guì":"攰刿刽昋炅攱贵桂桧匮眭硊趹椢猤筀貴溎蓕跪匱瞆劊劌嶡撌槶螝樻檜瞶禬簂櫃癐襘鐀鳜鞼鑎鱖鱥",
	"gǔn":"丨衮惃硍绲袞辊滚蓘裷滾緄蔉磙緷輥鲧鮌鯀",
	"gùn":"睔謴",
	"guo":"",
	"guō":"呙咼咶埚郭啯堝崞渦猓楇聒鈛锅墎瘑嘓彉濄蝈鍋彍蟈懖矌",
	"guó":"囗囯囶囻国圀敋喐國帼掴腘摑幗慖漍聝蔮膕虢簂馘",
	"guǒ":"果惈淉菓馃椁褁槨粿綶蜾裹輠餜櫎",
	"guò":"過腂鐹",
	"hā":"虾紦铪鉿蝦",
	"há":"",
	"hǎ":"奤",
	"hà":"",
	"hāi":"咍嗨",
	"hái":"郂孩骸還嚡",
	"hǎi":"海胲烸塰酼醢",
	"hài":"亥妎拸骇害氦猲絯嗐餀駭駴饚",
	"han":"兯爳",
	"hān":"犴佄顸哻蚶酣頇嫨谽憨馠魽歛鼾",
	"hán":"邗含汵邯函肣凾虷唅圅娢浛笒崡晗梒涵焓琀寒嵅韩椷甝筨馯蜬澏鋡韓",
	"hǎn":"丆罕浫喊豃闞",
	"hàn":"仠厈汉屽忓扞闬攼旰旱肣唅垾悍捍涆猂莟晘焊菡釬閈皔睅傼蛿颔馯撖漢蔊蜭鳱暵熯輚銲鋎憾撼翰螒頷顄駻譀雗瀚鶾",
	"hāng":"",
	"háng":"邟妔苀迒斻杭垳绗桁笐航蚢颃裄貥筕絎頏魧",
	"hàng":"忼沆笐",
	"hāo":"茠蒿嚆薅薧",
	"háo":"乚毜呺竓皋蚝毫椃嗥獆號貉噑獔豪嘷獋諕儫嚎壕濠籇蠔譹",
	"hǎo":"郝",
	"hào":"昊侴昦秏哠恏悎浩耗晧淏傐皓鄗滈滜聕號暠暤暭澔皜皞镐曍皡薃皥藃鎬颢灏顥鰝灝",
	"hē":"诃抲欱訶嗬蠚",
	"hé":"禾纥呙劾咊咼姀河郃峆曷柇狢盇籺紇阂饸敆盉盍荷釛啝涸渮盒菏萂龁喛惒粭訸颌楁毼澕蓋詥貈貉鉌阖鲄朅熆閡閤餄鹖麧噈頜篕翮螛魺礉闔鞨齕覈鶡皬鑉龢",
	"hě":"",
	"hè":"咊抲垎贺哬袔隺寉焃惒猲賀嗃煂碋熇褐赫鹤翯嚇壑癋謞燺爀鶮鶴靍靎鸖靏",
	"hēi":"黒黑嗨潶",
	"hén":"拫痕鞎",
	"hěn":"佷哏很狠詪噷",
	"hèn":"恨噷",
	"hēng":"亨哼悙涥脝",
	"héng":"姮恆恒桁烆珩胻鸻撗橫衡鴴鵆蘅鑅",
	"hèng":"悙啈橫",
	"hng":"哼",
	"hōng":"叿吽呍灴轰訇烘軣揈渹焢硡谾薨輷嚝鍧巆轟",
	"hóng":"厷仜弘叿妅屸吰宏汯玒瓨纮闳宖泓玜苰垬娂沗洪竑紅羾荭虹浤浲紘翃耾硔紭谹鸿渱溄竤粠葓葒鈜閎綋翝谼潂鉷鞃魟篊鋐彋霐黉霟鴻黌",
	"hǒng":"唝晎嗊愩慐",
	"hòng":"讧訌閧撔澒銾蕻闂鬨闀",
	"hōu":"齁",
	"hóu":"矦鄇喉帿猴葔瘊睺銗篌糇翭骺翵鍭餱鯸",
	"hǒu":"吼吽犼呴",
	"hòu":"后郈厚垕後洉矦茩逅候堠豞鲎鲘鮜鱟",
	"hū":"乎乯匢虍芴呼垀忽昒曶泘苸恗烀芔轷匫唿惚淴虖軤雽嘑寣滹雐幠戯歑戱膴戲謼",
	"hú":"囫抇弧狐瓳胡壶隺壷斛焀喖壺媩搰湖猢絗葫鹄楜煳瑚瓡嘝蔛鹕鹘槲箶縎蝴衚魱縠螜醐頶觳鍸餬礐鵠瀫鬍鰗鶘鶦鶻鶮",
	"hǔ":"乕汻虎浒俿淲萀琥虝滸錿鯱",
	"hù":"互弖戶戸户冱芐帍护沍沪岵怙戽昈曶枑姱怘祜笏粐婟扈瓠楛嗃嗀綔鄠雽嫭嫮摢滬蔰槴熩鳸濩簄豰鍙嚛鹱觷護鳠頀鱯鸌",
	"huā":"吪芲花砉埖婲華椛硴蒊嘩糀誮錵蘤",
	"huá":"呚姡骅華釪釫铧滑猾嘩搳撶劃磆蕐螖鋘譁鏵驊鷨",
	"huà":"夻杹枠画话崋桦華婳畫嬅畵觟話劃摦樺嫿槬澅諙諣黊繣舙譮",
	"huái":"怀佪徊淮槐褢踝懐褱懷瀤櫰耲蘹",
	"huài":"咶壊壞蘾",
	"huān":"欢犿狟貆歓鴅懁鵍酄嚾孉懽獾歡讙貛驩",
	"huán":"环郇峘洹狟荁垸桓萈萑堚寏絙雈獂綄羦蒝貆锾瞏圜嬛寰澴缳還阛環豲鍰雚镮鹮糫繯鐶闤鬟瓛",
	"huǎn":"睆缓緩",
	"huàn":"幻奂肒奐宦唤换浣涣烉患梙焕逭喚喛嵈愌換渙痪煥瑍綄豢漶瘓槵鲩擐澣藧鯇攌嚾轘鯶鰀",
	"huāng":"巟肓荒衁宺朚塃慌",
	"huáng":"皇偟凰隍黄喤堭媓崲徨惶揘湟葟遑黃楻煌瑝墴潢獚锽熿璜篁艎蝗癀磺穔諻簧蟥鍠餭鳇趪韹鐄騜鰉鱑鷬",
	"huǎng":"汻怳恍炾宺晄奛谎幌詤熀熿縨謊兤櫎爌",
	"huàng":"愰滉榥曂皝鎤皩",
	"hui":"",
	"huī":"灰灳诙咴恢拻挥洃虺袆晖烣珲豗婎媈揮翚辉隓暉椲楎煇琿睢禈詼墮幑睳褘噅噕撝翬輝麾徽隳瀈蘳孈鰴",
	"huí":"囘回囬佪廻廽恛洄茴迴烠蚘逥痐缋蛕蛔蜖藱鮰繢",
	"huǐ":"虺悔烠毀毁螝毇檓燬譭",
	"huì":"卉屷屶汇讳泋哕浍绘芔荟诲恚恵桧烩贿彗晦秽喙廆惠湏絵缋翙阓匯彚彙會滙詯賄颒僡嘒瘣蔧誨銊圚寭慧憓暳槥潓潰蕙噦嬒徻橞殨澮濊獩璤薈薉諱頮檅檜燴璯篲藱餯嚖懳瞺穢繢蟪櫘繪翽譓儶鏸闠鐬靧譿顪",
	"hūn":"昏昬荤婚惛涽焄阍棔殙湣葷睧睯蔒閽轋",
	"hún":"忶浑珲馄渾湷琿魂餛鼲",
	"hǔn":"",
	"hùn":"诨俒眃倱圂婫掍焝溷尡慁睴觨諢",
	"huō":"吙秴耠劐攉騞",
	"huó":"佸姡活秮秳趏",
	"huǒ":"灬火伙邩钬鈥漷煷夥",
	"huò":"沎或货咟俰捇眓获閄剨喐掝祸貨惑旤湱禍漷窢蒦锪嚄奯擭濊濩獲篧鍃霍檴謋雘矆礊穫镬嚯彟瀖耯艧藿蠖嚿曤臛癨矐鑊韄靃彠",
	"jī":"丌讥击刉叽饥乩刏圾机玑肌芨矶鸡枅苙咭剞唧姬屐积笄飢基庴喞嵆嵇幾攲敧朞犄筓缉赍嗘畸稘跻鳮僟毄箕綨緁銈嘰撃槣樭畿緝觭諅賫踑躸齑墼撽機激璣禨積錤隮懠擊磯簊羁賷櫅耭雞譏韲鶏譤鐖饑癪躋鞿魕鶺鷄羇虀鑇覉鑙齏羈鸄覊",
	"jí":"乁亽亼及尐伋吉岌彶忣汲级即极皀亟佶诘郆卽叝姞急皍笈級堲揤疾觙偮卙唶楖淁焏谻戢棘極殛湒集塉嫉愱楫蒺蝍趌辑槉耤膌銡嶯潗濈瘠箿蕀蕺諔趞踖鞊鹡檝螏輯磼簎藉襋蹐鍓艥籍轚鏶霵齎躤雧",
	"jǐ":"己丮妀屰犱泲虮挤脊掎済鱾幾戟給嵴麂魢撠憿橶擠濟穖蟣",
	"jì":"彐彑旡计记伎坖妓忌技汥芰际剂季哜垍既洎紀茍茤荠計迹剤畟紒继觊記偈寄寂帺徛悸旣梞済绩塈惎臮葪蔇兾勣痵継蓟裚跡際鬾魝摖暨漃漈禝稩穊誋跽霁魥鲚暩瞉稷諅鲫冀劑曁禨穄薊襀髻嚌懠檕濟穖績繋罽薺覬鮆檵櫅櫭璾蹟鯽鵋齌廭懻癠穧繫蘎骥鯚瀱繼蘮鱀蘻霽鰶鰿鷑鱭驥",
	"jia":"",
	"jiā":"加乫伽夾宊抸佳拁泇徍枷毠浃珈哿埉挾浹痂梜笳耞袈傢猳葭跏椵犌腵鉫嘉擖镓糘豭貑鴐鎵麚",
	"jiá":"圿夾忦扴郏拮荚郟唊恝莢戛脥袷铗戞猰蛱裌颉颊蛺鋏頬頰鴶鵊",
	"jiǎ":"甲岬叚玾胛斚钾婽徦斝椵賈鉀榎槚瘕檟",
	"jià":"驾架嫁幏賈榢價稼駕",
	"jiān":"戋奸尖幵坚歼冿戔玪肩艰姧姦兼堅帴惤猏笺菅菺豜傔揃湔牋犍缄葌閒間雃靬搛椷椾煎瑊睷碊缣蒹豣漸監箋蔪樫熞稴緘蕑蕳鋑鲣鳽鹣熸篯縑鋻艱鞬餰馢麉瀐濺鞯鳒鵑殱礛籈鵳攕瀸鰔櫼殲譼鰜鶼礷籛韀鰹囏虃鑯韉",
	"jiǎn":"囝拣枧俭柬茧倹挸捡笕减剪帴揵梘检湕趼堿揀揃検減睑硷裥詃锏弿暕瑐筧简絸谫彅戩戬碱儉翦鋄撿橏篯檢藆襇襉謇蹇瞼礆簡繭謭鎫鬋鰎鹸瀽蠒鐗鐧鹻籛譾襺鹼",
	"jiàn":"件見侟建饯剑洊牮荐贱俴健剣栫涧珔舰剱徤揵袸谏釰釼寋旔朁楗毽腱臶跈践閒間賎鉴键僣僭榗槛漸監劎劍墹澗箭糋諓賤趝踐踺劒劔薦諫鋻鍵餞瞷瞯磵礀螹鍳鞬擶檻濺繝瀳覵覸譛鏩聻艦轞鐱鑒鑑鑬鑳",
	"jiāng":"江姜茳畕豇將葁畺摪翞僵漿螀壃缰薑橿殭螿鳉疅礓繮韁鱂",
	"jiǎng":"讲奖桨傋塂蒋奨奬蔣槳獎耩膙講顜",
	"jiàng":"匞匠夅弜洚绛將弶強絳畺酱勥滰嵹摾漿彊犟糡醤糨醬櫤謽",
	"jiāo":"艽交郊姣娇峧浇茮茭骄胶敎喬椒焦蛟跤僬嘐虠鲛嬌嶕嶣憍憢澆膠蕉燋膲礁穚鮫鵁鹪簥蟭轇鐎驕鷦鷮",
	"jiáo":"矯",
	"jiǎo":"臫佼恔挢狡绞饺捁晈烄笅皎脚釥铰搅湫筊絞勦敫湬煍腳賋僥摎摷暞踋鉸餃儌劋徺撟撹樔徼憿敽敿燞曒璬矯皦蟜繳譑孂纐攪灚鱎龣",
	"jiào":"叫呌峤挍訆悎珓窌笅轿较敎斍覐窖筊覚滘較嘂嘄嘦斠漖酵噍嶠潐噭嬓徼獥癄藠趭轎醮灂覺譥皭釂",
	"jie":"價",
	"jiē":"阶疖哜皆袓接掲痎秸菨階喈喼嗟堦媘嫅椄湝結脻街裓楬煯瑎稭鞂擑蝔嚌癤謯鶛",
	"jié":"卩卪孑尐讦扢刧刦劫岊昅杢刼劼杰疌衱诘拮洁狤迼倢桀桔桝洯紒莭訐偈偼啑婕崨捷掶袷袺傑媫嵑結絜蛣颉嵥搩楶滐睫節蜐詰趌跲鉣截榤碣竭蓵鲒嶱潔羯誱踕镼鞊頡幯擳嶻擮礍鍻鮚巀蠞蠘蠽",
	"jiě":"姐毑媎觧飷檞",
	"jiè":"丯介吤妎岕庎戒屆届斺玠畍界疥砎衸诫借悈紒蚧唶徣堺楐琾蛶觧骱犗耤誡褯魪嶰藉鎅鶡",
	"jīn":"巾今仐斤钅竻釒金津矜砛荕衿觔埐珒矝紟惍琎菳堻琻筋釿璡鹶黅襟",
	"jǐn":"侭卺巹紧堇婜菫僅厪谨锦嫤廑慬漌緊蓳馑槿瑾儘錦謹饉",
	"jìn":"伒劤妗近进枃勁浕荩晉晋浸烬笒紟赆唫祲進煡臸僅寖搢溍缙靳墐嫤慬榗瑨盡馸僸凚歏殣觐噤嬐濅縉賮嚍壗嬧濜藎燼璶覲贐齽",
	"jīng":"坕坙巠京泾经茎亰秔荊荆涇粇婛惊旍旌猄経菁晶稉腈葏睛粳經兢箐精綡聙鋞橸鲸鯨鶁鶄麖鼱驚麠",
	"jǐng":"井丼阱刭坓宑汫汬肼剄穽殌儆頚幜憬擏澋璄憼暻璟璥頸蟼警",
	"jìng":"劤妌弪径迳俓勁婙浄胫倞凈弳徑痉竞莖逕婧桱梷殑淨竟竫脛敬痙竧靓傹靖境獍誩踁静靚憼曔镜靜瀞鵛鏡競竸",
	"jiōng":"冂冋坰扃埛扄浻絅銄駉駫蘏蘔",
	"jiǒng":"冏囧泂炅迥侰炯逈浻烱絅煚窘颎綗臦僒煛熲澃褧燛顈臩",
	"jiòng":"",
	"jiū":"丩勼纠朻牞究糺鸠糾赳阄萛啾揂揪剹揫鳩摎稵樛鬏鬮",
	"jiú":"",
	"jiǔ":"九乆久乣氿奺汣杦灸玖糺舏韭紤酒镹韮",
	"jiù":"匛旧臼咎疚柩柾倃捄桕匓厩救就廄廐舅僦廏慦殧舊鹫匶鯦麔欍齨鷲",
	"jū":"凥伡抅車匊居岨泃狙苴驹俥毩疽眗砠罝陱娵婮崌掬梮涺揟椐毱琚腒趄跔跙锔裾雎艍蜛諊踘躹鋦駒據鋸鮈鴡檋鞠鞫鶋",
	"jú":"局泦侷狊挶桔啹婅淗焗菊郹椈湨犑輂僪粷蓻跼閰趜鋦橘駶繘鵙蹫鵴巈蘜鶪鼰鼳驧",
	"jǔ":"咀岨弆举枸矩莒挙椇筥榉榘蒟龃聥舉踽擧櫸齟欅襷",
	"jù":"巨乬巪讵姖岠怇拒洰苣邭具怐怚拠昛歫炬珇秬钜俱倨倶剧烥粔耟蚷袓埧埾惧詎距焣犋跙鉅飓蒩虡豦锯寠愳窭聚駏劇勮屦踞鮔壉懅據澽窶螶遽鋸屨颶瞿貗簴躆醵忂懼鐻",
	"juān":"姢勌娟捐涓朘梋焆瓹脧圏裐鹃勬鋑鋗镌鞙鎸鐫蠲",
	"juǎn":"呟巻帣埍捲菤锩臇錈闂",
	"juàn":"奆劵奍巻帣弮倦勌悁桊狷绢隽婘惓淃瓹眷鄄圏棬椦睊絭罥腃雋睠絹飬慻蔨嶲鋗餋獧縳巂羂讂",
	"juē":"噘撅撧屩屫",
	"jué":"亅孒孓决刔氒诀吷妜弡抉決芵叕泬玨玦挗珏疦砄绝虳埆捔欮蚗袦崫崛掘斍桷覐觖訣赽趹傕厥焳矞絕絶覚趉鈌劂瑴谲駃噊嶡嶥憰撅熦爴獗瘚蕝蕨觮鴂鴃噱壆憠橜橛燋璚爵臄镢櫭繘蟨蟩爑譎蹷蹶髉匷矍覺鐍鐝鳜灍爝觼穱彏戄攫玃鷢矡貜躩钁",
	"juě":"蹶",
	"juè":"誳",
	"jūn":"军君均汮姰袀軍钧莙蚐桾皲鈞碅筠皸皹覠銁銞鲪頵麇龜鍕鮶麏麕",
	"jǔn":"",
	"jùn":"呁俊郡陖埈峻捃浚隽馂骏晙焌珺棞畯竣葰雋儁箘箟蜠賐寯懏餕燇濬駿鵘鵔鵕攈攟",
	"kā":"喀",
	"kǎ":"佧咔咯垰胩裃鉲",
	"kāi":"开奒揩锎開鐦",
	"kǎi":"凯剀垲恺闿豈铠凱剴嘅慨蒈塏嵦愷輆暟锴鍇鎧闓颽",
	"kài":"忾炌欯欬烗勓愒愾濭鎎",
	"kān":"刊栞勘龛堪嵁戡龕",
	"kǎn":"凵冚坎扻侃砍莰偘埳惂欿歁槛輡檻顑竷轗",
	"kàn":"衎崁墈阚瞰磡闞竷鬫矙",
	"kāng":"忼闶砊粇康閌嫝嵻慷漮槺穅糠躿鏮鱇",
	"káng":"",
	"kǎng":"",
	"kàng":"亢伉匟邟囥抗犺闶炕钪鈧閌",
	"kāo":"尻嵪髛",
	"kǎo":"丂攷考拷洘栲烤薧",
	"kào":"洘铐犒銬鲓靠鮳鯌",
	"kē":"匼柯牁牱珂科轲疴砢趷钶蚵铪嵙棵痾萪軻颏嗑搕犐稞窠鈳榼薖鉿颗樖瞌磕蝌頦窼醘顆髁礚",
	"ké":"殻揢殼翗",
	"kě":"岢炣渇嵑敤渴軻閜磆嶱",
	"kè":"克刻剋勀勊客峇恪娔尅悈袔课堁氪骒愘硞缂衉嗑愙歁溘锞碦緙艐課濭錁礊騍",
	"kēi":"剋尅",
	"kēn":"",
	"kěn":"肎肯肻垦恳啃龂豤貇龈墾錹懇",
	"kèn":"珢掯硍裉褃",
	"kēng":"劥阬坈坑妔挳硁殸牼揁硜铿硻摼誙銵鍞鏗",
	"kěng":"硻",
	"kōng":"倥埪崆悾涳椌硿箜躻錓鵼",
	"kǒng":"孔倥恐悾",
	"kòng":"矼控羫鞚",
	"kōu":"抠芤眍眗剾彄摳瞘",
	"kǒu":"口劶竘",
	"kòu":"叩扣佝怐敂冦宼寇釦窛筘滱蔲蔻瞉簆鷇",
	"kū":"扝刳矻郀朏枯胐哭桍秙窋堀圐跍窟骷鮬",
	"kú":"",
	"kǔ":"狜苦楛",
	"kù":"库俈绔庫捁秙焅袴喾硞絝裤瘔酷廤褲嚳",
	"kuā":"咵姱恗晇絓舿誇",
	"kuǎ":"侉垮楇銙",
	"kuà":"胯趶誇跨骻",
	"kuǎi":"蒯擓",
	"kuài":"巜凷圦块快侩郐哙浍狯脍欳塊蒉會筷駃鲙儈墤鄶噲廥澮獪璯膾旝糩鱠",
	"kuān":"宽寛寬臗髋鑧髖",
	"kuǎn":"梡欵款歀窽窾",
	"kuàn":"",
	"kuāng":"匡迋劻诓邼匩哐恇洭硄筐筺誆軭",
	"kuáng":"忹抂狅狂诳軖軠誑鵟",
	"kuǎng":"夼儣懭",
	"kuàng":"卝丱邝圹纩况旷岲況矿昿贶框眖砿眶絋絖貺軦鉱鋛鄺壙黋懬曠爌矌礦穬纊鑛",
	"kuī":"亏刲岿悝盔窥聧窺虧顝闚巋",
	"kuí":"奎晆逵鄈隗馗喹揆葵骙戣暌楏楑魁睽蝰頯櫆藈鍨鍷騤夔蘷巙虁犪躨",
	"kuǐ":"尯煃跬頍磈蹞",
	"kuì":"尯胿匮喟媿愧愦蒉馈匱瞆嘳嬇憒潰篑聭聩蕢殨膭謉瞶餽簣聵籄饋",
	"kūn":"坤昆堃堒婫崑崐晜猑菎裈焜琨髠裩貇锟髡鹍潉蜫褌髨熴瑻醌錕鲲騉鯤鵾鶤",
	"kǔn":"悃捆阃壸梱祵硱稇裍壼稛綑閫閸",
	"kùn":"困涃睏",
	"kuò":"扩拡挄适秮秳铦筈萿葀蛞阔廓漷銛噋銽頢髺擴濶闊鞟韕霩鞹鬠",
	"la":"鞡",
	"lā":"垃柆砬菈搚磖邋",
	"lá":"旯剌砬揦磖嚹",
	"lǎ":"喇藞",
	"là":"剌翋揦溂揧楋瘌蜡蝋辢辣蝲臈擸攋爉臘鬎櫴瓎镴鯻蠟鑞",
	"lái":"来來俫倈崃徕涞莱郲婡崍庲徠梾淶猍萊逨棶琜筙铼箂錸騋鯠鶆麳",
	"lǎi":"襰",
	"lài":"疠娕徕唻婡徠赉睐睞赖誺賚濑賴頼癘顂癞鵣攋瀨瀬籁藾櫴癩籟",
	"lán":"兰岚拦栏啉婪惏嵐葻阑暕蓝谰厱澜褴儖斓篮懢燣燷藍襕镧闌璼幱襤譋攔瀾灆籃繿蘫蘭斕欄襴囒灡籣欗讕躝襽鑭韊",
	"lǎn":"览浨揽缆榄漤罱醂壈懒覧擥嬾懶孄覽孏攬灠欖爦顲纜",
	"làn":"坔烂滥燗嚂壏濫爁爛瓓爤爦糷钄",
	"lāng":"啷",
	"láng":"勆郞哴欴狼嫏廊斏桹琅蓈榔瑯硠稂锒筤艆蜋郒樃螂躴鋃鎯駺",
	"lǎng":"崀朗朖烺塱蓢誏朤",
	"làng":"埌浪莨阆筤蒗誏閬",
	"lāo":"捞粩撈",
	"láo":"労劳牢窂哰崂浶勞痨铹僗嘮嶗憦憥朥癆磱簩蟧醪鐒顟髝",
	"lǎo":"耂老佬咾恅狫荖栳珯硓铑蛯銠鮱轑",
	"lào":"涝絡嗠耢酪嫪嘮憦樂澇躼橯耮軂",
	"le":"饹",
	"lē":"嘞",
	"lè":"仂阞叻忇扐氻艻牞玏泐竻砳楽韷餎樂簕鳓鰳鱳",
	"lei":"嘞",
	"lēi":"",
	"léi":"絫雷嫘缧蔂樏畾磥檑縲攂礌镭櫑瓃羸礧纍罍蘲鐳轠儽鑘靁虆鱩欙纝鼺",
	"lěi":"厽耒诔垒洡塁絫傫誄瘣樏磊蕌磥蕾儡壘癗礌藟櫑櫐矋礨礧灅蠝蘽讄壨鑸鸓",
	"lèi":"泪洡类涙淚祱絫酹銇頛頪錑攂颣類礧纇蘱禷",
	"lēng":"稜",
	"léng":"唥崚塄楞碐稜薐",
	"lěng":"冷",
	"lèng":"倰堎愣睖踜",
	"li":"",
	"lī":"",
	"lí":"刕杝厘柂剓狸离荲骊悡梨梸犁琍菞喱棃犂鹂剺漓睝筣缡艃蓠嫠孷樆璃盠竰貍犛糎蔾褵鋫鲡黎篱縭罹錅蟍謧醨嚟藜邌釐離鯏斄瓈蟸鏫鯬鵹麗黧囄灕蘺蠫孋廲劙鑗穲籬纚驪鱺鸝",
	"lǐ":"礼李里俚峛峢娌峲悝浬逦理裡锂粴裏豊鋰鲤澧禮鯉醴蠡鳢邐鱧欚纚鱱",
	"lì":"力历厉屴扐立吏扚朸利励叓呖坜杝沥苈例叕岦戾枥沴沵疠苙迣俐俪栃栎疬砅茘荔赲轹郦唎娳悧栛栗浰涖猁珕砬砺砾秝莉莅鬲唳婯悷笠粒粝脷蚸蛎傈凓厤棙痢蛠詈跞雳厯塛慄搮溧睙蒞蒚蜊鉝鳨厲暦歴瑮綟蜧銐蝷镉勵曆歷篥隷鴗巁檪濿癘磿隸鬁儮擽曞櫔爄犡禲蠇鎘嚦壢攊櫟瀝瓅礪藶麗櫪爏瓑皪盭礫糲蠣儷癧礰纅酈鷅麜囇孋攦觻躒轢欐讈轣攭瓥靂靋",
	"liǎ":"俩倆",
	"lián":"奁连帘怜涟莲連梿联裢亷嗹廉慩溓漣蓮匲奩槏槤熑覝劆匳噒嫾憐磏聨聫褳鲢濂濓縺翴聮薕螊櫣燫聯臁謰蹥檶鎌镰瀮簾蠊鬑鐮鰱籢籨",
	"liǎn":"莶敛梿琏脸裣慩摙溓槤璉蔹嬚薟斂櫣歛臉鄻襝羷蘞蘝醶",
	"liàn":"练炼恋殓僆堜媡湅萰链摙楝煉瑓潋稴練澰錬殮鍊鏈瀲鰊戀纞",
	"liāng":"",
	"liáng":"良俍莨梁涼椋辌粱粮墚踉樑輬駺糧",
	"liǎng":"両两兩俩倆唡啢掚脼裲緉蜽魉魎",
	"liàng":"亮倞哴悢谅涼辆喨晾湸靓輌踉諒輛鍄",
	"liāo":"蹽",
	"liáo":"辽疗窌聊尞僚寥嵺憀摎漻膋嘹嫽寮嶚嶛憭敹樛獠缭遼暸橑璙膫療竂鹩屪廫簝繚藔蟟蟧豂賿蹘爎爒飂髎飉鷯",
	"liǎo":"钌釕鄝缪蓼憭繆曢爎镽爒",
	"liào":"尥尦钌炓料釕廖撂窷镣鐐",
	"lie":"",
	"liē":"",
	"lié":"",
	"liě":"忚毟挘",
	"liè":"列劣劦冽劽姴挒洌茢迾哷埓埒栵浖烈烮捩猎猟脟棙蛚煭聗趔綟巤獦颲燤儠巁鮤鴷擸爄獵爉犣躐鬛鬣鱲",
	"līn":"拎",
	"lín":"厸邻阾林临冧啉崊惏晽琳粦碄箖粼綝鄰隣嶙潾獜遴斴暽燐璘辚霖疄瞵磷臨繗翷麐轔壣瀶鏻鳞驎鱗麟",
	"lǐn":"菻亃僯箖凜凛撛廩廪懍懔澟檁檩癝癛",
	"lìn":"吝恡悋赁焛亃痳賃蔺獜橉甐膦閵疄藺蹸躏躙躪轥",
	"líng":"伶刢灵呤囹坽夌姈岺彾泠狑苓昤朎柃玲瓴〇凌皊砱秢竛羐袊铃陵鸰婈崚掕棂淩琌笭紷绫羚翎聆舲菱蛉衑祾詅跉軨稜蓤裬鈴閝零龄綾蔆輘霊駖澪蕶錂霗魿鲮鴒鹷燯霝霛齢酃鯪孁齡櫺醽靈欞爧麢龗",
	"lǐng":"岺袊领領嶺",
	"lìng":"另炩蘦",
	"liū":"熘澑蹓",
	"liú":"刘畄斿浏流留旈琉畱硫裗媹嵧旒蒥蓅骝摎榴漻瑠飗劉瑬瘤磂镏駠鹠橊璢疁镠癅蟉駵嚠懰瀏藰鎏鎦麍鏐飀鐂騮飅鰡鶹驑",
	"liǔ":"柳栁桞珋桺绺锍綹熮罶鋶橮嬼懰羀藰",
	"liù":"窌翏塯廇遛澑磂磟鹨鎦霤餾雡飂鬸鷚",
	"lo":"咯",
	"lóng":"龙屸尨咙泷茏昽栊珑胧眬砻竜聋隆湰滝嶐槞漋癃窿篭龍儱蘢鏧霳嚨巃巄瀧曨朧櫳爖瓏襱矓礲礱蠬蠪龓龒籠聾豅躘靇鑨驡鸗",
	"lǒng":"陇垅垄拢篢篭龍隴儱徿壟壠攏竉龓籠躘",
	"lòng":"哢梇硦儱徿贚",
	"lou":"喽嘍瞜",
	"lōu":"摟",
	"lóu":"剅娄偻婁喽溇蒌僂楼嘍寠廔慺漊蔞遱樓熡耧蝼瞜耬艛螻謱貗軁髅鞻髏鷜",
	"lǒu":"嵝塿嶁摟甊篓簍",
	"lòu":"陋屚漏瘘镂瘻瘺鏤",
	"lū":"噜撸謢嚕擼",
	"lú":"卢庐芦垆枦泸炉栌胪轳舮鸬玈舻颅鈩鲈馿魲盧嚧壚廬攎瀘獹璷蘆曥櫨爐瓐臚矑籚纑罏艫蠦轤鑪顱髗鱸鸕黸",
	"lǔ":"卤虏掳鹵硵鲁虜塷滷蓾樐澛魯擄橹氇磠穞镥瀂櫓氌艣鏀艪鐪鑥",
	"lù":"圥甪陆侓坴彔录峍勎赂辂陸娽淕淥渌硉菉逯鹿椂琭祿禄僇剹勠盝睩稑賂路輅塶廘摝漉箓粶緑蓼蔍戮樚熝膔趢踛辘醁潞穋蕗錄錴録璐簏螰鴼簶蹗轆騄鹭簬簵鏕鯥鵦鵱麓鏴騼籙觻虂鷺",
	"luán":"娈孪峦挛栾鸾脔滦銮鵉圝奱孌孿巒攣曫欒灓羉臡臠圞灤虊鑾癴癵鸞",
	"luǎn":"卵覶",
	"luàn":"乱釠乿亂薍灓",
	"lūn":"掄",
	"lún":"仑伦囵沦纶芲侖轮倫陯圇婨崘崙掄淪菕棆腀碖綸耣蜦論踚輪磮錀鯩",
	"lǔn":"埨惀碖稐耣",
	"lùn":"惀溣碖論",
	"luo":"囉囖",
	"luō":"捋頱囉囖",
	"luó":"寽罗猡脶萝逻椤腡锣箩骡镙螺攎羅覶鏍儸覼騾囉攞玀蘿邏欏驘鸁籮鑼饠囖",
	"luǒ":"剆倮砢捰蓏裸躶瘰蠃臝曪攭癳",
	"luò":"泺咯峈洛荦骆洜珞捰渃硌硦笿絡蛒跞詻摞漯犖雒駱磱鮥鵅擽濼攊皪躒纙",
	"lǘ":"驴闾榈閭氀膢瞜櫚藘驢",
	"lǚ":"吕呂侣郘侶挔捛捋旅梠焒祣偻稆铝屡絽缕僂屢慺膂褛鋁履膐褸儢縷穭鷜",
	"lǜ":"垏律哷虑嵂氯葎滤綠緑慮箻膟勴繂濾櫖爈卛鑢",
	"lüè":"寽掠畧略锊稤圙鋢鋝",
	"ma":"嗎嘛麽",
	"mā":"亇妈孖庅媽嫲榪螞",
	"má":"菻麻嗎痲痳嘛嫲蔴犘蟇",
	"mǎ":"马犸杩玛码馬嗎溤獁遤瑪碼螞鎷鰢鷌",
	"mà":"杩祃閁骂傌睰嘜榪禡罵螞駡鬕",
	"mái":"薶霾",
	"mǎi":"买荬買嘪蕒鷶",
	"mài":"劢迈佅売麦卖唛脈麥衇勱賣邁霡霢",
	"mān":"颟顢",
	"mán":"姏悗蛮絻谩慲摱馒樠瞞鞔謾饅鳗鬘鬗鰻矕蠻",
	"mǎn":"娨屘満满滿螨襔蟎鏋矕",
	"màn":"曼僈鄤墁嫚幔慢摱漫獌缦蔄槾澫熳澷镘縵鏝蘰",
	"māng":"牤",
	"máng":"邙吂忙汒芒尨杗杧盲盳厖恾笀茫哤娏庬浝狵朚牻硭釯铓痝蛖鋩駹蘉",
	"mǎng":"莽莾硥茻壾漭蟒蠎",
	"màng":"",
	"māo":"貓",
	"máo":"毛矛芼枆牦茅茆旄罞渵軞酕堥嵍楙锚緢鉾髦氂犛蝥貓髳錨蟊鶜",
	"mǎo":"冇卯夘乮峁戼泖昴铆笷蓩鉚",
	"mào":"冃皃芼冐茂柕眊秏贸旄耄袤覒媢帽萺貿鄚愗暓毷瑁瞀貌鄮蝐懋",
	"me":"庅麽麼嚜",
	"mē":"嚒",
	"mè":"濹嚰",
	"méi":"坆沒枚玫苺栂眉脄莓梅珻脢郿堳媒嵋湄湈猸睂葿楣楳煤瑂禖腜塺槑酶镅鹛鋂霉穈徾鎇攗鶥黴",
	"měi":"毎每凂美挴浼羙媄嵄渼媺镁嬍燘躾鎂黣",
	"mèi":"妹抺沬旀昧祙袂眛媚寐殙痗跊鬽煝睸韎魅篃蝞嚜櫗",
	"mēn":"悶椚",
	"mén":"门们扪汶怋玧钔門們閅捫菛璊瞞穈鍆亹斖虋",
	"mèn":"悗惛焖悶暪燜鞔懑懣",
	"mēng":"掹擝矇",
	"méng":"尨甿虻庬莔萌溕盟雺甍鄳儚橗瞢蕄蝱鄸鋂髳幪懜懞濛獴曚朦檬氋礞鯍鹲艨矒靀霿饛顭鸏",
	"měng":"黾冡勐猛黽锰艋蜢瞢懜懞蟒錳懵蠓鯭矒鼆",
	"mèng":"孟梦夢夣懜霥癦",
	"mī":"咪瞇",
	"mí":"冞祢迷袮猕谜蒾詸摵瞇謎醚彌擟瞴縻藌麊麋麿檷禰靡瀰獼蘪麛镾戂攠瓕蘼爢醾醿鸍釄",
	"mǐ":"米芈侎沵羋弭洣敉粎脒渳葞蔝銤彌濔孊攠灖",
	"mì":"冖糸汨沕宓怽枈觅峚祕宻密淧覔覓幂谧塓幎覛嘧榓滵漞熐蔤蜜鼏冪樒幦濗謐櫁簚羃",
	"mián":"宀芇杣眠婂绵媔棉綿緜臱蝒嬵檰櫋矈矊矏",
	"miǎn":"丏汅免沔黾勉眄娩莬偭冕勔渑喕媔愐湎睌缅葂黽絻腼澠緬靦鮸",
	"miàn":"靣面牑糆麫麪麺麵",
	"miāo":"喵",
	"miáo":"苗媌描瞄鹋嫹緢鶓",
	"miǎo":"厸仯劰杪眇秒淼渺缈篎緲藐邈",
	"miào":"妙庙玅竗庿缪廟繆",
	"miē":"乜吀咩哶孭",
	"mié":"",
	"miè":"灭烕眜覕搣滅蔑薎鴓幭懱瀎篾櫗簚礣蠛衊鑖鱴",
	"mín":"民忟垊姄岷忞怋旻旼玟苠珉盿砇罠崏捪渂琘琝缗暋瑉痻碈鈱緍緡賯錉鴖鍲",
	"mǐn":"皿冺刡忟闵呡忞抿泯黾勄敃闽悯敏笢笽惽湏湣閔黽愍敯暋僶閩慜憫潣簢鳘蠠鰵",
	"míng":"名明鸣洺眀茗冥朙眳铭鄍嫇溟猽蓂詺暝榠銘鳴瞑螟覭",
	"mǐng":"佲姳凕嫇慏酩",
	"mìng":"命掵",
	"miǔ":"",
	"miù":"谬缪繆謬",
	"mō":"摸嚤",
	"mó":"庅尛谟嫫馍摹膜骳麽麼魹橅糢嬤嬷謨謩擵饃蘑髍魔劘戂攠饝",
	"mǒ":"懡",
	"mò":"末圽沒妺帓殁歿歾沫茉陌帞昩枺狢皌眜眿砞秣莈眽絈袹絔蛨貃嗼塻寞漠獏蓦貈貊貉銆靺墨嫼瘼瞐瞙镆魩黙縸默瀎貘嚜藦蟔鏌爅驀礳纆耱",
	"mōu":"哞",
	"móu":"牟侔劺呣恈敄桙眸谋堥蛑缪踎謀繆鍪鴾麰鞪",
	"mǒu":"厶某",
	"mòu":"",
	"mú":"毪氁",
	"mǔ":"母亩牡坶姆拇畂峔牳畆畒胟娒畝畞砪畮鉧踇",
	"mù":"木仫目凩朷牟沐狇坶炑牧苜毣莯蚞钼募雮墓幙幕慔楘睦鉬慕暯暮缪樢艒霂穆縸繆鞪",
	"n":"",
	"ń":"唔嗯",
	"ň":"嗯",
	"na":"",
	"nā":"",
	"ná":"秅拏拿挐嗱蒘搻誽镎鎿",
	"nǎ":"乸雫",
	"nà":"吶妠抐纳肭郍衲钠納袦捺笚笝豽軜貀鈉蒳靹魶",
	"nái":"腉搱摨孻",
	"nǎi":"乃奶艿氖疓妳廼迺倷釢嬭",
	"nài":"佴奈柰耏耐萘渿鼐褦螚錼",
	"nān":"囝囡",
	"nán":"男抩枏侽柟娚畘莮喃遖暔楠諵難",
	"nǎn":"赧揇湳萳煵腩嫨蝻戁",
	"nàn":"妠婻諵難",
	"nāng":"儾囔",
	"náng":"乪涳搑憹嚢蠰饟馕欜饢",
	"nǎng":"搑擃瀼曩攮灢馕",
	"nàng":"儾齉",
	"nāo":"孬",
	"náo":"呶怓挠峱桡硇铙猱蛲詉碙摎撓嶩憹橈獶蟯夒譊鐃巎獿",
	"nǎo":"垴恼悩脑匘脳堖惱嫐瑙腦碯憹獶",
	"nào":"闹婥淖閙鬧臑",
	"ne":"",
	"né":"",
	"nè":"疒讷吶抐眲訥",
	"néi":"",
	"něi":"娞浽馁脮腇餒鮾鯘",
	"nèi":"內氝氞錗",
	"nèn":"恁媆嫩嫰",
	"néng":"",
	"něng":"螚",
	"nèng":"",
	"ńg":"唔嗯",
	"ňg":"嗯",
	"nī":"妮",
	"ní":"尼坭怩抳籾倪屔秜郳铌埿婗淣猊蚭棿蛪跜鈮聣蜺馜觬貎輗霓鲵鯢麑齯臡",
	"nǐ":"伱伲你拟妳抳狔苨柅婗掜旎晲棿孴儞儗隬懝擬濔薿檷聻",
	"nì":"屰氼伲抐昵胒逆匿眤秜堄惄嫟愵睨腻暱縌誽膩嬺",
	"niān":"拈蔫",
	"nián":"年秊哖姩秥粘溓鲇鮎鲶鵇黏鯰",
	"niǎn":"涊淰焾辇榐辗撚撵碾輦簐蹍攆蹨躎",
	"niàn":"卄廿念姩唸埝悥惗艌",
	"niáng":"娘嬢孃釀",
	"niǎng":"",
	"niàng":"酿醸釀",
	"niǎo":"鸟茑袅鳥嫋裊蔦樢嬝褭嬲",
	"niào":"脲",
	"niē":"捏揑",
	"nié":"苶",
	"niě":"",
	"niè":"乜帇圼峊枿陧涅痆聂臬啮掜菍隉敜湼嗫嵲踂噛摰槷踗踙銸镊镍嶭篞臲鋷錜颞蹑嚙聶鎳闑孼孽櫱籋蘖囁攝齧巕糱糵蠥鑈囐囓讘躡鑷顳钀",
	"nín":"囜恁脌您",
	"nǐn":"拰",
	"níng":"咛狞苧柠聍寍寕甯寗寜寧儜凝橣嚀嬣擰獰薴檸聹鑏鬡鸋",
	"nǐng":"擰矃",
	"nìng":"佞侫泞倿寍寕甯寗寜寧澝擰濘",
	"niū":"妞孧",
	"niú":"牜牛汼怓",
	"niǔ":"忸扭沑狃纽杻炄钮紐莥鈕靵",
	"niù":"抝",
	"nóng":"农侬哝浓脓秾農儂辳噥濃蕽檂燶禯膿癑穠襛譨醲欁鬞",
	"nǒng":"繷",
	"nòng":"挊挵癑齈",
	"nóu":"羺",
	"nǒu":"",
	"nòu":"搙槈耨獳檽鎒鐞",
	"nú":"奴伮孥帑驽笯駑",
	"nǔ":"伮努弩砮胬",
	"nù":"怒傉搙",
	"nuán":"奻渜",
	"nuǎn":"渜湪暖煖煗餪",
	"nuàn":"",
	"nuó":"挪梛傩橠難儺",
	"nuǒ":"袳袲",
	"nuò":"耎诺喏掿毭逽愞搙搦锘搻榒稬諾蹃糑鍩懧懦糥穤糯",
	"nǘ":"",
	"nǚ":"钕籹釹",
	"nǜ":"沑衂恧朒衄聏",
	"nüè":"虐婩硸瘧",
	"o":"筽",
	"ō":"喔噢",
	"ó":"哦",
	"ǒ":"嚄",
	"ò":"哦",
	"ou":"",
	"ōu":"讴吽沤欧殴瓯鸥區嘔塸漚歐毆熰甌膒鴎櫙藲謳鏂鷗",
	"óu":"",
	"ǒu":"吘禺偶腢嘔熰耦蕅藕",
	"òu":"怄沤嘔慪漚",
	"pā":"汃妑苩皅趴舥啪葩",
	"pá":"杷爬钯掱琶筢潖",
	"pǎ":"",
	"pà":"汃帊帕怕袙",
	"pāi":"拍",
	"pái":"俳徘猅棑牌箄輫簲簰犤",
	"pǎi":"廹",
	"pài":"沠哌派渒湃蒎鎃",
	"pān":"眅畨萠潘攀籓",
	"pán":"丬爿肨柈洀胖眫湴盘跘媻幋蒰搫槃盤磐縏膰磻蹒瀊蟠蹣鎜鞶",
	"pǎn":"坢盻",
	"pàn":"冸判沜拚泮炍肨叛牉盼胖畔聁袢詊溿頖鋬闆鵥襻鑻",
	"pāng":"乓汸沗胮雱滂膖霶",
	"páng":"厐夆尨彷庞逄庬趽舽嫎徬膀篣螃鳑龎龐鰟",
	"pǎng":"嗙耪覫",
	"pàng":"炐肨胖眫",
	"pāo":"抛拋脬萢藨穮",
	"páo":"咆垉庖狍炰爮瓟袍铇匏烰袌跁軳鉋鞄褜麃麅",
	"pǎo":"",
	"pào":"奅疱皰砲袌靤麭嚗礟礮",
	"pēi":"妚呸怌抷肧柸胚衃醅",
	"péi":"阫陪培婄毰赔锫裵裴賠錇",
	"pěi":"俖琣",
	"pèi":"伂妃沛犻佩帔姵斾柭旆浿珮配淠棑媐蓜辔馷嶏霈攈轡",
	"pēn":"噴濆歕",
	"pén":"瓫盆湓葐",
	"pěn":"呠翸",
	"pèn":"喯噴",
	"pēng":"亨匉怦抨泙恲胓砰梈烹硑絣軯剻閛漰嘭駍磞",
	"péng":"芃朋挷竼倗捀莑堋弸淜袶棚椖傰塜塳搒漨痭硼稝蓬鹏樥熢憉澎輣篣篷膨錋韸髼蟚蟛鬅纄蘕韼鵬騯鬔鑝",
	"pěng":"捧淎皏摓",
	"pèng":"掽椪碰閛槰踫磞",
	"pi":"榌",
	"pī":"丕伓伾妚批纰邳坯岯怶披抷枈炋狉狓砒悂秛秠紕铍陴旇翍耚豾釽鈚鉟銔磇駓髬噼錃錍魾憵礕礔鎞霹",
	"pí":"皮仳阰纰芘陂枇肶毘毗疲笓紕蚍郫铍啤埤崥猈蚾蚽豼焷琵禆脾腗裨鈹鲏罴膍蜱罷隦魮壀螕鮍篺螷貔鞞鵧羆朇鼙蠯",
	"pǐ":"匹庀疋仳圮吡苉悂脴痞銢嶏諀鴄擗噽癖嚭",
	"pì":"屁埤淠揊嫓媲睥潎稫僻澼嚊濞甓疈譬闢鷿鸊",
	"piān":"囨偏媥楄犏篇翩鍂鶣",
	"pián":"骈胼缏腁楩賆跰瑸緶骿蹁駢璸騈",
	"piǎn":"覑谝貵諞",
	"piàn":"猵骗魸獱騗騙",
	"piāo":"剽勡嘌嫖彯慓缥飘旚縹翲螵犥飃飄魒",
	"piáo":"嫖瓢薸闝",
	"piǎo":"莩殍缥瞟篻縹醥皫顠",
	"piào":"僄彯徱骠驃鰾",
	"piē":"氕覕潎撆暼瞥",
	"piě":"丿苤鐅",
	"piè":"嫳",
	"pīn":"拚姘拼砏礗穦馪驞",
	"pín":"玭贫娦貧琕嫔嬪薲嚬矉蘋蠙颦顰",
	"pǐn":"品榀",
	"pìn":"牝汖聘",
	"pīng":"乒甹俜娉涄砯聠艵頩",
	"píng":"平评凭呯坪岼泙郱帡庰枰洴玶胓荓瓶帲淜硑萍蚲塀幈焩甁缾蓱蛢評馮軿鲆凴竮鉼慿箳輧憑鮃檘簈蘋",
	"pǐng":"屛",
	"pìng":"",
	"pō":"钋陂坡岥泺泼釙翍颇溌酦頗潑醗濼醱鏺",
	"pó":"婆嘙搫蔢鄱皤櫇嚩",
	"pǒ":"叵尀钷笸鉕箥駊髲",
	"pò":"廹岶敀昢洦珀哱烞砶破粕奤湐猼蒪魄",
	"pōu":"抙剖娝捊",
	"póu":"抔抙垺捊掊裒箁",
	"pǒu":"咅哣婄掊棓犃",
	"pū":"攵攴扑抪炇柨陠痡秿噗撲潽鋪鯆",
	"pú":"圤匍捗莆菩菐葡蒲蒱僕箁酺墣獛璞濮瞨穙镤贌纀鏷",
	"pǔ":"圃埔浦烳普圑溥暜谱諩擈樸氆檏镨譜蹼鐠",
	"pù":"痡舗舖鋪曝",
	"qi":"啐",
	"qī":"七迉沏恓柒倛凄桤郪娸悽戚捿桼淒萋喰攲敧棲欹欺紪缉傶褄僛嘁墄慽榿漆緀慼緝諆踦螇霋蹊魌鏚鶈",
	"qí":"丌亓伎祁圻岓岐忯芪亝斉歧畁祇祈肵俟疧荠剘斊旂竒耆脐蚔蚑蚚陭颀埼崎帺掑淇猉畦萁萕跂軝釮骐骑嵜棊棋琦琪祺蛴隑愭碁碕稘褀锜頎鬿旗粸綥綨綦蜝蜞齊璂禥蕲觭螧錡鲯懠濝薺藄鄿檱櫀簯簱臍騎騏鳍蘄鯕鵸鶀麒籏艩蠐鬐騹鰭玂麡",
	"qǐ":"乞邔企屺芑启呇杞玘盀唘豈起啔啓啟婍梩绮袳跂晵棨綮綺諬闙",
	"qì":"气讫忔扱気汔迄呚弃汽矵芞亟呮泣炁盵咠洓竐栔欫氣訖唭焏夡愒棄湆湇葺滊碛摖暣甈碶噐憇槭趞器憩磜磧磩藒礘罊蟿鐑",
	"qiā":"抲掐袷揢葜擖",
	"qiá":"",
	"qiǎ":"拤峠跒酠鞐",
	"qià":"圶冾匼咭帢恰洽胢殎硈愘磍髂",
	"qiān":"千仟阡圱圲奷扦汘芊迁佥岍杄汧茾欦竏臤钎拪牵粁悭挳蚈谸婜孯牽釺掔谦鈆僉愆签鉛骞鹐慳搴摼撁厱磏諐遷鳽褰謙顅檶攐攑櫏簽鏲鵮孅攓騫籖鬜鬝籤韆",
	"qián":"仱岒忴扲拑玪乹前炶荨钤歬虔蚙钱钳偂掮揵軡亁媊朁犍葥鈐煔鉗墘榩箝銭撍潛潜羬蕁橬錢黔鎆黚騝濳騚灊鰬",
	"qiǎn":"凵肷唊淺嵰遣槏膁蜸谴缱繾譴鑓",
	"qiàn":"欠刋伣芡俔茜倩悓堑掅傔棈椠欿嗛慊皘蒨塹歉綪蔳儙槧篏輤篟壍嬱縴",
	"qiāng":"羌戕戗斨枪玱矼羗猐啌跄嗴椌溬獇腔嗆搶蜣锖嶈戧摤槍牄瑲羫锵篬謒蹌蹡鎗鏘鏹鶬",
	"qiáng":"強墙嫱蔷樯漒蔃墻嬙廧彊薔檣牆艢蘠",
	"qiǎng":"強羟搶羥墏彊繈襁镪繦鏹",
	"qiàng":"戗炝唴跄嗆戧摪熗羻",
	"qiāo":"帩硗郻喿嵪煍跷鄥鄡劁勪幓敲毃踍锹墝碻磝頝骹墽幧橇燆缲橾磽鍬鍫礉繑繰趬蹺蹻鏒鐰",
	"qiáo":"乔侨峤荍荞桥硚菬喬睄僑摮槗谯嘺墧嫶嶠憔潐蕎鞒樵橋燋犞癄瞧礄翹櫵藮譙趫鐈鞽顦",
	"qiǎo":"丂巧釥愀髜",
	"qiào":"诮陗峭窍偢殻殼誚髚僺嘺撬箾噭撽鞘韒礉竅翹鞩躈",
	"qiē":"苆",
	"qié":"癿伽茄聺",
	"qiě":"",
	"qiè":"厒妾怯疌郄匧窃悏挈栔洯帹惬淁笡愜椄猰蛪趄跙嗛慊朅稧箧锲篋踥穕鍥鯜竊籡",
	"qīn":"兓侵钦衾骎菳媇嵚欽嵰綅誛嶔親顉駸鮼寴",
	"qín":"庈忴扲芩芹肣矜埐珡矝秦耹菦蚙捦菳琴琹禽覃鈙鈫雂勤嗪嫀溱靲廑慬噙嶜擒斳鳹懄檎澿瘽螓懃蠄鵭",
	"qǐn":"坅昑笉梫赾寑锓寝寖寢鋟螼",
	"qìn":"吢吣抋沁唚菣揿搇撳寴瀙藽",
	"qīng":"靑青氢轻倾卿郬圊埥寈氫淸清軽傾綪蜻輕錆鲭鯖鑋",
	"qíng":"夝甠剠勍啨情殑硘晴棾氰葝暒擏樈擎檠黥",
	"qǐng":"苘顷请庼頃廎漀請檾謦",
	"qìng":"庆凊掅殸渹碃箐綮靘慶磬親儬濪罄櫦",
	"qiōng":"",
	"qióng":"卭邛宆穷穹茕桏惸琁筇笻赹焪焭琼舼蛬蛩煢熍睘跫銎瞏窮儝嬛憌橩璚藑瓊竆藭瓗",
	"qiòng":"",
	"qiū":"丘丠邱坵恘秌秋恷蚯媝湫萩楸湬塸蓲鹙篍緧蝵穐趥龜橚鳅蟗鞦鞧蘒鰌鰍鶖蠤龝",
	"qiú":"厹叴囚扏犰玌艽芁朹汓肍求虬泅牫虯俅觓訅訄酋唒浗紌莍逎逑釚梂殏毬球赇釻頄崷巯渞湭皳盚遒煪絿蛷裘巰觩賕璆蝤銶醔鮂鼽鯄鰽",
	"qiǔ":"搝糗",
	"qiù":"",
	"qū":"伹佉匤岖诎阹驱呿坥屈岴抾浀祛胠袪區焌紶蛆躯煀筁粬蛐詘趍嶇憈駆敺觑誳駈麹髷魼趨麯覰覷軀鶌麴黢覻驅鰸鱋",
	"qú":"佢劬斪朐胊菃衐鸲淭絇翑蚼葋軥蕖璖磲螶鴝璩翵蟝瞿鼩蘧忂灈戵欋氍爠籧臞癯欔蠷衢躣蠼鑺鸜",
	"qǔ":"苣取竘娶紶詓竬蝺龋齲",
	"qù":"去厺刞欪耝阒觑閴麮闃鼁覰覷覻",
	"quān":"奍弮悛圏棬椦箞鐉",
	"quán":"全权佺狋诠姾峑恮泉洤荃拳牷辁啳埢婘惓捲痊硂铨椦湶犈筌絟葲搼楾瑔觠詮跧輇蜷銓槫権踡縓醛駩闎鳈鬈騡孉巏鰁權齤矔蠸颧顴灥",
	"quǎn":"犭犬犮畎烇绻綣虇",
	"quàn":"劝牶勧韏勸灥",
	"quē":"炔缺缼蚗蒛阙闕",
	"qué":"瘸",
	"què":"汋却卻埆崅悫琷傕敠敪棤硞确阕塙搉皵碏阙鹊愨榷墧慤碻確趞燩闋礐闕鵲礭",
	"qūn":"夋囷逡箘歏",
	"qún":"宭峮帬裙羣群裠麇",
	"qǔn":"",
	"rán":"呥肰衻袇蚦袡蚺然髥嘫髯燃繎",
	"rǎn":"冄冉姌苒染珃媣蒅熯橪",
	"ràn":"",
	"rāng":"",
	"ráng":"穣儴勷瀼獽蘘禳瓤穰躟鬤",
	"rǎng":"壌壤攘爙纕",
	"ràng":"让懹譲讓",
	"ráo":"娆荛饶桡嬈蕘橈襓饒",
	"rǎo":"扰娆隢嬈擾",
	"rào":"绕遶穘繞",
	"ré":"捼",
	"rě":"喏惹",
	"rè":"热渃熱",
	"rén":"亻人仁壬忈朲忎秂芢魜銋鵀",
	"rěn":"忍荏栠栣荵秹菍棯稔綛躵銋",
	"rèn":"刃刄认仞仭讱屻岃扨纫妊杒牣纴肕轫韧饪祍姙紉衽紝訒軔梕袵釰釼絍腍鈓靱靭韌飪認餁",
	"rēng":"扔",
	"réng":"仍辸礽芿陾",
	"rì":"日驲囸氜衵釰釼鈤馹",
	"róng":"戎肜栄狨绒茙茸荣容峵毧烿傛媶嵘搑絨羢嫆嵤搈榵溶蓉榕榮熔瑢穁槦縙蝾褣镕螎融駥嬫嶸爃鎔瀜曧蠑",
	"rǒng":"冗宂坈傇軵縙氄",
	"ròng":"穃縙",
	"róu":"厹禸柔粈脜媃揉渘葇楺煣瑈腬糅蝚蹂輮鍒鞣瓇騥鰇鶔",
	"rǒu":"韖",
	"ròu":"肉宍楺譳",
	"rū":"嶿",
	"rú":"邚如吺侞帤茹挐桇袽铷渪筎蒘銣蕠蝡儒鴑嚅嬬孺濡獳薷鴽曘檽襦繻蠕颥醹顬鱬",
	"rǔ":"汝肗乳辱鄏擩",
	"rù":"入扖杁洳嗕媷溽缛蓐鳰褥縟",
	"ruán":"堧撋壖",
	"ruǎn":"阮朊软耎偄軟媆瑌腝碝緛輭檽瓀礝",
	"ruàn":"緛",
	"ruí":"苼桵甤緌蕤",
	"ruǐ":"惢蕋蕊橤繠壡蘃蘂",
	"ruì":"兊兌抐汭芮枘笍蚋锐瑞蜹睿銳鋭叡鏸",
	"rún":"瞤",
	"rǔn":"",
	"rùn":"闰润閏閠潤橍膶",
	"ruó":"挼捼",
	"ruò":"叒偌弱鄀婼渃焫楉嵶蒻箬篛爇鰙鰯鶸",
	"sa":"",
	"sā":"仨",
	"sǎ":"訯靸潵鞈攃灑躠纚",
	"sà":"卅泧钑飒脎萨鈒摋隡馺蕯颯薩櫒鏾",
	"sāi":"毢愢揌毸腮嘥噻鳃顋鰓",
	"sǎi":"嗮",
	"sài":"赛僿賽簺",
	"san":"壭",
	"sān":"三弎叁參叄叅毶毵厁毿犙鬖",
	"sǎn":"仐伞傘糁馓糝糤糣繖鏒鏾饊",
	"sàn":"俕帴閐潵",
	"sāng":"桒桑喪槡",
	"sǎng":"嗓搡磉褬颡鎟顙",
	"sàng":"喪",
	"sāo":"掻慅搔溞缫懆缲螦繅鳋颾騒繰騷鰠鱢",
	"sǎo":"埽掃嫂",
	"sào":"埽掃瘙懆氉矂髞",
	"sē":"閪",
	"sè":"色拺洓栜涩啬渋粣铯雭歮琗嗇瑟摵歰銫槭澁廧懎擌濇濏瘷穑薔澀璱瀒穡鎍繬穯轖鏼闟譅飋",
	"sēn":"森椮槮襂",
	"sěn":"",
	"sēng":"僧鬙",
	"sèng":"",
	"sī":"厶纟丝司糹糸私咝泀俬恖虒鸶偲傂媤愢斯絲缌蛳楒禗鉰飔凘厮禠罳蜤銯锶嘶噝廝撕澌磃緦蕬鋖燍螄鍶蟖蟴颸騦鯣鐁鷥鼶",
	"sí":"",
	"sǐ":"死愢",
	"sì":"巳亖四寺汜佀兕姒泤祀価孠杫泗饲驷俟娰枱柶洠牭洍涘肂飤梩笥耛耜釲竢覗嗣肆貄鈶鈻飴飼榹銉禩駟蕼儩騃瀃",
	"sōng":"忪枀松枩娀柗倯凇崧庺梥淞菘愡揔棇嵩硹憽濍檧鬆",
	"sóng":"",
	"sǒng":"怂悚捒耸竦傱愯楤嵷摗漎慫聳駷",
	"sòng":"吅讼宋诵送颂訟頌誦鎹餸",
	"sōu":"凁捒捜鄋嗖廀廋搜溲獀蒐蓃馊摉飕摗锼撨艘螋醙鎪餿颼颾鏉騪",
	"sǒu":"叜叟傁棷蓃嗾瞍擞薮擻藪櫢籔",
	"sòu":"欶嗽擞瘶擻",
	"sū":"甦酥稡稣窣穌鯂蘇蘓櫯囌",
	"sú":"圱俗",
	"sǔ":"",
	"sù":"玊夙诉泝肃洬涑珟素莤速埣梀殐粛骕傃棴粟訴谡嗉塑塐嫊愫溯溸肅遡鹔僳愬摵榡膆蔌觫趚遬憟樕樎潥碿鋉餗潚縤橚璛簌縮藗謖蹜驌鱐鷫",
	"suān":"狻痠酸",
	"suǎn":"匴篹",
	"suàn":"祘笇筭蒜算",
	"suī":"夊芕虽倠哸娞浽荾荽眭毸滖睢缞嗺熣濉縗鞖雖",
	"suí":"绥隋随遀綏隨瓍髄",
	"suǐ":"膸瀡髓",
	"suì":"亗岁砕祟谇埣嵗遂歲歳煫睟碎隧嬘澻穂誶賥檖燧璲禭穗穟繀襚邃旞繐繸譢鐆鏸鐩韢",
	"sūn":"狲荪孫喰飧飱搎猻蓀槂蕵薞",
	"sǔn":"扻损笋隼筍損榫箰簨鎨鶽",
	"sùn":"摌",
	"suō":"唆娑挱莏莎傞挲桫梭睃嗍嗦羧蓑摍趖簑簔縮鮻",
	"suó":"",
	"suǒ":"所乺唢索琑琐嫅惢锁嗩暛溑獕瑣褨璅縒鎍鎖鎻鏁",
	"suò":"逤溹蜶",
	"shā":"杀杉纱乷剎砂唦挱殺猀粆紗莎挲桬毮铩痧硰摋蔱裟榝樧魦鲨閷髿鎩鯊鯋繺",
	"shá":"啥",
	"shǎ":"傻儍",
	"shà":"倽唼啑帹菨萐喢嗄廈歃翜歰箑翣濈閯霎",
	"shāi":"筛篩諰簁簛籭",
	"shǎi":"摋",
	"shài":"晒攦曬",
	"shān":"山彡邖圸删刪杉芟姍姗衫钐埏挻柵炶狦珊舢痁脠軕笘釤閊傓跚剼搧煔嘇幓煽潸澘穇檆縿膻鯅羴羶",
	"shán":"",
	"shǎn":"闪陕炶陝閃閄晱煔睒摻熌覢",
	"shàn":"讪汕姍姗疝钐剡訕赸掞釤善單椫禅銏骟僐鄯儃墡墠撣潬缮嬗嶦擅敾樿歚禪膳磰謆赡繕蟮蟺譱贍鐥饍騸鳝鳣灗鱓鱔",
	"shang":"",
	"shāng":"伤殇商愓湯觞傷禓墒慯滳漡蔏殤熵螪觴謪鬺",
	"shǎng":"垧扄晌埫赏樉賞鋿鏛贘鑜",
	"shàng":"丄尙尚恦绱緔鞝",
	"shāo":"娋弰烧莦焼萷旓筲艄輎蕱燒鞘髾鮹",
	"sháo":"勺芍杓苕柖玿韶",
	"shǎo":"",
	"shào":"佋劭卲邵绍柖哨娋袑紹睄綤潲",
	"shē":"奓奢猞赊畭畬畲輋賒賖檨",
	"shé":"舌佘虵阇揲蛥闍磼",
	"shě":"舍捨",
	"shè":"厍设社泏舎舍厙挕涉涻渉設赦弽慑摂滠慴蔎歙蠂韘騇懾攝灄麝欇",
	"shéi":"誰",
	"shēn":"申屾扟伸身侁冞呻妽籶绅罙诜姺柛氠珅穼籸娠峷甡眒砷莘參叄堔敒深紳兟叅棽葠裑訷嫀搷罧蓡詵幓甧糁蔘糂燊薓駪鲹曑糝糣鯓鵢鯵鰺",
	"shén":"神榊鉮鰰",
	"shěn":"邥吲弞抌审矤哂矧宷谂谉婶淰渖訠棯審諗頣魫曋瞫嬸瀋覾讅",
	"shèn":"肾侺昚胂涁眘渗祳脤谌腎葚愼慎椹瘆蜄蜃滲鋠瘮黮",
	"shēng":"升生阩呏声斘昇枡泩狌苼殅牲珄竔陞曻陹殸笙湦焺甥鉎聲鍟鼪鵿",
	"shéng":"渑绳憴澠縄繉繩譝",
	"shěng":"眚偗渻",
	"shèng":"圣乗娍胜晠晟剰剩勝椉貹嵊琞聖墭榺蕂橳賸",
	"shi":"辻籂",
	"shī":"尸失师厔呞虱诗邿鸤屍施浉狮師絁釶湤湿葹溮溼獅蒒蓍詩鉇嘘瑡酾鳲噓箷蝨鳾褷鲺濕鍦鯴鰤鶳襹釃",
	"shí":"十饣乭时竍実实旹飠姼峕炻祏蚀埘宲時莳寔湜遈塒嵵溡蒔鉐實榯碩蝕鲥鮖鼫識鼭鰣",
	"shǐ":"史矢乨豕使始驶兘宩屎狶痑笶榁鉂駛",
	"shì":"士礻丗世仕市示卋式忕亊忯戺事侍势呩柹视试饰冟咶室峙恀恃拭昰是枾柿狧眂贳适栻烒眎眡耆舐莳轼逝铈啫埶畤秲視釈崼崻弑徥惿揓谥貰释勢嗜弒楴煶睗筮蒔觢試軾鈰鉃飾舓誓適鉽馶奭銴餝餙噬嬕澨澤諡諟遾檡螫謚簭襫醳釋鰘",
	"shōu":"収收敊",
	"shóu":"熟",
	"shǒu":"扌手守垨首艏",
	"shòu":"寿受狩兽售授涭绶痩膄壽夀瘦綬嘼獣獸鏉",
	"shū":"书殳疋忬抒纾叔杸枢陎姝倐倏捈書殊紓婌悆掓梳淑焂菽軗鄃琡疎疏舒摅毹毺綀输瑹跾踈樞緰蔬輸橾鮛儵攄瀭鵨",
	"shú":"朮尗秫孰赎蒣塾熟璹贖",
	"shǔ":"鼡暏暑稌黍署蜀鼠數潻薥薯曙癙藷襡糬襩屬籔蠴鱪鱰",
	"shù":"朮戍束沭述侸俞兪咰怸怷树竖荗恕捒庻庶絉蒁術隃尌裋竪腧鉥墅漱潄數澍豎樹濖錰霔鏣鶐虪",
	"shuā":"唰",
	"shuǎ":"耍",
	"shuà":"誜",
	"shuāi":"缞摔縗",
	"shuǎi":"甩",
	"shuài":"帅帥蟀卛",
	"shuān":"闩拴閂栓絟",
	"shuàn":"涮腨槫",
	"shuāng":"双泷霜雙孀瀧骦孇騻欆礵鷞鹴艭驦鸘",
	"shuǎng":"爽塽慡漺縔鏯",
	"shuàng":"灀",
	"shuí":"谁脽誰",
	"shuǐ":"氵水氺閖",
	"shuì":"帨挩捝涗涚娷祱稅税裞睡說説",
	"shǔn":"吮楯",
	"shùn":"顺眴舜順蕣橓瞚瞤瞬鬊",
	"shuō":"說説",
	"shuò":"妁洬烁朔铄欶矟搠蒴銏愬槊獡碩數箾鎙爍鑠",
	"ta":"侤",
	"tā":"他它牠祂趿铊塌榙溻鉈褟闧",
	"tá":"",
	"tǎ":"塔溚墖獭鮙鳎獺鰨",
	"tà":"沓挞狧闼粏崉涾傝嗒搨遝遢阘榻毾漯禢撻澾誻踏鞈嚃橽錔濌蹋鞜鎉鎑闒鞳蹹躂嚺闟闥譶躢",
	"tāi":"囼孡珆胎",
	"tái":"旲邰坮抬骀枱炱炲菭跆鲐箈臺颱駘儓鮐嬯擡薹檯斄籉",
	"tǎi":"奤",
	"tài":"太冭夳忕汏忲汰汱态肽钛泰舦酞鈦溙態燤",
	"tān":"坍贪怹啴痑舑貪摊滩嘽潬瘫擹攤灘癱",
	"tán":"坛昙倓谈郯埮婒惔弾覃榃痰锬谭嘾墰墵彈憛潭談醈壇曇橝澹燂錟檀顃罈藫壜繵譚貚醰譠罎",
	"tǎn":"忐坦袒钽菼毯僋鉭嗿緂儃憳憻暺醓璮襢",
	"tàn":"叹炭倓埮探傝湠僋嘆碳舕歎",
	"tāng":"铴湯嘡劏羰蝪薚镗蹚鏜闛鞺鼞",
	"táng":"坣唐堂傏啺愓棠鄌塘嵣搪溏蓎隚榶漟煻瑭禟膅樘磄糃膛橖篖糖螗踼糛螳赯醣鎕餹鏜闛饄鶶",
	"tǎng":"伖帑偒傥耥躺镋鎲儻戃灙曭爣矘钂",
	"tàng":"烫铴摥燙鐋",
	"tāo":"夲夵弢抭涛绦掏涭絛詜嫍幍慆搯滔槄瑫韬飸縚縧濤謟轁鞱韜饕",
	"táo":"匋迯咷洮逃桃陶啕梼淘绹萄祹裪綯蜪鞀醄鞉鋾駣檮饀騊鼗",
	"tǎo":"讨討",
	"tào":"套",
	"tè":"忑忒特脦犆铽慝鋱蟘",
	"tēng":"熥膯鼟",
	"téng":"疼痋幐腾誊漛滕邆縢螣駦謄儯藤騰籐鰧籘虅驣",
	"tèng":"霯",
	"tī":"剔梯锑踢銻擿鷉鷈體",
	"tí":"苐厗荑桋绨偍珶啼媂媞崹惿渧稊缇罤遆鹈嗁瑅禔綈睼碮褆徲漽磃緹蕛题趧蹄醍謕蹏鍗鳀題鮷鵜騠鯷鶗鶙禵鷤",
	"tǐ":"挮徥躰骵醍軆體",
	"tì":"戻奃屉剃朑俶倜悌挮涕眣绨逖啑屜悐惕掦笹逷屟惖揥替棣綈裼褅歒殢髰薙嚏鬀嚔瓋鬄籊趯",
	"tiān":"天兲呑婖添酟靔黇靝",
	"tián":"田屇沺恬畑畋盷胋钿甛甜菾湉塡搷阗瑱碵緂磌窴鴫璳闐鷆鷏",
	"tiǎn":"奵忝殄倎栝唺悿淟紾铦晪琠腆觍痶睓舔銛餂覥賟銽錪",
	"tiàn":"掭菾琠瑱舚",
	"tiāo":"旫佻庣恌條祧聎",
	"tiáo":"芀朷岧岹苕迢祒條笤萔铫蓚蓨蓧龆樤蜩銚調鋚鞗髫鲦鯈鎥齠鰷",
	"tiǎo":"宨晀朓脁窕誂斢窱嬥",
	"tiào":"啁眺粜絩覜趒糶",
	"tiē":"怗贴萜聑貼跕",
	"tié":"",
	"tiě":"铁蛈鉄僣銕鐡鐵驖",
	"tiè":"呫飻餮",
	"tīng":"厅庁汀听庍耓厛烃桯烴渟綎鞓聴聼廰聽廳",
	"tíng":"邒廷亭庭莛停婷嵉渟筳葶蜓楟榳閮霆聤蝏諪鼮",
	"tǐng":"圢甼町侹侱娗挺涏梃烶珽脡铤艇颋誔鋌閮頲",
	"tìng":"忊梃濎",
	"tōng":"囲炵通痌絧嗵蓪樋",
	"tóng":"仝佟彤侗峂庝哃垌峒峝狪茼晍桐浵烔砼蚒偅痌眮秱铜硧童粡絧詷赨酮鉖僮勭鉵銅餇鲖潼獞曈朣橦氃燑犝膧瞳穜鮦",
	"tǒng":"侗统捅桶筒統筩綂",
	"tòng":"恸痛衕慟憅",
	"tou":"",
	"tōu":"偸偷婾媮緰鋀鍮",
	"tóu":"亠投骰頭",
	"tǒu":"妵紏敨飳斢黈蘣",
	"tòu":"透埱",
	"tu":"汢",
	"tū":"凸宊禿秃怢突涋捸堗湥痜葖嶀鋵鵚鼵",
	"tú":"図图凃峹庩徒悇捈涂荼莵途啚屠梌菟揬稌趃塗嵞瘏筡腯蒤鈯圗圖廜摕潳瑹跿酴墿馟檡鍎駼鵌鶟鷋鷵",
	"tǔ":"土圡钍唋釷",
	"tù":"兎迌兔唋莵堍菟鋀鵵",
	"tuān":"湍猯圕煓貒",
	"tuán":"団团抟剸團塼慱摶漙槫篿檲鏄糰鷒鷻",
	"tuǎn":"畽墥疃",
	"tuàn":"彖湪猯褖貒",
	"tuī":"忒推蓷藬讉",
	"tuí":"弚颓僓隤墤尵橔頺頹頽魋穨蘈蹪",
	"tuǐ":"俀聉腿僓蹆骽",
	"tuì":"侻退娧煺蛻蜕螁駾",
	"tūn":"吞呑旽涒啍朜焞噋憞暾",
	"tún":"坉庉忳芚饨蛌豘豚軘飩鲀魨霕黗臀臋",
	"tǔn":"氽",
	"tùn":"",
	"tuō":"乇仛讬托扡汑饦杔侂咃咜拕拖沰挩捝莌袉袥託啴涶脫脱飥馲魠鮵",
	"tuó":"阤驮佗陀陁坨岮沱沲狏驼侻柁砤砣袉铊鸵紽堶媠詑跎酡碢鉈馱槖駄鋖駞駝橐鮀鴕鼧騨鼍驒驝鼉",
	"tuǒ":"彵妥庹椭楕嫷撱橢鵎鰖",
	"tuò":"杝柝毤唾涶萚跅毻嶞箨蘀籜",
	"wa":"哇",
	"wā":"屲穵呙劸咼哇徍挖洼娲畖窊唲啘媧窐嗗瓾蛙搲溛漥窪鼃攨韈",
	"wá":"娃",
	"wǎ":"佤邷咓砙瓸搲",
	"wà":"帓袜婠聉嗢搲腽膃韎襪韤",
	"wai":"",
	"wāi":"呙咼歪喎竵瀤",
	"wǎi":"崴",
	"wài":"外顡",
	"wān":"毌夗弯剜埦婠帵捥塆湾睕蜿潫豌鋺彎壪灣",
	"wán":"丸刓汍纨芄完岏忨抏杬玩笂紈捖蚖顽烷琓貦頑翫",
	"wǎn":"夘夗倇唍挽盌莞莬埦婉惋捥晚晥梚涴绾脘菀萖惌晩晼椀琬皖畹碗箢綩綰輓踠鋔鋺",
	"wàn":"卍卐妧杤捥脕掔腕萬絻綄輐槾澫鋄瞣薍錽蟃贃鎫贎",
	"wāng":"尣尫尪汪尩瀇",
	"wáng":"亾兦仼莣蚟朚",
	"wǎng":"罓罒网彺忹抂徃往枉罖罔迬惘菵暀棢蛧辋網蝄誷輞瀇魍",
	"wàng":"妄忘迋旺盳徍望暀朢",
	"wēi":"厃危威倭烓偎逶隇隈喴媙崴嵔愄揋揻葨葳微椳楲溦煨詴蜲縅蝛覣嶶薇燰鳂癐癓巍鰃鰄霺",
	"wéi":"囗韦圩囲围帏沩违闱隹峗峞洈為韋桅涠唯帷惟硙维喡圍媁嵬幃湋溈爲琟違潍維蓶鄬撝潙潿醀濰鍏闈鮠壝矀覹犩欈",
	"wěi":"伟伪纬芛苇炜玮洧娓屗捤浘荱诿偉偽唩崣捼梶痏硊萎隗骩媁嵔廆徫愇渨猥葦蒍骫骪暐椲煒瑋痿腲艉韪僞嶉撱碨磈鲔寪緯蔿諉踓韑頠薳儰濻鍡鮪瀢韙颹韡亹瓗斖",
	"wèi":"卫未位味苿為畏胃叞軎猚硙菋谓喂喡媦渭爲猬煟墛瞆碨蔚蜼慰熭犚磑緭蝟衛懀罻衞謂餧鮇螱褽餵魏藯轊鏏霨鳚蘶饖瓗讆躗讏躛",
	"wēn":"昷塭温缊榅殟溫瑥辒韫榲瘟緼縕豱輼轀鎾饂鳁鞰鰛鰮",
	"wén":"文彣芠炆玟闻紋蚉蚊珳阌雯瘒聞馼駇魰鳼鴍螡閺閿蟁闅鼤繧闦",
	"wěn":"伆刎吻呅忟抆呡忞歾肳紊桽脗稳穏穩",
	"wèn":"问妏汶紋莬問渂揾搵絻顐璺",
	"wēng":"翁嗡滃鹟聬螉鎓鶲",
	"wěng":"勜奣塕嵡滃蓊暡瞈攚",
	"wèng":"瓮蕹甕罋齆",
	"wō":"挝倭莴唩涹渦猧萵喔窝窩蜗撾濄緺蝸踒薶",
	"wǒ":"呙我咼婑婐捰",
	"wò":"仴沃肟卧枂臥偓捾涴媉幄握渥焥硪楃腛斡瞃濣瓁臒龌馧龏齷",
	"wū":"乌圬弙扜扝汚汙污邬呜巫杅杇於屋洿诬钨烏剭窏釫惡鄔嗚誈僫歍誣箼鋘螐鴮鎢鰞",
	"wú":"无毋吳吴吾呉芜郚唔娪峿洖浯茣莁梧珸祦無铻鹀蜈墲蕪鋙鋘橆璑蟱鯃鵐譕鼯鷡",
	"wǔ":"乄五午仵伍妩庑忤怃迕旿武玝侮倵娒捂逜陚啎娬牾堥珷摀碔鹉熓瑦舞嫵廡憮潕儛甒膴瞴鵡躌",
	"wù":"兀勿务戊阢屼扤坞岉杌沕芴忢旿物矹俉卼敄柮误務唔娪悟悞悮粅趶晤焐婺嵍惡渞痦隖靰骛塢奦嵨溩雺雾僫寤熃誤鹜鋈窹霚鼿霧齀蘁騖鶩",
	"xī":"夕兮邜吸忚扱汐西希扸卥昔析矽穸肸肹俙咥咭徆怸恓诶郗饻唏奚娭屖息悕氥浠牺狶莃唽悉惜晞桸欷淅渓烯焁焈琋硒羛菥赥釸傒惁晰晳焟焬犀睎稀粞翖翕舾鄎厀嵠徯溪煕皙碏蒠裼锡僖榽熄熈熙獡緆蜥覡誒豨閪餏嘻噏嬆嬉嶲憘潝瘜磎膝凞暿樨橀歙熻熺熹窸羲螅螇錫燨犠瞦礂蟋豀谿豯貕蹊巂糦繥釐雟鯑鵗觹譆醯鏭鐊隵嚱巇曦爔犧酅饎觽鼷蠵鸂觿鑴",
	"xí":"习郋席習袭觋雭喺媳椺蒵蓆嶍漝趘槢薂隰檄謵鎴霫鳛飁騱騽鰼襲驨",
	"xǐ":"杫枲玺徙喜葈葸鈢鉩鉨屣漇蓰銑憘憙暿橲歖禧諰壐縰謑鳃蟢蹝釐璽鰓瓕鱚囍矖纚躧",
	"xì":"匸卌扢屃忾饩呬忥怬细郄钑係恄欪盻郤屓欯绤細釳阋傒摡椞舃舄趇隙愾慀滊禊綌蒵赩隟墍熂犔稧戯潟澙蕮覤戱縘黖戲磶虩餼鬩繫闟霼屭衋",
	"xiā":"呷虲疨虾谺傄閕煆颬瘕瞎蝦鰕",
	"xiá":"匣侠狎俠峡柙炠狭陜埉峽烚狹珨祫捾硖笚翈舺陿徦硤遐敮暇瑕筪舝瘕碬辖磍蕸縖螛赮魻轄鍜霞鎋黠騢鶷",
	"xiǎ":"閕閜",
	"xià":"丅下乤圷芐疜夏梺廈睱諕嚇懗罅夓鎼鏬",
	"xiān":"仚仙屳先奾佡忺氙杴欦祆秈苮姺枮籼珗莶掀铦搟綅跹酰锨僊僲嘕摻銛暹銽韯嬐憸薟鍁繊褼韱鮮蹮馦孅廯攕醶纎鶱襳躚纖鱻",
	"xián":"伭咞闲咁妶弦臤贤咸唌挦涎玹盷胘娴娹婱絃舷蚿衔啣湺痫蛝閑閒鹇嗛嫌溓衘甉銜嫻嫺憪撏澖稴羬誸賢諴輱醎癇癎瞯藖礥鹹麙贒鑦鷴鷼鷳",
	"xiǎn":"彡冼狝显险崄毨烍猃蚬険赻筅尟尠搟禒蜆跣銑箲險嶮獫獮藓鍌鮮燹顕幰攇櫶蘚譣玁韅顯灦",
	"xiàn":"咞岘苋見现线臽限姭宪県陥哯垷娊峴涀莧軐陷埳晛現硍馅睍絤綖缐羡塪搚溓献粯羨腺僩僴槏綫誢憪撊線鋧憲橌橺縣錎餡壏懢豏麲瀗臔獻糮鏾霰鼸",
	"xiāng":"乡芗香郷厢啍鄉鄊廂湘缃萫葙鄕楿稥薌箱緗膷襄儴勷忀骧麘欀瓖镶鱜纕鑲驤",
	"xiáng":"夅瓨佭庠羏栙祥絴翔詳跭",
	"xiǎng":"享亯响蚃饷晑飨想銄餉鲞蠁鮝鯗響饗饟鱶",
	"xiàng":"向姠项珦象缿衖項像勨嶑潒銗閧曏橡襐闂嚮蟓鐌鱌",
	"xiāo":"灲灱呺枭侾哓枵骁宯宵庨消烋绡莦虓逍鸮婋梟焇猇萧痚痟睄硣硝窙翛销嗃揱綃蛸嘐歊潇熇箫踃嘵憢撨獟獢箾銷霄骹彇膮蕭颵魈鴞穘簘藃蟂蟏鴵嚣瀟簫蟰髇櫹嚻囂髐鷍蠨驍毊虈",
	"xiáo":"姣洨郩崤淆訤殽誵",
	"xiǎo":"小晓暁筱筿皛曉篠謏皢",
	"xiào":"孝効咲恔俲哮效涍笑啸傚敩殽嗃詨嘋嘨誟嘯薂歗熽斅斆",
	"xiē":"娎揳猲楔歇滊獦蝎蠍",
	"xié":"劦协旪協胁垥奊峫恊拹挾脇脅脋衺偕斜梋谐絜翓颉嗋愶慀搚携瑎綊熁膎鲑勰撷擕緳縀缬蝢鞋諧燲鮭嚡擷鞵儶襭孈攜讗龤",
	"xiě":"写冩寫藛",
	"xiè":"伳灺泻祄绁缷卸枻洩炨炧卨屑栧偞偰徢械烲焎禼紲亵媟屟渫絏絬谢僁塮觟觧榍榝榭褉靾噧寫屧暬樧碿緤嶰廨懈澥獬糏薤薢邂韰燮褻謝夑瀉鞢韘瀣爕繲蟹蠏齘齛纈齥齂躠躞",
	"xīn":"忄心邤妡忻辛昕杺欣盺俽莘惞訢鈊锌新歆廞鋅噺噷嬜薪馨鑫馫",
	"xín":"枔襑镡礥鐔",
	"xǐn":"伈",
	"xìn":"阠伩囟孞炘軐脪衅訫愖焮馸顖舋釁",
	"xīng":"狌星垶骍惺猩煋瑆腥觪箵篂興謃鮏曐觲騂皨鯹",
	"xíng":"刑邢饧巠形陉侀郉哘型洐荥钘陘娙硎铏鈃蛵滎鉶銒鋞餳",
	"xǐng":"睲醒擤",
	"xìng":"杏姓幸性荇倖莕婞悻涬葕睲緈鋞嬹臖",
	"xiōng":"凶匂兄兇匈芎讻忷汹哅恟洶胷胸訩詾賯",
	"xióng":"雄熊熋",
	"xiǒng":"焽焸",
	"xiòng":"诇詗夐敻",
	"xiū":"俢修咻庥烌烋羞脩脙鸺臹貅馐樇銝髤髹鎀鮴鵂鏅饈鱃飍",
	"xiú":"苬",
	"xiǔ":"朽滫潃糔",
	"xiù":"秀岫峀珛绣袖琇锈嗅溴綉璓褏褎銹螑嚊繍鏅繡鏥鏽齅",
	"xū":"圩戌旴姁疞盱欨砉胥须眗訏顼偦虗虚裇許谞媭揟欻湏湑虛須楈綇頊嘘墟稰蓲需魆噓嬃歔緰縃蕦蝑歘藇諝燸譃魖驉鑐鬚",
	"xú":"俆冔徐禑蒣",
	"xǔ":"呴姁诩浒栩珝喣湑蛡暊詡滸稰鄦糈諿醑盨",
	"xù":"旭伵序旴汿芧侐卹妶怴沀叙恓恤昫朐洫垿晇欰殈烅珬勗勖喐惐掝敍敘淢烼绪续蚼酗壻婿朂溆矞絮聓訹慉滀煦続蓄賉槒漵潊盢瞁緒聟蓿銊嘼獝稸緖藇藚續鱮",
	"xuān":"吅轩昍咺宣弲晅軒梋谖喧塇媗愃愋揎萲萱暄煊瑄蓒睻儇禤箮翧蝖鋗嬛懁蕿諠諼鞙駨鍹駽矎翾藼蘐蠉譞鰚讂",
	"xuán":"玄伭妶玹痃悬琁蜁嫙漩暶璇縣檈璿懸",
	"xuǎn":"咺选烜喛暅選癣癬",
	"xuàn":"怰泫昡炫绚眩袨铉琄眴衒渲絢楥楦鉉夐敻碹蔙镟颴縼繏鏇贙",
	"xuē":"疶蒆靴薛辥辪鞾",
	"xué":"穴斈乴学峃茓泶袕鸴敩踅噱壆學嶨澩燢觷鷽",
	"xuě":"彐雪樰膤艝轌鳕鱈",
	"xuè":"吷坹岤怴泬狘疦桖谑滈趐謔瞲瀥",
	"xūn":"坃勋埙焄勛塤煇窨勲勳薫嚑壎獯薰曛燻臐矄蘍壦爋纁醺",
	"xún":"廵寻巡旬杊畃询郇咰姰峋恂洵浔紃荀荨栒桪毥珣偱眴尋循揗詢鄩鲟噚潯蕁攳樳燅燖璕駨蟫蟳爓鱘鱏灥",
	"xùn":"卂训讯伨汛迅驯侚巺徇狥迿逊孫殉毥浚訊訓訙奞巽殾稄遜馴愻噀潠蕈濬爋顨鶽鑂",
	"ya":"",
	"yā":"丫圧吖亞庘押枒垭鸦桠鸭啞孲铔椏鴉錏鴨壓鵶鐚",
	"yá":"牙伢厑岈芽厓拁琊笌蚜堐崕崖涯猚釾睚衙漄齖",
	"yǎ":"疋厊庌挜疨唖啞掗痖雅瘂蕥",
	"yà":"劜圠轧亚冴襾覀讶亜犽迓亞玡軋姶娅挜砑俹氩埡婭掗訝铔揠氬猰聐圔椻稏碣窫潝磍壓瓛齾",
	"yān":"恹剦烟珚胭崦淊淹焑焉菸阉殗渰湮傿歅煙硽鄢嫣漹嶖樮醃橪閹閼嬮懨篶懕臙黫黰",
	"yán":"讠厃延闫严妍芫訁言岩昖沿炏炎郔唌埏姸娫狿莚娮梴盐啱琂硏訮閆阎喦嵓嵒筵綖蜒塩揅楌詽碞蔅羬颜厳虤閻檐顏顔嚴壛巌簷櫩壧巖巗欕礹鹽麣",
	"yǎn":"夵抁沇乵兖俨兗匽弇衍剡偃厣掞掩眼萒郾酓隁嵃愝扊揜晻棪渰渷琰遃隒椼硽罨裺演褗戭窴蝘魇噞嬐躽縯檿黡厴甗鰋鶠黤儼黬黭龑孍顩鼴巘巚曮魘鼹礹齴黶",
	"yàn":"厌妟觃牪匽姲彥彦洝砚唁宴晏烻艳覎验偐掞焔猏硏谚隁喭堰敥棪殗焱焰猒硯雁傿椻溎滟豣鳫厭墕暥熖酽鳱嬊谳餍鴈燄諺赝鬳嚈嬮曕鴳酀騐験嚥嬿艶贋軅曣爓醶騴齞鷃灔贗囐觾讌醼饜驗鷰艷灎釅驠灧讞豓豔灩",
	"yāng":"央姎抰泱柍殃胦眏秧鸯鉠雵鞅鍈鴦",
	"yáng":"扬阦阳旸杨炀玚飏佯劷氜疡钖垟徉昜洋羏烊珜眻陽婸崵崸愓揚蛘敭暘楊煬瑒禓瘍諹輰鍚鴹颺鰑霷鸉",
	"yǎng":"卬佒咉坱岟养柍炴氧眏痒紻傟勜楧軮慃氱蝆飬養駚懩攁瀁癢礢",
	"yàng":"怏柍恙样烊羕楧詇煬様漾鞅樣瀁",
	"yāo":"幺夭吆妖枖殀祅約訞喓葽楆腰鴁撽邀鴢",
	"yáo":"爻尧匋尭肴垚姚峣恌轺倄烑珧皐窕窑铫隃傜堯揺殽谣軺嗂媱徭愮搖摇滧猺遙遥僥摿暚榣瑤瑶銚飖餆嶢嶤徺磘窯窰餚繇謡謠鎐鳐颻蘨邎顤鰩鱙",
	"yǎo":"仸宎岆抭杳枖狕苭咬柼眑窅窈舀偠婹崾溔蓔榚闄騕齩鷕",
	"yào":"怮穾药烄袎窔筄葯詏愮熎瘧覞靿樂獟箹鹞薬鼼曜燿艞藥矅耀纅鷂讑",
	"ye":"亪",
	"yē":"吔耶倻椰暍歋窫噎潱擨蠮",
	"yé":"爷耶峫捓揶铘爺瑘釾鋣鎁",
	"yě":"也冶埜野嘢漜壄",
	"yè":"业曳页曵邺夜抴亱拽枼洂頁捙晔枽烨液焆谒堨揲殗腋葉墷楪業煠痷馌僷曅燁璍擖擛曄皣瞱緤鄴靥嶪嶫澲謁餣擫曗瞸鍱擪爗礏鎑饁鵺鐷靨驜瓛鸈",
	"yi":"弬",
	"yī":"一乊弌辷衤伊衣医吚壱依祎咿洢悘渏猗畩郼铱壹揖蛜禕嫛漪稦銥嬄撎噫夁瑿鹥繄檹毉醫黟譩鷖黳",
	"yí":"乁仪匜圯夷彵迆冝宐杝沂诒侇宜怡沶狏狋迤迱饴咦姨峓恞拸柂洟珆瓵荑贻迻宧巸扅栘桋眙胰袘貤痍移萓釶椬羠蛦詒貽遗媐暆椸煕誃跠頉颐飴儀熪箷遺嶬彛彜螔頥頤寲嶷簃顊鮧鴺彞彝謻鏔籎觺讉",
	"yǐ":"乚乛乙已以扡迆钇佁攺矣苡叕苢迤迱庡舣蚁釔倚扆笖逘酏偯猗崺攲敧旑鈘鉯鳦裿旖輢嬟敼螘檥礒艤蟻顗轙齮",
	"yì":"乂义亿弋刈忆艺仡匇肊艾议阣亦伇屹异忔芅伿佚劮呓坄役抑杙耴苅译邑佾呭呹妷峄怈怿易枍欥泆炈秇绎衪诣驿俋奕帟帠弈昳枻浂玴疫羿轶唈垼悒挹栺栧欭浥浳益袘袣谊貤勚埶埸悘悥掜殹異羛翊翌萟訳訲豙豛逸釴隿幆敡晹棭殔湙焲焬蛡詍跇軼鄓鈠骮亄兿嗌意溢獈痬睪竩缢義肄裔裛詣勩嫕廙榏潩瘗膉蓺蜴駅億槸毅熠熤熼瘞篒誼镒鹝鹢黓儗劓圛墿嬑嶧憶懌曀殪澺燚瘱瞖穓縊艗薏螠褹寱懝斁曎檍歝燡燱翳翼臆貖鮨癔藝藙贀鎰镱繶繹豷霬鯣鶃鶂鶍瀷蘙議譯醳醷饐囈鐿鷁鷊懿襼驛鷧虉鸃鷾讛齸",
	"yīn":"囙因阥阴侌垔姻洇茵荫音骃栶欭氤陰凐秵裀铟陻隂喑堙婣愔湮筃絪歅溵禋蒑蔭慇瘖銦磤緸鞇諲霒駰噾濦闉霠齗韾",
	"yín":"冘乑伒吟圻犾苂斦烎垠泿圁峾狺珢荶訔訚唫婬寅崟崯淫訡银鈝龂滛碒鄞夤蔩銀龈噖殥璌誾嚚檭蟫霪齦鷣",
	"yǐn":"廴尹引吲饮粌蚓硍赺淾鈏飲隠靷飮朄輑磤趛檃瘾隱嶾濥縯螾檼蘟櫽癮讔",
	"yìn":"廴印茚洕胤荫垽梀堷湚猌飲廕隠飮窨酳慭癊憗憖隱鮣懚",
	"yīng":"応旲英柍荥偀桜珱莺啨婴媖愥渶绬朠楧焽焸煐瑛嫈碤锳嘤撄甇緓缨罂蝧賏樱璎噟罃褮霙鴬鹦嬰應膺韺甖鹰鶑鶧嚶孆孾攖瀴罌蘡譍櫻瓔礯譻鶯鑍纓蠳鷪軈鷹鸎鸚",
	"yíng":"夃盁迎茔盈荧浧耺莹営桯萤萦营蛍溁溋萾僌塋嵤楹滢蓥滎潆熒蝇瑩禜蝿嬴營縈螢濙濚濴藀覮謍赢瀅爃蠅鎣巆攍瀛瀠瀯櫿贏灐籝灜籯",
	"yǐng":"矨郢浧梬颍颕颖摬影潁瘿穎頴覮巊廮瀴鐛癭",
	"yìng":"応映眏暎硬媵膡鞕應瀴鱦",
	"yo":"喲",
	"yō":"唷喲",
	"yōng":"拥痈邕庸傭嗈鄘雍墉嫞慵滽槦牅牗銿噰壅擁澭郺镛臃癕雝鏞鳙廱灉饔鱅鷛癰",
	"yóng":"喁揘颙顒鰫",
	"yǒng":"永甬咏怺泳俑勈勇栐埇悀柡恿惥愑湧硧詠塎嵱彮愹蛹慂踊鲬噰澭踴鯒",
	"yòng":"用苚砽蒏醟",
	"yōu":"优妋忧攸呦怮泑幽峳浟逌悠羪麀滺憂優鄾嚘懮瀀獶櫌纋耰獿",
	"yóu":"尢冘尤由甴汼沋犹邮怞油肬怣斿柚疣庮秞莜莤莸郵铀偤蚰訧逰揂游猶遊鱿楢猷鈾鲉輏駀蕕蝣魷輶鮋繇櫾",
	"yǒu":"友丣卣苃酉羑栯莠梄聈铕湵楢禉蜏銪槱牖牗黝懮",
	"yòu":"又右幼佑佦侑孧泑狖哊囿姷宥峟柚牰祐诱迶唀梎痏蚴亴貁釉酭誘鼬櫾",
	"yū":"込扜扝纡迃迂穻陓紆唹淤盓瘀箊",
	"yú":"丂亐于邘伃余妤扵杅欤玗玙於盂臾衧鱼乻俞兪捓禺竽舁茰虶娛娯娪娱桙狳谀酑馀渔萸釪隃隅雩魚堣堬婾媀媮崳嵎嵛揄楰渝湡畬腴萮逾骬愚楡榆歈牏瑜艅虞觎漁睮窬舆褕歶羭蕍蝓諛雓餘魣嬩懙澞覦踰歟璵螸輿鍝謣髃鮽旟籅騟鯲蘛轝鰅鷠鸆齵",
	"yǔ":"伛宇屿羽穻俁俣挧禹圄祤偊匬圉庾敔鄅斞萭傴寙楀瑀瘐與語窳頨龉噳嶼懙貐斔穥麌齬",
	"yù":"肀玉驭圫聿芌芋吾妪忬汩灹饫欥育郁俞昱狱禺秗茟俼叞峪彧栯浴砡钰预域堉悆惐捥欲淢淯痏粖翑袬谕逳阈喅喩喻媀寓庽御棛棜棫焴琙琟矞硢硲裕遇飫馭鹆奧愈滪煜稢罭艈蒮蓣誉鈺預僪嫗嶎戫毓澚獄瘉緎蜟蜮語輍銉隩慾潏熨稶蓹薁豫遹鋊鳿澦燏燠蕷藇諭錥閾鴧鴪鴥儥礇禦魊鹬癒礖礜篽醧鵒櫲饇蘌譽鐭霱雤欎驈鬻籞鱊鷸鸒欝軉鬰鬱灪籲爩",
	"yuān":"夗囦肙鸢剈冤弲悁眢鸳寃涴渆渁渊渕惌淵葾棩蒬蜎裷鹓箢鳶蜵駌鋺鴛嬽鵷灁鼘鼝",
	"yuán":"元円贠邧园妧沅芫杬茒垣爰貟原員圆笎蚖袁厡酛傆喛圎媛援湲猨缘鈨鼋園圓塬媴嫄楥溒源猿蒝榞榬辕緣縁蝝蝯褤魭圜橼羱薗螈黿謜轅鎱櫞邍騵鶢鶰厵",
	"yuǎn":"盶逺遠薳鋺",
	"yuàn":"夗妴苑怨院垸衏傆媛掾瑗禐愿裫褑噮願",
	"yuē":"曰曱扚約啘箹矱",
	"yuě":"哕噦",
	"yuè":"月戉兊刖兌妜岄抈礿岳枂泧玥恱栎哾悅悦蚏蚎軏钺阅捳跀跃粤越鈅楽粵鉞說説樂閲閱嬳樾篗髺嶽臒龠擽矆櫟籆瀹蘥黦爚禴趯躍籥鑰鸑籰鸙",
	"yūn":"涒缊蒀暈氲煴蒕氳熅煾奫緼蝹縕赟馧贇",
	"yún":"云勻匀伝囩妘抣沄纭芸昀畇眃秐貟郧員涢紜耘耺鄖雲愪溳筠筼蒷熉澐蕓鋆橒篔縜",
	"yǔn":"允阭夽抎狁玧陨荺殒喗鈗隕煴殞熅馻磒賱霣齫齳",
	"yùn":"孕贠运枟郓恽貟員菀鄆酝傊惲愠缊運慍暈榅煇腪韫韵褞熨緷緼蕰蕴縕薀醖醞餫藴鞰韗韞蘊韻",
	"zā":"帀匝沞迊咂拶桚紥紮鉔噈魳臜臢",
	"zá":"杂沯砸偺喒韴雑襍雜囃囋囐雥",
	"zǎ":"咋偺喒",
	"zāi":"災灾甾哉栽烖畠菑渽溨睵賳",
	"zǎi":"宰崽",
	"zài":"再在扗抂洅傤載酨儎縡",
	"zān":"兂撍糌橵篸簪簮鵤鐕鐟",
	"zán":"偺喒",
	"zǎn":"拶昝桚寁揝噆撍儧攅儹攢趱趲",
	"zàn":"暂暫賛赞錾鄼濽蹔酂瓉贊鏩鏨瓒酇囋灒讃瓚禶穳襸讚饡",
	"zāng":"匨牂羘赃賍臧賘贓髒贜",
	"zǎng":"驵駔",
	"zàng":"奘弉脏塟葬臧蔵銺臓臟",
	"zāo":"傮遭糟蹧醩",
	"záo":"凿鑿",
	"zǎo":"早枣栆蚤棗璅澡璪薻藻",
	"zào":"灶皁皂唣唕造梍喿慥煰艁噪簉燥竃竈譟趮躁",
	"zé":"则択沢咋泎责迮則唶啧帻笮舴責溭滜睪矠飵嘖嫧幘箦蔶樍歵諎赜擇澤皟瞔簀耫礋襗謮賾蠌灂齚齰鸅",
	"zè":"仄庂汄昃昗捑側崱稄",
	"zéi":"贼戝賊鲗蠈鰂鱡",
	"zēn":"撍",
	"zěn":"怎",
	"zèn":"谮譖",
	"zēng":"曽増鄫增憎缯橧璔縡矰磳竲罾繒譄鱛",
	"zěng":"",
	"zèng":"锃綜缯鋥熷甑赠繒鬵贈囎",
	"zi":"嗭",
	"zī":"孖孜甾茊兹呲咨姕姿茲栥玆畠紎赀资崰淄秶缁菑谘赼嗞孳嵫椔湽滋粢葘辎鄑孶禌觜訾貲資趑锱稵緕緇鈭镃龇輜鼒澬薋諮趦輺錙髭鲻鍿鎡璾頾頿鯔鶅齍纃鰦齜",
	"zí":"蓻",
	"zǐ":"子吇芓姉姊杍沝矷秄胏呰秭籽耔茈虸笫梓釨啙紫滓訿榟橴",
	"zì":"字自芓秄洓茡荢倳剚恣牸渍眦眥菑胔胾漬",
	"zōng":"宗枞倧骔堫嵏嵕惾棕猣腙葼朡椶潈稯綜緃樅熧緵翪蝬踨踪磫繌鍐豵蹤騌鬃騣鬉鬷鯮鯼鑁",
	"zǒng":"总倊偬捴惣揔搃焧傯蓗嵸摠潀稯総熜緫縂燪縱總",
	"zòng":"昮疭從猔碂粽潨糉緵瘲縦縱繌糭",
	"zōu":"邹驺诹郰陬掫菆棸棷鄒箃緅諏鄹鲰鯫黀騶齱齺",
	"zǒu":"赱走搊鯐",
	"zòu":"奏揍媰楱",
	"zū":"怚柤租菹葅蒩",
	"zú":"卆足倅哫崒崪族椊稡箤踤镞鎐鏃",
	"zǔ":"诅阻组俎柤爼珇祖唨組詛靻鎺",
	"zù":"",
	"zuān":"鉆劗躜鑚躦鑽",
	"zuǎn":"繤缵纂纉籫纘",
	"zuàn":"揝篹賺攥",
	"zuī":"厜朘嗺樶蟕纗",
	"zuí":"",
	"zuǐ":"咀觜嶊嘴噿濢璻",
	"zuì":"冣栬絊酔晬最祽睟稡罪辠槜酻蕞醉嶵檇鋷錊檌欈",
	"zūn":"尊噂墫嶟遵樽繜罇鶎鐏鳟鱒鷷",
	"zǔn":"僔撙繜譐",
	"zùn":"拵捘栫袸銌瀳",
	"zuo":"咗",
	"zuō":"嘬穝",
	"zuó":"苲昨柮秨莋捽笮稓筰鈼",
	"zuǒ":"左佐繓",
	"zuò":"作坐阼岝岞怍侳柞祚胙唑座袏做葄葃酢蓙飵諎糳",
	"zhā":"吒咋抯挓柤査哳紥偧紮揸渣楂飵劄摣潳皶樝觰皻譇齄齇",
	"zhá":"札甴軋闸剳蚻铡喋煠牐閘劄箚霅耫鍘譗",
	"zhǎ":"厏拃苲眨砟鲊鲝諎鮓鮺",
	"zhà":"乍吒灹诈怍咤奓柞宱痄蚱喥溠詐搾鲊榨鮓醡",
	"zhāi":"亝哜夈粂捚斋側斎摘榸齊嚌擿齋",
	"zhái":"厇宅翟擇檡",
	"zhǎi":"厏抧窄鉙",
	"zhài":"责债砦責債寨瘵",
	"zhān":"岾怗枬沾毡旃栴粘蛅飦惉詀趈詹閚谵鳽噡嶦薝邅霑氈氊瞻覱鹯旜譫饘鳣驙魙鱣鸇",
	"zhán":"讝",
	"zhǎn":"斩飐展盏斬琖搌盞嶃嶄榐辗颭嫸醆橏輾皽黵",
	"zhàn":"佔战栈桟站偡绽菚嵁棧湛戦碊僝綻嶘戰虥虦覱轏譧欃蘸驏",
	"zhāng":"弡张張章傽鄣嫜彰慞漳獐粻蔁遧暲樟璋餦蟑鏱騿鱆麞",
	"zhǎng":"仉仧兏長掌漲幥礃鞝",
	"zhàng":"丈仗扙帐杖胀账粀帳涱脹痮障墇嶂幛漲賬瘬瘴瞕",
	"zhāo":"佋钊妱巶招昭炤釗啁釽鉊鳭駋鍣皽",
	"zháo":"",
	"zhǎo":"爫找沼菬瑵",
	"zhào":"兆诏枛垗炤狣赵笊肁啅旐棹罀詔照罩箌肈肇趙曌濯燳鮡櫂瞾羄",
	"zhe":"嗻",
	"zhē":"嗻嫬遮螫",
	"zhé":"乇厇扸杔歽矺砓籷虴哲埑粍袩啠悊晢晣辄喆棏聑蛰詟搩蜇谪馲摺輒慹磔輙銸辙蟄嚞謫謺鮿轍讁讋",
	"zhě":"者乽啫锗赭踷褶鍺襵",
	"zhè":"柘浙這淛嗻蔗樜鹧蟅鷓",
	"zhèi":"",
	"zhēn":"贞针侦侲帧枮浈珎珍胗貞帪桢眞真砧祯針偵酙寊幀揕湞葴遉嫃搸斟椹楨溱獉甄禎蒖蓁鉁榛槙殝瑧碪禛潧箴樼澵臻薽錱轃鍼籈鱵",
	"zhén":"",
	"zhěn":"诊抮枕姫弫昣轸屒畛疹眕袗紾聄萙竧裖覙診軫嫃缜槙稹駗縝縥辴鬒黰",
	"zhèn":"圳阵纼甽侲挋陣鸩振朕栚紖桭眹赈塦揕絼榐瑱誫賑鋴镇震鴆鎮鎭",
	"zhēng":"凧争佂姃征怔爭糽埩峥炡狰烝眐脀钲埥崝崢掙猙睁聇铮媜揁筝徰睜蒸踭鉦徴箏綪錚徵篜鬇癥鏳",
	"zhěng":"氶抍糽拯掟晸愸撜整",
	"zhèng":"氶证诤郑政徎钲掙幁証塣諍靕鄭憕鴊證",
	"zhī":"之支卮汁芝巵汥呮泜肢栀祗秓胑胝衼倁栺疷祬脂隻梔菭椥臸搘稙綕榰蜘馶憄鳷鴲織鼅蘵",
	"zhí":"执侄妷直秇姪郦値值聀釞埴執淔职戠植犆禃絷臷跖瓡摕摭馽嬂慹漐潪踯樴膱縶職蟙蹠軄躑",
	"zhǐ":"夂止凪劧旨阯坁址帋扺汦沚纸芷坧抧杫祇祉茋咫恉指枳洔砋秖衹轵淽疻紙蚔訨趾軹黹禔筫絺酯墌徴徵槯藢襧",
	"zhì":"至芖坁志忮扻豸制厔垁帙帜斦治炙质迣郅俧峙庢庤挃柣栉洷祑陟娡徏挚捗晊桎歭狾秩致袟贽轾乿偫剬徝掷梽楖猘畤痓痔眰秲秷窒紩翐袠觗貭铚鸷傂崻彘智滞痣蛭骘寘廌搱滍稚筫置跱輊锧雉墆滯潌疐瘈聜製覟誌銍幟憄摨摯潪熫稺膣觯質踬銴鋕擳旘瀄璏緻隲駤鴙儨劕懥擲擿櫛穉螲懫織贄櫍瓆觶騭鯯礩豑鶨騺驇躓鷙鑕豒",
	"zhōng":"夂伀汷刣妐彸忪忠泈炂终柊盅衳钟舯衷終鈡幒蔠蜙锺銿螤鴤螽鍾斔鼨蹱鐘籦",
	"zhǒng":"肿冢喠尰塚歱煄腫瘇種徸踵穜",
	"zhòng":"仲众妕狆祌茽衶蚛偅眾堹媑筗衆種緟諥",
	"zhōu":"州舟诌侜周洲炿诪烐珘辀郮啁婤徟掫淍矪週鸼喌赒輈翢銂賙輖霌駲嚋盩謅鵃騆譸",
	"zhóu":"妯軸碡",
	"zhǒu":"肘帚疛胕菷晭睭箒鯞",
	"zhòu":"纣伷呪咒宙绉冑咮昼紂胄荮皱酎晝粙椆葤詋軸甃僽皺駎噣縐繇薵骤籀籕籒驟",
	"zhū":"侏诛邾洙茱株珠诸猪硃秼袾铢絑蛛誅跦槠潴蕏蝫銖橥諸豬駯鮢鴸瀦藸鼄櫧櫫鯺蠩",
	"zhú":"朮竹竺炢笁茿烛窋逐笜舳逫瘃蓫敱磩築篴斀燭蠋躅鱁劚孎灟斸曯欘爥蠾钃",
	"zhǔ":"丶主劯宔拄砫罜陼帾渚煑煮詝褚嘱濐燝麈瞩屬囑鸀矚",
	"zhù":"伫佇住纻芧苎坾拀杼注苧贮迬驻乼壴柱柷殶炷祝疰眝砫祩竚莇紵紸羜蛀尌嵀註貯跓軴铸筯鉒飳馵嗻墸箸翥樦澍鋳駐築篫麆簗櫡鑄",
	"zhuā":"抓挝撾檛膼簻髽",
	"zhuǎ":"爫",
	"zhuāi":"拽",
	"zhuǎi":"跩",
	"zhuài":"拽睉",
	"zhuān":"专叀専恮砖耑專剸鄟塼嫥漙瑼甎磗膞颛磚諯篿蟤顓鱄",
	"zhuǎn":"孨転膞竱轉",
	"zhuàn":"灷啭転堟蒃傳瑑腞僎僝赚撰篆馔篹縳襈賺簨贃譔饌囀籑",
	"zhuāng":"妆庄妝庒荘娤桩莊梉湷粧装裝樁糚",
	"zhuǎng":"奘",
	"zhuàng":"壮壯状狀壵焋僮漴撞戅戆戇",
	"zhuī":"隹骓锥錐騅鵻",
	"zhuǐ":"沝",
	"zhuì":"坠笍奞娷缀隊惴甀缒腏畷硾膇墜綴赘縋諈醊錣礈贅鑆",
	"zhūn":"圫宒忳迍肫窀谆啍諄衠",
	"zhǔn":"准埻凖準稕綧",
	"zhùn":"旽訰稕綧",
	"zhuō":"拙炪倬捉桌梲棁涿淖棳棹焯窧槕穛鐯穱",
	"zhuó":"圴彴汋犳灼卓叕妰茁斫浊丵剢捔浞烵诼酌啄啅娺聉斱斮晫椓琸硺窡罬蓔墌撯擆斲禚劅諁諑趠鋜噣濁燋篧擢斀斵濯藋櫡謶镯繳鵫灂蠗鐲籗鷟蠿籱",
	"zhuò":"",
	"chǎng,ān,hàn": "厂",
	"dīng,zhēng": "丁",
	"bǔ,bo": "卜",
	"jǐ,jī": "几",
	"le,liǎo": "了",
	"gān,gàn": "干",
	"dà,dài,tài": "大",
	"yǔ,yù,yú": "与",
	"shàng,shǎng": "上",
	"wàn,mò": "万",
	"gè,gě": "个各",
	"me,mó,ma,yāo": "么",
	"guǎng,ān": "广",
	"wáng,wú": "亡",
	"nǚ,rǔ": "女",
	"chā,chá,chǎ": "叉",
	"wáng,wàng": "王",
	"fū,fú": "夫",
	"zhā,zā,zhá": "扎",
	"bù,fǒu": "不",
	"qū,ōu": "区",
	"chē,jū": "车",
	"qiè,qiē": "切",
	"wǎ,wà": "瓦",
	"tún,zhūn": "屯",
	"shǎo,shào": "少",
	"zhōng,zhòng": "中",
	"nèi,nà": "内",
	"jiàn,xiàn": "见",
	"cháng,zhǎng": "长",
	"shén,shí": "什",
	"piàn,piān": "片",
	"pú,pū": "仆",
	"huà,huā": "化",
	"chóu,qiú": "仇",
	"zhuǎ,zhǎo": "爪",
	"jǐn,jìn": "仅",
	"fù,fǔ": "父",
	"cóng,zòng": "从",
	"fēn,fèn": "分",
	"shì,zhī": "氏",
	"fēng,fěng": "风",
	"gōu,gòu": "勾",
	"liù,lù": "六",
	"dǒu,dòu": "斗",
	"wèi,wéi": "为",
	"chǐ,chě": "尺",
	"yǔ,yú": "予",
	"dǎ,dá": "打",
	"zhèng,zhēng": "正症挣",
	"bā,pá": "扒",
	"jié,jiē": "节结",
	"shù,shú,zhú": "术",
	"kě,kè": "可",
	"shí,dàn": "石",
	"kǎ,qiǎ": "卡",
	"běi,bèi": "北",
	"zhàn,zhān": "占",
	"qiě,jū": "且",
	"yè,xié": "叶",
	"hào,háo": "号",
	"zhī,zhǐ": "只",
	"dāo,tāo": "叨",
	"zǎi,zǐ,zī": "仔",
	"lìng,líng,lǐng": "令",
	"lè,yuè": "乐",
	"jù,gōu": "句",
	"chù,chǔ": "处",
	"tóu,tou": "头",
	"níng,nìng,zhù": "宁",
	"zhào,shào": "召",
	"fā,fà": "发",
	"tái,tāi": "台苔",
	"káng,gāng": "扛",
	"dì,de": "地",
	"sǎo,sào": "扫",
	"chǎng,cháng": "场",
	"pǔ,pò,pō,piáo": "朴",
	"guò,guo,guō": "过",
	"yā,yà": "压",
	"yǒu,yòu": "有",
	"kuā,kuà": "夸",
	"xié,yá,yé,yú,xú": "邪",
	"jiá,jiā,gā,xiá": "夹",
	"huà,huá": "划",
	"dāng,dàng": "当",
	"tù,tǔ": "吐",
	"xià,hè": "吓",
	"tóng,tòng": "同",
	"qū,qǔ": "曲",
	"ma,má,mǎ": "吗",
	"qǐ,kǎi": "岂",
	"zhū,shú": "朱",
	"chuán,zhuàn": "传",
	"xiū,xǔ": "休",
	"rèn,rén": "任",
	"huá,huà,huā": "华",
	"jià,jiè,jie": "价",
	"fèn,bīn": "份",
	"yǎng,áng": "仰",
	"xiě,xuè": "血",
	"sì,shì": "似",
	"háng,xíng": "行",
	"huì,kuài": "会",
	"hé,gě": "合",
	"chuàng,chuāng": "创",
	"chōng,chòng": "冲",
	"qí,jì,zī,zhāi": "齐",
	"yáng,xiáng": "羊",
	"bìng,bīng": "并",
	"hàn,hán": "汗",
	"tāng,shāng": "汤",
	"xīng,xìng": "兴",
	"xǔ,hǔ": "许",
	"lùn,lún": "论",
	"nà,nǎ,nèi,nā": "那",
	"jìn,jǐn": "尽",
	"sūn,xùn": "孙",
	"xì,hū": "戏",
	"hǎo,hào": "好",
	"tā,jiě": "她",
	"guān,guàn": "观冠",
	"hóng,gōng": "红",
	"xiān,qiàn": "纤",
	"jì,jǐ": "纪济",
	"yuē,yāo": "约",
	"nòng,lòng": "弄",
	"yuǎn,yuàn": "远",
	"huài,pēi,pī,péi": "坏",
	"zhé,shé,zhē": "折",
	"qiǎng,qiāng,chēng": "抢",
	"ké,qiào": "壳",
	"fāng,fáng": "坊",
	"bǎ,bà": "把",
	"gān,gǎn": "杆",
	"sū,sù": "苏",
	"gàng,gāng": "杠",
	"gèng,gēng": "更",
	"lì,lí": "丽",
	"hái,huán": "还",
	"fǒu,pǐ": "否",
	"xiàn,xuán": "县",
	"zhù,chú": "助",
	"ya,yā": "呀",
	"chǎo,chāo": "吵",
	"yuán,yún,yùn": "员",
	"ba,bā": "吧",
	"bié,biè": "别",
	"dīng,dìng": "钉",
	"gū,gù": "估",
	"hé,hē,hè": "何",
	"tǐ,tī,bèn": "体",
	"bó,bǎi,bà": "伯",
	"yòng,yōng": "佣",
	"fó,fú,bì,bó": "佛",
	"dù,dǔ": "肚",
	"guī,jūn,qiū": "龟",
	"jiǎo,jué": "角",
	"tiáo,tiāo": "条",
	"xì,jì": "系",
	"yìng,yīng": "应",
	"zhè,zhèi": "这",
	"jiān,jiàn": "间监",
	"mēn,mèn": "闷",
	"dì,tì,tuí": "弟",
	"shā,shà": "沙",
	"shà,shā": "煞",
	"méi,mò": "没",
	"shěn,chén": "沈",
	"shí,zhì": "识",
	"niào,suī": "尿",
	"wěi,yǐ": "尾",
	"ē,ā": "阿",
	"jìn,jìng": "劲",
	"zòng,zǒng": "纵",
	"wén,wèn": "纹",
	"mǒ,mò,mā": "抹",
	"dān,dàn,dǎn": "担",
	"chāi,cā": "拆",
	"jū,gōu": "拘",
	"lā,lá": "拉",
	"bàn,pàn": "拌",
	"zé,zhái": "择",
	"qí,jī": "其奇",
	"ruò,rě": "若",
	"píng,pēng": "苹",
	"zhī,qí": "枝",
	"guì,jǔ": "柜",
	"sàng,sāng": "丧",
	"cì,cī": "刺",
	"yǔ,yù": "雨语",
	"bēn,bèn": "奔",
	"qī,qì": "妻",
	"zhuǎn,zhuàn,zhuǎi": "转",
	"xiē,suò": "些",
	"ne,ní": "呢",
	"tiě,tiē,tiè,": "帖",
	"lǐng,líng": "岭",
	"zhī,zhì": "知织",
	"hé,hè,huó,huò,hú": "和",
	"gòng,gōng": "供共",
	"wěi,wēi": "委",
	"cè,zè,zhāi": "侧",
	"pò,pǎi": "迫",
	"de,dì,dí": "的",
	"cǎi,cài": "采",
	"fú,fù": "服",
	"dǐ,de": "底",
	"jìng,chēng": "净",
	"juàn,juǎn": "卷",
	"quàn,xuàn": "券",
	"dān,shàn,chán": "单",
	"qiǎn,jiān": "浅",
	"xiè,yì": "泄",
	"pō,bó": "泊",
	"pào,pāo": "泡",
	"ní,nì": "泥",
	"zé,shì": "泽",
	"kōng,kòng,kǒng": "空",
	"láng,làng": "郎",
	"xiáng,yáng": "详",
	"lì,dài": "隶",
	"shuā,shuà": "刷",
	"jiàng,xiáng": "降",
	"cān,shēn,cēn,sān": "参",
	"dú,dài": "毒",
	"kuà,kū": "挎",
	"dǎng,dàng": "挡",
	"kuò,guā": "括",
	"shí,shè": "拾",
	"tiāo,tiǎo": "挑",
	"shèn,shén": "甚",
	"xiàng,hàng": "巷",
	"nán,nā": "南",
	"xiāng,xiàng": "相",
	"chá,zhā": "查",
	"bǎi,bó,bò": "柏",
	"yào,yāo": "要",
	"yán,yàn": "研",
	"qì,qiè": "砌",
	"bèi,bēi": "背",
	"shěng,xǐng": "省",
	"xiāo,xuē": "削",
	"hǒng,hōng,hòng": "哄",
	"mào,mò": "冒",
	"yǎ,yā": "哑",
	"sī,sāi": "思",
	"mǎ,mā,mà": "蚂",
	"huá,huā": "哗",
	"yè,yàn,yān": "咽",
	"zán,zǎ": "咱",
	"hā,hǎ,hà": "哈",
	"nǎ,něi,na,né": "哪",
	"hāi,ké": "咳",
	"gǔ,gū": "骨",
	"gāng,gàng": "钢",
	"yào,yuè": "钥",
	"kàn,kān": "看",
	"zhòng,zhǒng,chóng": "种",
	"biàn,pián": "便",
	"zhòng,chóng": "重",
	"xìn,shēn": "信",
	"zhuī,duī": "追",
	"dài,dāi": "待",
	"shí,sì,yì": "食",
	"mài,mò": "脉",
	"jiāng,jiàng": "将浆",
	"dù,duó": "度",
	"qīn,qìng": "亲",
	"chà,chā,chāi,cī": "差",
	"zhà,zhá": "炸",
	"pào,páo,bāo": "炮",
	"sǎ,xǐ": "洒",
	"xǐ,xiǎn": "洗",
	"jué,jiào": "觉",
	"biǎn,piān": "扁",
	"shuō,shuì,yuè": "说",
	"lǎo,mǔ": "姥",
	"gěi,jǐ": "给",
	"luò,lào": "络",
	"zǎi,zài": "载",
	"mái,mán": "埋",
	"shāo,shào": "捎稍",
	"dū,dōu": "都",
	"ái,āi": "挨",
	"mò,mù": "莫",
	"è,wù,ě,wū": "恶",
	"xiào,jiào": "校",
	"hé,hú": "核",
	"yūn,yùn": "晕",
	"huàng,huǎng": "晃",
	"ài,āi": "唉",
	"ā,á,ǎ,à,a": "啊",
	"bà,ba,pí": "罢",
	"zuàn,zuān": "钻",
	"qiān,yán": "铅",
	"chéng,shèng": "乘",
	"mì,bì": "秘泌",
	"chēng,chèn,chèng": "称",
	"dào,dǎo": "倒",
	"tǎng,cháng": "倘",
	"chàng,chāng": "倡",
	"chòu,xiù": "臭",
	"shè,yè,yì": "射",
	"gē,gé": "胳搁",
	"shuāi,cuī": "衰",
	"liáng,liàng": "凉量",
	"chù,xù": "畜",
	"páng,bàng": "旁磅",
	"zhǎng,zhàng": "涨",
	"yǒng,chōng": "涌",
	"qiāo,qiǎo": "悄",
	"jiā,jia,jie": "迦家",
	"dú,dòu": "读",
	"shàn,shān": "扇",
	"shān,shàn": "苫",
	"bèi,pī": "被",
	"tiáo,diào,zhōu": "调",
	"bō,bāo": "剥",
	"néng,nài": "能",
	"nán,nàn,nuó": "难",
	"pái,pǎi": "排",
	"jiào,jiāo": "教",
	"jù,jū": "据",
	"zhù,zhuó,zhe": "著",
	"jūn,jùn": "菌",
	"lè,lēi": "勒",
	"shāo,sào": "梢",
	"fù,pì": "副",
	"piào,piāo": "票",
	"shèng,chéng": "盛",
	"què,qiāo,qiǎo": "雀",
	"chí,shi": "匙",
	"mī,mí": "眯",
	"la,lā": "啦",
	"shé,yí": "蛇",
	"lèi,léi,lěi": "累",
	"zhǎn,chán": "崭",
	"quān,juàn,juān": "圈",
	"lóng,lǒng": "笼",
	"dé,děi,de": "得",
	"jiǎ,jià": "假",
	"māo,máo": "猫",
	"xuán,xuàn": "旋",
	"zhe,zhuó,zháo,zhāo": "着",
	"lǜ,shuài": "率",
	"gài,gě,hé": "盖",
	"lín,lìn": "淋",
	"qú,jù": "渠",
	"jiàn,jiān": "渐溅",
	"hùn,hún": "混",
	"sù,xiǔ,xiù": "宿",
	"tán,dàn": "弹",
	"yǐn,yìn": "隐",
	"jǐng,gěng": "颈",
	"lǜ,lù": "绿",
	"qū,cù": "趋",
	"tí,dī,dǐ": "提",
	"jiē,qì": "揭",
	"lǒu,lōu": "搂",
	"qī,jī": "期",
	"sàn,sǎn": "散",
	"gě,gé": "葛",
	"zhāo,cháo": "朝",
	"luò,là,lào": "落",
	"yǐ,yī": "椅",
	"gùn,hùn": "棍",
	"zhí,shi": "殖",
	"xià,shà": "厦",
	"liè,liě": "裂",
	"jǐng,yǐng": "景",
	"pēn,pèn": "喷",
	"pǎo,páo": "跑",
	"hē,hè,yè": "喝",
	"pù,pū": "铺",
	"zhù,zhú": "筑",
	"dá,dā": "答",
	"bǎo,bǔ,pù": "堡",
	"ào,yù": "奥",
	"fān,pān": "番",
	"là,xī": "腊",
	"gǎng,jiǎng": "港",
	"céng,zēng": "曾",
	"yú,tōu": "愉",
	"qiáng,qiǎng,jiàng": "强",
	"shǔ,zhǔ": "属",
	"zhōu,yù": "粥",
	"shè,niè": "摄",
	"tián,zhèn": "填",
	"méng,mēng,měng": "蒙",
	"jìn,jīn": "禁",
	"lù,liù": "碌",
	"tiào,táo": "跳",
	"é,yǐ": "蛾",
	"jiě,jiè,xiè": "解",
	"shù,shǔ,shuò": "数",
	"liū,liù": "溜",
	"sāi,sài,sè": "塞",
	"pì,bì": "辟",
	"fèng,féng": "缝",
	"piě,piē": "撇",
	"mó,mú": "模",
	"bǎng,bàng": "榜",
	"shang,cháng": "裳",
	"xiān,xiǎn": "鲜",
	"yí,nǐ": "疑",
	"gāo,gào": "膏",
	"piāo,piào,piǎo": "漂",
	"suō,sù": "缩",
	"qù,cù": "趣",
	"sā,sǎ": "撒",
	"tàng,tāng": "趟",
	"héng,hèng": "横",
	"mán,mén": "瞒",
	"bào,pù": "暴",
	"mó,mā": "摩",
	"hú,hū,hù": "糊",
	"pī,pǐ": "劈",
	"yàn,yān": "燕",
	"báo,bó,bò": "薄",
	"mó,mò": "磨",
	"jiǎo,zhuó": "缴",
	"cáng,zàng": "藏",
	"fán,pó": "繁",
	"bì,bei": "臂",
	"chàn,zhàn": "颤",
	"jiāng,qiáng": "疆",
	"jiáo,jué,jiào": "嚼",
	"rǎng,rāng": "嚷",
	"lù,lòu": "露",
	"náng,nāng": "囊",
	"hāng,bèn": "夯",
	"āo,wā": "凹",
	"féng,píng": "冯",
	"xū,yù": "吁",
	"lèi,lē": "肋",
	"lūn,lún": "抡",
	"jiè,gài": "芥",
	"xīn,xìn": "芯",
	"chā,chà": "杈",
	"xiāo,xiào": "肖",
	"zhī,zī": "吱",
	"ǒu,ōu,òu": "呕",
	"nà,nè": "呐",
	"qiàng,qiāng": "呛",
	"tún,dùn": "囤",
	"kēng,háng": "吭",
	"diàn,tián": "佃",
	"sì,cì": "伺",
	"diàn,tián,shèng": "甸",
	"páo,bào": "刨",
	"duì,ruì,yuè": "兑",
	"kē,kě": "坷",
	"tuò,tà,zhí": "拓",
	"fú,bì": "拂",
	"nǐng,níng,nìng": "拧",
	"ào,ǎo,niù": "拗",
	"kē,hē": "苛",
	"yān,yǎn": "奄",
	"hē,a,kē": "呵",
	"gā,kā": "咖",
	"jiǎo,yáo": "侥",
	"chà,shā": "刹",
	"nüè,yào": "疟",
	"máng,méng": "氓",
	"gē,yì": "疙",
	"jǔ,jù": "沮",
	"zú,cù": "卒",
	"wǎn,yuān": "宛",
	"mí,mǐ": "弥",
	"qì,qiè,xiè": "契",
	"xié,jiā": "挟",
	"duò,duǒ": "垛",
	"zhà,shān,shi,cè": "栅",
	"bó,bèi": "勃",
	"zhóu,zhòu": "轴",
	"liē,liě,lié,lie": "咧",
	"yo,yō": "哟",
	"qiào,xiào": "俏",
	"hóu,hòu": "侯",
	"píng,bǐng": "屏",
	"nà,nuó": "娜",
	"pá,bà": "耙",
	"qī,xī": "栖",
	"jiǎ,gǔ": "贾",
	"láo,lào": "唠",
	"bàng,bèng": "蚌",
	"gōng,zhōng": "蚣",
	"li,lǐ,lī": "哩",
	"juè,jué": "倔",
	"yīn,yān,yǐn": "殷",
	"wō,guō": "涡",
	"lào,luò": "烙",
	"niǎn,niē": "捻",
	"yè,yē": "掖",
	"chān,xiān,càn,shǎn": "掺",
	"dǎn,shàn": "掸",
	"fēi,fěi": "菲",
	"qián,gān": "乾",
	"shuò,shí": "硕",
	"luō,luó,luo": "啰",
	"hǔ,xià": "唬",
	"dāng,chēng": "铛",
	"xiǎn,xǐ": "铣",
	"jiǎo,jiáo": "矫",
	"kuǐ,guī": "傀",
	"jì,zhài": "祭",
	"tǎng,chǎng": "淌",
	"chún,zhūn": "淳",
	"wèi,yù": "尉",
	"duò,huī": "堕",
	"chuò,chāo": "绰",
	"bēng,běng,bèng": "绷",
	"zōng,zèng": "综",
	"zhuó,zuó": "琢",
	"chuǎi,chuài,chuāi,tuán,zhuī": "揣",
	"péng,bāng": "彭",
	"zhuī,chuí": "椎",
	"léng,lēng,líng": "棱",
	"qiào,qiáo": "翘",
	"zhā,chā": "喳",
	"há,gé": "蛤",
	"qiàn,kàn": "嵌",
	"yān,ā": "腌",
	"dūn,duì": "敦",
	"kuì,huì": "溃",
	"sāo,sǎo": "骚",
	"kǎi,jiē": "楷",
	"pín,bīn": "频",
	"liú,liù": "馏",
	"nì,niào": "溺",
	"jiǎo,chāo": "剿",
	"áo,āo": "熬",
	"màn,wàn": "蔓",
	"chá,chā": "碴",
	"xūn,xùn": "熏",
	"da,dá": "瘩",
	"tuì,tùn": "褪",
	"liáo,liāo": "撩",
	"cuō,zuǒ": "撮",
	"cháo,zhāo": "嘲",
	"hēi,mò": "嘿",
	"zhuàng,chuáng": "幢",
	"jī,qǐ": "稽",
	"biě,biē": "瘪",
	"liáo,lào,lǎo": "潦",
	"chéng,dèng": "澄",
	"lèi,léi": "擂",
	"mò,má": "蟆",
	"liáo,liǎo": "燎",
	"liào,liǎo": "瞭",
	"sào,sāo": "臊",
	"mí,méi": "糜",
	"huò,huō,huá": "豁",
	"pù,bào": "瀑",
	"zǎn,cuán": "攒",
	"bò,bǒ": "簸",
	"bó,bù": "簿",
	}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	const assign = __webpack_require__(16);
	// XXX: Symbol when web support.
	const PINYIN_STYLE = {
	  NORMAL: 0,       // 普通风格，不带声调。
	  TONE: 1,         // 标准风格，声调在韵母的第一个字母上。
	  TONE2: 2,        // 声调以数字形式在拼音之后，使用数字 0~4 标识。
	  TO3NE: 5,        // 声调以数字形式在声母之后，使用数字 0~4 标识。
	  INITIALS: 3,     // 仅需要声母部分。
	  FIRST_LETTER: 4, // 仅保留首字母。
	};
	const DEFAULT_OPTIONS = {
	  style: PINYIN_STYLE.TONE, // 风格
	  segment: false,           // 分词。
	  heteronym: false,         // 多音字
	};

	// 声母表。
	const INITIALS = "b,p,m,f,d,t,n,l,g,k,h,j,q,x,r,zh,ch,sh,z,c,s".split(",");
	// 韵母表。
	//const FINALS = "ang,eng,ing,ong,an,en,in,un,er,ai,ei,ui,ao,ou,iu,ie,ve,a,o,e,i,u,v".split(",");
	// 带声调字符。
	const PHONETIC_SYMBOL = __webpack_require__(17);
	const RE_PHONETIC_SYMBOL = new RegExp("([" + Object.keys(PHONETIC_SYMBOL).join("") + "])", "g");
	const RE_TONE2 = /([aeoiuvnm])([0-4])$/;

	/*
	 * 格式化拼音为声母（Initials）形式。
	 * @param {String}
	 * @return {String}
	 */
	function initials(pinyin) {
	  for (let i = 0, l = INITIALS.length; i < l; i++){
	    if (pinyin.indexOf(INITIALS[i]) === 0) {
	      return INITIALS[i];
	    }
	  }
	  return "";
	}

	class Pinyin {
	  constructor (dict) {
	    this._dict = dict;
	  }

	  // @param {String} hans 要转为拼音的目标字符串（汉字）。
	  // @param {Object} options, 可选，用于指定拼音风格，是否启用多音字。
	  // @return {Array} 返回的拼音列表。
	  convert (hans, options) {

	    if (typeof hans !== "string") {
	      return [];
	    }

	    options = assign({}, DEFAULT_OPTIONS, options);

	    let pys = [];
	    let nohans = "";

	    for(let i = 0, firstCharCode, words, l = hans.length; i < l; i++){

	      words = hans[i];
	      firstCharCode = words.charCodeAt(0);

	      if(this._dict[firstCharCode]){

	        // ends of non-chinese words.
	        if(nohans.length > 0){
	          pys.push([nohans]);
	          nohans = ""; // reset non-chinese words.
	        }

	        pys.push(this.single_pinyin(words, options));

	      }else{
	        nohans += words;
	      }
	    }

	    // 清理最后的非中文字符串。
	    if(nohans.length > 0){
	      pys.push([nohans]);
	      nohans = ""; // reset non-chinese words.
	    }
	    return pys;
	  }

	  // 单字拼音转换。
	  // @param {String} han, 单个汉字
	  // @return {Array} 返回拼音列表，多音字会有多个拼音项。
	  single_pinyin (han, options) {

	    if (typeof han !== "string") {
	      return [];
	    }
	    if (han.length !== 1) {
	      return this.single_pinyin(han.charAt(0), options);
	    }

	    let hanCode = han.charCodeAt(0);

	    if (!this._dict[hanCode]) {
	      return [han];
	    }

	    let pys = this._dict[hanCode].split(",");
	    if(!options.heteronym){
	      return [Pinyin.toFixed(pys[0], options.style)];
	    }

	    // 临时存储已存在的拼音，避免多音字拼音转换为非注音风格出现重复。
	    let py_cached = {};
	    let pinyins = [];
	    for(let i = 0, py, l = pys.length; i < l; i++){
	      py = Pinyin.toFixed(pys[i], options.style);
	      if(py_cached.hasOwnProperty(py)){
	        continue;
	      }
	      py_cached[py] = py;

	      pinyins.push(py);
	    }
	    return pinyins;
	  }

	  /**
	   * 格式化拼音风格。
	   *
	   * @param {String} pinyin TONE 风格的拼音。
	   * @param {ENUM} style 目标转换的拼音风格。
	   * @return {String} 转换后的拼音。
	   */
	  static toFixed (pinyin, style) {
	    let tone = ""; // 声调。
	    let first_letter;
	    let py;
	    switch(style){
	    case PINYIN_STYLE.INITIALS:
	      return initials(pinyin);

	    case PINYIN_STYLE.FIRST_LETTER:
	      first_letter = pinyin.charAt(0);
	      if (PHONETIC_SYMBOL.hasOwnProperty(first_letter)) {
	        first_letter = PHONETIC_SYMBOL[first_letter].charAt(0);
	      }
	      return first_letter;

	    case PINYIN_STYLE.NORMAL:
	      return pinyin.replace(RE_PHONETIC_SYMBOL, function($0, $1_phonetic){
	        return PHONETIC_SYMBOL[$1_phonetic].replace(RE_TONE2, "$1");
	      });

	    case PINYIN_STYLE.TO3NE:
	      return pinyin.replace(RE_PHONETIC_SYMBOL, function($0, $1_phonetic){
	        return PHONETIC_SYMBOL[$1_phonetic];
	      });

	    case PINYIN_STYLE.TONE2:
	      py = pinyin.replace(RE_PHONETIC_SYMBOL, function($0, $1){
	        // 声调数值。
	        tone = PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$2");

	        return PHONETIC_SYMBOL[$1].replace(RE_TONE2, "$1");
	      });
	      return py + tone;

	    case PINYIN_STYLE.TONE:
	    default:
	      return pinyin;
	    }
	  }

	  /**
	   * 比较两个汉字转成拼音后的排序顺序，可以用作默认的拼音排序算法。
	   *
	   * @param {String} hanA 汉字字符串 A。
	   * @return {String} hanB 汉字字符串 B。
	   * @return {Number} 返回 -1，0，或 1。
	   */
	  compare (hanA, hanB) {
	    const pinyinA = this.convert(hanA, DEFAULT_OPTIONS);
	    const pinyinB = this.convert(hanB, DEFAULT_OPTIONS);
	    return String(pinyinA).localeCompare(String(pinyinB));
	  }

	  static get STYLE_NORMAL () {
	    return PINYIN_STYLE.NORMAL;
	  }
	  static get STYLE_TONE () {
	    return PINYIN_STYLE.TONE;
	  }
	  static get STYLE_TONE2 () {
	    return PINYIN_STYLE.TONE2;
	  }
	  static get STYLE_TO3NE () {
	    return PINYIN_STYLE.TO3NE;
	  }
	  static get STYLE_INITIALS () {
	    return PINYIN_STYLE.INITIALS;
	  }
	  static get STYLE_FIRST_LETTER () {
	    return PINYIN_STYLE.FIRST_LETTER;
	  }
	  static get DEFAULT_OPTIONS () {
	    return DEFAULT_OPTIONS;
	  }
	}

	module.exports = Pinyin;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	// 带声调字符。
	module.exports = {
	  "ā": "a1",
	  "á": "a2",
	  "ǎ": "a3",
	  "à": "a4",
	  "ē": "e1",
	  "é": "e2",
	  "ě": "e3",
	  "è": "e4",
	  "ō": "o1",
	  "ó": "o2",
	  "ǒ": "o3",
	  "ò": "o4",
	  "ī": "i1",
	  "í": "i2",
	  "ǐ": "i3",
	  "ì": "i4",
	  "ū": "u1",
	  "ú": "u2",
	  "ǔ": "u3",
	  "ù": "u4",
	  "ü": "v0",
	  "ǘ": "v2",
	  "ǚ": "v3",
	  "ǜ": "v4",
	  "ń": "n2",
	  "ň": "n3",
	  "": "m2",
	};


/***/ })
/******/ ]);