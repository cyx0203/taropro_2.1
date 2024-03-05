import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({});
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/ESZXYY/diseaseForm/index",
        title: "病症表单",
        wxcall: {
          submitClick: data => {
            console.log(data);
          }
        },
        data: {
          patientInfo:{
            name:'张三是的',
            gender:'男',
            age:34,
          },
          
          assets:{
            titleBg:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/img/titleBg.jpg",
            tips:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/tips.png",
            selected:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/selected.png",
            submit:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/submit.png",
            user:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/img/user.svg",
          },
        }
      }
    };
  }
};
