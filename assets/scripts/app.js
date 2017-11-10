(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("src/blocks/callback-form/callback-form.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _formHelper = require('../../scripts/form-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	var formPrefix = 'callback-form';
	var modalId = '#callbackFormModal';
	(0, _formHelper.initForm)('callbackForm', 'Форма заказать звонок', function (form) {
		form.reset();
		(0, _jquery2.default)(modalId).modal('hide');
	}, function (form, error) {
		form.reset();
		console.log('Ошибка отправки письма' + error);
		return;
	});
	(0, _jquery2.default)(modalId).on('show.bs.modal', function () {
		(0, _jquery2.default)('.' + formPrefix + '__wrapper').on('click', function (event) {
			if (event.target === event.currentTarget) {
				(0, _jquery2.default)(modalId).modal('hide');
			}
		});
	});
});

});

require.register("src/blocks/feedback-form/feedback-form.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _formHelper = require('../../scripts/form-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	var formPrefix = 'feedback-form';
	var modalId = '#feedbackFormModal';
	(0, _formHelper.initForm)('feedbackForm', 'Форма напишите нам', function (form) {
		form.reset();
		(0, _jquery2.default)(modalId).modal('hide');
	}, function (form, error) {
		form.reset();
		console.log('Ошибка отправки письма' + error);
		return;
	});
	(0, _jquery2.default)(modalId).on('show.bs.modal', function () {
		(0, _jquery2.default)('.' + formPrefix + '__wrapper').on('click', function (event) {
			if (event.target === event.currentTarget) {
				(0, _jquery2.default)(modalId).modal('hide');
			}
		});
	});
});

});

require.register("src/blocks/form-get-price/form-get-price.js", function(exports, require, module) {
'use strict';

var _formHelper = require('../../scripts/form-helper');

var _getprice = require('../../scripts/getprice');

document.addEventListener('DOMContentLoaded', function () {
	var formPrefix = 'form-get-price';
	(0, _formHelper.initForm)('getPriceForm', 'Запрос прайс-листа с сайта Foodtrade', function (form) {
		form.reset();
		form.classList.add(formPrefix + '_sended');
		var msg = form.querySelector('.' + formPrefix + '__msg');
		if (msg) {
			msg.innerHTML = 'Сообщение отправлено';
		}
		setTimeout(function () {
			if (msg) {
				msg.innerHTML = '';
			}
			form.classList.remove(formPrefix + '_sended');
		}, 2000);
		(0, _getprice.getPrice)();
	}, function (form, error) {
		form.reset();
		console.log('Ошибка отправки письма' + error);
		return;
	});
});

});

require.register("src/blocks/form-price-modal/form-price-modal.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _formHelper = require('../../scripts/form-helper');

var _getprice = require('../../scripts/getprice');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	var formPrefix = 'form-price-modal';
	var modalId = '#priceFormModal';
	(0, _formHelper.initForm)('priceForm', 'Запрос прайс-листа с сайта Foodtrade каталог.', function (form) {
		form.reset();
		(0, _getprice.getPrice)();
		(0, _jquery2.default)(modalId).modal('hide');
	}, function (form, error) {
		form.reset();
		console.log('Ошибка отправки письма' + error);
		return;
	});
	(0, _jquery2.default)(modalId).on('show.bs.modal', function () {
		(0, _jquery2.default)('.' + formPrefix + '__wrapper').on('click', function (event) {
			if (event.target === event.currentTarget) {
				(0, _jquery2.default)(modalId).modal('hide');
			}
		});
	});
});

});

require.register("src/blocks/layout-default/layout-default.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
	(0, _jquery2.default)('a.toscroll').on('click', function (e) {
		var url = e.target.href;
		var hash = url.substring(url.indexOf('#') + 1);
		(0, _jquery2.default)('html, body').animate({
			scrollTop: (0, _jquery2.default)('#' + hash).offset().top
		}, 500);
		return false;
	});
});

});

require.register("src/blocks/product-more/product-more.js", function(exports, require, module) {
'use strict';

document.addEventListener('DOMContentLoaded', function () {
	var moreButton = document.querySelector('.product-more__btn');
	if (moreButton) {
		moreButton.addEventListener('click', function () {
			var products = document.querySelector('.products');
			if (products) {
				if (products.classList.contains('products_more')) {
					products.classList.remove('products_more');
				} else {
					moreButton.setAttribute('data-target', '#priceFormModal');
					moreButton.setAttribute('data-toggle', 'modal');
				}
			}
		});
	}
});

});

