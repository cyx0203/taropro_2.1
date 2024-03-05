import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    // setTimeout(() => {
    //     UpateCurrentPageData({
    //         //Todo
    //     });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/reportQuery/index",
        title: "",
        wxcall: {},
        data: {
          topTips:'此报告明细仅供参考，请以医院纸质报告为准，截屏无效',
          contentArea:[
            // 第一张卡片
            {
              // 卡片右侧小箭头
              arrow:true,
              // 卡片上方的标题
              title:'检查报告查询',
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
              title:'检验报告查询',
              listData:[
                {
                  icon:`${RES}/assets/icon/report2.png`,
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
