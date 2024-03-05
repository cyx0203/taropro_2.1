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
        mod: "h5/pages/ESZXYY/uploadIDCard/index",
        title: "上传身份证照片",
        wxcall: {
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          },
          submitClick: item => {
            console.log(item);
          }
        },
        data: {
          stepTxt: {
            title: "2.上传证明材料",
            subtitle: "您的信息仅用于医院"
          },
          assets:{
            titleBg:`${RES}/assets/img/titleBg.jpg`,
            tips:`${RES}/assets/icon/tips.png`,
            submit:`${RES}/assets/icon/submit.png`,
            idCard_1:`${RES}/assets/img/idCard_1.png`,
            idCard_2:`${RES}/assets/img/idCard_2.png`,
            idCard_3:`${RES}/assets/img/idCard_3.png`,
            upload:`${RES}/assets/icon/upload.png`,
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
