import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/evaluate/index",
        title: "就医评价",
        wxcall: {
          submitEvaluate: item => {
            console.log("提交评价");
            console.log(item);
          }
        },
        data: {
            textAreaTips:'请填写你的意见和建议',
            footerBtn:'提交评价',
          evaluateDataArea: {
            evaluateData: {
              // 评价内容
              content: [
                {
                  activeIcon: `${RES}/assets/icon/evaluation-active-2.png`,
                  inactiveIcon: `${RES}/assets/icon/evaluation-inactive-2.png`,
                  text: "满意"
                },
                {
                  activeIcon: `${RES}/assets/icon/evaluation-active-3.png`,
                  inactiveIcon: `${RES}/assets/icon/evaluation-inactive-3.png`,
                  text: "一般"
                },
                {
                  activeIcon: `${RES}/assets/icon/evaluation-active-1.png`,
                  inactiveIcon: `${RES}/assets/icon/evaluation-inactive-1.png`,
                  text: "差劲"
                }
              ],
              // 评价选项列表
              listData: [
                {
                  label: "医生态度",
                  value: 1
                },
                {
                  label: "医生专业",
                  value: 1
                },
                {
                  label: "医院环境",
                  value: 1
                },
                {
                  label: "总体评价",
                  value: 1,
                  // 评价卡片内的评价列表
                  subList: [
                    { label: "预约方便", value: false },
                    { label: "收费合理", value: false },
                    { label: "检查方便", value: false },
                    { label: "接诊及时", value: false },
                    { label: "态度亲和", value: false },
                    { label: "环境干净", value: false }
                  ]
                }
              ]
            },
            // btn: {
            //   txt: "提交评价"
            // }
          }
        }
      }
    };
  }
};
