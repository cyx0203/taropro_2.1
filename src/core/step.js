import Taro from '@tarojs/taro';
import mjcom from "./mjcommon";

/**
 * 定义step类，该类主要用于实现
 * 1.页面配置参数加载
 * 2.提供一个doStep方法,该方法执行Taro.navigateTo指令，进行页面跳转
 */
 class Step {
    constructor(config){
        this.config = config;
    };


    /**
     * 更新常用的缓存
     */
    replaceCacheValues(str){
        // 只有str才会处理，不是string类型的都放弃
        if(typeof str === 'string'){
            if(str.indexOf("{DataCache.")!==-1){
                let len = str.indexOf("{DataCache.")
                let len2 = str.indexOf("}");
                let nstr = str.substring(len, len2); // {DataCache.Name
                let key = nstr.split('.')[1];
                let val = mjcom.mDataCache()[key];
                if(val) str = mjcom.replaceAll(str, nstr+"}", val);
                
            }
            if(str.indexOf("{StepContent.")!==-1){
                let len = str.indexOf("{StepContent.")
                let len2 = str.indexOf("}");
                let nstr = str.substring(len, len2); // {DataCache.Name
                let key = nstr.split('.')[1];
                let val = mjcom.mStepContent()[key];
                if(val) str = mjcom.replaceAll(str, nstr+"}", val);
            }
        }
        return str;
    }

    /**
     * 遍历整个对象叔,更新数据
     * 更新常用的缓存
     */
    traverseReplace(obj) {
         let objstr = JSON.stringify(obj, null, null);
         const js_traverse = (o) => {
             var type = typeof o
             if (type == "object") {
                mjcom.forEach(o, (e) => {
                     js_traverse(e);
                 });
             }
             if (type === "string") {
                //  mjcom.logger.log(o)
                 let str = o;
                 if (str.indexOf("{DataCache.") !== -1) {
                     let len = str.indexOf("{DataCache.")
                     let len2 = str.indexOf("}");
                     let nstr = str.substring(len, len2); // {DataCache.Name
                     let key = nstr.split('.')[1];
                    //  debugger
                     let val = mjcom.mDataCache()[key];
                     if (val) objstr = objstr.replace(str, val);
                 }
                 if(str.indexOf("{StepContent.")!==-1){
                    let len = str.indexOf("{StepContent.")
                    let len2 = str.indexOf("}");
                    let nstr = str.substring(len, len2); // {DataCache.Name
                    let key = nstr.split('.')[1];
                    let val = mjcom.mStepContent()[key];
                    if (val) objstr = objstr.replace(str, val);
                }
             }
         }
         js_traverse(obj);
        //  mjcom.logger.log("new_config_str = ", objstr);
         return JSON.parse(objstr);
     }

     /**
      * 检查ajaxparam.REQ_BODY
      * @param {*} param 
      * @returns 
      */
     checkAjaxParams(param){
        let illegalParam = {
            isIllegal: false,
            illegalKey : ""
        }
        for(let i in param){
            let o = param[i];
            if(mjcom.isRealEmpty(o)) {
                illegalParam = {
                    isIllegal: true,
                    illegalKey: i
                };
                break;
            }
        }
       return illegalParam;
     }


    /**
     * 执行跳转处理
     * @param {*} option 业务处理配置项 可以为空
     *              -- PageNextType - Main-首页跳转, Relaunch-重置跳转 
     */
    doStep(option){
        if(mjcom.isEmpty(option)) option = {};
        mjcom.logger.log("doStep invoke, option = ", option);
        // step1. 判断业务类型，根据不同的业务类型完成不同的业务逻辑，把配置存到全局内存里面
        const btype = this.config.type;
        switch (btype) {
            case "flex":
                // mjcom.scache().AjaxNowStamp = ""; // 清除当前ajax消息的时间戳(v1版本先注释掉)
                if (this.config.load) this.config.load();
                // if (this.config.ready) this.config.ready(); // 此处的ready我们把放到Page.DoLoad方法里面了
                // step1.0 把data里面的一级字符串数据格式化替换掉
                mjcom.logger.log("fnStep mod =", this.config.config.mod);
                const objs = this.config.config.data;
                this.config.config.data = this.traverseReplace(objs);
                const title = this.config.config.title;
                this.config.config.title = this.replaceCacheValues(title);
                // step1.1 获取内存对象的配置名
                const oName = mjcom.replaceAll(this.config.config.mod, "/", "_");
                 // mjcom.logger.log("config = ", config)
                let id = oName+"_"+mjcom.createRandomNum(6);
                if(this.config.id) id = this.config.id;
                mjcom.logger.log("当前flex-id = ", id)
                this.config.id = id;
                mjcom.scache().PageData[oName] = this.config;
                // debugger
                // step2. 然后执行路由跳转，首页不操作，非首页情况下渲染
                if(option.PageNextType==="Main") return;
                if(option.PageNextType==="Relaunch") {
                    mjcom.relaunchCurrentData(option.ActiveData);
                    Taro.reLaunch({url: "/"+this.config.config.mod});
                    return;
                }else if(option.PageNextType==="BackTo"){
                    // 回退个数查询
                    let num = mjcom.GetBackToNums(option.ActiveData);
                    // 内部循环自己页面的情况
                    if(num===0) {
                        // 先把路由pop出来再set进去
                        mjcom.popCurrentData();
                        Taro.redirectTo({url: "/"+this.config.config.mod});
                        return;
                    }
                    Taro.navigateBack({
                        delta: Math.abs(num),
                        success:()=>{
                            mjcom.logger.log("navigateBack success")
                        },
                        fail:()=>{
                            mjcom.logger.log("navigateBack fail")
                        }
                    });
                    return;
                }
                else{
                    Taro.navigateTo({url: "/"+this.config.config.mod});
                }
                break;
            case "data":
                if (this.config.load) this.config.load();
                if (this.config.ready) this.config.ready();
                break;
            case "ajax":
                if (this.config.load) this.config.load(); // 先执行load
                if (this.config.ready) this.config.ready();
                const reqObj = mjcom.mAjaxParams();
                let param = reqObj.REQ_BODY;
                const illegalParam = this.checkAjaxParams(param);
                if(illegalParam.isIllegal){
                    mjcom.warn("ajax 预判:"+illegalParam.illegalKey + "未定义,请检查您的参数")
                    return
                }
                // debugger
                const activePageStep = option.ActiveData.activePageStep
                this.config.id = activePageStep.config.id; // 如果是ajax则将当前激活页面的id给ajax,保证ajax和当前激活的id一致
                param.NowStamp = mjcom.createFlowNo();
                // 此处的AjaxNowStamp 会在执行doStep前把他清除掉
                mjcom.scache().AjaxNowStamp = param.NowStamp;
                mjcom.logger.log(`AjaxNowStamp=${mjcom.scache().AjaxNowStamp}`);
                mjcom.showLoading("通讯中");
                mjcom.middleHttpRequest(reqObj.REQ_CODE, param, {
                    success:(res)=>{
                        // 保险 1.当前激活页面的id是否替换
                        const aid = mjcom.getCurrentData().activePageStep.config.id;
                        if(aid!==this.config.id){
                            mjcom.logger.log(`success invoke activePageStepId=${aid}, current ajaxPageStepId=${this.config.id},二者不匹配,放弃执行`);
                            return;
                        }
                        if(this.config.config.success) this.config.config.success(res);
                    },
                    complete:()=>{
                        mjcom.hideLoading();
                        const aid = mjcom.getCurrentData().activePageStep.config.id;
                        if(aid!==this.config.id){
                            mjcom.logger.log(`complete invoke activePageStepId=${aid}, current ajaxPageStepId=${this.config.id},二者不匹配,放弃执行`);
                            return;
                        }
                        if(this.config.config.complete) this.config.config.complete();
                    }
                })
                break;
            case "device":
                if (this.config.load) this.config.load();
                if (this.config.ready) this.config.ready();
                break;
            default:
                mjcom.warn("未定义该模板类型")
                break;
        }
    }
};
export {Step};