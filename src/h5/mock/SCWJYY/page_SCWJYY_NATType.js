import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_NATType = class {
  static data() {
    
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/NATType/index",
        title: "核酸检测类型",
        wxcall: {
          // 核酸检测类型点击事件
          onNATTypeClick: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          // 核酸检测类型信息
          NATInfo: [
            {
              // 核酸检测类型标题
              title: "新型冠状病毒核酸检测预约（混合检测）",
              // 图标
              icon: `${RES}/assets/icon/NAT_2.png`,
              // 检测方式
              type: "咽柿子检测",
              // 检测费用
              // money: "8.00元"
            },
            {
              title: "新型冠状病毒核酸检测预约（个人检测）",
              icon: `${RES}/assets/icon/NAT_1.png`,
              type: "咽柿子检测",
              // money: "28.00元"
            }
          ]
        }
      }
    };
  }
};
