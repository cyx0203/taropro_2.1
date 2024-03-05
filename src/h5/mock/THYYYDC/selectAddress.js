import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/THYYYDC/selectAddress/index",
        title: "选择地址",
        wxcall: {
          // 新增收件地址按钮
          addAdressClick: () => {
            console.log("##addAdressClick##");
          },
          onEditClick:(item,index)=>{
            console.log("##onEditClick##");
            console.log(item,index)
          },
          onDeleteClick:(item,index)=>{
            console.log("##onDeleteClick##");
            console.log(item,index)
          },
          onSelectClick:(item,index)=>{
            console.log("##onSelectClick##");
            console.log(item,index)
            UpateCurrentPageData({default_index:index})
          },
          onContentClick:(item,index)=>{
            console.log("##onContentClick##");
            console.log(item,index)
          }
        },
        data: {
            addressList:[
              {
                address:'天津人民医院 C座急诊诊区 房间号和病房',
                name:'陈三',
                sex:'先生',
                phone:'16782299123'
              },
              {
                address:'天津人民医院 C座急诊诊区 房间号和病房',
                name:'陈三',
                sex:'先生',
                phone:'16782299123'
              },
              {
                address:'天津人民医院 C座急诊诊区 房间号和病房',
                name:'陈三',
                sex:'女士',
                phone:'16782299123'
              },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // },
              // {
              //   address:'天津人民医院 C座急诊诊区 房间号和病房',
              //   name:'陈三',
              //   phone:'16782299123'
              // }
            ],
            default_index:0,
            buttonTxt:'新增地址'
        }
      }
    };
  }
};
