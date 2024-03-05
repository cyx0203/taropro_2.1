import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/THYYYDC/order/index",
        title: "点餐",
        wxcall: {
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          },
          // 轮播图点击事件
          bannerClick: (item, index) => {
            console.log("轮播图点击事件");
            console.log(item, index);
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
          //   结算点击事件
          settlementClick:(item,money) => {
            console.log('结算',item,money)
          },
          // 时间段选择点击事件
          timeQuantumClick: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          assets:{
            order:`${RES}/assets/icon/order.svg`,
            plus:`${RES}/assets/icon/plus.svg`,
            subtract:`${RES}/assets/icon/subtract.svg`,
            clear:`${RES}/assets/icon/clear.svg`,
            pack:`${RES}/assets/icon/pack.svg`,
            money_1:`${RES}/assets/icon/money_1.svg`,
          },
          // 空提示内容
          resultData: {
            icon: "@empty",
            title: "请选择"
          },
          // 打包数据
          packData:{
            // 是否显示打包费用
            isShow:false,
            // 打包费用（元）
            money: `<span style='font-size:18px;color:red'>￥0.00</span>`,
          },
          // 轮播图列表
          bannerUrlList: [
            { title: "01", img: `${RES}/assets/ad/banner_01.jpg` },
            { title: "02", img: `${RES}/assets/ad/banner_02.jpg` },
            { title: "03", img: `${RES}/assets/ad/banner_03.jpg` }
          ],
          // 顶部时间列表数据 -注释则不显示
          // timeQuantumList: [
          //   {
          //     title: "明日订餐",
          //     active: true
          //   },
          //   // {
          //   //   title: "明天"
          //   // },
          //   // {
          //   //   title: "后天"
          //   // },
          //   // {
          //   //   title: "大后天"
          //   // },
          //   // {
          //   //   title: "下一天"
          //   // },
          //   // {
          //   //   title: "下一天"
          //   // },
          //   // {
          //   //   title: "最后"
          //   // }
          // ],
          
          // 顶部日期信息是否显示
          dateIsShow:false,
          // 菜品数据列表
          commodityList: [
            {
              // -早餐 -午餐 -晚餐 -超市
              type: "早餐",
              //   类型图标
              // icon: `${RES}/assets/icon/breakfast.svg`,
              //   当前类型下的可选内容列表
              content: [
                {
                  // 唯一ID
                  id: 1,
                  // 名称
                  title: "番茄炒蛋-早",
                  //参考图片
                  pic: `${RES}/assets/img/fanqie.jpg`,
                  // 材料简介
                  materialsInfo: "番茄（200克）鸡蛋（200克）番茄（200克）鸡蛋（200克）番茄（200克）鸡蛋（200克）番茄（200克）鸡蛋（200克）",
                  // 简介
                  intro: "好吃的不得了！！",
                  // 当前销量
                  sale: 20,
                  // 价格
                  price: `<span style='font-size:18px;color:red'>￥10.99</span>`,
                  // 已选数量
                  number:0,
                  // 日期
                  date:'2022/12/12',
                  // 类型
                  type:'早餐',
                  // 规格
                  spec:[
                    {title:'200克',default:true},//默认选中
                    {title:'300克'},
                    {title:'400克'},
                    {title:'500克'},
                    {title:'600克'},
                  ]
                },
                {
                  id: 2,
                  title: "青菜-早",
                  pic: `${RES}/assets/img/qingcai.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.23</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'早餐'
                },
                {
                  id: 3,
                  title: "排骨-早",
                  pic: `${RES}/assets/img/paigu.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥1000.54</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'早餐'
                },
                {
                  id: 4,
                  title: "土豆丝-早",
                  pic: `${RES}/assets/img/tudousi.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.66</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'早餐'
                },
                {
                  id: 5,
                  title: "小米粥-早",
                  pic: `${RES}/assets/img/xiaomizhou.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.01</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'早餐'
                },
                {
                  id: 6,
                  title: "小米粥-早",
                  pic: `${RES}/assets/img/xiaomizhou.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.01</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'早餐'
                },
                {
                  id: 7,
                  title: "小米粥-早",
                  pic: `${RES}/assets/img/xiaomizhou.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.01</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'早餐'
                },
              ]
            },
            {
              type: "午餐",
              // icon: `${RES}/assets/icon/lunch.svg`,
              content: [
                {
                  id: 6,
                  title: "番茄炒蛋-中",
                  pic: `${RES}/assets/img/fanqie.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'午餐'
                },
                {
                  id: 7,
                  title: "青菜-中",
                  pic: `${RES}/assets/img/qingcai.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'午餐'
                },
                {
                  id: 8,
                  title: "排骨-中",
                  pic: `${RES}/assets/img/paigu.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'午餐'
                },
                {
                  id: 9,
                  title: "土豆丝-中",
                  pic: `${RES}/assets/img/tudousi.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'午餐'
                },
              ]
            },
            {
              type: "日用品芭拉芭拉芭啊是发士大夫",
              // icon: `${RES}/assets/icon/dinner.svg`,
              content: [
                {
                  id: 10,
                  title: "番茄炒蛋-晚",
                  pic: `${RES}/assets/img/fanqie.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了好吃的不得了好吃的不得了好吃的不得了好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'晚餐'
                },
                {
                  id: 11,
                  title: "青菜-晚",
                  pic: `${RES}/assets/img/qingcai.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'晚餐'
                },
                {
                  id: 12,
                  title: "排骨-晚",
                  pic: `${RES}/assets/img/paigu.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`,
                  number:0,
                  date:'2022/12/12',
                  type:'晚餐'
                },
              ]
            },
            {
              type: "超市",
              // icon: `${RES}/assets/icon/shop.svg`,
              content: [
                {
                  id: 1,
                  title: "番茄炒蛋",
                  pic: `${RES}/assets/img/fanqie.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`
                },
                {
                  id: 2,
                  title: "番茄炒蛋",
                  pic: `${RES}/assets/img/fanqie.jpg`,
                  materialsInfo: "番茄（200克）鸡蛋（200克）",
                  intro: "好吃的不得了！！",
                  sale: 20,
                  price: `<span style='font-size:18px;color:red'>￥10.00</span>`
                }
              ]
            }
          ],
          // 底部导航按钮数据
          navData: [
            {
              normal_img_url: `${RES}/assets/icon/nav_1_2.svg`,
              active_img_url: `${RES}/assets/icon/nav_1_1.svg`,
              text: "点餐",
              active: true
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_2_2.svg`,
              active_img_url: `${RES}/assets/icon/nav_2_1.svg`,
              text: "订单"
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
