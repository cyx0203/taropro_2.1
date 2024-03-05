import { UpateCurrentPageData } from "../../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/drawboard/appointment/index",
        title: "预约",
        wxcall: {
            confirmClick:(docInfo,userInfo,selected,valueFZ,valueBQ,checkedList,inputValue,files)=>{
                console.log('confirmClick:')
                console.log(docInfo,userInfo,selected,valueFZ,valueBQ,checkedList,inputValue)
                console.log('files为:'+JSON.stringify(files))
            },
            firstVistClick:(selected)=>{
              console.log(selected)
            },
            returnVistClick:(selected)=>{
              console.log(selected)
            }
        },
        data: {
            patientinfor: {
                //患者头像
                pic: `${RES}/assets/img/user.svg`,
                //患者姓名
                name: "张三",
                //第一行额外数据
                extra1: "男",
                //第二行额外数据
                extra2: "卡号：32030303030303",
              },
            //医师信息
            docInfo: {
                //ICON
                icon: `${RES}/assets/img/doctor.svg`,
                //用户姓名
                name: '新用户', //'新用户',
                job:'主治医师',
                tTitle:'123',
                //用户信息块点击事件处理
                onClick: () => {
                    console.log("::userinfor-click::");
                }
            },
            //用户信息
            userInfo:{
                name: '陈涛',
                id:'320404123456789012', 
                phone:'17712345678'
              },
            // 症状
            symptomList:[
                {
                    label:'既往史',
                    value:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],
                    mutualExclusion:true // 需要互斥的项用该属性标记
                },
                {
                    label:'过敏史',
                    value:['4','5','6']
                },
                {
                    label:'家族史',
                    value:['7','8']
                },
                {
                    label:'个人习惯',
                    value:['9']
                }
            ],
            symptomList_value:{
              checkedList:[['1','2'],['5','6'],['8'],['9']],
              inputValue:['cyx','cyx1','cyx2','cyx3']
            },
            // 问诊主题和病情描述预设项
            placeholderArray:['问诊病症','病情描述'],
            textList:{
              buttonText_1:[
                ['初诊','无到院就诊记录'],
                ['复诊','近期在我院或其他医疗机构有就诊记录']
              ],
              modalContent:`<p></span><span style='color:red;margin-left:10px'>初诊不能开药，仅能咨询</span>，建议初诊患者线下面诊。</p>`,
              imgTips:{
                firstTips:'病症部位，检查报告或者其他病情资料（最多上传5张）',
                returnTips:'上传初诊记录相关图片，挂号记录、检查检验单、病历单等（最多上传5张）'
              }
            }
        }
      }
    };
  }
};
