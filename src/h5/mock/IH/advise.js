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
        mod: "h5/pages/IH/advise/index",
        title: "提意见",
        wxcall: {
          // 表单提交点击事件
          submitClick: item => {
            console.log(item);
          },

          // 反馈信息详情查看
          checkClick: (item, index, btn,btnIndex) => {
            console.log(item, index, btn,btnIndex);
          }
        },
        data: {
          hasUpDateImg: true, //是否有图片上传模块
          tabList: [{ title: "发布栏" }, { title: "反馈信息" }], //标签页内容
          tabCurrent: 1, //控制标签页
          adviseType: [
            //类型选择
            { label: "意见信", value: "1" },
            { label: "其他", value: "2" }
          ],
          // 反馈意见数据列表
          adviseDataList: [
            {
              title: "来自：张三",
              status: "已处理",
              info: [
                { label: "类别", value: "意见信" },
                { label: "创建时间", value: "2021-09-08 16:22:22" }
              ],
              btns: [{ txt: "查看" }]
            },
            {
              title: "来自：张三",
              status: "已处理",
              info: [
                { label: "类别", value: "意见信" },
                { label: "创建时间", value: "2021-09-08 16:22:22" }
              ],
              btns: [{ txt: "查看" }, { txt: "按钮" }]
            }
          ]
        }
      }
    };
  }
};
