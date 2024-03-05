import { UpateCurrentPageData } from "../../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    setTimeout(() => {
        UpateCurrentPageData({
              regionList: {
                area: {
                  two: [
                    {
                      pcode: "000000",
                      children: [
                        {
                          pcode: "110000",
                          label: "北京市",
                          value: "110100"
                        },{
                          pcode: "110000",
                          label: "北京市",
                          value: "110101"
                        }
                      ],
                      label: "北京市",
                      value: "110000"
                    },
                    {
                      pcode: "000000",
                      children: [
                        {
                          pcode: "110001",
                          label: "北京市2",
                          value: "110101"
                        }
                      ],
                      label: "2北京市",
                      value: "111001"
                    }
                  ],
                  tree: [
                    {
                      pcode: "000000",
                      children: [
                        {
                          pcode: "110000",
                          children: [
                            {
                              pcode: "110100",
                              label: "东城区",
                              value: "110101"
                            },
                            {
                              pcode: "110100",
                              label: "西城区",
                              value: "110102"
                            },
                            {
                              pcode: "110100",
                              label: "南城区",
                              value: "110103"
                            }
                          ],
                          label: "北京市",
                          value: "110100"
                        },
                        {
                          pcode: "110001",
                          children: [
                            {
                              pcode: "110101",
                              label: "东城区1",
                              value: "110111"
                            },
                            {
                              pcode: "110101",
                              label: "西城区1",
                              value: "110112"
                            },
                            {
                              pcode: "110101",
                              label: "南城区1",
                              value: "110113"
                            }
                          ],
                          label: "北京市",
                          value: "110101"
                        }
                      ],
                      label: "北京市",
                      value: "110000"
                    }
                  ]
                },
                defaultTxt: "请选择地名"
              }
        });
      }, 3000);




    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/Consultation/editAddress/index",
        title: "支付",
        wxcall: {
            confirmClick:(address,area)=>{
                console.log('confirmClick:')
                console.log(address)
                console.log(area)
            },
            onItemClick:(value)=>{
                console.log('onitemclick:')
                console.log(value)
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
            addressItem:{
                // name:'陈涛',
                // phone:'17712345678',
                // area:'江苏省常州市新北区',
                // address:'绿都万和城7区11幢乙1702'
                name:'cyx',
                phone:0,
                // area:'江苏省常州市钟楼区',
                // area:'',
                address:'aaa2',
                default:true, 
            },
            
            regionList: {
                area: {
                  two: [
                    {
                      pcode: "000000",
                      children: [
                        {
                          pcode: "110000",
                          label: "北京市",
                          value: "110100"
                        }
                      ],
                      label: "北京市",
                      value: "110000"
                    }
                  ],
                  tree: [
                    {
                      pcode: "000000",
                      children: [
                        {
                          pcode: "110000",
                          children: [
                            {
                              pcode: "110100",
                              label: "东城区",
                              value: "110101"
                            },
                            {
                              pcode: "110100",
                              label: "西城区",
                              value: "110102"
                            },
                            {
                              pcode: "110100",
                              label: "南城区",
                              value: "110103"
                            }
                          ],
                          label: "北京市",
                          value: "110100"
                        }
                      ],
                      label: "北京市",
                      value: "110000"
                    }
                  ]
                },
                defaultTxt: "请输入地名"
              },
        }
      }
    };
  }
};
