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
        mod: "h5/pages/IH/eHealthCard/index",
        title: "",
        wxcall: {
          selectCard:(item) => {
            console.log('选择健康卡',item)
          },
          addCard:() => {
            console.log('添加健康卡')
          }
        },
        data: {
        }
      }
    };
  }
};
