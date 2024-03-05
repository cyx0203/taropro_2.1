import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/orderList/index",
        title: "订单信息列表",
        wxcall: {
          tabClick: (item, index) => {
            console.log(item, index);
          },
          orderClick: (item, index) => {
            console.log(item, index);
          },
          serverOnClick: (item, index) => {
            console.log(item, index);
          },

          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          }
        },
        data: {
          patientinfor: {
            //患者头像
            pic: `${RES}/assets/img/user.svg`,
            //患者姓名
            name: "张三",
            //第一行额外数据
            extra1: "男",
            //第二行额外数据
            extra2: "卡号：32030303030303"
          },
          tabList: [
            { title: "全部" },
            { title: "未支付" },
            { title: "进行中" },
            { title: "已结束" }
          ],
          orderData: {
            isEmpty: "N",
            dataList: [
              {
                // ordernumber: "000000218687",
                // status: "已回复",
                doctorinfor: {
                  image: `${RES}/assets/img/user.svg`,
                  name: "胡峒陶",
                  department: "内分泌科",
                  identity: "主任医师"
                },
                inquiry: [
                  { label: "问诊金额", value: "3.00元" },
                  { label: "诊断", value: "病毒性感冒" },
                  { label: "问诊人", value: "陈涛" }
                ],
                server: [
                  {
                    text: "就诊评价"
                  },
                  {
                    text: "我要复诊"
                  },
                  {
                    text: "查看用药"
                  },
                  {
                    text: "查看物流"
                  }
                ],
                inquiryinfor: {
                  type: "图文",
                  time: "2021-08-01",
                  countdown: 10
                }
              },
              {
                ordernumber: "000000218687",
                status: "已回复",
                doctorinfor: {
                  image: `${RES}/assets/img/user.svg`,
                  name: "胡峒陶",
                  department: "内分泌科",
                  identity: "主任医师"
                },
                inquiry: [
                  { label: "问诊金额", value: "3.00元" },
                  { label: "诊断", value: "病毒性感冒" },
                  { label: "问诊人", value: "陈涛" }
                ],
                server: [
                  // {
                  //   text:'就诊评价'
                  // },
                  // {
                  //   text:'我要复诊'
                  // },
                  // {
                  //   text: "查看用药",
                  // },
                  // {
                  //   text: "查看物流",
                  // },
                ],
                inquiryinfor: {
                  // type: "图文",
                  // time: "2021-08-01",
                  // countdown: 10,
                }
              },
              {
                ordernumber: "000000218687",
                status: "已回复",
                doctorinfor: {
                  image: `${RES}/assets/img/doctor.svg`,
                  name: "胡峒陶",
                  department: "内分泌科",
                  identity: "主任医师"
                },
                inquiry: [
                  { label: "问诊金额", value: "3.00元" },
                  { label: "诊断", value: "病毒性感冒" },
                  { label: "问诊人", value: "陈涛" }
                ],
                server: [
                  // {
                  //   text:'就诊评价'
                  // },
                  // {
                  //   text:'我要复诊'
                  // },
                  {
                    text: "查看用药"
                  },
                  {
                    text: "查看物流"
                  }
                ],
                inquiryinfor: {
                  type: "图文",
                  time: "2021-08-01",
                  countdown: 10
                }
              },
              {
                ordernumber: "000000218687",
                status: "已回复",
                doctorinfor: {
                  image: `${RES}/assets/img/doctor.svg`,
                  name: "胡峒陶",
                  department: "内分泌科",
                  identity: "主任医师"
                },
                inquiry: [
                  { label: "问诊金额", value: "3.00元" },
                  { label: "诊断", value: "病毒性感冒" },
                  { label: "问诊人", value: "陈涛" }
                ],
                server: [
                  // {
                  //   text:'就诊评价'
                  // },
                  // {
                  //   text:'我要复诊'
                  // },
                  {
                    text: "查看用药"
                  },
                  {
                    text: "查看物流"
                  }
                ],

                // bottomInfor: [
                //   { label: "问诊类型", value: "图文" },
                //   { label: "问诊时间", value: "2021-08-01" },
                //   { label: "剩余时间", value: "10" }
                // ],
                inquiryinfor: {
                  type: "图文",
                  time: "2021-08-01",
                  countdown: 10
                }
              }
            ]
          },
          // 底部导航按钮数据
          navData: [
            {
              normal_img_url: `${RES}/assets/icon/nav_1_1.svg`,
              active_img_url: `${RES}/assets/icon/nav_1_2.svg`,
              text: "首页",
              active: true
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_2_1.svg`,
              active_img_url: `${RES}/assets/icon/nav_2_2.svg`,
              text: "问诊订单"
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_3_1.svg`,
              active_img_url: `${RES}/assets/icon/nav_3_2.svg`,
              text: "消息"
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_4_1.svg`,
              active_img_url: `${RES}/assets/icon/nav_4_2.svg`,
              text: "个人中心"
            }
          ]
        }
      }
    };
  }
};
