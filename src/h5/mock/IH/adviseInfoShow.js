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
        mod: "h5/pages/IH/adviseInfoShow/index",
        title: "意见反馈显示",
        wxcall: {},
        data: {
          infoList: [
            { label: "留言者姓名", value: "张安" },
            { label: "联系方式", value: "12313244424" },
            { label: "信件类别", value: "意见信" },
            { label: "留言时间", value: "2021-09-08 16:22:22" },
            { label: "当前状态", value: "已处理" },
          ],
          message:'留言内容刘亚你呢人佛山市是多少的放松放松是否发',
          reply:'放到方式发 方式是的是 if发生的就是说是富数据你就是你发你是'
        }
      }
    };
  }
};
