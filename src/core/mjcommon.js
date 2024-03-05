import {Config, Config_Dev, Config_Pro} from "../js/config";
import MainConfig from "../config";
import PublicConfig from "../js/PublicConfig.json";
import Taro from '@tarojs/taro';
import MD5 from './md5';
import {isEmpty, groupBy, sortBy, find, findIndex, forEach, isEqual, uniqWith, remove, map} from 'lodash';
import { Step } from "./step";

const mjcom = {
    param: Config.Params,
    init:{
        doAppInit:(param, func)=>{
            window.StepCache = {}; // 初始化 StepCache
            window.StepCache.PageData = {}; // 初始化页面参数
            window.StepCache.CurrentDatas = []; // 初始化当前数据集合，路由跳转使用
            window.GG = {};
            window.GG.DataCache = {};
            window.GG.StepContent = {
                PatInfo: {}
            };
            window.GG.AjaxParams = {};
            mjcom.logger.log('-------------')
            // 加载第一个页面
            // step1. 加载所有自定义文件内容
            func.success();
            
        },
        // 获取请求参数
        GetRequests:() =>{
            let url = location.search; // 获取url中"?"符后的字串 
            let theRequest = new Object(); 
            if (url.indexOf("?") != -1) { 
                let str = url.substr(1); 
                let strs = str.split("&"); 
                for(let i = 0; i < strs.length; i ++) { 
                    let index = strs[i].indexOf("=");
                    if(index>-1){
                        let name = strs[i].substr(0, index);
                        let value = strs[i].substr(index+1);
                        let newValue = value;
                        try{
                            newValue = decodeURIComponent(value);
                        }catch(e){
                            newValue = value;
                        }
                        theRequest[name] = newValue; 
                    }
                } 
            } 
            return theRequest; 
        }
    },
    scache:()=>{
        return window.StepCache;
    },
    mDataCache:()=>{
        return window.GG.DataCache;
    },
    clearDataCache:()=>{
        window.GG.DataCache = {};
    },
    mStepContent:()=>{
        return window.GG.StepContent;
    },
    mAjaxParams:()=>{
        return window.GG.AjaxParams;
    },
    /**
     * 新增一条路由对象
     * @param {*} o { activeMap: mapObj, activePage: pageObj, activeNode: stepObj, activePageStep: pageStep, activeStep: fnStep };
     * activeMap 当前激活的地图json文件对象
     * activePage 当前激活的Page节点数据对象
     * activeNode 当前激活的节点数据对象，可能是Page节点数据对象也可能是Step节点数据对象
     * activePageStep 当前激活的Step, type=flex的配置信息数据
     * activeStep 当前激活的Step, type=flex/ajax/data的配置数据
     */
    insertCurrentData:(o)=>{
        mjcom.scache().CurrentDatas.push(o);
    },
    /**
     * 向页面栈数据列表删除最后一项数据
     */
    popCurrentData:()=>{
       return mjcom.scache().CurrentDatas.pop();
    },
    /**
     * 清空当前缓存
     */
    clearCurrentData:()=>{
        mjcom.scache().CurrentDatas = [];
    },
    /**
     * 替换所有的数据
     * @param {array} rows 
     */
    replaceCurrentDatas:(rows)=>{
        mjcom.scache.CurrentDatas = rows;
    },
    /**
     * 重置当前值
     * 只保留最近的一个地址
     */
    relaunchCurrentData:(activeData)=>{
        // 当前环境是H5的情况下的特殊处理
        if(Taro.getEnv()==="WEB"){
            const currentDatas = mjcom.scache().CurrentDatas;
            const len = currentDatas.length;
            const lastData = mjcom.scache().CurrentDatas[len-1];
            let num = 0;
            for(let i=0; i<len; i++){
                const cData = mjcom.popCurrentData();
                num++;
                const namespace = cData.activeMap.namespace
                const activeNodeId = cData.activeNode.id;
                // 原来对应V3的时候需要activeNodeId 后面再看看是否要放开
                // if(namespace===activeData.activeMap.namespace && activeNodeId===activeData.activeNode.id){
                //     mjcom.scache().CurrentDatas = [cData];
                //     break;
                // }
                const mod = activeData.activePageStep.config.config.mod;
                if(mod===cData.activePageStep.config.config.mod){
                    // mjcom.insertCurrentData(activeData) // 模板名一致的情况下用最新的模板缓存
                    mjcom.scache().CurrentDatas = [activeData];
                    break;
                }
            }
            return num;
        }
        return 0;
    },
    /**
     * 从堆栈中获取与之相同的mod值
     * 并获取后退的个数
     * return 后退的个数
     */
     GetBackToNums:(activeData)=>{
         const currentDatas = mjcom.scache().CurrentDatas;
         const len = currentDatas.length;
         let num = 0;
         for (let i = 0; i < len; i++) {
             const cData = currentDatas[i];
             num++;
             const mod = activeData.activePageStep.config.config.mod;
             if (mod === cData.activePageStep.config.config.mod) {
                //  debugger
                 break;
             }
         }
         return (len - num);
    },
    /** 
     * 获取当前最新的数据
     */
    getCurrentData:(datas)=>{
        if(!mjcom.isEmpty(datas)) return datas[datas.length-1];
        let len = mjcom.scache().CurrentDatas.length;
        const o = mjcom.scache().CurrentDatas[len-1];
        return o;
    },
    // 日志封装
    logger:{
        log: console.log,
        warn: console.warn,
        error: console.error
    },
    /**
     * 显示加载中提示框,只有调用了hideLoading才会隐藏
     * @param {String} msg 
     */
    showLoading: (msg) => {
        Taro.hideToast();
        let showMsg = '加载中,请稍等';
        if (!mjcom.isEmpty(msg)) showMsg = msg;
        Taro.showLoading({title: showMsg, mask:true});
    },
    /**
     * 隐藏加载中
     */
    hideLoading: () => {
        Taro.hideLoading();
    },
    /**
     * 提示信息
     * @param {String} msg 
     */
    info: (msg) => {
        mjcom.hideLoading();
        let showMsg = '小提示';
        if (!mjcom.isEmpty(msg)) showMsg = msg;
        Taro.showToast({ title: showMsg, icon: 'none', duration: 3000 });
    },
    /**
     * 警告消息
     * @param {String} msg 
     */
    warn: (msg) => {
        mjcom.hideLoading();
        let showMsg = '加载中';
        if (!mjcom.isEmpty(msg)) showMsg = msg;
        Taro.showToast({ title: showMsg, icon: 'none', duration: 3000 });
    },
    /**
     * 判断s1字符串是否包含s2
     * @param {*} s1 
     * @param {*} s2 
     * @returns 
     */
    contains:(s1, s2)=>{
        if(s1.indexOf(s2)!==-1) return true;
        return false;
    },
    isEmpty:(s)=>{
        if(s===null) return true;
        if(s===undefined) return true;
        if(s==='') return true;
        if(Array.isArray(s)) if(s.length==0) return true;
        // 首先判断是否是对象，如果是对象再看是否未空对象，得放在Array下面
        if(typeof s === 'object') if(Object.keys(s).length===0) return true;
        return false;
    },
    /**
     * 和isEmpty的区别在于不判断空字符串的情况
     * @param {*} s 
     * @returns 
     */
    isRealEmpty:(s)=>{
        if(s===null) return true;
        if(s===undefined) return true;
        if(Array.isArray(s)) if(s.length==0) return true;
        // 首先判断是否是对象，如果是对象再看是否未空对象，得放在Array下面
        if(typeof s === 'object') if(Object.keys(s).length===0) return true;
        return false;
    },
    /**
     * 归类处理，目前利用lodash处理分类
     * @param {Collections} li 
     * @param {String} name 
     */
    groupBy:(li, name)=>{
        return groupBy(li, name);
    },
    /**
     * 排序,默认升序
     * @param {*} li 
     * @param {*} name 
     */
    sortBy:(li, name, flag)=>{
        let rows = sortBy(li, name);
        if(flag==='DESC') rows.reverse();
        return rows;
    },
    /**
     * for循环处理
     * @param {*} li 
     * @param {*} func 
     */
    forEach:(li, func)=>{
        forEach(li, func);
    },
    /**
     * 查询处理
     * @param {Object} obj 
     * @param {Object} fiter 
     */
    find:(obj, fiter)=>{
        return find(obj, fiter);
    },
    findIndex:(obj, fiter)=>{
        return findIndex(obj, fiter);
    },
    remove:(obj, fiter)=>{
        return remove(obj, fiter);
    },
    isEqual:(obj, other)=>{
        return isEqual(obj, other);
    },
    /* 按模式取系统日期时间 */
    // 日期格式化  
    // 格式 YYYY/yyyy/YY/yy 表示年份  
    // MM 月份  
    // W/w 星期  
    // dd/DD/d/D 日期  
    // hh/HH/h/H 时间  
    // mm/m 分钟  
    // ss/SS/s/S 秒
    getFomatDate: (formatStr) => {
        let today = new Date();
        let str = formatStr;
        let Week = ['日', '一', '二', '三', '四', '五', '六'];
        str = str.replace(/yyyy|YYYY/, today.getFullYear());
        str = str.replace(/yy|YY/, (today.getYear() % 100) > 9 ? (today.getYear() % 100).toString() : '0' + (today.getYear() % 100));
        str = str.replace(/MM/, (today.getMonth() + 1) > 9 ? (today.getMonth() + 1).toString() : '0' + (today.getMonth() + 1));
        str = str.replace(/w|W/g, Week[today.getDay()]);
        str = str.replace(/dd|DD/, today.getDate() > 9 ? today.getDate().toString() : '0' + today.getDate());
        str = str.replace(/d|D/g, today.getDate());
        str = str.replace(/hh|HH/, today.getHours() > 9 ? today.getHours().toString() : '0' + today.getHours());
        str = str.replace(/h|H/g, today.getHours());
        str = str.replace(/mm/g, today.getMinutes() > 9 ? today.getMinutes().toString() : '0' + today.getMinutes());
        str = str.replace(/m/g, today.getMinutes());
        str = str.replace(/ss|SS/, today.getSeconds() > 9 ? today.getSeconds().toString() : '0' + today.getSeconds());
        str = str.replace(/s|S/g, today.getSeconds());

        return str;
    },
    /**
     * 获取一个日期时间数组
     * @param {int} num 
     */
     getDateWeek:(num)=>{
        const timestamp = Date.now()
        // const timestamp = new Date(2019, 7, 30, 0, 0, 0, 0).getTime()
        const dateWeek = Array.from(new Array(num)).map((_, i) => {
            /* 得到当前周每一天的时间戳 */
            const weekTimestamp = new Date(timestamp + i * 24 * 60 * 60 * 1000)

            const date = String(weekTimestamp.getMonth() + 1).padStart(2, '0') + '-' +
                String(new Date(weekTimestamp).getDate()).padStart(2, '0');
            
            /* 得到周几后转换 */
            let week = weekTimestamp.getDay()
            switch (week) {
                case 0:
                    week = '周日'
                    break
                case 1:
                    week = '周一'
                    break
                case 2:
                    week = '周二'
                    break
                case 3:
                    week = '周三'
                    break
                case 4:
                    week = '周四'
                    break
                case 5:
                    week = '周五'
                    break
                case 6:
                    week = '周六'
                    break
            }

            return {date, week}
        });
        return dateWeek;
    },
    getFormatDateWeek: (activeDate, num)=>{
        let n = 7;
        if(!mjcom.isEmpty(num)) n = num;
        let dw = mjcom.getDateWeek(n);
        // mjcom.logger.log("dw = ", dw);
        let year = mjcom.getFomatDate("yyyy");
        let today = mjcom.getFomatDate("yyyy-MM-dd");
        if(!mjcom.isEmpty(activeDate)) today = activeDate;
        let dwrows = dw.map((o)=>{
          o.realDate = year+"-"+o.date;
          o.realWeek = mjcom.getWeek(o.realDate);
          if(o.realDate===today) o.isActive=true;
          return o;
        });
        // mjcom.logger.log("dwrows = ", dwrows);
        return dwrows;
    },
    /**
     * 根据日期字符串获取星期几
     * @param dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
     * @returns {String}
     */
     getWeek: (dateString) => {
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
    * 生成一个流水号
    */
    createFlowNo: () => {
        let a = mjcom.createRandomNum(6); // 生成六位随机数字
        return mjcom.getFomatDate('yyyyMMddHHmmss') + '' + a;
    },
    /**
     * 生成一个随机数字
     */
    createRandomNum: (len) => {
        let chars = '1234567890';
        let f = 0, value = '';
        for (let i = 0; i < len; i++) {
            f = parseInt(10 * Math.random());
            value += chars.charAt(f);
        }
        return value;
    },
    // 获得随机字符串
    getRandomString: (len) => {
        len = len || 32;
        let $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    /**
     * 计算Md5值
     * @param {String} orginString 待加密字符串
     * @param {String} key 加密密钥
     */
    doMd5: (orginString, key) => {
        if (!orginString) return orginString;
        return MD5.getMD5(orginString + '' + key).toUpperCase();  // 大写
    },
    // 转json为key=value&key2=value2格式
    raw: (args) => {
        let keys = Object.keys(args);
        keys = keys.sort();
        let newArgs = {};
        keys.forEach(function (key) {
            newArgs[key] = args[key];
        });
        let result = '';
        for (let k in newArgs) {
            if (newArgs.hasOwnProperty(k)) {
                let o = newArgs[k];
                if (typeof o == 'object') o = JSON.stringify(newArgs[k], null);
                result += '&' + k + '=' + o;
            }
        }
        result = result.substr(1);
        return result;
    },
    middleHttpRequestInner:(tradeCode, param, func)=>{
        let s = JSON.stringify(param);
        mjcom.logger.log("middle-req = " + s)
        let bs64Str = mjcom.algorithms.encrypt({s: s});
        let req = {
            REQ_CODE: tradeCode,
            REQ_BODY: bs64Str,
            SIGN: mjcom.doMd5(bs64Str, mjcom.param.midMd5Key)
        };
        req.url = mjcom.param.midUrl+"/innerTrade.do";
        mjcom.httpRequest(req, {
            success: (d) => {
                mjcom.hideLoading();
                mjcom.logger.log('middle-res = ' , d)
                if(func.success) func.success(d);
            },
            complete:func.complete
        });
    },
    /**
     * 中台http交互请求,
     * 1.对请求体进行base64加密处理
     * 2.对请求体进行md5签名处理
     * @param {Object} param 
     * @param {Functions} func 
     */
     middleHttpRequest:(tradeCode, param, func)=>{
        let s = JSON.stringify(param);
        mjcom.logger.log("middle-req = " + s)
        let bs64Str = mjcom.algorithms.encrypt({s: s});
        let req = {
            REQ_CODE: tradeCode,
            REQ_BODY: bs64Str,
            SIGN: mjcom.doMd5(bs64Str, mjcom.param.midMd5Key)
        };
        mjcom.httpRequest(req, {
            success: (d) => {
                mjcom.hideLoading();
                mjcom.logger.log('middle-res = ' , d)
                if(func.success) func.success(d);
            },
            complete:func.complete
        });
    },
    /**
     * http交互
     */
    httpRequest: (param, func) => {
        let url = mjcom.param.midUrl+"/trade.do";
        // url = mjcom.param.midUrl+"/trade2Safe.do";
        if (!mjcom.isEmpty(param.url)) url = param.url;
        mjcom.logger.log('请求url = ', url);
        mjcom.logger.log('请求包 =', param);
        Taro.request({
            url: url, //仅为示例，并非真实的接口地址
            method: "POST",
            // header: {
            //     'content-type': 'application/x-www-form-urlencoded'
            // },
            data: param,
            success: function (res) {
                mjcom.logger.log('res = ', res.data)
                if(func.complete) func.complete();
                let head = res.data.RSP_HEAD;
                if(mjcom.isEmpty(head)) return mjcom.warn("接口调用异常，请检查网络服务状态");
                if (head.ReturnCode !== '0000') {
                    return mjcom.warn("调用接口异常：" + head.ReturnInfo);
                }
                let body = res.data.RSP_BODY;
                if (func.success) func.success(body);
            },
            fail: () => {
                if(func.complete) func.complete();
                mjcom.warn("调用接口失败")
            }
        });
    },
    /**
     * 根据文件名称获取实际需要交互的文件名
     * @param {*} s 
     * @returns 
     */
    parseRealFileName:(s)=>{
        let  realFileName = "xx";
        if(s.indexOf(".json")>=0 || s.indexOf(".js")>=0){
            realFileName = s.substring(0, s.indexOf(".js"));
        }
        if(s.indexOf(".flw")>=0){
            realFileName = s.substring(0, s.indexOf(".flw"));
        }
        if(s.indexOf(".mod")>=0){
            realFileName = s.substring(0, s.indexOf(".mod"));
        }
        return realFileName;
    },
    /**
     * 全局替换 类似 es2021 ori.replaceAll(s1, s2)
     * @param {string} ori 待替换的字符串
     * @param {string} s1 被替换字符
     * @param {string} s2 替换的字符
     * @returns 
     */
    replaceAll:(ori, s1, s2)=>{
        // return ori.replaceAll(s1, s2);
        return ori.replace(new RegExp(s1, 'g'), s2);
    },
    
    /**
     * 专门给V1.0环境用的
     * @param {*} namespace 
     * @param {*} funcName 
     */
    RealGotoPage:(namespace, funcName, type)=>{
        // step1. 从全局配置PublicConfig查看需要访问的sheeId所对应的文件地址
        let namespacesArr = PublicConfig.Namespace.param;
        let paramObj = mjcom.find(namespacesArr, {name: namespace});
        let realFileName = mjcom.parseRealFileName(paramObj.url);
        // step2 加载功能定义js文件
        let jsObj = require(`../${realFileName}.js`); // 此处必须有头有尾巴是.js
        // step3.3 执行这个文件下对应的方法名
        // 获取方法名
        let fnName = funcName;
        if(mjcom.isEmpty(fnName)) return;
        mjcom.logger.log("当前执行的方法是:", namespace+"."+fnName);
        let dat = jsObj[fnName].data(); // 获取配置
        let fnStep = new Step(dat);
        // 执行当前操作参数
        let activeData = {activeMap: {}, activePage: {}, activeNode: {}, activePageStep: fnStep, activeStep: fnStep};
        const opt = {
            PageNextType: type?type:"",
            ActiveData: activeData
        };
        fnStep.doStep(opt);
        if(fnStep.config.type==="flex"){
            mjcom.scache().ActiveData = activeData; // 设置当前激活下的节点信息
            mjcom.insertCurrentData(activeData); // 压进业务栈
            mjcom.logger.log('currentDatas = ', mjcom.scache().CurrentDatas)
        }
    },
    /**
     * 专门给V1.0环境用的Main方法
     * @param {*} namespace 
     * @param {*} funcName 
     */
    RealGotoMainPage:(namespace, funcName)=>{
        mjcom.RealGotoPage(namespace, funcName, "Main");
    },
    /**
     * 专门给V1.0环境用的Relaunch方法
     * @param {*} namespace 
     * @param {*} funcName 
     */
    RealRelaunchToPage:(namespace, funcName)=>{
        mjcom.RealGotoPage(namespace, funcName, "Relaunch");
    },
    GotoOtherPage:(activeData)=>{
        // step2 加载功能定义js文件
        const pageObj = activeData.activePage;
        let fns = pageObj.fn.split(".");
        let namespace = fns[0];
        // step3.2 找到namespace对应的文件，并加载
        let namespacesArr = PublicConfig.Namespace.param;
        let paramObj = mjcom.find(namespacesArr, {name: namespace});
        let realFileName = mjcom.parseRealFileName(paramObj.url);
        // step2 加载功能定义js文件
        let jsObj = require(`../${realFileName}.js`); // 此处必须有头有尾巴是.js
        // step3.3 执行这个文件下对应的方法名
        // 获取方法名
        let fnName = fns[1];
        mjcom.logger.log("当前执行的方法是:", namespace+"."+fnName);
        let ndat = jsObj[fnName].data();
        let odat = activeData.activePageStep.config;
        let dat = {...odat, ...ndat}; // 合并老应用和新应用
        let fnStep = new Step(dat);
        mjcom.logger.log("fnStep mod =", fnStep.config.config.mod);
        mjcom.scache().ActiveData = activeData; // 设置当前激活下的节点信息
        mjcom.logger.log('currentDatas = ', mjcom.scache().CurrentDatas)
        fnStep.doStep();
    },
    /**
     * mock文件
     * @param {*} jsName 
     * @param {*} fnName 
     */
    GotoMockPage:(fileName, funcName)=>{
        let realFileName = mjcom.parseRealFileName(fileName);
        // step2 加载功能定义js文件
        let jsObj = require(`../${realFileName}.js`); // 此处必须有头有尾巴是.js
        // step3.3 执行这个文件下对应的方法名
        // 获取方法名
        let fnName = funcName;
        if(mjcom.isEmpty(fnName)) return;
        mjcom.logger.log("当前执行的方法是:", "Test."+fnName);
        let dat = jsObj[fnName].data(); // 获取配置
        let fnStep = new Step(dat);
        // 执行当前操作参数
        let activeData = {activeMap: {}, activePage: {}, activeNode: {}, activePageStep: fnStep, activeStep: fnStep};
        const opt = {
            PageNextType: "",
            ActiveData: activeData
        };
        fnStep.doStep(opt);
        if(fnStep.config.type==="flex"){
            mjcom.scache().ActiveData = activeData; // 设置当前激活下的节点信息
            mjcom.insertCurrentData(activeData); // 压进业务栈
            mjcom.logger.log('currentDatas = ', mjcom.scache().CurrentDatas)
        }
    },
    /**
     * 跳转页面处理方法
     * @param {*} sheetId 
     * @param {*} pageId 
     * @param {*} type 页面跳转类型 Main - 首页跳转, Relaunch - 重置跳转 
     * @returns 
     */
    GotoPage:(sheetId, pageId, type)=>{
        mjcom.logger.log("GotoPage invoke");
        // 查询访问的id
        // step1. 从全局配置PublicConfig查看需要访问的sheeId所对应的文件地址
        const sheetArr = PublicConfig.StepSheet.sheet;
        const sheetObj = mjcom.find(sheetArr, {id: sheetId});
        mjcom.logger.log("sheet = ", sheetObj);
        mjcom.scache().CurrentSheet = sheetObj;
        if(mjcom.isEmpty(sheetObj)){
            mjcom.warn("sheetId未定义,当前sheetId="+sheetId);
            return;
        }
        if(mjcom.isEmpty(sheetObj.url)){
            mjcom.warn(sheetId+":的url未配置");
            return;
        }
        let  realFileName = mjcom.parseRealFileName(sheetObj.url);
        // step2 加载地图json文件
        const mapObj = require(`../${realFileName}.json`); // 此处必须有头有尾巴并且是.json,不然会报错。
        
        mjcom.logger.log("mapObj = ", mapObj);
        mapObj.namespace = sheetId; // 将当前sheetId存到map的namespace里面管理起来
        mjcom.scache().activeMap = mapObj; // 设置当前激活的map
        const pagesArr = mapObj.Config.Page;
        const pageObj = mjcom.find(pagesArr, {id: pageId}); // 取到对应的Page节点数据
        if(!mjcom.isEmpty(pageObj.load) && pageObj.stype==='LOGIC') {
            mjcom.DoLoadInLogic(mapObj, pageObj); // 直接指向LOGIC节点该处理的事情
            return;
        }
        // step3 加载文件对象并执行
        //step3.1 先找到fn，解析fn的namespace
        let fns = pageObj.fn.split(".");
        let namespace = fns[0];
        // step3.2 找到namespace对应的文件，并加载
        let namespacesArr = PublicConfig.Namespace.param;
        let paramObj = mjcom.find(namespacesArr, {name: namespace});
        
        realFileName = mjcom.parseRealFileName(paramObj.url);
        // step2 加载功能定义js文件
        let jsObj = require(`../${realFileName}.js`); // 此处必须有头有尾巴是.js
        // step3.3 执行这个文件下对应的方法名
        // 获取方法名
        let fnName = fns[1];
        mjcom.logger.log("当前执行的方法是:", namespace+"."+fnName);
        let dat = jsObj[fnName].data(); // 获取配置
        let fnStep = new Step(dat);
        mjcom.logger.log("fnStep mod =", fnStep.config.config.mod);
        // 执行当前操作参数
        let activeData = {activeMap: mapObj, activePage: pageObj, activeNode: pageObj, activePageStep: fnStep, activeStep: fnStep};
        const opt = {
            PageNextType: type?type:"",
            ActiveData: activeData
        };
        fnStep.doStep(opt);
        mjcom.scache().ActiveData = activeData; // 设置当前激活下的节点信息
        if(type!=='BackTo')  mjcom.insertCurrentData(activeData); // 压进业务栈
        mjcom.logger.log('currentDatas = ', mjcom.scache().CurrentDatas)
        if(!mjcom.isEmpty(pageObj.load)){
            // mjcom.DoLoad(mapObj, pageObj)
        }
    },
    /**
     * 执行load业务
     * @param {*} pageObj 
     */
    DoLoad: (mapObj, pageObj, pageStep, realPageObj) => {
        mjcom.logger.log("DoLoad invoke");
        let fns, namespace, namespacesArr, paramObj, 
            realFileName, jsObj, fnName, dat, fnStep, activeData;
        const stepId = pageObj.load;
        const stepsArr = pageObj.Step; // 获取当前page节点下的step节点
        const stepObj = mjcom.find(stepsArr, { id: stepId }); // 取到对应的Page节点数据
        if(mjcom.isEmpty(stepObj.fn)){
            mjcom.logger.log(stepObj.id+" fn 为空")
            return;
        }
        fns = stepObj.fn.split(".");
        namespace = fns[0];
        // debugger
        // step3.2 找到namespace对应的文件，并加载
        namespacesArr = PublicConfig.Namespace.param;
        
        paramObj = mjcom.find(namespacesArr, { name: namespace });
        realFileName = mjcom.parseRealFileName(paramObj.url);
        // step2 加载功能定义js文件
        jsObj = require(`../${realFileName}.js`); // 此处必须有头有尾巴是.js
        // step3.3 执行这个文件下对应的方法名
        // 获取方法名
        fnName = fns[1];
        mjcom.logger.log("当前执行的方法是:", namespace+"."+fnName);
        dat = jsObj[fnName].data(); // 获取配置
        fnStep = new Step(dat);
        activeData = { activeMap: mapObj, activePage: pageObj, activeNode: stepObj, activePageStep: pageStep, activeStep: fnStep };
        if(!mjcom.isEmpty(realPageObj)){
            activeData = { activeMap: mapObj, activePage: realPageObj, activeNode: stepObj, activePageStep: pageStep, activeStep: fnStep };
        }
        if(pageObj.stype==='LOGIC') {
            // debugger
            activeData.activeLogic = pageObj; // 新增扩充activeLogic节点
        }
        mjcom.scache().ActiveData = activeData; // 设置当前激活下的节点信息
        // 执行当前操作参数
        const opt = {
            PageNextType: "",
            ActiveData: activeData
        };
        // debugger
        if (!mjcom.isEmpty(pageObj.loadtimeout)) {
            if (Number(pageObj.loadtimeout) > 0) {
                setTimeout(() => {
                    fnStep.doStep(opt);
                }, Number(pageObj.loadtimeout))
            } else fnStep.doStep(opt);
        } else {
            fnStep.doStep(opt);
        }
    },
    /**
     * 
     * @param {*} mapObj 当前的地图
     * @param {*} pageObj 当前的Page节点
     */
    DoLoadInLogic:(mapObj, pageObj)=>{
        mjcom.logger.log("DoLoadInLogic invoke");
        const cData = mjcom.getCurrentData();
        const pageStep = cData.activePageStep;
        const realPageObj = cData.activePage;
        mjcom.DoLoad(mapObj, pageObj, pageStep, realPageObj);
    },
    Page:{
        setCurrentTitle:(s)=>{
            if(mjcom.isEmpty(s)) return;
            Taro.setNavigationBarTitle({title:s})
        },
        /**
         * backPage操作
         * ActiveData 与 CurrentDatas之间的关系
         * ActiveData 代表当前已经激活的对象。
         * CurrentDatas 代表当前页面的路由对象。
         */
        backPage:(configs)=>{
            // debugger
            if(MainConfig.mode==="DEBUG") return;
            const datas = mjcom.scache().CurrentDatas;
            const cData = mjcom.scache().ActiveData;
            const len = datas.length;
            // 如果只剩一个就不处理了，这是为了解决小程序分享的时候唯一的首页会触发willUnMount, 但是在打开分享链接的时候会发现列表里面没有记录了。
            if(len===1) return; 
            let arr = [];
            for(let i=0; i<len; i++){
                let o = datas[i];
                let row = o;
                if(o.activePageStep.config.id===configs.id) {
                    // debugger
                    continue;
                }
                arr.push(row);
            }

            let arrs = arr;
            let cObj = arr[arr.length-1];
            // fix-20220615-start 此处是针对 首页快捷跳转做的业务处理，
                /* 我们发现在跳转到新页面再返回的过程中原页面的activeNode=activePage, 
                    新的activeNode又无法替换上去，那么就需要更换最新的activeData数据到原有的路由表里面
                    activeNode在页面里面的要求是与page一致，不然没法跳转了
                */
            if(cObj.activePageStep.config.id===cData.activePageStep.config.id) {
                mjcom.logger.log(`activeData.activePageStep.config.id = ${cData.activePageStep.config.id}`)
                cObj = cData;
            }
            // fix-20220615-end
            // 针对hooks做特殊处理
            const nlen = arr.length;
            if(nlen>1){
                // 如果最后一个Data和倒数第二个Data的mod一样，那么就把最后一个踢掉
                const lastData = arr[nlen-1];
                const llastData = arr[nlen-2];
                if(lastData.activePageStep.config.config.mod===llastData.activePageStep.config.config.mod
                    && lastData.activePage.id===llastData.activePage.id
                    && lastData.activeMap.namespace===llastData.activeMap.namespace ){
                    // debugger
                    cObj = llastData;
                    arrs = [];
                    for(let i=0; i<nlen-2;i++) arrs.push(arr[i]);
                    arrs.push(cObj);
                }
            }
            mjcom.scache().CurrentDatas = arrs; // 更新最新的数组
            mjcom.scache().ActiveData = cObj; // 将最新的Data数据提供给内存
        },
        /**
         * 更新当前页的数据
         * @param {*} data 
         */
        upateCurrentPageData:(eName, data)=>{
            mjcom.logger.log(eName+ " upateCurrentPageData invoked, " , data);
            Taro.eventCenter.trigger(eName, data);
            mjcom.logger.log("Eventcenter triggered, "+ eName+" data=", data);
        }

    },
    // 算法类
    algorithms:{

        /**
         * 模糊查询
         * @param  {Array}  list     进行查询的数组
         * @param  {Object} item     属性名
         * @param  {String} keyWord  关键字
         * @return {Array}
        */
        fuzzyQuery: (list, item, keyWord) => {
            var arr = [];
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i][item].split(keyWord).length > 1) {
                    arr.push(list[i]);
                }
            }
            return arr;
        },
        // 本平台加解密-现阶段先用base64,等后面优化时在此方法中修改即可。
        encrypt:(pram, func)=>{
            let s = pram.s;
            return mjcom.algorithms.base64.encrypt(s);
        },
        // 本平台解密-现阶段先用base64,等后面优化时在此方法中修改即可。
        decrypt:(pram, func)=>{
            let s = pram.d;
            return mjcom.algorithms.base64.decrypt(s);
        },
        // base64
        base64:{
            encrypt:(data)=>{
                let b = Buffer.from(data);
                let bs64Str = b.toString("base64");
                return bs64Str;
            },
            decrypt:(eData)=>{
                let realStr = Buffer.from(eData, "base64").toString();
                return realStr;
            }
        },
        // aes
        aes:{
            encrypt:(data, key, iv)=>{
            },
            decrypt:(eData, key, iv)=>{
            }
        },
        // rsa加解密
        rsa:{
            // 公钥加密
            encrypt:(data, publicKey)=>{
                // let key = mjcom.param.rsa.publicKey;
                // if(!mjcom.isEmpty(publicKey)) key = publicKey;
                // let encrypt = new JSEncrypt();
                // encrypt.setPublicKey(key);
                // let res = encrypt.encrypt(data);
                // return res;
            },
            // 私钥解密
            decrypt:(eData, privateKey)=>{
                // let key = mjcom.param.rsa.privateKey;
                // if(!mjcom.isEmpty(privateKey)) key = privateKey;
                // let jsEncrypt = new JSEncrypt();
                // jsEncrypt.setPrivateKey(key);
                // let res = jsEncrypt.decrypt(eData);
                // return res;
            }
        }
    }
    
}

// 根据不同的环境加载配置文件
if (process.env.NODE_ENV === 'development') mjcom.param = Config_Dev.Params;
if (process.env.NODE_ENV === 'production') mjcom.param = Config_Pro.Params;

export default mjcom;