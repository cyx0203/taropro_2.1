import Taro from '@tarojs/taro';
import mjcom from "./mjcommon";
import H5Config from "@/GGH5/config";
/**
 * 提供给页面层
 * 需要用到的方法
 */

const GPage = {
    /**
     * 当前page页面的数据存储
     * 
     */
    PageData: mjcom.scache().PageData,
    // page用到的配置文件
    param: H5Config,
    // page用到的工具
    util: mjcom,
    /**
     * 退出页面的相关操作
     */
    DoExit:(configs)=>{
        let eName = "";
        // const cData = mjcom.getCurrentData(); // 取当前的数据
        // if(cData.activePageStep) eName = cData.activePageStep.config.id;
        if(configs) eName = configs.id;
        // 取消当前页面的监听事件
        Taro.eventCenter.off(eName);
        mjcom.logger.log("EventCenter off-"+eName)
        mjcom.Page.backPage(configs);
        const datas = mjcom.scache().CurrentDatas;
        mjcom.logger.log("EventCenter off CurrentDatas - ", datas)
    },
    /**
     * 设置当前页面的标题
     * @param {*} title 标题名称
     */
    SetCurrentTitle:(title)=>{
        mjcom.Page.setCurrentTitle(title);
    },
    /**
     * 执行加载逻辑
     * 接收在页面渲染例如OnShow事件成功后触发
     * 需要传入当前页面的配置信息
     */
    DoLoad:(configs)=>{
        if(mjcom.isEmpty(configs)){
            mjcom.logger.log("配置未设置，请设置page-configs");
            return;
        }
        let cData = mjcom.getCurrentData();
        if(mjcom.isEmpty(cData)) {
            mjcom.logger.log("内存里面没有记录了");
            return;
        }
        let compConfigs = cData.activePageStep;
        // 这部分是V1调试时发现的bug,
        // 首先 原生的项目在返回的时候是先 unMount-> onShow, hooks页面再返回的时候是先 onShow -> unMount 
        // 其次，hooks 在返回的时候第一次unMount和onShow是异步执行，当第二次返回时，onShow先执行，unMount后执行，并且是同步的。
        // 解决方案：从内存列表中倒序查找与当前提供page-ID一致的内存数据,将当前的cData替换
        if(!mjcom.isEmpty(configs)) {
            compConfigs = {config: configs};
            let len = mjcom.scache().CurrentDatas.length;
            while(len>0){
                const cId = --len;
                const o = mjcom.scache().CurrentDatas[cId];
                if(o.activePageStep.config.id===compConfigs.config.id){
                    cData = o;
                    break;
                }
            }
        }
        GPage.SetCurrentTitle(compConfigs.config.config.title);
        mjcom.logger.log("DoLoad currentData = ", cData)
        mjcom.logger.log("DoLoad compId = ", compConfigs.config.id);
        if(compConfigs.config.ready) compConfigs.config.ready();
        if(!mjcom.isEmpty(cData.activePage.load)) mjcom.DoLoad(cData.activeMap, cData.activePage, cData.activePageStep)
    },
    EventCenter: (func) => {
        const datas = mjcom.scache().CurrentDatas;
        mjcom.logger.log("EventCenter CurrentDatas", datas)
        const cData = mjcom.getCurrentData(); // 取当前的数据
        if(mjcom.isEmpty(cData)) {
            mjcom.logger.log("内存里面没有记录了");
            return;
        }
        let pName = mjcom.replaceAll(cData.activePageStep.config.config.mod, "/", "_");
        let eName = cData.activePageStep.config.id;
        if(func.configs) {
            pName = mjcom.replaceAll(func.configs.config.mod, "/", "_");
            eName =func.configs.id;
        }
        // 取消当前页面的监听事件
        if(mjcom.isEmpty(eName)) {
            mjcom.logger.log(`eName在内存里面没有记录,eName=${eName}`);
            return;
        }
        mjcom.logger.log("EventCenter create-"+eName)
        Taro.eventCenter.on(eName, (arg) => {
            mjcom.logger.log("EventCenter on-"+eName, arg)
            const oda = GPage.PageData[pName].config.data;
            const nda = {...oda, ...arg};
            GPage.PageData[pName].config.data = nda;
            if(func.success) func.success(nda);
        })
    }
}

export default GPage;