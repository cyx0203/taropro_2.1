import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    setTimeout(() => {
      UpateCurrentPageData({
        inputForms: [
          {
            // （必填）表单的唯一id (state中的key值)
            id: "classify",
            // （必填）表单label
            label: "分类",
            // （选填）默认值，不填默认未空  （type = select时，此项填入select中的value值）
            defaultValue: "请选择2",
            // 业务类型
            type: "select", // text - 文本输入 select - 单选框

            // 单选输入框必填
            selectList: [
              { label: "01", value: "干部职员" },
              { label: "02", value: "普通人" },
              { label: "03", value: "其他" }
            ]
          },
          {
            // （必填）表单的唯一id (state中的key值)
            id: "profession",
            // （必填）表单label
            label: "职业",
            // （选填）默认值，不填默认未空  （type = select时，此项填入select中的value值）
            defaultValue: "请选择2",
            // 业务类型
            type: "select", // text - 文本输入 select - 单选框

            // 单选输入框必填
            selectList: [
              { label: "01", value: "国家公务人员" },
              { label: "02", value: "其他" },
              { label: "03", value: "建筑工人" }
            ]
          },
          {
            // （必填）表单的唯一id (state中的key值)
            id: "phoneNumber",
            // （必填）表单label
            label: "手机号",
            // 文本框内提示文字
            placeholder: "请输入手机号",
            // 业务类型
            type: "text" // text - 文本输入 select - 单选框
          },
          {
            // （必填）表单的唯一id (state中的key值)
            id: "region",
            // （必填）表单label
            label: "省市",
            // （选填）默认值，不填默认未空  （type = select时，此项填入select中的value值）
            defaultValue: "请选择",
            // 业务类型
            type: "region", // text - 文本输入 select - 单选框   region-三级地区选择器

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
              defaultTxt: "请选择地名"
            }
          },
          {
            id: "address",
            label: "地址",
            placeholder: "",
            type: "text" // text - 文本输入 select - 单选框
          },
          {
            id: "inHospitalNumber",
            label: "住院号",
            placeholder: "非必填项",
            type: "text" // text - 文本输入 select - 单选输入框
          }
        ],
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/submitForm/index",
        title: "提交表单",
        wxcall: {
          // 提交
          submitEvaluate: obj => {
            console.log(obj);
          }
        },
        data: {
          classifyList: [
            { label: "01", value: "干部职员1" },
            { label: "02", value: "普通人1" },
            { label: "03", value: "其他1" }
          ],
          professionList: [
            { label: "01", value: "国家公务人员1" },
            { label: "02", value: "其他1" },
            { label: "03", value: "建筑工人1" }
          ],
          // 用户信息
          patientInfo: {
            content: [
              {
                label: "姓名",
                value: "张三"
              },
              {
                label: "身份证号",
                value: "12345*****67890"
              }
            ]
          },
          // 提示框提示文字
          tipsText: "请填写完整信息",
          // 表单列表
          inputForms: [
            {
              // （必填）表单的唯一id (state中的key值)
              id: "classify",
              // （必填）表单label
              label: "分类",
              // （选填）默认值，不填默认未空  （type = select时，此项填入select中的value值）
              defaultValue: "请选择1",
              // 业务类型
              type: "select", // text - 文本输入 select - 单选框

              // 单选输入框必填
              // selectList: [
              //   { label: "01", value: "干部职员" },
              //   { label: "02", value: "普通人" },
              //   { label: "03", value: "其他" }
              // ]
            },
            {
              // （必填）表单的唯一id (state中的key值)
              id: "profession",
              // （必填）表单label
              label: "职业",
              // （选填）默认值，不填默认未空  （type = select时，此项填入select中的value值）
              defaultValue: "请选择2",
              // 业务类型
              type: "select", // text - 文本输入 select - 单选框

              // 单选输入框必填
              // selectList: [
              //   { label: "01", value: "国家公务人员" },
              //   { label: "02", value: "其他" },
              //   { label: "03", value: "建筑工人" }
              // ]
            },
            {
              // （必填）表单的唯一id (state中的key值)
              id: "phoneNumber",
              // （必填）表单label
              label: "手机号",
              // 文本框内提示文字
              placeholder: "请输入手机号",
              // 业务类型
              type: "text" // text - 文本输入 select - 单选框
            },
            {
              // （必填）表单的唯一id (state中的key值)
              id: "region",
              // （必填）表单label
              label: "省市",
              // （选填）默认值，不填默认未空  （type = select时，此项填入select中的value值）
              defaultValue: "请选择",
              // 业务类型
              type: "region", // text - 文本输入 select - 单选框   region-三级地区选择器

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
                defaultTxt: "请选择地名"
              }
            },
            {
              id: "address",
              label: "地址",
              placeholder: "",
              type: "text" // text - 文本输入 select - 单选框
            },
            {
              id: "inHospitalNumber",
              label: "住院号",
              placeholder: "非必填项",
              type: "text" // text - 文本输入 select - 单选输入框
            }
          ],
          footerBtn: "确认提交"
        }
      }
    };
  }
};
