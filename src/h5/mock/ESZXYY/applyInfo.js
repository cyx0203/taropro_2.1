import {UpateCurrentPageData} from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";

const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    // setTimeout(() => {
    //   UpateCurrentPageData({
    //     regionList: {
    //       area: {
    //         two: [
    //           {
    //             pcode: "000000",
    //             children: [
    //               {
    //                 pcode: "110000",
    //                 label: "北京市",
    //                 value: "110100"
    //               }, {
    //                 pcode: "110000",
    //                 label: "北京市",
    //                 value: "110101"
    //               }
    //             ],
    //             label: "北京市",
    //             value: "110000"
    //           },
    //           {
    //             pcode: "000000",
    //             children: [
    //               {
    //                 pcode: "110001",
    //                 label: "北京市2",
    //                 value: "110101"
    //               }
    //             ],
    //             label: "2北京市",
    //             value: "111001"
    //           }
    //         ],
    //         tree: [
    //           {
    //             pcode: "000000",
    //             children: [
    //               {
    //                 pcode: "110000",
    //                 children: [
    //                   {
    //                     pcode: "110100",
    //                     label: "东城区",
    //                     value: "110101"
    //                   },
    //                   {
    //                     pcode: "110100",
    //                     label: "西城区",
    //                     value: "110102"
    //                   },
    //                   {
    //                     pcode: "110100",
    //                     label: "南城区",
    //                     value: "110103"
    //                   }
    //                 ],
    //                 label: "北京市",
    //                 value: "110100"
    //               },
    //               {
    //                 pcode: "110001",
    //                 children: [
    //                   {
    //                     pcode: "110101",
    //                     label: "东城区1",
    //                     value: "110111"
    //                   },
    //                   {
    //                     pcode: "110101",
    //                     label: "西城区1",
    //                     value: "110112"
    //                   },
    //                   {
    //                     pcode: "110101",
    //                     label: "南城区1",
    //                     value: "110113"
    //                   }
    //                 ],
    //                 label: "北京市",
    //                 value: "110101"
    //               }
    //             ],
    //             label: "北京市",
    //             value: "110000"
    //           }
    //         ]
    //       },
    //       defaultTxt: "请选择城市"
    //     }
    //   });
    // }, 1000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/ESZXYY/applyInfo/index",
        title: "填写申请信息",
        wxcall: {
          // [底部导航] 按钮
          navOnClick: (item, index) => {
            console.log("##navOnClick##");
            console.log(item);
            console.log(index);
          },
          nextClick: (item) => {
            console.log('---applyInfo下一步---', item);
          },
          returnClick: () => {
            console.log('---applyInfo返回---');
          },
          onItemClick: (value) => {
            console.log('---applyInfo onItemClick---', value);
          }
        },
        data: {
          stepTxt: {
            title: "1.填写基本信息",
            subtitle: "您的信息仅用于医院（带*号的为必填项）"
          },
          warmTips: '温馨提示：为包裹可以顺利到达目的地，请您在填写信息后， 认真核对以免发生问题。',

          // 配置页面的图片
          images:{
            topImg: 'http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/img/titleBg.jpg',
            smallIcon: 'http://material.pro220.ggzzrj.com/web/mini/ESZXYY/assets/icon/tips.png',
          },

          // copyContent:['出院记录', '住院志(入院记录)', '手术及麻醉记录单', '病理报告',
          //   '医学影像检查资料', '化验单(检验报告)', '医嘱单', '护理记录', '体温单', '病案首页', '住院证'],
          //
          copyContent: [
            {id: '1', label: '出院记录'},
            {id: '2', label: '住院志(入院记录)'},
            {id: '3', label: '手术及麻醉记录单'},
            {id: '4', label: '病理报告'},
            {id: '5', label: '医学影像检查资料'},
            {id: '6', label: '化验单(检验报告)'},
            {id: '7', label: '医嘱单'},
            {id: '8', label: '护理记录'},
            {id: '9', label: '体温单'},
            {id: '10', label: '病案首页'},
            {id: '11', label: '住院证'},
          ],

          regionList: {
            area: {
              two: [
                {
                  pcode: "000000",
                  children: [
                    {
                      pcode: "110000",
                      label: "北京市444",
                      value: "110100"
                    }, {
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
            defaultTxt: "请选择城市"
          },
          // 底部导航按钮数据
          navData: [
            {
              normal_img_url: `${RES}/assets/icon/nav_2_1.png`,
              active_img_url: `${RES}/assets/icon/nav_1_1.png`,
              text: "首页",
              active: true
            },
            {
              normal_img_url: `${RES}/assets/icon/nav_2_2.png`,
              active_img_url: `${RES}/assets/icon/nav_1_2.png`,
              text: "我的"
            }
          ]
        }
      }
    };
  }
};
