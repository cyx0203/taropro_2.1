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
        mod: "h5/pages/IH/reportDocuments/index",
        title: "",
        wxcall: {
          onTabClick: (item, index) => {
            console.log(item, index);
          },
          // 时间选择器
          onDateClick: (type, item) => {
            console.log("时间选择");
            console.log(type);
            console.log(item);
          },
          onCheckDetail: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          topTips: "此报告明细仅供参考，请以医院纸质报告为准",
          tabList: [{ title: "检验" }, { title: "检查" }],
          // 时间选择器
          dateSelector: {
            startDate: "2022-04-26",
            endDate: "2022-05-26"
          },
          // 检验报告
          examineArea: {
            // 是否为空
            isEmpty: "N",
            // 为空的提示语
            emptyTips: "暂无报告查询",
            // 为空的ICON
            emptyIcon: `${RES}/assets/icon/report3.png`,
            // 卡片内容
            content: {
              // 卡片内容前部的ICON
              imgUrlArr: [
                `${RES}/assets/icon/people.png`,
                `${RES}/assets/icon/time.png`
              ],
              // 底部的按钮文字
              footerBtn: "查看详情",
              //卡片内容数组
              listData: [
                {
                  title: "核酸检测混检",
                  // titleRight: "2020-01-01 13:30:00",
                  contents: [
                    {
                      label: "就诊人：",
                      value: "张三11"
                    },
                    {
                      label: "检验时间：",
                      value: "2022-06-20"
                    }
                  ]
                },
                {
                  title: "核酸检测（混检）",
                  titleRight: "2020-01-01 13:30:00",
                  contents: [
                    {
                      label: "就诊人：",
                      value: "李四1111"
                    },
                    {
                      label: "检验时间：",
                      value: "2022-06-20"
                    }
                  ]
                }
              ]
            }
          },
          // 检验报告
          checkoutArea: {
            // 是否为空
            isEmpty: "N",
            // 为空的提示语
            emptyTips: "暂无报告查询",
            // 为空的ICON
            emptyIcon: `${RES}/assets/icon/report3.png`,
            // 卡片内容
            content: {
              // 卡片内容前部的ICON
              imgUrlArr: [
                `${RES}/assets/icon/people.png`,
                `${RES}/assets/icon/time.png`
              ],
              // 底部的按钮文字
              footerBtn: "查看详情",
              //卡片内容数组
              listData: [
                {
                  title: "核酸检测（混检）",
                  titleRight: "2020-01-01 13:30:00",
                  contents: [
                    {
                      label: "就诊人：",
                      value: "张三1111"
                    },
                    {
                      label: "检验时间：",
                      value: "2022-06-20"
                    }
                  ]
                },
                {
                  title: "核酸检测（混检）",
                  titleRight: "2020-01-01 13:30:00",
                  contents: [
                    {
                      label: "就诊人：",
                      value: "李四11111"
                    },
                    {
                      label: "检验时间：",
                      value: "2022-06-20"
                    }
                  ]
                }
              ]
            }
          }
        }
      }
    };
  }
};
