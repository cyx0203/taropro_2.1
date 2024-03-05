import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/THYYYDC/orderForm/index",
        title: "订单查看页",
        wxcall: {
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          },
          //  标签区域按钮
          tabClick: (item, index) => {
            console.log(item, index);
          },
          footerBtnClick:(item,index) => {
            console.log("==footerBtnClick==");
            console.log(item,index)
          },
          cardClick:(item,index) => {
            console.log("==cardClick==");
            console.log(item,index);
          }
        },
        data: {
          // 空提示内容
          resultData: {
            icon: "@empty",
            title: "暂无信息"
          },
          // 头部tab列表
          tabList: [
            { title: "全部订单" },
            { title: "已确认" },
            { title: "已取消" }
          ],
          // 订单信息列表数据
          orderListData: {
            // 是否为空
            isEmpty: "N",
            dataList: [
              {
                // 卡片头部左部分文字
                headerLeft: "订餐时间：2022-09-07 07:05",
                // 卡片头部右部分文字
                headerRight: "已完成",
                // 卡片图片信息，选配
                pic: `${RES}/assets/img/fanqie.jpg`,
                // 订单详细信息列表
                infoList: [
                  {
                    label: "送餐时间：",
                    value: "2021-09-07 07:05"
                  },
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "12356578476389765478"
                  }
                ],
                // 卡片底部按钮文字  注释则不显示按钮
                // footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
              {
                headerLeft: "订餐时间：2022-09-07 07:05",
                headerRight: "已取消",
                pic: `${RES}/assets/img/fanqie.jpg`,
                infoList: [
                  {
                    label: "订单金额：",
                    value: "￥12.8"
                  },
                  {
                    label: "订单号：",
                    value: "23434543534455"
                  }
                ],
                footerBtn: "再来一单"
              },
            ]
          },
          // 订单详细信息弹窗内容
          floatData:{
            header:{
              title:'订餐时间：2022-09-07 07:05',
            },
            content:{
              dataList:[
                {
                  title:'糖醋排骨',
                  subtitle:'×1',
                  pic:`${RES}/assets/img/paigu.jpg`,
                  extra:'￥15.00',
                },
                {
                  title:'土豆丝',
                  subtitle:'×1',
                  pic:`${RES}/assets/img/tudousi.jpg`,
                  extra:'￥15.00',
                },
                {
                  title:'小米粥',
                  subtitle:'×1',
                  pic:`${RES}/assets/img/xiaomizhou.jpg`,
                  extra:'￥15.00',
                },
                {
                  title:'青菜',
                  subtitle:'×1',
                  pic:`${RES}/assets/img/qingcai.jpg`,
                  extra:'￥15.00',
                },
              ],
              extraInfo:'实付款：￥15.00',
            },
            footer:{
              dataList:[
                {
                  label:'收货信息',
                  value:'C座急诊诊区 <br/>房间号007 张三 19234568907'
                },
                {
                  label:'订单号',
                  value:'12356578476389765478',
                }
              ]
            }
          },
          // 底部导航按钮数据
          navData: [
            {
              normal_img_url: `${RES}/assets/icon/nav_1_2.svg`,
              active_img_url: `${RES}/assets/icon/nav_1_1.svg`,
              text: "点餐"
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_2_2.svg`,
              active_img_url: `${RES}/assets/icon/nav_2_1.svg`,
              text: "订单",
              active: true
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_3_2.svg`,
              active_img_url: `${RES}/assets/icon/nav_3_1.svg`,
              text: "我的"
            }
          ]
        }
      }
    };
  }
};
