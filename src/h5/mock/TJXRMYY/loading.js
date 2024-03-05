import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/loading/index",
        title: "加载中",
        wxcall: {
        },
        data: {
          loadingData:{
            imgUrl1: `${RES}/assets/img/loading.png`,
            imgUrl2: `${RES}/assets/img/pmgressbar.png`,
            text:'正在加载，请稍后...'
          }
        }
      }
    };
  }
};
