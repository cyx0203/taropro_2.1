import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    // setTimeout(() => {
    //     UpateCurrentPageData({
    //         //Todo
    //     });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/webview/index",
        title: "",
        wxcall: {},
        data: {
          url: "https://www.ggzzrj.cn:8080/ued/mini/index3.html",
          params: "a=1&b=2",
          //该页面销毁时，进行的跳转模版路径，不配置或者为空：''，则不会进行页面的指定跳转 
          backUrl:'/h5/pages/IH/index/index4/index'
        }
      }
    };
  }
};
