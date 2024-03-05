import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_ResultSubmit = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        content: {
          title: "就诊信息232",
          info: [
            { label: "医院", value: "武警四川省总队医院111" },
            { label: "医生", value: "专家门诊许*1111*" },
            { label: "科室", value: "消化内科1111" },
            { label: "时间", value: "2022-04-26周二13:30-14:00" },
            { label: "费用", value: "35.0元" }
          ]
        },
        patient: "张三222"
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/resultSubmit/index",
        title: "预交结果",
        wxcall: {
          changePatient: () => {
            console.log("切换就诊人");
          },
          resultSubmit: () => {
            console.log("提交评价");
          }
        },
        data: {
          content: {
            title: "就诊信息",
            info: [
              { label: "医院", value: "武警四川省总队医院" },
              { label: "医生", value: "专家门诊许**" },
              { label: "科室", value: "消化内科" },
              { label: "时间", value: "2022-04-26周二13:30-14:00" },
              { label: "费用", value: "35.0元" }
            ]
          },
          patient: "张三"
        }
      }
    };
  }
};
