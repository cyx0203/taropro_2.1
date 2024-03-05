import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";
import GPage from "../../../core/page";
const RES = GPage.param.resUrl;

export const main = class {
  static data() {
    //延迟性模拟测试
    setTimeout(() => {
      UpateCurrentPageData({});
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/itemList/index",
        title: "项目列表",
        wxcall: {
          // 项目点击事件
          onItemClick: (item, index) => {
            console.log("项目点击");
            console.log(item, index);
          },
          // 具体项目取消按钮点击事件
          cancelItemClick: (item, index) => {
            console.log("取消");
            console.log(item, index);
          },
          // 套餐取消按钮点击事件
          cancelGetherClick: item => {
            console.log("套餐取消");
            console.log(item);
          },
          // 底部确认按钮点击事件
          footerBtnClick:() => {
            console.log('确认')
          }
        },
        data: {
          // 总计金额
          totalAmount: "6666",
          footerBtn: "确认",
          // 套餐项目数据
          getherContentData: {
            id: 1,
            title: "套餐一(女)",
            operation: "取消",
            operation_color: 0, // 0-红色 1-灰色
            isEmpty: "Y",
            listData: [
              {
                // 唯一标识
                id: 1,
                // 项目名称
                name: "血液常规(五分类)+血液常规(五分类)",
                // 单价
                univalence: "18",
                // 操作按钮文字
                operation: "取消",
                operation_color: 0 // 0-红色 1-灰色
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              }
            ],
            // 总计
            total: "666"
          },
          // 单项项目数据
          singleContentData: {
            isEmpty: "N",
            listData: [
              {
                // 唯一标识
                id: 1,
                // 项目名称
                name: "血液常规(五分类)+血液常规(五分类)",
                // 单价
                univalence: "18",
                // 操作按钮文字
                operation: "取消",
                operation_color: 0 // 0-红色 1-灰色
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
              {
                id: 2,
                name: "CT脊柱胸腰段平扫",
                univalence: "18",
                operation: "取消",
                operation_color: 1
              },
              {
                id: 3,
                name: "DR胸部正侧位",
                univalence: "18",
                operation: "取消",
                operation_color: 0
              },
            ]
          },
          // 当isEmpty为Y时
          resultData: {
            icon: "@empty",
            title: "暂未查询到内容"
          }
        }
      }
    };
  }
};
