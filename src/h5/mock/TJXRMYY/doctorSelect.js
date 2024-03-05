import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    // setTimeout(() => {
    //   UpateCurrentPageData({
    //     // searchPlaceholder: '???????'
    //   });
    // }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/doctorSelect/index",
        title: "医生选择",
        wxcall: {
          // 顶部日期选择点击事件
          onDateClick: (item, index) => {
            console.log("datebar", item, index);
          },
          // 卡片预约点击事件
          onMainAppClick: (item, index) => {
            console.log(item, index);
          },
          // 弹框预约点击事件
          onSubAppClick: (item, index) => {
            console.log(item, index);
          },
          // 详细预约时间点击事件
          onDetailTimeClick: (item, index) => {
            console.log(item, index);
          },
          // 预约时间 noon 点击事件
          onNoonTimeClick: (item, index) => {
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
            emptyIcon: `${RES}/assets/img/empty.png`,
            //列表数组
            cardList: [
              //第一张卡片
              {
                accordion: true,
                // 卡片医生信息
                listData: [
                  {
                    // 头像
                    icon: `${RES}/assets/img/nrhc.png`,
                    defaultIcon: `${RES}/assets/img/doctor.svg`,
                    // 姓名
                    title: "张三1",
                    // 职位
                    subtitle:
                      "消化内科|主任医师消化内科|主任医师消化内科|主任医师消化内科|主任医师消化内科|主任医师",
                    // 介绍
                    contents: [
                      { label: "总好袁术", value: "30个" },
                      { label: "挂号费用", value: "30元" },
                      {
                        label: "医生介绍",
                        value:
                          "科室首席专家主任医师科室首席专家主任医师甲级学科带头人  湖北省呼吸病理生理基层联盟委员，恩施州呼吸病学会副主任委员，恩施州感染病学会常务理事，恩施州医疗鉴定委员会专家库成员。从事呼吸内科工作30余年，于1998年在华中科技大学同济医学院附属同济医院呼吸内科进修1年，2013年在广州呼吸疾病研究所重症病区进修学习半年。在抢救急慢性呼吸衰竭、重度支气管哮喘等危重症方面积累了丰富的临床经验，特别是在支气管镜下治疗胸膜疾病方面取得了很好的效果，深受广大患者的信赖。多次参加全国性的学术交流活动，在省级以上学术刊物上发表论文10余篇。其主持的纤支镜代胸腔镜在不明胸腔积液中的应用等科研项目获得恩施市科技成果三等奖。"
                      }
                    ],
                    btns: [{ id: "app", btnName: "按钮",disabled:true }]
                  }
                ],
                // 卡片底部信息
                footerData: {
                  isEmpty: "Y",
                  content: [
                    {
                      noon: "上午",
                      type: "普通",
                      number: "1",
                      money: "20.00",
                      btn: "预约"
                    },
                    {
                      noon: "下午",
                      type: "特殊",
                      number: "10",
                      money: "40.00",
                      btn: "预约"
                    }
                  ]
                }
              },
              {
                accordion: true,
                // 卡片医生信息
                listData: [
                  {
                    // 头像
                    icon: `${RES}/assets/img/doctor01.png`,
                    defaultIcon: `${RES}/assets/img/doctor.svg`,
                    // 姓名
                    title: "张三2",
                    // 职位
                    subtitle: "消化内科|主任医师",
                    // 介绍
                    contents: [
                      {
                        label: "简介",
                        value:
                          "一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾一二三肆伍陆柒捌玖拾"
                      }
                    ],
                    btns: [{ id: "app", btnName: "按钮" }]
                  }
                ],
                // 卡片底部信息
                footerData: {
                  isEmpty: "Y",
                  content: [
                    {
                      noon: "上午",
                      type: "普通",
                      number: "1",
                      money: "20.00",
                      btn: "预约"
                    },
                    {
                      noon: "下午",
                      type: "特殊",
                      number: "10",
                      money: "40.00",
                      btn: "预约"
                    }
                  ]
                }
              },
              {
                accordion: true,
                listData: [
                  {
                    // 头像
                    icon: `${RES}/assets/img/doctor01.png`,
                    defaultIcon: `${RES}/assets/img/doctor.svg`,
                    // 姓名
                    title: "李四3",
                    // 职位
                    subtitle: "消化内科|主任医师",
                    // 介绍
                    contents: [
                      {
                        label: "简介",
                        value:
                          "医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介医生简介"
                      }
                    ],
                    btns: [{ id: "app", btnName: "按钮" }]
                  }
                ],
                footerData: {
                  isEmpty: "N",
                  content: [
                    {
                      noon: "上午",
                      type: "普通",
                      number: "1",
                      money: "20.00",
                      btn: "预约"
                    },
                    {
                      noon: "下午",
                      type: "特殊",
                      number: "10",
                      money: "40.00",
                      btn: "预约"
                    }
                  ]
                }
              }
            ]
          },
          // appointTime_Area: {
          //   isShow: "Y",
          //   // （选填）是否列表数据为空，空=Y 则显示未查询对应信息；其他为非空，显示列表
          //   isEmpty: "N",
          //   // （选填）空列表时显示的信息，不填显示 未找到数据
          //   emptyTips: "暂未查询到预约时间详情",
          //   // 预约挂号时间表表头
          //   head: [
          //     {
          //       // 表头文字
          //       title: "时间段",
          //       // 该列在表格中的占比
          //       ratio: 0.4,
          //       // 表格内容对齐方式
          //       align: "center"
          //     },
          //     {
          //       title: "余号",
          //       ratio: 0.3,
          //       align: "center"
          //     },
          //     {
          //       title: "",
          //       ratio: 0.3,
          //       align: "right"
          //     }
          //   ],
          //   // 预约挂号时间表内容,为[{}]则没有内容
          //   body: [
          //     {
          //       // 时间段
          //       testItem: "13：00-14：00",
          //       // 余号
          //       res: "余2"
          //     },
          //     { testItem: "13：00-14：00", res: "余2" },
          //     { testItem: "13：00-14：00", res: "余2" }
          //   ],
          //   // 预约按钮区域,不填则没有按钮
          //   optBtns: [
          //     {
          //       text: "预约"
          //     }
          //   ]
          // },
          // 预约时间段弹窗信息，注释则不显示弹框
          subscribeFloatData: {
            // 是否显示弹框
            isShow: "Y", // Y -显示  N -不显示
            title: "时间选择"
          },
          // 预约时间段信息
          subscribeNoonTime: {
            // 是否有预约时间段
            isEmpty: "Y", // Y -没有   N-有
            content: [
              {
                // 余号数量
                // number: "20",
                // 时间段
                noon: "上午"
              },
              { number: "20", noon: "下午" },
              { number: "20", noon: "晚上" }
            ]
          },
          // 预约时间具体信息
          subscribeDetailTime: {
            // 是否有详细预约时间段
            isEmpty: "N", // Y -没有   N-有
            content: [
              {
                // 预约详细时间
                time: "12:00-13:00",
                // 点击事件按钮文字
                btn: "确定",
                //
                number: "序号：20"
              },
              { time: "12:00-13:00", btn: "确定", number: "序号：20" },
              { time: "12:00-13:00", btn: "确定", number: "序号：20" },
              { time: "12:00-13:00", btn: "确定", number: "序号：20" },
              { time: "12:00-13:00", btn: "确定", number: "序号：20" }
            ]
          }
        }
      }
    };
  }
};
