import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_ConfRegistration = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/confirmRegistration/index",
        title: "挂号确认",
        wxcall: {
          // 切换就诊人点击事件
          changePatient: () => {
            console.log("切换就诊人");
          },
          // 确认按钮点击事件
          confirm: () => {
            console.log("确认");
          },
          // 取消按钮点击事件
          cancel: () => {
            console.log("取消");
          }
        },
        data: {
          // 按钮集合。注释掉字段代表按钮隐藏（不启用该按钮）
          btns: {
            changePatient: "切换",
            confirm: "确认并缴费",
            cancel:'取消预约'
          },
          // 就诊人挂号信息列表反显
          content: [
              { label: "就诊科室", value: "消化内科门诊" },
              { label: "就诊医生", value: "专家门诊许**" },
              { label: "挂号类别", value: "普通门诊" },
              { label: "就诊时间", value: "2022-04-26（昼夜）" },
              { label: "就诊费用", value: "35.0元" },
              { label: "就诊卡号", value: "41521212" }
            ],
          // 就诊人信息
          patient: "张三李四",
          // 温馨提示内容
          warmPrompt: {
            //标题
            title: "温馨提示：",
            // 内容
            content:
              "请核对您的挂号信息！只支持隔日预约退号；当日挂号成功后不能退号。"
          }
        }
      }
    };
  }
};
