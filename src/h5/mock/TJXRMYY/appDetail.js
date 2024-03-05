import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/appDetail/index",
        title: "预约挂号详情",
        wxcall: {
          // 取消
          onCancelClick: () => {
            console.log("取消");
          },
          // 支付
          onPayClick: () => {
            console.log("支付");
          }
        },
        data: {
          // 顶部提示语
          topTips: "请在14分25秒内完成支付，过期自动取消号源",
          // 预约挂号信息
          appInfo: {
            // 单号
            number: "15121",
            // 二维码
            QRCode: "1121",
            info: [
              { label: "姓名", value: "张三" },
              { label: "身份证号", value: "345678976543" },
              { label: "就诊卡号", value: "345678" },
              { label: "手机号", value: "2345345" }
            ]
          },
          warmTips: {
            //[*] 标题
            title: "温馨提示",
            //[*] 内容
            content: "1.无须区号 2.凭就诊码于预约当天到相关科室就诊"
          },
          // 可配置，注释则不显示按钮
          footerBtn: {
            cancel: "取消",
            pay: "立即支付"
          }
        }
      }
    };
  }
};
