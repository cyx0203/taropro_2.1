import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        // searchPlaceholder: '???????'
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/personalCenter/index",
        title: "个人中心",
        wxcall: {
          // 切换就诊人点击事件
          changePatient: () => {
            console.log("切换就诊人");
          },
          //  二维码点击事件
          QRClick: () => {
            console.log("二维码点击事件");
          },
          //  就诊功能点击事件
          menuClick: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          bgImg:`${RES}/assets/img/bg.png`,
          // 就诊人信息
          patientInfo: {
            icon: `${RES}/assets/img/patient.png`,
            name: "张三张三",
            qricon: `${RES}/assets/icon/qrcode2.png`,
            qrData:'11',
            qrTitle:'标题',
            // type: "健康卡",
            info: [
              { label: "手机号", value: "124585555" },
              { label: "就诊卡号", value: "124585585255" }
            ],
            btnIcon:`${RES}/assets/icon/change2.png`,
            btn:'切换就诊人'
          },
          // 就诊功能列表
          menuList: [
            {
              title: "就诊人管理",
              icon: `${RES}/assets/icon/personal-01.png`
            },
            {
              title: "挂号记录",
              icon: `${RES}/assets/icon/personal-02.png`
            },
            {
              title: "智能导览",
              icon: `${RES}/assets/icon/personal-03.png`
            },
            {
              title: "意见反馈",
              icon: `${RES}/assets/icon/personal-04.png`
            },
            {
              title: "关于",
              icon: `${RES}/assets/icon/personal-05.png`
            },
            {
              title: "使用帮助",
              icon: `${RES}/assets/icon/personal-06.png`
            }
          ]
        }
      }
    };
  }
};
