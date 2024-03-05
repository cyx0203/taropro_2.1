import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    // setTimeout(() => {
    //   UpateCurrentPageData({
    //   });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/THYYYDC/loading/index",
        title: "加载中",
        wxcall: {
        },
        data: {
        }
      }
    };
  }
};
