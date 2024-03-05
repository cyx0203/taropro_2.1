import { UpateCurrentPageData } from "../../../core/engine";
import mjcom from "@/GGCore/mjcommon";

import GPage from "../../../core/page";
const RES = GPage.param.resUrl;
// used
export const main = class {
  static data() {
    setTimeout(() => {
      UpateCurrentPageData({});
    }, 3000);
    return {
      type: "flex",
      config: {
        mod: "h5/pages/TJXRMYY/patientIDcard/index",
        title: "就诊卡管理",
        wxcall: {
          // 卡片点击事件
          onItemClick: (item, index) => {
            console.log("点击卡片");
            console.log("==onItemClick==");
            console.log(item, index);
          },
          // 设为默认点击事件
          onDefaultClick: (item, index) => {
            console.log("设为默认");
            console.log("==onDefaultClick==");
            console.log(item, index);
          },
          // 底部按钮添加卡片点击事件
          onAddClick: () => {
            console.log("新增");
            console.log("==onAddClick==");
            UpateCurrentPageData({
              userCardData: {
                // 是否有无卡片
                isEmpty: "Y",
                emptyTips: "暂未添加用户就诊卡",
                // 卡片信息
                cardList: [
                  {
                    // 相关部门
                    leftLine: "四川省卫生检查委员会",
                    // 第一行
                    firstLine: {
                      key: "姓名",
                      value: "张三"
                    },
                    // 第二行
                    secondLine: {
                      key: "卡号",
                      value: "123456789012345"
                    },
                    // 是否被选中
                    default: true,
                    // 背景图
                    bgImg: `${RES}/assets/img/ecard-03.png`,
                    // 单选按钮文字
                    activeText: "选中"
                  },
                  {
                    // 相关部门
                    leftLine: "通江县人民医院",
                    // 第一行
                    firstLine: {
                      key: "姓名",
                      value: "李四"
                    },
                    // 第二行
                    secondLine: {
                      key: "卡号11",
                      value: "66666666666666"
                    },
                    // 是否被选中
                    default: false,
                    // 背景图
                    bgImg: `${RES}/assets/img/ecard-06.png`,
                    // 单选按钮文字
                    activeText: "设为默认"
                  }
                ]
              },

              // 底部按钮  -注释则不显示按钮
              footerBtn: "添加1111就诊人",
              // 未添加就诊卡
          resultData: {
            icon: "@success",
            title: "请添加就1111诊卡"
          },
            });
          }
        },
        data: {
          // 未添加就诊卡
          resultData: {
            icon: "@empty",
            title: "请添加就诊卡"
          },
          userCardData: {
            // 是否有无卡片
            isEmpty: "Y",
            emptyTips: "暂未添加用户就诊卡",
            // 卡片信息
            cardList: [
              {
                // 相关部门
                leftLine: "四川省卫生检查委员会",
                // 第一行
                firstLine: {
                  key: "姓名",
                  value: "张三"
                },
                // 第二行
                secondLine: {
                  key: "卡号",
                  value: "123456789012345"
                },
                // 是否被选中
                default: true,
                // 背景图
                bgImg: `${RES}/assets/img/ecard-03.png`,
                // 单选按钮文字
                activeText: "选中"
              },
              {
                // 相关部门
                leftLine: "通江县人民医院",
                // 第一行
                firstLine: {
                  key: "姓名",
                  value: "李四"
                },
                // 第二行
                secondLine: {
                  key: "卡号11",
                  value: "66666666666666"
                },
                // 是否被选中
                default: false,
                // 背景图
                bgImg: `${RES}/assets/img/ecard-06.png`,
                // 单选按钮文字
                activeText: "设为默认"
              }
            ]
          },
          // 底部按钮  -注释则不显示按钮
          footerBtn: "添加就诊人"
        }
      }
    };
  }
};