require.register("src/data/contacts.json", function(exports, require, module) {
module.exports = {
    "Юридический адрес": "МО, г. Видное, ул. Ольховая, д. 9, офис 11",
    "Фактический адрес": "МО, г. Химки ул. Жуковского, д. 10, офис 26",
    "ОГРН": "1165003053324   ИНН/КПП: 5003119839/500301001",
    "Расчетный счет": "40702 810 8023 2000 1212",
    "БИК": "044525593 ОКАТО: 46228501000",
    "Кор. Счет": "30101 810 2000 0000 0593"
};
});

;require.register("src/data/nav.json", function(exports, require, module) {
module.exports = {
    "Орехи": "nuts.html",
    "Сухофрукты": "dried-fruits.html",
    "Оплата и доставка": "#terms",
    "О нас": "#about"
};
});

;require.register("src/data/preferences.json", function(exports, require, module) {
module.exports = [
  {
    "title": "Предоставляем необходимые документы",
    "text": "Мы гарантируем, что сделка будет сопровождена полным перечнем документов и необходимой сертификацией для каждого вида продукта.",
    "icon": "document-icon"
  },
  {
    "title": "Отгружаем любые<br> объемы",
    "text": "Мы осуществляем оптовые продажи различных наименований товара при заказе от 50 кг.",
    "icon": "house-car-icon"
  },
  {
    "title": "Оплата любым удобным способом",
    "text": "Мы принимаем оплату за поставляемый товар любым удобным для Вас способом: безналичный перевод, наличные, pay pal  и д.р.",
    "icon": "money-icon"
  },
  {
    "title": "Работаем с физическими и юридическими лицами",
    "text": "Мы рады сотрудничеству с индивидуальными предпринимателями, средними и крупными компаниями.",
    "icon": "woman-icon"
  },
  {
    "title": "Доставляем по России и в другие страны",
    "text": "Осуществляем доставку во все регионы РФ, а также в любую точку мира. Доставка осуществляется любым удобным для Вас способом и в согласованные с Вами сроки.",
    "icon": "cart-globus-icon"
  }
]
;
});

;require.register("src/data/product-dried-fruits.json", function(exports, require, module) {
module.exports = [
    {
        "img": "assets/images/catalog/fruits-img9.jpg",
        "name": "Цукаты",
        "type": "в ассортименте",
        "price": "220"
    },
    {
        "img": "assets/images/catalog/fruits-img10.jpg",
        "name": "Банановые чипсы",
        "type": "",
        "price": "230"
    },
    {
        "img": "assets/images/catalog/fruits-img1.jpg",
        "name": "Изюм Малаяр",
        "type": "",
        "price": "160"
    },
    {
        "img": "assets/images/catalog/fruits-img13.jpg",
        "name": "Изюм Джамбо",
        "type": "",
        "price": "280"
    },
    {
        "img": "assets/images/catalog/fruits-img12.jpg",
        "name": "Изюм Золотой",
        "type": "",
        "price": "200"
    },
    {
        "img": "assets/images/catalog/fruits-img11.jpg",
        "name": "Изюм Изабелла",
        "type": "",
        "price": "450"
    },
    {
        "img": "assets/images/catalog/fruits-img1.jpg",
        "name": "Изюм Афганский",
        "type": "",
        "price": "210"
    },
    {
        "img": "assets/images/catalog/fruits-img2.jpg",
        "name": "Курага",
        "type": "",
        "price": "110"
    },
    {
        "img": "assets/images/catalog/fruits-img14.jpg",
        "name": "Чернослив",
        "type": "",
        "price": "135"
    },
    {
        "img": "assets/images/catalog/fruits-img8.jpg",
        "name": "Клюква",
        "type": "",
        "price": "400"
    },
    {
        "img": "assets/images/catalog/fruits-img4.jpg",
        "name": "Инжир",
        "type": "",
        "price": "320"
    },
    {
        "img": "assets/images/catalog/fruits-img15.jpg",
        "name": "Финики",
        "type": "",
        "price": "90"
    },
    {
        "img": "assets/images/catalog/fruits-img17.jpg",
        "name": "Шиповник",
        "type": "",
        "price": "180"
    },
    {
        "img": "assets/images/catalog/fruits-img7.jpg",
        "name": "Клубника сушеная",
        "type": "",
        "price": "530"
    },
    {
        "img": "assets/images/catalog/fruits-img3.jpg",
        "name": "Груша",
        "type": "",
        "price": "230"
    },
    {
        "img": "assets/images/catalog/fruits-img16.jpg",
        "name": "Кумкват",
        "type": "в ассортименте",
        "price": "260"
    }
];
});

