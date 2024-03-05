import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/department/index",
        title: "科室选择",
        wxcall: {
          // 搜索框搜索点击事件
          searchOnClick: val => {
            console.log(val);
          },
          deptClick: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          // 搜索框提示文字
          searchPlaceholder: "搜索科室",
          pageData: {
            // 标题
            title: "选择科室",
            // 科室列表是否为空
            isEmpty: "Y",
            // 科室列表
            deptList: [
              {
                txt: "科室1",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室2",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室3",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室4",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室5",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室6",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室1",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室2",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室3",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室4",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室5",
                icon: `${RES}/assets/icon/dept.svg`
              },
              {
                txt: "科室6",
                icon: `${RES}/assets/icon/dept.svg`
              }
            ]
          },
          resultData: {
            icon: "@empty",
            title: "未查询到科室"
          }
        }
      }
    };
  }
};
