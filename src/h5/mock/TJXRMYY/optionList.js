import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    // setTimeout(() => {
    //   UpateCurrentPageData({
    //     optionDataList: {
    //       isEmpty: "Y",
    //       content: [
    //         // {
    //         //   pic: `${RES}/assets/icon/dept-01.png`,
    //         //   name: "张三"
    //         // },
    //         // {
    //         //   pic: `${RES}/assets/img/doctor01.png`,
    //         //   name: "张三",
    //         //   position: "骨科-主任医师"
    //         // },
    //         // {
    //         //   pic: `${RES}/assets/img/doctor01.png`,
    //         //   name: "张三",
    //         //   position: "骨科-主任医师"
    //         // },
    //         // {
    //         //   pic: `${RES}/assets/img/doctor01.png`,
    //         //   name: "张三",
    //         //   position: "骨科-主任医师"
    //         // }
    //       ]
    //     }
    //   });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/optionList/index",
        title: "选项列表",
        wxcall: {
          searchClick: keyword => {
            console.log(keyword);
          },
          onItemClick: (item, index) => {
            console.log(item, index);
          },
          tabChange: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          resultData: {
            icon: "@empty",
            title: "暂未查询到内容"
          },
          seachPlaceholder: "搜索科室、医生",
          tabList: [
            { title: "全部" },
            { title: "体检部" },
            { title: "中医门诊" },
            { title: "外心科" },
            { title: "疼痛科" }
          ],
          optionDataList: {
            isEmpty: "N",
            content: [
              {
                pic: `${RES}/assets/icon/dept-01.png`,
                name: "张三"
              },
              {
                pic: `${RES}/assets/img/doctor01.png`,
                name: "张三",
                position: "骨科-主任医师"
              },
              {
                pic: `${RES}/assets/img/doctor01.png`,
                name: "张三",
                position: "骨科-主任医师"
              },
              {
                pic: `${RES}/assets/img/doctor01.png`,
                name: "张三",
                position: "骨科-主任医师"
              }
            ]
          }
        }
      }
    };
  }
};
