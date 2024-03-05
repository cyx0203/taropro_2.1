import Taro from '@tarojs/taro';
import mjcom from "./mjcommon";
import PublicConfig from "../js/PublicConfig.json";
import { Step } from './step';

/**
 * 下一步方法
 * @param {*} id 
 * @returns 
 */
const StepNext = (id, type) => {
    if(mjcom.isEmpty(type)) type = "";
    mjcom.logger.log("Step Next invoked, type = ", type);
    if(id<0){
        Taro.navigateBack({
            delta: Math.abs(id),
            success:()=>{
                mjcom.logger.log("navigateBack success")
            },
            fail:()=>{
                mjcom.logger.log("navigateBack fail")
            }
        });
        return;
    }

    // step1. 获取当前激活状态下的内容,并取得下一步的ID
    //  activeMap = { "id": "P1", "stype": "GROUP", "fn": "Flex.Page_Main_Index", "load": "_DA0", "next": "P2,", "Step": [ {"id": "_DA0", "stype": "DATA", "fn": "Data.Data_Init", "next": "P2,"}]},
    // mjcom.insertCurrentData({activeMap: mapObj, activePage: pageObj, activeNode: stepObj|pageObj, activeStep: fnStep}); // 压进业务栈
    // const cData = mjcom.getCurrentData();
    let cDatas = mjcom.scache().CurrentDatas; // 当前路由堆栈
    let cData = mjcom.scache().ActiveData;
    // 如果处理类型是Page,就从路由中获取当前数据
    if(type==='Page') cData = mjcom.getCurrentData();
    // debugger
    const cnode = cData.activeNode;
    const nextstr = cnode.next;
    if (mjcom.isEmpty(nextstr)) {
        mjcom.warn("节点未配置")
        return;
    }
    // if (nextstr.indexOf(",") < 0) {
    //     mjcom.warn("节点配置有问题")
    //     return;
    // }
    const nexts = nextstr.split(",");
    const nextStepId = nexts[id];
    // debugger
    // step2. 根据下一步的ID索引查询需要访问的节点
    let stepId = nextStepId; // 当前的stepId
    let mapObj = cData.activeMap; // 当前激活的地图对象
    let pageStep = cData.activePageStep; // 当前
    let pageObj = cData.activePage; // 当前激活的Page对象
    let logicObj = cData.activeLogic?cData.activeLogic:pageObj;  // 当前激活的logic对象,如果没有就用page对象
    let stepsArr = {};
    if(mjcom.contains(stepId, "_G")||mjcom.contains(stepId, "_L")
        ||mjcom.contains(stepId, "_E")||mjcom.contains(stepId, "_SUB")) stepsArr = mapObj.Config.Page;

    // 此处需要判断当前stepId是什么
    if(mjcom.contains(stepId, "_DA")) {
        stepsArr = logicObj.Step;
    }
    if(mjcom.contains(stepId, "_A")) {
        // debugger
        stepsArr = logicObj.Step;
    }
    // 当nextStepId 包含 # 号时，代表需要跳出当前的Page了，例如：#2(_G3)
    if(mjcom.contains(stepId, "#")) {
        stepsArr = mapObj.Config.Page; // 此时stepsArr需要变成全图视野了
        // 更新需要跳转的节点ID
        let str = stepId;
        // #2(_G3)
        if(str.indexOf("(")!==-1){
            let len = str.indexOf("(")
            let len2 = str.indexOf(")");
            let nstr = str.substring(len+1, len2); // (
            stepId = nstr; // 取最新的 stepId
        }
    }
    // debugger
    let stepObj = mjcom.find(stepsArr, { id: stepId }); // 取到对应的Page节点数据
    if(mjcom.isEmpty(stepObj)) {
        // debugger
        mjcom.warn("未找到对应的step对象")
        return;
    }
    // debugger
    // 如果当前step类型是GROUP将当前页面对象设置为本对象
    if(stepObj.stype==='GROUP') {
        // debugger
        pageObj = stepObj;
    }
    // 如果当前step类型是END,则开始读配置
    if(stepObj.stype==='END' || stepObj.stype==='SUBPROCESS') {
        if(stepObj.stype==='SUBPROCESS'){
            const cSheetObj = mjcom.scache().CurrentSheet;
            mjcom.scache().LastSheet = cSheetObj;
            mjcom.scache().LastMod = stepObj;
        }
        let sheetId = stepObj.sheetid;
        let pageId = stepObj.pageid;
        // 针对模板回调的逻辑进行处理
        if(sheetId==="{lastsheet}"){
            const lSheetObj = mjcom.scache().LastSheet;
            sheetId = lSheetObj.id;
            if(mjcom.contains(pageId, "{lastnext")) {
                const lModObj = mjcom.scache().LastMod;
                let nexts = lModObj.next.split(",");
                let s = pageId.split(".")[1];
                let id = s.replace("}", "");
                pageId = nexts[Number(id)];
            }
        }
        // 从堆栈中找到对应的sheetId
        let item = mjcom.find(cDatas, (o)=>{
            if(o.activeMap.namespace===sheetId) return true;
        }); 
        if(item) type='BackTo'; // 如果存在就进入执行后退的任务到指定的页面
        mjcom.GotoPage(sheetId, pageId, type);
        return;
    }
    // 如果fn不存在则不执行
    if(!mjcom.isEmpty(stepObj.fn)){
        // step3 加载文件对象并执行
        //step3.1 先找到fn，解析fn的namespace
        let fns = stepObj.fn.split(".");
        let namespace = fns[0];
        
        // step3.2 找到namespace对应的文件，并加载
        let namespacesArr = PublicConfig.Namespace.param;
        let paramObj = mjcom.find(namespacesArr, { name: namespace });
        let realFileName = mjcom.parseRealFileName(paramObj.url);
        // step3.2.1 加载功能定义js文件
        let jsObj = require(`../${realFileName}.js`); // 此处必须有头有尾巴是.js
        // debugger
        // step3.3 执行这个文件下对应的方法名
        // 获取方法名
        let fnName = fns[1];
        mjcom.logger.log("当前执行的方法是：", namespace+"."+fnName);
        let dat = jsObj[fnName].data();
        let fnStep = new Step(dat);
        
        if(fnStep.config.type==='flex') pageStep = fnStep; // 如果执行flex 就将当前fnStep给pageStep
        
        let activeData = { activeMap: mapObj, activePage: pageObj, activeNode: stepObj, activeLogic:logicObj, activePageStep: pageStep, activeStep: fnStep };
        mjcom.scache().ActiveData = activeData; // 设置当前激活下的节点信息
        // 从堆栈中找到对应的pageId
        let item = mjcom.find(cDatas, (o)=>{
            if(o.activeMap.namespace===mapObj.namespace && o.activePage.id===stepId) {
                mjcom.logger.log(`sheetId = ${mapObj.namespace}, pageId = ${stepId}`)
                return true;
            }
        }); 
        if(item) type='BackTo'; // 如果存在就进入执行后退的任务到指定的页面
         // 执行当前操作参数
        const opt = {
            PageNextType: type,
            ActiveData: activeData
        };
        fnStep.doStep(opt);
        if(mjcom.contains(stepId, "_G")) {
            mjcom.insertCurrentData(activeData); // 压进路由业务栈
        }
    }

    // 判断是否有load对象,有load对象加载load, LOGIC模块里面也有load方法，需要执行
    if(!mjcom.isEmpty(stepObj.load) && stepObj.stype==='LOGIC'){
        mjcom.DoLoad(mapObj, stepObj, pageStep, pageObj);
    }
    
    // 其他情况再说 
    // debugger
}

