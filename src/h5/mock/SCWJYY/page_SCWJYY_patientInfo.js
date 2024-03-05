import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_PatientInfo = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({

        patientInfo:{
          QRCode:'1234532',
          tipText:'就诊时出示此二维码11111',
          info:[
            {label:'姓名',value:'张三111'},
            {label:'身份证号',value:'000345678976543'},
            {label:'就诊卡号',value:'345678'},
            {label:'手机号',value:'2345345'},
          ]
        },
        Btns:{
          btn1:'设为默认1',
          // btn2:'解除绑定'
        }
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/patientInfo/index",
        title: "就诊人信息",
        wxcall: {
          onClickOne:() => {
            console.log('onClickOne');
          },
          onClickTwo:() => {
            console.log('onClickTwo');
          },
        },
        data: {
          patientInfo:{
            QRCode:'234564',
            tipText:'就诊时出示此二维码',
            info:[
              {label:'姓名',value:'张三'},
              {label:'身份证号',value:'345678976543'},
              {label:'就诊卡号',value:'345678'},
              {label:'手机号',value:'2345345'},
            ]
          },
          Btns:{
            btn1:'设为默认',
            // btn2:'解除绑定'
          }
        }
      }
    };
  }
};
