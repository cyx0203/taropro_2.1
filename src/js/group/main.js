import { StepNext, PageNext, PageRelaunch, PageBackTo,
    DataCache, StepContent, 
    UpateCurrentPageData } from "../../core/engine";
import JsUtil from "../utils/jsutil";
import { doAuth } from "../utils/wechat";

export const Page_Pharmacist_Login=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/login/index",
                title: "首页",
                wxcall:{
                    confirmBtn_onClick:(item)=>{
                        console.log("confirmBtn_onClick invoked = ", item);
                        PageNext(0);
                    }
                },
                data:{
                    confirmBtn:{ name: "确认提交" },
                    loginArea: {
                        name: "ss", 
                        pwd: "xx"
                    }
                },
            },
            ready:()=>{
                // doAuth({}, {
                //     success:()=>{}
                // })
            }  
        }
    }
}



export const Page_Pharmacist_Menu=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/menu/index",
                title: "首页2",
                wxcall:{
                    btn_onClick:(item, index)=>{
                        console.log("btn_onClick invoked = ", item , index)
                        if(item.id==='1') PageNext(0);
                        else if(item.id==='2') PageNext(1);
                        else if(item.id==='3') PageNext(2);
                    }
                },
                data: {
                    btns_Area: {
                        listData: [
                            { id: "1", icon: JsUtil.param.resUrl + "/menu/verify.png", title: "处方审核", subTitle: "快速审核医生开的处方" },
                            { id: "2", icon: JsUtil.param.resUrl + "/menu/distribution.png", title: "发药管理", subTitle: "查看配送和物流情况" },
                            { id: "3", icon: JsUtil.param.resUrl + "/menu/distribution.png", title: "模板应用", subTitle: "测试模板应用" },
                        ]
                    },
                }
            }
        }
    }
}


export const Page_Pharmacist_Result=  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/pharmacist/result/index",
                title: "结果页",
                wxcall:{
                    okBtn_onClick:(item)=>{
                        console.log("okBtn_onClick invoked = ", item)
                        PageBackTo(0);
                    }
                },
                data: {
                    primaryMsg: "业务完成",
                    subMsg: "请点击确认返回",
                }
            }
        }
    }
}
