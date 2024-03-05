import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    // setTimeout(() => {
    //   UpateCurrentPageData({
    //     // toastData:{
    //     //   //内容
    //     //   content: `<span>预约挂号预计得蚂蚁森林能量<span style='color:green'>277g</span></span>`,
    //     //   // 持续时间 单位:秒 s 
    //     //   duration:2
    //     // },
    //     // topTips:'此报告明细仅供参考，请以医院纸质报告为准121312313',
    //   });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/reportDetails/index",
        title: "报告详情",
        wxcall: {},
        data: {
          topTips:'此报告明细仅供参考，请以医院纸质报告为准',
          detailsArea: {
            type: "检验报告",
            info: [
              {label:'姓名',value:'张三'},
              {label:'检测名称',value:'血常规'},
              {label:'开方科室',value:'消化内科'},
              {label:'报告时间',value:'2022-04-26 20:35:21'},
              {label:'报告时间',value:'发士大夫士大夫对方的防守法大师傅士大夫第三方的方式发射点发生反对法士大夫士大夫士大夫师傅师傅双方都是士大夫是独特的风格士大夫胜多负少地方'},
            ],
            
            contents: {
              // 表格头部
              head: [
                {
                  title: "检查项目",
                  ratio: 0.6,
                  align: "center"
                },
                {
                  title: "结果",
                  ratio: 0.2,
                  align: "center"
                },
                {
                  title: "参考值",
                  ratio: 0.2,
                  align: "center"
                }
              ],
              // 表格内容
              body: [
                { 
                  // 检验项
                  testItem: "白细胞", 
                  // 结果
                  res: "7.34", 
                  // 参考值
                  unit: "3.5-9.5",
                  // 是否高出或低于参考值，高出则是high，低于则是low，在参考值内则为空
                  flag:'high' },
                { testItem: "白细胞白细胞白细胞白细胞白细胞白细胞白细胞白细胞", res: "7.34", unit: "3.5-9.5",flag:'low' },
                { testItem: "白细胞", res: "7.34", unit: "3.5-9.5",flag:'' },
                { testItem: "白细胞", res: "7.34", unit: "3.5-9.5" ,flag:'low'},
                { testItem: "游离前列腺特异性抗原测定FPSA（化学发光法）(FPSA)", res: "7.34", unit: "3.5-9.5",flag:'high' }
              ]
            }
          }
        }
      }
    };
  }
};
