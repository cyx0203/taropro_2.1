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
        mod: "h5/pages/IH/inquiryType/index",
        title: "",
        wxcall: {
          inquiryOnClick:(item,index) => {
            console.log(item,index)
          }
        },
        data: {
          typeList: [
            {
              typeTitle: {
                icon: `${RES}/assets/icon/video.svg`,
                title: "视频问诊"
              },
              infoData: {
                tips: "服务时间：每日上午8:00-11:30 下午14:00-17:00",
                lineList: [
                  { title: "医生线上实时一对一接诊，以音视频对话为主" },
                  { title: "可预约线上专家号，团队号" },
                  { title: "有辅医人员全程导诊" },
                  { title: "初诊可咨询，复诊能立刻开处方" }
                ],
                extra: {
                  label: "就诊流程",
                  value: [
                    "挂号",
                    "预约时段进入视频候诊间（位置在首页下方图标）",
                    "线上排队等候",
                    "线上问诊",
                    "结束"
                  ]
                }
              },
              footerBtn:{
                disabled:false,
                text:'去挂号'
              }
            },
            {
              typeTitle: {
                icon: `${RES}/assets/icon/image-txt.svg`,
                title: "图文问诊"
              },
              infoData: {
                tips: "服务时间：有医生在线即可发起问诊",
                lineList: [
                  { title: "采用问答模式" },
                  { title: "医生回复消息可能存在延迟" },
                  { title: "图文订单有效期为24小时" },
                  { title: "初诊可咨询，复诊能立刻开处方可能存在延迟" }
                ],
                extra: {
                  label: "就诊流程",
                  value: [
                    "挂号",
                    "进入图文订单（位置在首页下方图标）",
                    "进行图文问诊",
                    "结束"
                  ]
                }
              },
              footerBtn:{
                disabled:true,
                text:'去挂号'
              }
            },
          ]
        }
      }
    };
  }
};
