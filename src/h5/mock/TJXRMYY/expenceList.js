import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    // setTimeout(() => {
    //     UpateCurrentPageData({
    //         //Todo
    //     });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/expenceList/index",
        title: "费用清单",
        wxcall: {
          // 时间选择器
          onDateClick: (type,item) => {
            console.log('时间选择');
            console.log(type)
            console.log(item);
          },
          // 查看详情
          onCheckDetail: (item, index) => {
            console.log('查看详情');
            console.log(item, index);
          },
        },
        data: {
          // 时间选择器 注释则不显示
          dateSelector: {
            // 筛选开始时间
            startDate: "2022-04-26",
            // 筛选结束时间
            endDate: "2022-05-26"
          },
          // 卡片数据列表
          recordsArea: {
            // 记录是否为空
            isEmpty: "N",
            // 为空的提示语
            emptyTips: "暂未查询到充值记录",

            // 底部按钮，不配置则不显示按钮
            footerBtn:'查看详情',
            // 列表内容
            listData: [
              // 第一张卡片内容
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "这是一段很长很长很长很长很长很长的文字"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              },
              {
                content: [
                  {
                    icon:  `${RES}/assets/icon/listing-01.png`,
                    label: "项目名称",
                    value: "收取（现金）"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-02.png`,
                    label: "项目金额",
                    value: "2000元"
                  },
                  {
                    icon:  `${RES}/assets/icon/listing-03.png`,
                    label: "项目时间",
                    value: "2022-04-26"
                  }
                ]
              }
            ]
          },
          // 查看详情具体内容
          recordDetail: {
            isShow: "N",
            head: [
              {
                title: "处方名称",
                ratio: 0.4,
                align: "center"
              },
              {
                title: "单价",
                ratio: 0.2,
                align: "center"
              },
              {
                title: "数量",
                ratio: 0.2,
                align: "center"
              },
              {
                title: "总额",
                ratio: 0.2,
                align: "center"
              }
            ],
            body: [
              {
                // 药品名称
                drug: "云南白药",
                // 药品单价
                price: "20.00",
                // 数量
                number: "×2",
                // 总额
                total: "40.00"
              },
              {
                drug: "云南白药",
                price: "20.00",
                number: "×2",
                total: "40.00"
              },
              { drug: "云南白药", price: "20.00", number: "×2", total: "40.00" }
            ]
          }
        }
      }
    };
  }
};
