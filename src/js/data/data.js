import { StepNext, UpateCurrentPageData, DataCache, StepContent, Warn, PageRelaunch } from "../../core/engine";
import JsUtil from "../utils/jsutil";
import { doPay as Wechat_doPay  } from "../utils/wechat";


export const Data_Init = class {
    static data(){
        return {
            type: "data",
            load:()=>{
                StepNext(0)
            }
        }
    }
}

export const Data_DoPay = class {
    static data(){
        return {
            type: "data",
            load:()=>{
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
                    success:()=>{
                        Warn("OK");
                        setTimeout(()=>{
                            PageRelaunch(0);
                        }, 3000)
                    }
                })
            }
        }
    }
}