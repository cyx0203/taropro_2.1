import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/ESZXYY/apply/index",
        title: "申请",
        wxcall: {
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          },
          nextClick:(item) => {
            console.log(item);
          }
        },
        data: {
          stepTxt: {
            title: "2.录入电子陪护证信息",
            subtitle: "您的信息仅用于医院（带*号的为必填项）"
          },
          assets:{
            titleBg:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/img/titleBg.jpg",
            tips:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/tips.png",
            next:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/next.png"
          },
          warmTips:'温馨提示：您正在申请住院患者陪护人员出入病区电子凭证，请正确填写您申请陪护的住院患者姓名和住院号。',
          // 底部导航按钮数据
          navData: [
            {
              normal_img_url: `${RES}/assets/icon/nav_2_1.png`,
              active_img_url: `${RES}/assets/icon/nav_1_1.png`,
              text: "首页",
              active: true
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_2_2.png`,
              active_img_url: `${RES}/assets/icon/nav_1_2.png`,
              text: "我的"
            }
          ]
        }
      }
    };
  }
};
