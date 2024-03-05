import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/doctorLogin/index",
        title: "医生登录",
        wxcall: {
          submitClick:(obj) => {
            console.log(obj)
          }
        },
        data: {
          assets:`${RES}/assets/icon/doctorLogin.svg`,
          title: "在线问诊系统",
          subtitle: "医生端",
          selectList: [
            { label: "选择一", value: "1" },
            { label: "选择二", value: "2" },
            { label: "选择三", value: "3" }
          ]
        }
      }
    };
  }
};
