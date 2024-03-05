import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/NATType/index",
        title: "核酸检测类型",
        wxcall: {
          // 核酸检测类型点击事件
          onNATTypeClick: (item, index) => {
            console.log(item, index);
          },
          // 切换就诊人
          changePatient: () => {
            console.log("切换就诊人");
          },
          // 用户卡片点击
          userCardClick:() => {
            console.log('用户卡片点击事件');
          },
          // 倒计时触发事件
          countTimeUp:() => {
            console.log('时间到')
          }
        },
        data: {
          tipsContent:'请在$1$之内完成支付，超时将自动释放号源！',
          // 就诊人卡片
          userCard: {
            user: {
              icon: `${RES}/assets/img/patient.png`,
              name: "蒋**",
              card: "就诊卡号：40004040***3039",
              // 右上角的切换按钮
              extra: {
                icon: `${RES}/assets/icon/change1.png`,
                text: "切换就诊人"
              }
            },
           },
          // 核酸检测类型信息
          NATInfo: [
            {
              // 核酸检测类型标题
              title: "新型冠状病毒核酸检测预约",
              // 图标
              icon: `${RES}/assets/icon/wechat.svg`,
              // 检测方式
              type: "病原体核糖核酸扩增定性检测（个人检测）",
              // 检测费用
              money: "核算费用：8.00元"
            },
            {
              title: "新型冠状病毒核酸检测预约",
              icon: `${RES}/assets/icon/chs.png`,
              type: "病原体核糖核酸扩增定性检测（混合检测）",
              money: "核算费用：28.00元"
            }
          ]
        }
      }
    };
  }
};
