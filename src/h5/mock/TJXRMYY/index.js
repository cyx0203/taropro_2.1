import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    setTimeout(() => {
      // UpateCurrentPageData({
      //   // 首次进入首页提示文字
      //   tipsData:{
      //     // true-进入首页显示提示框，false-进入首页不显示提示框
      //     tipsOpen:false,
      //     content:{
      //       title:'特别提醒',
      //       // 提示正文内容，每个数组元素占一行
      //       listData:[
      //         '外地来通返通人员健康管理措施一切以通江县防疫政策为准。通江县疾控咨询电话：0827-7540120',
      //         '“健康码为黄码或无码”患者及陪护需提供24小时小时内的新冠核酸阴性结果方可就诊（急重症患者除外）。'
      //       ]
      //     },
      //     btnText:'确认',
      //   },
      // });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/index/index",
        title: "首页",
        wxcall: {
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
            
          },
          // [菜单] 按钮
          mainOnClick_large: (item, index) => {
            console.log("##mainOnClick_large##");
            console.log(item);
            console.log(index);
          },
          mainOnClick_small: (item, index) => {
            console.log("##mainOnClick_small##");
            console.log(item);
            console.log(index);
          },
          //  标签区域按钮
          menuOnClick: (item, index) => {
            console.log("##menuOnClick##");
            console.log(item);
            console.log(index);
          },
          //   导航按钮
          tabOnClick: (item, index) => {
            console.log("##tabOnClick##");
            console.log(item);
            console.log(index);
          },
          // 就诊人卡片点击事件
          userCardClick: (item, index) => {
            console.log(item, index);
          },
          // 就诊人卡片二维码点击事件
          userQRCodeClick: item => {
            console.log("二维码点击事件");
            console.log(item);
          },
          // 轮播图点击事件
          bannerClick: (item, index) => {
            console.log("轮播图点击事件");
            console.log(item, index);
          }
        },
        data: {
          // 首次进入首页提示文字
          tipsData:{
            // true-进入首页显示提示框，false-进入首页不显示提示框
            tipsOpen:true,
            content:{
              title:'特别提醒',
              // 提示正文内容，每个数组元素占一行
              listData:[
                '外地来通返通人员健康管理措施一切以通江县防疫政策为准。通江县疾控咨询电话：0827-7540120',
                '“健康码为黄码或无码”患者及陪护需提供24小时小时内的新冠核酸阴性结果方可就诊（急重症患者除外）。'
              ]
            },
            btnText:'确认',
          },
          // 顶部广告图片
          adImg: `${RES}/assets/ad/ad01.png`,
          userCard: {
            //   是否添加就诊人
            isEmpty: "N",
            // 未添加就诊人
            empty: {
              icon: `${RES}/assets/img/addpatient.png`,
              msg: "请先添加就诊人信息"
            },
            // 就诊人信息
            user: {
              icon: `${RES}/assets/img/patient.png`,
              name: "蒋**11",
              card: "就诊卡号：40004040***3039",
              qricon: `${RES}/assets/icon/qrcode1.png`
            }
          },
          // 就诊人卡片二维码区域点击弹出信息
          pop: {
            // 是否让弹框弹出
            isShow: true,
            title:'这是标题',
            //二维码的内容
            qrcode: "knojah10912093198290124h9fssknfjjfbaska...",
            // 条码的内容
            barcode: "knojah10912093198290124h9fssknfjjfbaska...",
            // 其他信息
            infoList: [
              {
                label: "姓名",
                value: "蒋**"
              },
              {
                label: "卡号",
                value: "40004040***3039"
              }
            ]
          },
          // 大按钮菜单
          mainMenu: [
            {
              // 按钮主名称
              title: "预约挂号",
              // 按钮次名称
              subtitle: "轻松预约，不再排队",
              // ICON
              icon: `${RES}/assets/icon/main-menu-02.png`
            },
            {
              title: "门诊缴费",
              subtitle: "轻松预约，不再排队",
              icon: `${RES}/assets/icon/main-menu-01.png`
            }
          ],
          // 小按钮菜单
          subMenu: [
            {
              title: "当日挂号",
              icon: `${RES}/assets/icon/sub-menu-01.png`
            },
            {
              title: "报告查询",
              icon: `${RES}/assets/icon/sub-menu-02.png`
            },
            {
              title: "核酸预约",
              icon: `${RES}/assets/icon/sub-menu-03.png`
            },
            {
              title: "门诊清单",
              icon: `${RES}/assets/icon/sub-menu-04.png`
            }
          ],
          // 轮播图列表
          bannerUrlList: [
            { title: "01", img: `${RES}/assets/ad/banner01.png` },
            { title: "02", img: `${RES}/assets/ad/banner01.png` },
            { title: "03", img: `${RES}/assets/ad/banner01.png` }
          ],
          //   标签区域
          menuTabData: {
            //标签数据
            tabs: [
              { title: "院内服务" },
              { title: "个人中心" },
              { title: "更多服务" }
            ],
            //菜单按钮区域数据
            menuList: [
              [
                {
                  value: "智能导诊",
                  image: `${RES}/assets/icon/tab-menu-01.png`
                },
                {
                  value: "住院预交",
                  image: `${RES}/assets/icon/tab-menu-02.png`
                },
                {
                  value: "医院导航",
                  image: `${RES}/assets/icon/tab-menu-03.png`
                },
                {
                  value: "住院费用",
                  image: `${RES}/assets/icon/tab-menu-04.png`
                },
                {
                  value: "住院费用",
                  image: `${RES}/assets/icon/tab-menu-04.png`
                },
                {
                  value: "住院充值记录",
                  image: `${RES}/assets/icon/tab-menu-05.png`
                }
              ],
              [
                {
                  value: "当日挂号",
                  image: `${RES}/assets/icon/tab-menu-03.png`
                },
                {
                  value: "当日挂号",
                  image:`${RES}/assets/icon/tab-menu-04.png`
                },
                {
                  value: "当日挂号",
                  image:`${RES}/assets/icon/tab-menu-05.png`
                }
              ],
              [
                {
                  value: "当日挂号",
                  image:`${RES}/assets/icon/tab-menu-03.png`
                },
                {
                  value: "当日挂号",
                  image:`${RES}/assets/icon/tab-menu-04.png`
                },
                {
                  value: "当日挂号",
                  image:`${RES}/assets/icon/tab-menu-05.png`
                }
              ]
            ]
          },
          // 底部导航按钮数据
          navData: [
            {
              normal_img_url: `${RES}/assets/icon/nav_1_1.png`,
              active_img_url: `${RES}/assets/icon/nav_1_2.png`,
              text: "首页",
              active: true
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_2_1.png`,
              active_img_url: `${RES}/assets/icon/nav_2_2.png`,
              text: "信息"
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_3_1.png`,
              active_img_url: `${RES}/assets/icon/nav_3_2.png`,
              text: "个人"
            }
          ]
        }
      }
    };
  }
};
