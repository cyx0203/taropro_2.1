import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/personCenter/index",
        title: "医生个人中心",
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
          },
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          }
        },
        data: {
          bgImg:`${RES}/assets/img/bg.png`,
          // 就诊人信息
          patientInfo: {
            icon: `${RES}/assets/icon/patient.png`,
            name: "张三张三",
            qricon: `${RES}/assets/icon/qrcode-02.png`,
            type: "健康卡",
            info: [
              { label: "手机号", value: "124585555" },
              { label: "就诊卡号", value: "124585585255" }
            ],
            btnIcon:`${RES}/assets/icon/change-02.png`,
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
          ],
          // 底部导航按钮数据
          navData: [
            {
              normal_img_url: `${RES}/assets/icon/nav_1_1.svg`,
              active_img_url: `${RES}/assets/icon/nav_1_2.svg`,
              text: "首页",
              active: true
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_2_1.svg`,
              active_img_url: `${RES}/assets/icon/nav_2_2.svg`,
              text: "问诊订单"
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_3_1.svg`,
              active_img_url: `${RES}/assets/icon/nav_3_2.svg`,
              text: "消息"
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_4_1.svg`,
              active_img_url: `${RES}/assets/icon/nav_4_2.svg`,
              text: "个人中心"
            }
          ]
        }
      }
    };
  }
};
