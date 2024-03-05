import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/surveyList/index",
        title: "满意度调查列表",
        wxcall: {
          // 查看详情
          detailClick: (item,index) => {
            console.log("查看详情");
            console.log(item,index);
          }
        },
        data: {
          surveyData: {
            isEmpty: "N",
            emptyTips: "暂无调查问卷",
            listData: [
              {
                title: "医院就诊调查",
                promulgator: "amdin",
                date: "2022-02-25 13:14:00",
                btn: "查看详情"
              },
              {
                title: "医院就诊调查",
                promulgator: "amdin",
                date: "2022-02-25 13:14:00",
                btn: "查看详情"
              }
            ]
          }
        }
      }
    };
  }
};
