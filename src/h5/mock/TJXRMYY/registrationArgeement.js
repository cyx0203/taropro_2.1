import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/registrationArgeement/index",
        title: "挂号协议",
        wxcall: {
          agreeClick: () => {
            console.log("==Click==");
          }
        },
        data: {
          img: `${RES}/assets/icon/agreeMent.png`,
          agreeMent: `<p>请携带身份证就医。</p>
            <p>本平台支持线上在线挂号，预约挂号，在线支付挂号费用。</p>
            <p>预约当天不可退号。</p>
            <p>因部队医院特殊原因，您预约的个别医生临时参与部队任务，医院将同级或者更高等级医生为您服务。</p>
            <p>新冠疫情期间，请佩戴好口罩进行就医。</p>`
        }
      }
    };
  }
};
