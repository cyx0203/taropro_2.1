import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/bodyInfo/index",
        title: "身体部位信息",
        wxcall: {
          selectPart:(gender,item) => { //入参为性别、部位 都为字符串类型
            console.log(gender,item);
          }
        },
        data: {
          imgURLList:[
            `${RES}/assets/img/body-01.png`,
            `${RES}/assets/img/body-02.png`,
            `${RES}/assets/img/body-03.png`,
            `${RES}/assets/img/body-04.png`,
          ]
        }
      }
    };
  }
};
