import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_Payment = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        payment: {
          money: "3222.00",
          paymentInfo: [
            { label: "缴费商户1", value: "中国人民武装警察部队四川省总队医院" },
            { label: "缴费项目", value: "武警四川省总队医院挂号缴费" },
            { label: "订单流水号", value: "4567654356435675" },
            { label: "客户姓名", value: "张三" },
            { label: "账单名称", value: "农行H5支付" },
            { label: "账单支付截止日期", value: "20200422" },
            { label: "账单备注22", value: "备注信息为空" },
            { label: "订单号", value: "76543234567898765" },
            { label: "温馨提示1", value: "挂号成功的用户可以直接现场就诊" }
          ],
          btnText: "缴费"
        },
        warmPrompt: {
          title: "温馨提示1：",
          content:
            "请核对您的挂号信息！只支持隔日预约退号；当日挂号成功后不能退号。"
        }
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/payment/index",
        title: "缴费",
        wxcall: {
          paymentOnClick: () => {
            console.log("==pay==");
          }
        },
        data: {
          payment: {
            money: "3.00",
            paymentInfo: [
              {
                label: "缴费商户",
                value: "中国人民武装警察部队四川省总队医院"
              },
              { label: "缴费项目", value: "武警四川省总队医院挂号缴费" },
              { label: "订单流水号", value: "4567654356435675" },
              { label: "客户姓名", value: "张三" },
              { label: "账单名称", value: "农行H5支付" },
              { label: "账单支付截止日期", value: "20200422" },
              { label: "账单备注", value: "备注信息为空" },
              { label: "订单号", value: "76543234567898765" },
              { label: "温馨提示", value: "挂号成功的用户可以直接现场就诊" }
            ],
            btnText: "缴费"
          },
          warmPrompt: {
            title: "温馨提示：",
            content:
              "请核对您的挂号信息！只支持隔日预约退号；当日挂号成功后不能退号。"
          }
        }
      }
    };
  }
};