;require.register("src/data/product-nuts.json", function(exports, require, module) {
module.exports = [
    {
        "img": "assets/images/catalog/greece.jpg",
        "name": "Грецкий Орех",
        "type": "Половинки",
        "price": "620"
    },
    {
        "img": "assets/images/catalog/greece.jpg",
        "name": "Грецкий Орех",
        "type": "Четвертинки",
        "price": "550"
    },
    {
        "img": "assets/images/catalog/mindal.jpg",
        "name": "Миндаль",
        "type": "",
        "price": "640"
    },
    {
        "img": "assets/images/catalog/arahis.jpg",
        "name": "Арахис",
        "type": "",
        "price": "140"
    },
    {
        "img": "assets/images/catalog/keshiu.jpg",
        "name": "Кешью",
        "type": "",
        "price": "800"
    },
    {
        "img": "assets/images/catalog/nuts-img2.jpg",
        "name": "Кедровый орех",
        "type": "в скорлупе",
        "price": "270"
    },
    {
        "img": "assets/images/catalog/kedr.jpg",
        "name": "Кедровый орех",
        "type": "ядро",
        "price": "1100"
    },
    {
        "img": "assets/images/catalog/nuts-img1.jpg",
        "name": "Фундук",
        "type": "неочищенный",
        "price": "260"
    },
    {
        "img": "assets/images/catalog/nuts-img1.jpg",
        "name": "Фундук",
        "type": "очищенный",
        "price": "600"
    },
    {
        "img": "assets/images/catalog/makadamia.jpg",
        "name": "Макадамия",
        "type": "",
        "price": "2500"
    },
    {
        "img": "assets/images/catalog/nuts-img3.jpg",
        "name": "Пекан",
        "type": "",
        "price": "1000"
    },
    {
        "img": "assets/images/catalog/fistashki.jpg",
        "name": "Фисташки",
        "type": "в скорлупе",
        "price": "550"
    },
    {
        "img": "assets/images/catalog/fistashki.jpg",
        "name": "Фисташки",
        "type": "очищенные",
        "price": "1450"
    },
    {
        "img": "assets/images/catalog/brasil.jpg",
        "name": "Бразильский орех",
        "type": "",
        "price": "1200"
    },
    {
        "img": "assets/images/catalog/nuts-img5.jpg",
        "name": "Семечки подсолнуха",
        "type": "",
        "price": "55"
    },
    {
        "img": "assets/images/catalog/nuts-img4.jpg",
        "name": "Семечки тыквенные",
        "price": "240"
    }
];
});

;require.register("src/data/site-settings.json", function(exports, require, module) {
module.exports = {
    "name": "Foodtrade - оптовая продажа орехов и сухофруктов",
    "email": "info@foodtrade.bz"
};
});

;require.register("src/data/social-icons.json", function(exports, require, module) {
module.exports = [
    {
        "id": "fb",
        "name": "Facebook",
        "href": "#"
    },
    {
        "id": "ig",
        "name": "Instagramm",
        "href": "#"
    },
    {
        "id": "ok",
        "name": "Одноклассники",
        "href": "#"
    },
    {
        "id": "tw",
        "name": "Twitter",
        "href": "#"
    },
    {
        "id": "vk",
        "name": "ВКонтакте",
        "href": "#"
    }
];
});

