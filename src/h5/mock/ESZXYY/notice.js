import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({});
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/ESZXYY/notice/index",
        title: "申请须知",
        wxcall: {
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          },
          confirmClick: () => {
            console.log('同意');
          },
          disagreeClick:() => {
            console.log('不同意');
          }
        },
        data: {
          assets:{
            selected:"http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/selected.png"
          },
          agreeMent: `
            <div style='font-size:17px;line-height:30px'>
              <p style='text-align:center;color:#2c65af;font-size:20px;margin-bottom:20px'>《病案复印服务线上申请须知》</p>
              <p>一、患者办理出院后，可申请病案复印。</p>
              <p>二、复印流程</p>
              <p>1、用户上传有效身份证件和相关信息完成申请。</p>
              <p>2、等待系统审核，需要1个工作日(周末和节假日顺延）</p>
              <p>3、系统审核后，用户再次确认并缴费。<span style='color:red'>★</span></p>
              <p>4、用户缴费之后，工作人员复印病案并寄出。</p>
              <p>三、费用说明:</p>
              <p>1、复印费: A4纸0.5元/张</p>
              <p>2、邮寄费:自费，邮费到付</p>
              <p>3、发票: 公众号上面查看电子发票。</p>
              <p>四、关于终止复印流程<span style='color:red'>★</span></p>
              <p>1、用户在缴费之前可随时终止病案复印流程</p>
              <p>2、用户在缴费之后，病案复印流程将无法终止</p>
            </div>
            `,
            tipsTxt:
              "我已经仔细阅读并同意上述申请条款。",
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
