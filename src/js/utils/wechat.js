import Taro from '@tarojs/taro';
import {DataCache, StepContent, mjcom} from "../../core/engine";
import JsUtil from './jsutil';

const doAuthInMiniProgram = (pram, func)=>{
    Taro.login({
        success: function (res) {
            if (res.code) {
                JsUtil.logger.log('res.code = ' + res.code);
                let param = {
                    tradeType: 'GetOAuthUserInfo',
                    code: res.code,
                }
                //发起网络请求
                JsUtil.middleHttpRequestInner("Wxpro_GetOpenIdDirectly", param, {
                    success:(res)=>{
                        if (res.returnCode !== '0000') return JsUtil.warn(res.returnInfo);
                        const openId = res.data.openid
                        StepContent.OpenId = openId;
                        JsUtil.logger.log("OpenId = " + StepContent.OpenId);
                        Taro.getUserInfo({
                            success:(res)=>{
                                const data = res.userInfo;
                                JsUtil.logger.log("userInfo = ", data);
                                StepContent.AvatarUrl = data.avatarUrl;
                                StepContent.NickName = data.nickName;
                                func.success();
                            },
                        });
                    }
                });
            } else {
                JsUtil.warn('登录失败！' + res.errMsg);
            }
        }
    });
}

/**
 * 公众号授权获取与用户信息
 * @param {*} pram 
 * @param {*} func 
 */
const doAuthInGzh = (pram, func) => {
    let openId = mjcom.scache().RequestsParam.openId;
    if(JsUtil.param.isDebug) openId = JsUtil.param.debugOpenId; // 如果调试模式下取默认openId
    if(JsUtil.isEmpty(openId)) {
        JsUtil.taro.showModal({
            title:"核心参数异常",
            content: "openId未获取到,是否重新获取",
            success: (res) => {
                if (res.confirm) {
                    JsUtil.logger.log('用户点击确定')
                } else if (res.cancel) {
                    JsUtil.logger.log('用户点击取消')
                }
            }
        })
        return;
    }
    StepContent.OpenId = openId;
    const param = { tradeType: 'GetUserInfoByOpenid', openid: StepContent.OpenId, projectId: JsUtil.param.projectId }
    JsUtil.middleHttpRequestInner("2002_Wxpro", param, {
        success: (res) => {
            if (res.returnCode === '0000') {
                StepContent.AvatarUrl = data.headimgurl;
                StepContent.NickName = data.nickName;
            }else{
                StepContent.AvatarUrl = "";
                StepContent.NickName = "普通用戶";
            }
            func.success();
        }
    });
}

/**
 * 授权登录
 * @param {*} func 
 */
const doAuth = (pram, func)=>{
    if(!JsUtil.isEmpty(StepContent.OpenId)) if(func.success) return func.success();
    if(JsUtil.check.getEnv()==="WEAPP") doAuthInMiniProgram(pram, func);
    else if(JsUtil.check.getEnv()==="WEB") doAuthInGzh(pram, func);
}



/**
 * 创建数据库支付订单参数
 * @returns 
 */
const CreateH5OrderParams = ()=>{
    let param = {
        tradeType: "CreateOrder",
        tradeName: 'H5_CreateOrder',
        tradeParam:{
            proId: JsUtil.param.projectId,
            hospitalId: JsUtil.param.hospitalId,
            channel: "WX",
            clientOutTradeNo: JsUtil.sEmpty(DataCache.ClientOutTradeNo),
            // 增加debug
            totalAmount: JsUtil.yuan2Fen(JsUtil.sEmpty(DataCache.Amt, "-1")),
            tradeTime: JsUtil.getFomatDate("yyyyMMddhhmmss"),
            trdType: JsUtil.sEmpty(DataCache.TrdType, "REG"),
            patId: JsUtil.sEmpty(StepContent.PatInfo.PatientId),
            cardNo: JsUtil.sEmpty(StepContent.PatInfo.HisCardNo),
            idNo: JsUtil.sEmpty(StepContent.PatInfo.IdNo),
            patName: JsUtil.sEmpty(StepContent.PatInfo.Name),
            patTel: JsUtil.sEmpty(StepContent.PatInfo.Phone),
            body: JsUtil.sEmpty(DataCache.Body, "就医费用"),
            detail: JsUtil.sEmpty(DataCache.Detail, "Details"),
            redirectUrl: "xxx",
            notifyUrl: "xxx",
            attach: JSON.stringify({route: "his"}),
            toHis: "{}"
        }
    };
    return param;
};

