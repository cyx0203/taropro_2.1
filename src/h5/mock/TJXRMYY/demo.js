import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({});
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/demo/index",
        title: "测试",
        wxcall: {
          // 切换就诊人
          changePatient: () => {
            console.log("切换就诊人");
          },
          // 用户卡片点击
          userCardClick:() => {
            console.log('用户卡片点击事件');
          },
          // 头部导航
          onTabClick: (item, index) => {
            console.log("导航栏");
            console.log(item, index);
          },
          // 时间选择器
          onDateClick: (type,item) => {
            console.log('时间选择');
            console.log(type)
            console.log(item);
          },
          // 查看详情
          onCheckDetail: (item, index) => {
            console.log('查看详情');
            console.log(item, index);
          },
          // 继续支付
          onPayClick:(item,index) => {
            console.log('继续支付');
            console.log(item,index);
          },
          // 退号
          onCancelClick:(item,index) => {
            console.log('退号');
            console.log(item,index);
          },
        },
        data: {
          // 注释则不显示
          // warmTips: "检验报告默认查询30天的记录",
          // 就诊人卡片
          userCard: {
            user: {
              icon: `${RES}/assets/img/patient.png`,
              name: "蒋**",
              card: "就诊卡号：40004040***3039",
              // 右上角的切换按钮
              extra: {
                icon: `${RES}/assets/icon/change1.png`,
                text: "切换就诊人"
              }
            },
          },
          //  注释tabList则导航头部不显示
          tabList: [{ title: "检验" }, { title: "检查" }],
          // 时间选择器
          dateSelector: {
            startDate: "2022-04-26",
            // endDate: "2022-05-26"
          },
          // 报告列表1
          examineArea: {
            // 是否为空
            isEmpty: "N",
            // 为空的提示语
            emptyTips: "暂无报告查询1",
            // 为空的ICON
            emptyIcon: `${RES}/assets/icon/report3.png`,
            // 卡片内容
            content: {
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
                      value: "张三"
                    },
                    {
                      label: "检验时间：",
                      value: "2020-01-01 13:30:00"
                    }
                  ],
                  // (选填）最多显示2个按钮，注释则不显示按钮
                  btns: [
                    { id: "pay", btnName: "继续支付" },
                    { id: "Cancel", btnName: "退号" }
                  ]
                },
                {
                  title: "核酸检测（混检）",
                  titleRight: "2020-01-01 13:30:00",
                  contents: [
                    {
                      label: "就诊人：",
                      value: "李四"
                    },
                    {
                      label: "检验时间：",
                      value: "2020-01-01 13:30:00 00 00"
                    }
                  ],
                  // (选填）最多显示2个按钮，注释则不显示按钮
                  // btns: [
                    // { id: "pay", btnName: "继续支付" },
                    // { id: "Cancel", btnName: "退号" }
                  // ]
                }
              ]
            }
          },
          // 报告列表2,注释则不显示
          checkoutArea: {
            // 是否为空
            isEmpty: "N",
            // 为空的提示语
            emptyTips: "暂无报告查询",
            // 为空的ICON
            emptyIcon: `${RES}/assets/icon/report3.png`,
            // 卡片内容
            content: {
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
                      value: "张三"
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
                      value: "李四"
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
          // 详情页
          detailsArea: {
            isEmpty: "N",
            emptyTips: "暂未查询到详情信息",
            floatData: {
              head: [
                {
                  title: "序号1",
                  ratio: 0.3,
                  align: "center"
                },
                {
                  title: "名称",
                  ratio: 0.4,
                  align: "center"
                },
                {
                  title: "单价",
                  ratio: 0.3,
                  align: "center"
                }
              ],
              body: [
                // label名如res可自定义
                { testItem: "123", res: "1.00", unit: "3" }
              ]
            }
          }
        }
      }
    };
  }
};
