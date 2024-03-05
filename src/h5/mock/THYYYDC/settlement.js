import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/THYYYDC/settlement/index",
        title: "结算",
        wxcall: {
          // 新增收件地址按钮
          addAdressClick: () => {
            console.log("##addAdressClick##");
          },
          // 编辑地址按钮
          editAdressClick: () => {
            console.log("##editAdressClick##");
          },
          onPayClick:(item)=>{
            console.log("##onPayClick##");
            console.log(item)
          }
        },
        data: {
            // 默认收货地址
            default_address:{
              address:'湖北省十堰市人民南路32号 太和医院',
              name:'五小小',
              phone:'12345678912'
            },
            // 订单列表
            settlement_list: {
            title:'医院北食堂',
            subtitle:'2022-12-07 早餐',
            content:
                [
                  { name: "糖醋排骨", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  // { name: "土豆丝", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  // { name: "小米粥", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  // { name: "糖醋排骨", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  // { name: "土豆丝", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  // { name: "小米粥", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  // { name: "糖醋排骨", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  { name: "土豆丝", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  { name: "小米粥", img: `${RES}/assets/img/fanqie.jpg` ,num:'1',price:`<span style='font-size:18px;color:red'>￥10.00</span>`},
                  { name: "打包费", img: `${RES}/assets/icon/pack.svg` ,num:'3',price:`<span style='font-size:18px;color:red'>￥10.00</span>`}
                ],
            count:'3',
            count_price:`<span style='font-size:25px;color:red'>￥10.00</span>`,
            },
            // 送餐时间
            delivery:{
              date:'2022年11月28日',
              time:'11:00-11:30'
            },
            // 默认支付方式，可不配置
            default_payment:'微信支付',
            // 支付方式
            payment:['微信支付','支付宝支付','银行卡支付'],
            // 默认备注，可不配置
            default_notes:'不加辣,不加葱',
            // 备注可选标签列表
            // note_tags:['不加辣','不加葱','不吃香菜','多放葱花','多放葱花','多放葱花','多放葱花','多放葱花','多放葱花'],
            // 备注
            tips:`<div>&emsp;xxxxxxxxxxx啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊!</div>`,
            count_price:'25.50',
            package_price:'1.5',
            pay_img:`${RES}/assets/icon/money_2.svg`
        }
      }
    };
  }
};
