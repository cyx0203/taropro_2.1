import { UpateCurrentPageData } from "../../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/Consultation/pay/index",
        title: "支付",
        wxcall: {
          addressClick: addressArray => {
            console.log("addressClick:");
            console.log(addressArray);
          },
          confirmClick: (addressArray, consultationInfo, money, isAddress) => {
            //isAddress为true表示自提,false表示配送
            console.log("confirmClick:");
            console.log(addressArray, consultationInfo, money, isAddress);
          },
          addClick: () => {
            console.log("addClick");
          },
          switchClick: (sw, txt, index) => {
            console.log("switchClick");
            console.log(sw, txt, index);
          }
        },
        data: {
          defaultImg: `${RES}/assets/img/doctor.svg`,
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
          //就诊信息
          consultationInfo: [
            {
              label: "就诊项目",
              value: "在线复诊-视频"
            },
            {
              label: "姓名",
              value: "李四"
            },
            {
              label: "拓展",
              value: "值1"
            },
            {
              label: "拓展2",
              value: "值2"
            }
          ],
          money: "1020.01元",
          addressArray: [
            // 可以为空，为设置默认地址则页面不显示
            {
              name: "陈涛",
              phone: 17712345678,
              area: "江苏省常州市新北区",
              address: "绿都万和城7区11幢乙1702",
              default: false
            },
            {
                name:'陈涛2',
                phone:17712345678,
                area:'江苏省常州市新北区',
                address:'绿都万和城7区11幢乙1702',
                default:true
            },
            {
              name: "陈涛3",
              phone: 17712345678,
              area: "江苏省常州市新北区",
              address: "绿都万和城7区11幢乙1702",
              default: false
            }
          ],
          default_index:1,
          showPAndD: true //控制自提和配送以及地址的显示与否
        }
      }
    };
  }
};
