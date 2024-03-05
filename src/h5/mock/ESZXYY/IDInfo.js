import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({});
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/ESZXYY/IDInfo/index",
        title: "证件信息",
        wxcall: {
          onFooterClick:() => {
            console.log('footer Btn Click')
          },
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          }
        },
        data: {
          stepTxt: {
            bgImg: `${RES}/assets/img/titleBg.jpg`,
            title: "2.录入电子陪护证信息",
            // subtitle: "您的信息仅用于医院（带*号的为必填项）",
            subIcon: `${RES}/assets/icon/tips.png`
          },
          cardInfo: {
            // title: "电子陪护证！",
            title: "您的电子陪护证超过时效！",
            // subtitle: "（时效内）",
            subtitle: "请重新登记个人信息",
            bgImg: `${RES}/assets/img/bg_green.png`,
            // 默认头像
            defaultHead:
              "http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/img/zp.png",
            personPic: `${RES}/assets/img/zp.png`,
            status: "审核中...", //已完成  审核中...
            infoList: [
              {
                label: "陪护人姓名",
                value: "李思思"
              },
              {
                label: "陪护人身份证号",
                value: "43324***3232"
              },
              {
                label: "陪护人联系方式",
                value: "134***3323"
              }
            ]
          },

          footerBtn: {
            txt: "重新申请",
            icon:
              "http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/submit.png"
          },
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
