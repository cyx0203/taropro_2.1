import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/result/index",
        title: "完成页",
        wxcall: {
          onClickExamine: () => {
            console.log("查看详情");
          },
          onClickRegret: () => {
            console.log("退费申请");
          }
        },
        data: {
          // 背景图
          bgImg: `${RES}/assets/img/bg.png`,
          // 按钮集合。注释掉字段代表按钮隐藏（不启用该按钮）
          btns: {
            examine: "查看详情",
            regret: "退费申请"
          },
          resultData: {
            //[*] ICON
            // success
            icon: `${RES}/assets/icon/success2.png`, //成功的图标
            img:`${RES}/assets/icon/success1.png`,//成功的背景图
            // fail
            // icon: `${RES}/assets/icon/fail2.png`,//成功的图标
            // img: `${RES}/assets/icon/fail1.png`,//成功的背景图
            //[*] 主标题
            title: "支付成功",
            //[-] 副标题
            subTitle: "结算未能成功，请联系管理员"
          }
        }
      }
    };
  }
};
