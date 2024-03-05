import { StepNext, PageNext, PageRelaunch, DataCache, StepContent, 
    UpateCurrentPageData } from "../../core/engine";
import JsUtil from "../utils/jsutil";
import { doAuth, doPay as Wechat_doPay  } from "../utils/wechat";


export const Page_Main_Index =  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/main/index",
                title: "V3首页",
                wxcall:{
                    mzghBtn_onClick:()=>{
                        console.log("index page mzghBtn_onClick invoked")
                        DataCache.Name = "陈涛";
                        PageNext(0);
                    },
                    mzjfBtn_onClick:()=>{
                        console.log("index page mzjfBtn_onClick invoked")
                        StepContent.Msg = "首页的消息来了";
                        PageNext(1);
                    }
                },
                data:{
                    btn1name: "门诊挂号",
                    btn2name: "跳转消息页",
                    msg: "oo222, 这是第一个实例"
                }
            },
            ready:()=>{
                doAuth({}, {
                    success:()=>{
                    }
                })
            }
        }
    }
}


export const Page_Main_User = class {
    static data(){
        return{
            type: "flex",
            config:{
                mod: "h5/pages/users/index",
                title: "用户页",
                wxcall:{
                    btn1_onClick:()=>{
                        console.log("users page btn1_onClick invoked")
                        PageNext(-1);
                    },
                    btn2_onClick:()=>{
                        console.log("users page btn2_onClick invoked")
                        PageNext(1);
                    }
                },
                data:{
                    msg: "ooo, 这是用户页,{DataCache.Name}"
                }
            }
        }
    }
}


export const Page_Main_Msgs = class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/msgs/index",
                title: "消息页",
                wxcall:{
                    btn1_onClick:()=>{
                        console.log("msgs page btn1_onClick invoked")
                        DataCache.Name = "陈涛2";
                        PageNext(1);
                    },
                    btn2_onClick:()=>{
                        console.log("msgs page btn2_onClick invoked")
                        PageRelaunch(0);
                        // PageNext(1);
                    }
                },
                data:{
                    msg: "这是消息页:{StepContent.Msg}"
                }
            }
        }
    }
}


export const Page_Waiting =  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/waiting/index",
                title: ".",
                wxcall:{
                },
                data:{
                    msg: "请稍等哦"
                }
            }
        }
    }
}


export const Page_Main_Webview =  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/webview/index",
                title: "代理页",
                wxcall:{
                },
                data:{
                    url: "https://wx.ggzzrj.cn:8443/"
                }
            }
        }
    }
}


export const Page_Main_RegConfirm = class {
    static data(){
        return{
            type: "flex",
            config:{
                mod: "h5/pages/ct/register/confirm/index",
                title: "V3-挂号确认页",
                wxcall:{
                    btn1_onClick:()=>{
                        console.log("users page btn1_onClick invoked");
                        DataCache.FlowNo = JsUtil.createFlowNo();
                        DataCache.PayType = "0203";
                        DataCache.TrdType = "REG";
                        DataCache.Amt = "0.01";
                        const param = {
                            tradeType: "H306",
                            tradeParam:{
                                ToHis:{
                                    FuncName: "RegistSave",
                                    PatientId: StepContent.PatInfo.PatientId,
                                    PatientName: StepContent.PatInfo.Name,
                                    Amt: DataCache.Amt,
                                    FlowNo: DataCache.FlowNo
                                },
                                RegisterDate: JsUtil.getFomatDate("yyyy-MM-dd"),
                                GoodName: "当日挂号",
                                OpenId: StepContent.OpenId,
                                Amt: DataCache.Amt,
                                PatientName: StepContent.PatInfo.Name,
                                HisCardNo: StepContent.PatInfo.HisCardNo,
                                PatientId: StepContent.PatInfo.PatientId,
                                PatientPhone: StepContent.PatInfo.Phone,
                                PatientIdNo: StepContent.PatInfo.IdNo,
                                Sex: StepContent.PatInfo.Sex,
                                DeptName: "耳鼻喉科",
                                DoctName: "王传奇",
                            }
                        }
                        Wechat_doPay(param, {
                            success:()=>{}
                        })
                    },
                },
                data:{
                    regInfo: {
                        name: "{DataCache.ShowName}",
                        amt: "0.01 元",
                        listData:[
                            {key: "{DataCache.Name}"}
                        ]
                    },
                    btn1name: "确认挂号"
                }
            },
            load:()=>{
                DataCache.ShowName = StepContent.PatInfo.Name;
                if(!JsUtil.isEmpty(StepContent.NickName)) {
                    DataCache.ShowName += ",昵称："+ JsUtil.sEmpty(StepContent.NickName);
                }
            }
        }
    }
}