;require.register("src/data/terms.json", function(exports, require, module) {
module.exports = {
	"1": [{
			"index": "1",
			"title": "Размещаете заявку",
			"icon": "terms-headset"
		},
		{
			"index": "2",
			"title": "Выбираете продукт и его характеристики",
			"icon": "terms-scan"
		},
		{
			"index": "3",
			"title": "Указываете объем закупки",
			"icon": "terms-cart"
		}
	],
	"2": [
		{
			"index": "4",
			"title": "Выбираете условия проведения оплаты",
			"icon": "terms-pen"
		},{
			"index": "5",
			"title": "Сообщаете, где Вы хотите получить товар",
			"icon": "terms-map"
		},{
			"index": "6",
			"title": "Заключаем контракт&nbsp;/договор",
			"icon": "terms-wallet"
		}
	],
	"3": [{
			"index": "7",
			"title": "Производите оплату любым удобным способом",
			"icon": "terms-pos"
		},
		{
			"index": "8",
			"title": "Отправка или вывоз товара с нашего склада",
			"icon": "terms-car"
		}
	]
}
;
});

;require.register("src/data/top-dried-fruits.json", function(exports, require, module) {
module.exports = {
    "title": "Сухофрукты",
    "subTitle": "",
    "backgroundImage": "images/dried-fruits-bg.jpg"
};
});

;require.register("src/data/top-nuts.json", function(exports, require, module) {
module.exports = {
    "title": "Орехи",
    "subTitle": "",
    "backgroundImage": "images/nuts-bg.jpg"
};
});

;require.register("src/scripts/app.js", function(exports, require, module) {
'use strict';

require('./inputmask');

require('../blocks/form-get-price/form-get-price');

require('../blocks/callback-form/callback-form');

require('../blocks/feedback-form/feedback-form');

require('../blocks/form-price-modal/form-price-modal');

require('../blocks/layout-default/layout-default');

require('../blocks/product-more/product-more');

});

require.register("src/scripts/form-helper.ts", function(exports, require, module) {
'use strict';
var settings = require("src/data/site-settings.json");
var sendToEmail = settings['email'] || 'info@foodtrade.bz';
function initForm(formId, subject, success, fail) {
    var form = document.getElementById(formId);
    if (form === null) {
        return false;
    }
    var serviceUrl = 'https://formspree.io/';
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var spinner;
        if (form.getElementsByClassName('spinner').length == 0) {
            spinner = document.createElement('div');
            spinner.className = 'spinner';
            form.appendChild(spinner);
        }
        else {
            spinner = form.getElementsByClassName('spinner')[0];
        }
        var formData = new FormData(form);
        formData.append('_subject', subject);
        formData.append('url', window.location.href);
        fetch("" + serviceUrl + sendToEmail, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
            .then(function (response) {
            if (response.ok) {
                // console.log('Email send');
                if (typeof (success) === 'function') {
                    success(form);
                }
            }
            else {
                throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u043F\u043E\u0447\u0442\u044B: status=" + response.status + ", " + response.statusText);
            }
        })
            .catch(function (error) {
            // console.log(error);
            if (typeof (fail) === 'function') {
                fail(form, error);
            }
        });
    });
    return true;
}
exports.initForm = initForm;
//# sourceMappingURL=form-helper.js.map

});

;require.register("src/scripts/getprice.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getPrice = getPrice;
function getPrice() {
	var filePath = 'assets/images/price/';
	var fileName = 'wholesale_price.pdf';
	var srcFile = document.createElement('a');
	srcFile.setAttribute('href', filePath + fileName);
	srcFile.download = fileName;
	srcFile.click();
}

});

