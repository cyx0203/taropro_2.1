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
        mod: "h5/pages/ESZXYY/register/index",
        title: "登记",
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
            title: "2.录入电子陪护证信息",
            subtitle: "您的信息仅用于医院（带*号的为必填项）"
          },
          
          assets:{
            titleBg:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/img/titleBg.jpg",
            tips:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/tips.png",
            selected:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/selected.png",
            submit:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/submit.png"
          },
          // 表单设置
          formSet: {
            userName: {
              // 是否打星号
              asterisk: true,
              // 文本框提示文字
              placeholder: "请填写陪护人员姓名"
            },
            userID: {
              asterisk: true,
              placeholder: "请填写陪护人员身份证号"
            },
            userPhoneNumber: {
              asterisk: true,
              placeholder: "请填写陪护人员联系电话"
            },
            IDImg:{
              asterisk: true,
            },
            personalImg:{
              asterisk: false,
            },
            NATImg:{
              asterisk: false,
            }
          },
          tipsTxt:
            "为积极防控疫情，我承诺以上登记内容属实，否则按照《传染病防治法》规定接受相关调查及处理。",

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
