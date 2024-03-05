import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    // setTimeout(() => {
    //     UpateCurrentPageData({
    //         //Todo
    //     });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/patientInfo/index",
        title: "就诊人信息",
        wxcall: {
          onClickOne: () => {
            console.log("onClickOne");
          },
          onClickTwo: () => {
            console.log("onClickTwo");
          },
          onClickThree: () => {
            console.log("onClickThree");
          },
        },
        data: {
          tabList:["就诊卡", "电子健康卡"],
          patientInfo: {
            qrCode: `jiu'zhen'ka`,
            EqrCode:`dian'zi'jian'kang`,
            EqrCodeIconUrl:`${RES}/assets/icon/eHealthCardIcon.png`,
            tipText: "就诊时出示此二维码",
            info: [
              { label: "姓名", value: "张三" },
              { label: "身份证号", value: "345678976543" },
              { label: "就诊卡号", value: "345678" },
              { label: "手机号", value: "2345345" }
            ]
          },
          btns: {
            btn1: "返回",
            btn2: "解除就诊人",
            btn3:'我的卡包'
          }
        }
      }
    };
  }
};
