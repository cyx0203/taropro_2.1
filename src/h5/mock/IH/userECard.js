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
        mod: "h5/pages/IH/userECard/index",
        title: "用户就诊卡",
        wxcall: {
          // 添加就诊卡
          addUserCard: () => {
            console.log("添加就诊卡");
          },
          otherClick:() => {
            console.log('额外按钮点击事件')
          },
          // 卡片内二维码点击事件
          cardClick: () => {
            console.log("卡片点击事件");
          },
          // 设为默认点击事件
          defaultClick: item => {
            console.log("设为默认的用户就诊卡", item);
          }
        },
        data: {
          userCardData: {
            // 是否有无卡片
            isEmpty: "N",
            // 卡片信息
            cardList: [
              {
                // 相关部门
                // leftLine: "四川省卫生检查委员会",
                // 卡片上关键信息
                // 第一行
                firstLine: {
                  key: "姓名：",
                  value: "张三"
                },
                // 第二行
                secondLine: {
                  key: "卡号",
                  value: "123456789012345"
                },
                // 是否被选中
                default: true,
                // 卡片背景图
                bgImg: `${RES}/assets/img/ecard-01.png`,
                //单选按钮的文字
                activeText: "选中"
              },
              {
                leftLine: "通江县人民医院",
                firstLine: {
                  key: "姓名：",
                  value: "李四"
                },
                // 第二行
                secondLine: {
                  key: "卡号",
                  value: "8899888899"
                },
                // 是否被选中
                default: false,
                // 卡片背景图
                bgImg: `${RES}/assets/img/ecard-02.png`,
                //单选按钮的文字
                activeText: "设为默认"
              }
            ]
          },
          // 底部按钮  -注释则不显示按钮
          footerBtn: "添加就诊人",
          footerBtnOther: "另一个按钮",
          // 当isEmpty为Y时
          resultData: {
            icon: "@empty",
            title: "暂未添加就诊卡"
          }
        }
      }
    };
  }
};
