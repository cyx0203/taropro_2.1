import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/reportQuery/index",
        title: "报告查询",
        wxcall: {
          onCheckClick:(item,index) => {
            console.log(item,index);
          }
        },
        data: {
          contentArea:[
            // 第一张卡片
            {
              // 卡片右侧小箭头
              arrow:true,
              // 卡片上方的标题，不配置则没有小标题
              title:'门诊报告',
              // 卡片的内容
              listData:[
                {
                  icon:`${RES}/assets/icon/report.png`,
                  label:"我的检查报告",
                },
                {
                  icon:`${RES}/assets/icon/report.png`,
                  label:"我的检查报告",
                },
              ]
            },
            {
              // 卡片右侧小箭头
              arrow:true,
              // 卡片上方的标题，不配置则没有小标题
              title:'门诊报告',
              // 卡片的内容
              listData:[
                {
                  icon:`${RES}/assets/icon/report.png`,
                  label:"我的检查报告",
                }
              ]
            },
            {
              arrow:true,
              title:'住院报告',
              listData:[
                {
                  icon:`${RES}/assets/icon/report.png`,
                  label:"我的检验报告",
                }
              ]
            },
          ]
        }
      }
    };
  }
};
