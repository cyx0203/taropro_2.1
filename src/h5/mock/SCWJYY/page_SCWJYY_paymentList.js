import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import { AtTabs, AtTabsPane } from "taro-ui";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_PaymentList = class {
  static data() {
    
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/paymentList/index",
        title: "缴费列表",
        wxcall: {
          // 头部tab
          tabClick: (item, index) => {
            console.log(item, index);
          },
          // 详情
          detailClick: (item, index) => {
            console.log("详情");
            console.log(item, index);
          },
          // 去缴费
          paymentOnClick: data => {
            console.log("去缴费");
            console.log(data);
          },
          // 全选
          allInClick: (value, flag) => {
            console.log(value, flag);
          }
        },
        data: {
          // 底部去缴费按钮文字
          payBtnText: "去缴费",
          // 头部tab列表
          tabList: [{ title: "未缴费" }, { title: "已缴费" }],
          // 已缴费列表
          paidsArea: {
            isEmpty: "N",
            emptyTips: "暂未查询到已缴费信息",
            paidList: [
              {
                id: 1,
                // 卡片标题
                title: "挂号交费",
                // 缴费日期
                date: "2022-04-26",
                // 卡片信息
                info: [
                  { label: "医生", value: "专家门诊张三" },
                  { label: "科室", value: "消化内科" },
                  { label: "时间", value: "13:00-14:00" },
                  { label: "就诊卡号", value: "151215122" }
                ],
                // 右侧支付状态ICON
                img: `${RES}/assets/icon/paid.png`
              },
              {
                id: 2,
                title: "挂号交费",
                date: "2022-04-26",
                info: [
                  { label: "医生", value: "专家门诊张三" },
                  { label: "科室", value: "消化内科" },
                  { label: "时间", value: "13:00-14:00" },
                  { label: "就诊卡号", value: "151215122" }
                ],
                img: `${RES}/assets/icon/paid.png`
              },
              {
                id: 3,
                title: "挂号交费",
                date: "2022-04-26",
                info: [
                  { label: "医生", value: "专家门诊张三" },
                  { label: "科室", value: "消化内科" },
                  { label: "时间", value: "13:00-14:00" },
                  { label: "就诊卡号", value: "151215122" }
                ],
                img: `${RES}/assets/icon/paid.png`
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
                title: "挂号交费1",
                // 订单日期
                date: "2022-04-26",
                // 缴费金额
                arrearage: "35.10",
                // 卡片信息
                info: [
                  { label: "医生", value: "专家门诊张三" },
                  { label: "科室", value: "消化内科" },
                  { label: "时间", value: "13:00-14:00" },
                  { label: "就诊卡号", value: "151215122" }
                ],
                // 是否被选中
                checked: false,
                img: `${RES}/assets/icon/unpaid.png`
              },
              {
                id: 2,
                title: "挂号交费2",
                date: "2022-04-26",
                arrearage: "35.03",
                info: [
                  { label: "医生", value: "专家门诊张三" },
                  { label: "科室", value: "消化内科" },
                  { label: "时间", value: "13:00-14:00" },
                  { label: "就诊卡号", value: "151215122" }
                ],
                checked: false,
                img: `${RES}/assets/icon/unpaid.png`
              },
              {
                id: 3,
                title: "挂号交费3",
                date: "2022-04-26",
                arrearage: "35.00",
                info: [
                  { label: "医生", value: "专家门诊张三" },
                  { label: "科室", value: "消化内科" },
                  { label: "时间", value: "13:00-14:00" },
                  { label: "就诊卡号", value: "151215122" }
                ],
                checked: false,
                img: `${RES}/assets/icon/unpaid.png`
              }
            ]
          },
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
