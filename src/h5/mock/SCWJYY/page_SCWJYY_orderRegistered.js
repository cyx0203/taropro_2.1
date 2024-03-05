import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_OrderRegistered = class {
  static data() {
    // setTimeout(() => {
    //   UpateCurrentPageData({
    //     paidData: {
    //       isEmpty: "Y",
    //       emptyTips: "未查询到信息11",
    //       //列表数组
    //       listData: [
    //         {
    //           // 卡片标题
    //           title: "科室:内一科门诊（常翠仙）--已退号1",
    //           // 卡片内容
    //           contents: [
    //             { label: "排队号：", value: "47号" },
    //             { label: "订单金额：", value: "4.00元" },
    //             { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
    //             { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
    //             {
    //               label: "<span style='color:red'>是否买病历本：</span>",
    //               value: "<span style='color:red'>已购买</span>"
    //             },
    //             { label: "订单金额：", value: "4.00元" }
    //           ]
    //         },
    //         {
    //           // 卡片标题
    //           title: "科室:内一科门诊（常翠仙）--已退号2",
    //           // 卡片内容
    //           contents: [
    //             { label: "排队号：", value: "47号" },
    //             { label: "订单金额：", value: "4.00元" },
    //             { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
    //             { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
    //             {
    //               label: "<span style='color:red'>是否买病历本：</span>",
    //               value: "<span style='color:red'>已购买</span>"
    //             },
    //             { label: "订单金额：", value: "4.00元" }
    //           ]
    //         }
    //       ],
    //       // (选填）最多显示2个按钮，注释则不显示按钮
    //       btns: [
    //         { id: "Query", btnName: "查看" }
    //         // { id: "Cancel", btnName: "取消" }
    //       ]
    //     },

    //     //未支付数据列表
    //     unpaidData: {
    //       isEmpty: "N",
    //       emptyTips: "未查询到信息11",
    //       //列表数组
    //       listData: [
    //         {
    //           title: "科室1:内一76543科门诊（常翠仙）",
    //           contents: [
    //             { label: "排队号：", value: "47号" },
    //             { label: "订单金额：", value: "4.00元" },
    //             { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
    //             { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
    //             {
    //               label: "<span style='color:red'>是否买病历本：</span>",
    //               value: "<span style='color:red'>已购买</span>"
    //             },
    //             { label: "订单金额：", value: "4.00元" }
    //           ]
    //         },
    //         {
    //           title: "科室2333:内一76543科门诊（常翠仙）",
    //           contents: [
    //             { label: "排队号1：", value: "47号" },
    //             { label: "订单金额1：", value: "4.00元" },
    //             { label: "预计就诊1时间：", value: "2022-04-22 16:40:00" },
    //             { label: "挂号缴费时1间：", value: "2022-04-22 16:40:00" },
    //             {
    //               label: "<span style='color:red'>是否买病历本：</span>",
    //               value: "<span style='color:red'>已购买</span>"
    //             },
    //             { label: "订单金额：", value: "4.00元" }
    //           ]
    //         }
    //       ],
    //       btns: [
    //         { id: "Cancel", btnName: "取消" },
    //         // { id: "continue", btnName: "继续支付" }
    //       ]
    //     }
    //   });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/orderRegistered/index",
        title: "挂号订单",
        wxcall: {
          // 卡片按钮点击事件
          onItemClick: (item, index, btnName) => {
            console.log(item, index, btnName);
          },
          //顶部 [患者] 块点击事件
          patientClick: () => {
            console.log("就诊人点击事件");
          },
          //[Tab标签] 切换点击的事件
          tabClick: (item, index) => {
            //数据获取
            console.log(item, index);

            //以下是测试切换模拟内容-------------------START
            //--> 更新已支付数据列表
            //   if (index === 0) {
            //     UpateCurrentPageData({
            //       paid: [
            //         {
            //           // 卡片1
            //           listData: [
            //             {
            //               // 卡片标题
            //               title: "科室:内一科门诊（常翠仙）--已退号99",
            //               // 卡片内容
            //               contents: [
            //                 { label: "排队号：", value: "47号" },
            //                 { label: "订单金额：", value: "4.00元" },
            //                 { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
            //                 { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
            //                 {
            //                   label: "<span style='color:red'>是否买病历本：</span>",
            //                   value: "<span style='color:red'>已购买</span>"
            //                 },
            //                 { label: "订单金额：", value: "4.00元" }
            //               ]
            //             }
            //           ]
            //         }
            //       ]
            //     });
            //   }
            //   //--> 更新未支付数据列表
            //   if (index === 1) {
            //     UpateCurrentPageData({
            //     unpaid: [
            //       {
            //         //列表数组
            //         listData: [
            //           {
            //             title: "科室:内一76543科门诊（常翠仙）01",
            //             contents: [
            //               { label: "排队号：", value: "47号" },
            //               { label: "订单金额：", value: "4.00元" },
            //               { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
            //               { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
            //               {
            //                 label: "<span style='color:red'>是否买病历本：</span>",
            //                 value: "<span style='color:red'>已购买</span>"
            //               },
            //               { label: "订单金额：", value: "4.00元" }
            //             ]
            //           }
            //         ],
            //         btns: [
            //           { id: "Cancel", btnName: "取消" },
            //           { id: "continue", btnName: "继续支付" }
            //         ]
            //       },
            //       {
            //         //列表数组
            //         listData: [
            //           {
            //             title: "科室:内一科5435门诊（常翠仙）02",
            //             contents: [
            //               { label: "排队号：", value: "47号" },
            //               { label: "订单金额：", value: "4.00元" },
            //               { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
            //               { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
            //               {
            //                 label: "<span style='color:red'>是否买病历本：</span>",
            //                 value: "<span style='color:red'>已购买</span>"
            //               },
            //               { label: "订单金额：", value: "4.00元" }
            //             ]
            //           }
            //         ],
            //         btns: [
            //           { id: "Cancel", btnName: "取消" },
            //           { id: "continue", btnName: "继续支付" }
            //         ]
            //       }
            //     ]});
            //   }
            //   //以上是测试切换模拟内容-------------------END
          }
        },
        data: {
          // 就诊人信息
          patient: {
            name: "张三",
            number: "76543566"
          },
          // tab列表
          tabList: [{ title: "已支付" }, { title: "未支付" }],
          // 已支付列表
          paidData: {
            isEmpty: "N",
            emptyTips: "未查询到信息",
            //列表数组
            listData: [
              {
                // 卡片标题
                title: "科室:内一科门诊（常翠仙）--已退号1",
                // 卡片内容
                contents: [
                  { label: "排队号：", value: "47号" },
                  { label: "订单金额：", value: "4.00元" },
                  { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
                  { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
                  {
                    label: "<span style='color:red'>是否买病历本：</span>",
                    value: "<span style='color:red'>已购买</span>"
                  },
                  { label: "订单金额：", value: "4.00元" }
                ],
                // (选填）最多显示2个按钮，注释则不显示按钮
                btns: [
                  { id: "Query", btnName: "查看" },
                  { id: "Cancel", btnName: "取消" }
                ]
              },
              {
                // 卡片标题
                title: "科室:内一科门诊（常翠仙）--已退号2",
                // 卡片内容
                contents: [
                  { label: "排队号：", value: "47号" },
                  { label: "订单金额：", value: "4.00元" },
                  { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
                  { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
                  {
                    label: "<span style='color:red'>是否买病历本：</span>",
                    value: "<span style='color:red'>已购买</span>"
                  },
                  { label: "订单金额：", value: "4.00元" }
                ],
                // (选填）最多显示2个按钮，注释则不显示按钮
                btns: [
                  { id: "Query", btnName: "查看" }
                  // { id: "Cancel", btnName: "取消" }
                ]
              }
            ]
          },

          //未支付数据列表
          unpaidData: {
            isEmpty: "N",
            emptyTips: "未查询到信息",
            //列表数组
            listData: [
              {
                title: "科室1:内一76543科门诊（常翠仙）",
                contents: [
                  { label: "排队号：", value: "47号" },
                  { label: "订单金额：", value: "4.00元" },
                  { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
                  { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
                  {
                    label: "<span style='color:red'>是否买病历本：</span>",
                    value: "<span style='color:red'>已购买</span>"
                  },
                  { label: "订单金额：", value: "4.00元" }
                ],
                // (选填）最多显示2个按钮，注释则不显示按钮
                btns: [
                  { id: "Query", btnName: "查看" }
                  // { id: "Cancel", btnName: "取消" }
                ]
              },
              {
                title: "科室2:内一76543科门诊（常翠仙）",
                contents: [
                  { label: "排队号：", value: "47号" },
                  { label: "订单金额：", value: "4.00元" },
                  { label: "预计就诊时间：", value: "2022-04-22 16:40:00" },
                  { label: "挂号缴费时间：", value: "2022-04-22 16:40:00" },
                  {
                    label: "<span style='color:red'>是否买病历本：</span>",
                    value: "<span style='color:red'>已购买</span>"
                  },
                  { label: "订单金额：", value: "4.00元" }
                ],
                btns: [
                  { id: "Cancel", btnName: "取消" },
                  { id: "continue", btnName: "继续支付" }
                ]
              }
            ]
          }
        }
      }
    };
  }
};
