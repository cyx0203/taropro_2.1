import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/feedback/index",
        title: "意见反馈",
        wxcall: {
          submitEvaluate: item => {
            console.log("提交评价");
            console.log(item);
          }
        },
        data: {
          // 提示框提示文字
          tipsText:"请填写完整信息",
          // 意见反馈问题列表
          inputForms: [
            {
              // （必填）表单的唯一id (state中的key值)
              id: "questionType",
              // （必填）表单label
              label: "问题类型",
              // （选填）默认值，不填默认未空  （type = select时，此项填入select中的value值）
              defaultValue: "",
              // 业务类型
              type: "select", // text - 文本输入 select - 单选框

              // 单选输入框必填
              selectList: [
                { label: "01", value: "缴费" },
                { label: "02", value: "住院" },
                { label: "03", value: "挂号" }
              ]
            },
            {
              id: "name",
              label: "姓名",
              type: "text" // text - 文本输入 select - 单选框
            },
            {
              id: "number",
              label: "联系电话",
              type: "text" // text - 文本输入 select - 单选框
            },
            {
              id: "textarea",
              label: "",
              type: "textarea" // text - 文本输入 select - 单选输入框 textarea -文本域
            }
          ],
          footerBtn: "提交评价"
        }
      }
    };
  }
};
