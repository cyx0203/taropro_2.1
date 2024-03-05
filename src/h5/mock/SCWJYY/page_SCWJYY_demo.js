import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const SCWJYY_Demo = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/SCWJYY/demo/index",
        title: "测试",
        wxcall: {
          // 顶部日期选择点击事件
          onDateClick: (item, index) => {
            console.log("datebar", item, index);
          },
          //医生卡片点击事件
          onSelectDoctor: (item, index) => {
            console.log("SelectDoctor", item, index);
            // UpateCurrentPageData({
            //   appointTime_Area: {
            //     isShow: "Y",
            //     // （选填）是否列表数据为空，空=Y 则显示未查询对应信息；其他为非空，显示列表
            //     isEmpty: "N",
            //     // （选填）空列表时显示的信息，不填显示 未找到数据
            //     emptyTips: "暂未查询到预约时间详情",

            //     // 当前日期
            //     time: "2022-04-26",
            //     // 当前科室
            //     dept: "消化内科",
            //     // 预约挂号时间表表头
            //     head: [
            //       {
            //         // 表头文字
            //         title: "时间段",
            //         // 该列在表格中的占比
            //         ratio: 0.4,
            //         // 表格内容对齐方式
            //         align: "center"
            //       },
            //       {
            //         title: "余号",
            //         ratio: 0.3,
            //         align: "center"
            //       },
            //       {
            //         title: "",
            //         ratio: 0.3,
            //         align: "right"
            //       }
            //     ],
            //     // 预约挂号时间表内容,为[{}]则没有内容
            //     body: [
            //       {
            //         // 时间段
            //         testItem: "13：00-14：00",
            //         // 余号
            //         res: "11余2222"
            //       },
            //       { testItem: "13：00-14：00", res: "111余2222" },
            //       { testItem: "13：00-14：00", res: "111余222" }
            //     ],
            //     // 预约按钮区域,不填则没有按钮
            //     optBtns: [
            //       {
            //         text: "预约"
            //       }
            //     ]
            //   }
            // });
          },
          // 预约时间选择点击事件
          onAppTime: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          // 日期选择数据
          datebar: {
            listData: [
              {
                //[*] 星期
                week: "周二",
                //[*] 显示日期
                date: "12-21",
                //[*] 是否被选中
                active: true
              },
              { week: "周三", date: "12-22" },
              { week: "周四", date: "12-23" },
              { week: "周五", date: "12-24" }
            ]
          },
          
          // 医生卡片信息数组
          doctorInfo_Area: {
            // （选填）是否列表数据为空，空=Y 则显示未查询对应信息；其他为非空，显示列表
            isEmpty: "N",
            // （选填）空列表时显示的信息，不填显示 未找到数据
            emptyTips: "暂未查询到医生信息",
            //列表数组
            listData: [
              {
                // 头像
                icon: `${RES}/assets/img/headtest.jpg`,
                // 姓名
                title: "张三",
                // 职位
                subtitle: "消化内科|主任医师",
                // 等级
                tag: ["专家"],
                // 介绍
                contents: [
                  {
                    label: "",
                    value:
                      "<span style='font-weight:600;font-size:13px'>专业特长：</span>医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介"
                  }
                ],
                // 卡片右侧按钮(选填）最多显示2个按钮，注释则不显示按钮
                btns: [{ id: "app", btnName: "预约" }]
              },
              {
                // 头像
                icon: `${RES}/assets/icon/doctor.png`,
                // 姓名
                title: "张三",
                // 职位
                subtitle: "消化内科|主任医师",
                // 等级
                tag: ["专家"],
                // 介绍
                contents: [
                  {
                    label: "",
                    value:
                      "<span style='font-weight:600;font-size:13px'>专业特长：</span>医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介"
                  }
                ],
                // 卡片右侧按钮(选填）最多显示2个按钮，注释则不显示按钮
                btns: [{ id: "app", btnName: "预约" }]
              },
              {
                // 头像
                icon: `${RES}/assets/icon/doctor.png`,
                // 姓名
                title: "张三",
                // 职位
                subtitle: "消化内科|主任医师",
                // 等级
                tag: ["专家"],
                // 介绍
                contents: [
                  {
                    label: "",
                    value:
                      "<span style='font-weight:600;font-size:13px'>专业特长：</span>医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介"
                  }
                ],
                // 卡片右侧按钮(选填）最多显示2个按钮，注释则不显示按钮
                btns: [{ id: "app", btnName: "预约" }]
              }
            ]
          },
          appointTime_Area: {
            isShow: "Y",
            // （选填）是否列表数据为空，空=Y 则显示未查询对应信息；其他为非空，显示列表
            isEmpty: "N",
            // （选填）空列表时显示的信息，不填显示 未找到数据
            emptyTips: "暂未查询到预约时间详情",

            // 当前日期
            time: "2022-04-26",
            // 当前科室
            dept: "消化内科",
            // 预约挂号时间表表头
            head: [
              {
                // 表头文字
                title: "时间段",
                // 该列在表格中的占比
                ratio: 0.4,
                // 表格内容对齐方式
                align: "center"
              },
              {
                title: "余号",
                ratio: 0.3,
                align: "center"
              },
              {
                title: "",
                ratio: 0.3,
                align: "right"
              }
            ],
            // 预约挂号时间表内容,为[{}]则没有内容
            body: [
              {
                // 时间段
                testItem: "13：00-14：00",
                // 余号
                res: "余2"
              },
              { testItem: "13：00-14：00", res: "余2" },
              { testItem: "13：00-14：00", res: "余2" }
            ],
            // 预约按钮区域,不填则没有按钮
            optBtns: [
              {
                text: "预约"
              }
            ]
          },
        }
      }
    };
  }
};
