import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        // searchPlaceholder: '???????'
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/deptSelect/index",
        title: "科室选择",
        wxcall: {
          // 顶部日期选择点击事件
          onDateClick: (item, index) => {
            console.log("datebar", item, index);
          },
          //   搜索框
          searchClick: value => {
            console.log(value);
          },
          // 一级科室点击事件
          onMainDeptClick:(item) => {
            console.log(item);
          },
          // 二级科室选择点击事件
          onSubDeptClick: (item1) => {
            console.log(item1);
          }
        },
        data: {
          // 搜索框内文字
          searchPlaceholder: "搜索医生、科室",
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
          deptDataArea: {
            // 需要二级科室时，main_dept&sub_dept都需要配置
            // 不需要二级科室时，将main_dept注释掉
            //主科室名称
            // main_dept: [
            //   { title: "全部",active:true },
            //   { title: "内科" },
            //   { title: "五官科" },
            //   { title: "中医科" },
            //   { title: "妇科" },
            //   { title: "新生儿科" },
            //   { title: "五官科" },
            //   { title: "中医科" },
            //   { title: "妇科" },
            //   { title: "新生儿科" },
            //   { title: "五官科" },
            //   { title: "中医科" },
            //   { title: "妇科" },
            //   { title: "新生儿科" },
            //   { title: "五官科" },
            //   { title: "中医科" },
            //   { title: "妇科" },
            //   { title: "新生儿科" },
            //   { title: "五官科" },
            //   { title: "中医科" },
            //   { title: "妇科" },
            //   { title: "新生儿科" },
            //   { title: "外科" ,active:true},
            // ],
            // 二级科室名称
            sub_dept: [
              { dept_name: "小儿外科" },
              { dept_name: "脑外科" },
              { dept_name: "产科" },
              { dept_name: "中科" },
              { dept_name: "妇科" },
              { dept_name: "小儿外科" },
              { dept_name: "脑外科" },
              { dept_name: "产科" },
              { dept_name: "中科" },
              { dept_name: "妇科" },
              { dept_name: "小儿外科" },
              { dept_name: "脑外科" },
              { dept_name: "产科" },
              { dept_name: "中科" },
              { dept_name: "妇科" },
              { dept_name: "小儿外科" },
              { dept_name: "脑外科" },
              { dept_name: "产科" },
              { dept_name: "中科" },
              { dept_name: "妇科" },
              { dept_name: "小儿外科" },
              { dept_name: "脑外科" },
              { dept_name: "产科" },
              { dept_name: "中科" },
              { dept_name: "妇科" },
              { dept_name: "外科" }
            ]
          }
        }
      }
    };
  }
};
