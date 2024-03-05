import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
import Taro from "@tarojs/taro";

export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/THYYYDC/addAddress/index",
        title: "新增地址",
        wxcall: {
          // 查询信息点击事件
          inquireClick: (str1, str2) => {
            console.log("ID:", str1);
            console.log("Name:", str2);
            // 查到返回true 否则返回false
            console.log("查询信息，返回布尔值");
            Taro.showToast({
              title: "加载中",
              duration: 1000,
              icon: "loading"
            });
            setTimeout(() => {
              let obj = false;
              if (obj)
                UpateCurrentPageData({
                  patientExist: true,
                  patientHosID: "123456",
                  patientName: "张三"
                });
              else {
                UpateCurrentPageData({
                  patientExist: false,
                  patientHosID: "",
                  patientName: ""
                });
                Taro.showToast({
                  title: "未查询到住院ID,请确认后重新输入！",
                  duration: 1000,
                  icon: "none"
                });
              }
            }, 1000);
          },
          // 保存地址信息点击事件
          submitClick: infoObj => {
            console.log("提交信息:", infoObj);
            // 返回值
            // Obj: {
            //   详细地址  patientAddress,
            //   性别     patientGender,
            //   住院ID   patientHosID,
            //   选择多级地址（数组形式） regionRes,
            //   姓名    patientName,
            //   患者类型（住院/非住院）  patientType,
            //   电话号码  patientPhoneNumber;
            // }
          }
        },
        data: {
          // 输入框描述内容
          placeholderData: {
            hosID: "请输入住院号",
            patientName: "请输入患者姓名",
            phoneNumber: "请输入电话号码",
            linkManName: "请输入联系人姓名",
            inputAddress: "请输入详细地址"
          },
          // 初始化表单内容start
          patientHosID: "123456",
          patientName: "张三",
          patientAddress: "2222",
          patientGender: "先生",
          // 性别列表
          patientGenderList: [
            {
              title: "先生",
              checked: true
            },
            {
              title: "女士",
              checked: false
            }
          ],
          linkManName: "李四",
          patientPhoneNumber: "22323244",
          defaultAddress: true,
          // 初始化表单内容end
          // 上部分患者信息是否显示
          patientInfoShow: true,
          // 底部按钮文字内容，注释或者为空则不显示按钮
          footerBtn: "确认收货地址",
          // 未查到患者信息点击事件
          errorTips: "未查询到住院ID,请确认后重新输入！",
          // 患者类别
          patientTypeList: [
            {
              title: "住院患者",
              checked: true
            },
            {
              title: "非住院患者",
              checked: false
            }
          ],
          // 查询住院ID是否存在患者
          patientExist: false,

          regionList: {
            area: {
              two: [
                {
                  label: "湖北省人民医院-本院",
                  value: "H001",
                  children: [
                    {
                      value: "ETYLZX",
                      label: "儿童医疗中心"
                    },
                    {
                      value: "FCZX",
                      label: "妇产中心"
                    },
                    {
                      value: "H001",
                      label: "测试数据"
                    },
                    {
                      value: "JADL",
                      label: "济安东楼"
                    },
                    {
                      value: "JAXL",
                      label: "济安西楼"
                    },
                    {
                      value: "JKL",
                      label: "济康楼"
                    },
                    {
                      value: "JML",
                      label: "济民楼"
                    },
                    {
                      value: "JSL",
                      label: "济世楼"
                    },
                    {
                      value: "KJL",
                      label: "科技楼"
                    },
                    {
                      value: "PFKDL",
                      label: "皮肤科大楼"
                    },
                    {
                      value: "xn",
                      label: "致远楼"
                    }
                  ]
                },
                {
                  label: "湖北省人民医院-东院",
                  value: "H002",
                  children: [
                    {
                      value: "DYQ",
                      label: "物理治疗（pt）科"
                    },
                    {
                      value: "EK",
                      label: "儿童康复科"
                    },
                    {
                      value: "FJK",
                      label: "康复辅具科"
                    },
                    {
                      value: "GKKF",
                      label: "骨科康复中心"
                    },
                    {
                      value: "LLK",
                      label: "理疗科"
                    },
                    {
                      value: "OT",
                      label: "作业治疗（OT）科"
                    },
                    {
                      value: "SJ",
                      label: "神经康复中心"
                    },
                    {
                      value: "SLK",
                      label: "水疗科"
                    },
                    {
                      value: "SM",
                      label: "睡眠障碍中心"
                    },
                    {
                      value: "TNK",
                      label: "推拿科"
                    },
                    {
                      value: "XFK",
                      label: "心肺康复科"
                    },
                    {
                      value: "XLK",
                      label: "心理治疗科"
                    },
                    {
                      value: "YYK",
                      label: "语言科"
                    },
                    {
                      value: "ZJK",
                      label: "针灸科"
                    },
                    {
                      value: "ZXY",
                      label: "中西医结合科"
                    },
                    {
                      value: "ZYK",
                      label: "中医科"
                    }
                  ]
                },
                {
                  label: "湖北省人民医院-洪山院区",
                  value: "H003",
                  children: [{ label: "-", value: "-" }]
                }
              ],
              tree: [
                {
                  label: "湖北省人民医院-本院",
                  value: "H001",
                  children: [
                    {
                      value: "ETYLZX",
                      label: "儿童医疗中心",
                      children: [
                        {
                          label: "小儿外科病房",
                          value: "1022202"
                        },
                        {
                          label: "儿保科",
                          value: "1022205"
                        },
                        {
                          label: "儿科Ⅰ病区",
                          value: "1040102"
                        },
                        {
                          label: "儿科Ⅱ病区",
                          value: "1040103"
                        },
                        {
                          label: "儿科Ⅲ病区",
                          value: "1040104"
                        },
                        {
                          label: "新生儿病区",
                          value: "1040117"
                        }
                      ]
                    },
                    {
                      value: "FCZX",
                      label: "妇产中心",
                      children: [
                        {
                          label: "产科病房",
                          value: "1030103"
                        },
                        {
                          label: "妇科病区10楼",
                          value: "1030135"
                        },
                        {
                          label: "妇科病区11楼",
                          value: "1030136"
                        },
                        {
                          label: "妇科病区13楼",
                          value: "1030137"
                        },
                        {
                          label: "妇科病区14楼",
                          value: "1030138"
                        },
                        {
                          label: "妇科病区12楼",
                          value: "1030139"
                        }
                      ]
                    },
                    {
                      value: "H001",
                      label: "测试数据",
                      children: []
                    },
                    {
                      value: "JADL",
                      label: "济安东楼",
                      children: [
                        {
                          label: "耳鼻喉病房",
                          value: "1090102"
                        },
                        {
                          label: "感染科Ⅰ病区",
                          value: "1120102"
                        },
                        {
                          label: "感染科Ⅱ病区",
                          value: "1120108"
                        },
                        {
                          label: "疼痛科病房",
                          value: "1160102"
                        }
                      ]
                    },
                    {
                      value: "JAXL",
                      label: "济安西楼",
                      children: [
                        {
                          label: "骨科Ⅱ病区病房(足踝、矫形外科)",
                          value: "1026002"
                        },
                        {
                          label: "眼科病房",
                          value: "1080102"
                        },
                        {
                          label: "儿少心理病区",
                          value: "1290106"
                        }
                      ]
                    },
                    {
                      value: "JKL",
                      label: "济康楼",
                      children: [
                        {
                          label: "肾病内科病房",
                          value: "1010202"
                        },
                        {
                          label: "心内科Ⅰ病区",
                          value: "1010302"
                        },
                        {
                          label: "心内科Ⅱ病区",
                          value: "1010303"
                        },
                        {
                          label: "心内科Ⅲ病区",
                          value: "1010307"
                        },
                        {
                          label: "综合医疗科病房",
                          value: "1010702"
                        },
                        {
                          label: "全科医学科",
                          value: "1010707"
                        },
                        {
                          label: "肝胆胰Ⅰ病房",
                          value: "1020402"
                        },
                        {
                          label: "普外Ⅱ病区病房",
                          value: "1020502"
                        },
                        {
                          label: "乳腺甲状腺血管外科一病区",
                          value: "1020602"
                        },
                        {
                          label: "乳腺甲状腺血管外科二病区",
                          value: "1020609"
                        },
                        {
                          label: "泌尿外科病房",
                          value: "1020902"
                        },
                        {
                          label: "胸心外科Ⅰ病区病房",
                          value: "1021103"
                        },
                        {
                          label: "胸心外科Ⅱ病区病房",
                          value: "1021104"
                        },
                        {
                          label: "中心ICU病房",
                          value: "1021202"
                        },
                        {
                          label: "普外Ⅳ病区病房",
                          value: "1021702"
                        },
                        {
                          label: "肝胆胰Ⅱ病房",
                          value: "1021802"
                        },
                        {
                          label: "肿瘤科Ⅰ病区病房",
                          value: "1150104"
                        },
                        {
                          label: "肿瘤科Ⅱ病区病房",
                          value: "1150105"
                        },
                        {
                          label: "肿瘤科Ⅲ病区病房",
                          value: "1150106"
                        },
                        {
                          label: "肿瘤科Ⅳ病区病房",
                          value: "1150107"
                        },
                        {
                          label: "介入病房",
                          value: "2040502"
                        }
                      ]
                    },
                    {
                      value: "JML",
                      label: "济民楼",
                      children: [
                        {
                          label: "骨科Ⅰ病区病房",
                          value: "1020102"
                        },
                        {
                          label: "手足显微骨科病房",
                          value: "1020202"
                        },
                        {
                          label: "骨科Ⅲ病区病房",
                          value: "1020302"
                        },
                        {
                          label: "骨科Ⅳ病区病房",
                          value: "1021502"
                        },
                        {
                          label: "骨科Ⅴ病区病房",
                          value: "1021602"
                        },
                        {
                          label: "骨科Ⅶ病区(脊柱微创)",
                          value: "1024002"
                        },
                        {
                          label: "骨科Ⅶ病区(运动医学)",
                          value: "1024003"
                        },
                        {
                          label: "整形美容烧伤科病房",
                          value: "1250102"
                        },
                        {
                          label: "核医学科病房",
                          value: "2060102"
                        }
                      ]
                    },
                    {
                      value: "JSL",
                      label: "济世楼",
                      children: [
                        {
                          label: "血液内科病房",
                          value: "1010102"
                        },
                        {
                          label: "消化内科Ⅱ病区",
                          value: "1010403"
                        },
                        {
                          label: "消化内科Ⅰ病区",
                          value: "1010408"
                        },
                        {
                          label: "消化内科Ⅲ病区",
                          value: "1010410"
                        },
                        {
                          label: "内分泌风湿病一病区",
                          value: "1010502"
                        },
                        {
                          label: "内分泌风湿病二病区",
                          value: "1010509"
                        },
                        {
                          label: "呼吸与危重症Ⅰ病区",
                          value: "1010606"
                        },
                        {
                          label: "呼吸与危重症Ⅱ病区",
                          value: "1010607"
                        },
                        {
                          label: "呼吸与危重症ICU病区",
                          value: "1010608"
                        },
                        {
                          label: "呼吸与危重症Ⅲ病区",
                          value: "1010609"
                        },
                        {
                          label: "口腔科病房",
                          value: "1100102"
                        },
                        {
                          label: "肿瘤科肿瘤微创病区",
                          value: "1150111"
                        },
                        {
                          label: "急诊ICU病房",
                          value: "1170102"
                        },
                        {
                          label: "中医综合科病房",
                          value: "8010602"
                        }
                      ]
                    },
                    {
                      value: "KJL",
                      label: "科技楼",
                      children: [
                        {
                          label: "脑血管疾病诊疗中心Ⅰ",
                          value: "1021902"
                        },
                        {
                          label: "脑血管疾病诊疗中心Ⅱ",
                          value: "1021904"
                        },
                        {
                          label: "神经肿瘤疾病诊疗中心",
                          value: "1022002"
                        },
                        {
                          label: "神经创伤及小儿神经疾病诊疗中心Ⅰ",
                          value: "1022102"
                        },
                        {
                          label: "神经创伤及小儿神经疾病诊疗中心Ⅱ",
                          value: "1022103"
                        },
                        {
                          label: "神经创伤及小儿神经疾病诊疗中心Ⅲ",
                          value: "1022104"
                        },
                        {
                          label: "神经重症医学科(ICU)",
                          value: "1025000"
                        },
                        {
                          label: "神经内科一病区(卒中中心)",
                          value: "1050102"
                        },
                        {
                          label: "神经内科二病区(卒中中心)",
                          value: "1050103"
                        },
                        {
                          label: "神经内科三病区(卒中中心)",
                          value: "1050112"
                        },
                        {
                          label: "神经内科四病区(帕金森、癫痫中心)",
                          value: "1050117"
                        },
                        {
                          label: "神经内科五病区(神经免疫、眩晕中心)",
                          value: "1050126"
                        },
                        {
                          label: "神经内科六病区(周围神经病、神经心理中心)",
                          value: "1050127"
                        },
                        {
                          label: "神经内科七病区(头痛、神经感染)",
                          value: "1050128"
                        }
                      ]
                    },
                    {
                      value: "PFKDL",
                      label: "皮肤科大楼",
                      children: [
                        {
                          label: "皮肤科Ⅱ病区",
                          value: "1110105"
                        },
                        {
                          label: "皮肤科Ⅰ病区",
                          value: "1110106"
                        }
                      ]
                    },
                    {
                      value: "xn",
                      label: "致远楼",
                      children: [
                        {
                          label: "疑难杂症专治1",
                          value: "kk"
                        }
                      ]
                    }
                  ]
                },
                {
                  label: "湖北省人民医院-东院",
                  value: "H002",
                  children: [
                    {
                      value: "DYQ",
                      label: "物理治疗（pt）科",
                      children: [{ label: "-", value: "-" }]
                    },
                    {
                      value: "EK",
                      label: "儿童康复科",
                      children: [
                        {
                          label: "儿童康复中心病房",
                          value: "8011202"
                        }
                      ]
                    },
                    {
                      value: "FJK",
                      label: "康复辅具科",
                      children: [{ label: "-", value: "-" }]
                    },
                    {
                      value: "GKKF",
                      label: "骨科康复中心",
                      children: [
                        {
                          label: "骨科康复中心Ⅰ病区病房",
                          value: "8010102"
                        },
                        {
                          label: "骨科康复中心Ⅱ病区病房",
                          value: "8010202"
                        },
                        {
                          label: "骨科康复中心Ⅲ病区病房",
                          value: "8010302"
                        }
                      ]
                    },
                    {
                      value: "LLK",
                      label: "理疗科",
                      children: []
                    },
                    {
                      value: "OT",
                      label: "作业治疗（OT）科",
                      children: []
                    },
                    {
                      value: "SJ",
                      label: "神经康复中心",
                      children: [
                        {
                          label: "神经康复中心Ⅰ病区病房",
                          value: "8011402"
                        },
                        {
                          label: "神经康复中心Ⅱ病区病房",
                          value: "8011502"
                        },
                        {
                          label: "神经康复中心Ⅲ病区病房",
                          value: "8011602"
                        }
                      ]
                    },
                    {
                      value: "SLK",
                      label: "水疗科",
                      children: []
                    },
                    {
                      value: "SM",
                      label: "睡眠障碍中心",
                      children: [
                        {
                          label: "睡眠心身医学中心病房",
                          value: "8010702"
                        }
                      ]
                    },
                    {
                      value: "TNK",
                      label: "推拿科",
                      children: []
                    },
                    {
                      value: "XFK",
                      label: "心肺康复科",
                      children: [
                        {
                          label: "心肺康复中心病房",
                          value: "8011302"
                        },
                        {
                          label: "心肺康复中心重症康复病房",
                          value: "8011306"
                        }
                      ]
                    },
                    {
                      value: "XLK",
                      label: "心理治疗科",
                      children: []
                    },
                    {
                      value: "YYK",
                      label: "语言科",
                      children: []
                    },
                    {
                      value: "ZJK",
                      label: "针灸科",
                      children: []
                    },
                    {
                      value: "ZXY",
                      label: "中西医结合科",
                      children: [
                        {
                          label: "中西医结合科(风湿、骨质疏松专业)",
                          value: "8010402"
                        },
                        {
                          label: "中西医结合科(肿瘤、胃肠专业)",
                          value: "8010502"
                        }
                      ]
                    },
                    {
                      value: "ZYK",
                      label: "中医科",
                      children: [
                        {
                          label: "中医部(东)病房",
                          value: "8010902"
                        }
                      ]
                    }
                  ]
                },
                {
                  label: "湖北省人民医院-洪山院区",
                  value: "H003",
                  children: [
                    {
                      value: "-",
                      label: "-",
                      children: [{ label: "-", value: "-" }]
                    }
                  ]
                }
              ]
            },
            defaultTxt: "湖北省人民医院-洪山院区 - -"
          },
          // regionList: {
          //   area: {
          //     two: [
          //       {
          //         label: "北京市",
          //         value: "110000",
          //         children: [
          //           {
          //             label: "北京市",
          //             value: "110100"
          //           }
          //         ]
          //       }
          //     ],
          //     tree: [
          //       {
          //         children: [
          //           {
          //             children: [
          //               {
          //                 label: "东城区",
          //                 value: "110101"
          //               },
          //               {
          //                 label: "西城区",
          //                 value: "110102"
          //               },
          //               {
          //                 label: "南城区",
          //                 value: "110103"
          //               }
          //             ],
          //             label: "北京市",
          //             value: "110100"
          //           }
          //         ],
          //         label: "北京市",
          //         value: "110000"
          //       }
          //     ]
          //   },
          //   defaultTxt: "院区一 院区二 院区三"
          // },
          // 地址列表
          addressList: [
            {
              label: "一级1",
              children: [
                {
                  label: "神经创伤及小儿神经疾病诊疗中心Ⅲ"
                },
                {
                  label: "骨科Ⅱ病区病房(足踝、矫形外科)"
                }
              ]
            },
            {
              label: "一级2",
              children: [
                {
                  label: "二级2"
                },
                {
                  label: "二级3"
                }
              ]
            },
            {
              label: "一级3",
              children: [
                {
                  label: "三级级1"
                },
                {
                  label: "三级3"
                }
              ]
            }
          ]
        }
      }
    };
  }
};
