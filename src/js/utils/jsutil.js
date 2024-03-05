import Taro from "@tarojs/taro";
import MD5 from "../../core/md5";
import _, {
  groupBy,
  sortBy,
  find,
  findIndex,
  forEach,
  isEqual,
  uniqWith,
  remove,
  get
} from "lodash";
import mjcom from "@/GGCore/mjcommon";

/**
 * 通用工具类
 * @author Chentao
 */
const JsUtil = {
  // 配置文件
  // taro对象
  taro: {
    navigateTo: Taro.navigateTo,
    navigateBack: Taro.navigateBack,
    reLaunch: Taro.reLaunch,
    setNavigationBarTitle: Taro.setNavigationBarTitle,
    showModal: Taro.showModal
  },
  param: mjcom.param,
  callback: {}, // 回调方法定义
  /**
   * 数据埋点封装
   * @param {Obj} param {alipayMd: '支付宝数据埋点对象', geitMd:'国光埋点数据对象'}
   *      alipayMd : {name: '交易类型', flag: '成功失败 true/false', time: '时间（毫秒）', resCode: '返回码'}
   */
  api: param => {},
  // 算法类
  algorithms: mjcom.algorithms,
  // 调试对象
  debug: {
    // 获取金额，如果是debug模式就设置为0.01
    getFee: function(amt) {
      if (JsUtil.param.isDebug) return "0.01";
      return JsUtil.yuan2Fixed2(amt);
    }
  },
  // 日志封装
  logger: mjcom.logger,
  check: {
    /**
     * 判断环境
     */
    getEnv: () => {
      return Taro.getEnv();
    },
    /**
     * 获取rhms支付类型
     */
    getPayType: () => {
      if (JsUtil.check.getEnv() === "WEAPP") return "02";
      else if (JsUtil.check.getEnv() === "ALIPAY") "01";
      return "02";
    }
  },
  // xml转json
  x2js: {
    /**
     * json转xml字符串
     * @param {Object} obj js对象只有1级的这种
     * @param {String} rootName 根节点名称
     */
    json2xml_str: (obj, rootName) => {
      let name = JsUtil.sEmpty(rootName, "Request");
      let s = "<" + name + ">";
      s += JsUtil.x2js.appendXmlKeyValue(obj);
      s += "</" + name + ">";
      return s;
    },
    /**
     * 将key-value格式的值转换成<key>value</key>
     * @param {Object} obj key-value格式的值
     */
    appendXmlKeyValue: obj => {
      let s = "";
      for (let i in obj) {
        let val = obj[i];
        s += "<" + i + ">" + val + "</" + i + ">";
      }
      return s;
    }
  },
  // 字符串相关处理工具
  string: {
    // 在str中用s2字符替换s1字符
    replaceAll: function(str, s1, s2) {
      let reg = new RegExp(s1, "gm");
      return str.replace(reg, s2);
    },
    // 替换全局函数
    replaceGDomain: function(s) {
      if (JsUtil.isEmpty(s)) "";
      var r = "{Global.DomainName}";
      return JsUtil.string.replaceAll(s, r, JsUtil.param.imgRootUrl);
    },
    // 转换html内容
    escape2Html: function(str) {
      var arrEntities = {
        lt: "<",
        gt: ">",
        nbsp: " ",
        amp: "&",
        quot: '"',
        middot: "·",
        amp: "&",
        brvbar: "¦",
        mdash: "—",
        ndash: "–",
        ge: "≥",
        le: "≤",
        laquo: "«",
        raquo: "»",
        deg: "°",
        bull: "•",
        macr: "¯",
        "#64": "@"
      };
      return str.replace(
        /&(lt|gt|nbsp|amp|quot|middot|amp|brvbar|mdash|ndash|ge|le|laquo|raquo|deg|bull|macr|#64);/gi,
        function(all, t) {
          if (all === "&nbsp;") return "\xa0";
          return arrEntities[t];
        }
      );
    },
    /**
     * 日期格式化yyyyMMddHHmmss 转 yyyy-MM-dd HH:mm:ss
     * @param {string} s yyyyMMddHHmmss格式日期
     */
    formatPrettyDateTime: s => {
      if (s.length < 14) return "error datetime";
      let year = s.substring(0, 4);
      let month = s.substring(4, 6);
      let date = s.substring(6, 8);
      let hour = s.substring(8, 10);
      let minutes = s.substring(10, 12);
      let seconds = s.substring(12);
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    /**
     * 日期格式化yyyyMMdd 转 yyyy-MM-dd
     * @param {string} s yyyyMMdd格式日期
     */
    formatPrettyDate: s => {
      if (s.length < 8) return "error date";
      let year = s.substring(0, 4);
      let month = s.substring(4, 6);
      let date = s.substring(6, 8);
      return year + "-" + month + "-" + date;
    },
    /**
     * 根据日期换星期几
     * @param {*} dateString yyyy-MM-dd
     * @returns 周一/二三四五六日
     */
    getWeek: dateString => {
      let dateArray = dateString.split("-");
      let date = new Date(
        dateArray[0],
        parseInt(dateArray[1] - 1),
        dateArray[2]
      );
      return "周" + "日一二三四五六".charAt(date.getDay());
    },

    getCurrentTime: n => {
      var uom = new Date(new Date() - 0 + n * 86400000);
      var hou = uom.getHours();
      var minu = uom.getMinutes();
      var sec = uom.getSeconds();
      if (hou.toString().length < 2) {
        hou = "0" + hou;
      }
      if (minu.toString().length < 2) {
        minu = "0" + minu;
      }
      if (sec.toString().length < 2) {
        sec = "0" + sec;
      }

      return hou + "" + minu + "" + sec;
    }
  },
  /**
   * 过滤数组或者对象
   * 就是不管这个是数组还是对象，出参都是数组
   * */
  toCtArray: function(o) {
    var arr = [];
    if (Array.isArray(o)) arr = o;
    else if (typeof o == "object") arr.push(o);
    return arr;
  },
  /**
   * 另外一种过滤数组和对象的方式，可以自己定义itemName
   * @param {Object} o 待处理的对象可以是数组也可以是对象
   * @param {String} itemName key名称
   * @returns ArryList
   */
  toCtArray2: function(o, itemName) {
    var arr = [];
    if (Array.isArray(o)) arr = o;
    else if (typeof o == "object") arr.push(o[itemName]);
    return arr;
  },
  /**
   * 判断是否是空对象
   * @param {object} s
   */
  isEmpty: s => {
    if (s === null) return true;
    if (s === undefined) return true;
    if (s === "") return true;
    if (Array.isArray(s)) if (s.length == 0) return true;
    // 首先判断是否是对象，如果是对象再看是否未空对象，得放在Array下面
    if (typeof s === "object") if (Object.keys(s).length === 0) return true;
    return false;
  },
  /**
   * 空对象返回默认值
   * @param {Object} s
   * @param {String} defVal
   */
  sEmpty: (s, defVal) => {
    if (JsUtil.isEmpty(s)) {
      if (JsUtil.isEmpty(defVal)) return "";
      return defVal;
    }
    return s;
  },
  /**
   * 归类处理，目前利用lodash处理分类
   * @param {Collections} li
   * @param {String} name
   */
  groupBy: (li, name) => {
    return groupBy(li, name);
  },
  /**
   * 排序,默认升序
   * @param {*} li
   * @param {*} name
   */
  sortBy: (li, name, flag) => {
    let rows = sortBy(li, name);
    if (flag === "DESC") rows.reverse();
    return rows;
  },
  /**
   * for循环处理
   * @param {*} li
   * @param {*} func
   */
  forEach: (li, func) => {
    forEach(li, func);
  },
  /**
   * 查询处理
   * @param {Object} obj
   * @param {Object} fiter
   */
  find: (obj, fiter) => {
    return find(obj, fiter);
  },
  findIndex: (obj, fiter) => {
    return findIndex(obj, fiter);
  },
  remove: (obj, fiter) => {
    return remove(obj, fiter);
  },
  isEqual: (obj, other) => {
    return isEqual(obj, other);
  },
  uniqWith: (arr, comparator) => {
    if (!JsUtil.isEmpty(comparator)) return uniqWith(arr, comparator);
    return uniqWith(arr, JsUtil.isEqual);
  },
  // 转json为key=value&key2=value2格式
  raw: args => {
    let keys = Object.keys(args);
    keys = keys.sort();
    let newArgs = {};
    keys.forEach(function(key) {
      newArgs[key] = args[key];
    });
    let result = "";
    for (let k in newArgs) {
      if (newArgs.hasOwnProperty(k)) {
        let o = newArgs[k];
        if (typeof o == "object") o = JSON.stringify(newArgs[k], null);
        result += "&" + k + "=" + o;
      }
    }
    result = result.substr(1);
    return result;
  },
  /**
   * 中台http交互请求,内部业务处理
   * 1.对请求体进行base64加密处理
   * 2.对请求体进行md5签名处理
   * @param {Object} param
   * @param {Functions} func
   */
  middleHttpRequestInner: mjcom.middleHttpRequestInner,
  /**
   * 中台http交互请求,
   * 1.对请求体进行base64加密处理
   * 2.对请求体进行md5签名处理
   * @param {Object} param
   * @param {Functions} func
   */
  middleHttpRequest: mjcom.middleHttpRequest,
  /**
   * 显示加载中提示框,只有调用了hideLoading才会隐藏
   * @param {String} msg
   */
  showLoading: mjcom.showLoading,
  /**
   * 隐藏加载中
   */
  hideLoading: mjcom.hideLoading,
  /**
   * 提示信息
   * @param {String} msg
   */
  info: mjcom.info,
  /**
   * 警告消息
   * @param {String} msg
   */
  warn: mjcom.warn,
  /* 按模式取系统日期时间 */
  // 日期格式化
  // 格式 YYYY/yyyy/YY/yy 表示年份
  // MM 月份
  // W/w 星期
  // dd/DD/d/D 日期
  // hh/HH/h/H 时间
  // mm/m 分钟
  // ss/SS/s/S 秒
  getFomatDate: mjcom.getFomatDate,
  /**
   * 获取相对今天的日期，时间
   * 格式 yyyy-MM-dd
   * @param n 相对今天的天数（ -1 代表昨天）（+1 代表明天）
   */
  getNormalDateAny: n => {
    let uom = new Date(new Date() - 0 + n * 86400000);
    let umm = uom.getMonth() + 1;
    if (umm.toString().length < 2) {
      umm = "0" + umm;
    }
    let udd = uom.getDate();
    if (udd.toString().length < 2) {
      udd = "0" + udd;
    }
    return uom.getFullYear() + "-" + umm + "-" + udd;
  },
  /**
   * 获取相对今天的日期，时间
   * 格式 yyyyMMdd
   * @param n 相对今天的天数（ -1 代表昨天）（+1 代表明天）
   */
  getNormalDateAny2: n => {
    let uom = new Date(new Date() - 0 + n * 86400000);
    let umm = uom.getMonth() + 1;
    if (umm.toString().length < 2) {
      umm = "0" + umm;
    }
    let udd = uom.getDate();
    if (udd.toString().length < 2) {
      udd = "0" + udd;
    }
    return uom.getFullYear() + "" + umm + "" + udd;
  },
  /**
   * 获取一个日期时间数组
   * @param {int} num
   */
  getDateWeek: num => {
    const timestamp = Date.now();
    // const timestamp = new Date(2019, 7, 30, 0, 0, 0, 0).getTime()
    const dateWeek = Array.from(new Array(num)).map((_, i) => {
      /* 得到当前周每一天的时间戳 */
      const weekTimestamp = new Date(timestamp + i * 24 * 60 * 60 * 1000);

      const date =
        String(weekTimestamp.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(new Date(weekTimestamp).getDate()).padStart(2, "0");

      /* 得到周几后转换 */
      let week = weekTimestamp.getDay();
      switch (week) {
        case 0:
          week = "周日";
          break;
        case 1:
          week = "周一";
          break;
        case 2:
          week = "周二";
          break;
        case 3:
          week = "周三";
          break;
        case 4:
          week = "周四";
          break;
        case 5:
          week = "周五";
          break;
        case 6:
          week = "周六";
          break;
      }

      return { date, week };
    });
    return dateWeek;
  },
  /**
   * 生成一个流水号
   */
  createFlowNo: () => {
    let a = JsUtil.createRandomNum(6); // 生成六位随机数字
    return JsUtil.getFomatDate("yyyyMMddHHmmss") + "" + a;
  },
  /**
   * 生成一个随机数字
   */
  createRandomNum: len => {
    let chars = "1234567890";
    let f = 0,
      value = "";
    for (let i = 0; i < len; i++) {
      f = parseInt(10 * Math.random());
      value += chars.charAt(f);
    }
    return value;
  },
  // 获得随机字符串
  getRandomString: len => {
    len = len || 32;
    let $chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let maxPos = $chars.length;
    let pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  doWxSign: s => {
    return JsUtil.doMd5(s, "ErThh9yIyTjVQKAT14mMZExI7NIqzNYx");
  },
  /**
   * 计算Md5值
   * @param {String} orginString 待加密字符串
   * @param {String} key 加密密钥
   */
  doMd5: mjcom.doMd5,
  // 转json为key=value&key2=value2格式
  raw: mjcom.raw,
  // 去除两边空白
  trim: str => {
    if (JsUtil.isEmpty(str)) return "";
    return str.replace(/(^\s*)|(\s*)$/g, "");
  },
  /**
   * 根据日期字符串获取星期几
   * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
   * @returns {String}
   */
  getWeek: dateString => {
    let date;
    if (dateString == null || typeof dateString == "undefined") {
      date = new Date();
    } else {
      let dateArray = dateString.split("-");
      date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
    //return "星期" + weeks[date.getDay()];
    return "星期" + "日一二三四五六".charAt(date.getDay());
  },
  /**
   * 两个金额元相加的操作
   */
  yuanPlusYuan: (num1, num2) => {
    let sum = new Number(parseFloat(num1) + parseFloat(num2)).toFixed(2);
    return sum;
  },
  /**
   * 元转换为分的操作
   */
  yuan2Fen: yuan => {
    return (parseFloat(yuan) * 100).toFixed(0);
  },
  /**
   * 元转换为小数点后俩位的操作
   */
  yuan2Fixed2: yuan => {
    return parseFloat(yuan).toFixed(2);
  },
  //20180819 ->  2018-08-19
  //20190924080808 -> 2019-09-24
  formatDate: str => {
    if (str.length >= 8) {
      let year = str.substring(0, 4);
      let month = str.substring(4, 6);
      let day = str.substring(6, 8);
      return year + "-" + month + "-" + day;
    } else {
      return str;
    }
  },
  // 格式化安全代码
  formatSafeCardNo: str => {
    if (JsUtil.isEmpty(str)) return "";
    if (str.length > 8) {
      let rs =
        str.substring(0, 4) + "***" + str.substring(str.length - 2, str.length);
      if (str.length === 11)
        rs =
          str.substring(0, 4) +
          "***" +
          str.substring(str.length - 4, str.length);
      return rs;
    }
    return str;
  },
  //身份证号进行脱敏处理
  formatPrivateID: str => {
    if (str.length == 18) {
      let rs = str.substring(0, 4) + "**********" + str.substring(14, 18);
      return rs;
    }

    if (str.length == 15) {
      let rs = str.substring(0, 4) + "**********" + str.substring(11, 15);
      return rs;
    }
    return str;
  },
  //手机号进行脱敏处理
  formatPrivatePhone: str => {
    if (str.length == 11) {
      let rs = str.substring(0, 2) + "*******" + str.substring(9, 11);
      return rs;
    }
    return str;
  },
  // 通过IdNo区分男女
  calSexByIdNo: function(idCard) {
    idCard = idCard.replace(/ /g, ""); // 对身份证号码做处理。包括字符间有空格。
    if (idCard.length == 15) {
      if (idCard.substring(14, 15) % 2 == 0) {
        return "女";
      } else {
        return "男";
      }
    } else if (idCard.length == 18) {
      if (idCard.substring(14, 17) % 2 == 0) {
        return "女";
      } else {
        return "男";
      }
    } else {
      return null;
    }
  },
  // 通过IdNo算出生日期
  calBirthdayByIdNo: function(idCard) {
    idCard = idCard.replace(/ /g, ""); // 对身份证号码做处理。包括字符间有空格。
    if (idCard.length == 15) {
      var idCard15 = idCard;
      var year = idCard15.substring(6, 8);
      var month = idCard15.substring(8, 10);
      var day = idCard15.substring(10, 12);
      var temp_date = "19" + year + "-" + month + "-" + day;
    } else if (idCard.length == 18) {
      var idCard18 = idCard;
      var year = idCard18.substring(6, 10);
      var month = idCard18.substring(10, 12);
      var day = idCard18.substring(12, 14);
      var temp_date = year + "-" + month + "-" + day;
    } else return null;
    return temp_date;
  },
  // 通过IdNo算年龄
  calAgeByIdNo: function(idCard) {
    idCard = idCard.replace(/ /g, ""); // 对身份证号码做处理。包括字符间有空格。
    var today = new Date();
    var str = "yyyy";
    var thisYear = str.replace(/yyyy|YYYY/, today.getFullYear());
    if (idCard.length == 15) {
      var year = "19" + idCard.substring(6, 8);
      var age = Number(thisYear) - Number(year);
    } else if (idCard.length == 18) {
      var year = idCard.substring(6, 10);
      var age = Number(thisYear) - Number(year);
    } else return null;
    return age + "";
  },
  // 检查电话号码
  testPhoneNo: phone => {
    return /^1[0123456789]\d{9}$/.test(phone);
  },
  // 检查名字
  testName: name => {
    if (JsUtil.isEmpty(name)) return false;
    return /^([\u4e00-\u9fa5]){2,7}$/.test(name);
  },
  // 检查身份证号
  testIdNo: idNo => {
    if (JsUtil.isEmpty(idNo)) return false;
    return IdCardValidate(idNo);
  },
  // 检查就诊卡号
  testHisCardNo: no => {
    return /^[0123456789]\d{3,20}$/.test(no);
  },
  // 检查住院号
  testHosNo: no => {
    return /^[0123456789]\d{3,20}$/.test(no);
  },
  // 检查文本内容
  testTxt: txt => {
    if (txt == "") return false;
    return /[“]+|[”]+|[：]+/.test(txt);
  },
  nav: {
    /**
     * 跳转AI预问诊
     */
    toAiPrediagnose: () => {
      Taro.navigateToMiniProgram({
        appId: "wx1ccb00ea4ab483fe",
        path:
          "pages/prediagnosis?partnerId=100000363&hospitalId=20002841&registerId=000001",
        success: function(res) {
          JsUtil.logger.log("suc = ", res);
          // 打开成功
          JsUtil.warn("suc to ai diagnose");
        }
      });
    }
  },
  // 测试用
  test: () => {
    Taro.navigateToMiniProgram({
      appId: "wx1ccb00ea4ab483fe",
      path:
        "pages/prediagnosis?partnerId=100000363&hospitalId=20002841&registerId=000001",
      success: function(res) {
        JsUtil.logger.log("suc = ", res);
        // 打开成功
        JsUtil.warn("suc");
      }
    });
  },

  
};

export default JsUtil;
