import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    // setTimeout(() => {
    //   UpateCurrentPageData({
    //     // dateSelector: {
    //     //   isShow:false,
    //     //   // 筛选开始时间
    //     //   startDate: "2022-04-26",
    //     //   // 筛选结束时间
    //     //   endDate: "2022-05-26"
    //     // },
    //   });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/paymentList/index",
        title: "缴费列表IH",
        wxcall: {
          // 时间选择器
          onDateClick: (type, item) => {
            console.log("时间选择");
            console.log(type);
            console.log(item);
          },
          // 头部tab
          tabClick: (item, index) => {
            console.log(item, index);
          },
          // 详情
          detailClick: (item, func_index) => {
            console.log("详情");
            console.log(item, func_index);
          },
          // 去缴费
          paymentOnClick: (data, total) => {
            console.log("去支付");
            console.log(data);
            console.log("总计:", total);
          },
          // 全选
          allInClick: (value, flag) => {
            console.log(value, flag);
          }
        },
        data: {
          isDisabled: true,
          // 是否存在弹窗 默认为存在 'Y'
          // floatIsShow:'Y',
          isRadio:true,//是否为单选
          footerArea: true, //-false 不显示  true 显示
          currentTabIndex: 0,
          // 时间选择器 注释则不显示
          dateSelector: {
            isShow: true,
            // 筛选开始时间
            startDate: "2022-04-26",
            // 筛选结束时间
            endDate: "2022-05-26"
          },
          // 底部去缴费按钮文字
          payBtnText: "去支付",
          // 头部tab列表
          tabList: [
            { title: "未缴费记录", type: "unpaid" },
            { title: "已缴费记录", type: "paid" }
            // { title: "第三栏" }
          ],
          // tabList: [{ title: "已缴费记录" }],
          // tabList: [{ title: "未缴费记录" }],
          // 第三栏列表
          // NATArea: {
          //   isEmpty: "N",
          //   emptyTips: "暂未查询到已缴费信息",
          //   paidList: [
          //     {
          //       id: 1,
          //       // 卡片标题
          //       title: "新型冠状病毒核酸检测预约",
          //       // 卡片信息
          //       info: [
          //         {
          //           label: "执行科室",
          //           value: "执行科室字字执行科室字字执行科室字字"
          //         },
          //         { label: "开单医生", value: "张三" },
          //         { label: "流水号", value: "151215122" },
          //         { label: "时间", value: "2022-04-05" }
          //       ],
          //       money: "25.00",
          //       img: `${RES}/assets/icon/paid.png`,
          //       status: "已缴费"
          //     },
          //     {
          //       id: 2,
          //       // 卡片标题
          //       title: "新型冠状病毒核酸检测预约",
          //       // 卡片信息
          //       info: [
          //         { label: "执行科室", value: "检验科" },
          //         { label: "开单医生", value: "张三" },
          //         { label: "流水号", value: "151215122" },
          //         { label: "时间", value: "2022-04-05" }
          //       ],
          //       money: "25.00",
          //       img: `${RES}/assets/icon/paid.png`,
          //       status: "已缴费"
          //     },
          //     {
          //       id: 3,
          //       // 卡片标题
          //       title: "新型冠状病毒核酸检测预约",
          //       // 卡片信息
          //       info: [
          //         { label: "执行科室", value: "检验科" },
          //         { label: "开单医生", value: "张三" },
          //         { label: "流水号", value: "151215122" },
          //         { label: "时间", value: "2022-04-05" }
          //       ],
          //       money: "25.00",
          //       img: `${RES}/assets/icon/paid.png`,
          //       status: "已缴费"
          //     }
          //   ]
          // },
          // 已缴费列表
          paidsArea: {
            isEmpty: "N",
            emptyTips: "暂未查询到已缴费信息",
            paidList: [
              {
                id: 1,
                // 卡片标题
                title: "新型冠状病毒核酸检测预约",
                // 卡片信息
                info: [
                  {
                    label: "执行科室",
                    value: "执行科室字字执行科室字字执行科室字字"
                  },
                  { label: "开单医生", value: "张三" },
                  { label: "流水号", value: "151215122" },
                  { label: "时间", value: "2022-04-05" }
                ],
                money: "￥25.00",
                // btns: [{ txt: "btn1" }, { txt: "btn2" }],
                btns:[],
                img: `${RES}/assets/icon/paid.png`,
                status: "已缴费"
              },
              {
                id: 2,
                // 卡片标题
                title: "新型冠状病毒核酸检测预约",
                // 卡片信息
                info: [
                  { label: "执行科室", value: "检验科" },
                  { label: "开单医生", value: "张三" },
                  { label: "流水号", value: "151215122" },
                  { label: "时间", value: "2022-04-05" }
                ],
                money: "￥25.00",
                img: `${RES}/assets/icon/paid.png`,
                status: "已缴费"
              },
              {
                id: 3,
                // 卡片标题
                title: "新型冠状病毒核酸检测预约",
                // 卡片信息
                info: [
                  { label: "执行科室", value: "检验科" },
                  { label: "开单医生", value: "张三" },
                  { label: "流水号", value: "151215122" },
                  { label: "时间", value: "2022-04-05" }
                ],
                money: "￥25.00",
                img: `${RES}/assets/icon/paid.png`,
                status: "已缴费"
              }
            ]
          },
          // 未缴费列表
          unpaidsArea: {
            isEmpty: "N",
            emptyTips: "暂未查询到未缴费信息",
            unpaidList: [
              {
                id: 1,
                // 卡片标题
                title: "新型冠状病毒核酸检测预约",
                // 卡片信息
                info: [
                  { label: "执行科室", value: "检验科" },
                  { label: "开单医生", value: "张三" },
                  { label: "流水号", value: "151215122" },
                  { label: "时间", value: "2022-04-05" }
                ],
                img: `${RES}/assets/icon/unpaid.png`,
                btns: [{ txt: "btn1" }, { txt: "btn2" }],

                checked: true,
                // 缴费金额
                arrearage: "0.385"
              },
              {
                id: 2,
                // 卡片标题
                title: "新型冠状病毒核酸检测预约",
                // 卡片信息
                info: [
                  { label: "执行科室", value: "检验科" },
                  { label: "开单医生", value: "张三" },
                  { label: "流水号", value: "151215122" },
                  { label: "时间", value: "2022-04-05" }
                ],
                img: `${RES}/assets/icon/unpaid.png`,
                // btns:[{txt:'有四个字'}],

                // 缴费金额
                arrearage: "0.25",
                checked: true
              },
              {
                id: 3,
                // 卡片标题
                title: "新型冠状病毒核酸检测预约",
                // 卡片信息
                info: [
                  { label: "执行科室", value: "检验科" },
                  { label: "开单医生", value: "张三" },
                  { label: "流水号", value: "151215122" },
                  { label: "时间", value: "2022-04-05" }
                ],
                btns: [],
                // 缴费金额
                img: `${RES}/assets/icon/unpaid.png`,
                arrearage: "1.12",
                checked: true
              },
              // {
              //   id: 4,
              //   // 卡片标题
              //   title: "新型冠状病毒核酸检测预约",
              //   // 卡片信息
              //   info: [
              //     { label: "执行科室", value: "检验科" },
              //     { label: "开单医生", value: "张三" },
              //     { label: "流水号", value: "151215122" },
              //     { label: "时间", value: "2022-04-05" }
              //   ],
              //   btns: [],
              //   // 缴费金额
              //   img: `${RES}/assets/icon/unpaid.png`,
              //   arrearage: "1.12",
              //   checked: true
              // },
              // {
              //   id: 5,
              //   // 卡片标题
              //   title: "新型冠状病毒核酸检测预约",
              //   // 卡片信息
              //   info: [
              //     { label: "执行科室", value: "检验科" },
              //     { label: "开单医生", value: "张三" },
              //     { label: "流水号", value: "151215122" },
              //     { label: "时间", value: "2022-04-05" }
              //   ],
              //   btns: [],
              //   // 缴费金额
              //   img: `${RES}/assets/icon/unpaid.png`,
              //   arrearage: "35.10",
              //   checked: true
              // }
            ]
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
                { testItem: "123", res: "1.00", unit: "3" },
                { testItem: "123", res: "1.00", unit: "3" },
                { testItem: "123", res: "1.00", unit: "3" },
                { testItem: "123", res: "1.00", unit: "3" },
                { testItem: "123", res: "1.00", unit: "3" },
                { testItem: "123", res: "1.00", unit: "3" },
              ]
            }
          }
        }
      }
    };
  }
};
