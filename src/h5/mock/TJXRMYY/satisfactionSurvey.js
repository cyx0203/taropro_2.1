import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/satisfactionSurvey/index",
        title: "满意度调查",
        wxcall: {
          submitEvaluate: item => {
            console.log("提交评价");
            console.log(item);
          }
        },
        data: {
          questionList: [
            {
              // id
              id: 1,
              // 评价问题
              title: "（选择）选择科室",
              // 题目类型
              type: "5", //1-单选 2-多选 3-打分 4-文字评价 5-选择列表
              // 题目内容
              answer: [
                "神经科","内科","外科","口腔科"
              ],
            // 题目唯一区分标识
              uniqueId:'selectDept'
            },
            {
              // id
              id: 2,
              // 评价问题
              title: "(多选)你选择本院看病的原因",
              // 题目类型
              type: "2", //1-单选 2-多选 3-打分 4-文字评价
              // 题目内容
              answer: [
                { id: 1, label: "医院环境好", value: "医院环境好"},
                { id: 2, label: "医生专业", value: "医生专业" },
                { id: 3, label: "护士亲和", value: "护士亲和" },
                { id: 4, label: "就诊方便", value: "就诊方便" }
              ],
            // 题目唯一区分标识
              uniqueId:'evaluate_Hospital_1'
            },
            {
              // id
              id: 3,
              // 评价问题
              title: "(多选)你选择本院看病的原因",
              // 题目类型
              type: "2", //1-单选 2-多选 3-打分 4-文字评价
              // 题目内容
              answer: [
                { id: 1, label: "医院环境好", value: "医院环境好"},
                { id: 2, label: "医生专业", value: "医生专业" },
                { id: 3, label: "护士亲和", value: "护士亲和" },
                { id: 4, label: "就诊方便", value: "就诊方便" }
              ],
            // 题目唯一区分标识
              uniqueId:'evaluate_Hospital_2'
            },
            {
              id: 4,
              title: "(单选)你对医护人员的态度满意吗?",
              type: "1",
              answer: [
                { label: "满意" },
                { label: "一般" },
                { label: "不满意" }
              ],
              uniqueId:'evaluate_Manner'
            },
            {
              id: 5,
              title: "(评星)您的就医体验",
              type: "3",
              // 默认值
              value:5,
              uniqueId:'rating'
            },
            {
              id: 6,
              title: "您的就医体验",
              type: "4",
              // 默认内容
              value:'3233',
              placeholder:'这是输入框提示文字',
              uniqueId:'textArea'
            }
          ],
          footerBtn: "提交评价",
        }
      }
    };
  }
};
