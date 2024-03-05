import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/THYYYDC/selectType/index",
        title: "选择类型",
        wxcall: {
          // 轮播图点击事件
          bannerClick: (item, index) => {
            console.log("轮播图点击事件");
            console.log(item, index);
          },
          // 点餐按钮点击事件
          orderClick: (item, index) => {
            console.log(item, index);
          },
          // 日期选择事件
          dateSelectClick: (item, index) => {
            console.log(item, index);
          },
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          },
          // 切换 侧边按钮点击事件无参数，列表点击事件有入参item index
          changeClick: (item, index) => {
            console.log("切换");
            console.log(item, index);
          }
        },
        data: {
          // 自定义侧边按钮文案
          floatTxt: "切换超市",
          // 切换列表
          changeList: [
            {
              name: "医院内部食堂",
              infoList: [
                {
                  icon: `${RES}/assets/icon/icon_05.svg`,
                  txt: "这是一家医院内部的食堂门店可以点餐"
                },
                {
                  icon: `${RES}/assets/icon/icon_03.svg`,
                  txt: "06:00-23:59,16:00-18:00"
                }
              ]
            },
            {
              name: "小卖部",
              infoList: [
                {
                  icon: `${RES}/assets/icon/icon_05.svg`,
                  txt: "这是一家小卖部小卖部小卖部小卖部"
                },
                {
                  icon: `${RES}/assets/icon/icon_03.svg`,
                  txt: "06:00-23:59,16:00-18:00"
                }
              ]
            },
            {
              name: "超市",
              infoList: [
                {
                  icon: `${RES}/assets/icon/icon_05.svg`,
                  txt: "这是一家超市超市超市超市超市"
                },
                {
                  icon: `${RES}/assets/icon/icon_03.svg`,
                  txt: "06:00-23:59,16:00-18:00"
                }
              ]
            }
          ],
          // 轮播图列表
          bannerUrlList: [
            // { title: "01", img: `${RES}/assets/ad/banner_01.jpg` },
            // { title: "02", img: `${RES}/assets/ad/banner_02.jpg` },
            { title: "03", img: `${RES}/assets/ad/banner_03.jpg` }
          ],
          // 日期列表
          dateList: [
            {
              week: "今日点餐",
              day: "9",
              active: true
            },
            {
              week: "周二",
              day: "10",
              active: false
            },
            {
              week: "周二",
              day: "10",
              active: false
            },
            {
              week: "周二",
              day: "10",
              active: false
            },
            {
              week: "周二",
              day: "10",
              active: false
            },
            {
              week: "周二",
              day: "10",
              active: false
            }
          ],
          // 订单类别列表
          typeList: [
            {
              title: "明日早餐",
              subTitle: "点餐08:00-15:00 &nbsp&nbsp&nbsp 送餐07:00-08:30",
              btn: "点餐",
              // 是否不可点击
              btnDisable: true
            },
            {
              title: "明日午餐",
              subTitle: "点餐08:00-15:00 &nbsp&nbsp&nbsp 送餐07:00-08:30",
              btn: "点餐",
              // 是否不可点击
              btnDisable: false
            }
            // {
            //   title:'明日晚餐',
            //   subTitle:'点餐08:00-15:00 &nbsp&nbsp&nbsp 送餐07:00-08:30',
            //   btn:'点餐',
            //   // 是否不可点击
            //   btnDisable:false,
            // },
          ],
          diningHallInfo: {
            title: "食堂信息",
            infoList: [
              {
                icon: `${RES}/assets/icon/icon_01.svg`,
                txt: "武汉太和医院堂"
              },
              {
                icon: `${RES}/assets/icon/icon_02.svg`,
                txt: "123456789"
              },
              {
                icon: `${RES}/assets/icon/icon_03.svg`,
                txt: "06:00-23:59"
              },
              {
                icon: `${RES}/assets/icon/icon_04.svg`,
                txt: "提前一天预定"
              }
            ]
          },
          // 底部导航按钮数据
          navData: [
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
