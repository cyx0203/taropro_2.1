import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/selectDoctorTime/index",
        title: "选择单个医生的排班时间",
        wxcall: {
          // 外部点击事件
          // 【展示更多数据点击事件】
          moreOnClick: () => {
            console.log("更多");
            UpateCurrentPageData({
              mainDataList: {
                title: "2023年03月20日 星期一",
                dataList: [
                  {
                    content1: "上午 08:00~09:00",
                    content2: "专家门诊<span style='color:red'>￥26.80</span>",
                    btn: "余33"
                  },
                  {
                    content1: "上午 08:00~09:00",
                    content2: "专家门诊<span style='color:red'>￥26.80</span>"
                    // btn: "余3"
                  },
                  {
                    content1: "上午 08:00~09:00"
                    // info2: "专家门诊<span style='color:red'>￥26.80</span>",
                    // btn: "余3"
                  },
                  {
                    content1: "上午 08:00~09:00"
                    // info2: "专家门诊<span style='color:red'>￥26.80</span>",
                    // btn: "余3"
                  },
                  {
                    content1: "上午 08:00~09:00",
                    content2: "专家门诊<span style='color:red'>￥26.80</span>",
                    btn: "余3"
                  },
                  {
                    content1: "上午 08:00~09:00",
                    content2: "专家门诊<span style='color:red'>￥26.80</span>"
                  },
                  {
                    content1: "上午 08:00~09:00"
                  },
                  {
                    content1: "上午 08:00~09:00"
                  }
                ]
              }
            });
          },
          // 【收藏医生点击事件】
          focusOnClick: status => {
            console.log("收藏", status);
          },
          // 【日期选择点击事件】
          dateOnClick: (item, index) => {
            console.log(item, index);
          },
          // 【主数据列表按钮点击事件】
          mainDataOnClick: (item, index) => {
            console.log(item, index);
          },
          // 【副数据列表按钮点击事件】
          subDataOnClick: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          datebar1: {
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
              { week: "周五", date: "12-24" },
              { week: "周三", date: "12-22" },
              { week: "周四", date: "12-23" },
              { week: "周五", date: "12-24" },
              { week: "周三", date: "12-22" },
              { week: "周四", date: "12-23" },
              { week: "周五", date: "12-24" },
              { week: "周三", date: "12-22" },
              { week: "周四", date: "12-23" },
              { week: "周五", date: "12-24" }
            ]
          },
          doctorObj: {
            img: `${RES}/assets/icon/doctorPic-01.svg`,
            name: "陈大礼",
            subTitle: "主任医师|骨科",
            infoList: [
              {
                label: "专业专长",
                value:
                  "衣原体感染引起的宫颈糜烂、宫颈炎、月经不调、阴道炎、盆腔炎、白带异常、外阴瘙痒、生殖器疱疹等各种妇科疑难杂症"
              },
              {
                label: "个人简介",
                value:
                  "妇科资深专家，毕业于黑龙江省佳木斯医学院，从事妇科疑难病症临床治疗与研究近20年，理论功底扎实，经验丰富，对妇科疾病的诊治有独到之处。擅长用多维疗法治疗各种细菌性感染。"
              }
            ],
            isStar: false
          },
          mainList: {
            title: "2023年03月20日 星期一",
            dataList: [
              {
                content1: "上午 08:00~09:00",
                content2: "专家门诊<view style='color:red'>￥26.80</view>",
                btn: "余3"
              },
              {
                content1: "上午 08:00~09:00",
                content2: "专家门诊<view style='color:red'>￥26.80</view>"
                // btn: "余3"
              },
              {
                content1: "上午 08:00~09:00"
                //content2: "专家门诊<span style='color:red'>￥26.80</span>",
                // btn: "余3"
              },
              {
                content1: "上午 08:00~09:00"
                // content2: "专家门诊<span style='color:red'>￥26.80</span>",
                // btn: "余3"
              }
            ]
          },
          moreBtnText: "查看全部排班",
          subList: {
            title: "选择就诊时间",
            subTitle: "2023年03月22日 星期一",
            dataList: [
              { value: "09:00-09:15", active: true },
              { value: "09:15-09:30", disabled: true },
              { value: "09:45-10:00" },
              { value: "10:00-10:15" },
              { value: "10:30-10:45" },
              { value: "11:00-11:15" },
              { value: "11:30-11:45" },
              { value: "12:00-09:05" }
              // { value: "09:00-09:05" }
            ]
          }
        }
      }
    };
  }
};
