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
    const eHealthCardList = [
      {
        bgUrl: `${RES}/assets/img/healthCardBg-check.png`,
        headline: `四川省卫生健康委员会`,
        infoList: [
          {
            label: "姓名",
            value: "张三",
          },
          {
            label: "卡号",
            value: "1234****7890",
          }
        ],
        check: true
      },
      {
        bgUrl: `${RES}/assets/img/healthCardBg-uncheck.png`,
        headline: `河南省卫生健康委员会`,
        infoList: [
          {
            label: "姓名",
            value: "李四",
          },
          {
            label: "卡号",
            value: "1234****7890",
          }
        ],
        check: false
      },
      {
        bgUrl: `${RES}/assets/img/healthCardBg-uncheck.png`,
        headline: `江苏省卫生健康委员会`,
        infoList: [
          {
            label: "姓名",
            value: "王二麻子",
          },
          {
            label: "卡号",
            value: "1234****7890",
          }
        ],
        check: false
      },
      {
        bgUrl: `${RES}/assets/img/healthCardBg-uncheck.png`,
        headline: `甘肃省卫生健康委员会`,
        infoList: [
          {
            label: "姓名",
            value: "赵四",
          },
          {
            label: "卡号",
            value: "1234****7890",
          }
        ],
        check: false
      },
      {
        bgUrl: `${RES}/assets/img/healthCardBg-check.png`,
        headline: `浙江省卫生健康委员会`,
        infoList: [
          {
            label: "姓名",
            value: "李逵",
          },
          {
            label: "卡号",
            value: "1234****7890",
          }
        ],
        check: false
      }
    ];
    return {
      type: "flex",
      config: {
        mod: "h5/pages/IH/selectCard/index",
        title: "",
        wxcall: {
          /**底部按钮点击事件 */
          btnOnClick: (item, index) => {
            console.log(item, index);
          },
          /**切换选择卡片点击事件 */
          changeOnClick: (item, index) => {
            for (let i = 0; i < eHealthCardList.length; i++) {
              eHealthCardList[i].check = false;
              eHealthCardList[
                i
              ].bgUrl = `${RES}/assets/img/healthCardBg-uncheck.png`;
            }
            eHealthCardList[index].check = true;
            eHealthCardList[
              index
            ].bgUrl = `${RES}/assets/img/healthCardBg-check.png`;
            UpateCurrentPageData({
              dataList: eHealthCardList
            });
            console.log(item, index);
          },
          /**卡片点击事件 */
          cardOnClick: (item, index) => {
            console.log(item, index);
          }
        },
        data: {
          dataList: eHealthCardList,
          warmTipsObj: {
            content: "温馨提示：您还可以继续添加4张就诊卡"
          },
          btnList: [
            { type: "primary", text: "添加就诊卡", shadow: true },
            { type: "secondary", text: "健康卡" }
          ]
        }
      }
    };
  }
};
