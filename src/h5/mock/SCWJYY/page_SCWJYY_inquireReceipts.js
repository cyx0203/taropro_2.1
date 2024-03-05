import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_InquireReceipts = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        btnList: {
          // 是否被选中
          arrow: true,
          // 按钮列表
          listData: [
            { 
              // 按钮ICON
              icon: `${RES}/assets/icon/order_menu_1.svg`, 
              // 按钮文字
              label: "门诊挂号订单" },
            { icon: `${RES}/assets/icon/order_menu_2.svg`,  label: "门诊缴费清单1221" },
            { icon: `${RES}/assets/icon/order_menu_3.svg`,  label: "住院费用清单1221" },
            { icon: `${RES}/assets/icon/order_menu_4.svg`,  label: "住院充值清单2112" },
          ]
        }
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/inquireReceipts/index",
        title: "单据查询",
        wxcall: {
          // 按钮列表点击事件
          onDeptClick: (item, index) => {
            console.log("##onClick##");
            console.log(item, index);
          }
        },
        data: {
          btnList: {
            // 是否被选中
            arrow: true,
            // 按钮列表
            listData: [
              { 
                // 按钮ICON
                icon: `${RES}/assets/icon/order_menu_1.svg`, 
                // 按钮文字
                label: "门诊挂号订单" },
              { icon: `${RES}/assets/icon/order_menu_2.svg`,  label: "门诊缴费清单" },
              { icon: `${RES}/assets/icon/order_menu_3.svg`,  label: "住院费用清单" },
              { icon: `${RES}/assets/icon/order_menu_4.svg`,  label: "住院充值清单" },
            ]
          }
        }
      }
    };
  }
};
