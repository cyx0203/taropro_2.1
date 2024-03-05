import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_Result = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/result/index",
        title: "操作结果",
        wxcall: {},
        data: {
          resultData: {
            //[*] ICON
            icon: '@success',
            //[*] 主标题
            title: "退号成功",
            //[-] 副标题
            subTitle: "退号成功"
          }
        }
      }
    };
  }
};
