import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    // setTimeout(() => {
    //   UpateCurrentPageData({});
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/ESZXYY/index/index",
        title: "首页",
        wxcall: {
          // [弹窗确认按钮点击事件]
          modalConfirm:() => {
            console.log('弹窗确认');
          },
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
          // 切换就诊人点击事件
          changeUserClick: () => {
            console.log("切换就诊人");
          },
          // 添加就诊人点击事件
          addUserClick: () => {
            console.log("添加就诊人");
          },
          // 就诊人卡片点击事件
          userCardClick: (item, index) => {
            console.log(item, index);
          },
          // 就诊人卡片二维码点击事件
          userQRCodeClick: () => {
            console.log("二维码点击事件");
          },
          // 轮播图点击事件
          bannerClick: () => {
            console.log("广告点击事件");
            // console.log(item, index);
          }
        },
        data: {
          assets: {
            bg1: `${RES}/assets/img/enshi_card_bg.png`,
            qrcode: `${RES}/assets/icon/qrcode2.png`
          },
          // 首次进入首页提示文字
          tipsData: {
            // true-进入首页显示提示框，false-进入首页不显示提示框
            tipsOpen: true,
            content: {
              title: "特别提醒",
              txtData: `外地来通返通人员健康管理措施一切以通江县防疫政策为准。<br/>通江县疾控咨询电话：0827-7540120,健康码为黄码或无码,患者及陪护需提供24小时小时内的新冠核酸阴性结果方可就诊（急重症患者除外）<br/>外地来通返通人员健康管理措施一切以通江县防疫政策为准。<br/>通江县疾控咨询电话：0827-7540120,健康码为黄码或无码,患者及陪护需提供24小时小时内的新冠核酸阴性结果方可就诊（急重症患者除外）`
            },
            btnText: "确认"
          },
          // 顶部广告图片
          adImg: `${RES}/assets/ad/logo.png`,
          userCard: {
            title: "就诊卡",
            //   是否添加就诊人
            isEmpty: "N",
            // 未添加就诊人
            empty: {
              icon: `${RES}/assets/icon/addUser.png`,
              msg: "请先添加就诊人"
            },
            // 就诊人信息
            user: {
              name: "蒋**11",
              number: "ID:4000**********3039"
            }
          },
          // 大按钮菜单
          mainMenu: [
            {
              // 按钮主名称
              title: "门诊挂号",
              // 按钮次名称
              subtitle: "线上挂号，方便快捷",
              // ICON
              icon: `${RES}/assets/icon/main_menu_01.png`,
              layout: "02"
            },
            {
              title: "门诊缴费",
              subtitle: "支付宝，微信支付",
              icon: `${RES}/assets/icon/main_menu_02.png`,
              layout: "02"
            },
            {
              // 按钮主名称
              title: "查询报告",
              // 按钮次名称
              subtitle: "查询相关检查报告",
              // ICON
              icon: `${RES}/assets/icon/main_menu_03.png`,
              layout: "02"
            },
            {
              title: "我的建档",
              subtitle: "点击查看建档信息",
              icon: `${RES}/assets/icon/main_menu_04.png`,
              layout: "02"
            }
          ],

          // 广告URL
          bannerUrl:`${RES}/assets/img/NATad.png`,
          //   标签区域
          menuTabData: {
            //标签数据
            tabs: [{ title: "门诊" }, { title: "住院" }],
            //菜单按钮区域数据
            menuList: [
              [
                {
                  title: "单据查询",
                  icon: `${RES}/assets/icon/sub_menu_01.png`
                },
                {
                  title: "来院导航",
                  icon: `${RES}/assets/icon/sub_menu_02.png`
                },
                {
                  title: "电子发票",
                  icon: `${RES}/assets/icon/sub_menu_03.png`
                },
                {
                  title: "核酸记录",
                  icon: `${RES}/assets/icon/sub_menu_04.png`
                },
                // {
                //   title: "核酸检测缴费",
                //   icon: `${RES}/assets/icon/sub_menu_05.png`
                // },
                // {
                //   title: "缴费记录",
                //   icon: `${RES}/assets/icon/sub_menu_06.png`
                // },
                // {
                //   title: "单据查询",
                //   icon: `${RES}/assets/icon/sub_menu_01.png`
                // },
                // {
                //   title: "来院导航",
                //   icon: `${RES}/assets/icon/sub_menu_02.png`
                // },
                // {
                //   title: "电子发票",
                //   icon: `${RES}/assets/icon/sub_menu_03.png`
                // },
                // {
                //   title: "核酸记录",
                //   icon: `${RES}/assets/icon/sub_menu_04.png`
                // },
                // {
                //   title: "核酸检测缴费",
                //   icon: `${RES}/assets/icon/sub_menu_05.png`
                // },
                // {
                //   title: "缴费记录",
                //   icon: `${RES}/assets/icon/sub_menu_06.png`
                // },
                // {
                //   title: "排队查询",
                //   icon: `${RES}/assets/icon/sub_menu_07.png`
                // },
                // {
                //   title: "体检查询",
                //   icon: `${RES}/assets/icon/sub_menu_08.png`
                // }
              ],
              [
                {
                  title: "单据查询",
                  icon: `${RES}/assets/icon/sub_menu_01.png`
                },
                {
                  title: "来院导航",
                  icon: `${RES}/assets/icon/sub_menu_02.png`
                },
                {
                  title: "电子发票",
                  icon: `${RES}/assets/icon/sub_menu_03.png`
                },
                {
                  title: "核酸记录",
                  icon: `${RES}/assets/icon/sub_menu_04.png`
                },
                {
                  title: "核酸检测缴费",
                  icon: `${RES}/assets/icon/sub_menu_05.png`
                },
                {
                  title: "缴费记录",
                  icon: `${RES}/assets/icon/sub_menu_06.png`
                },
                {
                  title: "排队查询",
                  icon: `${RES}/assets/icon/sub_menu_07.png`
                },
                {
                  title: "体检查询",
                  icon: `${RES}/assets/icon/sub_menu_08.png`
                }
              ]
            ]
          },
          // 底部导航按钮数据
          navData: [
            {
              normal_img_url: `${RES}/assets/icon/nav_2_1.png`,
              active_img_url: `${RES}/assets/icon/nav_1_1.png`,
              text: "首页",
              active: true
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_2_2.png`,
              active_img_url: `${RES}/assets/icon/nav_1_2.png`,
              text: "我的"
            }
          ]
        }
      }
    };
  }
};