/**
 * 唤起收银台
 * @param {*} pram 
 * @param {*} func 
 * @returns 
 */
const callCashier = (PayParams, func)=>{
    const QueryPay = () => {
        const param = {
            proId: JsUtil.param.projectId,
            hospitalId: JsUtil.param.hospitalId,
            outTradeNo: DataCache.FlowNo
        };
        JsUtil.middleHttpRequestInner("GetStatus_TrdPayStatus", param, {
            success: (res) => {
                if (res.STATUS === 'SUCCESS') {
                    JsUtil.info("交易成功");
                    if (func.success) func.success();
                }
                else if (res.STATUS === 'PAY') {
                    JsUtil.info("支付成功")
                }
                else if (res.STATUS === 'FAIL') {
                    JsUtil.warn("交易失败,系统将自动冲正")
                }
                else {
                    JsUtil.warn("支付出现异常")
                }
            },
            error: () => {
                JsUtil.warn("支付失败");
            }
        })
    };
    if (JsUtil.check.getEnv() === "WEB") {
        if (JsUtil.param.isDebug) {
            JsUtil.info("交易成功");
            if (func.success) func.success();
            return;
        }
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                appId: PayParams.appId,
                timeStamp: PayParams.timeStamp,
                nonceStr: PayParams.nonceStr,
                package: PayParams.package,
                signType: PayParams.signType,
                paySign: PayParams.sign,
            },
            function (res) {
                var code = res.err_msg;
                //alert('resultCode = '+res.resultCode)
                if (code == 'get_brand_wcpay_request:ok') {
                    // 使用以上方式判断前端返回,微信团队郑重提示:res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    QueryPay();
                } else {
                    if (code == 'get_brand_wcpay_request:fail') res.memo = "订单支付失败";
                    else if (code == 'get_brand_wcpay_request:cancel') res.memo = "用户中途取消";
                    else if (code == '调用支付JSAPI缺少参数：total_fee') res.memo = "调用支付JSAPI缺少参数：total_fee";
                    else res.memo = "用户支付失败";
                    JsUtil.warn(res.memo);
                }
            }
        );
    } else {
        // // 发起支付
        Taro.requestPayment({
            timeStamp: PayParams.timeStamp,
            nonceStr: PayParams.nonceStr,
            package: PayParams.package,
            signType: PayParams.signType,
            paySign: PayParams.sign,
            success: function (res) {
                QueryPay();
            },
            fail: function (res) {
                JsUtil.warn("支付失败")
            }
        });
    }
}

/**
 * 申请支付
 * @param {*} pram 
 * @param {*} func 
 */
const doPay = (pram, func)=>{
    let flowNo = "C"+JsUtil.createFlowNo();
    const his = pram;
    let param = {
        proId: JsUtil.param.projectId,
        hospitalId: JsUtil.param.hospitalId,
        channel: "WX",
        clientOutTradeNo: JsUtil.sEmpty(DataCache.FlowNo, flowNo),
        outTradeNo: JsUtil.sEmpty(DataCache.FlowNo, flowNo),
        totalAmount: JsUtil.yuan2Fen(JsUtil.debug.getFee(his.tradeParam.Amt)),
        tradeTime: JsUtil.getFomatDate("yyyyMMddhhmmss"),
        trdType: DataCache.TrdType,
        payType: DataCache.PayType,
        openId: StepContent.OpenId,
        cardNo: his.tradeParam.HisCardNo,
        patId: his.tradeParam.PatientId,
        idNo: his.tradeParam.PatientIdNo,
        patName: his.tradeParam.PatientName,
        patTel: JsUtil.sEmpty(his.tradeParam.PatientPhone),
        body: his.tradeParam.GoodName,
        storeId: JsUtil.param.userId,
        detail: his.tradeParam.GoodName,
        notifyUrl: JsUtil.param.midUrl + '/WxGateway.do',
        attach: JSON.stringify({ route: 'his' }),
        toHis: JSON.stringify(his),
    }
    //发起网络请求
    JsUtil.middleHttpRequestInner("WxPay_CreateOrderDirectly", param, {
        success:(res)=>{
            if (res.returnCode !== '000000') return JsUtil.warn(res.returnInfo);
            let PayParams = res.data;
            callCashier(PayParams, func);
        }
    });
}


export {doAuth, doPay}