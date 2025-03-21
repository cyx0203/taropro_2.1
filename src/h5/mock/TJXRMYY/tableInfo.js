import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({
        
        tableData: {
          isEmpty: "N",
          // 表格头部
          tableHeader: [
            {
              tName: "项目名称",
              tWidth: "40%",
              align: "left",
              bgcolor: "",
              color: ""
            },
            {
              tName: "数量",
              tWidth: "30%",
              align: "center",
              bgcolor: "",
              color: ""
            },
            {
              tName: "单价",
              tWidth: "30%",
              align: "right",
              bgcolor: "",
              color: "red"
            }
          ],
          // 表格内容
          dataList: [
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"],
            ["张三", "4支", "24.55"],
            ["李四", "6支", "434.55"],
            ["王五", "11支", "24.55"]
          ]
        }
        // 表格内容
        
      });
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/tableInfo/index",
        title: "表格",
        wxcall: {
          // 时间选择器
          onDateClick: (type, item) => {
            console.log("时间选择");
            console.log(type);
            console.log(item);
          }
        },
        data: {
          // 时间选择器 注释则不显示
          dateSelector: {
            isShow: true,
            // 筛选开始时间
            startDate: "2022-04-26",
            // 筛选结束时间
            endDate: "2022-05-26"
          },
          total: 123,
          tableData: {
            isEmpty: "N",
            // 表格头部
            tableHeader: [
              {
                tName: "项目名称",
                tWidth: "40%",
                align: "left",
                bgcolor: "",
                color: ""
              },
              {
                tName: "数量",
                tWidth: "30%",
                align: "center",
                bgcolor: "",
                color: ""
              },
              {
                tName: "单价",
                tWidth: "30%",
                align: "right",
                bgcolor: "",
                color: "red"
              }
            ],
            // 表格内容
            dataList: [
              ["张三", "4支", "24.55"],
              ["李四", "6支", "434.55"],
              ["王五", "11支", "24.55"]
            ]
          }
        }
      }
    };
  }
};
