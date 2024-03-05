import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/cardLogin/index",
        title: "就诊卡登录",
        wxcall: {
          // 其他登录方式
          changeLoginType: () => {
            console.log("其他登录方式");
          },
          // 选择就诊卡
          onSelectClick: () => {
            console.log('选择就诊卡');
          },
          //  添加就诊卡
          onAddClick: () => {
            console.log("添加就诊卡");
          }
        },
        data: {
          patientCardInfo: {
            icon: `${RES}/assets/img/patient.png`,
            name: "张三",
            number: "就诊卡号:511515121",
            cardBtn: "选择",
            footerBtn:'添加就诊人'
          },
        }
      }
    };
  }
};
