/* 
  常用的js工具类
*/
const methodsUtil = {

  // 获取地址栏参数，兼容中文
  getUrlKey(name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  },

  // 清空字符串两边指定字符
  tirmString(str, char, type) {
    // str:需要被清除的字符串；char:需要清除的字符；type:清除字符串左边还是右边
    if (char) {
      if (type == "left") {
        return str.replace(new RegExp("^\\" + char + "+", "g"), "");
      } else if (type == "right") {
        return str.replace(new RegExp("\\" + char + "+$", "g"), "");
      }
      return str.replace(
        new RegExp("^\\" + char + "+|\\" + char + "+$", "g"),
        ""
      );
    }
    return str.replace(/^\s+|\s+$/g, ""); // 清除空格
  },

  // 返回顶部
  scrollTop(number = 0, time) {
    // number:距离顶部距离；time:回到顶部的时间
    if (!time) {
      document.body.scrollTop = document.documentElement.scrollTop = number;
      return number;
    }
    const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime; // 计算循环的次数
    let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
    let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
    let scrollTimer = setInterval(() => {
      if (spacingInex > 0) {
        spacingInex--;
        scrollTop((nowTop += everTop));
      } else {
        clearInterval(scrollTimer); // 清除计时器
      }
    }, spacingTime);
  },

  // 获取对象中某个值,不存在返回null: getObjValue(obj,['key'])
  getObjValue(obj, keys) {
    return keys.reduce(function (xs, x) {
      return xs && xs[x] ? xs[x] : null;
    }, obj);
  },

  // 隐藏手机中间/后四位
  phoneHide(tel, type) {
    tel = "" + tel;
    let phone;
    if (type == "mid") {
      phone = tel.replace(tel.substring(3, 7), "****");
    } else if (type == "end") {
      phone = tel.replace(tel.substring(7, 11), "****");
    }
    return phone;
  },

  // 设置cookie
  setCookie(name, value, expires, domain, path, secure) {
    var cookieText = "";
    cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires) {
      var exp = new Date();
      exp.setTime(exp.getTime() + expires * 24 * 60 * 60 * 1000);
      cookieText += "; expires=" + exp.toGMTString();
    }
    if (domain) {
      cookieText += "; domain=" + domain;
    }
    if (path) {
      cookieText += "; path=" + path;
    }
    if (secure) {
      cookieText += "; secure";
    }
    document.cookie = cookieText;
  },

  // 获取cookie
  getCookie(name) {
    var cookieName = encodeURIComponent(name) + "=",
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = "";
    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      );
    }
    return cookieValue;
  },

  // 删除cookie
  removeCookie = (name, domain, path, secure) => {
    setCookie(name, "", Date(0), domain, path, secure);
  },

  // rgb to Hex
  RGBToHex = (r, g, b) => {
    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
  },

  // Hex to rgb
  hexToRGB = (hex) => {
    var alpha = false,
      h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) h = _toConsumableArray(h).map(function (x) {
      return x + x;
    }).join(''); else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return 'rgb' + (alpha ? 'a' : '') + '(' + (h >>> (alpha ? 24 : 16)) + ', ' + ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) + ', ' + ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) + (alpha ? ", ".concat(h & 0x000000ff) : '') + ')';
  },

  // 客户端生成uuid
  UUIDGeneratorBrowser = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
  },

  // node端生成uuid
  UUIDGeneratorNode = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (c ^ crypto.randomBytes(1)[0] & 15 >> c / 4).toString(16);
    });
  },

  // 复制到粘贴板
  copyToClipboard = (str) => {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  },

  // 深复制
  deepClone = (obj) => {
    var clone = Object.assign({}, obj);
    Object.keys(clone).forEach(function (key) {
      return clone[key] = _typeof(obj[key]) === 'object' ? deepClone(obj[key]) : obj[key];
    });
    return Array.isArray(obj) && obj.length ? (clone.length = obj.length) && Array.from(clone) : Array.isArray(obj) ? Array.from(obj) : clone;
  },

  // 获取滚动条坐标
  getScrollPosition = () => {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    return {
      x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
      y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
    }
  },
  
  // http request :GET
  httpGet(url, callback) {
    var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.error;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      return callback(request.responseText);
    };

    request.onerror = function () {
      return err(request);
    };

    request.send();
  },

  // http request :POST
  httpPost(url, data, callback) {
    var err = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : console.error;
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    request.onload = function () {
      return callback(request.responseText);
    };

    request.onerror = function () {
      return err(request);
    };

    request.send(data);
  },

  // http redirect
  httpsRedirect() {
    if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
  },

  // 判断变量类型
  is(type, val) {
    return ![, null].includes(val) && val.constructor === type;
  },

}

module.exports = methodsUtil