;require.register("src/scripts/inputmask.js", function(exports, require, module) {
"use strict";

/* ===========================================================
 * Bootstrap: inputmask.js v3.1.0
 * http://jasny.github.io/bootstrap/javascript/#inputmask
 *
 * Based on Masked Input plugin by Josh Bush (digitalbush.com)
 * ===========================================================
 * Copyright 2012-2014 Arnold Daniels
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {
  "use strict";

  var isIphone = window.orientation !== undefined;
  var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  var isIE = window.navigator.appName == 'Microsoft Internet Explorer';

  // INPUTMASK PUBLIC CLASS DEFINITION
  // =================================

  var Inputmask = function Inputmask(element, options) {
    if (isAndroid) return; // No support because caret positioning doesn't work on Android

    this.$element = $(element);
    this.options = $.extend({}, Inputmask.DEFAULTS, options);
    this.mask = String(this.options.mask);

    this.init();
    this.listen();

    this.checkVal(); //Perform initial check for existing values
  };

  Inputmask.DEFAULTS = {
    mask: "",
    placeholder: "_",
    definitions: {
      '9': "[0-9]",
      'a': "[A-Za-z]",
      'w': "[A-Za-z0-9]",
      'h': "[A-Fa-f0-9]",
      '*': "."
    }
  };

  Inputmask.prototype.init = function () {
    var defs = this.options.definitions;
    var len = this.mask.length;

    this.tests = [];
    this.partialPosition = this.mask.length;
    this.firstNonMaskPos = null;

    $.each(this.mask.split(""), $.proxy(function (i, c) {
      if (c == '?') {
        len--;
        this.partialPosition = i;
      } else if (defs[c]) {
        this.tests.push(new RegExp(defs[c]));
        if (this.firstNonMaskPos === null) this.firstNonMaskPos = this.tests.length - 1;
      } else {
        this.tests.push(null);
      }
    }, this));

    this.buffer = $.map(this.mask.split(""), $.proxy(function (c, i) {
      if (c != '?') return defs[c] ? this.options.placeholder : c;
    }, this));

    this.focusText = this.$element.val();

    this.$element.data("rawMaskFn", $.proxy(function () {
      return $.map(this.buffer, function (c, i) {
        return this.tests[i] && c != this.options.placeholder ? c : null;
      }).join('');
    }, this));
  };

  Inputmask.prototype.listen = function () {
    if (this.$element.attr("readonly")) return;

    var pasteEventName = (isIE ? 'paste' : 'input') + ".bs.inputmask";

    this.$element.on("unmask.bs.inputmask", $.proxy(this.unmask, this)).on("focus.bs.inputmask", $.proxy(this.focusEvent, this)).on("blur.bs.inputmask", $.proxy(this.blurEvent, this)).on("keydown.bs.inputmask", $.proxy(this.keydownEvent, this)).on("keypress.bs.inputmask", $.proxy(this.keypressEvent, this)).on(pasteEventName, $.proxy(this.pasteEvent, this));
  };

  //Helper Function for Caret positioning
  Inputmask.prototype.caret = function (begin, end) {
    if (this.$element.length === 0) return;
    if (typeof begin == 'number') {
      end = typeof end == 'number' ? end : begin;
      return this.$element.each(function () {
        if (this.setSelectionRange) {
          this.setSelectionRange(begin, end);
        } else if (this.createTextRange) {
          var range = this.createTextRange();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();
        }
      });
    } else {
      if (this.$element[0].setSelectionRange) {
        begin = this.$element[0].selectionStart;
        end = this.$element[0].selectionEnd;
      } else if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
      }
      return {
        begin: begin,
        end: end
      };
    }
  };

  Inputmask.prototype.seekNext = function (pos) {
    var len = this.mask.length;
    while (++pos <= len && !this.tests[pos]) {}

    return pos;
  };

  Inputmask.prototype.seekPrev = function (pos) {
    while (--pos >= 0 && !this.tests[pos]) {}

    return pos;
  };

  Inputmask.prototype.shiftL = function (begin, end) {
    var len = this.mask.length;

    if (begin < 0) return;

    for (var i = begin, j = this.seekNext(end); i < len; i++) {
      if (this.tests[i]) {
        if (j < len && this.tests[i].test(this.buffer[j])) {
          this.buffer[i] = this.buffer[j];
          this.buffer[j] = this.options.placeholder;
        } else break;
        j = this.seekNext(j);
      }
    }
    this.writeBuffer();
    this.caret(Math.max(this.firstNonMaskPos, begin));
  };

  Inputmask.prototype.shiftR = function (pos) {
    var len = this.mask.length;

    for (var i = pos, c = this.options.placeholder; i < len; i++) {
      if (this.tests[i]) {
        var j = this.seekNext(i);
        var t = this.buffer[i];
        this.buffer[i] = c;
        if (j < len && this.tests[j].test(t)) c = t;else break;
      }
    }
  }, Inputmask.prototype.unmask = function () {
    this.$element.unbind(".bs.inputmask").removeData("bs.inputmask");
  };

  Inputmask.prototype.focusEvent = function () {
    this.focusText = this.$element.val();
    var len = this.mask.length;
    var pos = this.checkVal();
    this.writeBuffer();

    var that = this;
    var moveCaret = function moveCaret() {
      if (pos == len) that.caret(0, pos);else that.caret(pos);
    };

    moveCaret();
    setTimeout(moveCaret, 50);
  };

  Inputmask.prototype.blurEvent = function () {
    this.checkVal();
    if (this.$element.val() !== this.focusText) {
      this.$element.trigger('change');
      this.$element.trigger('input');
    }
  };

  Inputmask.prototype.keydownEvent = function (e) {
    var k = e.which;

    //backspace, delete, and escape get special treatment
    if (k == 8 || k == 46 || isIphone && k == 127) {
      var pos = this.caret(),
          begin = pos.begin,
          end = pos.end;

      if (end - begin === 0) {
        begin = k != 46 ? this.seekPrev(begin) : end = this.seekNext(begin - 1);
        end = k == 46 ? this.seekNext(end) : end;
      }
      this.clearBuffer(begin, end);
      this.shiftL(begin, end - 1);

      return false;
    } else if (k == 27) {
      //escape
      this.$element.val(this.focusText);
      this.caret(0, this.checkVal());
      return false;
    }
  };

  Inputmask.prototype.keypressEvent = function (e) {
    var len = this.mask.length;

    var k = e.which,
        pos = this.caret();

    if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
      //Ignore
      return true;
    } else if (k) {
      if (pos.end - pos.begin !== 0) {
        this.clearBuffer(pos.begin, pos.end);
        this.shiftL(pos.begin, pos.end - 1);
      }

      var p = this.seekNext(pos.begin - 1);
      if (p < len) {
        var c = String.fromCharCode(k);
        if (this.tests[p].test(c)) {
          this.shiftR(p);
          this.buffer[p] = c;
          this.writeBuffer();
          var next = this.seekNext(p);
          this.caret(next);
        }
      }
      return false;
    }
  };

  Inputmask.prototype.pasteEvent = function () {
    var that = this;

    setTimeout(function () {
      that.caret(that.checkVal(true));
    }, 0);
  };

  Inputmask.prototype.clearBuffer = function (start, end) {
    var len = this.mask.length;

    for (var i = start; i < end && i < len; i++) {
      if (this.tests[i]) this.buffer[i] = this.options.placeholder;
    }
  };

  Inputmask.prototype.writeBuffer = function () {
    return this.$element.val(this.buffer.join('')).val();
  };

  Inputmask.prototype.checkVal = function (allow) {
    var len = this.mask.length;
    //try to place characters where they belong
    var test = this.$element.val();
    var lastMatch = -1;

    for (var i = 0, pos = 0; i < len; i++) {
      if (this.tests[i]) {
        this.buffer[i] = this.options.placeholder;
        while (pos++ < test.length) {
          var c = test.charAt(pos - 1);
          if (this.tests[i].test(c)) {
            this.buffer[i] = c;
            lastMatch = i;
            break;
          }
        }
        if (pos > test.length) break;
      } else if (this.buffer[i] == test.charAt(pos) && i != this.partialPosition) {
        pos++;
        lastMatch = i;
      }
    }
    if (!allow && lastMatch + 1 < this.partialPosition) {
      this.$element.val("");
      this.clearBuffer(0, len);
    } else if (allow || lastMatch + 1 >= this.partialPosition) {
      this.writeBuffer();
      if (!allow) this.$element.val(this.$element.val().substring(0, lastMatch + 1));
    }
    return this.partialPosition ? i : this.firstNonMaskPos;
  };

  // INPUTMASK PLUGIN DEFINITION
  // ===========================

  var old = $.fn.inputmask;

  $.fn.inputmask = function (options) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.inputmask');

      if (!data) $this.data('bs.inputmask', data = new Inputmask(this, options));
    });
  };

  $.fn.inputmask.Constructor = Inputmask;

  // INPUTMASK NO CONFLICT
  // ====================

  $.fn.inputmask.noConflict = function () {
    $.fn.inputmask = old;
    return this;
  };

  // INPUTMASK DATA-API
  // ==================

  $(document).on('focus.bs.inputmask.data-api', '[data-mask]', function (e) {
    var $this = $(this);
    if ($this.data('bs.inputmask')) return;
    $this.inputmask($this.data());
  });
}(window.jQuery);

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.jQuery = require("jquery");
window.Popper = require("popper.js/dist/umd/popper");
window.bootstrap = require("bootstrap");


});})();require('___globals___');


//# sourceMappingURL=app.js.map