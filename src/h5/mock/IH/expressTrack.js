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
        mod: "h5/pages/IH/expressTrack/index",
        title: "",
        wxcall: {},
        data: {
          // 物流梗概
          expressData: {
            title: "SEM运单号：53495348983443364", // 标题/单号
            start: "镇江市", // 开始城市名
            end: "常州市", // 目标城市名
            status:'运输中',// 当前状态
            // extra: "预计签收时间：09月25日 12:00", // 额外信息
            // detailAddress: "江苏省常州市钟楼区国光1937创意园"// 详细地址
          },
          // 轨迹信息
          trackData: [
            {
              title: "正在派件【快递员张三】",
              content: ["2023-06-32 12:12:12"]
            },
            {
              title: "快件到达【常州市花园网点】",
              content: ["2023-06-32 12:12:12"]
            },
            {
              title: "快件离开【无锡中转站】已发往【常州市花园网点】",
              content: ["2023-06-32 12:12:12"]
            },
            {
              title: "快件到达【无锡中转站】",
              content: ["2023-06-32 12:12:12"]
            },
            {
              title: "快件离开【镇江转运中心】已发往【无锡中转站】",
              content: ["2023-06-32 12:12:12"]
            }
          ]
        }
      }
    };
  }
};
