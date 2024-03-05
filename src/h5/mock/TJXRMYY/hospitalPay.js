import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/hospitalPay/index",
        title: "住院充值",
        wxcall: {
          // 充值
          paymentClick:(item) => {
            console.log(item);
          }
        },
        data: {
          patientInfo: [
            { label: "姓名", value: "张三" },
            { label: "床号", value: "07号" },
            { label: "住院科室", value: "骨科" },
            { label: "主治医生", value: "李四" },
            { label: "账户余额", value: "24.31元" }
          ],
          footerBtn:'确认并支付'
        }
      }
    };
  }
};
