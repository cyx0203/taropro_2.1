import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_OutPayment = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/outPatientPayment/index",
        title: "门诊缴费",
        wxcall: {
          // 缴费按钮点击事件
          paymentOnClick: () => {
            console.log("paymentOnClick");
          }
        },
        data: {
          // 缴费信息
          payment: {
            //   条形码图片
            barCode: "345676543",
            // 条形码数字
            barCodeNumber: "345643",
            // 缴费金额
            money: "35.0元",
            // 缴费详细信息
            paymentInfo: [
              { label: "医院", value: "中国人民武装警察部队四川省总队医院" },
              { label: "项目", value: "武警四川省总队医院挂号缴费" },
              { label: "订单号", value: "4567654356435675" },
              { label: "日期", value: "2022-04-06周二" },
              { label: "时间", value: "13:40-14:00" },
              { label: "就诊人", value: "张三" },
              { label: "医生", value: "专家门诊张三" },
              { label: "科室", value: "消化内科" },
              { label: "账单支付截至日期", value: "20220405" },
              { label: "温馨提示", value: "挂号成功的用户可以直接现场就诊" }
            ],
            btnText: "立即缴费"
          }
        }
      }
    };
  }
};
