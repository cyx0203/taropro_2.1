import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    // UpateCurrentPageData({
    // });
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/patientForm/index",
        title: "就诊人注册",
        wxcall: {
          registerClick: obj => {
            console.log("用户注册");
            console.log(obj);
          },
          classifyClick:() => {
            // console.log(number)
            console.log('点击列表')
          },
          IDNumberonBlur:(number) => {
            console.log('失去焦点');
            console.log(number)
            
          }
        },
        data: {
          placeholderData: {
            name: "请输入姓名",
            nation: "请选择民族",
            idNumber: "输入证件号",
            phoneNumber: "输入手机号",
            address: "输入详细地址",
            profession: "请选择职业",
            classify: "请选择分类",
            // 注释则表单内不存在该项
            mCardNumber: "选填",
            // 注释则表单内不存在该项
            // admissionNumber: "门诊可忽略"
          },
          // 民族列表
          nationList: [
            { label: "01", value: "汉族" },
            { label: "02", value: "回族" },
            { label: "03", value: "水族" }
          ],
          // 地区列表
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
          // 职业列表
          professionList: [
            { label: "01", value: "XX" },
            { label: "02", value: "XX" },
            { label: "03", value: "XX" }
          ],
          // 分类列表
          classifyList: [
            { label: "01", value: "XX" },
            { label: "02", value: "XX" },
            { label: "03", value: "XX" }
          ],
          footerBtn: "注册",
          tipsText: "请输入完整信息"
        }
      }
    };
  }
};
