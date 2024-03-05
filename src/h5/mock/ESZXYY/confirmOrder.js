import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/ESZXYY/confirmOrder/index",
        title: "",
        wxcall: {
          // 查看明细
          checkClick:() => {
            console.log('查看明细')
          },
          // 去支付
          payClick:() => {
            console.log('去支付')
          },
        },
        data: {
          // 顶部信息
          infoHos:{
            icon:`${RES}/assets/icon/hos.svg`,
            info:{
              label:'付款给',
              value:'*******医院'
            }
          },
          payInfo:{
            icon:`${RES}/assets/icon/chs.svg`,
            info:[
              `<div style='font-size:17px;color:#000;marginBottom:30px'><span>费用总额</span><span>368.50元</span></div>`,
              `<div style='font-size:13px;color:#979797'><span>医保基金支付</span><div>0.00元</div></div>`,
              `<div style='font-size:13px;color:#979797'><span>个人账户支付</span><div>200.00元</div></div>`,
              `<div style='font-size:13px;color:#979797'><div>其他抵扣金额</div><div>100.00元</div></div>`,
              `<div style='font-size:15px;color:#3B71E8;marginTop:20px'><div>现金支付</div><div>68.50元</div></div>`,
            ],
            // btn:'查看明细'
          },
          footerInfo:{
            txt:`您还需要支付：<span style='color:#3B71E8;font-size:20px'>￥68.50</span>`,
            btn:'去支付'
          }
        }
      }
    };
  }
};
