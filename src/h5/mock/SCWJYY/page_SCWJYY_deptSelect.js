import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_DeptSelect = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        searchPlaceholder: "搜索科室、医生111",
        // 科室列表
        btnList: {
          // 是否有小箭头
          arrow: true,
          //科室列表内容
          listData: [
            { icon: `${RES}/assets/img/office.png`, label: "科室名1" },
            { icon: `${RES}/assets/img/office.png`, label: "科室名2" },
            { icon: `${RES}/assets/img/office.png`, label: "科室名3" },
            { icon: `${RES}/assets/img/office.png`, label: "科室名4" },
            { icon: `${RES}/assets/img/office.png`, label: "科室名5" },
            { icon: `${RES}/assets/img/office.png`, label: "科室名6" },
            { icon: `${RES}/assets/img/office.png`, label: "科室名7" }
          ]
        }
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/departmentSelect/index",
        title: "选择科室",
        wxcall: {
          // 科室选择点击事件
          onDeptClick: (item, index) => {
            console.log("##onClick##");
            console.log(item, index);
          },
          //   搜索框
          searchClick: value => {
            console.log(value);
          }
        },
        data: {
          searchPlaceholder: "搜索科室、医生",
          // 科室列表
          btnList: {
            // 是否有小箭头
            arrow: true,
            //科室列表内容
            listData: [
              { icon: `${RES}/assets/img/office.png`, label: "科室名" },
              { icon: `${RES}/assets/img/office.png`, label: "科室名" },
              { icon: `${RES}/assets/img/office.png`, label: "科室名" },
              { icon: `${RES}/assets/img/office.png`, label: "科室名" },
              { icon: `${RES}/assets/img/office.png`, label: "科室名" },
              { icon: `${RES}/assets/img/office.png`, label: "科室名" },
              { icon: `${RES}/assets/img/office.png`, label: "科室名" }
            ]
          }
        }
      }
    };
  }
};
