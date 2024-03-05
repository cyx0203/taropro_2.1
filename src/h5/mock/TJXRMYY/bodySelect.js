import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/bodySelect/index",
        title: "身体部位选择",
        wxcall: {
          // 一级点击事件
          onMainClick: item => {
            console.log(item);
          },
          // 二级点击事件
          onSubClick: item1 => {
            console.log(item1);
          }
        },
        data: {
          listDataArea: {
            //主名称
            main_data: [
              { title: "全部",active:true},
              { title: "内科" },
              { title: "五官科" },
              { title: "中医科" },
              { title: "妇科" },
              { title: "新生儿科" },
              { title: "内科" },
              { title: "五官科" },
              { title: "中医科" },
              { title: "妇科" },
              { title: "新生儿科" },
              { title: "内科" },
              { title: "五官科" },
              { title: "中医科" },
              { title: "妇科" },
              { title: "新生儿科" },
              { title: "内科" },
              { title: "五官科" },
              { title: "中医科" },
              { title: "妇科" },
              { title: "新生儿科" },
              { title: "内科" },
              { title: "五官科" },
              { title: "中医科" },
              { title: "妇科" },
              { title: "新生儿科" },
              { title: "外科外科外科外科外科外科外科"}
            ],
            // 二级名称
            sub_data: [
              { title: "小儿外科" },
              { title: "脑外科" },
              { title: "产科" },
              { title: "中科" },
              { title: "妇科" },
              { title: "小儿外科" },
              { title: "脑外科" },
              { title: "产科" },
              { title: "中科" },
              { title: "妇科" },
              { title: "小儿外科" },
              { title: "脑外科" },
              { title: "产科" },
              { title: "中科" },
              { title: "妇科" },
              { title: "小儿外科" },
              { title: "脑外科" },
              { title: "产科" },
              { title: "中科" },
              { title: "妇科" },
              { title: "外科外科外科外科外科外科外科外科外科外科外科外科外科外科外科" }
            ]
          }
        }
      }
    };
  }
};
