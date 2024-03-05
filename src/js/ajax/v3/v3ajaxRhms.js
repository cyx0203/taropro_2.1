import { StepNext, UpateCurrentPageData, Warn,
    DataCache, StepContent, ajaxparams
} from "../../../core/engine";
import JsUtil from "../../utils/jsutil";

/**
 * 单个业务配置
 * @param {*} func 
 * @returns 
 */
const setAjaxConfig = (func)=>{
    var config = {
        type: 'ajax',
        config: {
            success: function (re) {
                const res = re;
                let returnCode = res.rspCode;
                if(returnCode==='00'){
                    return func.success(res);
                }
                if(func.error) func.error({code: returnCode, msg: res.rspMsg});
                else Warn(res.ResultMsg);
            },
            complete:()=>{
                console.log("ajax complete invoke")
            }
        },
        ready:() => {
            if(func.ready) func.ready();
            ajaxparams.REQ_BODY.hospitalId = JsUtil.param.hospitalId;
        },
        load: () => {
            ajaxparams.REQ_BODY = {};
            if(func.load) func.load();
        }

    };
    return config;
}

export const V3_Ajax_Rhms_A103 = class {
    static data(){
        return setAjaxConfig({
            success:(data)=>{
                console.log("suc data = ", data.listInfo);
                const list = data.listInfo;
                const patInfo = list[0];
                if(JsUtil.isEmpty(list) || patInfo.useFlag!=="Y"){
                    Warn("未找到启用的患者信息");
                    return;
                }
                let SPatInfo = StepContent.PatInfo;
                SPatInfo.Name = patInfo.patName;
                SPatInfo.IdNo = patInfo.patIdno;
                SPatInfo.Sex = patInfo.patSex;
                SPatInfo.Age = patInfo.patAge;
                SPatInfo.Phone = patInfo.phoneNo;
                SPatInfo.HisCardNo = patInfo.cardNo;
                SPatInfo.PatientId = patInfo.patId;
                SPatInfo.PatientMzh = JsUtil.sEmpty(patInfo.patNo);
                StepContent.PatInfo = SPatInfo;
                // 直接更新当前页面的数据
                if(JsUtil.callback.V1_Ajax_Rhms_A103) JsUtil.callback.V1_Ajax_Rhms_A103.success(patInfo);
            },
            error:(err)=>{
                Warn(err.msg);
            },
            ready:()=>{
                ajaxparams.REQ_CODE = "0002_Rhms";
                ajaxparams.REQ_BODY = {
                    tradeCode: "appuserpatient.select",
                    hospitalId: JsUtil.param.hospitalId,
                    openId: StepContent.OpenId,
                    activeFlag: "Y"
                }
            }
        })
    }
}