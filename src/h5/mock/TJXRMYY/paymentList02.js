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
        mod: "h5/pages/TJXRMYY/paymentList02/index",
        title: "缴费列表",
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
            if (index === 1) {
              UpateCurrentPageData({
                dataList:[
                  {
                    // 卡片标题
                    title: "未缴费列表标题1",
                    // 卡片信息
                    info: [
                      { label: "执行科室", value: "检验科" },
                      { label: "开单医生", value: "张三" },
                      { label: "流水号", value: "151215122" },
                      { label: "时间", value: "2022-04-05" }
                    ],
                    // 缴费状态图标
                    img: `${RES}/assets/icon/unpaid.png`,
                    // 缴费金额
                    arrearage: "35.10",
                    checked:false
                  },
                  {
                    title: "未缴费列表标题1",
                    info: [
                      { label: "执行科室", value: "检验科" },
                      { label: "开单医生", value: "张三" },
                      { label: "流水号", value: "151215122" },
                      { label: "时间", value: "2022-04-05" }
                    ],
                    img: `${RES}/assets/icon/unpaid.png`,
                    arrearage: "35.10",
                    checked:false
                  },
                ]
              });
            }
            if (index === 0) {
              UpateCurrentPageData({
                dataList:[
                  {
                    // 数据类型
                    type: "paid", // paid-已缴费  unpaid-未缴费
                    // 卡片标题
                    title: "已缴费列表标题1",
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
                    // 已缴费金额
                    money: "￥25.00",
                    // 右边的图标
                    img: `${RES}/assets/icon/paid.png`
                  },
                  {
                    type: "paid",
                    title: "已缴费列表标题2",
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
                    img: `${RES}/assets/icon/paid.png`
                  }
                ]
              });
            }
          },
          // 详情
          detailClick: (item, index) => {
            console.log("详情");
            console.log(item, index);
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
          tabList: [{ title: "已缴费记录" }, { title: "未缴费记录" }],

          // 数据列表
          dataList: [
            {
              // 数据类型
              type: "paid", // paid-已缴费  unpaid-未缴费
              // 卡片标题
              title: "已缴费列表标题1",
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
              // 已缴费金额
              money: "￥25.00",
              // 右边的图标
              img: `${RES}/assets/icon/paid.png`
            },
            {
              type: "paid",
              title: "已缴费列表标题2",
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
              img: `${RES}/assets/icon/paid.png`
            }
          ],
          // 已缴费列表
          paidList: [
            {
              id: 1,
              // 卡片标题
              title: "已缴费列表标题1",
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
              img: `${RES}/assets/icon/paid.png`,
              status: "已缴费"
            },
            {
              id: 2,
              // 卡片标题
              title: "已缴费列表标题2",
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
              title: "已缴费列表标题3",
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
          ],
          // 未缴费列表
          unpaidList: [
            {
              id: 1,
              // 卡片标题
              title: "未缴费列表标题1",
              // 卡片信息
              info: [
                { label: "执行科室", value: "检验科" },
                { label: "开单医生", value: "张三" },
                { label: "流水号", value: "151215122" },
                { label: "时间", value: "2022-04-05" }
              ],
              // 缴费状态图标
              img: `${RES}/assets/icon/unpaid.png`,
              // 缴费金额
              arrearage: "35.10"
            },
            {
              id: 2,
              title: "未缴费列表标题2",
              info: [
                { label: "执行科室", value: "检验科" },
                { label: "开单医生", value: "张三" },
                { label: "流水号", value: "151215122" },
                { label: "时间", value: "2022-04-05" }
              ],
              img: `${RES}/assets/icon/unpaid.png`,
              arrearage: "35.10"
            },
            {
              id: 3,
              title: "未缴费列表标题3",
              info: [
                { label: "执行科室", value: "检验科" },
                { label: "开单医生", value: "张三" },
                { label: "流水号", value: "151215122" },
                { label: "时间", value: "2022-04-05" }
              ],
              img: `${RES}/assets/icon/unpaid.png`,
              arrearage: "35.10"
            }
          ],
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
