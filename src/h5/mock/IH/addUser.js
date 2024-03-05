import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/addUser/index",
        title: "添加",
        wxcall: {
          addUserClick: item => {
            console.log("添加用户");
            console.log(item);
          },
          getCheckClick:(number) => {
            console.log(number,'获取验证码')
          },
          errPhoneNumber:() => {
            console.log('电话号码输入有误！')
          },
          footerBtn2Click:() => {
            console.log('底部按钮2点击事件')
          },
          selectPicOnClick:(result) => {
            console.log(result)
          }
        },
        data: {
          topTipsText:'我院实行实名制就诊，请务必填写真实有效的就诊人信息',
          defaultValue:{
            name:'张三',//姓名
            idType:'大陆身份证',//证件类型
            idNumber:'123456123412341234',//身份证号
            gender:'男',//性别 
          },
          idTypeList:[
            '一类型','二类型','三类型','四类型'
          ],
          // 表单项是否显示 false 为不显示
          formShow: {
            // 性别
            gender:true,
            // 证件类型
            idType:true,
            // 民族
            nation: true,
            // 地址
            address: true,
            // 号码验证码
            numberCheck:true
          },
          // 协议是否显示
          // agreementShow: false,
          // clauseData: `<div style='text-indent:2em'>
          // <div>目前，乐山疫情防控形势复杂严峻，为科学精准做好新冠肺炎防控工作，根据军地疫情防控相关要求，我院对进入医院就诊患者核酸要求调整为48小时核酸阴性证明。</div>
          // <div> 请进入院区人员在通道入口处主动戴好口罩，提前扫场所码→出示健康码、风险城市旅居史和<span style='color:red'>48小时内核酸检测阴性证明</span>→配合工作人员查验通信行程卡→测量体温后，方可进入门诊就诊。【需进行摘除口罩的诊疗措施（如口腔门诊、纤支镜、胃肠镜、肺功能检查、鼻内镜、喉镜等治疗）的患者，请提供24小时内核酸检测阴性证明。】</div>
          // <div>第一行</div>
          // <div>第二行</div>
          // <div>第三行</div>
          // <div>第四行</div>
          // </div>`,
          nationList: ["汉族", "苗族", "水族", "维吾尔族", "藏族", "土家族"],
          // 注释则不显示按钮
          footerBtn:{
            btn1:'提交',
            // btn2:'【本人信息一键授权】'
          }
        }
      }
    };
  }
};
