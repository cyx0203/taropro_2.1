import { StepNext, PageNext, PageRelaunch, DataCache, StepContent, 
    RealGotoAjax, RealGotoPage, RealGotoPageBack, RealRelaunchToPage,
    UpateCurrentPageData } from "../../../core/engine";
import JsUtil from "../../utils/jsutil";
import { doAuth, doPay as Wechat_doPay  } from "../../utils/wechat";

export const V1_Page_Main_Index =  class {
    static data(){
        return {
            type: "flex",
            config:{
                mod: "h5/pages/main/index",
                title: "V1首页",
                wxcall:{
                    mzghBtn_onClick:()=>{
                        console.log("index page btn1_onClick invoked")
                        DataCache.Name = "陈涛";
                        RealGotoPage("v1flex", "V1_Page_Main_RegConfirm");
                    },
                    mzjfBtn_onClick:()=>{
                        console.log("index page btn2_onClick invoked")
                        StepContent.Msg = "首页的消息来了";
                        RealGotoPage("v1flex", "V1_Page_Main_Msgs")
                    }
                },
                data:{
                    btn1name: "门诊挂号",
                    btn2name: "门诊缴费",
                    msg: "oo222, 这是第一个实例"
                }
            },
            ready:()=>{
                doAuth({}, {
                    success:()=>{
                        JsUtil.callback.V1_Ajax_Rhms_A103 = {
                            success:(res)=>{
                                UpateCurrentPageData({msg: "我的姓名是:"+StepContent.PatInfo.Name})
                            }
                        }
                        RealGotoAjax("v1ajaxRhms", "V1_Ajax_Rhms_A103");
                    }
                })
            }
        }
    }
}


export const V1_Page_Main_RegConfirm = class {
    static data(){
        return{
            type: "flex",
            config:{
                mod: "h5/pages/ct/register/confirm/index",
                title: "挂号确认页",
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
            },
            ready:()=>{
            }
        }
    }
}


export const V1_Page_Main_Msgs = class {
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
                        RealGotoPage("v1flex", "V1_Page_Main_User")
                    },
                    btn2_onClick:()=>{
                        console.log("msgs page btn2_onClick invoked RealRelaunchToPage V1_Page_Main_Index")
                        RealRelaunchToPage("v1flex", "V1_Page_Main_Index");
                    }
                },
                data:{
                    msg: "这是消息页:{StepContent.Msg}"
                }
            }
        }
    }
}

export const V1_Page_Main_Webview =  class {
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