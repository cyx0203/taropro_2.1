import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/iframeView/index",
        title: "外部网页",
        wxcall: {
        },
        data: {
          webSrc:'http://localhost:320123/'
        }
      }
    };
  }
};
