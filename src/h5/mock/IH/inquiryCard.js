import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/inquiryCard/index",
        title: "问诊卡",
        wxcall: {
          confirm_onClick:() => {
            console.log("::confirm_onClick::");
            console.log('确认');
          },
        },
        data: {
          doctorinfor: {
            pic: `${RES}/assets/img/user.svg`,
            name: "张三",
            identity: "副主任医师",
          },
          main_title:{
            text:'问诊卡'
          },
          confirm_title:{
            text:'确认',
          },
          confirm_onClick:() => {
            console.log("::confirm_onClick::");
            console.log('确认');
          },
          cardcontent: [
            {
              //病人信息
              patientname: "张嘉佳",
              patientgender: "男",
              patientage: 35,
              theme:'问诊主题是....',
              // 病情描述
              disease:
                "重感冒，发烧38.5℃、咳嗽2天、拉肚子一天3次、鼻涕黄脓色。自己吃了点药，已经上传图片了。",
              //其他信息补充
              else: [
                {label:'过敏史', value: "海鲜过敏" },
                {label:'既往史', value: "无既往病史" },
                { label:'家族史',value: "无家族病史" },
                { label:'个人习惯',value: "无不良嗜好" },
              ],
              picture: [
                {
                  title: "图片一",
                  image: `${RES}/assets/icon/document.svg`,
                },
                {
                  title: "图片二",
                  image: `${RES}/assets/icon/message_prue.svg`,
                },
                {
                  title: "图片三",
                  image: `${RES}/assets/icon/message_prue.svg`,
                },
                {
                  title: "图片四",
                  image: `${RES}/assets/icon/message_prue.svg`,
                },
              ],
            },
          ],
        }
      }
    };
  }
};
