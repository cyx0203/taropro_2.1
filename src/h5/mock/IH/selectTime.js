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
        mod: "h5/pages/IH/selectTime/index",
        title: "选择排班时间",
        wxcall: {
          onDateClick: (item, index) => {
            console.log(item, index);
          },
          timeOnClick:(item,index) => {
            mjcom.GotoMockPage(
              `h5/mock/IH/result.js`,
              "main"
            );
            console.log(item,index)
          },
          cardOnClick:(item,index) => {
            console.log(item,index)
          }
        },
        data: {
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
          dataList: [
            {
              // 头像
              img: `${RES}/assets/img/doctor01.png`,
              // 姓名
              title: "李四",
              tag: "主任医师",
              subTitle:
                "衣原体感染引起的宫颈糜烂、宫颈炎、月经不调、阴道炎、盆腔炎、白带异常、外阴瘙痒、生殖器疱疹等各种妇科疑难杂症",
              badge: {
                disabled: true,
                text: "约满"
              },
              timeList: [
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "10:00-10:15" }
                // { value: "09:00-09:05" }
              ]
            },
            {
              // 头像
              img: `${RES}/assets/img/doctor01.png`,
              // 姓名
              title: "李四",
              tag: "主任医师",
              subTitle:
                "衣原体感染引起的宫颈糜烂、宫颈炎、月经不调、阴道炎、盆腔炎、白带异常、外阴瘙痒、生殖器疱疹等各种妇科疑难杂症",
              badge: {
                disabled: true,
                text: "约满"
              },
              timeList: [
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "09:00-09:15" },
                { value: "09:15-09:30" },
                { value: "09:45-10:00" },
                { value: "10:00-10:15" }
                // { value: "09:00-09:05" }
              ]
            },
          ]
        }
      }
    };
  }
};
