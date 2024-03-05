import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/register/index",
        title: "注册",
        wxcall: {
          registerClick: item => {
            console.log(item);
          }
        },
        data: {
          // defaultValue:{
          //   // 姓名默认值
          //   name:'默认',
          //   // 证件号默认值
          //   idNumber:'123123123'
          // },
          // 输入框提示内容
          placeholderData: {
            name: "请输入姓名",
            idCard: "请输入证件号",
            number: "请输入手机号",
            nation: "请选择民族",
            address: "请输入地址",
            gender: "请选择性别",
            birthday: "请选择出生日期",
            idType: "请选择证件类型",
          },
          // 是否显示额外的表单
          addForm: {
            // 性别选择
            gender: true,
            // 生日日期选择
            birthday: true,
            // 证件类型
            idType: true,
            // 省市区
            region:true,
            // 校验码
            numberCheck:true
          },
          idTypeList: {
            label: "证件类型",
            listData: [
              { label: "01", value: "身份证" },
              { label: "02", value: "军官证" },
              { label: "03", value: "等" }
            ]
          },
          // 选择器数据
          selectorData: {
            label: "民族",
            listData: [
              { label: "01", value: "已婚" },
              { label: "02", value: "未婚" },
              { label: "03", value: "水族" }
            ]
          },
          regionList: {
            area: {
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
            defaultTxt: "请选择城市"
          },
          footerBtn: "注册"
        }
      }
    };
  }
};
