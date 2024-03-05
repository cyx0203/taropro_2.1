import { UpateCurrentPageData } from "../../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/Consultation/addressList/index",
        title: "支付",
        wxcall: {
            editClick:(item)=>{
                console.log('editClick');
                console.log(item)
                // super.BASE_MOD('consultation/flw_editAddress','');
            },
            addClick:()=>{
                // super.BASE_MOD('consultation/flw_editAddress','');
                console.log('addClick')
            },
            deleteClick:(item,index)=>{
                console.log('deleteClick')
                console.log(item,index)
                // super.BASE_CHANGE_PAGE_DATA({addressArray:[]})
            },
            Click:(index)=>{
                console.log('click')
                console.log(index)
            },
            onConfirm:(item,index)=>{
                console.log('onConfirm')
                console.log(item)
                console.log('confiremIndex:'+index)
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
            addressArray:[
                // {
                //     name:'陈涛',
                //     phone:17712345678,
                //     area:'江苏省常州市新北区',
                //     address:'绿都万和城7区11幢乙1702',
                //     default:false
                // },
                // {
                //     name:'陈涛2',
                //     phone:18712345678,
                //     area:'江苏省常州市钟楼区',
                //     address:'清潭路93号 江苏国光信息产业股份有限公司 研发大楼',
                //     default:true
                // },
                // {
                //     name:'陈涛3',
                //     phone:18712345678,
                //     area:'江苏省常州市钟楼区',
                //     address:'清潭路93号 江苏国光信息产业股份有限公司 研发大楼',
                //     default:false
                // }
            ],
            defaultSVG:`${RES}/assets/icon/default.svg`,
            editSVG:`${RES}/assets/icon/edit.svg`
        }
      }
    };
  }
};
