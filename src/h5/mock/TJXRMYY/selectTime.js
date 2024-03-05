import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/selectTime/index",
        title: "选择时间",
        wxcall: {
          selectTime: time => {
            console.log(time);
          }
        },
        data: {
          tips:'提示内容',
          startTime: "2023/3/1",
          endTime: "2023/6/10",
          footerBtn: "确认"
        }
      }
    };
  }
};