/**
 * 页面级别的下一步
 * @param {*} id 当ID>=0的时候，按常规步骤走，当id<0时为路由退回页面数
 */
const PageNext = (id)=>{
    mjcom.logger.log('PageNext invoke');
    let cData = mjcom.scache().ActiveData;
    // 当前页面节点类型不是GROUP的，暂时不允许跳转
    let activePageStyle = cData.activePage.stype;
    if(activePageStyle!=="GROUP") {
        Warn("业务处理中,请稍后再试");
        return;
    }
    StepNext(id, "Page");
}

/**
 * 页面级别的跳转,该业务逻辑在小程序内会清除所有路由，直接跳转该页面
 * 一般在单个业务结束后，点击返回首页时使用
 * @param {*}} id 
 */
const PageRelaunch = (id)=>{
    mjcom.logger.log("PageRelaunch invoked");
    StepNext(id, "Relaunch");
}

/**
 * 页面级别跳转
 * @param {*} id 
 */
const PageBackTo = (id)=>{
    mjcom.logger.log("BackTo invoked");
    StepNext(id, "BackTo");
}

/**
 * 更新当前页面的数据
 * @param {*} data 
 */
const UpateCurrentPageData = (data, pageName)=>{
    let cData = mjcom.scache().ActiveData;
    mjcom.logger.log("UpateCurrentPageData activeData = ", cData);
    // 取消当前页面的监听事件
    const eName = cData.activePageStep.config.id;
    if (pageName && !mjcom.contains(eName, pageName)) {
        mjcom.logger.log(`pageName=${pageName}, eventName=${eName},二者前缀不匹配,放弃触发更新当前页面`)
        return;
    }
    mjcom.Page.upateCurrentPageData(eName, data);
}

const UpdateCurrentPageData = (data, pageName) =>{
    UpateCurrentPageData(data, pageName);
}

/**
 * 警告弹框
 * @param {*} msg 
 */
const Warn = (msg)=>{
    mjcom.warn(msg);
}
/**
 * 信息弹框
 * @param {*} msg 
 */
 const Info = (msg)=>{
    mjcom.info(msg);
}

/**
 * 打开加载遮罩层
 * @param {*} msg 
 */
const ShowLoading = (msg)=>{
    mjcom.showLoading(msg)
}

/**
 * 隐藏加载遮罩层
 */
const HideLoading = ()=>{
    mjcom.hideLoading();
}

const RealGotoPage = (namespace, funcName)=>{
    mjcom.RealGotoPage(namespace, funcName); // 页面跳转 
}

const RealGotoAjax = (namespace, funcName)=>{
    mjcom.RealGotoPage(namespace, funcName); // 页面跳转 
}

const RealGotoPageBack = (id)=>{
    StepNext(id, "Page");
}

const RealRelaunchToPage = (namespace, funcName)=>{
    mjcom.RealRelaunchToPage(namespace, funcName);
}

/**
 * 清空DataCache缓存
 */
const ClearDataCache = () =>{
    mjcom.clearDataCache();
}

const DataCache = mjcom.mDataCache(); // 全局DataCache对象
const StepContent = mjcom.mStepContent(); // 全局StepContent对象
const ajaxparams = mjcom.mAjaxParams(); // 全局ajaxparam对象

export {
    StepNext, PageNext, PageRelaunch, PageBackTo, UpateCurrentPageData, UpdateCurrentPageData,
    Warn, Info, ClearDataCache,
    ShowLoading, HideLoading,
    StepContent, DataCache, ajaxparams, 
    RealGotoAjax, RealGotoPage, RealGotoPageBack, RealRelaunchToPage,
    mjcom
};